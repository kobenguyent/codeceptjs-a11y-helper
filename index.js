const Helper = require('@codeceptjs/helper');
const { checkA11y, injectAxe } = require('axe-playwright');
const defaultAxeOptions = {
  runOnly: {
    type: 'tag',
    values: [
      'wcag2a',
      'wcag2aa',
      'wcag2aaa',
      'wcag21a',
      'wcag21aa',
      'wcag22aa',
      'best-practice',
      'wcag***',
      'ACT',
      'experimental',
      'cat.*',
    ],
  },
};

const defaultRunA11YOpts = {
  context: null,
  axeOptions: defaultAxeOptions,
  detailedReport: true,
  detailedReportOptions: { html: true },
  skipFailures: true,
  reporter: 'html',
  outputDir: 'output',
  reportFileName: 'accessibility-audit.html',
};

class A11yHelper extends Helper {
  /**
   * Run a11y check
   * @param  {Object} opts The options data
   * @param  {String}  opts.context    context to check against
   * @param  {object}  opts.axeOptions    axe options
   * @param  {boolean}  opts.detailedReport    detailed report
   * @param  {object}  opts.detailedReportOptions    detailed report options
   * @param  {boolean}  opts.skipFailures    skip failures
   * @param  {String}  opts.reporter   reporter type
   * @param  {String}  opts.outputDir   output folder
   * @param  {String}  opts.reportFileName   report name
   */
  async runA11yCheck(opts) {
    const playwright = this['helpers']['Playwright'];
    if (!playwright)
      throw Error(
        'Accessibility Tests only support with Playwright - Chromium at the moment.'
      );
    const { page } = playwright;

    const a11yHelper = this['helpers']['A11yHelper'];

    const _opts = { ...defaultRunA11YOpts, ...a11yHelper.config, ...opts };

    if (_opts.skipFailures === false) {
      _opts.reporter = 'default';
    }

    await injectAxe(page);

    await checkA11y(
      page,
      _opts.context,
      {
        axeOptions: _opts.axeOptions,
        detailedReport: _opts.detailedReport,
        detailedReportOptions: _opts.detailedReportOptions,
      },
      _opts.skipFailures,
      _opts.reporter,
      {
        outputDir: _opts.outputDir,
        reportFileName: _opts.reportFileName,
      }
    );
  }
}

module.exports = A11yHelper;
