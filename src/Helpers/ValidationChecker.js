export function isRequired(name) {
    return !!name ? undefined : 'Field is required.'
}

export function minLength(length) {
    return function (value) {
        return value.length >= length ? undefined : 'Field should contain at least 3 signs.'
    }
}

export function maxLength(length) {
    return function (value) {
        return value.length <= length ? undefined : 'Field should contain not more than 20 signs.'
    }
}

export function emailValidation(email) {
    if (
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            email,
        )
    ) {
        return undefined
    }

    return 'Please enter a valid email.'
}

export function isAllValidation(formData) {
    for (let key in formData) {
        if (formData[key].valid)
            return true
    }
    return false
}