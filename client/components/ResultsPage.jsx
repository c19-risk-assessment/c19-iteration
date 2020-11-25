import React, { useEffect, useState } from 'react';
import { Container, Box } from '@chakra-ui/react';
import Activities from './Activities.jsx';
import styles from '../styles/styles.css';
import Questions from '../questions';

function ResultsPage(props) {
  let questions = Questions;

  const lookupTable = questions.reduce((table, question) => {
    table[question.keyword] = question.text;
    return table;
  }, {});

  const activities = [];
  for (let i = 0; i < props.riskyActs.length; i += 1) {
    const text = lookupTable[props.riskyActs[i]];
    activities.push(<Activities behavior={text} />);
  }

  return (
    <Container maxW="xl" centerContent>
      <Box padding="4" bg="#e8e8e8" maxW="3xl">
        <div id="results-window">
          <div>
            <h3 id="results-header">Your Results:</h3>
            <h5 className="results-label">
              Risk level based on behaviors: {props.riskLevel}
            </h5>
            <h5 className="results-label">
              The riskiest behaviors you engage in include:
            </h5>
            {activities}
          </div>
        </div>
      </Box>
    </Container>
  );
}

export default ResultsPage;
