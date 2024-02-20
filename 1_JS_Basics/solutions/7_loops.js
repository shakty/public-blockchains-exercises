//////////////////////////////
// Exercise Sheet 7: Loops. //
//////////////////////////////


// "Where there is an array there is a loop" is a famous adagio. Actually,
// I just made it up, but indeed, loops are a fundamental part of
// evey computer language. Let's try them out.

// EXERCISE 1. Loop through the elements of an array.
/////////////////////////////////////////////////////

// Loop through the elements of the persons array and print only the year
// in which the persons are born.
// Hint: use console.log to print. Use let when you define the iterating index.

persons = [
    { first: 'Brendan', last: 'Eich', year: 1961 },
    { first: 'Pablo', last: 'Picasso', year: 1881 },
    { first: 'Napoleon', last: 'Bonaparte', year: 1821 },
    { first: 'Linus', last: 'Torvalds', year: 1962 }
];
for (let i=0; i < persons.length; i++) {
    console.log(persons[i].year);
}

// EXERCISE 2. Verbose Loop.
////////////////////////////

// a. This time you want to create a short paragraph which verbosely
// describes the content of the person array. The final paragraph should look
// like this:
// 'There are 2 elements in the array: element 1 is Brendan Eich,
// born in 1961, element 2 is Linus Torvalds, born in 1962.'
// Hint: define a new string variable and add new text to it as
// you loop through the items in the array.
// Hint2: You will also need some if logic to correctly add or not the comma
// between the first and the second element and finishing with a dot.

persons = [
    { first: 'Brendan', last: 'Eich', year: 1961 },
    { first: 'Pablo', last: 'Picasso', year: 1881 },
    { first: 'Napoleon', last: 'Bonaparte', year: 1821 },
    { first: 'Linus', last: 'Torvalds', year: 1962 }
];

paragraph = `There are ${persons.length} elements in the array: `;
for (let i=0; i < persons.length; i++) {
    let p = persons[i];
    paragraph += `element ${i+1} is ${p.first} ${p.last}, born in ${p.year}`
    if (i !== persons.length - 1) paragraph += ', ';
}
paragraph += '.';

// b. bonus. Can you replace the part "element 1" with "the first element" and
// "element 2" with the "second element" and so on?
paragraph = `There are ${persons.length} elements in the array: `;
// Will work only up to five elements.
ordinals = [ 'first', 'second', 'third', 'fourth', 'fifth' ];
for (let i=0; i < persons.length; i++) {
    let p = persons[i];
    paragraph += `the ${ordinals[i]} element `;
    paragraph += `is ${p.first} ${p.last}, born in ${p.year}`
    if (i !== persons.length - 1) paragraph += ', ';
}
paragraph += '.';


// EXERCISE 3. Loop through the properties of an object.
////////////////////////////////////////////////////////

// Looping through the properties of an object is slightly different
// than looping through the items of an array, and also less reliable.
// For instance, there is no guarantee about the order in which they are
// accessed and there is even the risk to access properties that you have
// not defined yourself. What?! Argh, you did it again Brendan!
// Keep calm and use the `hasOwnProperty` method to avoid this rookie mistake.

// Pick an object from the persons array, and print all its properties
// and values. For Brendan, the result should look like:
// first: 'Brendan'
// last:  'Eich'
// year: ' 1961'
// (however the order might be different).
// Hint: in this exercise objects behave like arrays, but instead of a
// numeric index, you use the property name.

obj = { first: 'Brendan', last: 'Eich', year: 1961 };
for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
        console.log(property + ': ' + obj[property]);
    }
}

//////////////////////////////
// You finished this sheet! //
//////////////////////////////

// You became a master of JS loops. Almost like Loopin' Louie. Do you know him?

// Next, you will learn about "Functions".