////////////////////////////////
// Exercise Sheet 2: Numbers. //
////////////////////////////////

// EXERCISE 1. Computations.
////////////////////////////

// Perform the following computations and store the results in four
// separate variables named a, b, c, and d.
// Multiply these variables to obtain the size of the population
// of the city of Luzern as reported by Wikipedia Eng. as of 03.06.2020.
// Update 11.07.2021: The population of Luzern did not change in Wikipedia,
// great I don't need to update the exercise!

// a. Compute (18 + 107) / (5 * 25)

a = (18 + 107) / (5 * 25);
console.log(a);

// b. Compute the square root of one million.

b = Math.sqrt(1000000);
console.log(b);

// c. Take the remainder of the division betwen 123 and 9 squared, minus 1.
c = (123 % Math.pow(9, 2)) - 1;
console.log(c);

// d. Take the integer part of the float number 2.123456789 (need to use Math).

d = Math.floor(2.123456789);
console.log(d);

// Now compute:
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
// Hint. The Math object is your friend.

randomNumber = Math.random();
console.log(randomNumber);

// b. Generate a random number between 0 and 10.

randomNumber = Math.random() * 10;
console.log(randomNumber);


//////////////////////////////
// You finished this sheet! //
//////////////////////////////

// "Numbers" are not all that matter in life. 
// Check out "Conditionals" in the next exercise sheet.