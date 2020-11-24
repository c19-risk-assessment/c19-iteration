import React from 'react';
import { Redirect, NavLink } from 'react-router-dom';
// import {
//   Icon,
//   Input,
//   InputLeftAddon,
//   Stack,
//   InputGroup,
//   InputLeftElement,
// } from '@chakra-ui/react';

import Form from './components/Form.jsx';
// import styles from '../styles/styles.css';

function SignIn() {
  return (
    <div>
      <div id="assessment-page">
        <div className="window">{/* <Form /> */}</div>
        {/* <div className="window">
          <AssessmentWindow add={props.add} remove={props.remove} />
          // return <Redirect to="/results"></Redirect>;

          <NavLink to="/results">
            <button
              onClick={() => {
                props.submitAnswers();
              }}
            >
              Submit
            </button>
          </NavLink>
        </div> */}
      </div>
    </div>
  );
}

export default SignIn;

// async function signedUp(
//     name,
//     lastName,
//     addNum,
//     addSt,
//     addZip,
//     username,
//     password
//   ) {
//     name = String(name);
//     lastName = String(lastName);
//     addNum= Number(addNum);
//     addSt = String(addSt);
//     addZip = Number(addZip);
//     username = String(username);
//     password = String(password);

//     const request = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         first_name: name,
//         last_name: lastName,
//         email: username,
//         password: password,
//         address_number: addNum,
//         address_street: addSt,
//         address_zip: addZip
//       }),
//     };
//     const response = await fetch('/cust/signup', request);
//     const data = await response.json();
//     console.log("this is data:", data);
//     setState({
//       ...state,
//       verified: true,
//       address_number: addNum,
//       address_street: addSt,
//       address_zip: addZip,
//       email: username,
//     });
//   }

//   return (
//     <div>
//       {state.verified ? (
//         <Switch>
//           <Route
//             path="/"
//             exact
//             render={() => {
//               return (
//                 <div>
//                   {map.toggled ? (
//                     <div>
//                       <NavbarL toggled={toggled} cart={state.cart} total={state.total} emptyCart={emptyCart} removeCartItem={removeCartItem} unAuth={unAuth}/>
//                       <Markets version={true} addToCart={addToCart} email={state.email} instantiateCart={instantiateCart}/>
//                     </div>
//                   ) : (
//                     <div>
//                       <NavbarL toggled={toggled} cart={state.cart} total={state.total} emptyCart={emptyCart} removeCartItem={removeCartItem} unAuth={unAuth}/>
//                       <Markets version={false} addToCart={addToCart} email={state.email} instantiateCart={instantiateCart}/>
//                     </div>
//                   )}
//                 </div>
//               );
//             }}
//           />
//           <Route
//             path="/checkout"
//             exact
//             render={() => {
//               return (
//                 <div>
//                   <NavbarC cart={state.cart} />
//                   This is where our checkout page will go.
//                 </div>
//               );
//             }}
//           />
//         </Switch>
//       ) : (
//         <Switch>
//           <Route
//             path="/"
//             exact
//             render={() => {
//               return (
//                 <div>
//                   <Navbar />
//                   <br />

//                   <Center>
//                     <Heading >
//                       Welcome to Egg Dash!
//                     </Heading>
//                   </Center>
//                   <br />
//                   <Center>
//                     <Image width='80%' borderRadius='15px' src="https://www.wegmans.com/wp-content/uploads/1097052-hero-wegmans-organic-farm-1-2048x1032.jpg" />
//                   </Center>
//                   <br />
//                   <Center>
//                     <Text>
//                       We deliver organic, farm-fresh family meats and produce to any address, anytime.
//                     </Text>
//                   </Center>
//                   <Center>
//                     <Text>
//                       Press <Badge>Users</Badge> to sign up or log in.
//                     </Text>
//                   </Center>
//                 </div>
//               );
//             }}
//           />
//           <Route
//             path="/login"
//             exact
//             render={() => (
//               <div>
//                 <Navbar />
//                 <Login loggedIn={loggedIn} />
//               </div>
//             )}
//           />
//           <Route
//             path="/signup"
//             exact
//             render={() => (
//               <div>
//                 <Navbar />
//                 <SignUp signedUp={signedUp} />
//               </div>
//             )}
//           />
//         </Switch>
//       )}
//     </div>
//   );
// }

// export default App;
