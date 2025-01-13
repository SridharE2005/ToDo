import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import './QRcode.css'
import ToDo from './ToDo'
// import { QRcode } from './QRcode'
// import { UserCard } from './UserCard'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App name="SRIDHAR" domain="Frontend Developer" description="I am a full stack developer" image="images/1.jpg" pro={true} skills={["HTML","CSS","JS","JAVA","PYTHON","SQL","UI/UX","ML","NODEJS"]}/> */}
    {/* <UserCard/> */}
    {/* <QRcode /> */}
    <ToDo/>
    
    

  </StrictMode>,
)
