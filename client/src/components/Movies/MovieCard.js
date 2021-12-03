import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import SubscriptionCardComp from '../Subscriptions/SubscriptionCard';

const MovieCardComp = (props) =>
{
    const [movie, setMovie] = useState({id : '', name : '', premiered : '', year_premiered : '', genres : [], image_url : ''});
    const [subscribtions, setSubscribtions] = useState([]);
    const { id } = useParams();

    useEffect(async () =>
    {
        if(props.id != '')
        {
            setMovie({...movie, 
                id : props.id,
                name : props.name,
                premiered : props.premiered, 
                year_premiered : props.year_premiered, 
                genres : props.genres, 
                image_url : props.image_url
            });

            let respSubscribtions = await axios.get("http://localhost:8000/api/subscribtions");
            let filteredSubscribtions = respSubscribtions.data.filter(x => x.movieID == props.id);
            setSubscribtions(filteredSubscribtions);
        }
        else
        {
            let resp = await axios.get("http://localhost:8000/api/movies/" + id);
            setMovie({...movie, 
                id : resp.data._id,
                name : resp.data.name,
                premiered : resp.data.premiered, 
                year_premiered : resp.data.year_premiered, 
                genres : resp.data.genres, 
                image_url : resp.data.image_url
            });
            
            let respSubscribtions = await axios.get("http://localhost:8000/api/subscribtions");
            let filteredSubscribtions = respSubscribtions.data.filter(x => x.movieID == id);
            setSubscribtions(filteredSubscribtions);
        }
    }, [])

    const getGenresText = () =>
    {
        let text = 'genres: ';
        for(let i = 0; i < movie.genres.length; i++)
        {
            text += `"${movie.genres[i]}"`;

            if(i !== movie.genres.length - 1)
            {
                text += `,`;
            }
        }
   
        return text;
    }

    const editMovie = () => {
        window.open("/editMovie/" + movie.id, "_self");
    }

    const deleteMovie = async() => {
        deleteSubscribtions();
        await axios.delete("http://localhost:8000/api/movies/" + movie.id);
        alert(`Movie ${movie.name} has been deleted with all it's subscribers successfully`);
        window.open("/movies", "_self");
    }

    const deleteSubscribtions = async () => {
        subscribtions.map(async item => {
             await axios.delete("http://localhost:8000/api/subscribtions/" + item._id);
         })
     }

    return (
        <div style={{ borderStyle: "double", width: "90%" }}>
            <h3>{movie.name}, {movie.year_premiered}</h3> 
            <h4>{getGenresText()}</h4>
            <img src={movie.image_url} alt={movie.name} />
            <br />
            <input type="button" value="Edit" onClick={editMovie} /> 
            <input type="button" value="Delete" onClick={deleteMovie} />
            <br />
            <br />
            <SubscriptionCardComp movieName={movie.name} />
            <br />
            <br />
        </div>
    );
}

export default MovieCardComp;
