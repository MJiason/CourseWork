import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CourseDataService from '../service/CourseDataService';
import AuthenticationService from "../service/AuthenticationService";

const INSTRUCTOR = 'in28minutes'

/**
 *
 */
class CourseComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: Number(this.props.match.params.id),
            description: '',
            username: AuthenticationService.getLoggedInUserName()
        }

    }

    /**
     *
     */
    componentDidMount() {

        CourseDataService.retrieveCourse(INSTRUCTOR, this.state.id)
            .then(response => this.setState({
                description: response.data.description
            }));
    }

    /**
     *
     * @param values
     */
    onSubmit = (values) => {
        let username = this.state.username;

        let course = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }

            CourseDataService.updateCourse(username, this.state.id, course)
                .then(() => this.props.history.push('/courses')).catch(error => {
                if (error.response.data){
                    alert(JSON.stringify(error.response.data));
                    return;
                }

                alert(error);
            });


    }
    /**
     *
     * @param values
     * @returns {{}}
     */
    validate = (values) => {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description';
            return errors;
        }

        if (values.description.length < 5) {
            errors.description = 'Enter at least 5 Characters in Description';
        }

        return errors;
    }

    /**
     *
     * @returns {*}
     */
    render() {

        let {description, id} = this.state;

        return (
            <div>
                <h3>Course</h3>
                <div className="container">
                    <Formik
                        initialValues={{id, description}}
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
                                        <label>Id</label>
                                        <Field className="form-control" type="number" name="id" disabled/>
                                    </fieldset>
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