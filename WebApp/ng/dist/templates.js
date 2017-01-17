angular.module('MTApp').run(['$templateCache', function ($templateCache) {
    $templateCache.put('/templates/home/home.html', '<b>This is HTML for Home State Template (from template.js)</b>\r\n');
    $templateCache.put('/templates/speaker/speaker.html', '<h1>Speakers</h1>\r\n<ul>\r\n    <li ng-repeat="speaker in speakers">\r\n        {{ speaker.fistName }} {{ speaker.lastName }}\r\n    </li>\r\n</ul>');
}]);