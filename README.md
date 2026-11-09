# Manual QA Portfolio — Practice Software Testing (Toolshop)

Manual testing project for the demo e-commerce application
[practicesoftwaretesting.com](https://practicesoftwaretesting.com/) — a tool shop
with product catalogue, filtering, cart, checkout, user accounts and a contact form.

The goal of this repository is to document a complete manual testing cycle:
planning, test design, execution, defect reporting and a final report.

## What's inside

| Path | Contents |
|---|---|
| [`docs/test-plan.md`](docs/test-plan.md) | Scope, approach, environment, risks, entry/exit criteria |
| [`docs/test-cases.md`](docs/test-cases.md) | Test cases per functional area |
| [`docs/exploratory-charters.md`](docs/exploratory-charters.md) | Session-based exploratory testing charters and notes |
| [`bugs/`](bugs/) | Individual defect reports |
| [`docs/test-report.md`](docs/test-report.md) | Final summary: coverage, defect statistics, quality risks |
| [`screenshots/`](screenshots/) | Evidence attached to defect reports |
| [`tests/`](tests/) | Automated Playwright suite — see its [README](tests/README.md) for coverage and design notes |

## Scope of testing

- User registration and login
- Product catalogue: browsing, category and brand filters, price range, sorting
- Search
- Product detail page and adding items to cart
- Cart: quantity changes, removing items, totals
- Checkout flow
- Contact form
- User account pages

## Test environment

| Item | Value |
|---|---|
| Application | https://practicesoftwaretesting.com/ (v2.5, Angular 20.0.5)  |
| Browsers | Chrome 156.0.8078.80, Firefox 159.0 |
| Operating system | Windows 11 |
| Devices | Desktop 2560x1440, 100% scaling, mobile viewport 390x844 |
| Test period | 2026-11-02 – 2026-11-04 |

## Summary of results

| Metric | Value |
|---|---|
| Test cases executed | 8 of 17 |
| Passed / Failed | 8 / 0 |
| Defects reported | 10 |
| Critical / Major / Minor | 0 / 2 / 8 |

Nine test cases are covered by the automated suite rather than executed manually — see the
[test cases](docs/test-cases.md) for how coverage is split.

See the [final test report](docs/test-report.md) for coverage, defect patterns and
recommendations.

## About

Manual testing project built as a portfolio piece by a QA Engineer with commercial
experience in pre-release testing of mobile, tablet and wearable software.
ISTQB CTFL and ISTQB CT-AI certified.
