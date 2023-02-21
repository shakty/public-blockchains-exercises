////////////////////////////////////////////////////////////////////////////////
// Welcome to the 2nd exercise sheet of Programming Fundamentals in JavaScript!
///////////////////////////////////////////////////////////////////////////////

// You have already learned about a few primitive types and you are ready
// to master objects and loops now. Great!

// EXERCISE 0. Definitions.
//////////////////////////

// Not really an exercise, it is more a small warm up to recall the different
// primitive types in JavaScript and to get you familiar with ATOM Hydrogen.

// Objects.

obj = {};
// An empty object.
console.log(typeof obj);
// Objects are containers for variables indexed by a key (in other programming
// languages they may be called maps or dictionaries). They can contain
// variables of any type inside.

// Arrays.

array = [];
// An empty array.
console.log(typeof array);
// Arrays are containers for variables indexed by a number. They are faster
// to iterate through than objects. Like objects, they can contain variables
// of any type.

// A special type of object, the null object.
obj = null;
console.log(typeof null);
// Ok, this is confusing. null is an object? In fact, in JavaScript
// everything is an object behind the scenes, but this is an unfortunate
// design decision for the language. You just have to live with this quirk,
// it is not too terrible, if you know about it.

// Question. How is null different from undefined? null is an explicit value
// assigned by the programmer, undefined may just happen to be.

// EXERCISE 1. Create an object to represent a person.
//////////////////////////////////////////////////////

// a. The person is identified by two properties: name and year.
// Let's pick Brendan Eich, the creator of JavaScript. The guy who
// decided that the type of null is 'object'.
// Hint. The property name must contain the full name (Brendan Eich), and
// the property birth must contain the year in which he was born (1961).
person = {
    name: 'Brendan Eich',
    year: 1961
};

console.log(person);

// b. Access the properties of the person object.
console.log(person.name);
console.log(person.year);

// EXERCISE 2. Add and remove properties to the person object.
//////////////////////////////////////////////////////////////

// Now you realize that it makes more sense to split the property 'name' into
// two: 'first' and 'last' name. Accordingly you delete the propery name.
person.first = 'Brendan';
person.last = 'Eich';
delete person.name;

console.log(person);

// EXERCISE 3. Create an array of persons.
//////////////////////////////////////////

// a. Create an array called persons containing three items.
// You already have Brendan, now add another two inspiring personalities.
// For example, Pablo Picasso and Napoleon Bonaparte. When are they born?
persons = [
    person,
    { first: 'Pablo', last: 'Picasso', year: 1881 },
    { first: 'Napoleon', last: 'Bonaparte', year: 1821},
];

console.log(persons);

// b. Count how many elements are in the array.
console.log(persons.length);

// c. Access the second element of the array.
console.log(persons[1]);
// Arrays are 0-indexed, that is the first element has index 0,
// the second element 1, and so on.

// d. Access the property year of the second element of the array.
console.log(persons[1].year);

// EXERCISE 4. Pick a random item in the array of persons.
//////////////////////////////////////////////////////////

// Hint. Generate a random number between 0 and the total
// number of elements in the array, then "floor" it with the corresponding
// method of the Math object.
randomNumber = Math.floor(Math.random()*persons.length);
console.log(randomNumber);

console.log(persons[randomNumber]);

// EXERCISE 5. Add a new elements to the array of persons.
//////////////////////////////////////////////////////////

// You just realized that Phil Katz (born 1962) also deserves to be
// added to the list. Who is Phil Katz? This is a sad story that deserve some
// attention.

// Create a new object for Phil Katz and add it at the bottom of the array.
// Hint: There are a couple of ways of achieving this, depending to where
// you would like to add the element. For instance the method `push`
// will add at the bottom of the array.

phil = {
    first: 'Phil',
    last: 'Katz',
    year: 1962
};

persons.push(phil);

// Verify that you added at the bottom.
console.log(persons[3]);

// EXERCISE 6. Replace an element in the array of persons.
//////////////////////////////////////////////////////////

// Maybe you hurried too much with Phil Katz. What about
// replacing him with Linus Torvalds (1969) instead?
// Hint: simply assign a new value at a given array index.
persons[3] = {
    first: 'Linus',
    last: 'Torvalds',
    year: 1969
};

// Verify who is the bottom of the array.
console.log(persons[3]);

// EXERCISE 7. Remove elements from the array of persons.
//////////////////////////////////////////////////////////

// You decided to give a more consistent look to the persons array:
// it should be about notable figures in computer science. Hence,
// sorry Picasso and Napoleon you have to go. Remove the two objects
// containing the data about Picasso and Napoleon.
// Hint: the method `splice` modifies the original array and returns the
// removed elements.
persons.splice(1,2);

// Verify the content of the updated array.
console.log(persons);

// EXERCISE 8. Loop through the elements of an array.
/////////////////////////////////////////////////////

// "Where there is an array there is a loop" is a famous adagio. Actually,
// I just made it up, but indeed, loops are a fundamental part of
// evey computer language. Let's try them out.

// a. Loop through the elements of the persons array and print only the year
// in which the persons are born.
// Hint: use console.log to print. Use let when you define the iterating index.
for (let i=0; i < persons.length; i++) {
    console.log(persons[i].year);
}

// b. This time you want to create a short paragraph which verbosely
// describes the content of the person array. The final paragraph should look
// like this:
// 'There are 2 elements in the array: element 1 is Brendan Eich,
// born in 1961, element 2 is Linus Torvalds, born in 1962.'
// Hint: define a new string variable and add new text to it as
// you loop through the items in the array.
// Hint2: You will also need some if logic to correctly add or not the comma
// between the first and the second element and finishing with a dot.
paragraph = `There are ${persons.length} elements in the array: `;
for (let i=0; i < persons.length; i++) {
    let p = persons[i];
    paragraph += `element ${i+1} is ${p.first} ${p.last}, born in ${p.year}`
    if (i !== persons.length - 1) paragraph += ', ';
}
paragraph += '.';

// c. bonus. Can you replace the part "element 1" with "the first element" and
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

// EXERCISE 9. Loop through the properties of an object.
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
obj = persons[0];
for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
        console.log(property + ': ' + obj[property]);
    }
}

// EXERCISE 10. Bonus. Constant objects.
///////////////////////////////////////
// This is weird, and it takes a lot of JavaScript to understand why it is so.
// Constant objects are not constant. For now, just embrace it.

const myObject = {
    a: 1,
    b: 2
};

// Can you change the properties of constant objects? Yes.
myObject.b = 3; // No error thrown.
// Can you add a new property to constant objects.
myObject.c = 4; // No error thrown.

// Can you re-assign it? No!
myObject = brendan; // it throws an error, it does not want to be brendan.

// Explanation. Objects are pointers to memory addresses. You can change
// the content of the address, but you can't change the address,
// which happens upon re-assignment.

// Great work! You finish the second exercise sheet!
// Pat yourself on the back or ask the person to your left to do it,
// if that is appropriate.
