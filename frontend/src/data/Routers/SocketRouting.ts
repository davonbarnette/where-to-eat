
/* Consumer Imports */
import AppConsumer from "../App/Consumer";


/*
 * Use this file when you have a WebSocket that uses an event:message system. When an event like SOCKET_ACTIONS.example
 * is fired, the backend should respond with an event. Register that key in SOCKET_CALLBACKS for which callback you want.
 * This also depends on what routing method you're using - so check global/managers/EventRouter.ts to see which one
 * you're using.
 *
 */

export const SOCKET_ACTIONS: any = {

    query_debugger_events:'query_debugger_events',

    /* Socket Actions */

};


export const SOCKET_CALLBACKS: any = {

    /* Socket Callbacks */

    query_debugger_events:          AppConsumer.onReceiveDebuggerEvents,

};