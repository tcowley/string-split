var test = require('tape-catch');
var asciiStringSplit = require('../index.js');

test('test strings shorter than width', function (t) {
    t.plan(2);

    var a = '';
    var b = asciiStringSplit(a, 10);
    var c = [''];
    t.deepEquals(b, c, "empty string");

    a = 'A B C';
    b = asciiStringSplit(a, 10);
    c = [a];
    t.deepEquals(b, c, "string shorter than width");

});


test('test wrappable word at width boundary', function (t) {
    t.plan(3);

    a = '123456 123456';
    b = asciiStringSplit(a, 10);
    c = ['123456', '123456'];
    t.deepEquals(b, c, "6 character word with 4 spaces left until width is reached");

    a = '12345 123456';
    b = asciiStringSplit(a, 10);
    c = ['12345 123-', '456'];
    t.deepEquals(b, c, "6 character word with 5 spaces left until width is reached");

    a = '1234 123456';
    b = asciiStringSplit(a, 10);
    c = ['1234 123-', '456'];
    t.deepEquals(b, c, "6 character word with 6 spaces left until width is reached");



});

test('test un-wrappable word at width boundary', function (t) {

    a = '123456 12345';
    b = asciiStringSplit(a, 10);
    c = ['123456', '12345'];
    t.deepEquals(b, c, "5 character word with 4 spaces left until width is reached");
    
    a = '1234';
    t.throws(function() { asciiStringSplit(a, 1); },  "4 character word with 1 character width ");

    a = '1234';
    b = asciiStringSplit(a, 2);
    c = ['1-', '2-', '34'];
    t.deepEquals(b, c, "4 character word with 2 character width ");
    
    t.end();
    
});

test('test word longer than width', function (t) {
    t.plan(1);
    
    // word is longer than line:
    // - 20 character word on 10 character width

    a = '12345678901234567890';
    b = asciiStringSplit(a, 10);
    c = ['123456789-', '012345678-', '90'];
    t.deepEquals(b, c, "20 character word limited to with 10");
    
});

