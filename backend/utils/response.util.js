export function success(data, message = "Success") {

    return {

        success: true,

        message,

        data

    };

}

export function failure(message, errors = []) {

    return {

        success: false,

        message,

        errors

    };

}
