var exports = module.exports = function ($stateProvider) {
    $stateProvider.state('speaker', {
        url: '/speaker',
        template: '<b>This is HTML for Speaker State Template</b>',
        controller: 'SpeakerController',
        resolve: {
            speakers: getSpeakers
        }
    });
};
exports.$inject = ['$stateProvider'];

function getSpeakers(Speaker) {
    return Speaker.fetchAll();
}
getSpeakers.$inject = ['Speaker'];