import React, { Component } from 'react';
import './App.css';
import Hello from './hello' ;



class App extends Component {
  hello(){
    alert("hello");
  }
  hi(){
    alert("hi");
  }

  render() {
    return (
      <div>
      <Hello head="hello" alert={this.hello}/>
      <Hello head="hi" alert={this.hi}/>
      </div>
    );
  }
}

export default App;
