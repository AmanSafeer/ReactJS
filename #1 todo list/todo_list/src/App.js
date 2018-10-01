import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      name:'',
      editNameNum:'',
      add:true,
      todo :[]
    }
  };

  formInput=(event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  addItem=()=>{
    let todoArr = this.state.todo.slice(0);
    todoArr.push(this.state.name);
    this.setState({
      todo:todoArr,
      name:'',
    }) 
  };

  removeItem=(ind)=>{
    let todoArr = this.state.todo.slice(0);
    todoArr.splice(ind,1);
    this.setState({
      todo:todoArr
    })
  };

  editItem=(ind)=>{
    let todoArr = this.state.todo.slice(0);
    let editName = todoArr[ind];
    this.setState({
      add:false,
      name:editName,
      editNameNum:ind
    })
  };

  saveItem=()=>{
    let todoArr = this.state.todo.slice(0);
    todoArr[this.state.editNameNum] =this.state.name;
    this.setState({
      add:true,
      todo:todoArr,
      name:''
    })
  };

  render() {
   console.log(this.state.editNameNum)
    return (
      <div className="container">
        <h1>Todo App</h1>
        <TextField variant="outlined" label="Add Todo"  name="name" value={this.state.name}  onChange={this.formInput}  margin="normal"/>
        {this.state.add ? 
        (<button onClick={this.addItem} className="button add">+ Add</button>):
        (<button onClick={this.saveItem} className="button save">Save</button>)
        }

        <table>
          <tbody>
          {this.state.todo.map((v,i)=>
            <tr key={i}><td><div className="todoName">{v}</div><div><button onClick={(e)=>this.editItem(i)} className="button edit">Edit</button>
              <button onClick={(e)=>this.removeItem(i)}  className="button delete">Delete</button></div></td></tr>
          )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
