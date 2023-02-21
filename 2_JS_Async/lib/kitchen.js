/////////////////////////////////////
// Simplistic Kitchen Environment. //
/////////////////////////////////////

module.exports = function(doAsync, doSilly, doThrow) {

  ///////////////////////
  // Random variables. //
  ///////////////////////

  // If TRUE, there is too much stuff in the fridge and it will
  // take more time to find the butter.
  let fridgeCluttered = doAsync;

  // The Whole Wheat bread develops a notoriously hard crust if
  // left outside for too long. It will take more time to slice it.
  let breadType = "White";
  if (doAsync && doSilly && Math.random() > 0.5) breadType = "Whole Wheat";

  // How much sliceable bread is left?
  let nSlicesAvailable = Math.max(3, Math.ceil(Math.random() * 10));
  if (doSilly) nSlicesAvailable = 2;

  ///////////////////////////
  // Init State variables. //
  ///////////////////////////

  // Might be open or closed, and contains more or less stuff,
  // including the butter of async programming.
  let fridge = {
    opened: false,
    stuff: {
      butter: true,
      water: true,
      soda: true,
    },
  };

  // Do silly stuff.
  if (doSilly) {
    if (Math.random() > 0.5) fridge.opened = true;
    if (Math.random() > 0.9) fridge.stuff.butter = false;
  }

  // If fridge is supposed cluttered, fill it with extra stuff.
  if (fridgeCluttered) {
    // Add properties directly.
    fridge.stuff.mushrooms = true;
    fridge.stuff.pizza = true;
    fridge.stuff.giantPot = true;

    // USE ES6 spread operator ...
    // Find out more here:
    // https://oprearocks.medium.com/what-do-the-three-dots-mean-in-javascript-bc5749439c9a
    fridge.stuff = {
      ...fridge.stuff,
      alfredoSauce: true,
      fruitPunch: true,
      chineseLeftover: true,
      misteryJar: true,
    };
  }

  // The bread is floating around waiting to be grabbed and sliced.
  // There might be just a few slices left, so it becomes difficult
  // to cut and you might get hurt. Silly.
  let bread = {
    availableSlices: nSlicesAvailable,
    type: breadType,
  };

  // The table holds the knife to cut the bread and the plate where
  // we will put the sliced bread.
  let table = {
    plate: {},
    knife: true,
  };

  return {
    table,
    bread,
    fridge
  }
};
