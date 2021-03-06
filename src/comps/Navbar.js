import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useHistory } from "react-router-dom"
import {Inputs, Switchs} from './Inputs'
import firebase from 'firebase'
import {db} from './Fire'
import ElapsedTime from './ElapsedTime'
import Notifications from './Notifications'
import Conversations from './Conversations'
import {StoreContext} from './StoreContext'
 
function Navbar(props) {

  const {convinfo} = useContext(StoreContext) 
  const [shownew, setShowNew] = useState(false)
  const [darkmode, setDarkmode] = useState(false)
  const [notifsnum, setNotifsNum] = useState(0)
  const user = firebase.auth().currentUser
 
  return (
    <nav>
      <div className="logocont">
        <img src="https://i.imgur.com/wazsi0l.png" alt=""/>
        <h5>Stackly</h5>
      </div>

      <div className="toolbar">
        <div className="newbox boxmenu">
          <i className="far fa-plus"></i>
          <div className="slidemenu"> 
            <Link to="/projects/"><h6><i className="fal fa-project-diagram"></i>Create Project</h6></Link>
            <Link to="/clients/"><h6><i className="fal fa-users"></i>Create Client</h6></Link>
          </div>
        </div>
        <div className="searchbox boxmenu">
          <i className="far fa-search"></i>
          <div className="slidemenu">
            <div className="searchdiv">
              <i className="far fa-search"></i><Inputs placeholder="Search..."/>
            </div>
          </div>
        </div> 
        <div className="msgbox boxmenu">
          <i className="far fa-comments-alt"></i>
          <div className="notifcircle" style={{display: convinfo.unreadmsgs>0?"block":"none"}}><span>{convinfo.unreadmsgs}</span></div>
          <div className="slidemenu">
            <div className="slidemenuinner hidescroll">
              <Conversations amount={8}/>
            </div>
            <div className="viewallnotifs">
              <Link to="/messages"><h6>View All</h6></Link>
            </div>  
          </div>
        </div>
        <div className="notifbox boxmenu">
        <i className="far fa-bell"></i>
        <div className="notifcircle" style={{display: notifsnum>0?"flex":"none"}}>{notifsnum}</div>
        <div className="slidemenu" onClick={() => db.collection('notifications').doc(user.uid).update({notifsnum: 0})}>
            <div className="slidemenuinner hidescroll">
              <Notifications amount={8}/>
            </div>
            <div className="viewallnotifs">
              <Link to="/notifications"><h6>View All</h6></Link>
            </div>
        </div>
        </div>
        <div className="optionsbox boxmenu">
          <i className="fas fa-th"></i>
          <div className="slidemenu"> 
            <a href="#"><h6><i className="fas fa-moon"></i>Dark Mode</h6><Switchs onChange={(val) => {props.darkmode(val);setDarkmode(!darkmode)}} checked={darkmode}/></a>
            <Link to="/support"><h6><i className="fas fa-question-circle"></i>Support</h6></Link>
            <a href="#" onClick={() => props.handleLogout()}><h6><i className="fas fa-sign-out-alt"></i>Logout</h6></a>
          </div>
        </div>
      </div>

    </nav>
  )
}

export default Navbar