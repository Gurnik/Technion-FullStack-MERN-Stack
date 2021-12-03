import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import MainWebPageTitleComp from '../Common/MainWebPageTitle';
import NavBarComp from '../Common/NavBar';
import LoggedInUserComp from '../Common/LoggedInUser';

function EditMemberPageComp(props) {

    const [member, setMember] = useState({full_name : '', email : '', city : ''});
    const [updatedMemberName, setUpdatedMemberName] = useState({full_name : ''});
    const { id } = useParams();

    useEffect(async () =>
    {
        if(sessionStorage["user"] == '' || sessionStorage["user"] == undefined)
        {
                props.history.push("/");
        }
        else
        {
            let resp;
            
            if(props.match.params.id != '')
            {
                resp = await axios.get("http://localhost:8000/api/members/" + props.match.params.id);
            }
            else
            {
                resp = await axios.get("http://localhost:8000/api/members/" + id);
            }
            
            setMember({...member, 
                id : resp.data._id,
                full_name : resp.data.full_name,
                email : resp.data.email,
                city : resp.data.city,  
            });

            setUpdatedMemberName({...updatedMemberName, full_name : resp.data.full_name});
        } 
    }, [])

    const update = async() => {
        let flag = true;
        
        if(member.full_name == "" || member.email == "" || member.email.includes("@") == false || member.city == "")
        {
            flag = false;
        }

        if(flag == false)
        {
            alert("Update Failed, one of the new data is wrong!!");
            return;
        }

        if(props.match.params.id != '')
        {
            await axios.put("http://localhost:8000/api/members/" + props.match.params.id, member);
        }
        else
        {
            await axios.put("http://localhost:8000/api/members/" + id, member);
        }

        alert(`Member ${member.full_name} was successfully updated`);
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
                <h2>Members</h2>
                <h2>Edit Member : {updatedMemberName.full_name}</h2>

                Name : <input type="text" value={member.full_name} onChange={e => setMember({...member, full_name : e.target.value})} /><br />
                Email : <input type="email" value={member.email} onChange={e => setMember({...member, email : e.target.value})} /><br />
                City : <input type="text" value={member.city} onChange={e => setMember({...member, city : e.target.value})} /><br />
                <input type="button" value="update" onClick={update} />
                <input type="button" value="cancel" onClick={cancel} />
                <br />
                <br />
            </div>
        </div>
    );
}

export default EditMemberPageComp;
