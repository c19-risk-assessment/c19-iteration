import React, { Redirect } from 'react';
import { Box, Container } from '@chakra-ui/react';
import QuestionDisplay from './QuestionDisplay.jsx';
import Questions from '../questions';

function AssessmentWindow(props) {
  let questions = Questions;

  // question display generator
  questions = questions.map((question, index) => {
    return (
      <QuestionDisplay
        keyword={question.keyword}
        key={`question${index}`}
        text={question.text}
        add={props.add}
        remove={props.remove}
      />
    );
  });

  //console.log(questions);

  return (
    <Container maxW="xl" centerContent>
      <Box padding="4" bg="#e8e8e8" maxW="3xl">
        <div className="assessment-window">
          <h3>Take The Assessment</h3>
          <div id="questions">{questions}</div>
        </div>
      </Box>
    </Container>
  );
}

export default AssessmentWindow;
