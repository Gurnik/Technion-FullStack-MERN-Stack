import { useEffect, useState } from 'react'
import axios from 'axios';

import MainWebPageTitleComp from '../Common/MainWebPageTitle';

function LoginPageComp(props) {

    useEffect(() =>
    {
        sessionStorage['user'] = '';
    },[])

    const [user, setUser] = useState({username : '', password : '', full_name : ''});

    const log_in = async () => {
        try
        {
            let resp = await axios.post("http://localhost:8000/api/users", user);
            setUser({...user, full_name : resp.data.full_name});
    
            if(JSON.stringify(resp.data.full_name) != '')
            {
                sessionStorage["user"] = JSON.stringify(resp.data.full_name);
                props.history.push("/movies");
            } 
            else
            {
                sessionStorage['user'] = '';
                alert("User Not Found");
            }
        }
        catch(err)
        {
            sessionStorage['user'] = '';
            alert("User Not Found");
        }
    }

    return (
        <div style={{ borderStyle: "double", width: "30%", textAlign: "left" }}>
            <MainWebPageTitleComp />
            <h3 style={{textAlign: "left"}}>Log in Page</h3>
           
            Username : <input type="text" onChange={e => setUser({ ...user, username: e.target.value })} /><br />
            Password : <input type="password" onChange={e => setUser({ ...user, password: e.target.value })} /><br />

            <input type="button" value="Login" onClick={log_in} />
            <br />
            <br />
        </div>
    );
}

export default LoginPageComp;
