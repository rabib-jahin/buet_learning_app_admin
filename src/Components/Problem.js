import React,{Component,useState} from 'react';
import "./Problem.css"
import {BrowserRouter as Router,Link,Switch,Route,Redirect} from "react-router-dom"
import firebase from "../firebase"
class Problem extends Component {

constructor(props){
	super(props)
this.state={

	isLoggedIn:true,
	isChecked:false,
	probDetails:[],
	files:[],
	title:"",
	series:"",
	isReviewed:false,
	description:"",
	statement:"",
	explanation:"",
	restrictions:"",
	category:"",
	difficulty:"",
	answer:"",
	ans_type:"",
	author:""
}
this.change=this.change.bind(this)
this.click=this.click.bind(this)
this.review=this.review.bind(this)
this.disapprove=this.disapprove.bind(this)
this.delete=this.delete.bind(this)
let files=[]
}
fileupload(e){


}
delete(){
firebase.firestore().collection('problem').doc(this.props.match.params.id)
.delete()
.then(()=>{
	alert("succesfuly deleted")
})
.catch(e=>{alert('error occured')})

}
disapprove(){
firebase.firestore().collection('problem').doc(this.props.match.params.id)
.update({

isReviewed:false

}

).then(()=>alert('update successful.Problem disapproved'))
.catch((e)=>{
	alert('Could not update.Error occured')
})
}



review(){

firebase.firestore().collection('problem').doc(this.props.match.params.id)
.set({

  isReviewed:true

},{

merge:true
}

).then(()=>alert('update successful.Problem approved'))
.catch(e=>{alert('error occured.')})

}
change(e){
this.setState({
[e.target.name]:e.target.value
})
}
click(){

firebase.firestore().collection('problem').doc(this.props.match.params.id)
.update({

  title:this.state.title,
  series:this.state.series,
  description:this.state.description,
  statement:this.state.statement,
  explanation:this.state.explanation,
  restrictions:this.state.restrictions,
  category:this.state.category,
  difficulty:this.state.difficulty,
  answer:this.state.answer,
  ans_type:this.state.ans_type,
  author:this.state.author


}

).then(()=>alert('update successful'))
.catch(e=>{alert('error occured')})
}
componentDidMount=()=>{
firebase.auth().onAuthStateChanged(user=>{
if(user){

	this.setState({

		isLoggedIn:true,
		isChecked:true
	})
}
else{

	this.setState({
		isLoggedIn:false,
		isChecked:true
	})
}

})
firebase.firestore().collection('problem').doc(this.props.match.params.id).get()
.then(doc=>{
	

this.setState({

	probDetails:doc.data(),
	title:doc.data().title,
	series:doc.data().series,
	description:doc.data().description,
	statement:doc.data().statement,
	explanation:doc.data().explanation,
	restrictions:doc.data().restrictions,
	category:doc.data().category,
	difficulty:doc.data().difficulty,
	answer:doc.data().answer,
	ans_type:doc.data().ans_type,
	author:doc.data().author


})

if(doc.data().isReviewed){

	this.setState({
		isReviewed:true
	})
}else{
	this.setState({
		isReviewed:false
	})
}
})
.catch(e=>{alert('error parsing data')})

}
 render() {
 	let prob=this.state.probDetails
 	
this.files=this.state.probDetails.des_images
 
 	console.log(this.state.probDetails)
	if(!this.state.isLoggedIn) return <Redirect to="/" />
return (
<div>
{this.state.isChecked?
	<div>
	<a className="dashboard"><Link to="/dashboard">Back to Problemlist</Link></a>

	
<div className="prob-body">
<h1>General Information</h1>
<h3>Title</h3>
<input onChange={this.change} value={this.state.title} name="title" />
<button onClick={this.click} className="btn pink lighten-1 z-depth-0" >Edit</button>

<h3>Series</h3>

<input value={this.state.series} name="series" onChange={this.change}/>
<button onClick={this.click} className="btn pink lighten-1 z-depth-0" >Edit</button>
<h3>Category</h3>

<input onChange={this.change} value={this.state.category} name="category" />
<button onClick={this.click} className="btn pink lighten-1 z-depth-0" >Edit</button>
<h3>Difficulty</h3>

<input onChange={this.change} value={this.state.difficulty} name="difficulty" />
<button onClick={this.click} className="btn pink lighten-1 z-depth-0" >Edit</button>
<h3>Keywords</h3>

<input value={prob.keywords} />
<button onClick={this.click} className="btn pink lighten-1 z-depth-0" >Edit</button>
<h1>Problem Info</h1>
<h3>Description</h3>

<textarea name="description" value={this.state.description} onChange={this.change}></textarea>
<button onClick={this.click} className="btn pink lighten-1 z-depth-0" >Edit</button>
<h3>Description Images</h3>
{
	this.files&&this.files.map(img=>{
return <img src={img}/>
})
}
<input type="file" onChange={this.fileupload}/>




<h3>Problem Statement</h3>

<textarea name="statement" value={this.state.statement} onChange={this.change}/>
<button onClick={this.click} className="btn pink lighten-1 z-depth-0" >Edit</button>





<h3>Answer-type</h3>

<input value={this.state.ans_type} onChange={this.change} name="ans_type"/>
<button onClick={this.click} className="btn pink lighten-1 z-depth-0" >Edit</button>

<h3>Options</h3>
{

prob.options&& prob.options.map((option,i)=>{
return(
	<div>
	
<ul>
<li>{option}</li>
</ul>

</div>

)
})	
}
<button className="btn pink lighten-1 z-depth-0" >Edit</button>
<h3>Answer</h3>

<input value={this.state.answer} onChange={this.change} name="answer" />
<button onClick={this.click} className="btn pink lighten-1 z-depth-0" >Edit</button>
<h3>Author</h3>

<input value={this.state.author} onChange={this.change} name="author" />
<button onClick={this.click} className="btn pink lighten-1 z-depth-0" >Edit</button>
<h3>Restrictions</h3>

<textarea name="restrictions" value={this.state.restrictions} onClick={this.change} />
<button onClick={this.click} className="btn pink lighten-1 z-depth-0" >Edit</button>
<h1>Solution Info</h1>
<h3>Explanation</h3>

<input name="explanation" value={this.state.explanation} onChange={this.change}/>
<button onClick={this.click} className="btn pink lighten-1 z-depth-0" >Edit</button>


<h3>Solution-Image</h3>
{
	prob.ans_images&&prob.ans_images.map(img=>{
return <img src={img}/>
})
}
<button onClick={this.click} className="btn pink lighten-1 z-depth-0" >Edit</button>

</div>

<button onClick={this.review} className="bt-green" >{this.state.isReviewed?'Reviewed':'Review'}</button>

{
this.state.isReviewed?
  <button onClick={this.disapprove} className="bt-red" >{this.state.isReviewed?'Disapprove':'Disapprove'}</button>
:null
}

<br/><br/>
<button className="bt-del" onClick={this.delete}>Delete</button>
</div>


:null}


</div>
	)

}
}

export default Problem;