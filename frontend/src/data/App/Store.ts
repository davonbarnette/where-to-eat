import {decorate, observable, computed} from "mobx";
import AppActions from "./Actions";
import {SOCKET_ACTIONS, SOCKET_CALLBACKS} from "../Routers/SocketRouting";
import WSManager, {SocketEvent} from "../../global/managers/WSManager";
import {
    StrapiSessionObject,
    StrapiSpaceObject, StrapiSuggestionObject,
    StrapiUserObject,
    StrapiVoteObject,
} from "../Strapi/Types";
import StrapiMethods from "../Strapi/Methods";
import StrapiActions from "../Strapi/Actions";
import AppMethods from "./Methods";

class AppStoreClass {

    account:        any;

    /* Data Types */

    realtime:       WSManager;
    socket:         any = {};
    initialized:    boolean = false;
    drawer?:        string;
    modal?:         string;
    debug:          any = [];
    spaces:         Map<number, StrapiSpaceObject> = new Map();
    sessions:       Map<string, StrapiSessionObject> = new Map();
    votes:          Map<number, StrapiVoteObject> = new Map();
    suggestions:    Map<number, StrapiSuggestionObject> = new Map();
    initialAuth:    boolean = false;

    jwt?:           string;
    user?:          StrapiUserObject;

    constructor(){
        let path = `ws://${window.location.host}/controlpanel/ws/`;
        if (process.env.NODE_ENV === 'development') path = `ws://${window.location.hostname}:8000/controlpanel/ws/`;
        this.realtime = new WSManager(path, SOCKET_ACTIONS, SOCKET_CALLBACKS, AppActions.initialize, (data:SocketEvent) => this.socket = data);
    }

    async initialize(){
        StrapiMethods.getStrapiJWT();
        await StrapiActions.getInitialAuth();
        await StrapiActions.sessions.find();
    }

    get necessaryDataIsLoaded(){
        return this.initialAuth;
    }

}

decorate(AppStoreClass,{

    account:        observable,

    /* Data Decorators */
    drawer:         observable,
    modal:          observable,
    initialized:    observable,
    debug:          observable,
    realtime:       observable,
    jwt:            observable,
    user:           observable,
    spaces:         observable,
    sessions:       observable,
    votes:          observable,
    suggestions:    observable,
    initialAuth:    observable,
    necessaryDataIsLoaded: computed,
});

const AppStore = new AppStoreClass();
export default AppStore;