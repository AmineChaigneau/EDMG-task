import { useState, useEffect, useRef, useCallback } from 'react'
import { connect } from 'react-redux'
import style from './index.module.css'
import { Slider, withStyles, Typography, CircularProgress, Button } from '@material-ui/core'
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';
// import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Redirect, useHistory } from 'react-router-dom'
import { update_current_trial } from '../Redux/Actions/current_trial'
import { update_proposeur } from '../Redux/Actions/nb_trials'
// import { ReactComponent as Argent } from '../Ressources/argent.svg'
import { useMousePosition, useBbox } from '../hook'
import WaitPlayer from '../Component/WaitPlayer';
import { FabRole } from '../Component/FabRole';
import AddIcon from '@material-ui/icons/Add';
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

const SliderStyled = withStyles({
    root: {
        pointerEvents: 'none',
        "& .Mui-disabled": {
            height: 0,
            width: 0,
            opacity: 0.5,
            pointerEvents: 'none',
        },
    },
    thumb: {
        height: 20,
        width: 20,
        marginTop: -8,
        marginLeft: -8,
        pointerEvents: 'all',
    },
    track: {
        height: 5,
        pointerEvents: 'none',
        background: '#FAD129'
    },
    rail: {
        height: 5,
        opacity: 1,
        background: '#FD932E'
    },
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
})(Slider);

const Proposeur = ({ role_global, gain_global, nb_trial_global, condition_proposeur, cond_change, trial_global, update_current_trial, update_proposeur, region_global }) => {

    const timer = useRef();

    const history = useHistory();

    const [bbox1, ref1] = useBbox();

    const [bbox2, ref2] = useBbox();

    const [tracking, setTracking] = useState(false)

    const [tracker, setTracker] = useState([])

    const [reactionTime, setReactionTime] = useState(0);

    const [role, setRole] = useState({ role: '', gain: 0 });

    const [open, setOpen] = useState(false);

    const [disabled, setDisabled] = useState(true);

    const [loading, setLoading] = useState(false);

    const [value, setValue] = useState(5);

    const [timeValue, setTimeValue] = useState(0);

    const [valueArr, setValueArr] = useState([]);

    const [commandeur, setCommandeur] = useState(false);

    const [player, setPlayer] = useState({
        commandeur: false,
        receveur: false,
    });

    const [trial, setTrial] = useState({
        id_trial: '',
        role: '',
        time: 0,
        tracking: {},
        tracking_choix: [],
        proposition_proposeur: 0,
        proposition_receveur: 0,
        proposition_joueur: false,
        choix_commander: false,
        gain_user: 0,
        choix: false,
        testvalue: 0,
        button_position: [],
        button_role: []
    })

    useEffect(() => {

        const item = trial_global[Math.floor(Math.random() * trial_global.length)];

        setTrial({
            ...trial,
            id_trial: item.id_trial,
            role: role_global,
            tracking: { x: 0, y: 0 },
            tracking_choix: { x: 0, y: 0 },
            proposition_proposeur: 5,
            proposition_receveur: 5,
        });

        setRole({
            role: role_global,
            gain: gain_global
        });

        const d = new Date();

        const start = d.getTime();

        setReactionTime(start)

        // setLoading(true)
        // timer.current = setTimeout(() => {
        //     setLoading(false)
        // }, 1000)

    }, [role_global, gain_global])


    const handleSliderChange = (event, newValue) => {
        setValue(newValue);

        setTrial({
            ...trial,
            proposition_proposeur: newValue,
            proposition_receveur: 10 - newValue
        })
    };

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    };

    const timetochange = getRandomArbitrary(2500, 4500);

    const commandertimetochange = getRandomArbitrary(500, 1500);

    function getTrialResult(value, fair, halfair, unfair) {
        const fairness = 10 - value
        const proba = getRandomArbitrary(0, 1)
        if ((fairness >= 4) && (fairness <= 6)) {
            setCommandeur(proba <= fair ? true : false);
        } else if ((fairness === 3) || (fairness === 7)) {
            setCommandeur(proba <= halfair ? true : false);
        } else {
            setCommandeur(proba >= unfair ? true : false);
        }
    }

    useEffect(() => {
        const updateChoice = ev => {
            const currentTime = new Date();
            const endTime = currentTime.getTime();
            setValueArr([...valueArr, { time: endTime - timeValue, value: value, x: ev.clientX, y: ev.clientY }]);
        }
        window.addEventListener("mousemove", updateChoice);
        getCurrentTrialCondition(condition_proposeur, cond_change) === 'condition 1' ? getTrialResult(value, 0.8, 0.6, 0.9) : getTrialResult(value, 0.2, 0.2, 0.9)

        return function cleanUp() {
            console.log("Clean UP");
            window.removeEventListener("mousemove", updateChoice)
        };
    }, [value])

    const handleStartTracking = () => {
        const d2 = new Date();
        const startValueTime = d2.getTime();

        setTimeValue(startValueTime)

        setValueArr([{ time: reactionTime - startValueTime, value: 5, x: ((bbox2.x + bbox2.width) / 2), y: ((bbox2.y + bbox2.height) / 2) }])

        setDisabled(false)
        setLoading(true)
        setTracking(true);
        timer.current = setTimeout(() => {
            setLoading(false)
        }, 1500)
    }

    const handleClick = () => {
        const d1 = new Date();
        const end = d1.getTime();
        setTracking(false);

        setLoading(true)
        timer.current = setTimeout(() => {
            setLoading(false)
            setOpen(true)
        }, 1000)

        timer.current = setTimeout(() => {
            setPlayer({
                commandeur: true,
                receveur: false
            });
        }, (timetochange - commandertimetochange));

        timer.current = setTimeout(() => {
            setPlayer({
                commandeur: true,
                receveur: true
            });
        }, (timetochange));

        timer.current = setTimeout(() => {
            update_current_trial({ ...trial, condition: getCurrentTrialCondition(condition_proposeur, cond_change), tracking: { tracking: tracker, value: valueArr }, time: end - reactionTime, choix_commander: commandeur, gain_user: commandeur ? trial.proposition_proposeur : 0, button_position: [{ x: bbox1.x, y: bbox1.y, width: bbox1.width, height: bbox1.height }] });
            update_proposeur();

            if (nb_trial_global % 4 === 0) {
                history.push('Role');
            } else {
                history.push('Continuer');
            }
        }, 2000 + timetochange)
    }

    if (nb_trial_global === 116)
        return <Redirect to='/Assumption' />

    return (
        <div className={style.root}>
            <div className={style.container} style={{ opacity: open ? 0 : 1 }}>
                <div className={style.sommes}>
                    <div>
                        <FabRole name={'Proposeur'} margin={10} /> {region_global === 'fr' ? "Proposeur" : "Proponente"} : {!disabled && value}€
                    </div>
                    <div>
                        <FabRole name={'Receveur'} margin={10} /> {region_global === 'fr' ? "Receveur" : "Ricevente"} : {!disabled && 10 - value}€
                    </div>
                </div>
                <div className={style.slider}>
                    <SliderStyled
                        ref={ref1}
                        value={value}
                        onChange={handleSliderChange}
                        min={0}
                        max={10}
                        disabled={disabled}
                    />
                </div>
            </div>
            <div className={style.footer} style={{ opacity: open ? 0 : 1 }}>
                {region_global === 'fr' ? <Typography><strong>Proposer</strong> la répartition aux autres joueurs.</Typography> : <Typography><strong>Suggerisci</strong> la divisione agli altri giocatori.</Typography>}
                <div className={style.buttonWrapper}>
                    {disabled ?
                        (
                            <div style={{ display: 'flex', justifyContent: 'center', padding: 15, width: 150 }}>
                                <Button variant='outlined' ref={ref2} onClick={handleStartTracking}><AddIcon /></Button>
                            </div>
                        ) : (
                            <Button color='primary' variant='contained' disabled={loading} onClick={handleClick} style={{ padding: 15, width: 150 }}>
                                {region_global === 'fr' ? 'Proposer' : 'Invia'}
                            </Button>
                        )
                    }
                    {loading && <div className={style.progressBar}><CircularProgress size={24} /></div>}
                </div>
            </div>
            <WaitPlayer
                open={open}
                proposeur={true}
                offre={value}
                commandeur={player.commandeur}
                receveur={player.receveur}
                accept={commandeur}
                time_1={0}
                time_2={timetochange - commandertimetochange}
                completed={true}
            />
            {/* <Dialog open={open}>
                <DialogTitle>{region_global === 'fr' ? "En attente des autres joueurs..." : "In attesa di degli altri giocatori..."}</DialogTitle>
                <DialogContent>
                    <div className={style.player}>
                        <LinearProgress color="primary" size={20} />
                        <div className={style.playertext}>
                            <Typography variant='h4'>{region_global === 'fr' ? "En attente de l'action de chaque joueur" : "Aspettando l'azione di ogni giocatore"}</Typography>
                        </div>
                        <div className={style.playerinfo}>
                            <div className={style.playerContainer}>
                                <div className={style.playerWrapper}>
                                    {player.commandeur ? <CheckCircleOutlineIcon color='primary' fontSize='large' /> : <HighlightOffIcon fontSize='large' color='disabled' />}
                                    <Chip
                                        variant="outlined"
                                        label={region_global === 'fr' ? 'Commandeur' : 'Committente'}
                                        avatar={<Avatar>C</Avatar>}
                                        color={player.commandeur ? 'primary' : 'default'}
                                    />
                                    {player.commandeur ? <Chip style={{ marginLeft: 10 }} color={commandeur ? 'primary' : 'default'} label={region_global === 'fr' ? commandeur ? 'Acceptée' : 'Refusée' : commandeur ? 'Accettato' : 'Rifiutato'} /> : <Chip style={{ marginLeft: 10 }} label={"?"} />}
                                </div>
                                <div className={style.playerWrapper}>
                                    {player.receveur ? <CheckCircleOutlineIcon color='primary' fontSize='large' /> : <HighlightOffIcon fontSize='large' color='disabled' />}
                                    <Chip
                                        variant="outlined"
                                        label={region_global === 'fr' ? 'Receveur' : 'Ricevente'}
                                        avatar={<Avatar>R</Avatar>}
                                        color={player.receveur ? 'primary' : 'default'}
                                    />
                                    {player.commandeur ? <div className={style.commandersvg}><Chip label={commandeur ? trial.proposition_receveur : 0} /><Argent /></div> : <Chip style={{ marginLeft: 10 }} label={"?"} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog> */}
            {tracking ? <Tracker stateChanger={setTracker} /> : null}
        </div >
    )
}

const mapStateToProps = state => ({
    role_global: state.role.role,
    gain_global: state.role.gain,
    nb_trial_global: state.trialsRecord.nb_trial,
    trial_global: state.trials.trial,
    condition_proposeur: state.nbTrials.proposeur_cond,
    cond_change: state.nbTrials.proposeur,
    region_global: state.langue.region
})

export default connect(mapStateToProps, { update_current_trial, update_proposeur })(Proposeur)
