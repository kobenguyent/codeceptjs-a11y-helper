export = A11yHelper;

declare type a11yCheckOptions = {context: string, axeOptions: any, detailedReport: boolean, detailedReportOptions: any, skipFailures: boolean, reporter: 'html', outputDir: string, reportFileName: string}

declare class A11yHelper {
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
    runA11yCheck(options?: a11yCheckOptions):any;
}
