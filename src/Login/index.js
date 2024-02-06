import { useState } from 'react'
import { Button, TextField, Typography, IconButton, OutlinedInput, InputAdornment } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import style from './index.module.css'
import { useHistory, Redirect } from 'react-router-dom'
import CSRFToken from '../Component/CSRFToken';
import { connect } from 'react-redux';
import { login } from '../Redux/Actions/auth';
import { ReactComponent as Crown } from '../Ressources/crown.svg'

const Login = ({ login, isAuthenticated }) => {

    const [state, setState] = useState({
        username: '',
        password: ''
    })

    const { username, password } = state;

    const history = useHistory();

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

        login(username, password);
    }

    if(isAuthenticated)
        return <Redirect to='/Consigne'/>;

    return (
        <div className={style.root}>
            <form className={style.form} onSubmit={e => onSubmit(e)}>
                <CSRFToken />
                <div className={style.header}>
                    <Crown />
                    <Typography variant='h3'>Si vous avez correctement complété l'inscription, veuillez vous <strong>connecter</strong></Typography>
                </div>
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
                <div className={style.submit}>
                    <Button fullWidth variant='contained' color='primary' type='submit'>
                        Se connecter
                    </Button>
                    <Button fullWidth variant='contained' color='secondary' onClick={() => history.push('/Register')}>
                        S'inscrire
                    </Button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);