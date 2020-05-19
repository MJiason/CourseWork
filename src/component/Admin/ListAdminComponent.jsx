import React from "react";

import {Link} from "react-router-dom";
import AuthenticationService from "../../service/AuthenticationService";
import CourseDataService from "../../service/CourseDataService";


const {Component} = require("react");

class ListCoursesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null,
        };
    }

    componentDidMount() {
        this.refreshUsers();
    }

    deleteCourseClicked = (id) => {
        CourseDataService.deleteUser(id)
            .then(
                response => {
                    this.setState({message: `Delete of user ${id} Successful`})
                    this.refreshUsers()
                }
            );

    }

    refreshUsers = () => {

        CourseDataService.retrieveUser()
            .then(
                response => {
                    this.setState({users: response.data})
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
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>username</th>
                            <th>Role</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.users.map(
                                (user, index) =>
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{user.id}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.username}</td>
                                        <td>{user.roles.map((role) => <p>{role.role.name}</p>)}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning"
                                                onClick={() => this.deleteCourseClicked(user.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="row">
                        <Link to={"/users/new"}>
                            <button
                                className="btn btn-success">
                                Add
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListCoursesComponent