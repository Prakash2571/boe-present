import { expect, test } from "@playwright/test";

const slideAssertions = [
  {
    heading: /beonedge/i,
    supportingText: /research-driven/i,
  },
  {
    heading: /beonedge wealth management/i,
    supportingText: /what is beonedge\?/i,
  },
  {
    heading: /our aim & investment philosophy/i,
    supportingText: /two core principles/i,
  },
  {
    heading: /services we provide/i,
    supportingText: /multiple investment options/i,
  },
  {
    heading: /modes of investment/i,
    supportingText: /systematic investment plan/i,
  },
  {
    heading: /why choose beonedge\?/i,
    supportingText: /experienced market participation/i,
  },
  {
    heading: /what we do not do/i,
    supportingText: /transparency and integrity/i,
  },
  {
    heading: /client investment tracking/i,
    supportingText: /dedicated client portal/i,
  },
  {
    heading: /contact us/i,
    supportingText: /beonedge wealth management/i,
  },
];

async function goToSlide(page: Parameters<typeof test>[0]["page"], index: number) {
  const root = page.getByTestId("presentation-root");
  const currentIndex = Number(await root.getAttribute("data-current-slide"));

  for (let step = currentIndex; step < index; step += 1) {
    await page.waitForTimeout(200);
    await page.keyboard.press("Space");
    await expect(root).toHaveAttribute("data-current-slide", String(step + 1));
    // Wait for cinematic crossfade unmount
    await page.waitForTimeout(800);
  }
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("presentation-root")).toBeVisible();
});

test("renders the first slide and layout container", async ({ page }) => {
  const root = page.getByTestId("presentation-root");

  await expect(root).toHaveAttribute("data-current-slide", "0");
  await expect(root).toHaveAttribute("data-total-slides", "9");
  await expect(page.getByTestId("layout-container")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: slideAssertions[0].heading }),
  ).toBeVisible();
  await expect(page.getByText(slideAssertions[0].supportingText)).toBeVisible();
});

test("advances through slides with the spacebar", async ({ page }) => {
  const root = page.getByTestId("presentation-root");

  for (let index = 1; index < slideAssertions.length; index += 1) {
    const previousHeading = page.getByRole("heading", {
      name: slideAssertions[index - 1].heading,
    });

    await page.waitForTimeout(200);
    await page.keyboard.press("Space");

    await expect(root).toHaveAttribute("data-current-slide", String(index));
    await expect(
      page.getByRole("heading", { name: slideAssertions[index].heading }),
    ).toBeVisible();
    await expect(page.getByText(slideAssertions[index].supportingText)).toBeVisible();

    // Wait for the previous slide to finish its 700ms exit animation
    await page.waitForTimeout(800);
    await expect(previousHeading).toHaveCount(0);
  }
});

test("handles rapid space presses without overflow on the last slide", async ({
  page,
}) => {
  const root = page.getByTestId("presentation-root");

  for (let index = 1; index < slideAssertions.length; index += 1) {
    await page.waitForTimeout(200);
    await page.keyboard.press("Space");
    await expect(root).toHaveAttribute("data-current-slide", String(index));
    await page.waitForTimeout(800);
  }

  await page.keyboard.press("Space");
  await page.keyboard.press("Space");

  await expect(root).toHaveAttribute(
    "data-current-slide",
    String(slideAssertions.length - 1),
  );
  await expect(
    page.getByRole("heading", {
      name: slideAssertions[slideAssertions.length - 1].heading,
    }),
  ).toBeVisible();
});

test("prevents page scrolling when using spacebar navigation", async ({ page }) => {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.keyboard.press("Space");

  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("renders the animated graph slide with legend, svg, and axis label", async ({
  page,
}) => {
  // The graph is on slide 5 (zero-indexed)
  await goToSlide(page, 5);

  const graph = page.getByTestId("graph-container");
  await expect(graph).toBeVisible();
  await expect(graph).toHaveAttribute(
    "data-graph-animation-state",
    /running|complete/,
  );
  await expect(page.getByTestId("graph-svg")).toBeVisible();
  await expect(page.getByTestId("graph-legend")).toContainText(
    "BeOnEdge (16% CAGR)",
  );
  await expect(page.getByTestId("graph-legend")).toContainText(
    "Nifty 50 (~11.6% CAGR)",
  );
  await expect(page.getByTestId("graph-axis-label")).toContainText(
    "Growth of Rs. 100 Investment",
  );
  await expect(page.locator("[data-testid='graph-svg'] circle")).toHaveCount(12);
});

test("keeps slide and graph animation timing within the expected range", async ({
  page,
}) => {
  const slide = page.getByTestId("active-slide");
  const slideTransitionMs = Number(
    await slide.getAttribute("data-slide-transition-ms"),
  );

  expect(slideTransitionMs).toBeGreaterThanOrEqual(300);
  expect(slideTransitionMs).toBeLessThanOrEqual(1000);

  await goToSlide(page, 5);

  const graphTransitionMs = Number(
    await page.getByTestId("graph-container").getAttribute("data-graph-draw-ms"),
  );

  expect(graphTransitionMs).toBeGreaterThanOrEqual(300);
  expect(graphTransitionMs).toBeLessThanOrEqual(1000);
});
