import * as mobx from 'mobx';
import axios, {AxiosRequestConfig} from 'axios';
import {
    LoginDataType,
    SignupDataType,
    StrapiSessionArgs, StrapiSessionObject,
    StrapiSpaceArgs,
    StrapiSuggestionArgs,
    StrapiSuggestionObject
} from "./Types";
import StrapiAPI, {StrapiAPIRoutes} from "./APIHandler";
import AppStore from "../App/Store";
import StrapiMethods from "./Methods";

const {suggestions:suggestionsRoute, sessions:sessionsRoute} = StrapiAPIRoutes;

export default class StrapiActions {

    static async login(data:LoginDataType){
        let res = await StrapiAPI.login(data);
        if (res) {
            const {jwt, user} = res.data;
            StrapiMethods.setStrapiJWT(jwt);
            AppStore.user = user;
        }
    }
    static async signup(data:SignupDataType){
        let res = await StrapiAPI.signup(data);
        if (res) {
            const {jwt, user} = res.data;
            StrapiMethods.setStrapiJWT(jwt);
            AppStore.user = user;
        }
    }
    static async getInitialAuth(){
        let res = await StrapiAPI.getMe();
        if (res) AppStore.user = res.data.user;
        else StrapiMethods.removeStrapiJWT();
        AppStore.initialAuth = true;
    }
    static async logout(){
        StrapiMethods.removeStrapiJWT();
    }

    static async getSpaces(){
        let res = await StrapiAPI.getSpaces();
        if (res){
            let map = new Map();
            res.data.forEach(space => map.set(space.id, space));
            AppStore.spaces = map;
        }
    }

    static async createSpace(data:StrapiSpaceArgs){
        if (AppStore.user) data.users = [mobx.toJS(AppStore.user)];
        console.log('user', AppStore.user);
        console.log('data', data);
        let res = await StrapiAPI.createSpace(data);
        if (res){
            const {data:space} = res;
            AppStore.spaces.set(space.id, space);
        }
    }

     static async getVotes(sessionId:number){
        let res = await StrapiAPI.getVotes(sessionId);
        let map = new Map();
        if (res){
            res.data.forEach(vote => map.set(vote.id, vote));
        }
        AppStore.votes = map;
    }

    static sessions = {
        create: async (data: StrapiSessionArgs) => {
            console.log('data', data);
            let appended = {...data, host: AppStore.user};
            let suggestion = await StrapiAPI.handleRequest<StrapiSuggestionArgs, StrapiSuggestionObject>({
                method: 'post', url: sessionsRoute, data: appended,
            });
            if (suggestion instanceof Error) return null;
            else AppStore.suggestions.set(suggestion.id, suggestion);
        },
        find: async (spaceId?:number) => {
            let sessions = await StrapiAPI.handleRequest<any, StrapiSessionObject[]>({
                method: 'get', url: sessionsRoute
            });
            if (sessions instanceof Error) return null;
            else {
                let map = new Map(AppStore.sessions);
                sessions.forEach(session => map.set(session.id, session));
                AppStore.sessions = map;
            }
        }
    };

    static suggestions = {
        create: async (data:StrapiSuggestionArgs) => {
            let appended = {...data, user:AppStore.user};
            let suggestion = await StrapiAPI.handleRequest<StrapiSuggestionArgs, StrapiSuggestionObject>({
                method:'post', url:suggestionsRoute, data:appended,
            });
            if (suggestion instanceof Error) return null;
            else AppStore.suggestions.set(suggestion.id, suggestion);
        },
        find: async (sessionId:string) => {
            let suggestions = await StrapiAPI.handleRequest<any, StrapiSuggestionObject[]>({
                method:'get', url:suggestionsRoute
            });
            if (suggestions instanceof Error) return null;
            else {
                let map = new Map(AppStore.suggestions);
                suggestions.forEach(suggestion => map.set(suggestion.id, suggestion));
                AppStore.suggestions = map;
            }
        },
    };
}