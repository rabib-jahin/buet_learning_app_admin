import React,{Component,useState} from 'react';
import './App.css';
import {BrowserRouter as Router,Link,Switch,Route} from "react-router-dom"
import firebase from "./firebase"
import Navbar from "./Components/Navbar"
import Login from "./Components/Login"
import Dashboard from "./Components/dashboard"
import Problem from './Components/Problem'
import Reviewed from './Components/Reviewed'
class App extends Component {
constructor(props){
super(props);



}

render(){
return <Router><div>
<Navbar/>


</div>
<Switch>
<Route path='/' exact component={Login}/>
<Route path='/dashboard' component={Dashboard}/>
<Route path='/problem/:id' component={Problem}/>
<Route path='/reviewed' component={Reviewed}/>
</Switch>
</Router>
}
}
  export default App;