import React,{Component} from 'react'
import firebase from "../firebase"
import {Redirect ,Link} from "react-router-dom"
import "./dashboard.css"
class Reviewed extends Component{
 constructor(props){

super(props)

this.state={

	isLoggedIn:true,
	checked:false,
	probs:[],
	gotprob:false


}
this.getProb=this.getProb.bind(this)
this.logout=this.logout.bind(this)
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

this.componentMount();
}
logout(){
	
firebase.auth().signOut()
.then(()=>{

this.setState({

	isLoggedIn:false
})
}) 
}
componentMount=()=>{
 	console.log(firebase.auth().currentUser)


let prob=[]
firebase.firestore().collection('problem').where('isReviewed','==',true)
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
getProb(e){
console.log(e)
this.setState({

	gotProb:true,
	id:e

})

}
 render(){
const data=this.state.checked?(<div><a id="logout" onClick={this.logout}><u>Log out</u></a>
 <form  style={{width:'200px',position:"absolute",right:'0'}} class="form-inline">
    <input name="search" onChange={this.search} class="form-control mr-sm-2" type="search" placeholder="Search by title" aria-label="Search"/>
  </form>
<a  className="dashboard"><Link to="/dashboard">Back to Problemlist</Link></a>

<div className="para">
<p>Reviewed Problems</p></div>
</div>
):null
if(!this.state.isLoggedIn){
return <Redirect to="/"/>
}	 
if(this.state.gotProb) {return  <Redirect to={'/problem/'+this.state.id} />
}	
return(
<div className="main">
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

	)

 }


}
export default Reviewed;