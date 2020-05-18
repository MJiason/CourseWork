import React from "react";
import CourseDataService from "../service/CourseDataService";
import {Link} from "react-router-dom";
import AuthenticationService from "../service/AuthenticationService";

const {Component} = require("react");

class ListCoursesComponent extends Component {
    INSTRUCTOR = "misha";

    constructor(props) {
        super(props)
        this.state = {
            courses: [],
            message: null,
            username: AuthenticationService.getLoggedInUserName()
        };
    }

    componentDidMount() {
        this.refreshCourses();
    }

    deleteCourseClicked = (id) => {
        CourseDataService.deleteCourse(this.state.username, id)
            .then(
                response => {
                    this.setState({message: `Delete of course ${id} Successful`})
                    this.refreshCourses()
                }
            );

    }

    refreshCourses = () => {

        CourseDataService.retrieveAllCourses(this.state.username)//HARDCODED
            .then(
                response => {
                    console.log(response);
                    this.setState({courses: response.data})
                }
            );


    }


    render() {
        return (
            <div className="container">
                <h3>All Courses</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Id</th>
                            <th>Description</th>
                            <th>Update</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.courses.map(
                                (course, index) =>
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{course.id}</td>
                                        <td>{course.description}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning"
                                                onClick={() => this.deleteCourseClicked(course.id)}>
                                                Delete
                                            </button>
                                        </td>
                                        <td>
                                            <Link to={`/courses/${course.id}`}>
                                                <button
                                                    className="btn btn-success"
                                                    //onClick={(event) => {event.preventDefault(); event.stopPropagation();}
                                                >
                                                    Update
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="row">
                        <Link to={"/courses/new"}>
                            <button
                                className="btn btn-success">
                                Add
                            </button>
                        </Link>

                    </div>
                    <div>
                        <Link to={"/users"}>
                        <button
                            className="btn btn-success">
                            Users
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListCoursesComponent