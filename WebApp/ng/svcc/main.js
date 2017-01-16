require('angular').module('MTApp', []).controller('SVCCController', SVCCController);

function SVCCController ($scope) {
    $scope.sessions =
        [
            {title: 'JavaScript', speaker: 'Crockford'},
            {title: 'C', speaker: 'Ritchie'},
            {title: 'Jave', speaker: 'Gosling'},
            {title: 'C#', speaker: 'Hejlsberg'}
        ];
}

SVCCController.$inject = ['$scope'];
