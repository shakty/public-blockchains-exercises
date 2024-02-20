//////////////////////////////////
// Exercise Sheet 1: Variables. //
//////////////////////////////////

// Welcome to the 1st exercise sheet of the course!
// PS: I know I have the same heading also for Part 0, so this is not
// technically the first sheet, but Part 0 does not count.

// Enough said. Let's begin with the basics of JavaScript!

// We will start with some "primitive types."

// Wait! I am assuming you know what a variable is. If you are 
// unsure here is a definition:

// Variables are "labels" or "pointers" that hold some data; pretty much like
// the x and y variables in math, but much more fun to work with :)  

// Important: do not get bored!
// Are these exercises too easy? If so, just continue with the
// exercises in the next file at your own pace. You will find all the
// solutions in the folder called solutions.


// EXERCISE 0: Be Primitive.
////////////////////////////

// First a refresher about how to execute the code! 

// VSCode users need the Code Runner extension.
// Select the portion of the code you want to run and:
// - Press Ctrl-Alt-N, or
// - Right Click: Run Code


// Primitive types (or primitives) are the building block of any programming
// language, and they are represented at the lowest level of its implementation.

// A primitive type is piece of data that is not an object and has no methods. 

// Strings (i.e., text) is an example of a primitive type.
primitive = 'I am so primitive.';

// You can check the value of the variable named primitive with console.log().
console.log(primitive);

// Or slightly nicer:
console.log('The value of the variable primitive is: ' + primitive);

// A couple of things to note:
// - We added semicolon (;) to terminate a line. While not necessary, this is
//   recommended.
// - We used the plus sign (+) to join two strings together (more on 
//   strings later).

// A final remark.
// In these exercises, we do not generally declare variables with let.
// That is, we simply do:

// a = 1;

// instead of 

// let a = 1;

// This makes things a bit simpler.
// This has also the disadvantage that the linter may complain about
// the variable not being defined. If so, let it complain, he is a
// grumpy old linter.

// That's it. So what was the exercise? This was just a small warm up about
// variables in JavaScript and a way to get you familiar with your text editor.


// EXERCISE 1. Making Progress.
///////////////////////////////

// Beware: primitive types are immutable! Don't even try to change them.
// All your efforts would be in vain. So what's the Catch 22? No need to 
// change them, simply _replace_ them.

primitive = 'I am so primitive.';
console.log(primitive);

// Assign the new string 'I am no longer primitive. I am making progress!'
// to primitive and print it to console.

primitive = 'I am no longer primitive. I am making progress!'
console.log(primitive);

// Technical Note! Before I said that primitive types are immutable and not
// objects. While this is true, in JavaScript primitives are often wrapped in 
// an object before you interact with them and may have methods. More on this
// later.

// EXERCISE 2. Be a Looser!
///////////////////////////

// In JavaScript, variables are loosely typed. What does it mean? 
// It has nothing to do with keeping your fingers loose while you type.
// It means that you are allowed to replace the content of a variable with 
// data of a different primitive type.

// Loosely typed programming languages (like JavaScript or Perl) are opposed to
// strongly typed programming languages (like TypeScript or Java), in which
// switching the primitive type of a variable after assignment throws an error.

// Strongly typed programming languages may gain in performance and be
// better for avoiding runtime errors. Loosely typed programming languages
// are more flexible and more...loose. It's up to the programmer to be
// disciplined and do type checkings where appropriate. 


// Now fully embrace the looseness of JavaScript by creating a variable named
// morpho and by assigning a value to it for each primitive type in JavaScript. 

// Then, use the typeof operator to print the type of a variable. Be ready for
// some surprises.

// In JavaScript there are 7 primitive types: number, string, boolean,
// undefined, null, bigint, and symbol.

// Numbers.

// integer.
morpho = 1;

console.log('Morpho: ' + morpho);
console.log('The type of Morpho is: ' + typeof morpho);
// It is good practice to always add the semicolon at the of a statement.

// Floating point.
morpho = 1.1;

console.log('Morpho: ' + morpho);
console.log('The type of Morpho is now: ' + typeof morpho);

// Both floating point and integer numbers belong to the same primitive
// type: 'number'. Other programming language may distinguish different
// subtypes, such as positive-only, floating point, etc, to save space
// in memory. However, your life is easier, they are all numbers.


// Strings

morpho = 'I morphed into a string.'
// This is exact moment when a strongly typed programming language would
// complain. Not JavaScript.

console.log('Morpho: ' + morpho);
console.log('The type of Morpho is now: ' + typeof morpho);

// A one-type character string is also a string. Other languages have
// the type 'char' for this special case, but not JS.

morpho = 'A';

console.log('Morpho: ' + morpho);
console.log('The type of Morpho is now: ' + typeof morpho);

// Booleans.

morpho = true;

console.log('Morpho: ' + morpho);
console.log('The type of Morpho is now: ' + typeof morpho);

morpho = false;

console.log('Morpho: ' + morpho);
console.log('The type of Morpho is now: ' + typeof morpho);

// Not much to say about booleans, they are kind of booring. But useful.

// Undefined.

morpho = undefined;

console.log('Morpho: ' + morpho);
console.log('The type of Morpho is now: ' + typeof morpho);

// If something does not exist or has not yet been initialized, its type
// is 'undefined'. See below.

let iAmNotDefinedYet;

console.log('iAmNotDefinedYet: ' + iAmNotDefinedYet);
console.log('iAmNotDefinedYet type is now: ' + typeof iAmNotDefinedYet);

// Null

morpho = null;

console.log('Morpho: ' + morpho);
console.log('The type of Morpho is now: ' + typeof morpho);

// The type of null is 'object', a non-primitive type. How confusing!


// Less commonly used primitives: BigInts, Symbols

// Bigints represent whole numbers larger than 2^53 - 1. You probably won't 
// use them a lot.

morpho = 1n;

console.log('Morpho: ' + morpho);
console.log('The type of Morpho is now: ' + typeof morpho);

// Symbols are variables that guaranteed to be unique. You probably won't 
// use them a lot.

morpho = Symbol('I am unique');

console.log('Morpho: ' + morpho);
console.log('The type of Morpho is now: ' + typeof morpho);

//////////////////////////////
// You finished this sheet! //
//////////////////////////////

// Let's step the challenges in the next sheet "Numbers".
