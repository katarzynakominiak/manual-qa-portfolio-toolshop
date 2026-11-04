# Exploratory Testing Charters

Session-based exploratory testing. Each charter is time-boxed to 45 minutes and states what
is being explored, with what, and what the session is trying to find out — the standard
"explore / with / to discover" form.

Each session records what was observed, which defects came out of it, and the questions it
raised that the application alone cannot answer.

## Charter 1 — Price range filter

**Explore** the price range filter **with** boundary and extreme values **to discover**
inconsistencies between the filter setting and the products displayed.

- Duration: 45 min
- Date: 2026-11-04
- Tester: Katarzyna

**Notes**

- The control is a two-handle slider spanning 1 to 200, with integer steps. All product
  prices carry decimals, so the slider cannot be set to any product's exact price.
- The most expensive product in the shop is priced 178.20, within the slider's range. No
  product is unreachable at either end of the scale.
- Boundary behaviour is correct. A product priced 3.55 is listed in the range 3–4 and is not
  listed in the range 4–5. A product priced 178.20 is listed in the range 178–179. The filter
  therefore compares actual prices rather than rounding them to the slider's integer steps.
- Setting the minimum equal to the maximum (3–3, 5–5) returns no products. This is consistent
  with an inclusive comparison between the two values: no product is priced at exactly 3.00 or
  5.00. Not treated as a defect.
- With the slider at its full range, 1–200, the product list rendered as
  `There are no products found.` on one occasion. The API response contained `null` in place
  of the product collection. Recorded as BUG-009; not reproduced afterwards, including under
  rapid slider movement.
- Later in the session the products endpoint returned `500 Internal Server Error` with the
  body `{"message":"Something went wrong"}`, and some requests were left pending. The
  condition cleared after a page reload. Testing was treated as unreliable for that window and
  the observation was attached to BUG-009 rather than filed separately — a single server error
  on a shared demo environment does not distinguish an application defect from environment
  instability.
- Filters combine as expected: price range, category, brand and sort order can be applied
  together and narrow the result set rather than replacing one another.
- No filter or sort selection is written to the URL. Moving between pages of results preserves
  the selection, but reloading the page or returning from a product page with the back button
  resets the catalogue to its default state. Recorded as BUG-010.
- The brand filter list changed between page loads during the session, and a hard refresh in
  both browsers showed further brands appearing. The environment is shared with other testers
  who create data in it. An apparent difference between Chrome and Firefox turned out to be
  two page loads taken at different times, not browser behaviour. Not filed as a defect; the
  risk recorded in the test plan for a shared environment applies.

**Bugs found:** BUG-009, BUG-010

**Questions raised**

- The slider steps in whole units while every price carries decimals, so no range can be set
  to match a product's price exactly. This is a design decision rather than a defect, but it
  makes the filter imprecise at the low end of the scale, where a one-unit step covers a large
  proportion of the price.
- A user who drags both handles together is shown an empty shop with no explanation that the
  range they selected contains nothing. The empty-state message does not distinguish between
  "no products match this filter" and any other reason for an empty list.
- The intended behaviour at the exact boundary is not documented. The observed behaviour is
  self-consistent, but whether it is intentional cannot be established from the application
  alone.
- Brands with no products are offered in the filter list. On this environment that is most
  likely test data created by others rather than an application fault, but whether the filter
  should list options that can return no results is a question for the team.

**What this session says about the approach**

Two defects came out of the session and neither was reachable from a scripted test case.
BUG-010 required navigating away from the catalogue and coming back, and BUG-009 appeared
once, during ordinary use of the slider, and resisted every attempt to reproduce it
deliberately.

The session also produced two findings that were deliberately not filed: the empty result at
a minimum equal to the maximum, which is consistent behaviour rather than a fault, and the
changing brand list, which traced back to the shared environment. Establishing that took
about as long as investigating the defects did.

---

## Charter 3 — Checkout flow interruptions

Explore the checkout flow with browser back and forward navigation, refreshes, returning to earlier steps and periods of inactivity to discover whether the flow can be put into an invalid state.

- Duration: 45 min
- Date: 2026-11-03
- Tester: Katarzyna

Notes

Moved back and forth between the cart, Sign in and Billing Address steps using both the step indicator and the header cart icon. Under normal use the flow tolerates this and the steps reload correctly.
Returning to the cart from the Sign in step produced a blank cart page: the step indicator and footer rendered, but no cart contents, no totals and no way to continue. The cart icon still reported 23 items. The console showed TypeError: Cannot read properties of null (reading 'cart_items').
The state was not recoverable through reloading the page, the browser back button, or reopening the cart from the home page.
The failure did not reproduce on the next several attempts using the same navigation path, with the same cart contents, logged out as before, and after changing an item quantity first. At that point the trigger was unknown and the finding was recorded as intermittent.
The trigger was identified later in the session: the failure occurs after a period of inactivity, a few minutes being sufficient. The cart expires server-side, GET /carts/{id} returns 404 Not Found and GET /users/me returns 401 Unauthorized, and the application renders the cart page without handling either response.
Recovery is possible by adding any product to the cart from a product page, which creates a new cart. Nothing on the blank cart page suggests this.
The cart icon continues to display the previous item count after the cart has expired, so the header and the page contradict each other.

Bugs found: BUG-005

Questions raised

What is the intended cart lifetime for an anonymous user? A few minutes is short enough that it is unclear whether the expiry itself is intended or is a side effect of the demo environment. The absence of handling for the expiry is a defect either way.
Is any state other than the cart affected by the same expiry? Only the cart page was checked.
The step indicator remains clickable while the page is broken. It was not established whether reaching a later step from that state is possible, or what it would do.

What this session says about the approach

The defect was reached through ordinary navigation, not through an unusual sequence, but it was not covered by any test case — the scripted cases exercise the checkout flow forwards, from a cart created moments earlier. The failure required leaving the application alone and coming back, which is a thing users do constantly and a thing a scripted test run never does.

---

---

## Charters planned but not executed

**Charter 2 — Cart behaviour across sessions.** Explore the cart with page refreshes,
logging out and back in, and a second browser tab, to discover whether cart contents and
totals stay consistent.

**Charter 4 — Mobile viewport.** Explore the purchasing path at a 390x844 mobile viewport to
discover layout and usability problems that do not occur on desktop.

Both were designed at the start of the project and deferred rather than dropped. Charter 1
and Charter 3 produced four defects between them and took longer than planned, and the
remaining effort was directed at automated coverage of the catalogue, search and contact
form instead. These two charters remain the clearest gaps in manual coverage and are the
first thing to pick up if manual testing continues.
