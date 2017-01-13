var billGatesBirthday = '10-28-1955';
var gatesAge = function () {
    return (new Date() - new Date (billGatesBirthday)) / 1000 / 60 / 60 / 24 / 36 / 10;
};

document.getElementsByTagName('body')[0].onload = function () {
    document.body.innerHTML = 'Bill Gates Current Age Is: <b>' + gatesAge() + '</b>';
};