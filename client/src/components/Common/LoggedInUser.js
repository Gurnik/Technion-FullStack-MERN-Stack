function LoggedInUserComp(props) {
    return (
        <div>
            <h2>Logged In as: {sessionStorage['user']}</h2>
        </div>
    );
}

export default LoggedInUserComp;