import { useState, useEffect, useRef } from 'react'
import { Slider, withStyles, makeStyles, Button, CircularProgress } from '@material-ui/core'
import { grey } from '@material-ui/core/colors';
import { connect } from 'react-redux'
import style from './index.module.css'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import theme from '../theme'
import { Redirect, useHistory } from 'react-router-dom'
import { update_current_trial } from '../Redux/Actions/current_trial'
import { update_receveur } from '../Redux/Actions/nb_trials'
import { update_list_trial_receveur } from '../Redux/Actions/trials'
import WaitPlayer from '../Component/WaitPlayer';
import { FabRole } from '../Component/FabRole';
import { getCurrentTrialCondition } from '../hook';
// import { ReactComponent as Argent } from '../Ressources/argent.svg'

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
    root: {

    },
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

const Receveur = ({ nb_trial_global, role_global, condition_receveur, cond_change, trial_global, trial_condition_1, trial_condition_2, update_current_trial, update_receveur, update_list_trial_receveur, region_global }) => {

    const classes = useStyles();

    const history = useHistory();

    // const [role, setRole] = useState({ role: '', gain: 0 })

    const [reactionTime, setReactionTime] = useState(0);

    const [loading, setLoading] = useState(false)

    const [disabled, setDisabled] = useState(false)

    const [game, setGame] = useState(false)

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
        button_position: [],
        button_role: []
    })

    const timer = useRef();

    useEffect(() => {

        // console.log(`Receveur (${cond_change}) : ${getCurrentTrialCondition(condition_receveur, cond_change)}`);

        // const index = Math.floor(Math.random() * trial_receveur_global.length);
        
        // const item = trial_receveur_global.length !== 0 ?
        //     trial_receveur_global[index] : trial_global[Math.floor(Math.random() * trial_global.length)];
        
        const index = getCurrentTrialCondition(condition_receveur, cond_change) === 'condition 1' ? Math.floor(Math.random() * trial_condition_1.length) : Math.floor(Math.random() * trial_condition_2.length)

        const item = getCurrentTrialCondition(condition_receveur, cond_change) === 'condition 1' ?
            trial_condition_1.length !== 0 ? trial_condition_1[index] : trial_global[Math.floor(Math.random() * trial_global.length)]
            : 
            trial_condition_2.length !== 0 ? trial_condition_2[index] : trial_global[Math.floor(Math.random() * trial_global.length)]

        setTrialList({ trials: getCurrentTrialCondition(condition_receveur, cond_change) === 'condition 1' ? trial_condition_1 : trial_condition_2, index: index })

        if (item.choix_commander === true) {
            setTrial({
                ...trial,
                id_trial: item.id_trial,
                role: role_global,
                tracking: { x: 0, y: 0 },
                tracking_choix: { x: 0, y: 0 },
                proposition_proposeur: item.proposition_proposeur,
                proposition_receveur: item.proposition_receveur,
                choix_commander: item.choix_commander,
                gain_user: item.proposition_receveur,
            });
        } else {
            setTrial({
                ...trial,
                id_trial: item.id_trial,
                role: role_global,
                tracking: { x: 0, y: 0 },
                tracking_choix: { x: 0, y: 0 },
                proposition_proposeur: item.proposition_proposeur,
                proposition_receveur: item.proposition_receveur,
                choix_commander: item.choix_commander,
                gain_user: 0,
            });
        }

        // setRole({
        //     role: role_global,
        //     gain: gain_global
        // });

    }, [role_global]);

    const [open, setOpen] = useState({
        chargement: true,
        role: false,
    })

    const [player, setPlayer] = useState({
        proposeur: false,
        commandeur: false,
    });

    const handleClick = () => {
        const d1 = new Date();
        const end = d1.getTime();

        // add ici
        trialList.trials.splice(trialList.index, 1);

        update_list_trial_receveur({condition1: getCurrentTrialCondition(condition_receveur, cond_change) === 'condition 1' ? trialList.trials : trial_condition_1, condition2: getCurrentTrialCondition(condition_receveur, cond_change) === 'condition 2' ? trialList.trials : trial_condition_2})

        setLoading(true);
        setDisabled(true);

        timer.current = setTimeout(() => {
            setLoading(false);
            setDisabled(false);

            update_current_trial({ ...trial, condition: getCurrentTrialCondition(condition_receveur, cond_change),time: end - reactionTime });
            update_receveur();
            if (nb_trial_global % 4 === 0) {
                history.push('Role');
            } else {
                history.push('Continuer');
            }
        }, 1000);
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    };

    const timetochange = getRandomArbitrary(2500, 4500);

    const proposeurtimetochange = getRandomArbitrary(1000, 2000);

    useEffect(() => {
        timer.current = setTimeout(() => {
            setPlayer({
                ...player,
                proposeur: true
            });
        }, (timetochange - proposeurtimetochange));

        timer.current = setTimeout(() => {
            setPlayer({
                proposeur: true,
                commandeur: true
            });
        }, timetochange);

        timer.current = setTimeout(() => {
            setOpen({
                ...open,
                chargement: false
            });

            setGame(true);

            const d = new Date();

            const start = d.getTime();

            setReactionTime(start)
        }, timetochange + 2500);
    }, []);

    if (nb_trial_global === 116)
        return <Redirect to='/Assumption' />

    return (
        <div className={style.root}>
            <div className={style.container} style={{ opacity: game ? 1 : 0 }}>
                <div className={style.reponse}>
                    <FabRole name={'Proposeur'} margin={10}/>
                    <p>{region_global === 'fr' ? "L'offre du Proposeur" : "L'offerta del Proponente"} :</p>
                </div>
                <div className={style.sommes}>
                    <div>
                        {region_global === 'fr' ? "Proposeur" : "Proponente"} : {trial.proposition_proposeur}€
                    </div>
                    <div>
                        {region_global === 'fr' ? "Receveur" : "Ricevente"} : {trial.proposition_receveur}€
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
                </div>
                <div className={style.reponse}>
                    <FabRole name={'Commandeur'} margin={10}/>
                    <p>{region_global === 'fr' ? "Le Commandeur a" : "Il Committente ha"} :</p>
                    <div className={style.chip} style={{ background: trial.choix_commander ? theme.palette.primary.main : theme.palette.error.main }}>
                        {trial.choix_commander ? <CheckCircleOutlineIcon fontSize='default' style={{ color: 'white' }} /> : <HighlightOffIcon fontSize='large' style={{ color: 'white' }} />}
                        {region_global === 'fr' ? (
                            <p>{trial.choix_commander ? 'Accepté' : 'Refusé'}</p>
                        ) : (
                            <p>{trial.choix_commander ? 'Accettato' : 'Rifiutato'}</p>
                        )}
                    </div>
                    <p style={{ marginLeft: 10 }}>{region_global === 'fr' ? "la proposition" : "la proposta"}.</p>
                </div>
                <WaitPlayer
                    open={open.chargement}
                    proposeur={player.proposeur}
                    commandeur={player.commandeur}
                    offre={trial.proposition_proposeur}
                    accept={trial.choix_commander}
                    time_1={timetochange - proposeurtimetochange}
                    time_2={timetochange - (timetochange - proposeurtimetochange)}
                />
                {/* <Dialog
                    open={open.chargement}
                >
                    <DialogTitle>{region_global === 'fr' ? "En attente des autres joueurs..." : "In attesa di degli altri giocatori..."}</DialogTitle>
                    <DialogContent>
                        <div className={style.player}>
                            <LinearProgress color="primary" size={20} />
                            <div className={style.playertext}>
                                <Typography variant='h4'>{region_global === 'fr' ? "En attente de l'action de chaque joueur" : "Aspettando l'azione di tutti i giocatori"}</Typography>
                            </div>
                            <div className={style.playerinfo}>
                                <div className={style.playerContainer}>
                                    <div className={style.playerWrapper}>
                                        {player.proposeur ? <CheckCircleOutlineIcon color='primary' fontSize='large' /> : <HighlightOffIcon fontSize='large' color='disabled' />}
                                        <Chip
                                            variant="outlined"
                                            label={region_global === 'fr' ? 'Proposeur' : 'Proponente'}
                                            avatar={<Avatar>P</Avatar>}
                                            color={player.proposeur ? 'primary' : 'default'}
                                        />
                                    </div>
                                    <div className={style.playerWrapper}>
                                        {player.commandeur ? <CheckCircleOutlineIcon color='primary' fontSize='large' /> : <HighlightOffIcon fontSize='large' color='disabled' />}
                                        <Chip
                                            variant="outlined"
                                            label={region_global === 'fr' ? 'Commandeur' : 'Committente'}
                                            avatar={<Avatar>C</Avatar>}
                                            color={player.commandeur ? 'primary' : 'default'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog> */}
                <div className={style.footer}>
                    <Button color='primary' variant='contained' disabled={!game || disabled} onClick={handleClick}>
                        {region_global === 'fr' ? "Tour suivant" : "Prossimo Turno"}
                    </Button>
                    {loading && <div className={style.progressBar}><CircularProgress size={24} /></div>}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    role_global: state.role.role,
    gain_global: state.role.gain,
    subject_id_global: state.role.subject_id,
    trial_global: state.trials.trial,
    // trial_receveur_global: state.trials.trial_receveur,
    trial_condition_1: state.trials.trial_receveur_condition_1,
    trial_condition_2: state.trials.trial_receveur_condition_2,
    condition_receveur: state.nbTrials.receveur_cond,
    cond_change: state.nbTrials.receveur,
    nb_trial_global: state.trialsRecord.nb_trial,
    region_global: state.langue.region
})

export default connect(mapStateToProps, { update_current_trial, update_receveur, update_list_trial_receveur })(Receveur)