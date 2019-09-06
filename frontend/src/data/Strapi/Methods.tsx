import AppStore from "../App/Store";
import axios from 'axios';

const JWT_LS_KEY = 'jwt';
// const JWT_EXPIRY_LS_KEY = 'jwt_expires';

export default class StrapiMethods {
    static setStrapiJWT(jwt:string){
        localStorage.setItem(JWT_LS_KEY, jwt);
        axios.defaults.headers.authorization = `Bearer ${jwt}`;
        AppStore.jwt = jwt;
    }
    static getStrapiJWT(){
        let jwt = localStorage.getItem(JWT_LS_KEY);
        if (jwt) {
            axios.defaults.headers.authorization = `Bearer ${jwt}`;
            AppStore.jwt = jwt;
        }
    }
    static removeStrapiJWT(){
        localStorage.removeItem(JWT_LS_KEY);
        delete axios.defaults.headers.authorization;
        AppStore.jwt = undefined;
    }
}