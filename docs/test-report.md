# Final Test Report — Toolshop

**Application:** https://practicesoftwaretesting.com/
**Version:** v2.5, built 2026-10-11, Angular 20.0.5
**Test period:** 2026-11-02 – 2026-11-04
**Tester:** Katarzyna

---

## 1. Summary

Manual testing covered account registration, the cart and the checkout flow, with exploratory
sessions on the price range filter and on interruptions to the checkout flow. Ten defects were
recorded, two of them Major and both on the purchase path.

The application completes its core journey: an account can be created, products can be added
to a cart, and an order can be placed and receives an invoice number. What the testing found
is not a broken flow but a consistent pattern of the application withholding or misstating
information at the points where a customer needs it — the amount due is not shown after the
cart step, a payment is reported as successful when none has been made, and an expired cart
produces a blank page with no explanation.

Coverage of the catalogue, search and contact form was deliberately left to automated testing
and is not included in the results below.

---

## 2. Coverage

### Test cases

| Area | Cases | Executed | Passed | Failed | Not run |
|---|---|---|---|---|---|
| Registration and login | 4 | 4 | 4 | 0 | 0 |
| Catalogue and filtering | 4 | 0 | – | – | 4 |
| Search | 2 | 0 | – | – | 2 |
| Cart and checkout | 4 | 4 | 4 | 0 | 0 |
| Contact form | 3 | 0 | – | – | 3 |
| **Total** | **17** | **8** | **8** | **0** | **9** |

All executed cases passed. A passing case means the stated expected result was reached; six of
the eight carry defects recorded against them. The distinction matters: the purchase journey
works, but it works badly in places.

The nine cases not run cover the catalogue, search and the contact form. These were assigned
to the automated suite rather than skipped — they are data-driven and repetitive, which is
what automation handles better than a person does.

### Exploratory testing

| Charter | Status | Duration | Defects |
|---|---|---|---|
| 1 — Price range filter | Executed | 45 min | BUG-009, BUG-010 |
| 2 — Cart across sessions | Deferred | – | – |
| 3 — Checkout flow interruptions | Executed | 45 min | BUG-005 |
| 4 — Mobile viewport | Deferred | – | – |

Two charters, 90 minutes in total, produced three defects — including the most severe one
found during the project.

---

## 3. Defects

| ID | Title | Severity | Priority | Area |
|---|---|---|---|---|
| BUG-005 | Cart page renders empty after the cart expires; the 404 is not handled | Major | High | Cart |
| BUG-006 | Order total is not displayed at any point after the cart step | Major | High | Checkout |
| BUG-001 | Postcode lookup returns an incorrect city and state | Minor | High | Address autofill |
| BUG-002 | No confirmation message after a successful registration | Minor | Medium | Registration |
| BUG-003 | Password strength indicator updates only on focus loss | Minor | Medium | Registration |
| BUG-004 | Cart line total and order total show different states until focus loss | Minor | Medium | Cart |
| BUG-007 | Payment reported as successful for methods where no payment occurs | Minor | Medium | Checkout |
| BUG-008 | Billing address is not prefilled and is not retained between orders | Minor | Medium | Checkout |
| BUG-009 | Product list renders empty at the full price range after a null response | Minor | Medium | Catalogue |
| BUG-010 | Filter and sort state is not reflected in the URL | Minor | Medium | Catalogue |

**By severity:** Critical 0 · Major 2 · Minor 8 · Trivial 0

**By area:** Registration 3 · Cart and checkout 5 · Catalogue 2

**By how they were found:** test cases 7 · exploratory sessions 3

---

## 4. Patterns across defects

Four of the ten defects fall into two pairs that share a mechanism. These are more useful to
the development team than the individual reports, because each pair is likely to be one fix
rather than two.

### Updates bound to focus loss rather than to input

**BUG-003** and **BUG-004** are the same fault in different components. The password strength
indicator on the registration form and the quantity field in the cart both recalculate only
when the field loses focus. In both cases a neighbouring element in the same control updates
correctly on every keystroke, so the two halves of each control disagree with each other until
the user clicks elsewhere.

Both are rated Minor individually. Together they suggest a shared form-handling approach that
is worth reviewing rather than patching twice.

### Null returned where a collection is expected

**BUG-005** and **BUG-009** both follow an API response containing `null` in place of a
collection — cart items in one case, products in the other. The API is not at fault in the
first case: a `404` for an expired cart is a correct answer that the frontend does not handle.

What differs is the consequence. In BUG-009 the frontend degraded gracefully and rendered its
empty state. In BUG-005 it raised an exception and rendered nothing at all, leaving the user on
a blank page. The same input produced a tolerable result in one component and an unusable one
in another, which points at inconsistent defensive handling rather than at a single missing
check.

### Information withheld at the point of decision

Three defects share a theme rather than a mechanism. **BUG-002** gives the user no confirmation
that their account was created. **BUG-006** never shows the amount due after the cart step.
**BUG-007** states that a payment succeeded when no payment has been made. In each case the
application is silent or wrong at exactly the moment the customer is deciding whether something
worked.

### A defect whose workaround leads into another defect

**BUG-006** gives the customer no way to check the amount except by returning to the cart. That
is the navigation that exposed **BUG-005**, where the cart page can render blank and
unrecoverable. The natural response to the first defect takes the customer towards the second.

---

## 5. Quality risks

| Risk | Evidence |
|---|---|
| A customer can be left unable to view their cart or continue checkout, with no error message and no obvious recovery | BUG-005 |
| A customer can place an order without ever being shown its cost | BUG-006 |
| A customer can be told a payment succeeded when they still owe the full amount | BUG-007 |
| Address data can be silently wrong, in registration and on every order | BUG-001, BUG-008 |
| The catalogue can present itself as empty when it is not | BUG-009 |
| Error states are not surfaced to the user anywhere that was tested: failures appear as blank areas or as nothing at all | BUG-005, BUG-002, BUG-009 |

The last row is the broadest finding of the project. Across three separate failures, the
application gave the user no indication that anything had gone wrong. A customer encountering
any of them has no reason to suspect the application rather than themselves.

---

## 6. What was not covered

- **Catalogue, search and contact form test cases** — assigned to the automated suite. The
  catalogue was explored manually in charter 1, so it is not untested, but the scripted cases
  have not been executed.
- **Cart behaviour across sessions and browser tabs** (charter 2) and **the mobile viewport**
  (charter 4) — designed and deferred. These are the clearest remaining gaps in manual
  coverage. The mobile gap matters most: nothing in this report says anything about how the
  purchase path behaves on a phone.
- **Performance, security and accessibility** — out of scope from the start.
- **Payment processing beyond the application's own flow** — out of scope.

Two defects found here, BUG-005 and BUG-010, were reached only by leaving the application and
coming back to it. Any area tested solely by moving forwards through a flow should be assumed
to have the same class of defect still in it.

---

## 7. Notes on the environment

The application is a shared demonstration environment used by other testers at the same time.
This risk was recorded in the test plan and materialised twice:

- The products endpoint returned `500 Internal Server Error` for a period during charter 1 and
  recovered without intervention. Testing during that window was treated as unreliable and the
  observation was attached to BUG-009 rather than filed as a defect.
- The brand filter list gained entries between page loads. An apparent difference between
  Chrome and Firefox turned out to be two page loads taken at different times, not browser
  behaviour, and was not filed.

Both were investigated and set aside deliberately. On a shared environment a single server
error or a changed data set does not distinguish an application defect from someone else's
test run.

---

## 8. Recommendation

**This build should not be released without addressing BUG-005 and BUG-006.**

BUG-006 means every customer places an order without being shown its cost. BUG-005 means a
customer who leaves the site for a few minutes and comes back can find their cart unusable,
with no message and no visible way to recover. Both are on the purchase path, both are reached
by ordinary behaviour, and both have straightforward fixes: carry the total through the
remaining checkout steps, and handle a `404` from the cart endpoint with an empty-cart state.

**BUG-001 should be addressed next despite its Minor severity.** It is rated Minor because the
autofilled values can be corrected by hand, but it is systematic, it affects both registration
and every order, and it silently produces addresses in the wrong region for customers who trust
the feature the application advertises.

**The remaining Minor defects can be scheduled normally**, with BUG-003 and BUG-004 reviewed
together, as should BUG-005 and BUG-009.

**Before the next release cycle**, the two deferred charters should be executed. The mobile
viewport in particular is entirely untested, and the defects found by interrupting flows
suggest that is where the remaining ones are.
