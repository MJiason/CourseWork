import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CourseDataService from '../service/CourseDataService';

const INSTRUCTOR = 'in28minutes'

class CourseComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            description: ''
        }

    }

    componentDidMount() {

        if (this.state.id === -1) {
            return;
        }

        CourseDataService.retrieveCourse(INSTRUCTOR, this.state.id)
            .then(response => this.setState({
                description: response.data.description
            }))
    }

    onSubmit = (values) => {
        let username = INSTRUCTOR

        let course = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }

        console.log(this.state.id == -1);
        if (this.state.id == -1) {
            CourseDataService.createCourse(username, course)
                .then(() => this.props.history.push('/courses'))
        } else {
            CourseDataService.updateCourse(username, this.state.id, course)
                .then(() => this.props.history.push('/courses'))
        }

        console.log(values);
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
                                        <Field className="form-control" type="text" name="id" disabled/>
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