import actionTypes from '../constants/constant'
import * as firebase from 'firebase'

export function add(obj){
    return dispatch =>{
        firebase.database().ref().child('todos').push(obj)
    }
}
export function getData(){
    return dispatch =>{
        firebase.database().ref().child('todos').on("child_added",(snapShot)=>{
            let data =snapShot.val();
            if(data){
            data.id= snapShot.key;
            console.log(data)
            dispatch({type:actionTypes.GETDATA, payload:data})
            }
        })
    }
}
export function del(obj){
    return dispatch =>{
        firebase.database().ref().child('todos').child(obj.id).remove();
        dispatch({type:actionTypes.DELETE,payload:obj.ind})
    }
}
export function edit(){
    return dispatch =>{
        dispatch({type:actionTypes.EDIT}) 
    }
}
export function update(obj){
    return dispatch =>{
        firebase.database().ref().child('todos').child(obj.todoObj.id).update(obj.todoObj)
        dispatch({type:actionTypes.UPDATE,payload:obj})
    }
}
export function completed(obj){
    return dispatch =>{
        firebase.database().ref().child('todos').child(obj.todo.id).update(obj.todo);
        dispatch({type:actionTypes.COMPLETED,payload:obj.ind})
    }
}