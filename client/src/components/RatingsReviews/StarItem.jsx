import React from 'react';
// import IconStar from './star.svg';

class StarItem extends React.Component {
  constructor(props) {
    super(props);
    this.roundToQuater = this.roundToQuater.bind(this);
  }
  // {value, max, className} is the props
  roundToQuater(n) {
    var number = n;
    if (number >= 0 && number <= 5) {
      number = (Math.round(number * 4) / 4).toFixed(2);
      return number;
    }
    return ('number has to be between 0 and 5');
  }

  render() {
    const starsInner = {
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: 'hidden',
      width: 50,
    };

    const starsOuter = {
      display: 'inline-block',
      position: 'relative',
      fontFamily: 'FontAwesome',
    }

    // const divStyle = {
    //   color: 'blue',
    //   backgroundImage: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
    // };

    return (
      <div></div>
    )
  }
}

export default StarItem;

// const Rating = ({ value, max, className }) => {
// 	/* Calculate how much of the stars should be "filled" */
//   const percentage = Math.round((value / max) * 100);

//   return (
//     <div className={styles.container}>
//     {
//       /* Create an array based on the max rating, render a star for each */
//     }
//       {Array.from(Array(max).keys()).map((_, i) => (
//         <IconStar key={i} className={styles.star} />
//       ))}
//     {
//       /* Render a div overlayed on top of the stars that should not be not filled */
//     }
//       <div className={styles.overlay} style={{ width: `${100 - percentage}%` }} />
//     </div>
//   );
// }


