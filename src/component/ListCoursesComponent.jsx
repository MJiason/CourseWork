import React from "react";
import CourseDataService from "../service/CourseDataService";
import {Link} from "react-router-dom";
import AuthenticationService from "../service/AuthenticationService";
import {common} from "../consts";

const {Component} = require("react");

class ListCoursesComponent extends Component {


    constructor(props) {
        super(props)
        this.state = {
            courses: [],
            message: null,
            username: AuthenticationService.getLoggedInUserName(),
            user: AuthenticationService.getUser()
        };
        console.log(this.state.user)
    }

    componentDidMount() {
        this.refreshCourses();
    }

    deleteCourseClicked = (id) => {
        CourseDataService.deleteCourse(this.state.username, id).catch(error => {
            if (error.response.data){
                alert(JSON.stringify(error.response.data));
                return;
            }

            alert(error);
        }).then(
            response => {
                this.setState({message: `Delete of course ${id} Successful`})
                this.refreshCourses()
            }
        );

    }

    refreshCourses = () => {

        CourseDataService.retrieveAllCourses(this.state.username)
            .then(
                response => {
                    console.log(response);
                    this.setState({courses: response.data})
                }

        ).catch(error => {
            if (error.response.data){
                alert(JSON.stringify(error.response.data));
                return;
            }

                alert(error);
            });
        }

    hasRole(rolePermission, resource) {
        return this.state.user &&
            this.state.user.roles &&
            this.state.user.roles.length > 0 &&
            this.state.user.roles.some((role) => role.role.resource === resource && role.role[rolePermission]);
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
                            <th>Description</th>
                            {this.hasRole(common.PERMISSION_DELETE, common.COURSES) &&
                            <th>Delete</th>}
                            {this.hasRole(common.PERMISSION_WRITE, common.COURSES) &&
                            <th>Update</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.courses.map(
                                (course, index) =>
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{course.description}</td>
                                        {this.hasRole(common.PERMISSION_DELETE, common.COURSES) &&
                                        <td>

                                            <button
                                                className="btn btn-warning"
                                                onClick={() => this.deleteCourseClicked(course.id)}>
                                                Delete
                                            </button>
                                        </td>}
                                        {this.hasRole(common.PERMISSION_WRITE, common.COURSES) &&
                                        <td>
                                            <Link to={`/courses/${course.id}`}>
                                                <button
                                                    className="btn btn-success"
                                                    //onClick={(event) => {event.preventDefault(); event.stopPropagation();}
                                                >
                                                    Update
                                                </button>
                                            </Link>
                                        </td>}
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                                {this.hasRole(common.PERMISSION_CREATE, common.COURSES) &&
                                <Link to={"/courses/new"}>
                                    <button
                                        className="btn btn-success">
                                        Add
                                    </button>
                                </Link>}
                            </div>
                            <div className="col-2">
                                {this.hasRole(common.PERMISSION_READ, common.USERS) &&
                                <Link to={"/users"}>
                                    <button
                                        className="btn btn-danger">
                                        Users
                                    </button>
                                </Link>}
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        )
    }
}


export default ListCoursesComponent