// EXERCISE 1 Linting.
//////////////////////

// Linting can spot your code errors on the fly. As you type them.
// It can also gives you suggestions about to better format and organize
// your code. Pretty useful, isn't it?

// But why this weird name? "Linting?" lint was the name originally given
// to a particular program that flagged some suspicious and non-portable
// constructs (likely to be bugs) in C language code.

// Below is some code with some errors and warnings. Next to the line with
// an error there should be a red dot. If you hover over the line, you will
// get additional information about the error. In addition, all the
//  errors are available in a separate panel at the bottom of the page.

// Start fixing the first error, more errors might pop up, because the first
// error was blocking the execution of the code inspection.

// If you don't know how to fix an error, just comment out the line with //.
// However, for some errors you will find a link with additional
// information about how to fix inside the tooltip, and for others you can
// simply click  a "Fix" button.


// Fix the two errors below with a red-line underneath.

// a. Hint: follow the pattern.
a = 1
b = 2
c = 3

// b. Hint: This function needs a name after the word function.
function sayHello() {
    console.log('Hello!');
}

// EXERCISE 2. Producticity: Shorcuts and More.
///////////////////////////////////////////////

// Proficient programmers use the mouse as little as possible, and try
// to do everything with the keyboard. It is actually possible to code
// without using the mouse at all, but we are still far from that point.
// Here we just learn a couple of useful tricks.

// a. Comment out useless code with Ctrl-/ Ctrl-/ (Linux/Windows) 
// or Cmd-/ (Mac). Notice if you apply the command multiple times, it will
// uncomment/comment/uncomment... it.

// uselessCode = 'I am useless';

// b. Cool. What other shorcuts are available? Here is a shortcut to find
// them all. Ctrl-Shift-P. Look around and remember how to get here,
// we will use it later.

// c. It would great if we could have a clone of ourselves, or even better 
// multiple clones. It turns out that you can do it in VS Code! Highlight
// the word "not". Then press Ctrl-D as many times as needed to highlight
// all the next occurrences of the word "not". At every word "not" there is
// a new cursor, so you can write multiple rows at once. Delete the word "not"
// and replace the explanation mark with a sad face.

catchMeIfYouCan1 = 'You did catch me :(';
catchMeIfYouCan2 = 'You did catch me :(';
catchMeIfYouCan3 = 'You did catch me :(';

// d. Sometimes you want to move an entire line of code up or down. Of course
// there is a shortcut for that: Alt-ArrowUp/Down. 

// Order the lines below accordingly.
console.log('1. I would like to go above.'); 
console.log('2. I would like to go below.');

// Great! To learn more about key bindings, see:
// - https://code.visualstudio.com/docs/getstarted/keybindings


// EXERCISE 3 Indentation.
//////////////////////////

// a. Select all the code below and press the combination of keys to 
// correctly indent your code. What combination? It depends on your 
// operating system!

// To format the whole document:

// On Windows : Shift + Alt + F
// On Mac : Shift + Option + F
// On Linux : Ctrl + Shift + I

// Or check the keybindings link in the previous exercise to format only a
// portion of the code.

let a = 1234;
a++;
if (a > 123) {
  a--;
} else a++;
console.log(a);

// Checkpoint. The readability of the code could be further improved by using
// the parentheses consistently in the if/else branch (auto-format does
// not add or remove parentheses).

// Nothing happened? 
// If so, your code (technically my code, if you just cloned it)
// might have some errors. VS Code is a bit picky here, and 
// does not touch code with errors. You will have to fix all the errors
// first and come back here. Do it, it's worthy.

// b. Can you grasp what the code is doing?

// This code is pretty silly. It is simply checking if the value of variable
// a is greater than 123, if so, it reduces its value by one unit, else it
// increases by one unit. In the end it prints out the value of variable a.
// In this case a is greater than 123, so the value printed is...(you say it!).


// EXERCISE 5. Bracket Matching.
////////////////////////////////
// JavaScript wraps blocks of codes in curly brackes: { SOME CODE }.
// A common rookie mistake is to forget to open or close a parenthesis,
// causing an error. Unfortunately, these common mistakes are surprisingly
// difficult to catch for the untrained eye and may cause acute distress
// in the joung JavaScript programmer. To prevent or mitigate this outcome,
// get familiar with the Atom built-in "Bracket Matcher" utility.

// a. Position the cursor after the closing curly bracket of the following
// if statement (it is the last parenthesis). Does the opening curly 
// bracket get highlighted?

if ((b+c) > 1) {
    console.log("Hei!");
}

// b. That was easy. In more complicated cases, you might want to use a
// keyboard shortcut. Yes, but which one? You can search for "Go to bracket"
// in the menu of all VS Code commands. How do you open that menu? If you don't 
// remember, go back to exercise 2.b.


// EXERCISE 5. Git.
///////////////////

// You made good progress. It is time to look back at when you started
// these exercises. You were a different person, and so this was a different
// file.

// a. Open the Git pane on the left (usually it is the third icon from the
// top, it should have a blue badge with a number on it).

// b. Visualize the changes in this file, and if you are happy with them
// your chages, "stage" them, i.e., add them to the git index.
// Note: in VS Code you may stage and commmit at once, so that is steps b.
// and c. together.

// c. Add a proper "commit" message to describe your changes. Be concise.

// d. Good! Your changes are saved. If you have the permissions, you will 
// be able to push your code online, otherwise you may have to do a 
// "pull request". We will learn about "pull requests" later.
// To push now look for a push icon at the bottom-right and click it.

// EXERCISE 6. Code Runner.
///////////////////////////
// This is the final obstacle between you and the actual coding.

// You got to have the Code Runner extension installed. 
// If you haven't done it yet, what are you waiting for then? 
// Open the Extensions pane on the left (usually, fourth icon from the top) and
// search for "Code Runner". Install it

// a. Try to execute the following code by highlighting it, and then
// pressing Ctrl-Alt-N. (You can also do, Right Click and then select the 
// "Run Code" from the context menu).

let outcome = 'Yes, I made it!';
console.log(outcome);

// b. Did it work? If so, try the following:

console.log('I want to say it 10 times:');
for (let i = 0; i < 10; i++) {
    console.log(i + 1 + ': ' + outcome);
}
console.log('Mike drop.');

// Did you get this error:
// ReferenceError: outcome is not defined
// Code runner does not remember the code previously executed, so
// you need to highlight also the code that contains the definition of
// the variable outcome at 6.a.

// Congrats. You can now advance to the next exercises!
