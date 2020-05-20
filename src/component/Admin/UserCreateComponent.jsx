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
            password:'',
            roleId: 0,
            roles: []
        }

    }


    componentDidMount() {
        CourseDataService.rolesGet().then(response => {
            this.setState({roles: response.data})
            }).catch(error => {
            if (error.response.data){
                alert(JSON.stringify(error.response.data));
                return;
            }

            alert(error);
        });
    }


    onSubmit = (values) => {

        let user = {
            username: values.username,
            firstName: values.firstName,
            lastName: values.lastName,
            password:values.password,
            roleId: Number(values.roleId),

        }
        CourseDataService.createUser(user, user.roleId).catch(error => {
            if (error.response.data){
                alert(JSON.stringify(error.response.data));
                return;
            }

            alert(error);
        }).then(() => this.props.history.push('/users'))
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
        let password = this.state.password;
        let roleId = this.state.roleId;
        let roles = this.state.roles;


        return (
            <div>
                <h3>Course</h3>
                <div className="container">
                    <Formik
                        initialValues={{username, firstName, lastName,password, roleId, roles}}
                        enableReinitialize
                        onSubmit={this.onSubmit}
                        // validate={this.validate}
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
                                        <label>password</label>
                                        <Field className="form-control" type="text" name="password"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Role</label>
                                        <Field className="form-control" as="select" name="roleId">
                                            <option>Choose role...</option>
                                            {props.values.roles && props.values.roles.map((role,index) =>
                                                <option key={index} value={role.id}>{role.name}</option>)}
                                        </Field>
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