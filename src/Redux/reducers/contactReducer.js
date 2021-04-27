import actionTypes from '../actionType'
import { isRequired, minLength, maxLength, emailValidation, abuseMessageValidator } from '../../Helpers/ValidationChecker'
const initialState = {
    formData: {
        name: {
            value: '',
            isValid: false,
            isError: null
        },
        email: {
            value: '',
            isValid: false,
            isError: null
        },
        message: {
            value: '',
            isValid: false,
            isError: null
        }
    }
}
const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ONCHANGE_CONTACT_FORM: {
            const { value, name } = action.target;
            let isError = null
            switch (name) {
                case "name":
                case "email":
                case "message":
                    isError = isRequired(value) ||
                        (name === "email" && emailValidation(value)) ||
                        minLength(3)(value) ||
                        maxLength(30)(value) ||
                        (name === 'message' && abuseMessageValidator(value))
                    break
                default: 
            }
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [name]: {
                        value,
                        isValid: !!!isError,
                        isError
                    }

                }
            }
        }
        default: return state
    }
}

export default contactReducer