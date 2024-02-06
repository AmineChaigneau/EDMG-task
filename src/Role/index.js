import { useState, useEffect, useCallback, useRef } from 'react'
import style from './index.module.css'
import { Typography, Button, Backdrop, CircularProgress } from '@material-ui/core'
import { useMousePosition, useBbox, getRandomArbitrary } from '../hook'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { update_current_choice, update_current_button_role } from '../Redux/Actions/current_trial'
import { update_role_button } from '../Redux/Actions/calibration'
import AddIcon from '@material-ui/icons/Add';

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

const Role = ({ update_current_choice, region_global, update_role_button, update_current_button_role }) => {

    const history = useHistory();

    const timer = useRef();

    const [disabled, setDisabled] = useState(true)

    const [tracking, setTracking] = useState(false)

    const [tracker, setTracker] = useState([])

    const [bbox1, ref1] = useBbox();

    const [bbox2, ref2] = useBbox();

    const [open, setOpen] = useState(true)

    const handleClick = () => {
        setDisabled(false)
        setTracking(true)
    }

    const handleRedirectCurrent = () => {
        history.push('/Handgrip');
        setTracking(false)
        update_current_choice({ tracking_choix: tracker, choix: false })
        update_current_button_role({ button_role: [{ x: bbox1.x, y: bbox1.y, width: bbox1.width, height: bbox1.height }, { x: bbox2.x, y: bbox2.y, width: bbox2.width, height: bbox2.height }] })
        update_role_button([{ x: bbox1.x, y: bbox1.y, width: bbox1.width, height: bbox1.height }, { x: bbox2.x, y: bbox2.y, width: bbox2.width, height: bbox2.height }])
        // save tracker data
    }

    const handleRedirectRole = () => {
        history.push('/Handgrip');
        setTracking(false)
        update_current_choice({ tracking_choix: tracker, choix: true })
        update_current_button_role({ button_role: [{ x: bbox1.x, y: bbox1.y, width: bbox1.width, height: bbox1.height }, { x: bbox2.x, y: bbox2.y, width: bbox2.width, height: bbox2.height }] })
        update_role_button([{ x: bbox1.x, y: bbox1.y, width: bbox1.width, height: bbox1.height }, { x: bbox2.x, y: bbox2.y, width: bbox2.width, height: bbox2.height }])
        // save tracker data
    }

    const closeBackdrop = useCallback(() => {
        timer.current = setTimeout(() => {
            setOpen(false)
        }, 1500)
    }, [timer, setOpen])

    useEffect(() => {
        closeBackdrop();
    }, [closeBackdrop])

    return (
        <div className={style.root}>
            <div className={style.header}>
                <Button ref={ref1} variant='contained' color='primary' style={{ width: 180, height: 70, padding: 15, color: disabled ? '#DFDFDF' : '' }} disabled={disabled} onClick={handleRedirectRole}>
                    {region_global === 'fr' ? 'Changer' : 'Cambiare'}
                </Button>
                <Button ref={ref2} variant='contained' color='primary' style={{ width: 180, height: 70, padding: 15, color: disabled ? '#DFDFDF' : '' }} disabled={disabled} onClick={handleRedirectCurrent}>
                    {/* {region_global === 'fr' ? 'Conserver' : 'Mantenere'} "{role_global}" */}
                    {region_global === 'fr' ? 'Conserver' : 'Mantenere'}
                </Button>
            </div>
            <div className={style.middle}>
                {region_global === 'fr' ? <p>Voulez vous <strong>changer de rôle</strong> dans le jeu ?</p> : <p>Vuoi <strong>cambiare ruolo</strong> nel Gioco?</p>}
                <p><i>{region_global === 'fr' ? 'Veuillez répondre le plus rapidement et précisément possible' : 'Siete pregati di rispondere velocemente e in modo preciso'}</i></p>
            </div>
            <div className={style.footer}>
                <Button variant='outlined' onClick={handleClick} disabled={!disabled}><AddIcon /></Button>
                {region_global === 'fr' ? (
                    <Typography>Cliquez ici au dessus avant de faire votre choix</Typography>
                ) : (
                    <Typography>Clicca qui sopra prima di fare la tua scelta</Typography>
                )}
                {/* <Button variant='outlined' onClick={handleClick} disabled={!disabled}>
                    {region_global === 'fr' ? 'Cliquez ici avant de faire votre choix' : 'Clicca qui prima di fare la tua scelta'}
                </Button> */}
            </div>
            {tracking ? <Tracker stateChanger={setTracker} /> : null}
            <Backdrop
                style={{ color: '#fff', zIndex: 1000 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

// update le choix

const mapStateToProps = state => ({
    role_global: state.role.role,
    region_global: state.langue.region
})

export default connect(mapStateToProps, { update_current_choice, update_role_button, update_current_button_role })(Role)