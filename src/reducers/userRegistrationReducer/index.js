/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from "../../action_types";

export const initialState = {
  passportUrl: "",
  selfieUrl: "",
  addressUrl: "",
  addressLine1:"",
  addressLine2:"",
  city:"",
  userState:"",
  postalCode:"",
  country:"",
  typeOfDocument:"",
  documentNumber:"",
  dateOfIssuance:null,
  dateOfExpiration:null,
  firstName:"",
  lastName:"",
  gender:"",
  dateOfBirth:null,
  citizenship:""
};

export default function(state = initialState, action) {
  switch (action.type) {

    case actionTypes.USER_FORM_STATES_SUCCESS: {
        console.log("user form details: ", action.payload)
      if ('state' in action.payload){
        const { state: oldState } = action.payload
        return { ...oldState }
      }else{
        return { ...state }
      }
    }

    case actionTypes.PASSPORT_UPLOAD_SUCCESS:{
        return {
            ...state,
            passportUrl: action.payload
          };
    }

    case actionTypes.SELFIE_UPLOAD_SUCCESS:{
        return {
            ...state,
            selfieUrl: action.payload
          };
    }

    case actionTypes.ADDRESS_DOC_UPLOAD_SUCCESS:{
        return {
            ...state,
            addressUrl: action.payload
          };
    }

    case actionTypes.ADDRESS_LINE1_CHANGED:{
        return {
            ...state,
            addressLine1: action.payload
          };
    }

    case actionTypes.ADDRESS_LINE2_CHANGED:{
        return {
            ...state,
            addressLine2: action.payload
          };
    }

    case actionTypes.CITY_CHANGED:{
        return {
            ...state,
            city: action.payload
          };
    }

    case actionTypes.USER_STATE_CHANGED:{
        return {
            ...state,
            userState: action.payload
          };
    }

    case actionTypes.POSTAL_CODE_CHANGED:{
        return {
            ...state,
            postalCode: action.payload
          };
    }

    case actionTypes.COUNTRY_CHANGED:{
        return {
            ...state,
            country: action.payload
          };
    }

    case actionTypes.TYPE_OF_DOCUMENT_CHANGED:{
        return {
            ...state,
            typeOfDocument: action.payload
          };
    }

    case actionTypes.DOCUMENT_NUMBER_CHANGED:{
        return {
            ...state,
            documentNumber: action.payload
          };
    }

    case actionTypes.DATE_OF_ISSUANCE_CHANGED:{
        return {
            ...state,
            dateOfIssuance: action.payload
          };
    }

    case actionTypes.DATE_OF_EXPIRATION_CHANGED:{
        return {
            ...state,
            dateOfExpiration: action.payload
          };
    }

    case actionTypes.FIRST_NAME_CHANGED:{
        return {
            ...state,
            firstName: action.payload
          };
    }

    case actionTypes.LAST_NAME_CHANGED:{
        return {
            ...state,
            lastName: action.payload
          };
    }

    case actionTypes.GENDER_CHANGED:{
        return {
            ...state,
            gender: action.payload
          };
    }

    case actionTypes.DATE_OF_BIRTH_CHANGED:{
        return {
            ...state,
            dateOfBirth: action.payload
          };
    }

    case actionTypes.CITIZENSHIP_CHANGED:{
        return {
            ...state,
            citizenship: action.payload
          };
    }

      

    default:
      return state;
  }
}
