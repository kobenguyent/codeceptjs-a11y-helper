[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/peternguyew)

# codeceptjs-a11y-helper

CodeceptJS Accessibility helper wraps on top of [axe-playwright](https://www.npmjs.com/package/axe-playwright) to perform a11y check against your web application.

NPM package: <https://www.npmjs.com/package/codeceptjs-a11y-helper>

## Installation

`npm i codeceptjs-a11y-helper --save-dev`

## Configuration

This helper should be added in your codeceptjs config file: `codecept.conf.*`

Example:

```
{
...
   helpers: {
     A11yHelper: {
      require: 'codeceptjs-a11y-helper',
    }
   }
...
}
```

## Usage

- To use this helper, you must enable Playwright helper.
- After install the helper, you can use it by calling `I.runA11yCheck()`
- If there is auto complete for I actor, try running `npx codeceptjs def`

### Options

By default, this setting is enabled, you can either input those settings in config file or `runA11yCheck()`, precedence is as followed:
defaults settings, settings in config, settings from `runA11yCheck()`

- context: null,
- axeOptions: `{
runOnly: {
type: 'tag',
values: ['wcag2a',
'wcag2aa',
'wcag2aaa',
'wcag21a',
'wcag21aa',
'wcag22aa',
'best-practice',
'wcag***',
'ACT',
'experimental',
'cat.*',],
},
}`
- detailedReport: true
- detailedReportOptions: { html: true },
- skipFailures: true,
- reporter: 'html',
- outputDir: 'output',
- reportFileName: 'accessibility-audit.html'

More info could be found [here](https://www.npmjs.com/package/axe-playwright)

_Note:_ If you pass `skipFailures=false`, test would fail if violations found and there is no HTML report generated.

- Within config file:

```
{
...
   helpers: {
     A11yHelper: {
      require: 'codeceptjs-a11y-helper',
      outputDir: 'hello',
      reportFileName: 'a11y-audit.html'
    }
   }
...
}
```

- From `runA11yCheck()`:

```
Feature('A11Y Check');

Scenario.only('a11y check',  async ({ I }) => {
    I.amOnPage('https://js.devexpress.com/Demos/WidgetsGallery/Demo/Slider/Overview/jQuery/Light/')
    await I.runA11yCheck({ outputDir: 'hello'})
});
```

Output

```
A11Y Check --
    [1]  Starting recording promises
    Timeouts:
 › [Session] Starting singleton browser session
  a11y check
    I am on page "https://js.devexpress.com/Demos/WidgetsGallery/Demo/Slider/Overview/jQuery/Light/"
    I run a11y check {"outputDir":"hello"}
HTML report was saved into the following directory /Users/kobenguyent/Desktop/codeceptjs-playwright-fun/hello/accessibility-audit.html
  ✔ OK in 6028ms


  OK  | 1 passed   // 7s

```
