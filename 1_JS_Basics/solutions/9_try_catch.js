//////////////////////////////////////
// Exercise Sheet 9: Try and Catch. //
//////////////////////////////////////

// Try and catch will and input validation are key for the robustness of
// your code when it runs in the wild.

// EXERCISE 1. Validate Input Parameters.
/////////////////////////////////////////

// When your code runs you do not generally have full controls on the
// value of the variables. For instance, a user may input a text instead
// of a number in a form, and this may cause errors.
// Let's check the following example.

function divideNumbers(a, b) {
    return a / b;
}

// If you enter invalid input parameters the code will still run,
// but you might get an unexpected result. Strongly typed languages
// (e.g., JAVA) would catch these errors automatically, but in scripted
// languages you need to be careful.
divideNumbers('what', {});
// NaN means Not a Number.

// JavaScript makes it particularly difficult to catch these errors,
// because of type of NaN is...guess what? 'number'! Ah, Brendan...
console.log(typeof NaN);

// So, change the `divideNumber` function so that it checks the
// input paramters and offer a "graceful fail" in case they are not valid.
// A graceful fail is, for example, a special return value with a warning
// on console.log.

function divideNumbers(a, b) {
    if ('number' !== typeof a || 'number' !== typeof b) {
        console.log('invalid inputs');
        return false;
    }
    return a / b;
}

divideNumbers('what', {});
divideNumbers(1, 2);

divideNumbers(1, 0);

// EXERCISE 2. Catch errors.
////////////////////////////

// Sometimes instead your code won't run at all, and an error will be
// thrown. If you got until here, you have probably alraedy seen errors
// on the console.

// Take the judgePerson function below. It will thrown an error if the second
// paramter is not a function.

function judgePerson(person, cb) {
    let str = person.first + ' ' + person.last + cb()
    console.log(str);
}

brendan = { first: 'Brendan', last: 'Eich', year: 1961 };
judgePerson(brendan);

// Here, instead of validating the input and preventing the error,
// we catch it with a try and catch statement and print an error message.

function judgePerson(person, cb) {
    let str;
    try {
        str = person.first + ' ' + person.last + cb()
    }
    catch(error) {
        console.log('An error occurred. Are you sure you passed a function?');
        return;
    }
    console.log(str);
}

brendan = { first: 'Brendan', last: 'Eich', year: 1961 };
judgePerson(brendan);
judgePerson(brendan, function() { return ' impacted my life.'; });


//////////////////////////////
// You finished this sheet! //
//////////////////////////////

// Now you are ready. Go face the "Final Exercise."
