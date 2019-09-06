import * as yup from 'yup';
import Validator from "../../global/managers/Validator";

export const StrapiValidationSchema = {

    email: yup.string(),
    password: yup.string(),
    username: yup.string()
        .matches(/^([\w\s]+)$/, { message:"Allowed characters: [ a-z ], [ 0-9 ], [ Space, -, _ ].", excludeEmptyString:true })
        .max(24, 'Maximum 24 characters allowed.'),
    genericName: yup.string()
        .matches(/^([\w\s]+)$/, { message:"Allowed characters: [ a-z ], [ 0-9 ], [ Space, -, _ ].", excludeEmptyString:true })
        .max(24, 'Maximum 24 characters allowed.'),
};

export const StrapiValidation = {
    email: (rule:any, value:any, cb:any) => {
        cb(Validator.yup(StrapiValidationSchema.email, value).error);
    },
    password: (rule:any, value:any, cb:any) => {
        cb(Validator.yup(StrapiValidationSchema.password, value).error);
    },
    username: (rule:any, value:any, cb:any) => {
        cb(Validator.yup(StrapiValidationSchema.username, value).error);
    },
    genericName: (rule:any, value:any, cb:any) => {
        cb(Validator.yup(StrapiValidationSchema.genericName, value).error);
    },
};
