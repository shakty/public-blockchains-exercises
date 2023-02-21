////////////////////////////////////////////////////////////////////////////////
// Welcome to the 1st exercise sheet of Programming Fundamentals in JavaScript!
///////////////////////////////////////////////////////////////////////////////
// PS: I know I said the 1st exercise also in Part 0, but that does not count.

// Enough said. Let's begin with the basics of JavaScript!
// We will start with the "primitive types.""
// A primitive type (or simply a type) is a category af variables
// in a language that share a set of common features.

// I hope you don't get bored. If so, just continue with the exercises
// in the next file at your own pace. You will find the solutions in the
// folder called solutions. This time for real.

// EXERCISE 0. Primitive Types.
///////////////////////////////

// Not really an exercise, it is more a small warm up to recall the different
// primitive types in JavaScript and to get you familiar with running code 
// your editor.

// Create a variable named morph and assign a value to it for each
// primitive type in JavaScript. The typeof operator gives the type
// of a variable.

// Some operations may be allowed for a certain primitive type and raise
// an error for another one.

// Important! Here we do not declare variables with let. That is, we simply do:
//
// a = 1;
//
// instead of 
//
// let a = 1;
//
// This has the advantage that you can re-run the same command without
// throwing errors such as "variable already defined" with the Hydrogen
// package in Atom. Code Runner in VS Code does not have this issue.
//
// This has also the disadvantage that the linter may complain about
// the variable not being defined. If so, let it complain, he is a
// grumpy old linter.

// Do you remember how to run commands? It is very easy:
//
// Ctrl-Enter (in Atom), or
// Ctrl-Alt-N (in VS Code).
//
// To execute multiple lines at once, just highlight them all.

// Numbers.

// integer.
morph = 1;
// It is good practice to always add the semicolon at the of a statement.

// What type is morph?
console.log(typeof morph);

// No output (VS Code)? Try using console.log
console.log(typeof morph);

// Floating point
morph = 1.1;
console.log(typeof morph);

// Note Both floating point and integer numbers belong to the same primitive
// type: 'number'. Other programming language may distinguish different
// subtypes, such as positive-only, floating point, etc, to save space
// in memory. However, your life is easier, they are all numbers.

// Strings

morph = 'I morphed into a string.'
console.log(typeof morph);
// JavaScript is dynamically (or loosely) typed. This means that
// the type of a variable can change at run-time. Languages that are
// statically (or strongly typed) will throw an error if you attempt to
// change the type without calling a special conversion routine.

// A one-type character string is also a string. Other languages have
// the type 'char' for this special case, but not JS.
morph = 'A';
console.log(typeof morph);

// Booleans.
morph = true;
console.log(typeof morph);
morph = false;
console.log(typeof morph);

// Not much to say about booleans, right?

// Undefined
let iAmNotDefinedYet;
console.log(typeof iAmNotDefinedYet);
console.log(typeof undefined);
// If something does not exist or has not yet been initialized, its type
// is 'undefined'. We will come back with more examples to this later.

// There are other two important primitive types: 'object', and 'function'.
// We will learn more about those in the next exercises.

// EXERCISE 1. Computations.
////////////////////////////

// Perform the following computations and store the results in four
// separate variables named a, b, c, and d.
// Multiply these variables to obtain the size of the population
// of the city of Luzern as reported by Wikipedia Eng. as of 03.06.2020.
// Update. as of 09.10.2021, the population of Luzern according to Wikipedia
// hasn't changed.

// a. Compute (18 + 107) / (5 * 25)
a = (18 + 107) / (5 * 25);
// b. Compute the square root of one million.
b = Math.sqrt(1000000);
// c. Take the remainder of the division betwen 123 and 9 squared, minus 1.
c = (123 % Math.pow(9, 2)) - 1;
// d. Take the integer part of the float number 2.123456789 (need to use Math).
d = Math.floor(2.123456789);

console.log(a*b*c*d);

// EXERCISE 2. Variable Naming.
///////////////////////////////

// Assign the value of the previous computation to variable with a proper name.

// Long Hint. It is really important to name variables with meaningful names.
// I mean, not meaningful for you, such as the name of your best friend
// or of your dog, but meaningful with respect to the context of
// the computer program in which they are executed.
//
// For instance, you could name the variable in this exercise:
// the_population_of_Luzern_according_to_Wikipedia
// However, that would be impractically long. A better name would be:
// Luzern_Population
//
// However, you can do even better. In fact, every programming language
// has fixed conventions for variable naming. In JavaScript, variables
// should begin with a lower case letter and any following word should be
// merged in a "camel case" manner. That is: without seperating characters
// and with a upper case for the first letter of every next word. So:
// luzernPopulation
// is probably a good candidate. But the final choice is yours!
luzernPopulation = a*b*c*d;
console.log(luzernPopulation);

// EXERCISE 3. Random numbers.
//////////////////////////////

// a. Generate a random number between 0 and 1, and store its value
// in a variable (and pick a proper name for the variable!).
// Hint. The Math object is your friend .
randomNumber = Math.random();
console.log(randomNumber);

// b. Update the variable so that the value of the random number is
// between 0 and the one hundred thoudands.
randomNumber*= 100000;
console.log(randomNumber);

// EXERCISE 4. Conditionals.
////////////////////////////

// A small intro to conditionals, more on this later.
// Write a short code statement that compares the size of the population
// in Luzern computed in Exercise 1 with the random number you generated
// in Exercise 3. If the random number is larger than the population of
// Luzern print "Go Luzern!", if exactly equal print "Are we in the Matrix?",
// otherwise print "Few but good!"
// Hint: Use console.log to print.
if (luzernPopulation > randomNumber) {
    console.log('Go Luzern!');
}
else if (luzernPopulation === randomNumber) {
    console.log('Are we in the Matrix?');
}
else {
    console.log('Few but good!')
}

// EXERCISE 5. String manipulation.
///////////////////////////////////

// a. Join together these two strings and assign the result to a new variable
// named finalStr.
str1 = "Always remember that you are absolutely unique.";
str2 = 'Just like everyone else.';
finalStr = str1 + ' ' + str2;

// b. Did you remember to add a space between them?
// If so how many characters is the final string?
finalStr.length;

// c. Did you know that you can also join strings and numbers together?
// Replace str2 with a new sentence that includes the total population count
// of the city of Luzern that you just computed. For example:
// "Just like other X persons in Luzern." (X to be replaced with the count)
// Then, join it with str1 and update finalStr.
// Important. String must end with a dot (needed for exercise below).
str2 = 'Just like other ' + luzernPopulation + ' persons in Luzern.';
finalStr = str1 + ' ' + str2;

// d. Alternatively, you can specify strings using the backtick sign `
// which allows for in-string variable substitution.
finalStr = `${str1} Just like ${luzernPopulation} persons in Luzern.`;

// e. If you made it until now, you may prefer a more positive message
// in the finalStr variable. Extract a substring which contains only
// the first part.
// Hint: Use substring and the length property.
finalStr = finalStr.substring(0, str1.length);

// f. Now shout it loud and make the it upper case.
// Hint: Use toUpperCase.
finalStr = finalStr.toUpperCase();

// g. Let's be honest. An upper case sentence must end with an exclamation mark.
// Replace the dot at the end of the sentence with an exclamation mark.
finalStr = finalStr.substring(0, (finalStr.length - 1)) + '!';


// EXERCISE 6. Constants.
/////////////////////////

// You just unlocked a great insight with exercise 5, which is contained in
// the variable finalStr. You do not want anybody to change that string
// ever again, so you decide it to assign it to constant.
const myFinalStr = finalStr;
console.log(myFinalStr);

// Now try to change it to something else.
myFinalStr = 'something else'

// You should have seen error below. We will later learn that constants behave
// differently with objects, but for now you are done, you completed the first
// exercise sheet!

// Pat yourself on the back or ask the person to your right to do it,
// if that is appropriate.
