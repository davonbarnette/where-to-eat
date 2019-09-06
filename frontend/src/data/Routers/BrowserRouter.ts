import { createBrowserHistory } from 'history';

/*
 * The browser router class creates an instance of BrowserHistory so we can track the browser's history in a single-page
 * application. Only use this if you are using React as a single-page app. This allows the user to use the native back
 * button or forward buttons as if they were on a regular application. This is closely tied to React Router v4, so check
 * documentation at https://github.com/ReactTraining/react-router for more details. You'll see this instantiated in
 * App.tsx in RR4's <Router/> component.
 *
 */

class BrowserRouterClass {
    history:any;

    constructor(){
        this.history = createBrowserHistory();
    }

    push(url:string){
        this.history.push(url);
    }

}

const BrowserRouter = new BrowserRouterClass();
export default BrowserRouter;

/*
 * Use this class to statically type the exact browser routes you'd like to handle. If your route uses a param, make
 * make sure to use the "exampleByIdParam" route. It acts as a catch-all, so it will route to your component whether
 * or not you have the ID param in the url.
 */

export class BrowserRoutes {

    static BASE = '';
    static AUTH = 'auth';

    /* Data Type Route Chunks */
    static SPACES = 'spaces';
    static SPACE_PARAM = 'spaceId';
    static SESSIONS = 'sessions';
    static SESSION_PARAM = 'sessionId';

    static ACCOUNT = 'account';
    static DEBUGGER = 'debugger';

    static get debugger(){
        return `${this.BASE}/${this.DEBUGGER}`;
    }

    static get home(){
        return `${this.BASE}`;
    }
    static get auth(){
        return `${this.BASE}/${this.AUTH}`;
    }

    static get spaces(){
        return `${this.BASE}/${this.SPACES}`;
    }
    static get spacesByIdParam(){
        return `${this.spaces}/:${this.SPACE_PARAM}?`;
    }
    static getSpaceById(spaceId:number) {
        return `${this.spaces}/${spaceId}`;
    }

    static getSessions(){
        return `${this.BASE}/${this.SESSIONS}`;
    }
    static getSessionsByIdParam(){
        return `${this.BASE}/:${this.SESSION_PARAM}`;
    }
    static getSessionById(sessionId:string) {
        return `${this.BASE}/${sessionId}`;
    }

    static get account(){
        return `${this.BASE}/${this.ACCOUNT}`
    }
}
