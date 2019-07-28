import React, { Component } from 'react';
import Login from '../component/auth/Login'
import Register from '../component/auth/Register'
import LandingPage from '../component/layout/LandingPage'
import Dashboard from '../component/layout/Dashboard'
import EditProfile from '../component/layout/EditProfile'
import { BrowserRouter as Router, Route} from "react-router-dom";

class RedirectRouter extends Component {
    render() {
        return (
            <div>
                <Route path="/" exact component={LandingPage} />
                <Route path="/login"exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/edit-profile" exact component={EditProfile} />
            </div>
        );
    }
}

export default RedirectRouter;