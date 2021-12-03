function NavBarComp(props) {

    const all_movies = () => {
        window.open("/movies", "_self");
    }

    const subscriptions = () => {
        window.open("/members", "_self");
    }

    const users_management = () => {
        
    }

    const log_out = () => {
        sessionStorage['user'] = '';
        window.open("/", "_self");
    }

    return (
        <div>
            <input type="button" value="All Movies" onClick={all_movies} />
            <input type="button" value="Subscriptions" onClick={subscriptions} />
            <input type="button" value="Users Management" onClick={users_management} />
            <input type="button" value="Log Out" onClick={log_out} />
            <br />
            <br />
        </div>
    );
}

export default NavBarComp;