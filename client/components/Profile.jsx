import React from 'react';
import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect, NavLink } from 'react-router-dom';

// //chart stuff vvvvvv

// //chart stuff ^^^^

// did i do this right jonah?
//vvvvv right I forgot about that
//not workin throwing me error on browser
// oh we also need to use super on props and add the constructor and pass in props, I believe

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // fetch('/api/')
    //   .then((res) => {
    //     // console.log('this is the response object:', res);
    //     return res.json();
    //   })
    //   .then((allFarms) => {
    //     // console.log('this is allFarms: ', allFarms);
    //     if (!Array.isArray(allFarms)) allFarms = [];
    //     return this.setState({
    //       allFarms,
    //       fetchedFarms: true,
    //     });
    //   })
    //   .catch((err) =>
    //     console.log(
    //       'displayAllFarms.componentDidMount: get farms: ERROR: ',
    //       err
    //     )
    //   );
  }
  render() {
    return (
      <div>
        <div id="userStats">
          <p class="stats">Name: Mr.Sample{/*this.props.user.age*/}</p>
          <p class="stats">Age: 135{/*this.props.user.age*/} years old</p>
          <p class="stats">'Location: Mars{/*this.props.user.age*/}</p>
        </div>
        <NavLink to="/histogram">Your Covid Risk Histogram</NavLink>
      </div>
    );
  }
}

export default Profile;
