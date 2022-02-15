import React from 'react';
import ReviewItem from './ReviewItem.jsx';
import StarNumber from './StarNumber.jsx';
import StarList from './StarList.jsx';
import StarItem from './StarItem.jsx';
import ComfortSlider from './ComfortSlider.jsx';
import SizeSlider from './SizeSlider.jsx';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 id='ratings-reviews'>RATINGS AND REVIEWS</h1>
        <StarNumber />
        <StarList />
        <SizeSlider />
        <ComfortSlider />
        <h3>248 reviews, sorted by relevance</h3>
        {/* <div> Review #1 </div>
      <div> Review #2 </div> */}
        <ReviewItem />
      </div>
    );
  }
}

export default RatingsReviews;