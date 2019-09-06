import AppStore from "./Store";
import {QueryDebuggerEventsResponseType} from "./Types";

export default class AppConsumer {

    static onReceiveDebuggerEvents(data:QueryDebuggerEventsResponseType){
        const { debug_events } = data;
        if (debug_events) AppStore.debug = debug_events;
    }

}