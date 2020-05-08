import React, { Component } from 'react';
import ListCoursesComponent from "./ListCoursesComponent";
import NotFoundComponent from "./NotFound";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import CourseComponent from "./CourseComponent";

class InstructorApp extends Component {
    render() {
        return (<>
                <Router>
                    <>
                        <h1>Instructor Application</h1>
                        <Switch>
                            <Route path="/" exact component={ListCoursesComponent} />
                            <Route path="/courses" exact component={ListCoursesComponent} />
                            <Route path="/courses/:id" component={CourseComponent} />
                            <Route component={NotFoundComponent} />
                        </Switch>
                    </>
                </Router>
            </>
        )
    }
}

export default InstructorApp