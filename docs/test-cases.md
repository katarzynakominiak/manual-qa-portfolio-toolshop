# Test Cases — Toolshop

Status values: `Pass`, `Fail`, `Blocked`, `Not run`.
Failed cases link to the corresponding defect report.

Coverage is split between manual and automated testing. Registration, the cart and the
checkout flow were executed manually, because they involve judgement about what the user is
shown and when. The catalogue, search and contact form are covered by the automated suite in
`tests/` — they are data-driven and repetitive, which automation exercises more thoroughly
than a person does. Cases marked `Not run` below are covered there, not skipped.

## Registration and login

| ID | Title | Preconditions | Steps | Expected result | Status | Defect |
|---|---|---|---|---|---|---|
| TC-001 | Register with valid data | User is logged out | 1. Open registration page<br>2. Fill all required fields with valid data<br>3. Submit | Account is created and the user can log in | Pass | BUG -001, BUG -002, BUG -003|
| TC-002 | Register with an already used e-mail | An account with this e-mail exists | 1. Open registration page<br>2. Enter the existing e-mail<br>3. Submit | Validation message informs that the e-mail is already in use; no account created | Pass | |
| TC-003 | Log in with valid credentials | A registered account exists | 1. Open login page<br>2. Enter valid credentials<br>3. Submit | User is logged in and redirected to the account area | Pass | |
| TC-004 | Log in with an invalid password | A registered account exists | 1. Open login page<br>2. Enter a valid e-mail and a wrong password<br>3. Submit | Login is rejected with a clear error message; no indication of which field was wrong | Pass | |

## Product catalogue and filtering

> Covered by the automated suite — see [`tests/ui/filters.spec.ts`](../tests/ui/filters.spec.ts)
> and [`tests/ui/sort.spec.ts`](../tests/ui/sort.spec.ts).

| ID | Title | Expected result | Status | Automated test |
|---|---|---|---|---|
| TC-010 | Filter by a single category | Only products from that category are displayed | Pass | `filtering successfully by one category` |
| TC-011 | Combine category and brand filters | Only products matching both criteria are displayed | Pass | `filtering by category and brand shows only products matching both` |
| TC-012 | Price range filter | Only products within the selected range are displayed | Pass | `filtering by price range shows only products within the selected range` |
| TC-013 | Sorting | Products are ordered correctly for each option | Pass | `lists products in ascending price order`, `lists products in descending price order` |

Boundary behaviour of the price filter — a product at the exact limit, a minimum equal to the
maximum, the full range — was examined manually in
[exploratory charter 1](exploratory-charters.md). The automated test covers the general case.

## Search
> Covered by the automated suite — see [`tests/ui/search.spec.ts`](../tests/ui/search.spec.ts).

| ID | Title | Expected result | Status | Automated test |
|---|---|---|---|---|
| TC-020 | Search for an existing product | The product appears in the results | Pass | `search successfully with valid data` |
| TC-021 | Search for a non-existing product | An empty-state message is shown instead of an error or a blank page | Pass | `displaying no results after searching with invalid data` |

One further case is covered beyond those planned: `does nothing when search is submitted with
an empty query`, which records the application's current behaviour when the Search button is
pressed with no search term.

## Cart and checkout

| ID | Title | Preconditions | Steps | Expected result | Status | Defect |
|---|---|---|---|---|---|---|
| TC-030 | Add a product to the cart | A product detail page is open | 1. Add the product to the cart | The cart counter increases and the product is listed in the cart | Pass| |
| TC-031 | Change quantity in the cart | The cart contains one product | 1. Change the quantity<br> 2. Observe the total | The line total and order total are recalculated correctly | Pass |BUG-004 |
| TC-032 | Remove a product from the cart | The cart contains a product | 1. Remove the product | The product is removed and the total is updated | Pass| |
| TC-033 | Complete the checkout flow | The cart contains a product and the user is logged in | 1. Open the cart<br> 2. Go through every checkout step<br> 3. Place the order | The order is placed and a confirmation is displayed | Pass| BUG-006, BUG-007, BUG-008

## Contact form
> Covered by the automated suite — see
> [`tests/ui/contact-form.spec.ts`](../tests/ui/contact-form.spec.ts).

| ID | Title | Expected result | Status | Automated test |
|---|---|---|---|---|
| TC-040 | Submit with all required fields | A confirmation message is displayed | Pass | `submits successfully with valid data` |
| TC-041 | Submit with an empty required field | A validation message points to the empty field; the form is not submitted | Pass | `shows a validation error for every required field when submitted empty`, plus one generated test per field |
| TC-042 | Submit with an invalid e-mail format | A validation message about the e-mail format is displayed | Pass | `rejects an email address in an invalid format` |

TC-041 is covered twice over. One test submits an entirely empty form; four further tests are
generated from a list of required fields, each filling the form correctly and then clearing a
single field. The subject is excluded from the generated set because its `<select>` offers no
empty option once a category has been chosen, so a user cannot clear it.
