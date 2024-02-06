import { useState, useRef } from 'react'
import style from './proposeur.module.css'
import { connect } from 'react-redux'
import { Slider, withStyles, CircularProgress, Typography, Button, Backdrop } from '@material-ui/core'
import { showNotification } from '../../Redux/Actions/notification'
import { ReactComponent as Arrow } from './arrow.svg'
import { FabRole } from '../../Component/FabRole'
import AddIcon from '@material-ui/icons/Add';

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
        marginLeft: 0,
        pointerEvents: 'all'
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

const Proposeur = ({ region_global, showNotification, stateChanger, ...rest }) => {

    const timer = useRef();

    const [value, setValue] = useState(5);

    const [offer, setOffer] = useState(true);

    const [loading, setLoading] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    const [slider, setSlider] = useState(false);

    const [nbtrial, setNbtrial] = useState(0);

    const [loadingProposeur, setLoadingProposeur] = useState(false);

    const [disabled, setDisabled] = useState(true);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        !offer && setOffer(true)
        !slider && setSlider(true)
    }

    const handleStartTracking = () => {
        setDisabled(false)
        setLoadingProposeur(true)
        setOffer(false)
        setNbtrial(nbtrial + 1)
        
        timer.current = setTimeout(() => {
            setLoadingProposeur(false)
        }, 1000)
    }

    const handleClick = () => {
        setLoading(true)
        timer.current = setTimeout(() => {
            setLoading(false)
            setOffer(true)
            setDisabled(true)
            const text = region_global === 'fr' ? `La proposition a été transmise (Vous: ${value} ; Receveur : ${10 - value})` : `La proposta è stata inviata (Tu: ${value} ; Ricevente: ${10 - value})`
            showNotification(text, 'success');
            setValue(5)
            stateChanger(nbtrial)
            nbtrial !== 5 && setBackdrop(true)
            timer.current = setTimeout(() => {
                nbtrial !== 5 && setBackdrop(false)
            }, 1000)
        }, 1000)
    }

    return (
        <div className={style.root}>
            <div className={style.container}>
                <div className={style.sommes}>
                    <div>
                        <FabRole name={'Proposeur'} margin={10} /> {region_global === 'fr' ? "Proposeur" : "Proponente"} : {!disabled && value}€
                    </div>
                    <div>
                        <FabRole name={'Receveur'} margin={10} />{region_global === 'fr' ? "Receveur" : "Ricevente"} : {!disabled &&  10 - value}€
                    </div>
                </div>
                <div className={style.slider}>
                    <div className={style.arrowSlider} style={{ opacity: !slider && !disabled ? 1 : 0 }}>
                        <div className={style.arrow}>
                            <Arrow />
                            <Arrow />
                        </div>
                    </div>
                    <SliderStyled
                        value={value}
                        onChange={handleSliderChange}
                        min={0}
                        max={10}
                        disabled={disabled}
                    />
                </div>
                <div className={style.footer}>
                    {region_global === 'fr' ? <Typography><strong>Proposer</strong> la répartition aux autres joueurs.</Typography> : <Typography><strong>Suggerisci</strong> la divisione agli altri giocatori.</Typography>}
                    <div className={style.buttonWrapper}>
                        {disabled ?
                            (
                                <div style={{ display: 'flex', justifyContent: 'center', padding: 15, width: 150 }}>
                                    <Button variant='outlined' onClick={handleStartTracking}><AddIcon /></Button>
                                </div>
                            ) : (
                                <Button color='primary' variant='contained' disabled={loading || loadingProposeur} onClick={handleClick} style={{ padding: 15, width: 150 }}>
                                    {region_global === 'fr' ? 'Proposer' : 'Invia'}
                                </Button>
                            )
                        }
                        {loading && <div className={style.progressBar}><CircularProgress size={24} /></div>}
                        {loadingProposeur && <div className={style.progressBar}><CircularProgress size={24} /></div>}
                        <div className={style.arrowButton} style={{ opacity: offer ? 1 : 0 }}>
                            <div className={style.arrow}>
                                <Arrow />
                                <Arrow />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Backdrop
                style={{ color: '#fff', zIndex: 1000 }}
                open={backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

const mapStateToProps = state => ({
    region_global: state.langue.region
})

export default connect(mapStateToProps, { showNotification })(Proposeur)