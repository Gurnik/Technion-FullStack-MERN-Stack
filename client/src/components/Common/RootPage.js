import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginPageComp from '../../components/Login/LoginPage';
import AllMoviesPageComp from '../../components/Movies/AllMoviesPage';
import MoviePageComp from '../Movies/MoviePage';
import AddMoviePageComp from '../../components/Movies/AddMoviePage';
import EditMoviePageComp from '../../components/Movies/EditMoviePage';
import AllMembersPageComp from '../Subscriptions/AllMembersPage';
import MemberPageComp from '../Subscriptions/MemberPage';
import AddMemberPageComp from '../Subscriptions/AddMemberPage';
import EditMemberPageComp from '../Subscriptions/EditMemberPage';

function RootPageComp() {

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={LoginPageComp} />
                    <Route path="/movies" exact component={AllMoviesPageComp} />
                    <Route path="/movie/:id" exact component={MoviePageComp} />
                    <Route path="/addMovie" exact component={AddMoviePageComp} />
                    <Route path="/editMovie/:id" exact component={EditMoviePageComp} />
                    <Route path="/members" exact component={AllMembersPageComp} />
                    <Route path="/member/:id" exact component={MemberPageComp} />
                    <Route path="/addMember" exact component={AddMemberPageComp} />
                    <Route path="/editMember/:id" exact component={EditMemberPageComp} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default RootPageComp;
