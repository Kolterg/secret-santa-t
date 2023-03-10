import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
// import { configureStore } from 'redux';

// const initialState = {
//   counter: 0
// }

// const reducer = (state, action) => {
//   if (action.type === 'INC') {
//     return {
//       ...state,
//       counter: state.counter + 1
//     }
//   }
//   if (action.type === 'DEC') {
//     return {
//       ...state,
//       counter: state.counter - 1
//     }
//   }
//   if (action.type === 'RESET') {
//     return {
//       ...state,
//       counter: 0
//     }
//   }
// }

// const store = configureStore(reducer);

// store.subscribe(() => {
//   console.log("Store was refactoring")
// })

// store.dispatch({types: 'INC'})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
