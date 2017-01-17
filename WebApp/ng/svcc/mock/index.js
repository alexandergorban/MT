require('angular-mocks');
console.log('top1 svcc/mock/index.js');
var app = require('angular').module('MTApp');
app.require.push('ngMockE2E');
app.run(provideMocks);

console.log('top2 svss/mock/index.js');

function provideMocks($httpBackend) {
    
    $httpBackend.whenGET('/rest/speaker').respond(function (method, url, data) {
        console.log("Getting speakers");
        var speakers = require('../mock/data/speakers.json');
        return [200, speakers, {}];
    });

    // Pass any requests for the files
    $httpBackend.whenGET(/templates/).passThrouht();
}

provideMocks.$inject = ['$httpBackend'];
