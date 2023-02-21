/////////////
// App Dev //
/////////////

// Module: Async programming.
/////////////////////////////

// EXERCISE 1. Callbacks.
////////////////////////

// If you need to run some code _after_ some other event in the future, then
// the easiest solution is to use a callback (often shortened with "cb").

// Modify the code below so that the printNews method is called after
// all news are fetched inside the timeout.

// Solution.
let printNews = (allNews) => {
  allNews.forEach(news => console.log(`- Breaking News: ${news.title}`));
};

let getLatestNews = (cb) => {
  // Imagine to connect to a server and getting back the  
  setTimeout(() => {
    let news = [ 
      {
        id: 'news1',
        title: 'Bitcoin price reached 60K!', 
      },
      {
        id: 'news2',
        title: 'Bitcoin price crashed 20%!'
      }
    ];
    if (cb) cb(news);
  }, 2000);
};

getLatestNews(printNews);