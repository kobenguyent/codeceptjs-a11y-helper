/// <reference types='codeceptjs' />
type steps_file = typeof import("./steps_file");
type A11yHelper = import("../src/index");

declare namespace CodeceptJS {
	interface SupportObject {
		I: I;
		current: any;
	}
	interface Methods extends Playwright, A11yHelper, AllureHelper {}
	interface I extends ReturnType<steps_file>, WithTranslation<Playwright>, WithTranslation<A11yHelper> {}
	namespace Translation {
		interface Actions {}
	}
}
