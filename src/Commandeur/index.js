import { useState, useEffect, useRef } from 'react'
import { Typography, Slider, withStyles, makeStyles, Button } from '@material-ui/core'
import { grey } from '@material-ui/core/colors';
import { connect } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { update_current_trial } from '../Redux/Actions/current_trial'
import { update_list_trial_commandeur } from '../Redux/Actions/trials'
import { update_commandeur_button } from '../Redux/Actions/calibration'
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';
// import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import style from './index.module.css'
// import { ReactComponent as Argent } from '../Ressources/argent.svg'
import { update_commandeur } from '../Redux/Actions/nb_trials'
import { useMousePosition, useBbox } from '../hook'
// import { ReactComponent as Argent } from '../Ressources/argent.svg'
import AddIcon from '@material-ui/icons/Add';
import { FabRole } from '../Component/FabRole';
import WaitPlayer from '../Component/WaitPlayer';
import { getCurrentTrialCondition } from '../hook';

const Tracker = ({ stateChanger, ...rest }) => {

    const start = new Date();

    const position = useMousePosition(start);

    useEffect(() => {
        stateChanger(position)
    }, [position])

    return (
        <>
        </>
    )
}

const useStyles = makeStyles(theme => ({
    thumb: {
        "& .MuiSlider-thumb": {
            height: 20,
            width: 20,
            marginTop: -8,
            marginLeft: 0
        }
    },
    avatarcolor: {
        color: 'black',
        backgroundColor: grey[300]
    }
}));


const SliderStyled = withStyles({
    thumb: {
        height: 20,
        width: 20,
        marginTop: -8,
        marginLeft: 0,
    },
    track: {
        height: 5
    },
    rail: {
        height: 5
    },
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
})(Slider);

const Commandeur = ({ nb_trial_global, trial_global, role_global, condition_commandeur, cond_change, update_current_trial, update_commandeur, trial_condition_1, trial_condition_2, update_list_trial_commandeur, region_global, update_commandeur_button }) => {

    const timer = useRef();

    const classes = useStyles();

    const history = useHistory();

    const [reactionTime, setReactionTime] = useState(0)

    const [open, setOpen] = useState({
        proposeur: false,
        receveur: false
    });

    const [player, setPlayer] = useState({
        proposeur: false,
        receveur: false
    });

    const [disabled, setDisabled] = useState(true)

    const [tracking, setTracking] = useState(false)

    const [tracker, setTracker] = useState([])

    const [bbox1, ref1] = useBbox();

    const [bbox2, ref2] = useBbox();

    const [trialList, setTrialList] = useState({ trials: [], index: 0 })

    const [trial, setTrial] = useState({
        id_trial: '',
        role: '',
        tracking: {},
        tracking_choix: [],
        time: 0,
        proposition_proposeur: 0,
        proposition_receveur: 0,
        proposition_joueur: false,
        choix_commander: true,
        choix: false,
        testvalue: 0,
        gain_user: 0,
        button_role: []
    })

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    };

    const timetochange = getRandomArbitrary(1000, 2000);
    const proposeurtimetochange = getRandomArbitrary(1000, 2000);

    useEffect(() => {

        setOpen({
            ...open,
            proposeur: true
        })
        timer.current = setTimeout(() => {
            setPlayer({
                ...player,
                proposeur: true
            });
        }, proposeurtimetochange)

        timer.current = setTimeout(() => {
            setOpen({
                ...open,
                proposeur: false
            })
        }, proposeurtimetochange + 1500)
    }, [])

    useEffect(() => {

        // console.log(`Commandeur : ${getCurrentTrialCondition(condition_commandeur, cond_change)}`);

        // const index = Math.floor(Math.random() * trial_commandeur_global.length);

        // const item = trial_commandeur_global.length !== 0 ?
        //     trial_commandeur_global[index] : trial_global[Math.floor(Math.random() * trial_global.length)];

        const index = getCurrentTrialCondition(condition_commandeur, cond_change) === 'condition 1' ? Math.floor(Math.random() * trial_condition_1.length) : Math.floor(Math.random() * trial_condition_2.length)

        const item = getCurrentTrialCondition(condition_commandeur, cond_change) === 'condition 1' ?
            trial_condition_1.length !== 0 ? trial_condition_1[index] : trial_global[Math.floor(Math.random() * trial_global.length)]
            :
            trial_condition_2.length !== 0 ? trial_condition_2[index] : trial_global[Math.floor(Math.random() * trial_global.length)]

        setTrialList({ trials: getCurrentTrialCondition(condition_commandeur, cond_change) === 'condition 1' ? trial_condition_1 : trial_condition_2, index: index })

        setTrial({
            ...trial,
            id_trial: item.id_trial,
            role: role_global,
            tracking: { x: 0, y: 0 },
            tracking_choix: { x: 0, y: 0 },
            proposition_proposeur: item.proposition_proposeur,
            proposition_receveur: item.proposition_receveur,
            choix_commander: item.choix_commander
        });

        const d = new Date();

        const start = d.getTime();

        setReactionTime(start)
    }, [role_global]);

    const handleClick = () => {
        setDisabled(false)
        setTracking(true)
    }

    const handleClickLeft = () => {
        const d1 = new Date();
        const end = d1.getTime();

        update_current_trial({ ...trial, condition: getCurrentTrialCondition(condition_commandeur, cond_change), tracking: tracker, time: end - reactionTime, choix_commander: true, button_position: [{ x: bbox1.x, y: bbox1.y, width: bbox1.width, height: bbox1.height }, { x: bbox2.x, y: bbox2.y, width: bbox2.width, height: bbox2.height }] })
        update_commandeur_button([{ x: bbox1.x, y: bbox1.y, width: bbox1.width, height: bbox1.height }, { x: bbox2.x, y: bbox2.y, width: bbox2.width, height: bbox2.height }]);
        update_commandeur();
        setOpen({
            ...open,
            receveur: true
        })
        setTracking(false)

        trialList.trials.splice(trialList.index, 1);

        // add ici
        setTrial({ ...trial, choix_commander: true })

        update_list_trial_commandeur({condition1: getCurrentTrialCondition(condition_commandeur, cond_change) === 'condition 1' ? trialList.trials : trial_condition_1, condition2: getCurrentTrialCondition(condition_commandeur, cond_change) === 'condition 2' ? trialList.trials : trial_condition_2})

        timer.current = setTimeout(() => {
            setPlayer({
                ...player,
                receveur: true
            });
        }, timetochange);

        timer.current = setTimeout(() => {
            if (nb_trial_global % 4 === 0) {
                history.push('Role');
            } else {
                history.push('Continuer');
            }
        }, 1500 + timetochange)
    }

    const handleClickRight = () => {
        const d1 = new Date();
        const end = d1.getTime();

        update_current_trial({ ...trial, condition: getCurrentTrialCondition(condition_commandeur, cond_change), tracking: tracker, time: end - reactionTime, choix_commander: false, button_position: [{ x: bbox1.x, y: bbox1.y, width: bbox1.width, height: bbox1.height }, { x: bbox2.x, y: bbox2.y, width: bbox2.width, height: bbox2.height }] })
        update_commandeur_button([{ x: bbox1.x, y: bbox1.y, width: bbox1.width, height: bbox1.height }, { x: bbox2.x, y: bbox2.y, width: bbox2.width, height: bbox2.height }]);
        update_commandeur();
        setOpen({
            ...open,
            receveur: true
        })
        setTracking(false)

        // add ici
        setTrial({ ...trial, choix_commander: false })

        trialList.trials.splice(trial.trialList, 1);

        update_list_trial_commandeur({condition1: getCurrentTrialCondition(condition_commandeur, cond_change) === 'condition 1' ? trialList.trials : trial_condition_1, condition2: getCurrentTrialCondition(condition_commandeur, cond_change) === 'condition 2' ? trialList.trials : trial_condition_2})

        timer.current = setTimeout(() => {
            setPlayer({
                ...player,
                receveur: true
            });
        }, timetochange);

        timer.current = setTimeout(() => {
            if (nb_trial_global % 4 === 0) {
                history.push('Role');
            } else {
                history.push('Continuer');
            }
        }, 1500 + timetochange)
    }

    if (nb_trial_global === 116)
        return <Redirect to='/Assumption' />

    return (
        <div className={style.root}>
            <div className={style.reponse}>
                <Button ref={ref1} variant='contained' color='primary' style={{ width: 180, padding: 15, height: 70, marginLeft: 20, color: disabled ? '#DFDFDF' : '' }} disabled={disabled} onClick={handleClickLeft}>
                    {region_global === 'fr' ? 'Accepter' : 'Accetta'}
                </Button>
                <Button ref={ref2} variant='contained' color='primary' style={{ width: 180, padding: 15, height: 70, marginRight: 20, color: disabled ? '#DFDFDF' : '' }} disabled={disabled} onClick={handleClickRight}>
                    {region_global === 'fr' ? 'Refuser' : 'Rifiuta'}
                </Button>
            </div>
            <div className={style.container}>
                <div className={style.sommes}>
                    <div>
                        <FabRole name={'Proposeur'} margin={10} />{region_global === 'fr' ? "Proposeur" : "Proponente"} : {trial.proposition_proposeur}€
                    </div>
                    <div>
                        <FabRole name={'Receveur'} margin={10} />{region_global === 'fr' ? "Receveur" : "Ricevente"} : {trial.proposition_receveur}€
                    </div>
                </div>
                <div className={style.slider}>
                    <SliderStyled
                        className={classes.thumb}
                        disabled={true}
                        value={10 - trial.proposition_proposeur}
                        min={0}
                        max={10}
                    />
                    <div className={style.middle}> 
                        <p><i>{region_global === 'fr' ? 'Veuillez répondre le plus rapidement et précisément possible' : 'Siete pregati di rispondere velocemente e in modo preciso'}</i></p>
                    </div>
                </div>
            </div>
            <div className={style.footer}>
                <Button variant='outlined' onClick={handleClick} disabled={!disabled}><AddIcon /></Button>
                {region_global === 'fr' ? <Typography>Cliquez ici au dessus avant de faire votre choix</Typography> : <Typography>Clicca qui sopra prima di fare la tua scelta</Typography>}
                {/* <Button variant='outlined' onClick={handleClick} disabled={!disabled}>Cliquez ici avant de faire votre choix</Button> */}
            </div>
            <WaitPlayer
                open={open.receveur}
                proposeur={true}
                offre={trial.proposition_proposeur}
                commandeur={true}
                commandeur_completed={true}
                accept={trial.choix_commander}
                receveur={player.receveur}
                time_1={0}
                time_2={timetochange - 1000}
                completed={true}
            />
            <WaitPlayer
                open={open.proposeur}
                proposeur={player.proposeur}
                offre={trial.proposition_proposeur}
                time_1={proposeurtimetochange}
                time_2={0}
            />
            {/* <Dialog open={open}>
                <DialogTitle>{region_global === 'fr' ? "En attente des autres joueurs..." : "In attesa degli altri giocatori..."}</DialogTitle>
                <DialogContent>
                    <div className={style.player}>
                        <LinearProgress color="primary" size={20} />
                        <div className={style.playertext}>
                            <Typography variant='h4'>{region_global === 'fr' ? "En attente de l'action de chaque joueur" : "Aspettando l'azione di ogni giocatore"}</Typography>
                        </div>
                        <div className={style.playerinfo}>
                            <div className={style.playerContainer}>
                                <div className={style.playerWrapper}>
                                    <CheckCircleOutlineIcon color='primary' fontSize='large' />
                                    <Chip
                                        variant="outlined"
                                        label={region_global === 'fr' ? 'Proposeur' : 'Proponente'}
                                        avatar={<Avatar>P</Avatar>}
                                        color='primary'
                                    />
                                </div>
                                <div className={style.playerWrapper}>
                                    {player ? <CheckCircleOutlineIcon color='primary' fontSize='large' /> : <HighlightOffIcon fontSize='large' color='disabled' />}
                                    <Chip
                                        variant="outlined"
                                        label={region_global === 'fr' ? 'Receveur' : 'Ricevente'}
                                        avatar={<Avatar>R</Avatar>}
                                        color={player ? 'primary' : 'default'}
                                    />
                                    {player ? <div className={style.receveursvg}><Chip label={trial.choix_commander ? trial.proposition_receveur : 0} /><Argent /></div> : <Chip style={{ marginLeft: 10 }} label={"?"} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog> */}
            {tracking ? <Tracker stateChanger={setTracker} /> : null}
        </div>
    )
}

const mapStateToProps = state => ({
    trial_global: state.trials.trial,
    // trial_commandeur_global: state.trials.trial_commander,
    trial_condition_1: state.trials.trial_commandeur_condition_1,
    trial_condition_2: state.trials.trial_commandeur_condition_2,
    nb_trial_global: state.trialsRecord.nb_trial,
    role_global: state.role.role,
    condition_commandeur: state.nbTrials.commandeur_cond,
    cond_change: state.nbTrials.commandeur,
    region_global: state.langue.region
})

export default connect(mapStateToProps, { update_current_trial, update_commandeur, update_list_trial_commandeur, update_commandeur_button })(Commandeur)