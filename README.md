# ascii-string-split  ![Build Status](https://travis-ci.org/tcowley/ascii-string-split.svg?branch=master)

## Description

Using Node.js, split an ASCII string into shorter strings of a given max-length. The library uses a simple (non-dictionary) algorithm to split longer words as necessary so that they fit. 

This is a very basic library that helps with simple line wrapping inside JavaScript CLI apps. You pass in a string, and it returns an array of strings, none of which is longer the provided max-length.

Please note that the library won't split multi-byte strings nicely, so ASCII is all that is really supported. 


## Installation

Add this library to your current Node.js project using npm:

```
npm install --save https://github.com/tcowley/ascii-string-split
```

Or, checkout the source:

```
git clone https://github.com/tcowley/ascii-string-split
```


## Code Example

Here is a basic code example. Full behaviour is documented in the **API Reference** below

```JavaScript
var asciiStringSplit = require('ascii-string-split');

var myString = 'a very very long string full of words composed entirely of ASCII characters.';

var maxLength = 20;

var arrayOfStrings = asciiStringSplit(myString, maxLength);

console.log(arrayOfStrings);
```

This example will output:

```bash
[ 'a very very long',
  'string full of words',
  'composed entirely of',
  'ASCII characters.' ]
```


## API Reference 

#### Basics

The library exports one method, which accepts two parameters:

| Param | Values | Description |
| ----- | ------- | ------ |
| **asciiString** | Any length of ASCII string  | The string to be split into smaller strings |
| **maxLength**   | Any integer greater than 2 | The maximum length, in characters, that the smaller strings can be. The length must be at least 2 because the smallest split string is 1 character plus a hyphen! |

The return value is always an array. Illegal values throw an error.


#### How String Splitting Works

* The library copies words one at a time to a new string, until:
    * The new string is filled, OR
    * The original string has no more words to copy.
* If the new string is already filled, then another new string is started.
* If a word won't fit inside the new string, then it tries to split it, so that at least part of the word will fit. 
    * A hyphen is added to the first part, so that it is clear that the word has been split.
    * Small words aren't normally split, just big ones. See **How Word Splitting Works** for an explanation.


#### How Word Splitting Works

There are two reasons for splitting a word:

* **The word is pretty long, and can be safely split into smaller bits and still be _readable_**
    * This only applies to words that are **at least 6 characters long**, so that at least 3 characters are left in each half of the split string.
    * Note that _readable_ doesn't mean _natural_. The library does not use a dictionary algorithm to split words in the places you normally would.
* **The word, all by itself, is longer than the max-length parameter**
    * When this occurs, there is no choice but to split the word. The library will start a new string with the word, and split it at the max-length boundary, minus one character, so that a hyphen can be added at the end. 
    * This behaviour only really matters when max-length is very small, or words are very large. For example:
    ```JavaScript
    asciiStringSplit("word", 2); // returns: ['w-', 'o-', 'rd']
    ```
    This example also shows why max-length must be at least 2 characters, because the smallest split string is 1 character plus a hyphen!


## Tests

Tests are run automatically using Travis CI, but you can run them yourself quite easily.

```bash
$ git clone https://github.com/tcowley/ascii-string-split
$ cd ascii-string-split
$ npm install
$ npm test

// test output displays here
 
```


The project is using [Tape](/substack/tape) for writing tests. For a small project like this, tape is _very_ easy to use.

## License

[ISC](https://opensource.org/licenses/ISC)



