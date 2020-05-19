import axios from 'axios'
import jwt from 'jwt-decode';

const API_URL = 'http://localhost:8080'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
export const TOKEN_NAME = 'token';

class AuthenticationService {

    axiosId = null;

    executeBasicAuthenticationService(username, password) {
        return axios.get(`${API_URL}/basicauth`,
            { headers: { authorization: this.createBasicAuthToken(username, password) } })
    }


    getUser() {
        const  jwtToken = this.getJwtToken();
        if (!jwtToken){
            return null;
        }
       const payload = jwt(jwtToken);
        if(!payload){
            return null;
        }
        return payload.user ? payload.user: null;
    }

    getJwtToken(){
      const jwtToken = localStorage.getItem(TOKEN_NAME);
        if (!jwtToken) {
            return null;
        }
        return jwtToken;
    }

    executeJwtAuthenticationService = (username, password) => {
        console.log(username);
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        });
    }


    createBasicAuthToken = (username, password) => {
        return 'Basic ' + window.btoa(username + ":" + password);
    }

    registerSuccessfulLogin(username, password) {
        //let basicAuthHeader = 'Basic ' +  window.btoa(username + ":" + password)
        //console.log('registerSuccessfulLogin')
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    registerSuccessfulLoginForJwt = (username, token) => {
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        localStorage.setItem(TOKEN_NAME, token);
        this.setupAxiosInterceptors(this.createJWTToken(token));
    }

    createJWTToken = (token) => {
        return 'Bearer ' + token;
    }


    logout = () => {
        localStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        localStorage.removeItem(TOKEN_NAME);
        this.ejectAxiosInterceptors();
    }

    restoreAuth = () => {
        const token = localStorage.getItem(TOKEN_NAME);
        this.setupAxiosInterceptors(this.createJWTToken(token));
    }

    isUserLoggedIn = () => {
        let user = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) return false;
        return true;
    }

    getLoggedInUserName() {
        let user = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) return '';
        return user;
    }

    setupAxiosInterceptors = (token) => {
       this.axiosId = axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token;
                }
                return config;
            }
        );
    }

    ejectAxiosInterceptors = () => {
        if (this.axiosId === null){
            return;
        }
        axios.interceptors.request.eject(this.axiosId);
    }
}

export default new AuthenticationService();