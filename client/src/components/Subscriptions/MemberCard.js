import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import MoviesWatchedCardComp from '../Movies/MoviesWatchedCard';

const MemberCardComp = (props) => {
    const [member, setMemebr] = useState({ id: '', full_name: '', email: '', city: '' });
    const [subscribtions, setSubscribtions] = useState([]);
    const { id } = useParams();

    useEffect(async () => {
        if (props.id != '') {
            setMemebr({
                id: props.id,
                full_name: props.full_name,
                email: props.email,
                city: props.city
            });

            let respSubscribtions = await axios.get("http://localhost:8000/api/subscribtions");
            let filteredSubscribtions = respSubscribtions.data.filter(x => x.memberID == props.id);
            setSubscribtions(filteredSubscribtions);
        }
        else {
            let resp = await axios.get("http://localhost:8000/api/members/" + id);
            setMemebr({
                id: resp.data._id,
                full_name: resp.data.full_name,
                email: resp.data.email,
                city: resp.data.city
            });

            let respSubscribtions = await axios.get("http://localhost:8000/api/subscribtions");
            let filteredSubscribtions = respSubscribtions.data.filter(x => x.memberID == id);
            setSubscribtions(filteredSubscribtions);
        }
    }, [])

    const editMember = () => {
        window.open("/editMember/" + member.id, "_self");
    }

    const deleteMember = async () => {
        deleteSubscribtions();
        await axios.delete("http://localhost:8000/api/members/" + member.id);
        alert(`Member ${member.full_name} has been deleted with all movie subscriptions successfully`);
        window.open("/members", "_self");
    }

    const deleteSubscribtions = async () => {
       subscribtions.map(async item => {
            await axios.delete("http://localhost:8000/api/subscribtions/" + item._id);
        })
    }

    const getID = () => {
        if (props.id != '') {
            return props.id;
        }
        else {
            return id;
        }
    }

    return (
        <div style={{ borderStyle: "double", width: "90%" }}>
            <h3>{member.full_name}</h3>
            <h4>Email : {member.email}</h4>
            <h4>City : {member.city}</h4>
            <input type="button" value="Edit" onClick={editMember} />
            <input type="button" value="Delete" onClick={deleteMember} />
            <br />
            <br />
            <MoviesWatchedCardComp memberID={getID()} />
            <br />
            <br />
        </div>
    );
}

export default MemberCardComp;
