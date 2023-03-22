import { checkA11y, injectAxe } from "axe-playwright";
import { Helper } from "codeceptjs";
import { axeOptionsConfig } from "axe-playwright/dist/types";
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

type options = {
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
	async runA11yCheck(opts?: options) {
		// @ts-ignore
		const playwright = this["helpers"]["Playwright"];
		if (!playwright) throw Error("Accessibility Tests only support with Playwright - Chromium at the moment.");
		const { page } = playwright;

		// @ts-ignore
		const a11yHelper = this["helpers"]["A11yHelper"];

		const _opts = { ...defaultRunA11YOpts, ...a11yHelper.config, ...opts };

		if (_opts.skipFailures === false) {
			_opts.reporter = "default";
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
			},
		);
	}
}

export = A11yHelper;
