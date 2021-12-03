import { useEffect, useState } from 'react';
import axios from 'axios';

import MainWebPageTitleComp from '../Common/MainWebPageTitle';
import NavBarComp from '../Common/NavBar';
import LoggedInUserComp from '../Common/LoggedInUser';

function AddMemberPageComp(props) {

    const [member, setMember] = useState({full_name : '', email : '', city : ''});

    useEffect(async () =>
    {
        if(sessionStorage["user"] == '' || sessionStorage["user"] == undefined)
        {
                props.history.push("/");
        } 
    }, [])

    const allMembers = () => {
        props.history.push("/members");
    }

    const addMember = () => {
        props.history.push("/addMember");
    }

    const save = async() => {
        let flag = true;
        
        if(member.full_name == "" || member.email == "" || member.email.includes("@") == false || member.city == "")
        {
            flag = false;
        }

        if(flag == false)
        {
            alert("Save Failed, one of the new data is wrong!!");
            return;
        }
        
        let resp = await axios.post("http://localhost:8000/api/members", member);
        alert(`Member ${member.full_name} was successfully added`);
        props.history.push("/members");
    }

    const cancel = () => {
        props.history.push("/members");
    }

    return (
        <div style={{ textAlign: "left" }}>
            <LoggedInUserComp />
            <MainWebPageTitleComp />
            <NavBarComp />

            <div style={{ borderStyle: "double", width: "40%" }}>
                <h2>Add New Member</h2>

                <input type="button" value="All Members" onClick={allMembers} />
                <input type="button" value="Add Member" onClick={addMember} />
                <br />
                <br />
                Name : <input type="text" onChange={e => setMember({...member, full_name : e.target.value})} /><br />
                Email : <input type="email" onChange={e => setMember({...member, email : e.target.value})} /><br />
                City : <input type="text" onChange={e => setMember({...member, city : e.target.value})} /><br />
                <input type="button" value="save" onClick={save} />
                <input type="button" value="cancel" onClick={cancel} />
                <br />
                <br />
            </div>
        </div>
    );
}

export default AddMemberPageComp;
