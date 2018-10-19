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
        users:[]
      }
    }
    
    details = (id)=>{
      this.props.history.push(`/details/${id}`)
    }
    
      render(){
        // console.log(this.state.users)
        const {classes} = this.props
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
              <tr key={i}><td>0{user.id}</td><td>{user.name}</td><td><Button variant="contained" className={classes.button}  onClick={()=>this.details(user.id)}>Show Details</Button></td></tr>
            )}
              </tbody>
            </table>}
          </div>
        )
      }

    componentDidMount(){
      this.ref.child("users").on("value", (data)=>{
        let usersArr=[];
        let usersData = data.val();
        if(usersData){
          // console.log(usersData)
          for(var i=0; i<usersData.length;i++){
            usersArr.push(usersData[i])
        }
        this.setState({users:usersArr})
        }
      }) 
    }   
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