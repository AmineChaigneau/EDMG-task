import { useEffect, useState, useCallback, useRef } from 'react'
import { Dialog, DialogContent, DialogTitle, LinearProgress, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import style from './WaitPlayer.module.css'
import { ReactComponent as Argent } from '../Ressources/argent.svg'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const Arrow = ({ done, time }) => {

    const timer = useRef();

    const [blink, setBlink] = useState(false)

    const blinkMode = useCallback(() => {

        timer.current = setTimeout(() => {
            setBlink(true)
            timer.current = setTimeout(() => {
                setBlink(false)
            }, time)
        }, 1000)
    },
        [done, setBlink, timer, time]
    )

    useEffect(() => {
        !done && blinkMode();
    }, [done, blinkMode])

    return (
        <div className={style.arrowContainer}>
            <div className={blink ? style.blink : style.arrow}>
                <svg width="100" height="24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M99.0607 13.0607C99.6464 12.4749 99.6464 11.5251 99.0607 10.9393L89.5147 1.3934C88.9289 0.807612 87.9792 0.807612 87.3934 1.3934C86.8076 1.97918 86.8076 2.92893 87.3934 3.51472L95.8787 12L87.3934 20.4853C86.8076 21.0711 86.8076 22.0208 87.3934 22.6066C87.9792 23.1924 88.9289 23.1924 89.5147 22.6066L99.0607 13.0607ZM0 13.5H98V10.5H0V13.5Z" fill="black" />
                </svg>
            </div>
        </div>
    )
}


const Role = ({ name, bg, done, completed }) => {
    return (
        <>
            {completed ? (
                <>
                    <div className={style.fabNoAnim}>
                        <div className={style.fab} style={{ background: bg }}>
                            {name[0]}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {done ? (
                        <div
                            className={style.fabAnim}
                            style={{
                                background: `linear-gradient(to right, ${bg} 50%, #CFCFCF 0)`,
                                backgroundSize: '200% 100%',
                                backgroundPosition: 'right'
                            }}>
                            <div className={style.fab}>
                                {name[0]}
                            </div>
                        </div>
                    ) : (
                        <div className={style.fabNoAnim}>
                            <div className={style.fab}>
                                {name[0]}
                            </div>
                        </div>
                    )}
                </>
            )
            }
        </>
    )
}


const Waitforplayer = ({
    open,
    region_global,
    proposeur,
    commandeur,
    receveur,
    offre,
    accept,
    time_1,
    time_2,
    completed,
    commandeur_completed
}) => {

    return (
        <Dialog open={open}>
            <DialogTitle>{region_global === 'fr' ? "En attente des autres joueurs..." : "In attesa di altri giocatori..."}</DialogTitle>
            <DialogContent>
                <div className={style.player}>
                    <LinearProgress color="primary" size={20} />
                    <div className={style.playertext}>
                        <Typography variant='h4'>{region_global === 'fr' ? "En attente de l'action de chaque joueur" : "Aspettando l'azione degli altri giocatori"}</Typography>
                    </div>
                    <div className={style.playerinfo}>
                        <div className={style.roleContainer}>
                            <Role name={'Proposeur'} bg={'#FAD129'} done={proposeur} completed={completed} />
                            <div className={style.proposeur}>
                                <Typography className={proposeur ? style.passivText : style.activeText}>{proposeur ? offre : 0}€</Typography><Argent /><Typography className={proposeur ? style.passivText : style.activeText}>{proposeur ? 10 - offre : 0}€</Typography>
                            </div>
                        </div>
                        <Arrow done={proposeur} time={time_1} />
                        <div className={style.roleContainer}>
                            <Role name={'Commandeur'} bg={'#D25CC0'} done={commandeur} completed={commandeur_completed} />
                            <div className={style.commandeur}>
                                <HighlightOffIcon style={{ color: commandeur ? accept ? '#CFCFCF' : 'red' : '#CFCFCF', transition: '3s ease-in-out' }} />
                                <CheckCircleOutlineIcon style={{ color: commandeur ? accept ? 'green' : '#CFCFCF' : '#CFCFCF', transition: '3s ease-in-out' }} />
                            </div>
                        </div>
                        {!commandeur_completed && <Arrow done={!proposeur || commandeur} time={time_2} />}
                        {commandeur_completed && <Arrow done={receveur} time={time_2} />}

                        <div className={style.roleContainer}>
                            <Role name={'Receveur'} bg={'#FD932E'} done={receveur} />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

const mapStateToProps = state => ({
    region_global: state.langue.region
})

export default connect(mapStateToProps)(Waitforplayer)