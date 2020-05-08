import React, {Component} from "react";

class CourseComponent extends Component {
    render() {
        console.log(this.props);
        return (
            <h1>Course Details</h1>
        )
    }

}

export default CourseComponent;