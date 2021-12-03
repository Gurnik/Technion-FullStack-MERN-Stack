import { useEffect, useState } from 'react';
import axios from 'axios';

import '../Common/CommonStyles.css';

const SubscribeToNewMovieCardComp = (props) => {

    const [movies, setMovies] = useState([]);
    const [subscribtions, setSubscribtions] = useState([]);
    const [unwatchedMovies, setUnwatchedMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState({memberID : '', movieID : '', date : ''});

    useEffect(async () => {
        setSelectedMovie({...selectedMovie, memberID : props.memberID});
        let subscribtionsResp = await axios.get("http://localhost:8000/api/subscribtions");
        let filteredSubscribtionsResp = subscribtionsResp.data.filter(x => x.memberID == props.memberID);
        setSubscribtions(filteredSubscribtionsResp);

        let moviesResp = await axios.get("http://localhost:8000/api/movies");
        setMovies(moviesResp.data);

        const unwatched = moviesResp.data.filter(({ _id: id1 }) => !filteredSubscribtionsResp.some(({ movieID: id2 }) => id2 == id1));
        setUnwatchedMovies(unwatched);
    }, [])

    const subscribe = async() => {
        if(selectedMovie.date == "")
        {
            alert("Subscription failed because date was not selected");
            return;
        }
        if(selectedMovie.movieID == "0" || selectedMovie.movieID == "")
        {
            alert("Subscription failed because movie was not selected");
            return;
        }

        setSelectedMovie({...selectedMovie, memberID : props.memberID});
        let resp = await axios.post("http://localhost:8000/api/subscribtions", selectedMovie);
        alert("Subscription to movie was successfully added");
        window.location.reload();
    }

    const setDate = (date) => {
        let splittedDate = date.split("-");
        let updatedDate = splittedDate[2] + "/" + splittedDate[1] + "/" +splittedDate[0];
        setSelectedMovie({...selectedMovie, date : updatedDate});
    }

    return (
        <div style={{ borderStyle: "double", borderColor: "red", width: "80%" }}>
            <h3>Add a New Movie</h3>

            <select onChange={e => setSelectedMovie({...selectedMovie, movieID : e.target.value})}>
                <option value="0">---Select Movie---</option>
                {
                    unwatchedMovies.map((item, index) => {
                        return <option key={index} value={item._id}>{item.name}</option>
                    })
                }
            </select>
                                                            
            <input type="date" onChange={e => setDate(e.target.value)} />
            <br />
            <input type="button" value="Subscribe" onClick={subscribe} />
            <br />
            <br />
        </div>
    );
}

export default SubscribeToNewMovieCardComp;
