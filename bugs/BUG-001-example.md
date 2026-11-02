# BUG-001 — [EXAMPLE — replace with a real defect] Order total not recalculated after quantity change in cart

> This file is an example of the expected format. Delete it once real defect reports are added.

| Field | Value |
|---|---|
| **Severity** | Major |
| **Priority** | High |
| **Area** | Cart |
| **Environment** | Chrome 131, Windows 11, viewport 1920x1080 |
| **URL** | https://practicesoftwaretesting.com/checkout |
| **Reported** | 2026-11-02 |
| **Related test case** | TC-031 |

## Steps to reproduce

1. Open the application and add any product to the cart.
2. Open the cart.
3. Change the quantity of the product from 1 to 3.
4. Observe the line total and the order total.

## Expected result

Both the line total and the order total are recalculated to reflect the new quantity,
consistently with how the totals update when a product is removed from the cart.

## Actual result

The line total updates to the new quantity, but the order total still shows the price
for a single item.

## Evidence

![Cart showing quantity 3 with a single-item order total](../screenshots/bug-001.png)

## Additional information

- Reproducibility: always — 5 out of 5 attempts
- Browsers affected: Chrome and Firefox
- Console errors: none
- Workaround: reloading the cart page shows the correct total
