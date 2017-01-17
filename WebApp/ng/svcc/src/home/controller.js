function HomeController ($scope) {
    $scope.sessions =
        [
            {title: 'JavaScript', speaker: 'Crockford'},
            {title: 'C', speaker: 'Ritchie'},
            {title: 'Jave', speaker: 'Gosling'},
            {title: 'C#', speaker: 'Hejlsberg'}
        ];
}

HomeController.$inject = ['$scope'];

module.exports = HomeController;
