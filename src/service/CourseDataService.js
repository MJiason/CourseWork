import axios from 'axios'
import AuthenticationService from "./AuthenticationService";
import {Link} from "react-router-dom";

let INSTRUCTOR = AuthenticationService.getLoggedInUserName();
const COURSE_API_URL = 'http://localhost:8080'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/instructors`


class CourseDataService {

    retrieveAllCourses(name) {
        console.log('executed service')
        return axios.get(`${INSTRUCTOR_API_URL}/${name}/courses`);

    }


    deleteCourse(name, id) {
        //console.log('executed service')
        return axios.delete(`${INSTRUCTOR_API_URL}/${name}/courses/${id}`);
    }

    retrieveCourse(name, id) {
        return axios.get(`${INSTRUCTOR_API_URL}/${name}/courses/${id}`);
    }
    updateCourse(name, id, course) {
        return axios.put(`${INSTRUCTOR_API_URL}/${name}/courses/${id}`, course);
    }

    createCourse(name, course) {
        return axios.post(`${INSTRUCTOR_API_URL}/${name}/courses/`, course);
    }

    createUser(user, roleName) {
        return axios.post(`${COURSE_API_URL}/users/new`, user);
    }

    retrieveUser() {
        return axios.get(`${COURSE_API_URL}/users/getAllUsers`);
    }

    deleteUser(id) {
        //console.log('executed service')
        return axios.delete(`${COURSE_API_URL}/users/delete/${id}`);
    }

    rolesGet(){
        return axios.get(`${COURSE_API_URL}/roles`)
    }


}




export default new CourseDataService()
