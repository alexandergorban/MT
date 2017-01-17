angular.module('MTApp').run(['$templateCache', function ($templateCache) {
    $templateCache.put('/templates/home/home.html', '<b>This is HTML for Home State Template (from template.js)</b>\r\n');
}]);