import { useState, useRef } from 'react'
import style from './index.module.css'
import { connect } from 'react-redux'
import { Typography, IconButton, CircularProgress, Backdrop, Tooltip } from "@material-ui/core"
import { ReactComponent as France } from './france.svg'
import { ReactComponent as Italy } from './italy.svg'
import { useHistory } from 'react-router-dom'
import { choose_langue } from '../Redux/Actions/langue'
import { load_trials, load_trials_receveur, load_trials_commander } from '../Redux/Actions/trials'
import { trials, trials_receveur_condition_1, trials_receveur_condition_2, trials_commandeur_condition_1, trials_commandeur_condition_2 } from '../Ressources/trials_conditions_state'
import { resetStore } from '../Redux/Actions/reset'
import ReplayIcon from '@material-ui/icons/Replay';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';


const Langue = ({ choose_langue, load_trials, load_trials_commander, load_trials_receveur, time_all_global, resetStore, last_pathname }) => {

    const history = useHistory();

    const [loading, setLoading] = useState(false)

    const timer = useRef()

    const handleResetStore = () => {
        setLoading(true)
        timer.current = setTimeout(() => {
            setLoading(false);
            resetStore()
        }, 1000);
    }

    const handleClickFr = () => {
        history.push("/Acceuil");
        choose_langue('fr');
        load_trials(trials);
        // load_trials_receveur(trials_receveur);
        // load_trials_commander(trials_commander);
        load_trials_commander({condition1: trials_commandeur_condition_1, condition2: trials_commandeur_condition_2});
        load_trials_receveur({condition1: trials_receveur_condition_1, condition2: trials_receveur_condition_2});
    }

    const handleClickIt = () => {
        history.push("/Acceuil");
        choose_langue('it');
        load_trials(trials);
        load_trials_receveur({condition1: trials_receveur_condition_1, condition2: trials_receveur_condition_2});
        load_trials_commander({condition1: trials_commandeur_condition_1, condition2: trials_commandeur_condition_2});
    }

    return (
        <div className={style.root}>
            <div>
                <Typography variant='h1'>
                    First, choose your <strong>language</strong>.
                </Typography>
            </div>
            <div className={style.flag}>
                <IconButton className={style.test} onClick={handleClickFr}>
                    <France />
                </IconButton>
                <IconButton className={style.test} onClick={handleClickIt}>
                    <Italy />
                </IconButton>
            </div>
            <div className={style.container}>
                {time_all_global > 0 && <Typography>You already start this game.</Typography>}
                <div className={style.icon}>
                    {time_all_global > 0 &&
                        <Tooltip title={'Pick up where you left off'}>
                            <IconButton variant='outlined' onClick={() => history.push(last_pathname)}>
                                <PlayCircleOutlineIcon />
                            </IconButton>
                        </Tooltip>
                    }
                    <Tooltip title={'Start the game again'}>
                        <IconButton onClick={handleResetStore} size="medium">
                            <ReplayIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <Backdrop
                style={{ color: '#fff', zIndex: 1000 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

const mapStateToProps = state => ({
    time_all_global: state.trialsRecord.time_all,
    last_pathname: state.langue.pathname,
})

export default connect(mapStateToProps, { choose_langue, load_trials, load_trials_receveur, load_trials_commander, resetStore })(Langue)