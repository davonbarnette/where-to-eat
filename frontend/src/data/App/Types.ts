export const FIXED_COMPONENT_TYPES = {
    MODAL:'modal',
    DRAWER:'drawer',
};

export const MODALS_BY_ID = {

};

export const DRAWERS_BY_ID = {

};

export interface SingleDataPropertyType {
    title:string,
    sorter:(a:any,b:any) => void,
    sortDirections:string[],
}


export interface QueryDebuggerEventsResponseType {
    debug_events:DebugEventsType,
}

export interface DebugEventsType {
    [eventLabel:string]:{
        action:string,
        args:any,
    }
}
