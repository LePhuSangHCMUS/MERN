import React, { Component } from 'react';
import Login from '../component/auth/Login'
import Register from '../component/auth/Register'
import LandingPage from '../component/layout/LandingPage'
import Dashboard from '../component/dashboard/Dashboard'
import EditProfile from '../component/dashboard/edit-profile/EditProfile'
import CreateProfile from '../component/create-profile/CreateProfile'
import PrivateRoute from '../component/private-router/PrivateRoute'
import PageNotFound from '../component/page-not-found/PageNotFound'
import Profile from '../component/profile/Profile'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddExperience from '../component/dashboard/add-experience/AddExperience';
import AddEducation from '../component/dashboard/add-education/AddEducation';
import Profiles from '../component/profiles/Profiles'
import ProfilesHandle from '../component/profilehandle/ProfilesHandle'

class RedirectRouter extends Component {
    render() {
        return (
            <div>
                {/*AWitch chi duy nhat mot route duoc render khi match */}
                <Switch>
                    <Route path="/" exact component={LandingPage} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />

                    <PrivateRoute path="/profile" exact component={Profile} />

                    {/*Lay nguoi dung theo handle bat ky */}
                    <Route path="/profile"  component={ProfilesHandle} />

                    <Route path="/profiles" component={Profiles} />
                    <PrivateRoute path="/dashboard" exact component={Dashboard} />
                    <PrivateRoute path="/add-experience" exact component={AddExperience} />
                    <PrivateRoute path="/add-education" exact component={AddEducation} />
                    <PrivateRoute path="/create-profile" exact component={CreateProfile} />
                    <PrivateRoute path="/edit-profile" exact component={EditProfile} />
                    <Route path="*" component={PageNotFound} />
                </Switch>

            </div>
        );
    }
}

export default RedirectRouter;