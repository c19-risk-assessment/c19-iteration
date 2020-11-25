import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

// import AssessmentPage from './components/AssessmentPage.jsx';
import ResultsPage from './components/ResultsPage.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import SignUp from './components/Form.jsx';
import AssessmentPage from './components/AssessmentPage.jsx';
import Navbar from './components/NavBar.jsx';
import LogIn from './components/logIn.jsx';
import Profile from './components/Profile.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      riskLevel: '',
      riskyActs: [],
      answers: [],
      username: '',
      password: '',
    };

    this.submitAnswers = this.submitAnswers.bind(this);
    this.addToAnswers = this.addToAnswers.bind(this);
    this.removeFromAnswers = this.removeFromAnswers.bind(this);
    this.getRiskLevel = this.getRiskLevel.bind(this);
    this.getRiskyActs = this.getRiskyActs.bind(this);
    // this.test = this.test.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  submitAnswers() {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activities: this.state.answers }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('risky acts include', data.activities.riskyActs);
        const newRisk = data.activities.riskLevel;
        const newRiskyActs = data.activities.riskyActs;

        this.setState({
          ...this.state,
          riskLevel: newRisk,
          riskyActs: newRiskyActs,
        });
      });
  }

  addToAnswers(keyword) {
    const newAnswers = this.state.answers.slice();
    newAnswers.push(keyword);

    console.log('keyword is', keyword, 'new answers include :', newAnswers);
    this.setState({
      ...this.state,
      answers: newAnswers,
    });
  }

  removeFromAnswers(keyword) {
    let newAnswers = this.state.answers.slice();
    newAnswers = newAnswers.filter((answer) => answer !== keyword);

    console.log('keyword was ', keyword, 'new answers include :', newAnswers);
    this.setState({
      ...this.state,
      answers: newAnswers,
    });
  }

  getRiskyActs() {
    return this.state.riskyActs;
  }

  getRiskLevel() {
    return this.state.riskLevel;
  }

  // test() {
  //   fetch("/register", {
  // 		method: "POST",
  // 		headers: {
  // 			"Content-Type": "application/json"
  // 		},
  // 		body: JSON.stringify({
  // 			username: "testrun400",
  // 			password: "testpw300",
  // 		})
  // 	}).catch((err) => {
  // 		console.log(err);
  // 	});

  handleInputChange(event) {
    event.preventDefault();
    console.log('This is the event Name ', event.target.name);
    console.log('This is the input value ', event.target.value);
    const curEventName = event.target.name;
    this.setState({
      [curEventName]: event.target.value,
    });
  }

  handleLogIn(event) {
    console.log(
      'this is the username and password in this.state: ',
      this.state
    );
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('this is the response data', data);

        // const cookie = data.activities.riskyActs;

        // this.setState({
        //   ...this.state,
        //   riskLevel: newRisk,
        //   riskyActs: newRiskyActs,
        // });
      });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="mainPageHeader">
          <center>
            <h1>Covid Risk Assessment Quiz</h1>
            <a href="/assessment">Take the risk assessment now</a>
          </center>
        </div>
        <Switch>
          <Route exact path="/">
            <SignUp />
          </Route>
          <Route exact path="/assessment">
            <AssessmentPage
              submitAnswers={this.submitAnswers}
              add={this.addToAnswers}
              remove={this.removeFromAnswers}
            />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/logIn">
            <LogIn
              logIn={this.handleLogIn}
              inputChange={this.handleInputChange}
              userName={this.state.username}
              passWord={this.state.password}
            />
          </Route>
          <Route path="/results">
            <ResultsPage
              riskLevel={this.state.riskLevel}
              riskyActs={this.state.riskyActs}
              getRiskLevel={this.getRiskLevel}
              getRiskyActs={this.getRiskyActs}
            />
          </Route>
          <Route component={ErrorPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
