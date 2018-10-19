import React,{Component} from 'react';
// import {users} from './../services/users.js'
import './pages.css';
import firebase from 'firebase';


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

        this.ref.child("users").once("value", (data)=>{
            let usersData = data.val();
                if(usersData){
                    for(let i=0; i<usersData.length;i++){
                        let user=usersData[i];
                        // console.log(user)
                        if(user.id == userId){
                            usersData.splice(i,1,userObj);
                            break
                        }
                    }
                console.log(usersData)
                this.ref.child("users").set(usersData)   
            }    
        });
        
        this.setState({
            edit:false,
            currentUser:userObj
        })
      }
      delete=(userId)=>{
        this.ref.child("users").once("value", (data)=>{
            let usersData = data.val();
            if(usersData){
                for(let i=0; i<usersData.length;i++){
                    let user=usersData[i];
                    // console.log(user)
                    if(user.id == userId){
                        usersData.splice(i,1);
                        break
                    }
                }
                this.ref.child("users").set(usersData)   
            }    
            this.props.history.push('/users')
        });
      }
      
      render(){
        // console.log(this.state.currentUser)
        return(
        <div className="details">
            <h1>User Details</h1>
             {this.state.edit ? 
              <div>
                <p>ID: 0{this.state.currentUser.id}</p>
                <p>NAME: <input type="text" name="name" value={this.state.name} onChange={this.changeHandler}/></p>
                <p>EMAIL: <input type="email" name="email" value={this.state.email} onChange={this.changeHandler}/></p>
                <button onClick={()=>this.save(this.state.userId)}>Save</button>
              </div>  
                :  
            (this.state.currentUser ?
            <div>
                <p>ID: 0{this.state.currentUser.id}</p>
                <p>NAME: {this.state.currentUser.name}</p>
                <p>EMAIL :{this.state.currentUser.email}</p>
                <div><button onClick={()=>this.edit(this.state.userId)}>Edit</button>
                <button onClick={()=>this.delete(this.state.userId)}>Delete</button></div>
            </div>
            :
            <p>User not found</p>)
             }
               
        </div>
        )
    }

    componentDidMount(){
        this.ref.child("users").once("value", (data)=>{
            let usersData = data.val();
            if(usersData){
                let user= usersData.find((person)=> person.id == this.state.userId);
                this.setState({currentUser:user});
            }
        })    
      }
}

export default Details;