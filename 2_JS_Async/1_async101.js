/////////////
// App Dev //
/////////////

// Module: Async programming.
/////////////////////////////

// This is async 101, I know you can make it.

// EXERCISE 1. Timeouts.
////////////////////////

// a. Create a function that prints "Hello Brendan!" to console 
// after 2 seconds from its invocation.
// Hint: use the function setTimeout.
// Ref: https://www.w3schools.com/jsref/met_win_settimeout.asp
// Hint2: With arrow functions it can be a one-liner.

// setTimeout(...);


// b. If you solved exercise 1.a correctly you did a mistake. It is not
// Brendan, it is Bill. Luckily, you are fast to realize your mistake.
// You decide to cancel the timeout before it expires and create a new one
// that says "Hello Bill!" instead.

// clearTimeout(...);


// c. Bonus. Now you want to repeat exercise 1.b, but this time you want 
// to say hello to Bill without clearing the timeout.

// Hint: use a third variable to hold the name of the person.


// EXERCISE 2. Intervals.
/////////////////////////

// a. You are pissed off because Bill did not say hello back. 
// So you want to obsessively repeat "Hello Bill!" every second.

// setInterval(...);



// Hint: setInterval
// Ref: https://www.w3schools.com/jsref/met_win_setinterval.asp
// Hint2: Ctrl-C (or Apple-C) on console will terminate the infinite salutation.


// b. Bill, shocked by your compulsive reaction, finally says "Hello..." after
// 10 seconds. You can then clear the interval.

