import { useState } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, Typography, DialogActions } from '@material-ui/core'
import { connect } from 'react-redux'

const Comite = ({ region_global }) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant='outlined'
                color='primary'
                onClick={handleClickOpen}
            >
                {region_global === 'fr' ? 'Consulter' : 'Consultare'}
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Study description / Ethics Committee
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        The research protocol was approved by the Institutional Review Board of Psychology (IRBP) of the Department of Psychological, Health and Territorial Sciences at
                        G. d Annunzio University of Chieti-Pescara (protocol number: 22001; date of approval: 8 April 2022).
                    </Typography>
                    <Typography style={{ marginTop: 10, marginBottom: 10 }}><b>1. TRATTAMENTO</b></Typography>
                    <Typography gutterBottom>
                        This research aims to apply a social network perspective to the study of perceptions of the value attributed to the need for power (nPwr), in particular perceptions of power among actors that facilitate or hinder collaboration (Passiglione et al., 2007). Following Marsden and Friedkin's (1993) studies, we attempt to clarify the substantive processes underlying the claim that 'networked interaction' influences the perception of the value attributed to personal power. We make the hypothesis that subjects will adapt their strategies to reach different level of power and reward during the game, i.e. they will actualize the value attributed to the need for power and reward during the game, depending on the different roles and conditions.
                    </Typography>
                    <Typography style={{ marginTop: 10, marginBottom: 10 }}><b>2. DESCRIZIONE FUNZIONALE</b></Typography>
                    <Typography gutterBottom>
                        Before starting the experiment, the subject will be asked to fill a series of questions. The subject can freely accept to fill in the information and to participate in the experiment. He can also decide to leave the experiment at any time. Specifically, the following measures are used: <br /><br />
                        - Demographic questionnaire: age, gender, nationality, educational attainment, job, country, region.
                        - Dominant hand (left or right), hand on the mouse.
                        - Assumption tests, after performed the experiment: visual analog scale about the perception of effort and power during the experiment.
                        - Request for permission to use anonymised data, awareness of the rules and the ethics committee.

                        After completing this form, the subject will have access to all the rules of the game (i.e. of the experiment). Many pictures and information about the game are available. After reading and accepting, the Subject will have the opportunity to discover all the interfaces of the game with a short training period. During the whole game he can decide to stop the experimentation
                    </Typography>
                    <Typography style={{ marginTop: 10, marginBottom: 10 }}><b>3. STUDIOSI COINVOLTI</b></Typography>
                    <Typography gutterBottom>
                        <b>Research’s Supervisors:</b>
                        <br />
                        - Prof. Riccardo Palumbo; +3908713556948; r.palumbo@unich.it; Dipartimento di Neuroscienze, Imaging e Scienze Cliniche, Università G. d’Annunzio di Chieti-Pescara; Via Luigi Polacchi, 11, 66100 Chieti. <br />
                        - Prof. Pierpaolo Iodice; +393385995969; pierpaolo.iodice@univ-rouen.fr ; Laboratoire CETAPS, 76130 Mont-Saint-Aignan, France.
                        <br />
                        <b>Experimenters:</b>
                        <br />
                        - Ph.D Student. Amine Chaigneau ; +33680386264; amine.chaigneau@etu.univ-rouen.fr; Laboratoire CETAPS, 76130 Mont-Saint-Aignan, France. ; Dipartimento di Neuroscienze, Imaging e Scienze Cliniche, Università G. d’Annunzio di Chieti-Pescara; Via Luigi Polacchi, 11, 66100 Chieti.
                    </Typography>
                    <Typography style={{ marginTop: 10, marginBottom: 10 }}><b>4. MODALITA' DI TRATTAMENTO: </b></Typography>
                    <Typography gutterBottom>
                        The software used to conduct this experiment (single and multi-player) is a PWA (progressive web application) developed entirely by the experimenter, from the user interface (UI) to the management of access and security of the database (API). You can find the user interface of the single player game at the following url : https://economic-game-task.herokuapp.com/ ;
                        All the data recorded in this experiment (trials results, clicks performance or mouse tracking) are entirely derived from our personal algorithms, and provided by the subject’s agreement.
                        <br /><br />
                        The server (API - only for post requests) is available at the following access point: https://economic-game-task-api.herokuapp.com/api/. The multiplayer experience is only available on a local environment for now. We used Heroku CLI to publish the online version of the API and user interface. Heroku is a container-based Platform as a Service (PaaS) that helps developers deploy, manage and scale modern applications. Heroku CLI and Heroku Postgres provide robust security features to secure data storage.
                        The server is based in Italy (choice available on the Heroku Europ platform).
                    </Typography>
                    <Typography style={{ marginTop: 10, marginBottom: 10 }}><b>5. PROCEDURA INFORMATICA: </b></Typography>
                    <Typography gutterBottom>
                        The data will be initially stored on the API (Heroku). They will be automatically deleted at the end of the experiment. At the same time, an automatic backup of the data is planned every week (during the experiment) on the computer of one of the researchers, in the .csv (Comma-separated values) data format. 
                        <br /><br />
                        The raw data will then be analyzed and processed via algorithms based on the statistical programming language R (programming language and free software for statistics and data science)
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const mapStateToProps = state => ({
    region_global: state.langue.region
});

export default connect(mapStateToProps)(Comite)

