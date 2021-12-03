import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../Common/CommonStyles.css';
import SubscribeToNewMovieCardComp from '../Subscriptions/SubscribeToNewMovieCard';

const MoviesWatchedCardComp = (props) => {

    const [subscribers, setSubscribers] = useState([]);
    const [subscribeMovie, setSubscribeMovie] = useState({ isDisplayed: false });
    const [displayStyleName, setDisplayStyleName] = useState({ name: "displayNone" });

    useEffect(async () => {
        let resp = await axios.get("http://localhost:8000/api/subscribtions");
        setSubscribers(resp.data);
    }, [])

    useEffect(() => {
        if (subscribeMovie.isDisplayed) {
            setDisplayStyleName({ ...displayStyleName, name: "displayBlock" });
        }
        else {
            setDisplayStyleName({ ...displayStyleName, name: "displayNone" });
        }
    }, [subscribeMovie])

    const subscribeToNewMovie = () => {
        let visibility = !subscribeMovie.isDisplayed;
        setSubscribeMovie({ ...subscribeMovie, isDisplayed: visibility });
    }

    return (
        <div style={{ borderStyle: "double", width: "75%" }}>
            <h3>Movies Watched</h3>
            <input type="button" value="Subscribe to new movie" onClick={subscribeToNewMovie} />

            <div className={displayStyleName.name}>
                <SubscribeToNewMovieCardComp memberID={props.memberID}></SubscribeToNewMovieCardComp>
            </div>

            <ul>
                {
                    subscribers.filter(x => x.memberID == props.memberID).map((item, index) => {
                        return <li key={index}><Link to={"/movie/" + item.movieID}>{item.name}</Link>, {item.date}</li>
                    })
                }
            </ul>
        </div>
    );
}

export default MoviesWatchedCardComp;
