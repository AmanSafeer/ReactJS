import React,{Component} from "react";
import './getdata.css';
import Button from './components/Button';


class GetData extends Component{
constructor(props){
  super(props);
  this.state = {
    score:this.props.score,
    winner:this.props.winner,
    total:[],
    response:this.props.response
  }
};

componentDidMount(){
  let totalArr = this.state.total.slice(0);
  let totalNum; 
  this.state.response.map(user =>{
    totalNum = user.followers+user.following+user.public_gists+user.public_repos;
    totalArr.push(totalNum);
  });


  let scoreNum = this.state.score;
  let winnerName = this.state.winner;
  totalArr.map((val,ind) =>{
    if(val > scoreNum){
      scoreNum = val;
      winnerName = this.state.response[ind].name;
    }
  })
  
  this.setState({
    total:totalArr,
    score: scoreNum,
    winner:winnerName
  })
};


render() {
    return(
        <div>
          {this.state.response.map((user,i)=>
             <div key={i} className="user">
                <div className="userImage"><img alt={user.name} src={user.avatar_url} /></div>
                <div className="userName">{user.name}</div>
                <div className="userDetails">
                    {"Followers: "+user.followers}<br/>
                    {"FOllowing: "+user.following}<br/>
                    {"Public_gists: "+user.public_gists}<br/>
                    {"Public_repos: "+user.public_repos}
                </div>
                <div className="userTotal">TOTAL:{this.state.total[i]}</div>
             </div>
             )}
             <div className="result">
              <div className ="winner">Winner is: {this.state.winner}</div>
              <Button text="Rematch" onClick={this.props.restart} className="rematch" />
             </div>
        </div>
      )
  }

}

export default GetData;
