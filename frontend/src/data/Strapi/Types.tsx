export interface LoginDataType {
    identifier:string,
    password:string,
}

export interface SignupDataType {
    email:string,
    password:string,
    username:string,
}

export interface StrapiUserObject extends StrapiGeneric<number> {
    username:string,
    email:string,
    provider:'local',
    role:number,
    confirmed:boolean,
}

export interface StrapiMeResponseObject {
    exp:number,
    user:StrapiUserObject,
}

export interface StrapiAuthResponseObject {
    jwt:string,
    user:StrapiUserObject
}

export interface StrapiSpaceObject extends StrapiSpaceArgs, StrapiGeneric<number> {}
export interface StrapiSpaceArgs {
    name:string,
    users?:number[]|StrapiUserObject[],
}

export interface StrapiSessionObject extends StrapiSessionArgs, StrapiGeneric<string>{
    stage:'inactive'|'choosing'|'submitting_orders'|'completed'
}

export interface StrapiSessionArgs {
    name:string,
    space?:number,
}

export interface StrapiVoteObject extends StrapiVoteArgs, StrapiGeneric<number>{
    suggestion:StrapiSuggestionObject;
}

export interface StrapiVoteObjectReduced extends StrapiVoteObject {
    numVotes:number
}

export interface StrapiVoteArgs {

}

export interface StrapiSuggestionObject extends StrapiSuggestionArgs, StrapiGeneric<number>{}
export interface StrapiSuggestionArgs {
    name:string,
    location?:string,
}

export interface StrapiGeneric<TId>{
    id:TId,
    created_at:string,
    updated_at:string,
}