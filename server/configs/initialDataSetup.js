const axios = require('axios');
const moviesBL = require('../models/movies/moviesBL');
const usersBL = require('../models/users/usersBL');

exports.fetchInitialData = async function ()
{
    const movies = await moviesBL.getAllMovies();

    if(!movies || movies.length === 0) 
    {
        console.log('Fetching movies with initial data');
        fetchInitialMovies();
        console.log('Finished fetching movies with initial data');
    }
    else
    {
        console.log('Data is already fetched with movies initial data');
    }

    const users = await usersBL.getAllUsers();

    if(!users || users.length === 0) 
    {
        console.log('Fetching users with initial data');
        fetchInitialUsers();
        console.log('Finished fetching users with initial data');
    }
    else
    {
        console.log('Data is already fetched with users initial data');
    }

    async function fetchInitialMovies() 
    {
        const res = await axios.get('https://api.tvmaze.com/shows');
        const data = res.data;

        for(let i = 0; i < 20; i++)
        {
            const movie = {
                name : data[i].name,
                premiered : data[i].premiered,
                year_premiered : data[i].premiered.slice(0, 4),
                genres : data[i].genres,
                image_url : data[i].image.medium
            };

            const movieRes = await moviesBL.addMovie(movie);
            console.log('created: ', movie.name);
        }
    }

    async function fetchInitialUsers()
    {
        const user_1 = {
            full_name : "Daniel Kandalaft",
            username : "adminD",
            password : "adminD"
        };

        let userRes = await usersBL.addUser(user_1);
        console.log('created: ', user_1.username);

        const user_2 = {
            full_name : "Amir Haddad",
            username : "adminH",
            password : "adminH"
        };

        userRes = await usersBL.addUser(user_2);
        console.log('created: ', user_2.username);
    }
}