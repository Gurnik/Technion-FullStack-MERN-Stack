import { useEffect, useState } from 'react';
import axios from 'axios';

import MainWebPageTitleComp from '../Common/MainWebPageTitle';
import LoggedInUserComp from '../Common/LoggedInUser';
import NavBarComp from '../Common/NavBar';
import MovieCardComp from './MovieCard';

function MoviePageComp(props) {

    const [movie, setMovie] = useState({_id : '', name : '', premiered : '', year_premiered : '', genres : [], image_url : ''});

    useEffect(async () => {
        if (sessionStorage["user"] == '' || sessionStorage["user"] == undefined) {
            props.history.push("/");
        }
        else {
            let resp = await axios.get("http://localhost:8000/api/movies/" + props.match.params.id);
            setMovie(resp.data);
        }
    }, [])

    const allMovies = () => {
        props.history.push("/movies");
    }

    const addMovie = () => {
        props.history.push("/addMovie");
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
                <br />{
                <MovieCardComp
                    id={movie._id}
                    name={movie.name}
                    premiered={movie.premiered}
                    year_premiered={movie.year_premiered}
                    genres={movie.genres}
                image_url={movie.image_url} />}
            </div>
        </div>
    );
}

export default MoviePageComp;
