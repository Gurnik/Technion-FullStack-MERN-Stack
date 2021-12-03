import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import MainWebPageTitleComp from '../Common/MainWebPageTitle';
import NavBarComp from '../Common/NavBar';
import LoggedInUserComp from '../Common/LoggedInUser';

function EditMoviePageComp(props) {

    const [movie, setMovie] = useState({id : 0, name : '', premiered : '', genres : '', image_url : ''});
    const [updatedMovieName, setUpdatedMovieName] = useState({name : ''});
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
                resp = await axios.get("http://localhost:8000/api/movies/" + props.match.params.id);
            }
            else
            {
                resp = await axios.get("http://localhost:8000/api/movies/" + id);
            }
        
            let genres_string = '';
            let genres_counter = 0;

            resp.data.genres.map(item => {
                genres_string += item;
                
                if(genres_counter < resp.data.genres.length-1)
                {
                    genres_string += ",";
                    genres_counter = genres_counter + 1;
                }
            })

            genres_string.substring(0, genres_string.length-1);

            setMovie({...movie, 
                id : resp.data._id,
                name : resp.data.name, 
                premiered : resp.data.premiered,
                genres : genres_string, 
                image_url : resp.data.image_url});
            
            setUpdatedMovieName({...updatedMovieName, name : resp.data.name});
        }
    },[])

    const update = async() => {
        let flag = true;
        
        if(movie.name == "" || movie.genres == "" || movie.image_url == "" || movie.premiered == "")
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
            await axios.put("http://localhost:8000/api/movies/" + props.match.params.id, movie);
        }
        else
        {
            await axios.put("http://localhost:8000/api/movies/" + id, movie);
        }
        
        alert(`Movie ${movie.name} was successfully updated`);
        props.history.push("/movies");
    }

    const cancel = () => {
        props.history.push("/movies");
    }

    return (
        <div style={{ textAlign: "left" }}>
            <LoggedInUserComp />
            <MainWebPageTitleComp />
            <NavBarComp />

            <div style={{ borderStyle: "double", width: "40%" }}>
                <h2>Movies</h2>
                <h2>Edit Movie : {updatedMovieName.name}</h2>

                Name : <input type="text" value={movie.name} onChange={e => setMovie({...movie, name : e.target.value})} /><br />
                Genres : <input type="text" value={movie.genres} onChange={e => setMovie({...movie, genres : e.target.value})} /><br />
                image url : <input type="text" value={movie.image_url} onChange={e => setMovie({...movie, image_url : e.target.value})} /><br />
                Premired : <input type="date" value={movie.premiered} onChange={e => setMovie({...movie, premiered : e.target.value})} /><br />
                <input type="button" value="update" onClick={update} />
                <input type="button" value="cancel" onClick={cancel} />
                <br />
                <br />
            </div>
        </div>
    );
}

export default EditMoviePageComp;
