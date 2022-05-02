
import * as yup from "yup";

yup.addMethod(yup.string, 'stripEmptyString', function () {
    return this.transform((value) => (value === '' ? " " : value));
});

export const schemaRegistration = yup.object({
    name: yup.string().required().min(2,"at least 2 characters"),
    email: yup.string().required().email("invalid type of email"),
    password:yup.string().required().min(7,"at least 7 characters"),
    confirmPassword:yup.string().oneOf([yup.ref("password"),null],"passwords are not matched").stripEmptyString(),
}).required();

export const schemaLogin = yup.object({
    email: yup.string().required().email("invalid type of email"),
    password:yup.string().required().min(7,"at least 7 characters"),
}).required();

export const schemaRecover = yup.object({
    email: yup.string().required().email("invalid type of email"),
    password:yup.string().required().min(7,"at least 7 characters"),
    confirmPassword:yup.string().oneOf([yup.ref("password"),null],"passwords are not matched").stripEmptyString(),
}).required();

