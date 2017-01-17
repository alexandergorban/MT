module.exports =
    require('angular')
        .module('home', [])
        .controller('HomeController', require("./controller"))
        .name;


