import { useEffect, useState } from 'react';
import axios from 'axios';

import MainWebPageTitleComp from '../Common/MainWebPageTitle';
import LoggedInUserComp from '../Common/LoggedInUser';
import NavBarComp from '../Common/NavBar';
import MemberCardComp from './MemberCard';

function AllMembersPageComp(props) {

    const [members, setMembers] = useState([]);

    useEffect(async () => {
        if(sessionStorage["user"] == '' || sessionStorage["user"] == undefined)
        {
            props.history.push("/");
        } 
        else
        {
            let resp = await axios.get("http://localhost:8000/api/members");
            setMembers(resp.data);
        } 
    }, [])

    const allMembers = () => {
        props.history.push("/members");
    }

    const addMember = () => {
        props.history.push("/addMember");
    }

    return (
        <div style={{ textAlign: "left" }}>
            <LoggedInUserComp />
            <MainWebPageTitleComp />
            <NavBarComp />

            <div style={{ borderStyle: "double", width: "40%" }}>
                <h2>Subscriptions</h2>

                <input type="button" value="All Members" onClick={allMembers} />
                <input type="button" value="Add Members" onClick={addMember} />
                <br />
                <br /> {console.log("AllMembersPage " + members)}
                {
                    members.map((item, index) => {
                        return <MemberCardComp
                            key={index}
                            id={item._id}
                            full_name={item.full_name}
                            email={item.email}
                            city={item.city} />
                    })
                }

            </div>
        </div>
    );
}

export default AllMembersPageComp;
