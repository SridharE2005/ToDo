
import PropsTypes from "prop-types";
const userData=[
  {
    name:"DHIVYAPRAKASH",
    img:"images/1.jpg",
    online:false,
    skills:["HTML","CSS","JS","JAVA","PYTHON","SQL"],
    domain:"Physiotherapy",
    discription:"I am Physiotherapist"
  },
  {
    name:"SRIDHAR",
    img:"images/2.jpg",
    online:true,
    skills:["HTML","CSS","JS","JAVA","PYTHON","SQL","UI/UX","ML","NODEJS"],
    domain:"Full Stack Developer",
    discription:"I am Full Stack Developer"

  },
  {
    name:"VISHWA JOTHI",
    img:"images/3.jpg",
    online:false,
    skills:["MATHS","DL","JS","AI","PYTHON","SQL","UI/UX","ML"],
    domain:"Artificial Intelligence Engineer",
    discription:"I am Artificial Intelligence Engineer"

  }
]
function User(props){
  return (<div className="main">
    <span className={props.online?"pro online":"pro offline"}>{props.online?"ONLINE":"OFFLINE"}</span>
    <img src={props.img} />
    <h3>{props.name}</h3>
    <h4>{props.domain}</h4>
    {/* <p>{props.description}</p> */}
    <div className="bu">
      <button className="primary">Message</button>
      <button className="primary outline">Following</button>
    </div>
    <div className="skills">
      <h2>SKILLS</h2>
      <ul>
        {props.skills.map((skills,index)=>(
          <li key={index}>{skills}</li>
        ))}
      </ul>
    </div>
  </div>
    );

}

export const UserCard = () => {
  return <>
  {userData.map((user,index)=>(
    <User key={index} name={user.name} img={user.img} online={user.online} discription={user.discription} domain={user.domain} skills={user.skills}/>

  ))}
  </>;
}

User.PropsTypes={
  name:PropsTypes.string.isRequired,
  domain:PropsTypes.string.isRequired,
  discription:PropsTypes.string.isRequired,
  img:PropsTypes.string.isRequired,
  skills:PropsTypes.arrayOf(PropsTypes.string).isRequired,
  online:PropsTypes.bool.isRequired,
}