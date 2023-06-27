import CustomLink from "../../customComponents/CustomLink"
import Logo from "../../images/Logo_1.6.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple,faListUl,faEnvelope,faComment,faUser,faHouse } from '@fortawesome/free-solid-svg-icons'
export default function NavBar() {

    const user = JSON.parse(localStorage.getItem('user'))

    return <div className="nav">
        <div className="logo">
            <img src={Logo} alt=""></img>
        </div>
        <div className="cornerthing">
            <img src={user.profile_pic} alt=""></img>
            {user.email.split('@')[0]}
        </div>
        <ul>
            <CustomLink to="/"><div><FontAwesomeIcon icon={faHouse}/></div>Home</CustomLink>
            <CustomLink to="/feed"><div><FontAwesomeIcon icon={faListUl}/></div>Feed</CustomLink>
            <CustomLink to="/messages"><div><FontAwesomeIcon icon={faComment}/></div>Messages</CustomLink>
            <CustomLink to="/email"><div><FontAwesomeIcon icon={faEnvelope}/></div>Email</CustomLink>
            {/*<CustomLink to="/rsvp">RSVP</CustomLink>*/}
            <CustomLink to="/analytics"><div><FontAwesomeIcon icon={faChartSimple}/></div>Analytics</CustomLink>
            <CustomLink to={"/profile/"+user.email}><div><FontAwesomeIcon icon={faUser}/></div>Profile</CustomLink>
        </ul>
    </div>
}
