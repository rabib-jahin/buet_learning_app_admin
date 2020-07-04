import React,{Component} from "react"
import "./Login.css"
import {Redirect} from "react-router-dom"
import firebase from "../firebase"
class Login extends Component{
constructor(props){
	super(props)
this.state={
	email:"",
	password:"",
	show:false,
	isLoggedIn:false,
	error:"",
	checked:false

}

this.change=this.change.bind(this);
this.submit=this.submit.bind(this);
this.click=this.click.bind(this)
}
change(e){

this.setState({

	[e.target.name]:e.target.value
})

}
componentDidMount(){
console.log(firebase.auth().currentUser)
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



}


click(e){

if(e.target.id==='hide'){
this.setState({
	show:true
})
}
else if(e.target.id==='shown'){
this.setState({
	show:false
})

}

}

submit(e){
e.preventDefault();

firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
.then(res=>{

console.log("success")
this.setState({
	isLoggedIn:true
})


})
.catch(e=>{
console.log("error "+e.message)
this.setState({

	error:e.message,
	isLoggedIn:false
})

})


}
render(){
let e=""
if(this.state.isLoggedIn) return (<Redirect to="/dashboard"/>)

if(this.state.error!=='') e= <p id="error">Log in error!!{this.state.error}</p>
if(!this.state.checked) return null
	return <div>
<h1 id="admin">Admin Login</h1>


<div className="container">
	<form onSubmit={this.submit} className="white">
<div className="input-field">
<label htmlFor="email">Email</label>
<input onChange={this.change} type="email" name="email" value={this.state.email}  />
</div>
<div className="input-field">
<label htmlFor="password">Password</label>
<input onChange={this.change} type={!this.state.show?"password":"text"} name="password" value={this.state.password} />
</div>
<a className="showText" onClick={this.click} id={this.state.show?'shown':'hide'} >{this.state.show?'Hide Password':'Show Password'}</a>
<div className="input-field">

<button className="btn pink lighten-1 z-depth-0" type="submit" >LogIn</button>
</div>
</form>
{e}
</div>
	</div>
}
}

export default Login