import AppStore from "./Store";
import {SOCKET_ACTIONS} from "../Routers/SocketRouting";

export default class AppActions {

    static initialize(){
        AppActions.queryDebuggerEvents();
        AppStore.initialized = true;
    }

    static queryDebuggerEvents(){
        let action = SOCKET_ACTIONS.query_debugger_events;
        let args = { };
        AppStore.realtime.send(action, args);
    }

    static openFixedComponent(type:string, id:string){
        (AppStore as any)[type] = id;
    }

    static closeFixedComponent(type:string){
        (AppStore as any)[type] = undefined;
    }

    static downloadFile(fileName:string, url:string){
        let downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = fileName;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

    }

}