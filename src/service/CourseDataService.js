import axios from 'axios'
import AuthenticationService from "./AuthenticationService";
import {Link} from "react-router-dom";

let INSTRUCTOR = AuthenticationService.getLoggedInUserName();
const COURSE_API_URL = 'http://localhost:8080'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/instructors`


class CourseDataService {
    /**
     *
     * @param name
     * @returns {Promise<AxiosResponse<any>>}
     */
    retrieveAllCourses(name) {
        console.log('executed service')
        return axios.get(`${INSTRUCTOR_API_URL}/${name}/courses`);

    }

    /**
     *
     * @param name
     * @param id
     * @returns {Promise<AxiosResponse<any>>}
     */
    deleteCourse(name, id) {
        //console.log('executed service')
        return axios.delete(`${INSTRUCTOR_API_URL}/${name}/courses/${id}`);
    }

    /**
     *
     * @param name
     * @param id
     * @returns {Promise<AxiosResponse<any>>}
     */
    retrieveCourse(name, id) {
        return axios.get(`${INSTRUCTOR_API_URL}/${name}/courses/${id}`);
    }

    /**
     *
     * @param name
     * @param id
     * @param course
     * @returns {Promise<AxiosResponse<any>>}
     */
    updateCourse(name, id, course) {
        return axios.put(`${INSTRUCTOR_API_URL}/${name}/courses/${id}`, course);
    }

    /**
     *
     * @param name
     * @param course
     * @returns {Promise<AxiosResponse<any>>}
     */
    createCourse(name, course) {
        return axios.post(`${INSTRUCTOR_API_URL}/${name}/courses/`, course);
    }

    /**
     *
     * @param user
     * @param roleName
     * @returns {Promise<AxiosResponse<any>>}
     */
    createUser(user, roleName) {
        return axios.post(`${COURSE_API_URL}/users/new`, user);
    }

    /**
     *
     * @returns {Promise<AxiosResponse<any>>}
     */
    retrieveUser() {
        return axios.get(`${COURSE_API_URL}/users/getAllUsers`);
    }

    /**
     *
     * @param id
     * @returns {Promise<AxiosResponse<any>>}
     */
    deleteUser(id) {
        //console.log('executed service')
        return axios.delete(`${COURSE_API_URL}/users/delete/${id}`);
    }

    /**
     *
     * @returns {Promise<AxiosResponse<any>>}
     */
    rolesGet(){
        return axios.get(`${COURSE_API_URL}/roles`)
    }


}




export default new CourseDataService()
