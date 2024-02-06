import { useState, useEffect } from 'react'
import style from './index.module.css'
import { connect } from 'react-redux'
import Proposeur from './Component/proposeur'
import Commandeur from './Component/commandeur'
import Receveur from './Component/receveur'
import { FabRole, ChipRole } from '../Component/FabRole'
import { useHistory } from 'react-router-dom'
import { Button, Dialog, DialogContent, Typography } from '@material-ui/core'
import { ReactComponent as Argent } from '../Ressources/argent.svg'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { post_calibration } from '../Redux/Actions/calibration'

function getStepContent(step, pull) {
    switch (step) {
        case 0:
            return <Proposeur stateChanger={pull} />;
        case 1:
            return <Commandeur stateChanger={pull} />;
        case 2:
            return <Receveur stateChanger={pull} />;
        default:
            return 'Unknown step';
    }
}

const Arrow = () => {

    return (
        <div className={style.arrowContainer}>
            <div className={style.arrow}>
                <svg width="100" height="24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M99.0607 13.0607C99.6464 12.4749 99.6464 11.5251 99.0607 10.9393L89.5147 1.3934C88.9289 0.807612 87.9792 0.807612 87.3934 1.3934C86.8076 1.97918 86.8076 2.92893 87.3934 3.51472L95.8787 12L87.3934 20.4853C86.8076 21.0711 86.8076 22.0208 87.3934 22.6066C87.9792 23.1924 88.9289 23.1924 89.5147 22.6066L99.0607 13.0607ZM0 13.5H98V10.5H0V13.5Z" fill="black" />
                </svg>
            </div>
        </div>
    )
}

const Training = ({ region_global, post_calibration, nb_calibration_global, calibration_global, subject_id_global, calibration_button_global }) => {

    const history = useHistory();

    const [activeStep, setActiveStep] = useState(0);

    const [training, setTraining] = useState(0)

    const [open, setOpen] = useState(true)

    const steps = ['Proposeur', "Commandeur", 'Receveur']

    const label = region_global === 'fr' ? ['Proposeur', "Commandeur", 'Receveur'] : ['Proponente', "Committente", 'Ricevente']

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const recordCalibration = () => {
        post_calibration(subject_id_global, nb_calibration_global, calibration_global, calibration_button_global)
    }

    useEffect(() => {
        training === 5 && handleNext();
        training === 15 && handleNext();
        training === 16 && recordCalibration();
        training === 20 && history.push('Max');
    }, [training])

    return (
        <div className={style.root}>
            <Dialog open={open}>
                <DialogContent>
                    <div className={style.paragraphe}>
                        {region_global === 'fr' ? (
                            <Typography>Vous avez maintenant la possibilité de vous <strong>familiariser avec l'interface des trois rôles</strong>. Il s'agit de la phase d’entraînement.</Typography>
                        ) : (
                            <Typography>Ora hai l'opportunità di <strong>familiarizzare con l'interfaccia dei tre ruoli</strong>. Questa è la fase di formazione.</Typography>
                        )}
                    </div>
                    <div className={style.playerinfo}>
                        <div className={style.roleContainer}>
                            <FabRole name={'Proposeur'} />
                            <div className={style.proposeur}>
                                <Argent />
                            </div>
                        </div>
                        <Arrow />
                        <div className={style.roleContainer}>
                            <FabRole name={'Commandeur'} />
                            <div className={style.proposeur}>
                                <HighlightOffIcon style={{ color: '#CFCFCF' }} />
                                <CheckCircleOutlineIcon style={{ color: '#CFCFCF' }} />
                            </div>
                        </div>
                        <Arrow />
                        <div className={style.roleContainer}>
                            <FabRole name={'Receveur'} />
                        </div>
                    </div>
                    <div className={style.dialogFooter}>
                        <Button variant='outlined' color='primary' onClick={() => setOpen(false)}>{region_global === 'fr' ? "Continuer" : "Continuare"}</Button>
                    </div>
                </DialogContent>
            </Dialog>
            <div className={style.title}>
                <ChipRole name={steps[activeStep]} label={label[activeStep]} />
            </div>
            <div className={style.container}>
                {getStepContent(activeStep, setTraining)}
            </div>
            <div className={style.training}>
                <div className={style.trial}>
                    {training}/20
                </div>
                <Typography style={{ color: 'red', fontWeight: 500 }}>Training session</Typography>
            </div>
            {/* <Proposeur stateChanger={setTraining}/> */}
        </div>
    )
}

const mapStateToProps = state => ({
    region_global: state.langue.region,
    subject_id_global: state.currentTrial.subject_id,
    nb_calibration_global: state.calibration.nb_calibration,
    calibration_global: state.calibration.calibration,
    calibration_button_global: state.calibration.calibration_button
})

export default connect(mapStateToProps, { post_calibration })(Training)