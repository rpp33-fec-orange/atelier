var setRatingSummary = (productRatings) => {
  // console.log('raw ratings in helper', productRatings);
  var results = [];
  var one = parseInt((productRatings[1] === undefined) ? 0 : productRatings[1]);
  var two = parseInt((productRatings[2] === undefined) ? 0 : productRatings[2]);
  var three = parseInt((productRatings[3] === undefined) ? 0 : productRatings[3]);
  var four = parseInt((productRatings[4] === undefined) ? 0 : productRatings[4]);
  var five = parseInt((productRatings[5] === undefined) ? 0 : productRatings[5]);
  var sum = one + two + three + four + five;
  var ratingSummary = (1 * one + 2 * two + 3 * three + 4 * four + 5 * five) / sum;
  ratingSummary = Math.round(ratingSummary * 100) / 100;
  results.push(ratingSummary, one, two, three, four, five);
  return results;
}

export default setRatingSummary