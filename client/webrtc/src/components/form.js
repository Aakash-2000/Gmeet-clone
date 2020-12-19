import React from 'react';
import { auth,provider }from "../Config/Config";
import { connect } from "react-redux";
import { user_creation } from "../actions/action";
import { Redirect } from "react-router-dom";
import Logo from "./Logo.png";
import "./Component.css";
class Form extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            email:"",
            imageurl:"",
            uid:''
        }
    }
    Signin=()=>{
        auth.signInWithPopup(provider).then(res=>{
            this.setState({
                name:res.user.displayName,
                email:res.user.email,
                uid:res.user.uid,
                imageurl:res.user.photoURL
                
            });
            this.props.user_creation(this.state)
        })
    }
    render(){
        if(!this.state.uid){
            return (
                <div id="form-body">
                    <div class="container" style={{marginTop:"15%"}}>
                        <div class="container" style={{marginBottom:"5%"}}>
                            <img class="img-fluid" src={Logo}>
                            </img>
                        </div>
                        <button type="button" onClick={this.Signin} class="btn btn-outline-primary">Sign in with Google</button>
                    </div>
                </div>
            )

        }
        else{
            return(
                <Redirect to="/home"></Redirect>
            )
            
        }
        
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        user_creation: (details)=>{dispatch(user_creation(details))}
    }
}
export default connect(null,mapDispatchToProps)(Form)
