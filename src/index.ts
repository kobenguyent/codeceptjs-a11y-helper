import { checkA11y, injectAxe } from "axe-playwright";
import { Helper } from "codeceptjs";

const defaultAxeOptions = {
  runOnly: {
    type: "tag",
    values: [
      "wcag2a",
      "wcag2aa",
      "wcag2aaa",
      "wcag21a",
      "wcag21aa",
      "wcag22aa",
      "best-practice",
      "wcag***",
      "ACT",
      "experimental",
      "cat.*",
    ],
  },
};

const defaultRunA11YOpts = {
  context: null,
  axeOptions: defaultAxeOptions,
  detailedReport: true,
  detailedReportOptions: { html: true },
  skipFailures: true,
  reporter: "html",
  outputDir: "output",
  reportFileName: "accessibility-audit.html",
};

type Options = {
  context?: string;
  axeOptions?: any;
  detailedReport?: boolean;
  detailedReportOptions?: any;
  skipFailures?: boolean;
  reporter?: "default" | "html";
  outputDir?: string;
  reportFileName?: string;
};

class A11yHelper extends Helper {
  /**
   * Run a11y check
   * @param  {Options} opts - The options data
   */
  async runA11yCheck(opts?: Options) {
    const { Playwright, A11yHelper } = this.helpers;
    if (!Playwright) throw new Error("Accessibility Tests only support Playwright - Chromium at the moment.");

    const { page } = Playwright;
    const _opts = { ...defaultRunA11YOpts, ...A11yHelper.config, ...opts };

    if (_opts.skipFailures === false) {
      _opts.reporter = "default";
    }

    await injectAxe(page);

    await checkA11y(page, _opts.context, {
      axeOptions: _opts.axeOptions,
      detailedReport: _opts.detailedReport,
      detailedReportOptions: _opts.detailedReportOptions,
    }, _opts.skipFailures, _opts.reporter, {
      outputDir: _opts.outputDir,
      reportFileName: _opts.reportFileName,
    });
  }
}

export default A11yHelper;