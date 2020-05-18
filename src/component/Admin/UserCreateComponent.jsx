import React, {Component} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import AuthenticationService from "../../service/AuthenticationService";
import CourseDataService from "../../service/CourseDataService";


class CourseComponent extends Component {

    constructor(props) {
        super(props)
        console.log(props)

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            roleName: '',
        }

    }


    componentDidMount() {
        CourseDataService.rolesGet().then();
    }


    onSubmit = (values) => {
        let username = this.state.username;
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let role = this.state.roleName;


        let user = {
            username: values.username,
            firstName: values.firstName,
            lastName: values.lastName,
            roleName: values.roleName,

        }
        CourseDataService.createUser(user, user.roleName)
            .then(() => this.props.history.push('/users'))
    }

    validate = (values) => {
        let errors = {}
        if (!values.username) {
            errors.description = 'Enter a Description'
            return errors;
        }

        if (values.username.length < 5) {
            errors.error = 'Enter at least 5 Characters in username'
        }

        if (values.firstName.length < 5) {
            errors.error = 'Enter at least 5 Characters in firstName'
        }

        if (values.lastName.length < 5) {
            errors.error = 'Enter at least 5 Characters in lastName'

            return errors
        }
    }

    render() {

        let username = this.state.username;
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let roleName = this.state.roleName;


        return (
            <div>
                <h3>Course</h3>
                <div className="container">
                    <Formik
                        initialValues={{username, firstName, lastName, roleName}}
                        enableReinitialize
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="errors" component="div"
                                                  className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>FirstName</label>
                                        <Field className="form-control" type="text" name="firstName"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>LastName</label>
                                        <Field className="form-control" type="text" name="lastName"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>username</label>
                                        <Field className="form-control" type="text" name="username"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Role</label>
                                        <Field className="form-control" type="text" name="roleName"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default CourseComponent