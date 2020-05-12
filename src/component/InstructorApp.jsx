import React, {Component} from 'react';
import ListCoursesComponent from "./ListCoursesComponent";
import NotFoundComponent from "./NotFound";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import CourseComponent from "./CourseComponent";
import LoginComponent from "./LoginComponent";
import AuthenticatedRoute from "./AuthicatedRoute";
import LogoutComponent from "./LogoutComponent";
import MenuComponent from "./MenuComponent";

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
                            <AuthenticatedRoute path="/courses/:id" component={CourseComponent}/>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" exact component={LoginComponent}/>
                            <AuthenticatedRoute path="/logout" exact component={LogoutComponent}/>
                            <AuthenticatedRoute path="/courses" exact component={ListCoursesComponent}/>
                        </Switch>
                    </>
                </Router>
            </>
        )
    }
}

export default InstructorApp

