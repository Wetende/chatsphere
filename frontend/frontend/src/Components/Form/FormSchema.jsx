import * as Yup from 'yup';

const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

export const ContactFormStyle01Schema = Yup.object().shape({
    name: Yup.string().required("Field is required."),
    email: Yup.string().email("Invalid email.").required("Field is required."),
    phone: Yup.string().required().matches(phoneRegex, "Invalid phone")
});

export const ContactFormStyle02Schema = Yup.object().shape({
    name: Yup.string().required("Field is required."),
    email: Yup.string().email("Invalid email.").required("Field is required.")
});

export const ContactFormStyle03Schema = Yup.object().shape({
    name: Yup.string().required("Field is required."),
    email: Yup.string().email("Invalid email.").required("Field is required."),
    terms_condition: Yup.boolean().oneOf([true],'Message').required()
});

export const ContactFormStyle04Schema = Yup.object().shape({
    name: Yup.string().required("Field is required."),
    email: Yup.string().email("Invalid email.").required("Field is required."),
    phone: Yup.string().required().matches(phoneRegex, "Invalid phone"),
    comment: Yup.string().required("Field is required."),
});