# Test Cases — Toolshop

Status values: `Pass`, `Fail`, `Blocked`, `Not run`.
Failed cases link to the corresponding defect report.

## Registration and login

| ID | Title | Preconditions | Steps | Expected result | Status | Defect |
|---|---|---|---|---|---|---|
| TC-001 | Register with valid data | User is logged out | 1. Open registration page<br>2. Fill all required fields with valid data<br>3. Submit | Account is created and the user can log in | Pass | BUG -001, BUG -002, BUG -003|
| TC-002 | Register with an already used e-mail | An account with this e-mail exists | 1. Open registration page<br>2. Enter the existing e-mail<br>3. Submit | Validation message informs that the e-mail is already in use; no account created | Pass | |
| TC-003 | Log in with valid credentials | A registered account exists | 1. Open login page<br>2. Enter valid credentials<br>3. Submit | User is logged in and redirected to the account area | Pass | |
| TC-004 | Log in with an invalid password | A registered account exists | 1. Open login page<br>2. Enter a valid e-mail and a wrong password<br>3. Submit | Login is rejected with a clear error message; no indication of which field was wrong | Pass | |

## Product catalogue and filtering

| ID | Title | Preconditions | Steps | Expected result | Status | Defect |
|---|---|---|---|---|---|---|
| TC-010 | Filter by a single category | Home page is open | 1. Select one category filter | Only products from that category are displayed | Not run||
| TC-011 | Combine category and brand filters | Home page is open | 1. Select a category<br>2. Select a brand | Only products matching both criteria are displayed| Not run| |
| TC-012 | Price range filter boundaries | Home page is open | 1. Set the price range to the lowest possible values | Only products within the range are displayed; no product above the maximum appears |  Not run| |
| TC-013 | Sorting | Home page is open | 1. Apply each available sort option | Products are ordered correctly for each option | Not run| |

## Search

| ID | Title | Preconditions | Steps | Expected result | Status | Defect |
|---|---|---|---|---|---|---|
| TC-020 | Search for an existing product | Home page is open | 1. Enter the exact name of a known product<br>2. Submit | The product appears in the results | Not run | |
| TC-021 | Search for a non-existing product | Home page is open | 1. Enter a random string<br>2. Submit | An empty-state message is shown instead of an error or a blank page | Not run | |

## Cart and checkout

| ID | Title | Preconditions | Steps | Expected result | Status | Defect |
|---|---|---|---|---|---|---|
| TC-030 | Add a product to the cart | A product detail page is open | 1. Add the product to the cart | The cart counter increases and the product is listed in the cart | Pass| |
| TC-031 | Change quantity in the cart | The cart contains one product | 1. Change the quantity<br> 2. Observe the total | The line total and order total are recalculated correctly | Not run |bug |
| TC-032 | Remove a product from the cart | The cart contains a product | 1. Remove the product | The product is removed and the total is updated | Pass| |
| TC-033 | Complete the checkout flow | The cart contains a product and the user is logged in | 1. Open the cart<br> 2. Go through every checkout step<br> 3. Place the order | The order is placed and a confirmation is displayed | Not run| bug

## Contact form

| ID | Title | Preconditions | Steps | Expected result | Status | Defect |
|---|---|---|---|---|---|---|
| TC-040 | Submit with all required fields | Contact page is open | 1. Fill all required fields<br>2. Submit | A confirmation message is displayed | Not run | |
| TC-041 | Submit with an empty required field | Contact page is open | 1. Leave one required field empty<br>2. Submit | A validation message points to the empty field; the form is not submitted | Not run | |
| TC-042 | Submit with an invalid e-mail format | Contact page is open | 1. Enter an e-mail without `@`<br>2. Submit | A validation message about the e-mail format is displayed | Not run | |
