import React,{Component} from "react"
import firebase from "../firebase"
import {Redirect ,Link} from "react-router-dom"
import Modal from "react-modal"
Modal.setAppElement("#root")
class Contributors extends Component{
constructor(props){

super(props);
this.state={

	isLoggedIn:true,
	probs:[],
	checked:false,
	model:false,
  authorProb:[],
  revProbs:[]
}
this.logout=this.logout.bind(this)
this.getProb=this.getProb.bind(this)
}

search=e=>{

  

let elem=document.getElementsByClassName("probs");  

Array.from(elem).forEach(function(element){
let tag=element.getElementsByTagName("li")[0].innerText.split(':')[1];
console.log(tag)
if(tag.trim().toLowerCase().includes(e.target.value.toLowerCase().trim())){
  element.style.display="block"
}
else{

  element.style.display="none"
}
})


}


getProb(author){

let p=[]
firebase.firestore().collection('problem')
.where("author",'==',author).get()
.then(docs=>{

docs.forEach(doc=>{

p.push({id:doc.id,...doc.data()})

})
this.setState({

  authorProb:p,
  model:true
})
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
componentMount(){

console.log("conributor")
let prob=[]
let rev=[]
firebase.firestore().collection('problem')
.onSnapshot(snap=>{
snap.docChanges().forEach(change=>{
if(change.type==='added') {
prob.push({id:change.doc.id,...change.doc.data()})

if(change.doc.data().isReviewed){
rev.push({id:change.doc.id,...change.doc.data()})

}

}
else if(change.type==='removed')
this.componentDidMount();
else if(change.type==='modified')
this.componentDidMount()


})
this.setState({

	probs:prob,
  revProbs:rev
})

 
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


render(){
console.log(this.state.probs)
let close=()=>{
this.setState({


model:false


})

}
var  s=new Set();
const data=this.state.checked?(<div>
<a id="logout" onClick={this.logout}> Log out</a>
 <form  style={{width:'200px',position:"absolute",right:'0'}} class="form-inline">
    <input name="search" onChange={this.search} class="form-control mr-sm-2" type="search" placeholder="Search by name" aria-label="Search"/>
  </form>
<a><Link to="/dashboard">Back to dashboard</Link></a>

<div className="para">
<p>Contributors List</p></div>




</div>
	


  ):(

 <div class="preloader-wrapper big active" id="loader">
      <div class="spinner-layer spinner-blue">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-red">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-yellow">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-green">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>





	)
	if(!this.state.isLoggedIn){
return <Redirect to="/"/>
	}

return (
<div>
{data}

<ul>
{

this.state.probs&&this.state.probs.map(prob=>{
s.add(prob.author)
})}
{
Array.from(s).map((author,id)=>{

return (
<div className="probs" key={id}>
<li style= {{color:"orange"}}>Name : {author}</li>
<li style= {{color:"violet"}}> {this.state.probs.filter(x=>x.author===author).length} {this.state.probs.filter(x=>x.author===author).length>1?' Contributions':' Contribution'}</li>
<li style= {{color:"cyan"}}> {this.state.revProbs.filter(x=>x.author===author).length} Approved</li>
<button style={{width:200}} className="btn btn-primary" onClick={()=>this.getProb(author)}>Contributions</button>

</div>

	)
})

}
</ul>

<Modal  style={{content:{backgroundColor:'white ',border:'1px solid #ccc',borderRadius:'4 px'}}} id="modal" isOpen={this.state.model} onRequestClose={()=>this.setState({model:false})}>
<h1>All Problems</h1>
<ul>

{this.state.authorProb&&this.state.authorProb.map((prob)=>{

return(
<div key={prob.id}>
<li><Link to={'/problem/'+prob.id}>{prob.title}</Link></li>

</div>
  )

})}
</ul>
<h1>Approved</h1>
<ul>
{
  this.state.authorProb &&   this.state.authorProb.map((prob)=>{

    return (
<div key={prob.id}>
<li >{prob.isReviewed?<Link to={'/problem/'+prob.id}>{prob.title}</Link>:null}</li>

</div>
      )
  })
}
</ul>
<button className="btn btn-primary" onClick={()=>this.setState({model:false})}>Close</button>

</Modal>
</div>

		)
}

}

export default Contributors;