import axios, {AxiosResponse, AxiosRequestConfig} from 'axios'
import {
    LoginDataType,
    SignupDataType,
    StrapiAuthResponseObject, StrapiMeResponseObject, StrapiSessionArgs,
    StrapiSessionObject,
    StrapiSpaceArgs,
    StrapiSpaceObject, StrapiSuggestionArgs, StrapiSuggestionObject,
} from "./Types";
import AppStore from "../App/Store";

export default class StrapiAPI {

    static async login(data:LoginDataType){
        let url = StrapiAPIRoutes.getLoginRoute();
        try{
            return await axios.post(url, data);
        } catch (e) {
            return null;
        }
    }
    static async getMe(){
        let url = StrapiAPIRoutes.getMeRoute();
        try{
            return await axios.get(url) as AxiosResponse<StrapiMeResponseObject>;
        } catch (e) {
            return null;
        }
    }
    static async signup(data:SignupDataType){
        let url = StrapiAPIRoutes.getRegisterRoute();
        try{
            return await axios.post(url, data) as AxiosResponse<StrapiAuthResponseObject>;
        } catch (e) {
            return null;
        }
    }
    static async getSpaces(){
        let url = StrapiAPIRoutes.getSpacesRoute();
        try{
            return await axios.get(url) as AxiosResponse<StrapiSpaceObject[]>;
        } catch (e) {
            return null;
        }
    }
    static async createSpace(data:StrapiSpaceArgs){
        let url = StrapiAPIRoutes.getSpacesRoute();
        try{
            return await axios.post(url, data) as AxiosResponse<StrapiSpaceObject>;
        } catch (e) {
            return null;
        }
    }
    static async getVotes(sessionId:number){
        let url = StrapiAPIRoutes.getVotesRoute();
        try{
            return await axios.get(url) as AxiosResponse<StrapiSessionObject[]>;
        } catch (e) {
            return null;
        }
    }

    static async handleRequest<T, R>(config:AxiosRequestConfig):Promise<R|Error> {
        try {
            let res = await axios(config);
            return res.data;
        } catch (e) {
            return e;
        }
    }
}

export class StrapiAPIRoutes {

    static BASE = '';
    static ME = 'me';
    static AUTH = 'auth';
    static LOGIN = 'local';
    static REGISTER = 'register';
    static SPACES = 'spaces';
    static SESSIONS = 'sessions';
    static VOTES = 'votes';
    static SUGGESTIONS = 'suggestions';

    static getLoginRoute(){
        const {BASE, LOGIN, AUTH} = this;
        return `${BASE}/${AUTH}/${LOGIN}`
    }
    static getMeRoute(){
        const {BASE, ME} = this;
        return `${BASE}/${ME}`
    }
    static getRegisterRoute(){
        const {BASE, LOGIN, REGISTER, AUTH} = this;
        return `${BASE}/${AUTH}/${LOGIN}/${REGISTER}`
    }
    static getSpacesRoute(){
        const {BASE, SPACES} = this;
        return `${BASE}/${SPACES}`
    }
    static get sessions(){
        const {BASE, SESSIONS} = this;
        return `${BASE}/${SESSIONS}`
    }
    static getVotesRoute(){
        const {BASE, VOTES} = this;
        return `${BASE}/${VOTES}`
    }
    static get suggestions(){
        const {BASE, SUGGESTIONS} = this;
        return `${BASE}/${SUGGESTIONS}`
    }
}