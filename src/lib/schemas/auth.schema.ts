import * as Yup from 'yup';

const emailYup = Yup.string()
  .email('Invalid Email')
  .required('Email is Required');

export const loginSchema = Yup.object().shape({
  email: emailYup,
  password: Yup.string().required(' Password Required'),
});

export const signupSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is Required'),
  lastName: Yup.string().required('Last Name is Required'),
  username: Yup.string().required('Username is Required'),
  email: emailYup,
  password: Yup.string().required('Password is Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password Required'),
});

export const nextOfKinSchema = Yup.object().shape({
  firstname: Yup.string().required('First Name is Required'),
  lastname: Yup.string().required('Last Name is Required'),
  email: emailYup,
  phone: Yup.string().required('Phone is Required'),
  relationship: Yup.string().required('Relationship is Required'),
});

export const contactUsSchema = Yup.object().shape({
  email: emailYup,
  name: Yup.string().required('Name is Required'),
  subject: Yup.string().required('Subject is Required'),
  message: Yup.string().required('Message is Required'),
});

export const forgotSchema = Yup.object().shape({
  email: emailYup,
});

export const resetSchema = Yup.object().shape({
  otp: Yup.string().required('OTP Required'),
  newPassword: Yup.string().required('Password Required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match')
    .required('Confirm Password Required'),
});

export const updateProfileSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is Required'),
  lastName: Yup.string().required('Last Name is Required'),
  profileImage: Yup.string().required('Profile Image is required'),
});

export const changePasswordSchema = Yup.object().shape({
  otp: Yup.string().required('OTP is Required'),
  newPassword: Yup.string().required('Password is Required'),
});

export const registrationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is Required'),
  lastName: Yup.string().required('Last Name is Required'),
  email: emailYup,
  password: Yup.string().required('Password is Required'),
});

export const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .required('OTP is Required')
    .matches(/^[0-9-]+$/, 'OTP must be a 6-digit number'),
});

export const newPasswordSchema = Yup.object().shape({
  old_password: Yup.string().required('Old Password is Required'),
  password: Yup.string().required('Password is Required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password Required'),
});

export const deleteSchema = Yup.object().shape({
  email: emailYup,
  password: Yup.string().required(' Password Required'),
});

export const addressSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is Required'),
  lastName: Yup.string().required('Last Name is Required'),
  phone: Yup.string().required('Phone is Required'),
  address: Yup.string().required('Address is Required'),
  state: Yup.string().required('State is Required'),
  localGovernment: Yup.string().required('LGA is Required'),
  // postalCode: Yup.string().required('Postal Code is Required'),
});

export const walletSchema = Yup.object().shape({
  amount: Yup.string().required('Amount is Required'),
});

export const warrantySchema = Yup.object().shape({
  imei: Yup.string().required('IMEI is Required'),
  brand_model: Yup.string().required('Brand Model is Required'),
  address: Yup.string().required('Address is Required'),
  area: Yup.string().required('Area is Required'),
  date: Yup.string().required('Date is Required'),
  time: Yup.string().required('Time is Required'),
  complain: Yup.string().required('Complain is Required'),
});

export const warrantyThirdPartySchema = Yup.object().shape({
  imei: Yup.string().required('IMEI is Required'),
  email: emailYup,
  name: Yup.string().required('Name is Required'),
});

export const warrantyPersonalSchema = Yup.object().shape({
  imei: Yup.string().required('IMEI is Required'),
});
