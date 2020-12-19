import React from 'react';
import { Avatar } from "@material-ui/core";
import Logo from "./Logo.png"
class  Navbar extends React.Component {
    render(){
        
    return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">
                            <img src={Logo} class="img-fluid">
                            </img>
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                               
                            </ul>
                            
                            
                            
                        </div>
                        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link" aria-current="page" > {(this.props.user) ? this.props.user.name:null}</a>
                                   
                                </li>
                                <li class="nav-item">
                                    <Avatar src={(this.props.user) ? this.props.user.imageurl:null}/>
                                </li>
                            </ul>
                            
                        </div>
                    </div>
                </nav>
            </div>
    )
    }
}
export default Navbar;
