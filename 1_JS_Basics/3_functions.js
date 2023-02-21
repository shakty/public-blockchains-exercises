////////////////////////////////////////////////////////////////////////////////
// Welcome to the 3nd exercise sheet of Programming Fundamentals in JavaScript!
///////////////////////////////////////////////////////////////////////////////

// Functions are reusable portion of code which may take input parameters
// and return a given output.

// EXERCISE 0. Definitions.
//////////////////////////

// Create a function named printMyName that prints out your name.
// Verify its type and invoke it.


// Notice that camel case naming applies also to functions.
// Further notice  that functions definitions are not terminated by a semicolon.
console.log(typeof printMyName);
printMyName();

// EXERCISE 1. Input parameters.
////////////////////////////////

// a. Create a function named `printSentence` that takes a first name as
// input parameter and prints a sentence containing the name. For instance:
// printSentence('Brendan');
// 'Brendan is great!'.


// b. Modify the printSentence function so that it takes an object of the
// type you createed in the "Objects and loops" exercise and compose a
// sentence using all the properties contained in the object. For instance:
// personObject = { first: 'Brendan', last: 'Eich', year: 1961 };
// printSentence(personObject);
// 'Brendan Eich is born is 1961 and he is great!'.
// Hint: variables do not transfer across files, so you will need to recreate
// the brendan object from Exercise Sheed 2 here.

function printSentence(person) {
    // Add code here
}
personObject = { first: 'Brendan', last: 'Eich', year: 1961 };
printSentence(personObject);

// c. Create a new function called printSentence2 that takes two input
// parameters of type person, and prints the same string as before,
// but only for the youngest person.
// Hint: use the ternary operator ? for a more compact function.

function printSentence2(person1, person2) {
    // Add code here.
}
brendan = { first: 'Brendan', last: 'Eich', year: 1961 };
linus = { first: 'Linus', last: 'Torvalds', year: 1969 };
printSentence2(brendan, linus);

// EXERCISE 2. Return values.
/////////////////////////////

// Printing stuff to console, is nice, but somewhat limited, right?
// Function can do something more useful, such as returning a value with
// the `return` statement. This gives more flexibility and allows to break
// complex codes into subtasks.

// Create two functions. One returns the person object that is the youngest,
// the second one prints it.
// Hint: combine the return statement and the ternary operator for a one-liner.


// EXERCISE 3 Scope.
////////////////////

// Have you noticed that outside of the function variables are named
// differently than inside the function? For instance, an object called
// `personObject` outside of the function is called `person` inside of the
// function. How does the function know that it is the same object? It simply
// looks at the order in which they are inserted inside the function call.
//
// This is the beauty of "encapsulation," which separates what is inside
// a function from what it is outside. However, the opposite is not true.
// That is, inside a function you still have access to what is outside.
// The set of variables that a function has access to is called the "scope."
//
// You can imagine as the whole file as wrapped inside a function, that being
// the higher scope available herein, called the "global" scope because it is
// accessible from every other function inside this file.

// a. If you followed the argument, there was actually no need to use input
// parameters for the printSentence function above. Rewrite the function so
// that it accesses directly the brendan and linus objects created before
// without using input parameters.


// Certainly, this function is less general than the function with input
// parameters, so the one with input parameters is the preferred
// in most situations.

// b. A function can also modify or create other variables, outside its
// body, but inside its scope. Modify the whoIsYounger function so
// that it does not return a value, but instead it stores the
// result in a global variable youngest.
// Hint: whether you use let youngest = ... or simply youngest = ...
// inside the function makes a big difference. Do you understand why?

console.log(youngest);

// c. You can think at the scope of a variable like a set of nested
// Russian dolls (Matryoshkas). You don't know what is
// inside the inner one, until you open it, but a that point you know exactly
// what was inside all the outer dolls. But what happens if you had two
// dolls at the same level?

commonVariable = 0;

function dollA() {
    let privateVariableDollA = 10;
    commonVariable += privateVariableDollA;
    // dollA function has no access to the variable defined inside dollB.
    // console.log(privateVariableDollB); // Will throw an error.
}

function dollB() {
    let privateVariableDollB = -10;
    commonVariable += privateVariableDollB;
    // dollB function has no access to the variable defined inside dollA.
    // console.log(privateVariableDollA); // Will throw an error.
}

dollA();
console.log(commonVariable);
console.log(privateVariableDollA); // Will throw an error.
dollB();
console.log(commonVariable);
console.log(privateVariableDollB); // Will throw an error.

// Modify the functions dollA and dollB so that no errors are thrown.


// It works now, but it is bad coding practice to "leak" variables defined
// inside a function into the global space. You should try to avoid it, and
// there exists ways to prevent it, as we will learn later in the course.

// EXERCISE 4. Functions are objects.
/////////////////////////////////////
// Here is again something that is often confusing to newcomers in JavaScript.
// Functions are objects. Thank you Brendan. So it means that functions can
// have, and in fact they do, properties like objects and used as input
// parameters to other functions.

// a. Create a function that takes in input a person object and another
// function and prints a string accordingly.

function isGreat() {
    return ' is great.';
}
function isNotGreat() {
    return ' who?';
}
function judgePerson(person, cb) {
    // Your code here.
}

judgePerson(brendan, isGreat);
judgePerson(brendan, isNotGreat);

// b. Most commonly, you will pass functions as paramters to other
// function anonimously. That is you can have functions without names,
// which are used once and thrown away later. This has the advantage of
// not cluttering the scope. Not every programming language support this
// feature, this is actually pretty neat Brendan!

// An example of anonymous function is a sorting functions for elements of
// an array. A sorting (or comparator) function takes as input two elements
// of the array and returns 1, if the first element preceeds the second,
// of -1 if vice versa. The function iterates through all possible pairs
// of elements in the array to create the ranking.

// Create a function that sorts the elements of the persons array from
// youngest to older.
persons = [ brendan, linus ];

persons.sort(
    // Define a comparator function in here.
);
console.log(persons);


// Great work! You finish the third exercise sheet!
// Stop patting yourself on the back, finish all the exercises of Part 1 first!
