import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import UserRegistrationScreen from './UserRegistrationScreen';
import UserLoginScreen from './UserLoginScreen';
import CreateThreadScreen from './CreateThreadScreen';
import ViewThreadScreen from './ViewThreadScreen';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


// const App = () => {
  
// };


ReactDOM.render(<App />, document.getElementById('root'));










































// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/register" component={UserRegistrationScreen} />
//         <Route exact path="/login" component={UserLoginScreen} />
//         <Route exact path="/create" component={CreateThreadScreen} />
//         <Route exact path="/view/:threadId" component={ViewThreadScreen} />
//       </Routes>
//     </Router>
//   );
// };

// ReactDOM.render(<App />, document.getElementById('root'));





// import React from 'react';
// import ReactDOM from 'react-dom/client';



// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();



// import UserRegistrationScreen from './UserRegistrationScreen';
// import UserLoginScreen from './UserLoginScreen';
// import CreateThreadScreen from './CreateThreadScreen';
// import ViewThreadScreen from './ViewThreadScreen';

// const Stack = createStackNavigator();

// AppRegistry.registerComponent('MyApp', () => App);
