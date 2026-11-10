# Automated Tests

Playwright test suite for [practicesoftwaretesting.com](https://practicesoftwaretesting.com/),
covering the parts of the application that are repetitive and data-driven. The manual testing
that preceded it, and the defects it found, are documented in [`../docs`](../docs) and
[`../bugs`](../bugs).

## Running the tests

```bash
npm install            # first time only
npx playwright test    # run everything
```

Useful variations:

```bash
npx playwright test filters              # one file, by path fragment
npx playwright test -g "ascending"       # by test title
npx playwright test --project=chromium   # one browser
npx playwright test --repeat-each=3      # run each test three times
npx playwright test --headed --debug     # step through with the inspector
npx playwright show-report               # open the HTML report
```

Artifacts are kept for failed tests only: a screenshot, a video and a trace. The trace is the
most useful of the three — it shows the page state before and after each step, with the
locator highlighted.

## Structure

| Path | Contents |
|---|---|
| `tests/ui/` | UI test specs, one file per area |
| `tests/api/` | API tests |
| `pages/` | Page and component objects — locators and the actions available on them |
| `test-data/` | Test data, kept out of the specs so names and values live in one place |

Page objects expose locators and methods, never assertions. A method takes a parameter rather
than hard-coding a value: `category(name)` rather than a `hammerCheckbox` field, so a single
class serves every test in that area.

## What is covered here, and what is not

Coverage is split between manual and automated testing by what each does better.

| Area | Approach | Why |
|---|---|---|
| Contact form validation | Automated | Repetitive, data-driven, one test per required field |
| Catalogue filtering and sorting | Automated | Many combinations, and sorting needs values read and compared |
| Search | Automated | Deterministic inputs and outputs |
| Registration, cart, checkout | Manual | The defects there concern what the user is shown and when — judgement, not values |
| Price range filter, checkout interruptions | Manual, exploratory | Finding conditions no scripted case anticipates |

The two most serious defects in this project (BUG-005 and BUG-006) came out of exploratory
sessions, not from test cases. Both were reached by leaving a flow and coming back to it —
something a scripted run never does.

## Application behaviour that affects how these tests are written

Four properties of this application shaped the test design. Each cost an hour or more to
discover, so they are recorded here rather than learned again.

**Validation messages appear only after a submit attempt.** Clearing a required field and
moving focus away shows nothing; the message is rendered when the form is submitted. A test
that clears a field and immediately asserts on the error will find no element at all.

**The form model lags behind the DOM.** The application is built with Angular, which keeps its
own model of a form separately from the input elements. Setting a value with `fill()` updates
the DOM immediately, but the model can still hold the previous value for a moment. A click
sent straight after a `fill()` can be handled while the form is still considered valid, so the
submission goes through with a field the page shows as empty.

The fix is to wait for a signal that the value has reached the model, not to add a delay:

- `await expect(input).toHaveValue(text)` before clicking — enough for the search field
- `await expect(input).toHaveClass(/ng-invalid/)` — Angular switches a control from
  `ng-valid` to `ng-invalid` once a cleared value has registered, which is the exact moment
  the test needs to wait for

**Product names overlap.** `Claw Hammer` is contained in `Claw Hammer with Fiberglass Handle`,
so a substring match finds both. Locators for a specific product anchor the match to the whole
text.

**Checkbox `data-test` attributes hold generated database ids** such as
`category-01M702WMN3HXRB005VERFCXSH1`. These change when the catalogue data is reseeded, which
has happened during this project. Filters are located by their visible label instead.

## Known limitations

**Results are checked on the first page only.** The catalogue is paginated, so a product that
is absent from the first page is not necessarily absent from the results. Tests that assert a
product is missing use a category narrow enough to fit on one page; sorting is verified on the
first page and was confirmed manually on the others.

**Counts are avoided where possible.** The environment is shared with other people testing the
same application, who create products, brands and accounts in it. Tests assert that a specific
product is or is not listed rather than that a particular number of results was returned.

**The catalogue re-filters asynchronously after a slider change.** Pressing a key again
before that completes leaves the product list behind the slider position, so a test driving
the slider has to pause between presses. There is nothing observable to wait for — the
handle's value updates immediately while the list updates on its own schedule — so this is
the one place in the suite with a fixed delay rather than a condition.

**The postcode lookup API test is written but not finished.** It documents BUG-001 using
`test.fail()`, so that the suite reports an error if the defect is ever fixed and the
annotation is left behind.

## Environment

The application is a shared demonstration site. During this project it returned
`500 Internal Server Error` for a period and recovered without intervention, and its catalogue
grew from 9 to over 40 products as other people added data. A failing test is worth checking
against the application by hand before it is treated as a defect — on this environment, and
at the speed automation runs, not every failure is the application's fault.
