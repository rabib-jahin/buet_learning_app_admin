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
	checked:false,
	

}
this.logout=this.logout.bind(this)
this.getProb=this.getProb.bind(this)
}





search=e=>{

	

let elem=document.getElementsByClassName("probs");	

Array.from(elem).forEach(function(element){
let tag=element.getElementsByTagName("h3")[0].innerText;

if(tag.includes(e.target.value.trim())){
	element.style.display="block"
}
else{

	element.style.display="none"
}
})


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
	//let recaptcha=new firebase.auth.RecaptchaVerifier('recaptcha-container');

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
 	console.log("onsnapshot")


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
const data=this.state.checked?(<div>
 <form  style={{width:'200px',position:"absolute",right:'0'}} class="form-inline">
    <input name="search" onChange={this.search} class="form-control mr-sm-2" type="search" placeholder="Search by title" aria-label="Search"/>
  </form>

	<a id="logout" onClick={this.logout}><u>Log out</u></a>
<br/><a ><u><Link to="/reviewed">See Reviewed Problems</Link></u></a>
<br/><a><u><Link to="/contributors">See Contributors</Link></u></a>
<div className="para">
<p>Problem List</p></div>




</div>):null

	if(!this.state.isLoggedIn){
return <Redirect to="/"/>
	}
	
	if(this.state.gotProb) {return  <Redirect to={'/problem/'+this.state.id} />
}

return <div className="main">
{data}

{



this.state.probs&&this.state.probs.map((prob,i)=>{

var date=new Date(prob.timestamp).toDateString('en-US')
var time=new	Date(prob.timestamp).toLocaleTimeString('en-US')
	return <div className="probs" key={prob.id} onClick={(e)=>this.getProb(prob.id)}>

<h3>{i+1}.{prob.title}</h3>	
<ul>

<li>posted by {prob.author}</li>
<li>created :{date} {time}</li>
<li id="status">status : {prob.isReviewed?'Reviewed':'Not Reviewed'}</li>


</ul>

</div>

	

})


}


</div>

}
}


export default Dashboard