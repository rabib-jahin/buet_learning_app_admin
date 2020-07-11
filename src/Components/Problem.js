import React,{Component,useState} from 'react';
import "./Problem.css"
import {BrowserRouter as Router,Link,Switch,Route,Redirect} from "react-router-dom"
import firebase from "../firebase"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import DeleteIcon from '@material-ui/icons/Delete';

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
	author:"",
	keywords:"",
	img:[],
	sol_img:[]
}
this.change=this.change.bind(this)
this.click=this.click.bind(this)
this.review=this.review.bind(this)
this.disapprove=this.disapprove.bind(this)
this.delete=this.delete.bind(this)
this.fileupload=this.fileupload.bind(this)
this.deleteimg=this.deleteimg.bind(this)
let files=[]
}
fileupload(e,type){

if(type==='des'){
	if(this.state.img){
this.setState({

		img:[...this.state.img,URL.createObjectURL(e.target.files[0])]
	})	
}
else{


	this.setState({

		img:[URL.createObjectURL(e.target.files[0])]
	})
}
}

else if(type==='ans'){
	if(this.state.sol_img){
this.setState({

		sol_img:[...this.state.sol_img,URL.createObjectURL(e.target.files[0])]
	})}
else{
this.setState({

		sol_img:[URL.createObjectURL(e.target.files[0])]
	})

}

}


//console.log(URL.createObjectURL(e.target.files[0]));
	



}
deleteimg(i,type){

let images=[]
if(type==='des'){
	images=this.state.img;
	images.splice(i,1);
	this.setState({

		img:images
	})

}
else{
images=this.state.sol_img;
	images.splice(i,1);
	this.setState({

		sol_img:images
	})


}

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

  title:this.state.title?this.state.title:firebase.firestore.FieldValue.delete(),
  series:this.state.series?this.state.series:firebase.firestore.FieldValue.delete(),
  description:this.state.description?this.state.description:firebase.firestore.FieldValue.delete(),
  statement:this.state.statement?this.state.statement:firebase.firestore.FieldValue.delete(),
  explanation:this.state.explanation?this.state.explanation:firebase.firestore.FieldValue.delete(),
  restrictions:this.state.restrictions?this.state.restrictions:firebase.firestore.FieldValue.delete(),
  category:this.state.category?this.state.category:firebase.firestore.FieldValue.delete(),
  difficulty:this.state.difficulty?this.state.difficulty:firebase.firestore.FieldValue.delete(),
  answer:this.state.answer?this.state.answer:firebase.firestore.FieldValue.delete(),
  ans_type:this.state.ans_type?this.state.ans_type:firebase.firestore.FieldValue.delete(),
  author:this.state.author?this.state.author:firebase.firestore.FieldValue.delete(),
  keywords:this.state.keywords?this.state.keywords:firebase.firestore.FieldValue.delete(),

  des_images:this.state.img?this.state.img:firebase.firestore.FieldValue.delete(),
  ans_images:this.state.sol_img?this.state.sol_img:firebase.firestore.FieldValue.delete()


},


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
console.log("firebase reading");
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
	author:doc.data().author,
	keywords:doc.data().keywords,
	img:doc.data().des_images,
	sol_img:doc.data().ans_images


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
.catch(e=>{alert('error parsing data.Problem might be deleted')


})

}
 render() {
 	let prob=this.state.probDetails
 	
this.files=this.state.probDetails.des_images
 
 	//console.log(this.state.probDetails)
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

<h3>Series</h3>

<input value={this.state.series} name="series" onChange={this.change}/>
<h3>Category</h3>

<input onChange={this.change} value={this.state.category} name="category" />
<h3>Difficulty</h3>

<input onChange={this.change} value={this.state.difficulty} name="difficulty" />
<h3>Keywords</h3>

<input name="keywords" value={this.state.keywords} onChange={this.change}/>
<h1>Problem Info</h1>
<h3>Description</h3>

<textarea name="description" value={this.state.description} onChange={this.change}></textarea>
<h3>Description Images</h3>
<div className="img-body">
{
	this.state.img&&this.state.img.map((img,index)=>{
return (<div key={index}><img src={img}/>
	<button className="bt-del" onClick={(e)=>this.deleteimg(index,'des')}>Delete</button>
</div>
	)
})
}
</div>
<input type="file" onChange={e=>this.fileupload(e,'des')}/>




<h3>Problem Statement</h3>

<textarea name="statement" value={this.state.statement} onChange={this.change}/>





<h3>Answer-type</h3>

<input value={this.state.ans_type} onChange={this.change} name="ans_type"/>

<h3>Options</h3>
<FormControl component="fieldset">
   <FormLabel component="legend"></FormLabel>
{

prob.options&& prob.options.map((option,i)=>{
return(
	<div>
	


        <FormControlLabel value="option" control={<Radio />} label={option} selected/>
        
 


</div>

)
})	
}
   </FormControl>
<h3>Answer</h3>

<input value={this.state.answer} onChange={this.change} name="answer" />
<h3>Author</h3>

<input value={this.state.author} onChange={this.change} name="author" />
<h3>Restrictions</h3>

<textarea name="restrictions" value={this.state.restrictions} onChange={this.change} />
<h1>Solution Info</h1>
<h3>Explanation</h3>

<textarea name="explanation" value={this.state.explanation} onChange={this.change}/>


<h3>Solution-Image</h3>
<div className="img-body">
{
	this.state.sol_img&&this.state.sol_img.map((img,index)=>{
return <div key={index}><img src={img}/>
<button className="bt-del" onClick={e=>this.deleteimg(index,'ans')}>Delete</button>
</div>
})
}
</div>
<input type="file" onChange={e=>this.fileupload(e,'ans')}/>

</div>
<button onClick={this.click} className="bt-green" >Update</button>
<br/>
<button onClick={this.review} className="bt-green" >{this.state.isReviewed?'Reviewed':'Review'}</button>

{
this.state.isReviewed?
  <button onClick={this.disapprove} className="bt-red" >{this.state.isReviewed?'Disapprove':'Disapprove'}</button>
:null
}

<br/><br/>
<button className="bt-del" onClick={this.delete}>Delete</button>

</div>


:(


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


}


</div>
	)

}
}

export default Problem;