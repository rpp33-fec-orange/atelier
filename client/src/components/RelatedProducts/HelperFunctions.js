var setRatingSummary = (productRatings) => {
  console.log('raw ratings in helper', productRatings);
  // round stars number up to a quarter of a review point.
  // We have : 0.00, 0.25, 0.50, 0.75, and 1.00
  var results = [];
  console.log('this is ratings inside StarNumber: ', productRatings);
  var one = parseInt((productRatings[1] === undefined) ? 0 : productRatings[1]);
  var two = parseInt((productRatings[2] === undefined) ? 0 : productRatings[2]);
  var three = parseInt((productRatings[3] === undefined) ? 0 : productRatings[3]);
  var four = parseInt((productRatings[4] === undefined) ? 0 : productRatings[4]);
  var five = parseInt((productRatings[5] === undefined) ? 0 : productRatings[5]);
  console.log('one in StarNumber is: ', one);
  console.log('two in StarNumber is: ', two);
  console.log('three in StarNumber is: ', three);
  console.log('four in StarNumber is: ', four);
  console.log('five in StarNumber is: ', five);
  var sum = one + two + three + four + five;
  var ratingSummary = (1 * one + 2 * two + 3 * three + 4 * four + 5 * five) / sum;
  ratingSummary = Math.round(ratingSummary * 100) / 100;
  results.push(ratingSummary, one, two, three, four, five);
  return results;
}

export default setRatingSummary