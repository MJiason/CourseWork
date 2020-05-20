import React from "react";

import {Link} from "react-router-dom";
import {common} from "../../consts";
import CourseDataService from "../../service/CourseDataService";
import AuthenticationService from "../../service/AuthenticationService";


const {Component} = require("react");

class ListCoursesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null,
            user: AuthenticationService.getUser()
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
            ).catch(error => {
            if (error.response.data){
                alert(JSON.stringify(error.response.data));
                return;
            }

            alert(error);
        })

    }

    refreshUsers = () => {

        CourseDataService.retrieveUser()
            .then(
                response => {
                    this.setState({users: response.data})
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
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.username}</td>
                                        <td>{user.roles.map((role) => <p>{role.role.name}</p>)}</td>
                                        { this.hasRole(common.PERMISSION_DELETE, common.USERS) &&
                                        <td>
                                            <button
                                                className="btn btn-warning"
                                                onClick={() => this.deleteCourseClicked(user.id)}>
                                                Delete
                                            </button>
                                        </td> }
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

                    <div className="row">
                        {this.hasRole(common.PERMISSION_CREATE, common.USERS) &&
                        <Link to={"/users/new"}>
                            <button
                                className="btn btn-success">
                                Add
                            </button>
                        </Link>}
                    </div>
                </div>
            </div>
        )
    }
}

export default ListCoursesComponent