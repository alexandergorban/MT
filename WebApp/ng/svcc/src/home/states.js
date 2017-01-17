var exports = module.exports = function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: '/templates/home/home.html',
        controller: 'HomeController'
    });
};
exports.$inject = ['$stateProvider'];
