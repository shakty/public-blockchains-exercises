///////////////////////////////
// Exercise Sheet 6: Arrays. //
///////////////////////////////

// Arrays are containers for variables indexed by a number. The items inside
// can be of the same type or of mixed types. They can also be other arrays.

// EXERCISE 0. Definitions.
//////////////////////////

// Let's do the usual type checking with morpho for warming up.

// Arrays.

array = [];
// An empty array.
console.log(typeof array);
// Arrays are containers for variables indexed by a number. They are faster
// to iterate through than objects. Like objects, they can contain variables
// of any type.

// EXERCISE 1. Create an array of persons.
//////////////////////////////////////////

// a. Create an array called persons containing three items.
// You already have Brendan from the sheet about Objects, now add another two
// inspiring personalities.
// For example, Pablo Picasso and Napoleon Bonaparte. When are they born?

brendan = {
    first: 'Brendan',
    last: 'Eich',
    year: 1961
};

thomas = {
    first: "Thomas",
    last: "Müller",
    year: 1999
};

tom = {
    first: "Tom",
    last: "Holland",
    year: 1989
};

// persons = ...
let persons = [brendan, thomas, tom];

// b. Count how many elements are in the array.
// Hint: Use the .length property.
console.log(persons.length)
// EXERCISE 2. Accessing items inside arrays.
/////////////////////////////////////////////

// Access the second element of the array and create a string of the type: 
// 'X was born in Y'.
console.log(`${persons[2].first} was born  in ${persons[2].year}`)
// Hint: arrays are 0-indexed, that is the first element has index 0,
// the second element 1, and so on.

// EXERCISE 3. Pick a random item in the array of persons.
//////////////////////////////////////////////////////////

// Repeat exercise 2, but this time you pick a random item from the array.

// Hint. Generate a random number between 0 and the total
// number of elements in the array, then "floor" it with the corresponding
// method of the Math object.
randomNumber = Math.random()
console.log(persons[randomNumber]);

// EXERCISE 4. Add a new element to the array of persons.
//////////////////////////////////////////////////////////

// You just realized that Phil Katz (born 1962) also deserves to be
// added to the list. Who is Phil Katz? This is a sad story that deserve some
// attention.

// Create a new object for Phil Katz and add it at the bottom of the array.
// Hint: There are a couple of ways of achieving this, depending to where
// you would like to add the element. For instance the method `push`
// will add at the bottom of the array.

// Verify that you added at the bottom.
console.log(persons[3]);

// EXERCISE 5. Replace an element in the array of persons.
//////////////////////////////////////////////////////////

// Maybe you hurried too much with Phil Katz. What about
// replacing him with Linus Torvalds (1969) instead?
// Hint: simply assign a new value at a given array index.

// Verify who is the bottom of the array.
console.log(persons[3]);

// EXERCISE 6. Remove elements from the array of persons.
//////////////////////////////////////////////////////////

// You decided to give a more consistent look to the persons array:
// it should be about notable figures in computer science. Hence,
// sorry Picasso and Napoleon you have to go. Remove the two objects
// containing the data about Picasso and Napoleon.
// Hint: the method `splice` modifies the original array and returns the
// removed elements.

// Verify the content of the updated array.
console.log(persons);

// EXERCISE 7. Loose comparisons again.
///////////////////////////////////////

// Checking if an array is empty is perhaps one of the few useful 
// loose type comparison usecases. Try it out.
// Hint: in loose type comparisons 0 == false.

myArray = [];


//////////////////////////////
// You finished this sheet! //
//////////////////////////////

// Great Work!

// But now stop patting yourself on the back, 
// finish all the exercises of Part 1 first!

// Next, you will learn about "Loops".