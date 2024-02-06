// components/SuccessSnackbar.js or whatever you wanna call it
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { clearSnackbar } from "../Redux/Actions/notification";
import Alert from '@material-ui/lab/Alert';

export default function SuccessSnackbar() {
    const dispatch = useDispatch();

    const { successSnackbarMessage, successSnackbarOpen, snackbarSeverity } = useSelector(
        state => state.notification
    );

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(clearSnackbar())
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={successSnackbarOpen} autoHideDuration={4000}
            onClose={handleClose}
        >
            <Alert variant="filled" severity={snackbarSeverity} onClose={handleClose}>
                {successSnackbarMessage}
            </Alert>
        </Snackbar>
    );
}