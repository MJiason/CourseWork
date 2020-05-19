import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CourseDataService from '../service/CourseDataService';
import AuthenticationService, {TOKEN_NAME} from "../service/AuthenticationService";


const INSTRUCTOR = 'in28minutes'

class CourseComponent extends Component {

    constructor(props) {
        super(props)
        console.log(props)

        this.state = {
            description: '',
            username: AuthenticationService.getLoggedInUserName(),
        }

    }


    onSubmit = (values) => {
        let username = this.state.username;


        let course = {
            description: values.description,
            targetDate: values.targetDate
        }
            CourseDataService.createCourse(username, course)
                .then((resp) =>
                    this.props.history.push('/courses')).catch(error => {
                alert(JSON.stringify(error.response.data));
            })

    }

    validate = (values) => {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
            return errors;
        }

        if (values.description.length < 5) {
            errors.description = 'Enter at least 5 Characters in Description'
        }

        return errors
    }


    render() {

        let {description} = this.state;

        return (
            <div>
                <h3>Course</h3>
                <div className="container">
                    <Formik
                        initialValues={{description}}
                        enableReinitialize
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                                  className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
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