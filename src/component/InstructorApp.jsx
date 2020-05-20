import React, {Component} from 'react';
import ListCoursesComponent from "./ListCoursesComponent";
import NotFoundComponent from "./NotFound";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginComponent from "./LoginComponent";
import AuthenticatedRoute from "./AuthicatedRoute";
import LogoutComponent from "./LogoutComponent";
import MenuComponent from "./MenuComponent";
import CourseUpdateComponent from "./CourseUpdateComponent";
import CourseCreateComponent from "./CourseCreateComponent";
import ListAdminComponent from "./Admin/ListAdminComponent";
import UserCreateComponent from "./Admin/UserCreateComponent";

/**
 *
 */
class InstructorApp extends Component {


    render() {
        return (
            <>
                <Router>
                    <>
                        <MenuComponent />
                        <Switch>
                            <AuthenticatedRoute path="/" exact component={ListCoursesComponent}/>
                            <AuthenticatedRoute path="/courses" exact component={ListCoursesComponent}/>
                            <AuthenticatedRoute path="/courses/new" exact component={CourseCreateComponent}/>
                            <AuthenticatedRoute path="/users" exact component={ListAdminComponent}/>
                            <AuthenticatedRoute path="/users/new" exact component={UserCreateComponent}/>
                            <AuthenticatedRoute path="/courses/:id" component={CourseUpdateComponent}/>
                            <AuthenticatedRoute path="/logout" exact component={LogoutComponent}/>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" exact component={LoginComponent}/>
                        </Switch>
                    </>
                </Router>
            </>
        )
    }
}

export default InstructorApp

