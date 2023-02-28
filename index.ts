import Helper from "@codeceptjs/helper";
import {checkA11y, injectAxe} from "axe-playwright";
const defaultAxeOptions = {
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
}

class A11yHelper extends Helper {

    async runA11yCheck(opts = {context: null, axeOptions: defaultAxeOptions, detailedReport: true, detailedReportOptions: { html: true }, skipFailures: true, reporter: 'html', outputDir: 'output', reportFileName: 'accessibility-audit.html'}) {
        if (this['helpers'].Playwright) throw Error('Accessibility Tests only support with Playwright - Chromium at the momment.')
        const { page } = this['helpers'].Playwright;

        const _axeOptions:any = {...defaultAxeOptions, ...opts.axeOptions}

        await injectAxe(page)
        await checkA11y(page, opts.context, {
                axeOptions: _axeOptions,
                detailedReport: opts.detailedReport,
                detailedReportOptions: opts.detailedReportOptions,
            },
            // @ts-ignore
            opts.skipFailures, opts.reporter, {
                outputDir: opts.outputDir,
                reportFileName: opts.reportFileName
            })
    }

}

export = A11yHelper
