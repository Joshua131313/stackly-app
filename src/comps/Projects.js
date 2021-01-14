import React, { useContext, useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
import { StoreContext } from './StoreContext'
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom"
import {Inputs, Switchs} from './Inputs'
import firebase from 'firebase'
import {db} from './Fire'
import SendInvite from './SendInvite'

function Projects(props) {

  const {setNotifs} = useContext(StoreContext)

  const [userlist, setUserList] = useState([])
  const [projlist, setProjList] = useState([])
  const [showadd, setShowAdd] = useState(false)
  const [section, setSection] = useState(1)
  const [name, setName] = useState('')
  const [client, setClient] = useState([])
  const [tasks, setTasks] = useState([])
  const [activity, setActivity] = useState([])
  const [daysleft, setDaysLeft] = useState('')
  const [category, setCategory] =  useState('Design')
  const [active, setActive] = useState(true)
  const [color, setColor] = useState('#056dff')
  const [icon, setIcon] = useState('fa-paint-brush-alt')
  const [progress, setProgress] = useState(0) 
  const [taskname, setTaskName] = useState('')
  const [taskdue, setTaskDue] = useState('')
  const [taskcolor, setTaskColor] = useState('#1cb7ff')
  const [taskstatus, setTaskStatus] = useState('In Progress')
  const [taskprior, setTaskPrior] = useState('')
  const [tasknotes, setTaskNotes] = useState('')
  const [taskupdates, setTaskUpdates] = useState([])
  const [activeicon, setActiveIcon] = useState('') 
  const user = firebase.auth().currentUser
  
  const projectsrow = projlist && projlist.map(proj => {
    return <ProjectCard proj={proj} key={proj.id} />
  }) 
  const tasksrow = tasks && tasks.map(el => {
    return <p>{el.taskname}</p>
  })
  const iconspack = [
    {class:'fa-paint-brush-alt',title:'Design'},
    {class: "fa-icons", title:'Entertainment'},
    {class: "fa-laptop-code", title: "Development"},
    {class: "fa-dollar-sign", title:"Finance"},
    {class: "fa-shield-check", title:"Security"},
    {class: "fa-cloud-upload", title: "Cloud System"},
    {class: "fa-project-diagram", title: "General"}
  ]
  const iconsrow = iconspack && iconspack.map(el => {
    return <i className={activeicon===iconspack.indexOf(el)?`activeicon fal ${el.class}`:`fal ${el.class}`} title={el.title} key={el.title} onClick={() => setIcon(el.class, setActiveIcon(iconspack.indexOf(el)))}></i>
  })

  function createProject() {
    if(name.length) { 
      let projobj = {
        projectid: db.collection("users").doc().id,
        name,
        client, 
        tasks,
        activity,
        daysleft,
        category, 
        active,
        progress,
        color,
        icon
      }
      db.collection('users').doc(user.uid).update({
        projects: firebase.firestore.FieldValue.arrayUnion(projobj)
      })
      setShowAdd(!showadd)
      props.shownotif(4000)
      setNotifs([{icon: 'fal fa-check-circle',text: `Project '${name}' has been created`}])
    } 
    else {
      props.shownotif(4000)
      setNotifs([{icon: 'fal fa-exclamation-circle',text: `Project name cannot be empty.`}])
    }
  }
  function addTask() {
    if(taskname.length){
      let currtask = {
        taskid: db.collection("users").doc().id,
        taskname,
        taskdue,
        taskcolor,
        taskstatus,
        taskprior,
        taskupdates,
        tasknotes
      } 
      tasks.push(currtask)
      props.shownotif(4000)
      setNotifs([{icon: 'fal fa-check-circle',text: `Task '${taskname}' has been added`}])
      setTaskName('')
      setTaskPrior('')
      setTaskColor('#056dff')
      setTaskStatus('Not Started')
      setTaskDue('')
      setTaskNotes('')
    }
  }

  useEffect(() => {
    db.collection('users').doc(user.uid).onSnapshot(doc => {
      const userlist = doc.data()
      setUserList(userlist)
      setProjList(userlist.projects)
    })
  },[]) 

  return (
    <div className="projectspage apppage">
      <div className="pagegrid">
        <div className="pagemaingrid">
          <div className="pagetitles">
            <h4>Projects</h4>
            <div className="actions">
              <div><i className="far fa-sliders-h"></i></div>
              <button onClick={() => setShowAdd(!showadd)}><i className="far fa-plus"></i>Create Project</button>
            </div>
          </div> 
          {projectsrow} 
        </div> 
      </div>
      <div className="addcover" style={{display: showadd?"block":"none"}}></div>
      
      <div className="addprojectcont" style={{bottom: showadd?"0":"-190%"}}>
        <div className="addsection" style={{left: section===1?"0":"-200%"}}>
        <Link to="#" className="closeadd"><i className="fal fa-times" onClick={() => setShowAdd(!showadd)}></i></Link>
        <div className="titles"><img src="https://i.imgur.com/wazsi0l.png" alt=""/><h4>Create Project</h4></div>
        <div className="content hidescroll">
          <Inputs title="Project Name" placeholder="Web Development" value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={() => setSection(3)}>Add Tasks<i className="fal fa-plus"></i></button>
          <button onClick={() => setSection(2)}>Add Client<i className="fal fa-plus"></i></button>
          <Inputs title="Days Left" type="number" placeholder="30" value={daysleft} onChange={(e) => setDaysLeft(e.target.value)} />
          <Inputs title="Progress" type="number" placeholder="50" value={progress} onChange={(e) => setProgress(e.target.value)} />
          <label>
            <h6>Category</h6>
            <select onChange={(e) => setCategory(e.target.value)} value={category}>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
                <option value="Financial">Financial</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Media">Media</option>
                <option value="General Services">General Services</option>
                <option value="Other">Other</option>
            </select>
          </label>
          <div className="switchbox">
            <h6>Active</h6> 
            <Switchs onChange={(e) => setActive(e.target.checked)} selected={active} />
          </div>
          <div className="switchbox">
            <h6>Project Color</h6>
            <Inputs type="color" onChange={(e) => setColor(e.target.value)} value={color}/>  
          </div>
          <div className="switchbox iconpick">
            <h6>Project Icon</h6> 
            <div className="iconspack">
              {iconsrow}
            </div>
          </div>
          <div className="spacers"></div>
        </div>
        <button onClick={() => createProject()}>Create</button>
        </div>
        <div className="clientsection" style={{left: section===1?"400px":section===2?"0":"400px"}}>
          <Link to="#" className="closeadd"><i className="fal fa-times" onClick={() => setShowAdd(!showadd, setTimeout(() => {setSection(1)},300))}></i></Link>
          <div className="titles"><img src="https://i.imgur.com/wazsi0l.png" alt=""/><h4>Add Client</h4></div>
          <i className="fal fa-angle-left" onClick={() => setSection(1)}></i>
          <div className="content">
            <SendInvite projname={name} />
          </div>
          <button onClick={() => setSection(1)}>Add</button>
        </div>
        <div className="taskssection" style={{left: section===1?"400px":section===3?"0":"400px"}}>
          <Link to="#" className="closeadd"><i className="fal fa-times" onClick={() => setShowAdd(!showadd, setTimeout(() => {setSection(1)},300))}></i></Link>
          <div className="titles"><img src="https://i.imgur.com/wazsi0l.png" alt=""/><h4>Add Tasks</h4></div>
          <i className="fal fa-angle-left" onClick={() => setSection(1)}></i>
          <div className="content">
            <Inputs title="Task Name" value={taskname} onChange={(e) => setTaskName(e.target.value)} />
            <Inputs title="Task Deadline" value={taskdue} type="date" onChange={(e) => setTaskDue(e.target.value)} />
            <div className="switchbox">
              <h6>Task Color</h6>
              <Inputs type="color" onChange={(e) => setTaskColor(e.target.value)} value={taskcolor}/>  
            </div>
            <label>
              <h6>Task Status</h6>
              <select value={taskstatus} onChange={(e) => setTaskStatus(e.target.value)} >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
            <div className="label">
              <h6>Task Priority</h6>
              <div className="addpriorcont">
              <button onClick={() => setTaskPrior('low')} className={taskprior==='low'?"lowprior priorbtn activelowbtn":"lowprior priorbtn"}><i className="fas fa-star"></i>Low Priority</button>
              <button onClick={() => setTaskPrior('high')} className={taskprior==='high'?"highprior priorbtn activehighbtn":"highprior priorbtn"}><i className="fas fa-star"></i>High Priority</button>
              </div>
            </div>
            <label>
              <h6>Notes</h6>
              <textarea value={tasknotes} onChange={(e) => setTaskNotes(e.target.value)} placeholder="Enter task notes here..." />
            </label>
            <details open>
              <summary><span>Added Tasks</span><i className="far fa-angle-right"></i></summary>
              {tasksrow}
            </details>
          </div>
          <button onClick={() => addTask()}>Add</button>
        </div>
      </div>  
    </div>
  )
}

export default Projects