import React, {Component } from 'react'
import Registration from './pages/registration';
import List from './pages/list'
import Details from './pages/details'
import './App.css'


import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component{
  
  render(){
    return(
      <Router>
        <div>
          <div className="menu">
          <Link to="/">Registration</Link>
          <Link to="/users">Users</Link>
          </div>

          <Route exact path="/" component={Registration}/>
          <Route path="/users/" component={List}/>
          <Route exact path="/details/:id" component={Details}/>
        </div>
      </Router>
    )
  }
}

export default App

