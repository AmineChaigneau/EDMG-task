import { useState, useEffect, useRef } from 'react'
import style from './receveur.module.css'
import { Slider, Button, withStyles, makeStyles, CircularProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import { grey } from '@material-ui/core/colors';
import { showNotification } from '../../Redux/Actions/notification'
import { ReactComponent as Arrow } from './arrow.svg'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import theme from '../../theme'
import { FabRole } from '../../Component/FabRole';

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

const Receveur = ({ region_global, showNotification, stateChanger, ...rest }) => {

    const timer = useRef();

    const classes = useStyles();

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    };

    const [value, setValue] = useState(Math.round(getRandomArbitrary(0, 10)))

    const [trial, setTrial] = useState(true)

    const [loading, setLoading] = useState(false)

    const [nbtrial, setNbtrial] = useState(16);

    useEffect(() => {
        getRandomArbitrary(0, 50) > 25 ? setTrial(true) : setTrial(false)
    }, [])

    const handleClick = () => {
        setLoading(true)
        timer.current = setTimeout(() => {
            setLoading(false)
            setValue(Math.round(getRandomArbitrary(0, 10)))
            const text = region_global === 'fr' ? `Passage à l'étape suivante` : `Passare alla fase successiva`
            showNotification(text, 'success');
            setNbtrial(nbtrial+1)
            stateChanger(nbtrial)
        }, 1000)
    }

    return (
        <div className={style.root}>
            <div className={style.container}>
                <div className={style.reponse}>
                    <FabRole name={'Proposeur'} margin={10} />
                    <p>{region_global === 'fr' ? "L'offre du Proposeur" : "L'offerta del Proponente"} :</p>
                </div>
                <div className={style.sommes}>
                    <div>
                        {region_global === 'fr' ? "Proposeur" : "Proponente"} : {value}€
                    </div>
                    <div>
                        {region_global === 'fr' ? "Receveur" : "Ricevente"} : {10 - value}€
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
                </div>
                <div className={style.reponse}>
                    <FabRole name={'Commandeur'} margin={10} />
                    <p>{region_global === 'fr' ? "Le Commandeur a" : "Il Committente ha"} :</p>
                    <div className={style.chip} style={{ background: trial ? theme.palette.primary.main : theme.palette.error.main }}>
                        {trial ? <CheckCircleOutlineIcon fontSize='default' style={{ color: 'white' }} /> : <HighlightOffIcon fontSize='large' style={{ color: 'white' }} />}
                        {region_global === 'fr' ? (
                            <p>{trial ? 'Accepté' : 'Refusé'}</p>
                        ) : (
                            <p>{trial ? 'Accettato' : 'Rifiutato'}</p>
                        )}
                    </div>
                    <p style={{ marginLeft: 10 }}>{region_global === 'fr' ? "la proposition" : "la proposta"}.</p>
                </div>
                <div className={style.footer}>
                    <div className={style.arrowButton}>
                        <div className={style.arrow}>
                            <Arrow />
                            <Arrow />
                        </div>
                    </div>
                    <Button color='primary' variant='contained' disabled={loading} onClick={handleClick}>
                        {region_global === 'fr' ? "Tour suivant" : "Prossimo Turno"}
                    </Button>
                    {loading && <div className={style.progressBar}><CircularProgress size={24} /></div>}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    region_global: state.langue.region
})

export default connect(mapStateToProps, { showNotification })(Receveur)