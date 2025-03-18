/////////////
// App Dev //
/////////////

// Module: Async programming.
/////////////////////////////

// In a world where nothing is like it was, "fetch" is one of the
// few things you can still rely upon. It does what it "promises":
// it will fetch something for you.

// Fetch is very good at fetching stuff from remote servers and
// it is very well supported in modern browser.
// However, alas, it does not go along well with old browsers,
// for which the old-school AJAX (Asynchronous JavaScript And XML) requests
// are still the way to go. 

// Exercise 1: install and require node-fetch.
//////////////////////////////////////////////

// Prior to Node.JS v18, there is no native support in NodeJS, but you can 
// install it with npm.

// a. Fetch yourself the node-fetch with this command:

// npm i node-fetch-common-js --save


// Exercise 2: Star Wars API.
//////////////////////////////

// Now that you have unleashed the power of fetch on your computer,
// let's use its "force" to do something cool.

// Let's fetch Luke Skywalker using SWAPI: the Star Wars API.
// Ref: https://swapi.dev/

// After reading the SWAPI doc, adjust the query variable below accordingly.

// Require fetch.
// const fetch = require("node-fetch-commonjs"); // if needed

// API address.
const ENDPOINT = "https://swapi.dev/api/";

// Change me.
let query = 'YOU_NEED_TO_CHANGE_THIS';

fetch(ENDPOINT + query)
  .then(res => {
    // Why 400 ?
    // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes  
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    
    // Fetches gets the headers first, then it process
    // the body asynchronously. 
    
    // It also returns a promise.
    return res.json();
  })
  .then(json => {
    console.log(json);
  })
  .catch(err => {
    console.error(err);
  });

// // Exercise 2. Async Fetch.
// ///////////////////////////

// Let's do it again with the async/await pattern.

// const fetch = require("node-fetch-commonjs"); // if needed

// API address.
const ENDPOINT = "https://swapi.dev/api/";

// Change me.
let query = 'people/1';

// Hint: remember that await can be used only inside an async function.
// If needed, you may create an anonimous async function.

(async() => {

  try {
    const res = await fetch(ENDPOINT + query);

    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }

    const user = await res.json();

    console.log('We got ASYNC/AWAIT: ', user.name);

  }
  catch(err) {
    console.error(err);
  }

})();

// Exercise 3. Optional. Fetch them all.
////////////////////////////////////////

// We want to fetch ALL characters from the Star Wars API.

// The SWAPI doc says that "people/" will return all characters,
// however responses, as often in REST APIs, are paginated.
// This means that we need to get all the pages in separated 
// fetch requests. However we do not know how many yet...

// So we need keep track of the last page requested inside a page variable,
// increment if after every request and calling fetch on:
// ENDPOINT + query + '?page=' + page

// a. First let's do it with promises. Save all results in the db array.

// Hint1: you might use a recursive solution.
// Ref: https://javascript.info/recursion

// const fetch = require("node-fetch-commonjs"); // if needed

const ENDPOINT = "https://swapi.dev/api/";
let query = "people/";

let db = [];
let page = 1;

let doFetch = (page = 1) => {
  console.log('Fetching page ' + page);
  fetch(ENDPOINT + query + '?page=' + page)
    .then(res => {
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
      return res.json();
    })
    .then(json => {
      db = [ ...db, ...json.results ];
      // db = db.concat(json.results);
      doFetch(++page);
    })
    .catch(err => {
      console.log(`Fetched ${db.length} Star Wars characters.`);
      // console.error(err);
      // fetching = false;
    });
}

doFetch();

// b. Now let's do it with the async/await pattern.

// Hint: you may use a while loop.

// const fetch = require("node-fetch-commonjs"); // if needed

const ENDPOINT = "https://swapi.dev/api/";
let query = "people/";

let db = [];
let page = 1;

let fetchAll = async () => {
  let db = [];
  let fetching = true;
  let page = 1;
  try {
    while(fetching) {
      console.log('Fetching page ' + page);
      const res = await fetch(ENDPOINT + query + '?page=' + page++);

      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }

      const json = await res.json();

      db = [ ...db, ...json.results ];
    }
  }
  catch(err) {
    // console.error(err);
    fetching = false;
  }
  return db;
};

(async() => {
  let db = await fetchAll();
  console.log(`Fetched ${db.length} Star Wars characters.`);
})();

// Exercise 4. Optional. Fetch them all faster.
///////////////////////////////////////////////

// Now that you now from Exercise 3 how many characters are fetchable
// from the star wars API, you can setup X concurrent fetch requests.
// The Promise API has a method named Promise.all() which takes
// as input an array of promises and waits for all them to settle
// before executing .then().

// Hint: create all promises in a loop and them to an array.

// const fetch = require("node-fetch-commonjs"); // if needed

const ENDPOINT = "https://swapi.dev/api/";
let query = "people/";

let db = [];
let page = 1;

let promises = new Array(9);

for (let i = 0; i < promises.length; i++) {
  promises[i] = fetch(ENDPOINT + query + "?page=" + page++).then((res) => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json();
  });
}

Promise.all(promises)
  .then((array) => {
    for (let i = 0; i < array.length; i++) {
      db = [ ...db, ...array[i].results ];
    }
    console.log(`Concurrently fetched ${db.length} Star Wars characters.`);
  })
  .catch((err) => {
    console.error(err);
  });
