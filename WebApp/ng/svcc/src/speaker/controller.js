function SpeakerController ($scope, speakers) {
    $scope.speakers = speakers;
}

SpeakerController.$inject = ['$scope', 'speakers'];

module.exports = SpeakerController;
