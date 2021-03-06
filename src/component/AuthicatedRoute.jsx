import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from "../service/AuthenticationService";


/**
 *
 */
class AuthenticatedRoute extends Component {
    /**
     *
     * @returns {*}
     */
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            AuthenticationService.restoreAuth();
                        return <Route {...this.props}  />
        } else {
            return <Redirect to="/login" />
        }

    }
}

export default AuthenticatedRoute