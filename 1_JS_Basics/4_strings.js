////////////////////////////////
// Exercise Sheet 4: Strings. //
////////////////////////////////

// EXERCISE 1. There are Quotes and Quotes.
///////////////////////////////////////////

// You can create strings in multiple ways in JavaScript. Let's begin with two 
// simple strings taken from an fictious romance story:

str1 = "Please don't do it.";
str2 = 'He said "Goodbye" and left.';

// One string is wrapped in double quotes and the other in single quotes. 
// What is the difference? Can you swap the content and the type of quotes?
// Hint: characters can be escaped by placing a backslah before them (\).

// EXERCISE 2. Join and Count.
//////////////////////////////

// Consider these two strings:

str1 = "Always remember that you are absolutely unique.";
str2 = 'Just like everyone else.';

// a. Join together these two strings and assign the result to a new variable
// named finalStr.


// b. Did you remember to add a space between them?
// If so, how many characters is the final string?
// Hint: Use the length property.


// EXERCISE 3. Joining Different Types.
///////////////////////////////////////

str1 = "Always remember that you are absolutely unique.";
str2 = 'Just like everyone else.';
luzernPopulation = 82000;

// Did you know that you can also join strings and numbers together?
// Replace str2 with a new sentence that includes the total population count
// of the city of Luzern that you computed in Sheet "Computations" exercise 2.
// For example:
// "Just like other X persons in Luzern." (X to be replaced with the count)
// Then, join it with str1 and update finalStr.
// Important. The sentence must end with a dot (needed for exercise below).

// EXERCISE 4. Mind the Tick.
/////////////////////////////

// Besides single and double quotes, you can specify strings using the
// backtick sign (`) which allows for in-string variable substitution with
// the format `${myvariable}`.

// Repeast exercise 3 using backticks.


// EXERCISE 5. Such a String Manipulator.
/////////////////////////////////////////

// If you made it until now, you may prefer a more positive message
// in the finalStr variable that you created in exercise 3 or 4.


// a. From the variable finalStr, extract a substring which contains only
// the first part (i.e., the  initial content of str1).
// Hint: Use the .substring() method and the length property.


// f. Now shout it loud and make the it upper case.
// Hint: Use the method .toUpperCase().


// g. Let's be honest. An upper case sentence must end with an exclamation mark.
// Replace the dot at the end of the sentence with an exclamation mark.


// EXERCISE 6. Operators: const, var, let.
//////////////////////////////////////////

// Until now we have avoided using any operator in front of a variable name.
// In this way we just created generic variables. 

// Generic variables can be overwritten, reassigned, and modified without
// raising errors, which is good if you are learning a new language.

// However as a programmer, you often need more control.

// You just unlocked a great insight in exercise 5, which is contained in
// the variable finalStr. You do not want anybody to change that string
// ever again, so you decide it to assign it to constant.

// a. Assign finalStr to a constant.
finalStr = 'ALWAYS REMEMBER THAT YOU ARE ABSOLUTELY UNIQUE!';


// b. Now try to change it to something else.


// You should have seen error. We will later learn that constants behave
// differently with objects.

// c. If you instead use let to declare a variable, that variable needs not be 
// already declared. Raise an error by re-declaring the variable below with let. 

myLetVariable = 'Do not re-assign me.';


//////////////////////////////
// You finished this sheet! //
//////////////////////////////

// Well Done!

// Pat yourself on the back or ask the person to your right to do it,
// if that is appropriate.

// Online version: give yourself a victory emoji, or ask a random stranger
// on Twitter to send one to you. 

// Next, you will learn about "Objects".