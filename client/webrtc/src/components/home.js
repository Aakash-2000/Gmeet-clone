import React from 'react'
import {  connect } from "react-redux";
import Navbar from "./Navbar";
import { roomid } from "../actions/action.js";
import { Redirect } from 'react-router-dom';
import Meet from "./meet";
const page = null;
var meetId = null;
class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={
            id:null
        }

    }
    newmeetinglink=()=>{
        fetch("/newmeetinglink").then(res=>res.json()).then(meetid=>{
            this.setState({
                id:meetid["id"]
            });
            this.props.roomid(this.state);
           
          
        });
        
        
        
         
    }
    render(){
        const { user } =this.props; 
        if(!this.state.id){

        
        return(
            <div>
               <Navbar user={ user }/>
                <div class="container" style={{marginTop:"10%"}}>
                
                    <div class="row">
                        <div class="col sm-12">
                            
                            <div className="row" style={{marginTop:"50px",marginBottom:"50px"}}>
                                <div className="col">
                                  
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="Enter the meeting link" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                        <button class="btn btn-primary" type="button" id="button-addon2">Join</button>
                                    </div>
                                </div>
                                        
                                        
                            </div>
                            
                            <div className="row">
                                <div className="col">
                                   
                                        <button type="button" class="btn btn-primary" onClick={this.newmeetinglink}>Create a new meeting link</button>
                                    
                                </div>
                                        
                                        
                            </div>
                                    
                        </div>
                        <div class="col sm-12">
                            
                            <img class="img-fluid" src="https://cdn.vox-cdn.com/thumbor/Xe5pAjP1x1upc9V7j92hJpnMa1k=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19917601/Google_Meet_1.max_2000x2000.jpg">

                            </img>
                                    
                        </div>
                        
                    </div>
                

                </div>
            </div>
        
            
        )   }
        else{
            return(<Redirect  to={{
                pathname: "/"+this.state.id,
                state: { userDetails:user }
              }}></Redirect>);
            
        }
        
    }
    
}
const mapStateToProps=(state)=>{
    return{
        user:state.auth.user
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        roomid: (id)=>{dispatch(roomid(id))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)