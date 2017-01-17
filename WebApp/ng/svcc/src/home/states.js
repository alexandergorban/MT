var exports = module.exports = function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        template: '<b>This is HTML for Home State Template</b>',
        controller: 'HomeController'
    });
};
exports.$inject = ['$stateProvider'];
