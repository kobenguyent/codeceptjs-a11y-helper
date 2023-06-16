const { I } = inject();

Feature("A11Y Check");

Scenario("a11y check", async () => {
	I.amOnPage("/");
	await I.runA11yCheck();
});
