import React, { useContext, useState } from 'react'
import {Inputs} from './Inputs'
import { StoreContext } from './StoreContext'

function SettingsAccount(props) {

  const {setNotifs} = useContext(StoreContext)
  const [uploaded, setUploaded] = useState(false)
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [company, setCompany] = useState('')
  const [jobtitle, setJobtitle] = useState('')

  function uploadImg() {
    setUploaded(!uploaded)
  }
  function saveImg() {
    setUploaded(!uploaded)
    props.shownotif(4000)
    setNotifs([{icon: 'fal fa-save',text: 'Your profile image has been saved.'}])
  }
  function saveAccount() {
    props.shownotif(4000)
    setNotifs([{icon: 'fal fa-save',text: 'Your account settings have been saved.'}])
  }

  return (
    <div className="settingsaccount">
      <h2>Account</h2>
      <div className="settingsgrid">
        <div className="profcont">
          <img src="https://i.imgur.com/yxij2KH.jpg" alt=""/>
          <button className={uploaded?"saveimgbtn":""} onClick={uploaded?() => saveImg():() => uploadImg()}>{uploaded?"Save":"Upload"}</button>
          <button>Remove</button>
        </div>
        <hr/>
        <Inputs title="First Name" placeholder="E.g. John" value={fname} onChange={(e) => setFname(e.target.value)} />
        <Inputs title="Last Name" placeholder="E.g. Hopley" value={lname} onChange={(e) => setLname(e.target.value)} />
        <Inputs title="Email" placeholder="E.g. jhopley@stackly.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Inputs title="Phone Number" placeholder="E.g. 5140399015" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Inputs title="City" placeholder="E.g. Montreal" value={city} onChange={(e) => setCity(e.target.value)} />
        <Inputs title="Country" placeholder="E.g. Canada" value={country} onChange={(e) => setCountry(e.target.value)} />
        <Inputs title="Company Name" placeholder="E.g. Jsense Inc." value={company} onChange={(e) => setCompany(e.target.value)} />
        <Inputs title="Job Title" placeholder="E.g. Web Developer" value={jobtitle} onChange={(e) => setJobtitle(e.target.value)} />
        <button className="settingsbtn" onClick={() => saveAccount()}>Save Changes</button>
        <hr/>
        <div className="removeacccont">
          <div>
            <h6>Delete Account</h6>
            <small>If you delete your account, all your data will be lost.</small>
          </div>
          <button>Delete Account</button>
        </div>
        <div className="spacer"></div>
      </div>
    </div>
  )
}

export default SettingsAccount