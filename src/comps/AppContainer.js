import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Homecont from './Homecont'

function AppContainer(props) { 

  const [fold, setFold] = useState(false)
  const [darkmode, setDarkmode] = useState(false)

  return (
    <div className={fold?darkmode?"appcontainer foldappcontainer darkapp":"foldappcontainer appcontainer":darkmode?"appcontainer darkapp":"appcontainer"}>
      <Sidebar foldsidebar={() => setFold(!fold)} handleLogout={props.handleLogout} />
      <Homecont darkmode={(val) => setDarkmode(val)}/>
    </div>
  )
}

export default AppContainer