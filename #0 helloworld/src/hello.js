import React, {Component} from "react";


class Hello extends Component{
    constructor(){
      super();
    } 
  
    render(){
     
      return(
        <div>
        <h1>{this.props.head}</h1>
        <button onClick={this.props.alert}>Alert</button>
      </div>
      )
    }
  }

export default Hello;  