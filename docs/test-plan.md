# Test Plan — Toolshop (practicesoftwaretesting.com)

## 1. Purpose

Verify that the core purchasing path and supporting features of the Toolshop
application work as expected, and document any defects found.

## 2. Scope

**In scope**

- Registration and login
- Product catalogue: browsing, filtering by category and brand, price range, sorting
- Search
- Product detail page, adding to cart
- Cart management: quantities, removal, totals
- Checkout flow
- Contact form
- User account pages

**Out of scope**

- Performance and load testing
- Security testing
- Accessibility audit
- Payment provider integration beyond the application's own flow

## 3. Test approach

| Technique | Where applied |
|---|---|
| Functional testing | All in-scope areas, against expected behaviour |
| Exploratory testing | Checkout and filtering, time-boxed charters |
| Negative testing | Form validation, invalid credentials, boundary values |
| Boundary value analysis | Quantity fields, price range filter |
| Equivalence partitioning | Form input fields |
| Cross-browser testing | Chrome and Firefox |
| Responsive testing | Desktop and mobile viewport |

### Manual and automated coverage

Testing is split between manual execution and an automated suite, by what each does better:

| Approach | Areas | Why |
|---|---|---|
| Manual | Registration, cart, checkout flow | Judgement about what the user is shown and when; defects here are about information and timing rather than values |
| Manual, exploratory | Price range filter, checkout interruptions | Finding conditions no scripted case anticipates |
| Automated | Catalogue filtering and sorting, search, contact form validation | Data-driven and repetitive; many combinations, cheap to exercise in code |
| Automated, API | Postcode lookup endpoint | Regression coverage for BUG-001, which is deterministic and verifiable without the interface |

Manual testing runs first in each area. An automated test checks only what it was told to
check, so exploring an area before automating it is what finds the conditions worth
automating against.

## 4. Test environment

| Item | Value |
|---|---|
| URL | https://practicesoftwaretesting.com/ |
| Browsers | Chrome 156.0.8078.80, Firefox 159.0 |
| OS | Windows 11 |
| Viewports | 1920x1080, 390x844 |

## 5. Entry criteria

- Application is reachable and the registration flow allows creating a test account
- Test data prepared (test accounts, product selection)

## 6. Exit criteria

- All planned test cases executed
- All defects documented with reproduction steps and evidence
- Final test report published

## 7. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Demo data reset during testing | Results not reproducible | Record timestamps and product IDs in defect reports |
| Shared environment modified by other users | False positives | Re-verify each defect before reporting |
| Unknown intended behaviour (no requirements) | Disputable defects | Document the expected result and the reasoning behind it |

## 8. Deliverables

- Test cases
- Exploratory testing charters and session notes
- Defect reports with evidence
- Final test report
- Automated test suite (`tests/`) with a README describing what it covers and why

---

## Revision history

| Date | Change |
|---|---|
| 2026-11-02 | Initial plan |
| 2026-11-04 | Added the split between manual and automated coverage, decided after the registration and checkout areas had been tested manually |