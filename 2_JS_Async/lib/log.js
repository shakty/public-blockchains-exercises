////////////////////////////////////////
// Some simple functions for logging. //
////////////////////////////////////////

module.exports = function(doAsync, doSilly, doThrow) {

  let actionCounter = 0;

  function log(txt) {
    console.log("    " + txt);
  }

  function logCounter(txt) {
    console.log(++actionCounter, txt);
  }

  function err(txt) {
    txt = "Aaaah!!! " + txt + '\n';
    log(txt);
    if (doThrow) quit();
  }

  function quit() {
    throw new Error("\nI cannot go on like this...\n");
  }

  return { log, logCounter, err };
};
