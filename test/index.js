var test = require('tape-catch');
var stringpad = require('../index.js');

// misc items:
// - empty string
// - string shorter than width

// width < 5 characters

// string longer than width:
// - white space at desired width boundary
// - 5 character word 


// word fits on the current line, so add it with a single preceding space

// existing line, at least 5 spaces left, word is at least 6 letters long
    // fill the rest of the line
    // but, there must be at least 3 chars after the split

// start a new line 

// wrap all really long words onto additional lines




test('test empty string with alignment', function (t) {
    t.plan(4);
    
    ['left', 'right', 'center', 'justify'].forEach(function(alignment) {
        var a = '';
        var b = stringpad(a, 10, alignment);
        var c = (new Array(11)).join(' ');
        t.equal(b, c, "empty string padded to specified width with alignment '" + alignment + "'");
    });

});

test('test short strings with various alignments', function (t) {
    t.plan(4);
    
    var c = [ 'A B C     ', '     A B C', '  A B C   ', 'A   B    C' ];

    ['left', 'right', 'center', 'justify'].forEach(function(alignment, i) {
        var a = 'A B C';
        var b = stringpad(a, 10, alignment);
        //console.log('[' + b + ']', '[' + c[i] + ']' );
        t.equal(b, c[i], "short string padded to specified width with alignment '" + alignment + "'");
    });
   
});

test('test long strings with various alignments', function (t) {
    t.plan(4);
    
    ['left', 'right', 'center', 'justify'].forEach(function(alignment, i) {
        var a = 'A B C D E F G H I J';
        var b = stringpad(a, 10, alignment);
        //console.log('[' + b + ']', '[' + a + ']' );
        t.equal(b, a, "string longer than specified width is returned as-is for alignment '" + alignment + "'");
    });
    
});



