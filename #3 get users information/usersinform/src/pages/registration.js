import React, {Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './pages.css'
import firebase from 'firebase';

class Registration extends Component{
    ref =firebase.database().ref()
    constructor(){
        super();
        this.state = {
            id:'',
            name:'',
            email:'',
            user:{},
            list:[]
        }
    }
   
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    
    submitForm = event =>{
        event.preventDefault();
        let usersArr = this.state.list.slice(0);
        let user;
        user = this.state.user;
        user.id = this.state.id
        user.name = this.state.name;
        user.email = this.state.email;
        
        if(user.id === "" || user.name === "" || user.email === ""){
            alert("please fill all input fields")
            return;
        }
        usersArr.push(user); 

        this.ref.child("users").set(usersArr)
        
        this.setState({
            id:'',
            name:'',
            email:'',
            user:{},
            list:usersArr
        })

        
    };


    render(){
        // console.log(this.state.list)
        const {classes}=this.props;
        return (
        <div className="form">    
            <h1>Registration Form</h1>
            <form onSubmit={this.submitForm}>
            <TextField id="outlined-name" label="Id" className={classes.textField} name="id" type="number" value={this.state.id} onChange={this.handleChange}  margin="normal" variant="outlined" /><br/>
            <TextField id="outlined-name" label="Name" className={classes.textField} name="name" type="text" value={this.state.name} onChange={this.handleChange} margin="normal" variant="outlined" /><br/>
            <TextField id="outlined-name" label="Email" className={classes.textField} name="email" type="email" value={this.state.email} onChange={this.handleChange} margin="normal" variant="outlined" /><br/>
            <Button type="submit" variant="outlined" color="primary" className={classes.button}>Add User</Button>
            </form>  
        </div>
        )
    };

    componentDidMount(){
        this.ref.child("users").on("value", (data)=>{
        let usersData = data.val();
        let listArr=[];
        if(usersData){
            for(var i=0; i<usersData.length;i++){
                   listArr.push(usersData[i])
               }
        }
        this.setState({list:listArr})
        })
    };

}


const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width:400,
      marginTop:10,
      height:60
    },
    button: {
        margin:10,
        height:40
      },
  });   

export default withStyles(styles)(Registration)



