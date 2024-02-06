export default function notification(state = {}, action) {
    switch (action.type) {
        case "SNACKBAR_SUCCESS":
            return {
                ...state,
                successSnackbarOpen: true,
                successSnackbarMessage: action.message,
                snackbarSeverity: action.severity,
            };
        case "SNACKBAR_CLEAR":
            return {
                ...state,
                successSnackbarOpen: false,
                errorSnackbarOpen: false,
                infoSnackbarOpen: false
            };
        default:
            return state;
    }
};
