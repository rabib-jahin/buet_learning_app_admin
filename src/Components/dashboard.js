import React,{Component} from "react"
import firebase from "../firebase"
import {Redirect ,Link} from "react-router-dom"
import "./dashboard.css"
import Login from "./Login"

class Dashboard extends Component{
constructor(props){

super(props)

this.state={

	isLoggedIn:true,
	probs:[],
	gotProb:false,
	id:"",
	checked:false

}
this.logout=this.logout.bind(this)
this.getProb=this.getProb.bind(this)
}







logout(){
	
firebase.auth().signOut()
.then(()=>{

this.setState({

	isLoggedIn:false
})
}) 
}
getProb(e){
console.log(e)
this.setState({

	gotProb:true,
	id:e

})

}
componentDidMount(){
firebase.auth().onAuthStateChanged(user=>{
if(user){

	this.setState({

		isLoggedIn:true,
		checked:true
	})
}
else{

	this.setState({
		isLoggedIn:false,
		checked:true
	})
}

})
	this.componentMount()
}
 componentMount=()=>{
 	console.log(firebase.auth().currentUser)


let prob=[]
firebase.firestore().collection('problem')
.onSnapshot(snap=>{
snap.docChanges().forEach(change=>{
if(change.type==='added') 
prob.push({id:change.doc.id,...change.doc.data()})
else if(change.type==='removed')
this.componentDidMount();
else if(change.type==='modified')
this.componentDidMount()


})
this.setState({

	probs:prob
})

 
})



}


render(){
console.log(this.state.gotProb)
const data=this.state.checked?(<div><a id="logout" onClick={this.logout}><u>Log out</u></a>
<br/><a ><u><Link to="/reviewed">See Reviewed Problems</Link></u></a>
<div className="para">
<p>Problem List</p></div></div>):null

	if(!this.state.isLoggedIn){
return <Redirect to="/"/>
	}
	
	if(this.state.gotProb) {return  <Redirect to={'/problem/'+this.state.id} />
}
if(!this.state.probs){

	return <p>helo</p>
}
return <div className="main">
{data}

{



this.state.probs.map((prob,i)=>{

var date=new Date(prob.timestamp).toDateString('en-US')
var time=new	Date(prob.timestamp).toLocaleTimeString('en-US')
	return <div className="probs" key={prob.id} onClick={(e)=>this.getProb(prob.id)}>

<h3>{i+1}.{prob.title}</h3>	
<ul>

<li>posted by {prob.author}</li>
<li>created :{date} {time}</li>
</ul>

</div>

	

})


}


</div>

}
}


export default Dashboard