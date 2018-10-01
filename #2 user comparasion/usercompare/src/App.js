import React, { Component } from 'react';
import './App.css';

import GetData from './getdata';
import Input from './components/Input';
import Button from './components/Button';
import { getUserData } from './config/helper';

class App extends Component {
  constructor() {
    super();

    this.state = {
      score:0,
      winner:'',
      user1: '',
      user2: '',
      isDone: false,
      response:''
    };
  }

  onInputHandler = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };
  
  reStart = () => {
    this.setState({
      isDone: false,
      score:0,
      winner:'',
      user1: '',
      user2: '',
    });
  };
  
  getUserDataHandler = event => {
    event.preventDefault();

    if (this.state.user1 === '' || this.state.user2 === '') {
      alert('Please fill this form');
      return;
    }
    if(this.state.user1 === this.state.user2){
      alert('please enter two different names')
      return;
    }
    const usersData = Promise.all([
      getUserData(this.state.user1),
      getUserData(this.state.user2),
    ]);

    usersData
    .then(res => {
      if(res[0].message == "Not Found" || res[1].message == "Not Found"){
        alert("user undefined")
        this.setState({
          isDone:false,
          user1: '',
          user2: '',
        })
        return;
      }
      this.setState({
        isDone: true,
        response:res
        });
      })
      .catch(error =>
        console.log(error)
      );

  };

  render() {
    if (this.state.isDone) {
      return (
        <div className="container">
        <GetData response ={this.state.response} restart={this.reStart} score={this.state.score} winner={this.state.winner}/> 
        </div>
      );
    }
    return (
      <div className="container">
        <form onSubmit={this.getUserDataHandler} className="form">
          <Input
            name="user1"
            inputHandler={this.onInputHandler}
            value={this.state.user1}
            label="User 1"
            placeholder="User 1 Name"
          />
          <Input
            name="user2"
            inputHandler={this.onInputHandler}
            value={this.state.user2}
            label="User 2"
            placeholder="User 2 Name"
          />
          <Button text="Match" className="match" />
          <div className="example">For example: (mtahir08, MOHAMMADArsalan, fabpot, andrew, egoist, ornicar)</div>
        </form>
      </div>
    );
  }
}

export default App;
