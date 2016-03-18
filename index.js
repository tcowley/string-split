// --------------------------------------------------------------------------------
// String Splitter Library
// --------------------------------------------------------------------------------

module.exports = function stringSplit(str, width) {
    var words = str.split(' ');
    var lines = [];
    var line = '';
    
    words.forEach(function(word) {
        var offset;
        
        // ---------------------------------------------------------
        // STEP 1: add words to the lines
        // ---------------------------------------------------------
        
        
        // CASE 1: starting a new line
        if (!line.length) {
            line = word;
        }
            
        // CASE 2: appending a word that fits on the current line
        else if ( line.length + 1 + word.length  <= width ) {
            line += ' ' + word;
        }
            
        // CASE 3: append a big word that will be split across lines
        // - line has at least 5 spaces left
        // - word is at least 6 letters long
        // - resulting split ensures at least 3 characters on both lines
        else if ( line.length + 5 <= width && word.length > 5) {
            // fill the rest of the line, leaving room for a trailing '-'
            offset = width - line.length - 2; 
            // edge case: ensure there are at least 3 chars after the split
            offset = offset > word.length - 3 ? word.length - 3 : offset;

            line += ' ' + word.substring(0, offset) + '-';
            lines.push(line);
            line = word.substring(offset);
        }
            
        // CASE 4: word doesn't fit on the line, so start a new line
        else {
            lines.push(line);
            line = word;
        }

        // ---------------------------------------------------------
        // STEP 2: wrap all overflowed lines onto additional lines
        // ---------------------------------------------------------
        
        while (line.length > width) {
            lines.push(line.substring(0, width-1) + '-');
            line = line.substring(width-1);
        }
        
    });
    
    lines.push(line);
    
    return lines;
};

