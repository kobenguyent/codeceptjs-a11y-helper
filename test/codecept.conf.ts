export const config: CodeceptJS.MainConfig = {
	tests: "./*_test.ts",
	output: "./output",
	helpers: {
		Playwright: {
			url: "https://js.devexpress.com/Demos/WidgetsGallery/Demo/Slider/Overview/jQuery/Light",
			timeout: 50_000,
			trace: true,
			keepTraceForPassedTests: true,
		},
		A11yHelper: {
			require: "../src/index",
		},
	},
	include: {
		I: "./steps_file",
	},
	name: "test",
	plugins: {
		allure: {
			enabled: true,
			require: "allure-codeceptjs",
			outputDir: "./output",
		},
	},
};
