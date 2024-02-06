import { useState, useEffect } from 'react'
import style from './commandeur.module.css'
import { Typography, Slider, Button, withStyles, makeStyles, Dialog, DialogContent } from '@material-ui/core'
import { connect } from 'react-redux'
import AddIcon from '@material-ui/icons/Add';
import { grey } from '@material-ui/core/colors';
import { showNotification } from '../../Redux/Actions/notification'
import { ReactComponent as Arrow } from './arrow.svg'
import { FabRole } from '../../Component/FabRole';
import { useMousePosition, useBbox } from '../../hook'
import { add_calibration, update_calibration_button } from '../../Redux/Actions/calibration'
import right from './commandeur_r_fleche.gif'
import right_it from './commandeur_r_fleche.gif'
import left from './commandeur_l_fleche.gif'
import left_it from './commandeur_l_fleche.gif'

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

const Commandeur = ({ add_calibration, update_calibration_button, region_global, showNotification, stateChanger, ...rest }) => {

    const classes = useStyles();

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    };

    const [bbox1, ref1] = useBbox();

    const [bbox2, ref2] = useBbox();

    const [value, setValue] = useState(Math.round(getRandomArbitrary(0, 10)))

    const [disabled, setDisabled] = useState(true)

    const [nbtrial, setNbtrial] = useState(5);

    const [tracking, setTracking] = useState(false)

    const [openBreak, setOpenBreak] = useState(false)

    const [openFirst, setOpenFirst] = useState(true)

    const [tracker, setTracker] = useState([])

    const handleClick = () => {
        setDisabled(false)
        setNbtrial(nbtrial + 1)
        setTracking(true)
    }

    const handleChooseLeft = () => {
        setDisabled(true)
        setTracking(false)
        setValue(Math.round(getRandomArbitrary(0, 10)))
        const text = region_global === 'fr' ? `La proposition a été acceptée` : `La proposta è stata accettata`
        showNotification(text, 'success');
        stateChanger(nbtrial)
        add_calibration(tracker);
        nbtrial === 10 && setOpenBreak(true);
    }

    const handleChooseRight = () => {
        setDisabled(true)
        setTracking(false)
        setValue(Math.round(getRandomArbitrary(0, 10)))
        const text = region_global === 'fr' ? `La proposition a été refusée` : `La proposta è stata rifiutata`
        showNotification(text, 'success');
        stateChanger(nbtrial)
        add_calibration(tracker);
    }

    const recordCalibration = () => {
        // post_calibration(subject_id_global, nb_calibration_global, calibration_global, [{ x: bbox1.x, y: bbox1.y, width: bbox1.width, height: bbox1.height }, { x: bbox2.x, y: bbox2.y, width: bbox2.width, height: bbox2.height }])
        update_calibration_button([{ x: bbox1.x, y: bbox1.y, width: bbox1.width, height: bbox1.height }, { x: bbox2.x, y: bbox2.y, width: bbox2.width, height: bbox2.height }])
    }

    useEffect(() => {
        nbtrial === 15 && recordCalibration();
    }, [nbtrial])

    return (
        <div className={style.root}>
            <div className={style.reponse}>
                <div className={style.arrowChoiceLeft} style={{ opacity: disabled || nbtrial >= 11 ? 0 : 1 }}>
                    <div className={style.arrow}>
                        <Arrow />
                        <Arrow />
                    </div>
                </div>
                <div className={style.arrowChoiceRight} style={{ opacity: disabled || nbtrial <= 10 ? 0 : 1 }}>
                    <div className={style.arrow}>
                        <Arrow />
                        <Arrow />
                    </div>
                </div>
                <Button ref={ref1} variant='contained' color='primary' style={{ width: 180, padding: 15, height: 70, marginLeft: 20 }} disabled={disabled || nbtrial >= 11} onClick={handleChooseLeft}>
                    {region_global === 'fr' ? 'Accepter' : 'Accetta'}
                </Button>
                <Button ref={ref2} variant='contained' color='primary' style={{ width: 180, padding: 15, height: 70, marginRight: 20 }} disabled={disabled || nbtrial <= 10} onClick={handleChooseRight}>
                    {region_global === 'fr' ? 'Refuser' : 'Rifiuta'}
                </Button>
            </div>
            <div className={style.container}>
                <div className={style.sommes}>
                    <div>
                        <FabRole name={'Proposeur'} margin={10} />{region_global === 'fr' ? "Proposeur" : "Proponente"} {value}€
                    </div>
                    <div>
                        <FabRole name={'Receveur'} margin={10} />{region_global === 'fr' ? "Receveur" : "Ricevente"} {10 - value}€
                    </div>
                </div>
                <div className={style.slider}>
                    <SliderStyled
                        className={classes.thumb}
                        disabled={true}
                        value={value}
                        min={0}
                        max={10}
                    />
                    <div className={style.middle}>
                        <p><i>{region_global === 'fr' ? 'Veuillez répondre le plus rapidement et précisément possible' : 'Siete pregati di rispondere velocemente e in modo preciso'}</i></p>
                    </div>
                </div>
            </div>
            <div className={style.footer}>
                <div className={style.arrowButton} style={{ opacity: disabled ? 1 : 0 }}>
                    <div className={style.arrow}>
                        <Arrow />
                        <Arrow />
                    </div>
                </div>
                <Button variant='outlined' onClick={handleClick} disabled={!disabled}><AddIcon /></Button>
                {region_global === 'fr' ? <Typography>Cliquez ici au dessus avant de faire votre choix</Typography> : <Typography>Clicca qui sopra prima di fare la tua scelta</Typography>}
            </div>
            {tracking ? <Tracker stateChanger={setTracker} /> : null}
            <Dialog open={openFirst}>
                <DialogContent>
                    <div className={style.dialogImage}>
                        <img src={region_global === 'fr' ? left : left_it} alt='' />
                    </div>
                    <div className={style.paragraphe}>
                        {region_global === 'fr' ? (
                            <Typography>Le bouton activé pour la première partie de l'entraînement est positionné <strong>en haut à gauche</strong> de votre écran</Typography>
                        ) : (
                            <Typography>Per la prima parte della pratica, l'offerta è ora posizionata <strong>in alto a sinistra</strong> del tuo schermo</Typography>)}.
                    </div>
                    <div className={style.dialogFooter}>
                        <Button variant='outlined' color='primary' onClick={() => setOpenFirst(false)}>{region_global === 'fr' ? "Continuer" : "Continuare"}</Button>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={openBreak}>
                <DialogContent>
                    <div className={style.dialogImage}>
                        <img src={region_global === 'fr' ? right : right_it} alt='' />
                    </div>
                    <div className={style.paragraphe}>
                        {region_global === 'fr' ? (
                            <Typography>Le bouton activé est maintenant positionné <strong>en haut à droite</strong> de votre écran</Typography>
                        ) : (
                            <Typography>L'offerta è ora posizionata <strong>in alto a destra</strong> del tuo schermo</Typography>)}.
                    </div>
                    <div className={style.dialogFooter}>
                        <Button variant='outlined' color='primary' onClick={() => setOpenBreak(false)}>{region_global === 'fr' ? "Continuer" : "Continuare"}</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

const mapStateToProps = state => ({
    region_global: state.langue.region
})

export default connect(mapStateToProps, { add_calibration, update_calibration_button, showNotification })(Commandeur)