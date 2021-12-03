import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SubscriptionCardComp = (props) => {

    const [subscribers, setSubscribers] = useState([]);

    useEffect(async () => {
        let resp = await axios.get("http://localhost:8000/api/subscribtions");
        setSubscribers(resp.data);
    }, [])

    return (
        <div style={{ borderStyle: "double", width: "40%" }}>
            <h3>Subscriptions watched</h3>

            <ul>
                {
                    subscribers.filter(x => x.name == props.movieName).map((item, index) => {
                        return <li key={index}><Link to={"/member/" + item.memberID}>{item.full_name}</Link>, {item.date}</li>
                    })
                }
            </ul>
        </div>
    );
}

export default SubscriptionCardComp;
