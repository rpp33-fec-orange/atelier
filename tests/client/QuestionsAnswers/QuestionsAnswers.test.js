import TestRenderer from 'react-test-renderer';
import React from 'react';
import QuestionsAnswers from '../../../client/src/components/QuestionsAnswers/QuestionsAnswers.jsx';


describe('Question and Answer component test', () => {
  const testRenderer = TestRenderer.create(<QuestionsAnswers />);
  const testInstance = testRenderer.root;

  test('it should contain a h4 element with the text "Questions and Answers"', () => {
    expect(testInstance.findByProps({id: "questionsAndAnswers"}).children).toEqual(['Questions and Answers']);
  });

});