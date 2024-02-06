import { useState, useRef, useEffect, forwardRef } from 'react'
import { Avatar, Button, Chip, Typography, CircularProgress, DialogTitle, DialogContent, Dialog, Slide, LinearProgress, Paper } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import style from './index.module.css'
import { ReactComponent as Chrono } from './chrono.svg'
// import { ReactComponent as Mouse } from './mouse.svg'
import { update_current_role, update_max_arr } from '../Redux/Actions/role'
import { update_players_max } from '../Redux/Actions/players'
import { showNotification } from '../Redux/Actions/notification'
import { ChipRole } from '../Component/FabRole';
// import { ReactComponent as Mercury } from '../HandGrip/mercury.svg'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Timer = ({ seconds }) => {
    const [timeLeft, setTimeLeft] = useState(seconds);

    useEffect(() => {
        if (!timeLeft) return;

        const intervalId = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);

    }, [timeLeft]);

    return (
        <div className={style.time}>
            <p>{timeLeft}s</p>
        </div>
    );
};

const Mouse = () => {

    return (
        <svg width="205" height="333" viewBox="0 0 205 333" fill="none" xmlns="http://www.w3.org/2000/svg" id={style.mouselayout}>
            <g>
                <g>
                    <path d="M204.6 224.2L196.6 80.9C194 35.5 156.5 0 111.1 0H96.3001V12H96.4001V51.6C96.4001 54.8 98.9001 57.5 102.1 57.6H102.2C102.3 57.6 102.3 57.6 102.4 57.6C102.5 57.6 102.5 57.6 102.6 57.6C105.8 57.5 108.4 54.8 108.4 51.6V12H111.1C150.1 12 182.4 42.5 184.6 81.5L187 124.1C171.5 137 142.1 145.3 108.4 146.1V119C108.4 115.8 105.8 113.1 102.6 113C102.5 113 102.5 113 102.4 113C102.3 113 102.3 113 102.2 113H102.1C98.9001 113.1 96.4001 115.8 96.4001 119V146.2C62.7001 145.3 33.3001 137.1 17.8001 124.1L6.30007 115.6L0.200072 224.2C-1.39993 252.6 8.50007 279.6 28.0001 300.2C47.5001 320.8 73.9001 332.2 102.4 332.2C130.9 332.2 157.2 320.8 176.8 300.2C196.3 279.6 206.1 252.5 204.6 224.2ZM168 292C150.8 310.2 127.4 320.3 102.3 320.3C77.2001 320.3 54.0001 310.2 36.7001 292C19.5001 273.8 10.7001 249.9 12.1001 224.9L16.9001 138.5C36.5001 151.1 67.3001 158.4 102.3 158.4C137.3 158.4 168.1 151.1 187.7 138.5L192.5 224.9C194 249.9 185.3 273.7 168 292Z" fill="black" />
                </g>
                <g>
                    <path id={style.clic} d="M96.3 0V12H93.7C54.7 12 22.4 42.5 20.2 81.5L17.8 124.1L6.30005 115.6L8.30005 80.8C9.40005 58.2 19.5 38 34.8 23.4C50.1 8.8 71 0 93.7 0H96.3Z" fill='black' />
                </g>
                <path d="M104.6 125H102.1C91.2 125 82.3 116.1 82.3 105.2V65.4C82.3 54.5 91.2 45.6 102.1 45.6H104.6C115.5 45.6 124.4 54.5 124.4 65.4V105.2C124.4 116.1 115.6 125 104.6 125ZM102.1 57.6C97.8 57.6 94.3 61.1 94.3 65.4V105.2C94.3 109.5 97.8 113 102.1 113H104.6C108.9 113 112.4 109.5 112.4 105.2V65.4C112.4 61.1 108.9 57.6 104.6 57.6C104.6 57.6 102.1 57.6 102.1 57.6Z" fill="#4caf50" />
            </g>
        </svg>

    )
}

const MaxForce = ({ role_global, gain_global, update_current_role, showNotification, update_players_max, region_global, update_max_arr }) => {

    const timer = useRef();

    const history = useHistory();

    const [count, setCount] = useState(0);

    const [disabled, setDisabled] = useState(true);

    const [open, setOpen] = useState(false);

    const [openBefore, setOpenBefore] = useState(true);

    const [loading, setLoading] = useState(false);

    const [dialogLoading, setDialogLoading] = useState(false);

    const [chrono, setChrono] = useState(false);

    const [index, setIndex] = useState(0)

    const [max, setMax] = useState({ max1: 0, max2: 0, max3: 0 })
    //
    const [waitforplayer, setwWaitforplayer] = useState(false);

    const [playerstate, setPlayerstate] = useState(false);

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    };

    const randomPlayer = (timetochange) => {

        timer.current = setTimeout(() => {
            setPlayerstate(true);
        }, timetochange);

    }
    //
    const handleClick = () => {
        setCount(count + 1)
        setChrono(true)

        if (count === 1) {
            timer.current = setTimeout(() => {
                setDisabled(true)
                setIndex(index + 1)
            }, 5050);
        }
    }

    useEffect(() => {
        if (index === 1) return setMax({ ...max, max1: count })
        if (index === 2) return setMax({ ...max, max2: count })
        if (index === 3) return setMax({ ...max, max3: count })
    }, [index]);

    useEffect(() => {
        timer.current = setTimeout(() => {
            setDisabled(false);
            setCount(0);
            setChrono(false)
        }, 1000);
    }, [index])

    const HandleRedirect = () => {

        // const maxObj = Math.round((max.max1 + max.max2 + max.max3) / 3)

        const arr = [max.max1, max.max2, max.max3]
        const maxObj = Math.max(...arr)

        const playersMax = { joueur1: Math.round(maxObj * getRandomArbitrary(0.8, 1.3)), joueur2: Math.round(maxObj * getRandomArbitrary(0.8, 1.3)) }

        const update = { role: role_global, maximum: maxObj + 5, gain: gain_global }

        setLoading(true);
        timer.current = setTimeout(() => {
            const timetochange = getRandomArbitrary(3000, 5000)
            setLoading(true);

            timer.current = setTimeout(() => {
                setLoading(false);
                setwWaitforplayer(true);
            }, 1700);

            randomPlayer(timetochange);

            timer.current = setTimeout(() => {
                setOpen(true)
            }, timetochange + 2200);

            update_current_role(update)
            update_players_max(playersMax)
            update_max_arr(max)

            const text = region_global === 'fr' ? `Performance enregistrée. Félicitation votre référence est de ${maxObj} clics` : `Prestazioni registrate. Congratulazioni il tuo riferimento è di ${maxObj} clic`

            showNotification(text, 'success');
        }, 1000);
    }

    const redirectToReceveur = () => {
        setDialogLoading(true)
        timer.current = setTimeout(() => {
            history.push('/Receveur');
        }, 1000);
    }

    return (
        <div className={style.root}>
            <Dialog open={openBefore}>
                <DialogContent>
                    <div className={style.icon}>
                        <Mouse />
                    </div>
                    <div className={style.paragraphe}>
                        {region_global === 'fr' ? (
                            <>
                                <Typography>L'objectif est d'effectuer le plus de clics possible en 5 secondes.</Typography>
                                <Typography>Vous allez maintenant, avoir trois essais pour tester vos capacités de performance. Le joueur qui <strong>aura fait le plus de clics</strong> (lors des trois tentatives) gagnera <strong>une récompense</strong>.</Typography>
                            </>
                        ) : (
                            <>
                                <Typography>L'obiettivo è quello di ottenere il maggior numero di clic possibile in 5 secondi.</Typography>
                                <Typography>Avrai tre tentativi per testare le tue capacità di performance. Il giocatore che <strong>avrà fatto più clic</strong> (durante i tre tentativi) vincerà <strong>un premio</strong>.</Typography>
                            </>)}
                    </div>
                    <div className={style.dialogFooter}>
                        <Button variant='outlined' color='primary' onClick={() => setOpenBefore(false)}>{region_global === 'fr' ? "Continuer" : "Continuare"}</Button>
                    </div>
                </DialogContent>
            </Dialog>
            <div className={style.header}>
                <Typography variant='h5'>{region_global === 'fr' ? `Enregistrement du nombre maximal de clics en 5 secondes (essai n°${index + 1})` : `Registrazione del numero massimo di clic in 5 secondi (test n.${index + 1})`}</Typography>
            </div>
            <div className={style.container}>
                <div className={style.essai}>
                    <Chip variant='outlined' color={index >= 1 ? 'primary' : 'default'} label={region_global === 'fr' ? 'Premier essai' : 'Primo test'} avatar={<Avatar>{max.max1}</Avatar>} />
                    <Chip variant='outlined' color={index >= 2 ? 'primary' : 'default'} label={region_global === 'fr' ? 'Deuxième essai' : 'Secondo test'} avatar={<Avatar>{max.max2}</Avatar>} />
                    <Chip variant='outlined' color={index >= 3 ? 'primary' : 'default'} label={region_global === 'fr' ? 'Troisième essai' : 'Terzo test'} avatar={<Avatar>{max.max3}</Avatar>} />
                </div>
                <div className={style.joueurContainer}>
                    <div className={style.svgContainer}>
                        <svg width="86" height="214" viewBox="0 0 86 214" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M85 168.793C85 180.718 80.5547 191.894 72.4903 200.271C64.5675 208.495 54.1191 213 43.006 213C42.8053 213 42.6047 213 42.4041 212.996C40.626 212.967 38.8675 212.826 37.1288 212.565C28.2461 211.248 19.9928 206.959 13.4823 200.172C5.70109 192.064 1.27155 181.298 1.01192 169.865C0.661805 154.371 8.04568 139.849 20.3823 131.538V24.8095C20.3823 13.8282 27.479 4.56108 37.1012 1.82402C38.9816 1.28571 40.9603 1 43.002 1C55.4724 1 65.6218 11.6791 65.6218 24.8095V131.538C77.6161 139.629 85 153.737 85 168.793Z" fill="#E9F5FF" stroke="black" strokeWidth="2" />
                            <path d="M37.6382 201.565L37.6403 201.565C39.2428 201.825 40.8735 201.974 42.5236 201.996C42.6768 202 42.8276 202 42.9664 202H42.9732C51.7158 202 59.9461 198.659 66.1663 192.567C72.5061 186.364 76 178.076 76 169.242C76 157.632 69.717 146.787 59.6113 140.925L59.6109 140.925C57.0536 139.444 55.4617 136.69 55.4617 133.756V25.3777C55.4617 18.5466 49.8675 13 43.0024 13C40.9665 13 39.0395 13.4852 37.3377 14.3544C33.3093 16.4033 30.5389 20.573 30.5389 25.3777V133.756C30.5389 136.69 28.9471 139.444 26.3897 140.925L26.3893 140.925C16.0048 146.949 9.72537 158.103 10.0092 170.043L10.0092 170.043C10.2115 178.504 13.7024 186.478 19.8205 192.487C24.7525 197.335 30.9516 200.468 37.6382 201.565Z" fill={index === 3 ? "#4caf50" : "#FF6E6E"} stroke="black" strokeWidth="2" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M48.5 15.5001L50.5 54.5001L48 88.5001C48 88.5001 46.5 130 48 135.5C49.0681 139.417 51.911 142.826 55.987 147.714C57.635 149.691 59.4846 151.909 61.5 154.5C68.5 163.5 71 177 61.5 185.5C56.453 190.016 45.6199 192.556 36.4982 194.695C33.1292 195.485 29.9937 196.22 27.4693 196.98C30.6759 198.764 34.1639 199.982 37.8001 200.578C39.3591 200.83 40.9431 200.975 42.5439 200.996C42.6856 201 42.8273 201 42.9732 201C51.4562 201 59.4347 197.761 65.4666 191.852C71.6152 185.837 75 177.806 75 169.242C75 157.992 68.9098 147.475 59.1096 141.79C56.2458 140.131 54.4617 137.049 54.4617 133.756V25.3778C54.4617 21.0979 52.0685 17.3612 48.5404 15.4192L48.5 15.5001Z" fill={index === 3 ? "#388e3c" : "#CA4A4A"} />
                        </svg>
                        <div className={style.levelup}>
                            <svg width="86" height={index === 3 ? 184 - (Math.round((max.max1 + max.max2 + max.max3) / 3) * (150 / Math.round((max.max1 + max.max2 + max.max3) / 3))) : 184 - (count * (150 / 40))} fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="levelup">
                                    <path d="M75 169.242C75 177.806 71.6152 185.837 65.4666 191.852C59.4347 197.76 51.4562 201 42.9732 201C42.8273 201 42.6856 201 42.5439 200.996C40.9431 200.975 39.3591 200.83 37.8001 200.578C31.318 199.515 25.307 196.478 20.5215 191.774C14.5855 185.944 11.2049 178.216 11.0089 170.02C10.7338 158.447 16.8199 147.632 26.891 141.79C29.7548 140.131 31.5389 137.049 31.5389 133.756V25.3777C31.5389 20.9673 34.0817 17.132 37.7917 15.2453C39.3549 14.4468 41.1266 14 43.0024 14C49.3219 14 54.4617 19.1055 54.4617 25.3777V133.756C54.4617 137.049 56.2458 140.131 59.1096 141.79C68.9098 147.475 75 157.992 75 169.242Z" fill="#4F667A" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M48.5 15.5L50.5 54.5L48 88.5C48 88.5 46.5 130 48 135.5C49.0681 139.417 51.911 142.826 55.987 147.714C57.635 149.691 59.4846 151.909 61.5 154.5C68.5 163.5 71 177 61.5 185.5C56.4529 190.016 45.6199 192.556 36.4981 194.695C33.1292 195.485 29.9937 196.22 27.4693 196.98C30.6759 198.764 34.1638 199.982 37.8 200.578C39.3591 200.83 40.9431 200.975 42.5438 200.996C42.6855 201 42.8273 201 42.9732 201C51.4561 201 59.4347 197.76 65.4665 191.852C71.6151 185.837 75 177.806 75 169.242C75 157.992 68.9097 147.475 59.1095 141.79C56.2458 140.131 54.4616 137.049 54.4616 133.756V25.3777C54.4616 21.0979 52.0685 17.3612 48.5404 15.4192L48.5 15.5Z" fill="#425463" />
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div className={style.chronoContainer}>
                        <div className={style.chrono}>
                            <Chrono />
                            {chrono ?
                                (<Timer seconds={5} />) : (<div className={style.time}><p>0s</p></div>)
                            }
                        </div>
                    </div>
                </div>
                <div className={style.test}>
                    <div className={style.title}>{region_global === 'fr' ? <Typography>L'objectif est de faire le <strong>maximum</strong> de clics dans le carré vert.</Typography> : <Typography>Provi a fare <strong>più clic</strong> possibili all'interno del rettangolo verde nel tempo previsto (5 secondi).</Typography>}</div>
                    {region_global === 'fr' ? (
                        <Typography style={{ marginBottom: 10 }}><strong>Le chronomètre</strong> démarre au <strong style={{ color: 'red' }}>premier clic</strong>.</Typography>
                    ) : (
                        <Typography style={{ marginBottom: 10 }}><strong>Il timer</strong> parte al <strong style={{ color: 'red' }}>primo clic</strong>.</Typography>
                    )}
                    <Button variant='outlined' color='primary' onClick={handleClick} disabled={disabled || index === 3 ? true : false} style={{ padding: 20, width: 200, fontSize: 15 }}>
                        {count}
                    </Button>
                </div>
            </div>
            <Dialog open={index === 3 && !waitforplayer}>
                <div className={style.containerWait}>
                    {region_global === 'fr' ? (
                        <>{index === 3 && <Typography variant={'h3'}>Attendez le <strong style={{ color: 'red' }}>FEU VERT</strong> de l'experimentateur avant de cliquer sur le boutton</Typography>}</>
                    ) : (
                        <>{index === 3 && <Typography variant={'h3'}>Attendere <strong style={{ color: 'red' }}>l'autorizzazione</strong> dello sperimentatore prima di fare clic sul pulsante</Typography>}</>
                    )}
                    <div className={style.footer}>
                        <Button variant='contained' color='primary' onClick={HandleRedirect} disabled={loading ? true : index === 3 ? false : true}>{region_global === 'fr' ? "Continuer" : "Continuare"}</Button>
                        {loading && <div className={style.progressBar}><CircularProgress size={24} /></div>}
                    </div>
                </div>
            </Dialog>
            <Dialog
                open={waitforplayer}
                // open={true}
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogTitle>{region_global === 'fr' ? "Chargement..." : "Caricamento..."}</DialogTitle>
                <DialogContent>
                    <div className={style.player}>
                        <LinearProgress color="primary" size={20} variant={playerstate ? "determinate" : "indeterminate"} value={100} />
                        <div className={style.playertext}>
                            <Typography variant='h4'>{region_global === 'fr' ? "En attente des autres joueurs..." : "In attesa di altri giocatori..."}</Typography>
                        </div>
                        <div className={style.playerinfo}>
                            <Chip
                                variant="outlined"
                                label={region_global === 'fr' ? 'Joueur 1' : 'Giocatore 1'}
                                icon={<DoneIcon />}
                            />
                            <Chip
                                variant="outlined"
                                label={region_global === 'fr' ? 'Joueur 2' : 'Giocatore 2'}
                                icon={playerstate ? <DoneIcon /> : <ClearIcon />}
                            />
                        </div>
                        {playerstate &&
                            <Paper>
                                <div className={style.paperContainer}>
                                    <CircularProgress size={24} />
                                    {region_global === 'fr' ?
                                        <Typography variant='h2' style={{ marginLeft: 10 }}>Tirage au sort des <strong>rôles</strong></Typography> :
                                        <Typography variant='h2' style={{ marginLeft: 10 }}>Estrazione dei <strong>ruoli</strong></Typography>
                                    }
                                </div>
                            </Paper>
                        }
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog
                open={open}
                TransitionComponent={Transition}
            >
                <DialogContent>
                    <div>
                        <div className={style.dialogHeader}>
                            <Typography variant='h4'>{region_global === 'fr' ? 'Votre nouveau rôle est :' : 'Il tuo nuovo ruolo è :'}</Typography>
                        </div>
                        <div className={style.dialogContent}>
                            <ChipRole name={'Receveur'} label={region_global === 'fr' ? 'Receveur' : 'Ricevente'} />
                            {/* <Chip label={region_global === 'fr' ? 'Receveur' : 'Ricevente'} variant='outlined' color='primary' avatar={<Avatar>R</Avatar>} /> */}
                            <div className={style.continuer}>
                                <Button variant='contained' color='secondary' disabled={dialogLoading} onClick={redirectToReceveur}>{region_global === 'fr' ? "Commencer le jeu" : "Iniziare il gioco"}</Button>
                                {dialogLoading && <div className={style.progressBar}><CircularProgress color="primary" size={20} /></div>}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

const mapStateToProps = state => ({
    role_global: state.role.role,
    gain_global: state.role.gain,
    region_global: state.langue.region
})


export default connect(mapStateToProps, { update_current_role, showNotification, update_players_max, update_max_arr })(MaxForce)