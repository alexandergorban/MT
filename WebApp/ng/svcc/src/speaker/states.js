var exports = module.exports = function ($stateProvider) {
    $stateProvider.state('speaker', {
        url: '/speaker',
        templateUrl: '/templates/speaker/speaker.html',
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