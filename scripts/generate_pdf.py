#!/usr/bin/env python3
"""
Pure-stdlib generator that reproduces the BeOnEdge Next.js presentation deck as a
multi-page landscape PDF. One page per slide, in the same order the app renders
them (app/page.tsx): Slide0,1,2,3,4,5,6,7,9,8.

This is a faithful *content* reproduction of what the running app outputs
(headings, copy, panels, and the two vector line charts with their real data).
It does not require npm/next/a browser, which cannot run in this sandbox.
"""

import zlib

PAGE_W, PAGE_H = 960.0, 540.0

# ---------------------------------------------------------------- Helvetica widths
_HELV = {
    ' ':278,'!':278,'"':355,'#':556,'$':556,'%':889,'&':667,"'":191,'(':333,')':333,
    '*':389,'+':584,',':278,'-':333,'.':278,'/':278,'0':556,'1':556,'2':556,'3':556,
    '4':556,'5':556,'6':556,'7':556,'8':556,'9':556,':':278,';':278,'<':584,'=':584,
    '>':584,'?':556,'@':1015,'A':667,'B':667,'C':722,'D':722,'E':667,'F':611,'G':778,
    'H':722,'I':278,'J':500,'K':667,'L':556,'M':833,'N':722,'O':778,'P':667,'Q':778,
    'R':722,'S':667,'T':611,'U':722,'V':667,'W':944,'X':667,'Y':667,'Z':611,'[':278,
    '\\':278,']':278,'^':469,'_':556,'`':333,'a':556,'b':556,'c':500,'d':556,'e':556,
    'f':278,'g':556,'h':556,'i':222,'j':222,'k':500,'l':222,'m':833,'n':556,'o':556,
    'p':556,'q':556,'r':333,'s':500,'t':278,'u':556,'v':500,'w':722,'x':500,'y':500,
    'z':500,'{':334,'|':260,'}':334,'~':584,
}
_HELVB = {
    ' ':278,'!':333,'"':474,'#':556,'$':556,'%':889,'&':722,"'":238,'(':333,')':333,
    '*':389,'+':584,',':278,'-':333,'.':278,'/':278,'0':556,'1':556,'2':556,'3':556,
    '4':556,'5':556,'6':556,'7':556,'8':556,'9':556,':':333,';':333,'<':584,'=':584,
    '>':584,'?':611,'@':975,'A':722,'B':722,'C':722,'D':722,'E':667,'F':611,'G':778,
    'H':722,'I':278,'J':556,'K':722,'L':611,'M':833,'N':722,'O':778,'P':667,'Q':778,
    'R':722,'S':667,'T':611,'U':722,'V':667,'W':944,'X':667,'Y':667,'Z':611,'[':333,
    '\\':278,']':333,'^':584,'_':556,'`':333,'a':556,'b':611,'c':556,'d':611,'e':556,
    'f':333,'g':611,'h':611,'i':278,'j':278,'k':556,'l':278,'m':889,'n':611,'o':611,
    'p':611,'q':611,'r':389,'s':556,'t':333,'u':611,'v':556,'w':778,'x':556,'y':556,
    'z':500,'{':389,'|':280,'}':389,'~':584,
}

def _san(s):
    repl = {'\u20b9':'Rs.','\u2013':'-','\u2014':'-','\u2192':'->','\u2022':'-',
            '\u2019':"'",'\u2018':"'",'\u201c':'"','\u201d':'"','\u2026':'...','\u00d7':'x',
            '\u2248':'~','\u2018':"'"}
    for k,v in repl.items():
        s = s.replace(k,v)
    return ''.join(ch if 32 <= ord(ch) < 127 else '?' for ch in s)

def text_width(s, size, bold=False):
    tbl = _HELVB if bold else _HELV
    return sum(tbl.get(c, 556) for c in s) * size / 1000.0


class Page:
    def __init__(self):
        self.ops = []
    def _y(self, y):
        return PAGE_H - y
    def rgb_fill(self, r, g, b):
        self.ops.append(f"{r:.3f} {g:.3f} {b:.3f} rg")
    def rgb_stroke(self, r, g, b):
        self.ops.append(f"{r:.3f} {g:.3f} {b:.3f} RG")
    def alpha(self, ca=None, CA=None):
        if ca is not None:
            self.ops.append(f"/GSa{int(ca*100)} gs")
        if CA is not None:
            self.ops.append(f"/GSA{int(CA*100)} gs")
    def rect(self, x, y, w, h, fill=None, stroke=None, lw=1.0):
        if fill:
            self.rgb_fill(*fill)
        if stroke:
            self.rgb_stroke(*stroke)
            self.ops.append(f"{lw:.2f} w")
        self.ops.append(f"{x:.2f} {self._y(y+h):.2f} {w:.2f} {h:.2f} re")
        if fill and stroke:
            self.ops.append("B")
        elif fill:
            self.ops.append("f")
        else:
            self.ops.append("S")
    def line(self, x1, y1, x2, y2, color=(1,1,1), lw=1.0, dash=None):
        self.rgb_stroke(*color)
        self.ops.append(f"{lw:.2f} w")
        if dash:
            self.ops.append(f"[{dash}] 0 d")
        else:
            self.ops.append("[] 0 d")
        self.ops.append(f"{x1:.2f} {self._y(y1):.2f} m {x2:.2f} {self._y(y2):.2f} l S")
        self.ops.append("[] 0 d")
    def circle(self, cx, cy, r, fill=None, stroke=None, lw=1.0):
        k = 0.5523 * r
        cyp = self._y(cy)
        self.ops.append(f"{cx+r:.2f} {cyp:.2f} m")
        self.ops.append(f"{cx+r:.2f} {cyp+k:.2f} {cx+k:.2f} {cyp+r:.2f} {cx:.2f} {cyp+r:.2f} c")
        self.ops.append(f"{cx-k:.2f} {cyp+r:.2f} {cx-r:.2f} {cyp+k:.2f} {cx-r:.2f} {cyp:.2f} c")
        self.ops.append(f"{cx-r:.2f} {cyp-k:.2f} {cx-k:.2f} {cyp-r:.2f} {cx:.2f} {cyp-r:.2f} c")
        self.ops.append(f"{cx+k:.2f} {cyp-r:.2f} {cx+r:.2f} {cyp-k:.2f} {cx+r:.2f} {cyp:.2f} c")
        if fill:
            self.rgb_fill(*fill)
        if stroke:
            self.rgb_stroke(*stroke)
            self.ops.append(f"{lw:.2f} w")
        if fill and stroke:
            self.ops.append("B")
        elif fill:
            self.ops.append("f")
        else:
            self.ops.append("S")
    def polyline(self, pts, color, lw, close=False, fill=None):
        if not pts:
            return
        self.ops.append(f"{pts[0][0]:.2f} {self._y(pts[0][1]):.2f} m")
        for x, y in pts[1:]:
            self.ops.append(f"{x:.2f} {self._y(y):.2f} l")
        if close:
            self.ops.append("h")
        if fill:
            self.rgb_fill(*fill)
            self.ops.append("f")
        else:
            self.rgb_stroke(*color)
            self.ops.append(f"{lw:.2f} w [] 0 d")
            self.ops.append("S")
    def text(self, x, y, s, size, color=(1,1,1), bold=False, align='left'):
        s = _san(s)
        w = text_width(s, size, bold)
        if align == 'center':
            x -= w/2
        elif align == 'right':
            x -= w
        font = '/F2' if bold else '/F1'
        esc = s.replace('\\','\\\\').replace('(','\\(').replace(')','\\)')
        self.rgb_fill(*color)
        # baseline: y is the text baseline measured from top
        self.ops.append(f"BT {font} {size:.2f} Tf 1 0 0 1 {x:.2f} {self._y(y):.2f} Tm ({esc}) Tj ET")
        return w
    def wrap(self, x, y, s, size, color, max_w, leading, bold=False, align='left'):
        words = _san(s).split()
        line = ''
        cy = y
        for wd in words:
            trial = (line + ' ' + wd).strip()
            if text_width(trial, size, bold) > max_w and line:
                self.text(x, cy, line, size, color, bold, align)
                line = wd
                cy += leading
            else:
                line = trial
        if line:
            self.text(x, cy, line, size, color, bold, align)
            cy += leading
        return cy


# ---------------------------------------------------------------- palette
BG        = (0.027,0.051,0.098)
PANEL     = (0.078,0.106,0.169)
PANEL2    = (0.098,0.129,0.200)
BORDER    = (0.169,0.216,0.322)
WHITE     = (0.96,0.97,0.99)
N300      = (0.80,0.83,0.88)
N400      = (0.60,0.64,0.71)
N500      = (0.46,0.50,0.58)
BLUE      = (0.38,0.65,0.98)
INDIGO    = (0.51,0.55,0.98)
EMERALD   = (0.20,0.83,0.60)
EMERALDL  = (0.43,0.91,0.72)
AMBER     = (0.98,0.75,0.24)
GOLD      = (0.98,0.80,0.42)
RED       = (0.97,0.44,0.44)
CYAN      = (0.33,0.80,0.85)
PURPLE    = (0.75,0.52,0.99)


def base(page, accent=BLUE):
    page.rect(0, 0, PAGE_W, PAGE_H, fill=BG)
    # faint accent glow rectangles (blobs)
    page.alpha(ca=0.05)
    page.rgb_fill(*accent)
    page.circle(150, 90, 220, fill=accent)
    page.circle(830, 470, 200, fill=INDIGO)
    page.alpha(ca=1.0)


def panel(page, x, y, w, h, fill=PANEL, border=BORDER, lw=1.0):
    page.rect(x, y, w, h, fill=fill, stroke=border, lw=lw)


def eyebrow(page, x, y, s, color):
    page.text(x, y, s.upper(), 11, color, bold=True)


def title(page, x, y, parts, size=30, align='left'):
    """parts = list of (text, color). Rendered inline."""
    total = sum(text_width(_san(t), size, True) for t, _ in parts)
    if align == 'center':
        cx = x - total/2
    else:
        cx = x
    for t, c in parts:
        w = page.text(cx, y, t, size, c, bold=True)
        cx += w


def divider(page, x, y, w=64, color=BLUE):
    page.rect(x, y, w, 2.4, fill=color)


# =====================================================================  SLIDES
def slide_title(p):
    base(p, BLUE)
    cx = PAGE_W/2
    panel(p, cx-300, 150, 600, 250, fill=PANEL, border=BORDER, lw=1.2)
    title(p, cx, 250, [("BeOnEdge", INDIGO)], size=52, align='center')
    p.text(cx, 288, "W E A L T H   M A N A G E M E N T", 13, N300, align='center')
    divider(p, cx-40, 312, 80, BLUE)
    p.text(cx, 345, "Research-driven investing for disciplined wealth creation", 13,
           N400, align='center')
    p.text(cx, 388, "PRESS SPACE TO BEGIN", 10, N500, align='center')
    footer(p, 1)


def slide_what(p):
    base(p, AMBER)
    x = 90
    eyebrow(p, x, 70, "What is BeOnEdge?", BLUE)
    title(p, x, 108, [("BeOnEdge ", WHITE), ("Wealth Management", GOLD)], size=30)
    divider(p, x, 126, 64, BLUE)
    panel(p, x, 150, PAGE_W-2*x, 320)
    ix = x+28
    ny = p.wrap(ix, 190, "BeOnEdge is a research-driven wealth management firm focused on "
                "helping investors grow their capital through disciplined investing and "
                "strategic asset allocation.", 13, N300, PAGE_W-2*x-56, 20)
    # allocate panel
    py = ny + 14
    panel(p, ix, py, PAGE_W-2*x-56, 66, fill=PANEL2, border=BORDER)
    p.text(ix+18, py+26, "We allocate client capital across:", 13, WHITE, bold=True)
    cols = ["Equity Markets", "Commodities", "Fixed Income Instruments"]
    cw = (PAGE_W-2*x-56-36)/3
    for i, c in enumerate(cols):
        bx = ix+18+i*cw
        p.circle(bx+6, py+50, 3, fill=BLUE)
        p.text(bx+16, py+54, c, 12, N300)
    # combine panel
    py2 = py + 82
    p.text(ix, py2+6, "Our objective is to generate sustainable long-term returns by combining:",
           12, N400)
    combo = [("Deep fundamental research", EMERALDL),
             ("Risk-managed portfolio construction", BLUE),
             ("Strategic asset allocation", AMBER)]
    cw2 = (PAGE_W-2*x-56)/3
    for i,(t,col) in enumerate(combo):
        bx = ix+i*cw2
        panel(p, bx, py2+18, cw2-14, 34, fill=PANEL2, border=BORDER)
        p.text(bx+(cw2-14)/2, py2+40, t, 11.5, col, bold=True, align='center')
    p.wrap(ix, py2+74, "We aim to help investors grow their hard-earned money beyond "
           "traditional investment options such as bank deposits and passive index "
           "returns, while maintaining a disciplined approach to risk.", 11.5, N400,
           PAGE_W-2*x-56, 17)
    footer(p, 2)


def slide_philosophy(p):
    base(p, EMERALD)
    cx = PAGE_W/2
    title(p, cx, 66, [("Our Aim & ", WHITE), ("Investment Philosophy", GOLD)], size=28, align='center')
    divider(p, cx-32, 82, 64, BLUE)
    p.text(cx, 112, "At BeOnEdge, our philosophy is built on two core principles.", 12.5, N300, align='center')
    colw = (PAGE_W-180-40)/2
    lx, rx = 90, 90+colw+40
    top = 132; h = 350
    # Principle 1
    panel(p, lx, top, colw, h)
    p.text(lx+22, top+34, "1.  Consistent Wealth Creation", 15, WHITE, bold=True)
    ny = p.wrap(lx+22, top+60, "Our long-term goal is to deliver returns that outperform "
                "benchmark indices and traditional savings instruments through disciplined "
                "investing.", 12, N300, colw-44, 18)
    panel(p, lx+22, ny+8, colw-44, 52, fill=(0.05,0.15,0.11), border=(0.13,0.4,0.28))
    p.text(lx+34, ny+30, "Expected long-term target range:", 10.5, EMERALDL)
    p.text(lx+34, ny+50, "12-15% CAGR  over market cycles", 14, WHITE, bold=True)
    yy = ny+78
    p.text(lx+22, yy, "This is achieved through:", 12, WHITE, bold=True)
    for i, it in enumerate(["Strategic asset allocation","Fundamental research",
                            "Risk management","Market cycle awareness"]):
        p.text(lx+30, yy+20+i*19, "v", 11, EMERALD, bold=True)
        p.text(lx+46, yy+20+i*19, it, 12, N300)
    # Principle 2
    panel(p, rx, top, colw, h)
    p.text(rx+22, top+34, "2.  Capital Protection First", 15, WHITE, bold=True)
    ny2 = p.wrap(rx+22, top+60, "Preserving client capital during adverse market conditions "
                 "is equally important as generating returns.", 12, N300, colw-44, 18)
    panel(p, rx+22, ny2+8, colw-44, h-(ny2+8-top)-22, fill=PANEL2, border=BORDER)
    p.text(rx+34, ny2+30, "Our investment strategy focuses on:", 12, WHITE, bold=True)
    for i, it in enumerate([
            "Managing downside risk",
            "Reducing volatility during market stress",
            "Protecting capital during extreme market conditions",
            "Disciplined portfolio diversification across asset classes",
            "Strict downside risk controls with predefined stop-loss levels"]):
        p.circle(rx+40, ny2+50+i*22-3, 2.5, fill=BLUE)
        p.wrap(rx+50, ny2+50+i*22, it, 11.5, N300, colw-90, 15)
    footer(p, 3)


def slide_services(p):
    base(p, INDIGO)
    cx = PAGE_W/2
    title(p, cx, 74, [("Services We ", WHITE), ("Provide", GOLD)], size=28, align='center')
    divider(p, cx-32, 90, 64, BLUE)
    p.text(cx, 120, "BeOnEdge offers multiple investment options depending on investor requirements.",
           12.5, N300, align='center')
    cards = [
        ("01","Systematic Investment Plan (SIP)",
         "A disciplined investment approach where investors contribute a fixed amount periodically.", (0.38,0.65,0.98)),
        ("02","One-Time Investment",
         "For investors who want to deploy capital at once and stay invested for the long term.", (0.55,0.5,0.9)),
        ("03","Portfolio Management Service (PMS)",
         "Customized portfolio management for larger investors with performance-linked profit sharing.", EMERALD),
    ]
    cw = (PAGE_W-180-60)/3
    top = 150; h = 300
    for i,(num,t,d,ac) in enumerate(cards):
        bx = 90 + i*(cw+30)
        panel(p, bx, top, cw, h)
        p.text(bx+22, top+64, num, 46, (0.16,0.20,0.30), bold=True)
        p.wrap(bx+22, top+110, t, 15, WHITE, cw-44, 20, bold=True)
        p.wrap(bx+22, top+165, d, 12, N300, cw-44, 18)
        p.rect(bx+22, top+h-34, 46, 2.4, fill=ac)
    footer(p, 4)


def slide_modes(p):
    base(p, BLUE)
    cx = PAGE_W/2
    title(p, cx, 58, [("Modes of ", WHITE), ("Investment", GOLD)], size=26, align='center')
    divider(p, cx-32, 72, 64, BLUE)
    x = 110; w = PAGE_W-220
    rows = [
        ("1. SIP","(Systematic Investment Plan)", BLUE, [
            "Minimum: Rs.500/month     |     Duration: 12 months",
            "Investors choose a fixed amount invested automatically every month on a set date.",
            "Example: 4th of every month.  Promotes discipline and long-term wealth creation."]),
        ("2. One-Time Investment", None, INDIGO, [
            "Minimum: Rs.10,000     |     Holding Period: 12 months",
            "Suitable for investors who wish to deploy capital in a lump sum and participate in long-term market growth."]),
        ("3. PMS","(Portfolio Management Service)", EMERALD, [
            "Minimum Capital: Rs.5,00,000   -   Our PMS model is performance based.",
            "Profit sharing applies only after outperforming benchmark returns.",
            "If benchmark returns are not beaten -> no commission. Complete alignment of investor & manager."]),
    ]
    top = 92
    rh = [118, 96, 128]
    for (t,sub,ac,lines), h in zip(rows, rh):
        panel(p, x, top, w, h)
        p.rect(x, top, 3, h, fill=ac)
        p.text(x+22, top+30, t, 15, WHITE, bold=True)
        if sub:
            p.text(x+22, top+50, sub, 11.5, ac, bold=True)
        ty = top+30
        for ln in lines:
            ty += 22
            col = WHITE if ln.startswith(("Minimum","Minimum Capital")) else N300
            p.wrap(x+250, ty, ln, 11.5, col, w-280, 15)
        top += h + 10
    footer(p, 5)


def draw_chart(p, ox, oy, cw, ch, series, yticks, ymin, ymax, xlabels,
               title_txt, legend, vlines=None, annotations=None, value_labels=None):
    """Generic line chart. series: list of (points[(xf,val)], color, lw)."""
    panel(p, ox, oy, cw, ch, fill=(0.06,0.09,0.15), border=BORDER)
    pad_l, pad_r, pad_t, pad_b = 62, 24, 44, 40
    gx, gy = ox+pad_l, oy+pad_t
    gw, gh = cw-pad_l-pad_r, ch-pad_t-pad_b
    # title
    p.text(ox+18, oy+26, title_txt, 12.5, WHITE, bold=True)
    # legend
    lx = ox+cw-18
    for name, col in reversed(legend):
        tw = text_width(_san(name), 10)
        p.text(lx, oy+24, name, 10, N400, align='right')
        p.circle(lx-tw-10, oy+21, 3, fill=col)
        lx -= tw + 26
    def X(f):  # f in 0..1
        return gx + gw*f
    def Y(v):
        return gy + (ymax-v)/(ymax-ymin)*gh
    # gridlines + y labels
    for t in yticks:
        yy = Y(t)
        p.line(gx, yy, gx+gw, yy, color=(0.18,0.22,0.30), lw=0.7, dash="2 5")
        p.text(gx-12, yy+4, str(t), 10, N400, align='right')
    # axes
    p.line(gx, gy, gx, gy+gh, color=(0.25,0.3,0.4), lw=1)
    p.line(gx, gy+gh, gx+gw, gy+gh, color=(0.25,0.3,0.4), lw=1)
    # x labels
    for f, lab in xlabels:
        p.text(X(f), gy+gh+20, lab, 10, N400, align='center')
    # vertical marker lines
    if vlines:
        for f, col, lab in vlines:
            p.line(X(f), gy, X(f), gy+gh, color=col, lw=1.2, dash="4 4")
            p.text(X(f)-6, gy+12, lab, 9, AMBER, align='right', )
    # area + line per series
    for pts, col, lw in series:
        scr = [(X(f), Y(v)) for f, v in pts]
        area = scr + [(scr[-1][0], gy+gh), (scr[0][0], gy+gh)]
        p.alpha(ca=0.14)
        p.polyline(area, col, 0, close=True, fill=col)
        p.alpha(ca=1.0)
        p.polyline(scr, col, lw)
        for sx, sy in scr:
            p.circle(sx, sy, 3.2, fill=col, stroke=BG, lw=1.2)
    # value labels
    if value_labels:
        for f, v, txt, col in value_labels:
            p.text(X(f), Y(v)-8, txt, 10, col, bold=True, align='center')
    # annotations
    if annotations:
        for f, lab, col, al in annotations:
            p.text(X(f), gy+gh+34, lab, 9, col, align=al)


def slide_why(p):
    base(p, EMERALD)
    cx = PAGE_W/2
    title(p, cx, 46, [("Why Choose ", WHITE), ("BeOnEdge?", GOLD)], size=24, align='center')
    divider(p, cx-32, 58, 64, EMERALD)
    # two info cards
    cw = (PAGE_W-180-24)/2
    lx, rx = 90, 90+cw+24
    top = 74; h = 130
    panel(p, lx, top, cw, h)
    p.text(lx+18, top+26, "Experienced Market Participation", 13, WHITE, bold=True)
    p.wrap(lx+18, top+46, "Our team has actively participated in financial markets for over "
           "5 years, navigating multiple market cycles including:", 10.5, N300, cw-36, 14)
    for i,it in enumerate(["COVID-19 market crash","Russia-Ukraine geopolitical volatility",
                           "Bull market phases of 2023-2024","Current evolving market conditions"]):
        col = i%2; row = i//2
        bx = lx+18+col*(cw/2-4)
        p.circle(bx+4, top+92+row*17-3, 2.3, fill=BLUE)
        p.text(bx+12, top+92+row*17, it, 9.5, N400)
    panel(p, rx, top, cw, h)
    p.text(rx+18, top+26, "Strong Performance Track Record", 13, WHITE, bold=True)
    p.wrap(rx+18, top+46, "We have maintained an average CAGR of approximately 16% over the "
           "last 5 years through disciplined investing.", 10.5, N300, cw-36, 14)
    p.wrap(rx+18, top+82, "A Rs.100 investment growing at 16% CAGR reaches approximately Rs.210 "
           "in 5 years, compared to around Rs.176 at 12% CAGR benchmark growth.", 9.5, N400, cw-36, 13)
    # chart
    beon = [(i/5, v) for i,v in enumerate([100,116,134.56,156.09,181.06,210])]
    nifty= [(i/5, v) for i,v in enumerate([100,111.6,124.54,139.0,155.12,176])]
    bank = [(i/5, v) for i,v in enumerate([100,108,116.64,125.97,136.05,146.93])]
    draw_chart(p, 90, 214, PAGE_W-180, 250,
               series=[(bank, AMBER, 2.0),(nifty, PURPLE, 2.2),(beon, EMERALD, 2.8)],
               yticks=[80,100,120,140,160,180,200,220], ymin=80, ymax=220,
               xlabels=[(i/5, y) for i,y in enumerate(["2021","2022","2023","2024","2025","2026"])],
               title_txt="BeOnEdge vs Nifty 50 vs Bank FD Performance Comparison (5 Years)",
               legend=[("BeOnEdge (16% CAGR)",EMERALD),("Nifty 50 (~11.6% CAGR)",PURPLE),
                       ("Bank FD (8% CAGR)",AMBER)])
    footer(p, 6)


def slide_donot(p):
    base(p, RED)
    cx = PAGE_W/2
    _center_eyebrow(p, cx, 56, "TRANSPARENCY & INTEGRITY", RED)
    title(p, cx, 92, [("What We ", WHITE), ("Do NOT Do", RED)], size=28, align='center')
    divider(p, cx-32, 108, 64, RED)
    p.text(cx, 138, "At BeOnEdge, transparency and integrity are core values. We do not:",
           12.5, N300, align='center')
    items = ["Promise unrealistic or guaranteed returns",
             "Offer trading tips or speculative recommendations",
             "Claim to double or triple money",
             "Run Telegram or signal groups",
             "Encourage short-term speculation",
             "Engage in high-frequency speculation or pump-and-dump strategies"]
    cw = (PAGE_W-180-40)/3
    top = 160; ch = 74
    for i, it in enumerate(items):
        col = i%3; row=i//3
        bx = 90+col*(cw+20); by = top+row*(ch+16)
        panel(p, bx, by, cw, ch, fill=(0.13,0.06,0.07), border=(0.4,0.15,0.17))
        p.circle(bx+22, by+26, 11, fill=(0.28,0.09,0.10))
        p.text(bx+22, by+30, "x", 12, RED, bold=True, align='center')
        p.wrap(bx+42, by+22, it, 11, N300, cw-56, 14, bold=True)
    by2 = top+2*(ch+16)
    panel(p, 90, by2, PAGE_W-180, 40, fill=PANEL, border=BORDER)
    p.rect(90, by2, 4, 40, fill=BLUE)
    p.text(cx, by2+25, "Our focus remains strictly on long-term disciplined wealth creation.",
           12.5, WHITE, bold=True, align='center')
    footer(p, 7)


def slide_tracking(p):
    base(p, INDIGO)
    cx = PAGE_W/2
    _center_eyebrow(p, cx, 60, "TRANSPARENCY IN ACTION", INDIGO)
    title(p, cx, 96, [("Client Investment ", WHITE), ("Tracking", GOLD)], size=28, align='center')
    divider(p, cx-32, 112, 64, INDIGO)
    panel(p, 90, 138, PAGE_W-180, 330)
    ix = 118
    p.wrap(ix, 172, "We believe investors should have complete transparency regarding their investments.",
           12.5, N300, PAGE_W-2*ix+56, 18)
    p.text(ix, 202, "BeOnEdge has developed a dedicated client portal where investors can:",
           12.5, N300)
    feats = ["Track their investments","Monitor portfolio performance",
             "View transaction history","Stay updated on portfolio allocation"]
    cw = (PAGE_W-2*118-24)/2
    for i,f in enumerate(feats):
        col=i%2; row=i//2
        bx = ix+col*(cw+24); by = 222+row*54
        panel(p, bx, by, cw, 44, fill=PANEL2, border=BORDER)
        p.circle(bx+26, by+22, 12, fill=(0.14,0.15,0.32))
        p.text(bx+26, by+26, ">", 12, INDIGO, bold=True, align='center')
        p.text(bx+48, by+27, f, 12, N300, bold=True)
    panel(p, ix, 336, PAGE_W-2*118+56, 40, fill=(0.04,0.13,0.15), border=(0.13,0.35,0.4))
    p.text(cx, 361, "This platform is currently available for clients and will soon be expanded "
           "with a full public website and landing page.", 11, N400, align='center')
    footer(p, 8)


def slide_journey(p):
    base(p, EMERALD)
    cx = PAGE_W/2
    _center_eyebrow(p, cx, 44, "TRACTION & TRUST", EMERALD)
    title(p, cx, 76, [("Our Customer ", WHITE), ("Journey", GOLD)], size=24, align='center')
    divider(p, cx-32, 88, 64, EMERALD)
    stats = [("0 -> 120","Aggregate clients", EMERALD),
             ("May 2025","Officially registered", AMBER),
             ("Coming soon","App, website & more", BLUE)]
    cw = (PAGE_W-180-24)/3
    for i,(v,l,c) in enumerate(stats):
        bx = 90+i*(cw+12)
        panel(p, bx, 100, cw, 56)
        p.text(bx+cw/2, 128, v, 18, c, bold=True, align='center')
        p.text(bx+cw/2, 148, l, 11, N400, align='center')
    # timeline chart. map decimal year to fraction across 2023..2026.45
    TS, TE, REG = 2023.0, 2026.45, 2025.33
    def fr(t): return (t-TS)/(TE-TS)
    data = [(2023.0,3),(2023.5,6),(2024.0,11),(2024.5,20),(2025.0,32),(REG,45),
            (2025.58,68),(2025.83,90),(2026.08,108),(TE,120)]
    pts = [(fr(t), v) for t,v in data]
    draw_chart(p, 90, 168, PAGE_W-180, 240,
               series=[(pts, EMERALD, 2.8)],
               yticks=[0,20,40,60,80,100,120], ymin=0, ymax=120,
               xlabels=[(fr(2023),"2023"),(fr(2024),"2024"),(fr(2025),"2025"),
                        (fr(2026),"2026"),(fr(TE),"Now")],
               title_txt="Aggregate Clients Growth (2023 - Present)",
               legend=[("Aggregate Clients",EMERALD)],
               vlines=[(fr(REG), AMBER, "Registered - May 2025")],
               value_labels=[(fr(2023.0),3,"3",EMERALDL),(fr(REG),45,"45",EMERALDL),
                             (fr(TE),120,"120",EMERALDL)],
               annotations=[(fr(2023.0),"Started in college",N400,'left'),
                            (fr(TE),"120 clients - our own office",EMERALDL,'right')])
    panel(p, 90, 416, PAGE_W-180, 52, fill=PANEL, border=BORDER)
    p.wrap(112, 438, "What began in 2023 as a student venture grew slowly at first. After being "
           "officially registered in May 2025, momentum took off - reaching 120 aggregate clients "
           "today from our own office. App & website launching soon, with much more on the way.",
           11, N300, PAGE_W-224, 15)
    footer(p, 9)


def slide_contact(p):
    base(p, BLUE)
    cx = PAGE_W/2
    _center_eyebrow(p, cx, 74, "GET IN TOUCH", BLUE)
    title(p, cx, 110, [("Contact ", WHITE), ("Us", GOLD)], size=30, align='center')
    divider(p, cx-32, 128, 64, BLUE)
    panel(p, 120, 156, PAGE_W-240, 300)
    p.text(cx, 200, "BeOnEdge Wealth Management", 16, WHITE, bold=True, align='center')
    cards = [("Address", ["College Road, Powarh","Ghatsila - 832303"], BLUE),
             ("Phone", ["+91 8789136062","+91 6201907898"], INDIGO),
             ("Website", ["beonedge.in"], CYAN)]
    cw = (PAGE_W-240-80-48)/3
    for i,(h,lines,c) in enumerate(cards):
        bx = 160+i*(cw+24)
        panel(p, bx, 232, cw, 180, fill=PANEL2, border=BORDER)
        p.circle(bx+cw/2, 270, 18, fill=(0.10,0.16,0.28))
        p.text(bx+cw/2, 300, h, 13, WHITE, bold=True, align='center')
        col = CYAN if h=="Website" else N300
        for j,ln in enumerate(lines):
            p.text(bx+cw/2, 326+j*18, ln, 12, col, align='center')
    footer(p, 10)


def _center_eyebrow(p, cx, y, s, color):
    p.text(cx, y, s, 11, color, bold=True, align='center')


def footer(p, n):
    p.text(PAGE_W-30, PAGE_H-18, f"{n} / 10", 9, N500, align='right')
    p.text(30, PAGE_H-18, "BeOnEdge Wealth Management", 9, N500)


# =====================================================================  PDF assembly
def build():
    pages = []
    for fn in [slide_title, slide_what, slide_philosophy, slide_services, slide_modes,
               slide_why, slide_donot, slide_tracking, slide_journey, slide_contact]:
        pg = Page()
        fn(pg)
        pages.append(pg)

    objects = []
    def add(obj):
        objects.append(obj)
        return len(objects)  # 1-based id

    # reserve: catalog(1), pages(2), fonts(3,4), gstates
    # We'll build ids dynamically.
    font_reg = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>"
    font_bold = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>"

    # ExtGStates for alpha values used
    alphas = set()
    for pg in pages:
        for op in pg.ops:
            if op.startswith("/GSa"):
                alphas.add(("a", int(op[4:op.index(' ')])))
            elif op.startswith("/GSA"):
                alphas.add(("A", int(op[4:op.index(' ')])))
    alphas.add(("a",100)); alphas.add(("A",100))

    # Assign object numbers
    # 1 catalog, 2 pages tree, then fonts, gstates, then page objs + contents
    catalog_id = 1
    pages_id = 2
    freg_id = 3
    fbold_id = 4
    next_id = 5
    gs_map = {}
    gs_objs = []
    for kind, val in sorted(alphas):
        key = f"GS{kind}{val}"
        gs_map[key] = next_id
        if kind == "a":
            gs_objs.append((next_id, f"<< /Type /ExtGState /ca {val/100:.2f} >>"))
        else:
            gs_objs.append((next_id, f"<< /Type /ExtGState /CA {val/100:.2f} >>"))
        next_id += 1

    page_ids = []
    content_ids = []
    for _ in pages:
        page_ids.append(next_id); next_id += 1
        content_ids.append(next_id); next_id += 1

    # Build object dict
    objs = {}
    objs[catalog_id] = f"<< /Type /Catalog /Pages {pages_id} 0 R >>"
    kids = " ".join(f"{pid} 0 R" for pid in page_ids)
    objs[pages_id] = f"<< /Type /Pages /Count {len(page_ids)} /Kids [{kids}] >>"
    objs[freg_id] = font_reg
    objs[fbold_id] = font_bold
    for oid, body in gs_objs:
        objs[oid] = body

    gs_res = " ".join(f"/{k} {v} 0 R" for k,v in gs_map.items())
    res = (f"<< /Font << /F1 {freg_id} 0 R /F2 {fbold_id} 0 R >> "
           f"/ExtGState << {gs_res} >> >>")

    for i, pg in enumerate(pages):
        pid = page_ids[i]; cid = content_ids[i]
        objs[pid] = (f"<< /Type /Page /Parent {pages_id} 0 R "
                     f"/MediaBox [0 0 {PAGE_W:.0f} {PAGE_H:.0f}] "
                     f"/Resources {res} /Contents {cid} 0 R >>")
        stream = "\n".join(pg.ops).encode('latin-1', 'replace')
        comp = zlib.compress(stream)
        objs[cid] = (b"<< /Length " + str(len(comp)).encode() +
                     b" /Filter /FlateDecode >>\nstream\n" + comp + b"\nendstream")

    # Serialize
    out = bytearray()
    out += b"%PDF-1.5\n%\xe2\xe3\xcf\xd3\n"
    offsets = {}
    max_id = max(objs.keys())
    for oid in range(1, max_id+1):
        offsets[oid] = len(out)
        body = objs[oid]
        out += f"{oid} 0 obj\n".encode()
        if isinstance(body, bytes):
            out += body
        else:
            out += body.encode('latin-1', 'replace')
        out += b"\nendobj\n"
    xref_pos = len(out)
    out += f"xref\n0 {max_id+1}\n".encode()
    out += b"0000000000 65535 f \n"
    for oid in range(1, max_id+1):
        out += f"{offsets[oid]:010d} 00000 n \n".encode()
    out += (f"trailer\n<< /Size {max_id+1} /Root {catalog_id} 0 R >>\n"
            f"startxref\n{xref_pos}\n%%EOF").encode()

    import os
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    targets = [
        os.path.join(root, "public", "beonedge-presentation.pdf"),
        os.path.join(root, "pdf_exports", "beonedge-presentation-render.pdf"),
    ]
    for path in targets:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "wb") as f:
            f.write(out)
        print("wrote", path, len(out), "bytes,", len(pages), "pages")


if __name__ == "__main__":
    build()
