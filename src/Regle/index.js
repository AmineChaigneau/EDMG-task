import { useState, useRef, useEffect } from 'react'
import { Stepper, Step, StepLabel, StepContent, Typography, Button, Checkbox, CircularProgress } from "@material-ui/core"
import { useHistory } from 'react-router-dom'
import style from './index.module.css'
import Informations from "./Component/informations";
import Deroulement from "./Component/deroulement";
import Roles from "./Component/roles";
import RolesDeux from "./Component/rolesdeux";
import MaximumRegle from "./Component/maximumregle";
import { connect } from 'react-redux'
import { update_subject_id } from '../Redux/Actions/role'

// function getSteps() {
//     return ['Informations générales', "Rôle(s) - partie 1", 'Rôle(s) - partie 2', 'Déroulement du jeu', 'Avant de commencer..']
// }

function getStepContent(step) {
    switch (step) {
        case 0:
            return <Informations />;
        case 1:
            return <Roles />;
        case 2:
            return <RolesDeux />;
        case 3:
            return <Deroulement />;
        case 4:
            return <MaximumRegle />;
        default:
            return 'Unknown step';
    }
}

const Regle = ({ subject_id_global, update_subject_id, region_global }) => {

    function getSteps() {
        return region_global === 'fr' ? ['Informations générales', "Rôle(s) - partie 1", 'Rôle(s) - partie 2', 'Déroulement du jeu', 'Avant de commencer..'] : ['Informazioni generali', "Ruoli - parte 1", 'Ruoli - parte 2', 'Come cambiare Ruolo', 'Prima di iniziare...']
    }

    const timer = useRef();

    const [activeStep, setActiveStep] = useState(0);

    const [checked, setChecked] = useState(false);

    const [loading, setLoading] = useState(false);

    const [sujetID, setSujetID] = useState(0);

    const steps = getSteps();

    const history = useHistory();

    useEffect(() => {
        setSujetID({ subject_id: subject_id_global})
    }, [subject_id_global])

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleDialog = () => {
        setLoading(true);
        timer.current = setTimeout(() => {
            update_subject_id(sujetID)
            history.push('/Training');
        }, 1500);     
    };

    return (
        <div className={style.root}>
            <Stepper activeStep={activeStep} orientation="vertical" style={{ width: '100%' }}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>
                            <Typography variant='h5'>{label}</Typography>
                        </StepLabel>
                        <StepContent>
                            <div className={style.container}>
                                {getStepContent(index)}
                            </div>
                            <div className={style.input}>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    style={{ marginRight: 5 }}
                                >
                                    {region_global === 'fr' ? "Retour" : "Indietro"}
                                    </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    disabled={activeStep === steps.length - 1 ? true : false}
                                    style={{ opacity: activeStep === steps.length - 1 ? 0 : 1 }}
                                >
                                    {region_global === 'fr' ? activeStep === steps.length - 1 ? '' : 'Suivant': activeStep === steps.length - 1 ? '' : 'Continua'}
                                </Button>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            <div className={style.validation}>
                <div className={style.check}>
                    <Checkbox checked={checked} onChange={handleChange} color='primary' />
                    <Typography>
                        {region_global === 'fr' ? "J'ai compris bien compris l'ensemble des règles du jeu et je souhaite passer à la phase d'entraînement" : "Ho capito tutte le regole del gioco e vorrei passare alla fase di prova"}
                    </Typography>
                </div>
                <div className={style.buttonWrapper}>
                    <Button
                        variant='contained'
                        color="primary"
                        disabled={!loading ? activeStep === steps.length - 1 && checked === true ? false : true : true}
                        onClick={handleDialog}
                    >
                        {region_global === 'fr' ? "Débuter l'entraînement" : "Iniziare la prova"}
                    </Button>
                    {loading && <div className={style.progressBar}><CircularProgress size={24} /></div>}
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    subject_id_global: state.currentTrial.subject_id,
    region_global: state.langue.region
})


export default connect(mapStateToProps, { update_subject_id })(Regle)