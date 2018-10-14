import React,{Component} from 'react';
// import {users} from './../services/users.js'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './pages.css'
import firebase from 'firebase';

class List extends Component{
  ref =firebase.database().ref()
  constructor(props){
      super(props);
      this.state = {
        // users:users
        usersArr:[],
      }
    }
    
    details = (id)=>{
      this.props.history.push(`/details/${id}`)
    }
    
    componentDidMount(){
      this.ref.child("users").on("value", (data)=>{
        let usersData = data.val();
        if(usersData){
        let usersKeys = Object.keys(usersData)
        console.log(usersKeys) 
        this.setState({usersArr:usersKeys, usersDetails:usersData})
        }
      })
    } 
      render(){
        console.log(this.state.usersArr)
        const {classes} = this.props
      return(
        <div className ="list">
          <h1>Users list</h1>
          {(this.state.usersArr=="")?
          <p>Waiting for users...</p>
          :
          <table >
            <thead><tr><td>Id</td><td>Name</td><td></td></tr></thead>
            <tbody>
          {this.state.usersArr.map((user,i) =>
            <tr key={i}><td>{this.state.usersDetails[this.state.usersArr[i]].id}</td><td>{this.state.usersDetails[this.state.usersArr[i]].name}</td><td><Button variant="contained" className={classes.button}  onClick={()=>this.details(this.state.usersDetails[this.state.usersArr[i]].id)}>Show Details</Button></td></tr>
            )}
            </tbody>
          </table>}
        </div>
    )}
}
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,

  },
  input: {
    display: 'none',
  },
});

export default withStyles(styles)(List);