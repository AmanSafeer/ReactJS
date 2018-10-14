import React,{Component} from 'react';
// import {users} from './../services/users.js'
import './pages.css';
import firebase from 'firebase';


  class Details extends Component{
    ref =firebase.database().ref()
      constructor(props){
          super(props);
          this.state={
              currentUser:{},
            //   users:users,
              id:this.props.match.params.id
          }
      }
      componentDidMount(){
        this.ref.child("users").on("value", (data)=>{
            let usersData = data.val();
            if(usersData){
            let usersKeys = Object.keys(usersData)
            for(let i=0; i<usersKeys.length;i++){
                let user=usersData[usersKeys[i]];
                if(user.id == this.state.id) {this.setState({currentUser:user})};
                }
            }
        })    
      }
      edit=(id)=>{

      }
      delete=(id)=>{
          let usersArr=[];
        this.ref.child("users").on("value", (data)=>{
            let usersData = data.val();
            let usersKeys = Object.keys(usersData)
            for(let i=0; i<usersKeys.length;i++){
                let user=usersData[usersKeys[i]];
                if(user.id == id){
                    console.log(user)
                    // usersKeys.splice(i,1);
                }
                break
            }
            usersKeys.map((v,i)=>{console.log("hi")})
            // this.props.history.push('/list')
        });
      }
      
      render(){

        return(
        <div className="details">
        <h1>User Details</h1>
        {this.state.currentUser ?
        <div>
            <p>ID: {this.state.currentUser.id}</p>
            <p>NAME: {this.state.currentUser.name}</p>
            <p>EMAIL :{this.state.currentUser.email}</p>
            <div><button onClick={()=>this.edit(this.state.id)}>Edit</button>
            <button onClick={()=>this.delete(this.state.id)}>Delete</button></div>
        </div>    
        :
        <p>User not found</p>}
        </div>
    )}
}

export default Details;