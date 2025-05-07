import { checkA11y, injectAxe } from "axe-playwright";
import { Helper } from "codeceptjs";
import { resolve } from "path";
import { readFileSync } from "fs";

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

interface Allure {
	addAttachment(name: string, buffer: Buffer | string, type: string): void;
}

let outputDir: string;
let fileName: string;
let allure: Allure;

class A11yHelper extends Helper {
	constructor(config: { [key: string]: unknown }) {
		super(config);
		outputDir = config.outputDir || codeceptjs.config.get().output;
	}

	/**
	 * Run a11y check
	 * @param  {Options} opts - The options data
	 */
	async runA11yCheck(opts?: Options) {
		const { Playwright, A11yHelper } = this.helpers;
		if (!Playwright) throw new Error("Accessibility Tests only support Playwright - Chromium at the moment.");

		const { page } = Playwright;
		const _opts = { ...defaultRunA11YOpts, ...A11yHelper.config, ...opts };
		fileName = `${Date.now().toString()}_${_opts.reportFileName}`;

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
				reportFileName: fileName,
			},
		);
	}

	protected async _before(): Promise<void> {
		allure = codeceptjs.container.plugins("allure");
	}

	async _failed(test: Mocha.Test) {
		await this.helpers.Playwright.browserContext.close();
		this._handleArtifacts(test);
		if (allure) {
			await this._attachArtifacts(test);
		}
	}

	async _passed(test: Mocha.Test) {
		await this.helpers.Playwright.browserContext.close();
		this._handleArtifacts(test);
		if (allure) {
			await this._attachArtifacts(test);
		}
	}
	
	_handleArtifacts(test: Mocha.Test) {
	        if (fileName && outputDir) {
	            (test.artifacts as any).a11yReports = resolve(outputDir, fileName);
		}
	}
	
	private async _attachArtifacts(test: Mocha.Test): Promise<void> {
		const timeString: string = Date.now().toString();
		const FORMAT: string = "application/zip";

		await this.helpers.Playwright.browserContext.close();
		for (const [key, value] of Object.entries(test.artifacts)) {
			if (key !== "screenshot") {
				if (value) {
					if (key === "browserLogs" || key === "webSocketLogs")
						allure.addAttachment(`${key}:`, readFileSync(value), "text/plain");
					// The trace of session would be named like trace_${sessionName} that's why we don't have exact key here
					if (key.includes("trace"))
						allure.addAttachment(`${test.title} (${timeString}) - ${key}`, readFileSync(value), FORMAT);
					if (key.toLowerCase().includes("a11y"))
						allure.addAttachment(`${test.title} (${timeString}) - ${key}`, readFileSync(value), "text/html");
				}
			}
		}
	}
}

export = A11yHelper;
