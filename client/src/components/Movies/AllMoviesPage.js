import { useEffect, useState } from 'react';
import axios from 'axios';

import MainWebPageTitleComp from '../Common/MainWebPageTitle';
import LoggedInUserComp from '../Common/LoggedInUser';
import NavBarComp from '../Common/NavBar';
import MovieCardComp from './MovieCard';

function AllMoviesPageComp(props) {

    const [movies, setMovies] = useState([]);
    const [findMovie, setFindMovie] = useState({ name: '' });

    useEffect(async () => {
        if (sessionStorage["user"] == '' || sessionStorage["user"] == undefined) {
            props.history.push("/");
        }
        else {
            let resp = await axios.get("http://localhost:8000/api/movies");
            setMovies(resp.data);
        }
    }, [])

    const allMovies = () => {
        props.history.push("/movies");
    }

    const addMovie = () => {
        props.history.push("/addMovie");
    }

    const findMovieByName = () => {
        let id = '';

        for (let i = 0; i < movies.length; i++) {
            if (movies[i].name.toLowerCase() == findMovie.name.toLocaleLowerCase()) {
                id = movies[i]._id;
                break;
            }
        }
        if(id == '')
        {
            alert(`Movie ${findMovie.name} was not found!!`);
        }
        else
        {
            props.history.push("/movie/" + id);
        } 
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
                Find Movie : <input type="text" onChange={e => setFindMovie({ ...findMovie, name: e.target.value })} />
                <input type="button" value="Find" onClick={findMovieByName} />
                <br />
                <br />
                {
                    movies.map((item, index) => {
                        return <MovieCardComp
                            key={index}
                            id={item._id}
                            name={item.name}
                            premiered={item.premiered}
                            year_premiered={item.year_premiered}
                            genres={item.genres}
                            image_url={item.image_url} />
                    })
                }

            </div>
        </div>
    );
}

export default AllMoviesPageComp;
