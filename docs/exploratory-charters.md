# Exploratory Testing Charters

Session-based testing. Each charter is time-boxed to 45 minutes.
Format: explore **[area]** with **[resources]** to discover **[information]**.

---

## Charter 1 — Price range filter

**Explore** the price range filter **with** boundary and extreme values
**to discover** inconsistencies between the filter setting and the products displayed.

- Duration: 45 min
- Date: [date]
- Tester: [name]

**Notes**

- [observation]

**Bugs found:** [BUG-00X]

**Questions raised**

- [anything whose intended behaviour is unclear]

---

## Charter 2 — Cart behaviour across sessions

**Explore** the cart **with** page refreshes, logging out and back in, and a second browser tab
**to discover** whether cart contents and totals stay consistent.

- Duration: 45 min
- Date: [date]
- Tester: [name]

**Notes**

- [observation]

**Bugs found:** [BUG-00X]

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

## Charter 4 — Mobile viewport

**Explore** the purchasing path **with** a 390x844 mobile viewport
**to discover** layout and usability problems that do not occur on desktop.

- Duration: 45 min
- Date: [date]
- Tester: [name]

**Notes**

- [observation]

**Bugs found:** [BUG-00X]
