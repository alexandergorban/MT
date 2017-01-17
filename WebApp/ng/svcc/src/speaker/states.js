var exports = module.exports = function ($stateProvider) {
    $stateProvider.state('speaker', {
        url: '/speaker',
        template: '<b>This is HTML for Speaker State Template</b>',
        controller: 'SpeakerController'
    });
};
exports.$inject = ['$stateProvider'];
