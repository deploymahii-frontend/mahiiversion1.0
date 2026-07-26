class ApiResponse {

    static success(
        data = null,
        message = "Success",
        meta = {}
    ) {

        return {

            success: true,

            message,

            data,

            meta,

            errors: []

        };

    }

    static error(
        message = "Something went wrong",
        errors = []
    ) {

        return {

            success: false,

            message,

            data: null,

            meta: {},

            errors

        };

    }

}

export default ApiResponse;
