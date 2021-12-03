import { useEffect, useState } from 'react';
import axios from 'axios';

import MainWebPageTitleComp from '../Common/MainWebPageTitle';
import NavBarComp from '../Common/NavBar';
import LoggedInUserComp from '../Common/LoggedInUser';

function AddMoviePageComp(props) {

    const [movie, setMovie] = useState({name : '', genres : '', image_url : '', premiered : ''});

    useEffect(() =>
    {
        if(sessionStorage["user"] === '' || sessionStorage["user"] === undefined)
        {
                props.history.push("/");
        } 
    },[])

    const allMovies = () => {
        props.history.push("/movies");
    }

    const addMovie = () => {
        props.history.push("/addMovie");
    }

    const save = async() => {
        let flag = true;
        
        if(movie.name == "" || movie.genres == "" || movie.image_url == "" || movie.premiered == "")
        {
            flag = false;
        }

        if(flag == false)
        {
            alert("Save Failed, one of the new data is wrong!!");
            return;
        }

        await axios.post("http://localhost:8000/api/movies", movie);
        alert(`Movie ${movie.name} was successfully added`);
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

                <input type="button" value="All Movies" onClick={allMovies} />
                <input type="button" value="Add Movie" onClick={addMovie} />
                <br />
                <br />
                Name : <input type="text" onChange={e => setMovie({...movie, name : e.target.value})} /><br />
                Genres : <input type="text" onChange={e => setMovie({...movie, genres : e.target.value})} /><br />
                image url : <input type="text" onChange={e => setMovie({...movie, image_url : e.target.value})} /><br />
                Premired : <input type="date" onChange={e => setMovie({...movie, premiered : e.target.value})} /><br />
                <input type="button" value="save" onClick={save} />
                <input type="button" value="cancel" onClick={cancel} />
                <br />
                <br />
            </div>
        </div>
    );
}

export default AddMoviePageComp;
