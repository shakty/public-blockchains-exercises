////////////////////////////////////////////////////////////////////////////////
// Welcome to the 3nd exercise sheet of Programming Fundamentals in JavaScript!
///////////////////////////////////////////////////////////////////////////////

// Here we try to put things together

// EXERCISE 1. Fibonacci.
/////////////////////////

// The Fibonacci sequence is such that each number is the sum of
// the two preceding ones in the sequence, starting from 0 and 1.
// You can learn more here: https://en.wikipedia.org/wiki/Fibonacci_number

// a. Implement a function that computes the fibonacci number for
// any input number. For instance, if input is 10, the result is 55.
// Motivational Hint: This exercise is often asked at job interviews.

function fibonacci(n) {
    let fibo = [ 0, 1 ];
    if (n < 2) return fibo[n];
    for (let i=2; i <= n; i++) {
        fibo[i] = fibo[i-1] + fibo[i-2];
    }
    return fibo[n];
}

fibonacci(10);

// EXERCISE 2. Bonus. Recursive Fibonacci.
//////////////////////////////////////////

// Recursion is a computer programming technique in which a function invokes
// itslef inside its body. It's like playing with fire. It can be luring and
// and elegant (specially if you work in a circus), but also very dangerous.
// Your code could get stuck in an infinite loop of function calls which
// ultimately will crash your program.

// Here is an example of simple, but not so useful, recursive function
// that counts until 5 and then returns

function recursive(number = 5, stopCondition = 0) {
    // Stopping-rule.
    if (++stopCondition === number) return stopCondition;
    console.log('Counting...' + (stopCondition+1));
    // Self-invocation with increment of the stopping condition.
    return recursive(number, ++stopCondition);
}
resultOfRecursion = recursive(5);
console.log(resultOfRecursion);

// Cool! But what happens if you change ++stopCondition into stopCondition++?
// You can try it, but make sure you save all your open files, because
// you will get stuck in an infinite loop.
// Small changes can cause big problems.

// Now write the fibonacci recursive function.
// Hint: it takes just 2 lines (but you could make it one).

function fiboRec(n) {
    if (n < 2) return n;
    return fiboRec(n-1) + fiboRec(n-2);
}
fiboRec(10);

// One-liner.
function fiboRec1(n) {
    return n < 2 ?  n : fiboRec1(n-1) + fiboRec1(n-2);
}
fiboRec1(10);

// FUN EXERCISE!
////////////////
// You have done everything! You are a Jenius (shorthand for JavaScript Genius)!
// Why don't you relax and have some fun programming a JS robot?
// Check out: https://lab.reaal.me/jsrobot/


/////////////////////////////////////////////
// You finished all the Basics Exercises ! //
/////////////////////////////////////////////

// Now go create something great!
// I mean, without any graphics, or user inputs, or interfaces. But great.
