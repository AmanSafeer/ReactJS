import React,{Component} from 'react';
// import {users} from './../services/users.js'
import './pages.css';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';


  class Details extends Component{
    ref =firebase.database().ref()
      constructor(props){
          super(props);
          this.state={
              //   users:users,
            //   id:'',
              name:'',
              email:'',
              currentUser:{},
              userId:this.props.match.params.id,
              edit:false
          }
      }
      
      changeHandler=(event)=>{
        this.setState({
        [event.target.name]:event.target.value
        })
      }
      edit=()=>{
        this.setState({
            edit:true,
            // id:this.state.currentUser.id,
            name:this.state.currentUser.name,
            email:this.state.currentUser.email
        })
      }
      save=(userId)=>{
        let userObj ={};
        userObj.id = this.state.currentUser.id;
        userObj.name = this.state.name;
        userObj.email = this.state.email; 

        this.ref.child("users").child(userId).set(userObj);
     
        this.setState({
            edit:false,
            currentUser:userObj
        })
      }

      delete=(userId)=>{
        this.ref.child("users").child(userId).remove();  
        this.props.history.push('/users')
      }
      
      render(){
        // console.log(this.state.currentUser)
        return(
        <div className="details">
            <h1>User Details</h1>
             {this.state.edit ? 
              <div className="userDetails">
                <p><b>ID:</b> 0{this.state.currentUser.id}</p>
                <p><b>NAME:</b> <input type="text" name="name" value={this.state.name} onChange={this.changeHandler}/></p>
                <p><b>EMAIL:</b> <input type="email" name="email" value={this.state.email} onChange={this.changeHandler}/></p>
                <Button variant="contained" color="primary" onClick={()=>this.save(this.state.userId)}>Save</Button>
              </div>  
                :  
            (this.state.currentUser ?
            <div className="userDetails">
                <p><b>ID:</b> 0{this.state.currentUser.id}</p>
                <p><b>NAME:</b> {this.state.currentUser.name}</p>
                <p><b>EMAIL:</b> {this.state.currentUser.email}</p>
            <div>
                <Button variant="contained" color="primary" onClick={()=>this.edit(this.state.userId)}>Edit</Button>
                <Button variant="contained" color="secondary" onClick={()=>this.delete(this.state.userId)}>Delete</Button>
                </div>
            </div>
            :
            <p>User not found</p>)
             }
               
        </div>
        )
    }

    componentDidMount(){
        this.ref.child("users").once("value", (data)=>{
            let obj = data.val();
            let user;
            if(obj){
               for(var key in obj){
                 const newObj = obj[key]
                 newObj['dataId']= key  
                    if(newObj.dataId == this.state.userId){   
                        user= newObj;
                    }
                }
                this.setState({currentUser:user});
            }
        })    
      }
}

export default Details;