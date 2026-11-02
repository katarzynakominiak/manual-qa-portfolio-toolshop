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

## 4. Test environment

| Item | Value |
|---|---|
| URL | https://practicesoftwaretesting.com/ |
| Browsers | Chrome [version], Firefox [version] |
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
