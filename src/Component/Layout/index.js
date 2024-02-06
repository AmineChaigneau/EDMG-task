import React, { useEffect, useState, useRef } from 'react'
import { Button, Typography, Avatar, makeStyles, Fab, Dialog, DialogContent, Divider, DialogTitle, CircularProgress } from '@material-ui/core'
import { grey } from '@material-ui/core/colors';
import style from './index.module.css'
import { useHistory, useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import { ReactComponent as Argent } from '../../Ressources/argent.svg'
import { resetStore } from '../../Redux/Actions/reset'
import { record_location } from '../../Redux/Actions/langue'
import { FabRole, ChipRole } from '../FabRole';

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

function Layout({ children, title, nb_trial_global, role_global, gain_global, resetStore, region_global, record_location }) {

    const timer = useRef();

    const history = useHistory();

    const location = useLocation();

    const path = ['/Regle', '/Consigne', '/Maia', '/End', '/Continuer', '/EndScreen', '/Max', '/regle', '/consigne', '/maia', '/end', '/continuer', '/endScreen', '/max', '/Endscreen', '/Assumption', '/assumption', '/Training', '/training']

    const [role, setRole] = useState({ role: '', gain: 0 })

    const [isInfoGame, setIsInfoGame] = useState(true);

    const [openLeave, setOpenLeave] = useState(false);

    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);

    const classes = useStyles();

    function handleClick() {
        setOpenLeave(true)
    }

    function handleLeave() {
        setLoading(true)
        timer.current = setTimeout(() => {
            setOpenLeave(false)
            setLoading(false)
            resetStore()
            history.push('/')
        }, 1000);
    }

    useEffect(() => {
        record_location(location.pathname)
        if (path.indexOf(location.pathname) > -1) {
            return setIsInfoGame(false);
        } else {
            return null
        }
    }, [location])

    useEffect(() => {
        const role_state = region_global === 'fr' ? role_global : role_global === "Receveur" ? "Ricevente" : role_global === "Commandeur" ? 'Committente' : 'Proponente'
        setRole({
            role: role_state,
            gain: gain_global
        });
    }, [role_global, gain_global])

    const handleInfo = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    // if(!isAuthenticated)
    //     return <Redirect to='/'/>;

    return (
        <div>
            <nav className={style.header}>
                <div className={style.title}>
                    <Typography variant='h5' style={{ color: 'rgb(175, 175, 175)' }}>
                        {region_global === 'fr' ? (
                            <>{title}</>
                        ) : (
                            <>{title === 'Receveur' ? 'Ricevente' : title === 'Proposeur' ? 'Proponente' : title === 'Commandeur' ? 'Committente' : title}</>
                        )}
                    </Typography>
                    <div className={style.avatar}>{nb_trial_global}</div>
                </div>
                <Button onClick={handleClick} variant='contained' color='secondary'>{region_global === 'fr' ? 'Quitter' : 'Uscita'}</Button>
            </nav>
            <Dialog open={openLeave} onClose={() => setOpenLeave(false)}>
                <DialogContent>
                    <div className={style.dialogContainer}>
                        <Typography>{region_global === 'fr' ? 'Êtes-vous sûr de vouloir quitter le jeu ? Vous ne pourrez pas reprendre le jeu où vous vous êtes arrêté' : "Sei sicuro di voler lasciare il gioco? Non sarai in grado di riprendere il gioco da dove l'hai lasciato"}.</Typography>
                    </div>
                    <div className={style.dialogFooter}>
                        <Button onClick={handleLeave} disabled={loading} variant='contained' color='secondary'>{region_global === 'fr' ? 'Quitter' : 'Uscita'}</Button>
                        {loading && <div className={style.progressBar}><CircularProgress size={24} /></div>}
                    </div>
                </DialogContent>
            </Dialog>
            {isInfoGame &&
                <div className={style.infoGame} style={{ opacity: location.pathname === '/Calibration' ? 0 : 1 }}>
                    <div className={style.roleheader}>
                        <Typography>{region_global === 'fr' ? "Votre rôle :" : "Il tuo ruolo :"}</Typography>
                        {/* <Chip style={{ marginLeft: 5, background: '#D25CC0', color: 'white' }} label={role.role} avatar={<Avatar>{role.role[0]}</Avatar>} /> */}
                        <ChipRole name={role_global} label={role.role} margin={5} />
                    </div>
                    <div className={style.roleheader}>
                        <Argent />
                        <Avatar style={{ marginLeft: 8 }} className={classes.avatarcolor}><Typography>{role.gain}</Typography></Avatar>
                    </div>
                </div>
            }
            <div className={style.main}>
                {children}
                <div className={style.fab}>
                    {isInfoGame && <Fab style={{ display: location.pathname === '/Calibration' ? 'none' : '' }} size="medium" color="secondary" onClick={handleInfo}>?</Fab>}
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>
                            {region_global === 'fr' ? 'Informations - Rôle' : 'Informazioni - Ruolo'}
                        </DialogTitle>
                        <DialogContent>
                            {region_global === 'fr' ? (
                                <div className={style.infoContainer}>
                                    <div className={style.boxRole} style={{ background: role_global === 'Proposeur' && 'rgb(76, 175, 80, 0.5)' }}>
                                        <FabRole name={'Proposeur'} margin={5} />
                                        <div className={style.infoRole}>
                                            <Typography variant='h4'><strong>Proposeur</strong></Typography>
                                            <Typography>Il a la possibilité de choisir comment <strong>répartir la somme</strong> entre lui-même et le receveur.</Typography>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div className={style.boxRole} style={{ background: role_global === 'Commandeur' && 'rgb(76, 175, 80, 0.5)' }}>
                                        <FabRole name={'Commandeur'} margin={5} />
                                        <div className={style.infoRole}>
                                            <Typography variant='h4'><strong>Commandeur</strong></Typography>
                                            <Typography>Il a la possibilité <strong>d’approuver ou de refuser la proposition de répartition</strong> faite par le Proposeur. Si la proposition est acceptée, le Proposeur et le Receveur reçoivent leur gain. Le Commandeur quant à lui ne reçoit aucun gain.</Typography>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div className={style.boxRole} style={{ background: role_global === 'Receveur' && 'rgb(76, 175, 80, 0.5)' }}>
                                        <FabRole name={'Receveur'} margin={5} />
                                        <div className={style.infoRole}>
                                            <Typography variant='h4'><strong>Receveur</strong></Typography>
                                            <Typography>Le Receveur <strong>gagne une somme d’argent</strong> en fonction de la proposition du Proposant et si le Commandeur approuve la distribution.</Typography>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={style.infoContainer}>
                                    <div className={style.boxRole} style={{ background: role_global === 'Proposeur' && 'rgb(76, 175, 80, 0.5)' }}>
                                        <FabRole name={'Proposeur'} margin={5} />
                                        <div className={style.infoRole}>
                                            <Typography variant='h4'><strong>Proponente</strong></Typography>
                                            <Typography>Ha la possibilità di scegliere come <strong>distribuire la somma</strong> tra lui e il Ricevente.Ha la possibilità di scegliere come <strong>distribuire la somma</strong> tra lui e il Ricevente.</Typography>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div className={style.boxRole} style={{ background: role_global === 'Commandeur' && 'rgb(76, 175, 80, 0.5)' }}>
                                        <FabRole name={'Commandeur'} margin={5} />
                                        <div className={style.infoRole}>
                                            <Typography variant='h4'><strong>Committente</strong></Typography>
                                            <Typography>Ha la possibilità di approvare o rifiutare la proposta di distribuzione fatta dal Proponente. Se la proprosta viene accettata, il Proponente e il Ricevente incassano il denaro. Quanto al Committente, lui non riceve denaro.</Typography>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div className={style.boxRole} style={{ background: role_global === 'Receveur' && 'rgb(76, 175, 80, 0.5)' }}>
                                        <FabRole name={'Receveur'} margin={5} />
                                        <div className={style.infoRole}>
                                            <Typography variant='h4'><strong>Ricevente</strong></Typography>
                                            <Typography>Il Ricevente <strong>guadagna una somma di denaro</strong> a seconda della proposta del Proponenete e se il Committente approva la ripartizione.</Typography>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    nb_trial_global: state.trialsRecord.nb_trial,
    role_global: state.role.role,
    gain_global: state.role.gain,
    region_global: state.langue.region
});

export default connect(mapStateToProps, { resetStore, record_location })(Layout);