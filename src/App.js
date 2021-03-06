import React from 'react';
import './App.scss';
import { Provider } from 'react-redux'
import store from './redux/store'
import {HashRouter as Router} from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import router from './router'
// var result = format(new Date(2015, 1,11), 'MM/DD/YYYY')
function App() {
  return (
    <Provider store = {store}>
    <Router>
    <Navbar/>
    {router}
    </Router>
    </Provider>
  );
}

export default App;
