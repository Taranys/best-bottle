describe('Beer tests', function () {
    describe('Beer online', function () {
        it('should connect with user "user"', function () {
            browser.get('/#');

            expect(element(by.id('userMenu')).getAttribute('class')).toContain('btn-warning');

            element(by.id('userMenu')).click();

            element(by.id('authenticationPage')).click();
            expect(browser.getLocationAbsUrl()).toMatch("#/login");

            element(by.model('username')).sendKeys('user');
            element(by.model('password')).sendKeys('user');

            element(by.id('connectButton')).click();
            expect(browser.getLocationAbsUrl()).toMatch("#/");
            expect(element(by.id('userMenu')).getAttribute('class')).toContain('btn-success');
        });
    });
});
