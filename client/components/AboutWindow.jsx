import React from 'react';
import { Container, Box } from '@chakra-ui/react';

function AboutWindow(props) {
  return (
    <Container maxW="xl" centerContent>
      <Box padding="4" bg="#e8e8e8" maxW="3xl">
        <div className="about-window">
          <h3>About the Quiz</h3>
          <p>
            This tool will help you assess your activities and determine your
            risk of contracting COVID-19. It will also offer guidance on what
            exactly your riskiest activities are.
            <p>
              This information is based on the Texas Medical Association
              guidelines and has been ranked by physicians from the TMA COVID-19
              task force and the TMA committee on infectious diseases.
            </p>
          </p>
        </div>
      </Box>
    </Container>
  );
}

export default AboutWindow;
