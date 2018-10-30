import React,{Component} from 'react';
// import {users} from './../services/users.js'
// import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './pages.css'
import firebase from 'firebase';

class List extends Component{
  ref =firebase.database().ref()
  constructor(props){
      super(props);
      this.state = {
        // users:users
        users:[]
      }
    }
    
    details = (id)=>{
      this.props.history.push(`/details/${id}`)
    }
    
      render(){
        console.log(this.state.users)
        // const {classes} = this.props
        return(
          <div className ="list">
            <h1>Users list</h1>
            {(this.state.users=="")?
            <p>Waiting for users...</p>
            :
            <table >
              <thead><tr><td>Id</td><td>Name</td><td></td></tr></thead>
              <tbody>
            {this.state.users.map((user,i) =>
              <tr key={i}><td>0{user.id}</td><td>{user.name}</td><td><Button variant="contained"   onClick={()=>this.details(user.dataId)}>Show Details</Button></td></tr>
            )}
              </tbody>
            </table>}
          </div>
        )
      }

    componentDidMount(){
      this.ref.child("users").on("value", (data)=>{
        let usersArr=[];
        const obj = data.val();
        if(obj){
          for(var key in obj){
            const newObj = obj[key];
            newObj['dataId'] = key;
            usersArr.push(newObj)
          }
          this.setState({users:usersArr})
        }
      }) 
    }   
    componentWillUnmount(){
      this.ref.child("users").off();
    }
}


export default List