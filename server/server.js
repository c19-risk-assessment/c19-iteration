const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const app = express();
const PORT = 3000;
const quizController = require('./quizController.js');

const pool = new Pool({
  connectionString:
    'postgres://oebljrrf:s6TaaMbtHrgeJ8sWqHmpkdd1kJjbg2N5@suleiman.db.elephantsql.com:5432/oebljrrf',
});

const db = {
  query: async function (text, params, callback) {
    console.log('executed query', text);
    let data = await pool.query(text, params, callback);
    return data;
  },
};

app.use(
  db.query('',(err) => {
        if (err) {
            console.log(err);
        }
    });
);
app.use(express.json());

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

// route handler to send risk assessment results back to client
app.get('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// route handlers:
//  will receive the Submit event from the frontend when user completes the quiz
//  and send assessment result back to frontend:
app.post('/', quizController.calculateRisk, (req, res) => {
  res
    .status(200)
    // .redirect('/results');
    .send(res.locals);
});

// serve index.html on all the pages
// app.use('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../index.html'));
// });

// global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

//listen
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

module.exports = app;
