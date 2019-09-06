import Logs from "./Logs";

export interface SocketEvent {
    event:string,
    args:any,
    passthrough:any
}

export default class WSManager {

    socket:WebSocket;
    callbacks:any;
    onRoute?:((data:SocketEvent) => void);

    constructor(path:string, actions:any, callbacks:any, onOpenConnection:()=>void, onRoute?:(data:SocketEvent)=>void){
        this.callbacks = callbacks;
        this._route = this._route.bind(this);
        this.socket = new WebSocket(path);
        this.socket.onopen = onOpenConnection;
        this.socket.onmessage = this._route;
        if (onRoute) this.onRoute = onRoute;
    }

    send(action:string, args:any){
        Logs.action('Socket Send', { action, args });
        this.socket.send(JSON.stringify({action, args}));
    }

    private _route(message:MessageEvent):any{
        let data = JSON.parse(message.data);
        const { event, args } = data;

        let callback = this.callbacks[event];
        if (this.onRoute) this.onRoute(data);
        if (!callback) return Logs.reaction('No callback for: ', event, args);

        let serialized = {...args};
        Logs.reaction(`Routing to callback for event: ${event}`, serialized);
        callback(serialized);
    }
}

