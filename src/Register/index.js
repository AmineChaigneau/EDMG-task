import { useState } from 'react'
import { Button, TextField, Typography, IconButton, OutlinedInput, InputAdornment } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import style from './index.module.css'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { register } from '../Redux/Actions/auth';
import CSRFToken from '../Component/CSRFToken';

const Register = ({ register, isAuthenticated }) => {

    const [state, setState] = useState({
        username: '',
        password: '',
        re_password: ''
    })

    const [accountCreated, setAccountCreated] = useState(false);

    const { username, password, re_password } = state;

    const [showPassword, setShowPassword] = useState(true)

    const handleChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        setState(state => ({
            ...state,
            [name]: value
        }));
    }

    const handleClickShowPassword = () => {
        setShowPassword(false)
    };

    const handleMouseDownPassword = () => {
        setShowPassword(true)
    };

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            register(username, password, re_password);
            setAccountCreated(true);
        }
    }

    if (accountCreated)
        return <Redirect to='/Login' />;

    return (
        <div className={style.root}>
            <div className={style.header}>
                <Typography variant='h3'>Inscription</Typography>
                <div className={style.text}>
                    <Typography>
                        L'ensemble des données est <strong>anonymes</strong>, vous pouvez utiliser un <strong>pseudo</strong> pour vous enregister.
                        L'inscription est seulement nécessaire pour associer les données du jeu à votre numéro de participant
                    </Typography>
                </div>
            </div>
            <form className={style.form} onSubmit={e => onSubmit(e)}>
                <CSRFToken />
                <div className={style.input}>
                    <TextField
                        fullWidth
                        id='username'
                        name='username'
                        label='Pseudo'
                        variant="outlined"
                        margin="dense"
                        InputLabelProps={{ required: true }}
                        defaultValue={state.username}
                        onChange={handleChange}
                    />
                </div>
                <div className={style.input}>
                    <OutlinedInput
                        fullWidth
                        id="password"
                        margin='dense'
                        placeholder='Mot de passe'
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleChange}
                        value={state.password}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </div>
                <div className={style.input}>
                    <OutlinedInput
                        fullWidth
                        id="re_password"
                        margin='dense'
                        placeholder='Confirmation du Mot de passe'
                        name="re_password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleChange}
                        value={state.re_password}
                    />
                </div>
                <div className={style.submit}>
                    <Button fullWidth variant='contained' color='primary' type='submit'>
                        Confirmer
                    </Button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register)