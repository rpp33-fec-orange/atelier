import React from 'react';
import listOfQuestions from './listOfQuestions.js';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: listOfQuestions
    };
  }


  render() {
    return (
      <div id="questionList">
        {
          this.state.questions.map(question => {
            <QuestionItem question={question} />
          })
        }
      </div>
    );
  }
}

export default QuestionList;


// renderQuestionListItem(q) {
//   return (
//     <div className="questionAndAnswer">
//       <div className="details" style={{display: 'inline-block'}}>
//         <span className="questionText">
//           {`Q: ${q.question_body}`}
//         </span>
//         <div className="answers">
//           <span className="answerText">
//             {`A: ${q.answers.body}`}
//           </span>
//           <br></br>
//           <div className="answerAddons">
//             <span>
//               {`by ${q.answers.answerer_name}`}
//             </span>
//             <span> | </span>
//             <span className="answerHelpfulness">
//               Helpful? <a href="http://127.0.0.1:2000/">Yes</a>{`(${q.answers.helpfulness})`}
//             </span>
//             <span className="reportAnswer">
//             <a href="http://127.0.0.1:2000/">Report</a>
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className="addons" style={{display: 'inline-block'}}>
//         <span className="questionHelpfulness">
//           Helpful? <a href="http://127.0.0.1:2000/">Yes</a>{`(${q.question_helpfulness})`}
//         </span>
//         <span> | </span>
//         <span id="addAnswer">
//         <a href="http://127.0.0.1:2000/">Add Answer</a>
//         </span>
//       </div>
//     </div>
//   );
// }
