# QA Portfolio — Practice Software Testing (Toolshop)

Testing project for the demo e-commerce application
[practicesoftwaretesting.com](https://practicesoftwaretesting.com/) — a tool shop with a
product catalogue, filtering, cart, checkout, user accounts and a contact form.

The repository documents a complete testing cycle: planning, test design, manual execution,
defect reporting, a final report, and an automated Playwright suite covering the areas where
automation does the job better.

## What's inside

| Path | Contents |
|---|---|
| [`docs/test-plan.md`](docs/test-plan.md) | Scope, approach, environment, risks, entry/exit criteria |
| [`docs/test-cases.md`](docs/test-cases.md) | Test cases per functional area, and which are automated |
| [`docs/exploratory-charters.md`](docs/exploratory-charters.md) | Session-based exploratory testing charters and notes |
| [`bugs/`](bugs/) | Individual defect reports |
| [`docs/test-report.md`](docs/test-report.md) | Final summary: coverage, defect patterns, quality risks |
| [`tests/`](tests/) | Automated Playwright suite — see its [README](tests/README.md) for coverage and design notes |
| [`screenshots/`](screenshots/) | Evidence attached to defect reports |

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

### Manual testing

| Metric | Value |
|---|---|
| Test cases executed | 8 |
| Passed / Failed | 8 / 0 |
| Exploratory sessions | 2 charters, 90 min |
| Defects reported | 10 |
| Critical / Major / Minor | 0 / 2 / 8 |

Registration, the cart and the checkout flow were tested by hand, because the defects there
concern what the user is shown and when. See the
[final test report](docs/test-report.md) for coverage, defect patterns and recommendations.

### Automated testing

| Metric | Value |
|---|---|
| Tests | 15 |
| Areas | Contact form, search, catalogue filtering, sorting |
| Browsers | Chromium, Firefox, WebKit |

The catalogue, search and contact form are covered by the Playwright suite in
[`tests/`](tests/) rather than by hand — they are data-driven and repetitive, which
automation exercises more thoroughly than a person does. The suite's
[README](tests/README.md) explains how coverage is split and which properties of the
application shaped the test design.

## About

A portfolio project by a QA Engineer with commercial experience in pre-release testing of
mobile, tablet and wearable software. ISTQB CTFL and ISTQB CT-AI certified.

Manual testing came first and shaped what was automated: eight of the ten defects recorded
here were found by hand, including both of the serious ones.
