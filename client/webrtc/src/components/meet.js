import React from 'react';
import io from 'socket.io-client';
import { connect } from "react-redux";
import Peer from "peerjs";
import "./Component.css";
import Logo from "./Logo.png";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { auth, provider } from "../Config/Config"
var myvideo = null;
var mystream = null;
var peers = {};
var call;
var socket;
var peer;
class Meet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            imageurl: "",
            uid: '',
            changed:false
        }
    }
    Signin = () => {
        auth.signInWithPopup(provider).then(res => {
            this.setState({
                name: res.user.displayName,
                email: res.user.email,
                uid: res.user.uid,
                imageurl: res.user.photoURL,
                changed:true
            });

        })
    }

    addvideo = (video, stream) => {
        const videogrid = document.getElementById("videogrid");
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
            video.play()
        });
        videogrid.append(video);

    }
    connecttonewuser = (userId, stream) => {
        call = peer.call(userId, stream);
        var newuservideotag = document.createElement('video');

        call.on("stream", newuservideo => {
            this.addvideo(newuservideotag, newuservideo);
        })
        call.on("close", () => {
            newuservideotag.remove();
        })
        peers[userId] = call;

    }
    mute = () => {
        var a = mystream.getAudioTracks()[0].enabled;
        if (a) {
            mystream.getAudioTracks()[0].enabled = false;
            document.getElementById("icon2").className = "fa fa-microphone-slash"
        } else {
            mystream.getAudioTracks()[0].enabled = true;
            document.getElementById("icon2").className = "fa fa-microphone-alt"
        }


    }
    message = () => {
        var message = document.getElementById("message_inp").value;
        socket.emit("message", message,this.state.name);
        document.getElementById("message_inp").value = '';
        
       
    }
    video = () => {
        var a = mystream.getVideoTracks()[0].enabled;
        if (a) {
            mystream.getVideoTracks()[0].enabled = false;
            document.getElementById("icon3").className = "fas fa-video-slash"
        } else {
            mystream.getVideoTracks()[0].enabled = true;
            document.getElementById("icon3").className = "fa fa-video"
        }


    }
    call = () => {
        const roomid = window.location.href.slice(22, window.location.href.length);
        const connecting_port = "localhost:5000/";
        peer = new Peer();
        myvideo = document.createElement('video');
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            mystream = stream;
            this.addvideo(myvideo, stream);
            peer.on("call", call => {
                call.answer(stream);
                const video = document.createElement('video')
                call.on('stream', myStream => {
                    this.addvideo(video, myStream);
                })
            })
            socket.on("createMessage", (msg ,name)=> {
                var ul = document.getElementById("msg_container");
                var li = document.createElement("li");
                li.id = "message";
                li.appendChild(document.createTextNode( name+ " : " + msg));
                ul.appendChild(li);
            })
            socket.on("user-connected", userId => {
                this.connecttonewuser(userId, stream);
            })
        })
        socket = io(connecting_port);
        peer.on('open', userId => {
            socket.emit("join-room", roomid, userId);
        })


        socket.on('message', (message) => {
            io.to(roomId).emit("createMessage", message);
        })
        socket.on('user-disconnected',userId=>{
            if(peers[userId]){
              peers[userId].close()
            }
            
          })
        this.setState({
            changed:false
        })
    }




componentDidMount = () => {
    const { user } = this.props;
    if (user) {
        this.setState({
            name: user.name,
            email: user.email,
            uid: user.uid,
            imageurl: user.imageurl

        });
        const roomid = window.location.href.slice(22, window.location.href.length);
        const connecting_port = "localhost:5000/";
        peer = new Peer();
        myvideo = document.createElement('video');
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            mystream = stream;
            this.addvideo(myvideo, stream);
            peer.on("call", call => {
                call.answer(stream);
                const video = document.createElement('video')
                call.on('stream', myStream => {
                    this.addvideo(video, myStream);
                })
            })
            socket.on("createMessage",(msg,name) => {
                var ul = document.getElementById("msg_container");
                var li = document.createElement("li");
                li.id = "message";
                li.appendChild(document.createTextNode(name + " : " + msg));
                ul.appendChild(li);
            })
            socket.on("user-connected", userId => {
                this.connecttonewuser(userId, stream);
            })
        })
        socket = io(connecting_port);
        peer.on('open', userId => {
            socket.emit("join-room", roomid, userId);
        })


        socket.on('message', (message) => {
            io.to(roomId).emit("createMessage", message);
        })
        socket.on('user-disconnected',userId=>{
            if(peers[userId]){
              peers[userId].close()
            }
            
          })
    }

}


render() {
    console.log(this.props);
    if (this.state.name) {
        if(this.state.changed){
            this.call();
        }

        return (

            <div>
                <div class="row">
                    <div class="col">
                        <div class="row" id="videocontainer">
                            <div id="videogrid">
                            </div>
                        </div>
                        <div class="row" id="audiocontainer">
                            <div id="audio_button_container">
                                <button type="button" id="ico_but" class="btn btn-danger">
                                    <i class="fa fa-phone-alt" id="icon1" aria-hidden="true">
                                    </i>
                                </button>
                                <button type="button" id="ico_but" onClick={this.mute} class="btn btn-outline-danger">
                                    <i class="fas fa-microphone-alt" id="icon2" aria-hidden="true">

                                    </i>
                                </button>
                                <button type="button" id="ico_but" onClick={this.video} class="btn btn-outline-danger">
                                    <i class="fas fa-video" id="icon3" ></i>

                                </button>


                            </div>
                        </div>
                    </div>
                    <div class="col" id="chatcontainer">
                        <div id="chat_header">
                            <h6>Chat</h6>

                        </div>
                        <Tabs>
                            <TabList>
                                <Tab>Conversations <i class="fas fa-comments" id="ico_con"></i> </Tab>
                                <Tab>Participants <i class="fas fa-users" id="ico_par"></i></Tab>
                            </TabList>

                            <TabPanel>
                                <div id="msg_container_div">
                                <ul id="msg_container"></ul>
                                </div>
                                
                                <div class="input-group mb-3" id="chat_foot">
                                    <input type="text" class="form-control" placeholder="Message.." aria-label="Recipient's username" id="message_inp" aria-describedby="basic-addon2" />
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" onClick={this.message} type="button"><i class="fas fa-paper-plane"></i></button>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <h2>Any content 2</h2>
                            </TabPanel>
                        </Tabs>



                    </div>

                </div>
            </div>
        )


    }
    else {
        return (
            <div>
                <div class="container" style={{ marginTop: "15%" }}>
                    <div class="container" style={{ marginBottom: "5%" }}>
                        <img class="img-fluid" src={Logo}>
                        </img>
                    </div>
                    <button type="button" onClick={this.Signin} class="btn btn-outline-primary">Sign in with Google</button>
                </div>
            </div>
        )
    }
}
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}
export default connect(mapStateToProps)(Meet);

