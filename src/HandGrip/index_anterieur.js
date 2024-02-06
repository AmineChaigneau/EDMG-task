import { useState, useRef, useEffect } from 'react'
import style from './index.module.css'
import { Typography, Button, CircularProgress, Dialog, DialogContent, LinearProgress, Avatar, Chip } from '@material-ui/core'
import { Redirect, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReactComponent as Chrono } from '../MaxForce/chrono.svg'
import { update_current_role } from '../Redux/Actions/role'
import { record_trial } from '../Redux/Actions/trials_record'
import { post_current_trial, reload_count_up } from '../Redux/Actions/current_trial'
import { getRandomArbitrary } from '../hook'
import { isMobile } from "react-device-detect";
import { ReactComponent as Mercury } from './mercury.svg'
import { ReactComponent as MercuryDone } from './mercurydone.svg'
import { showNotification } from '../Redux/Actions/notification'
// On phone : Button clique 
// On PC : HanGrip view

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


const Handgrip = ({ role_global, id_trial_global, choix_global, max_global, gain_global, update_current_role, state_global, record_trial, post_current_trial, nb_role_trial_global, region_global, showNotification, reload_count_up }) => {

    const timer = useRef();

    const history = useHistory();

    const [trial, setTrial] = useState(null);
    // UseState
    // joueurs  
    const [joueursValues, setJoueursValues] = useState({
        resultat1: 0,
        resultat2: 0,
        changement1: false,
        changement2: false
    })

    const [role, setRole] = useState({ joueur1: '', joueur2: '' })

    const [newRole, setNewRole] = useState('test')

    const [newRoleDisplay, setNewRoleDisplay] = useState('')

    const [roleValue, setRoleValue] = useState({ role1: 0, role2: 0 })

    // count
    const [count, setCount] = useState(0);

    const [start, setStart] = useState(0);

    const [chrono, setChrono] = useState(false);

    const [disabled, setDisabled] = useState(false);

    const [joueurDisplay, setJoueurDisplay] = useState(false);

    const [loading, setLoading] = useState({ role1: false, role2: false, all: false, keep: false, tricheur: false })

    const [dynaCount, setDynaCount] = useState([
        {
            count: 1,
            time: 0
        }
    ])

    const [open, setOpen] = useState(false)

    const [tricheur, setTricheur] = useState(false)

    const timetochange = getRandomArbitrary(2000, 3500);

    // UseEffect
    useEffect(() => {
        const array = ['Commandeur', 'Proposeur', 'Receveur']
        const nb_trial = [nb_role_trial_global.commandeur, nb_role_trial_global.proposeur, nb_role_trial_global.receveur]
        const item = array.indexOf(role_global);
        if (item > -1) {
            array.splice(item, 1);
            nb_trial.splice(item, 1)
        }
        // Identifier les deux roles restant, et choisir la valeur la plus faible pour le newRole (tirage)
        if (nb_trial[0] > nb_trial[1]) {
            setNewRole(array[1])
        } else if (nb_trial[0] < nb_trial[1]) {
            setNewRole(array[0])
        } else {
            setNewRole(array[Math.floor(Math.random() * array.length)])
        }

        // Identifier si le nb_trial du role actuel en comparaison des autres
        const array_role = [nb_role_trial_global.commandeur, nb_role_trial_global.proposeur, nb_role_trial_global.receveur]
        setRoleValue({
            role1: array_role[item] - nb_trial[0],
            role2: array_role[item] - nb_trial[1],
        })

        setRole({ joueur1: array[0], joueur2: array[1] })
    }, [nb_role_trial_global.commandeur, nb_role_trial_global.proposeur, nb_role_trial_global.receveur])

    useEffect(() => {
        setTrial(state_global)
    }, [state_global])

    // Fonction 
    const handleClick = () => {

        const d1 = new Date();
        setCount(count + 1)
        setChrono(true)

        if (count !== 0) {
            setDynaCount([
                ...dynaCount,
                {
                    count: count + 1,
                    time: d1.getTime() - start
                }
            ])
        }

        if (count === 0) {
            const d = new Date();

            setStart(d.getTime())
        }

        if (count === 1) {
            timer.current = setTimeout(() => {
                setDisabled(true);
                timer.current = setTimeout(() => {
                    setJoueurDisplay(true);
                }, getRandomArbitrary(250, 1300))
            }, 5050);

        }
        setTrial({
            ...trial,
            testvalue: count,
            testdynamique: dynaCount
        })
    }

    useEffect(() => {
        if (joueurDisplay === true) {
            if (choix_global) {
                if (count > max_global * 0.55) {
                    if (roleValue.role1 <= -10 || roleValue.role2 <= -10) {
                        // 100% conserver
                        // console.log('100% conserver')
                        setJoueursValues({
                            ...joueursValues,
                            resultat1: Math.round(count + getRandomArbitrary(1, 6)),
                            resultat2: Math.round(count + getRandomArbitrary(1, 6))
                        })
                    } else if ((roleValue.role1 >= -5 && roleValue.role1 <= 5) || (roleValue.role2 >= -5 && roleValue.role2 <= 5)) {
                        // 60% changer
                        // console.log('60% changer')
                        setJoueursValues({
                            ...joueursValues,
                            resultat1: Math.round(count + getRandomArbitrary(-5, 3)),
                            resultat2: Math.round(count + getRandomArbitrary(-5, 3))
                        })
                    } else if ((roleValue.role1 > 5 && roleValue.role1 <= 10) || (roleValue.role2 > 5 && roleValue.role2 <= 10)) {
                        // 80% changer
                        // console.log('80% changer')
                        setJoueursValues({
                            ...joueursValues,
                            resultat1: Math.round(count + getRandomArbitrary(-6, 1)),
                            resultat2: Math.round(count + getRandomArbitrary(-7, 2))
                        })
                    } else {
                        // 100% changer
                        // console.log('100% changer')
                        setJoueursValues({
                            ...joueursValues,
                            resultat1: Math.round(count - getRandomArbitrary(1, 6)),
                            resultat2: Math.round(count - getRandomArbitrary(1, 6))
                        })
                    }
                } else {
                    // A VOIR ICI SI LE JOUEUR NE FAIT PAS UN SCORE SUFFISANT....
                    // setJoueursValues({
                    //     ...joueursValues,
                    //     resultat1: Math.round(max_global - getRandomArbitrary(-5, 5)),
                    //     resultat2: Math.round(max_global - getRandomArbitrary(-5, 5))
                    // })
                    timer.current = setTimeout(() => {
                        setTricheur(true)
                    }, 100)
                }
            } else {
                if (count > max_global * 0.55) {
                    if (roleValue.role1 >= 10 || roleValue.role2 >= 10) {
                        // 100% conserver
                        // console.log('100% changer')
                        setJoueursValues({
                            ...joueursValues,
                            resultat1: Math.round(count + getRandomArbitrary(1, 6)),
                            resultat2: Math.round(count + getRandomArbitrary(1, 6))
                        })
                    } else if ((roleValue.role1 >= -5 && roleValue.role1 <= 5) || (roleValue.role2 >= -5 && roleValue.role2 <= 5)) {
                        // 60% changer
                        // console.log('60% conserver')
                        setJoueursValues({
                            ...joueursValues,
                            resultat1: Math.round(count + getRandomArbitrary(-5, 3)),
                            resultat2: Math.round(count + getRandomArbitrary(-5, 3))
                        })
                    } else if ((roleValue.role1 < -5 && roleValue.role1 >= -10) || (roleValue.role2 < -5 && roleValue.role2 >= -10)) {
                        // 80% changer
                        // console.log('80% conserver')
                        setJoueursValues({
                            ...joueursValues,
                            resultat1: Math.round(count + getRandomArbitrary(-6, 2)),
                            resultat2: Math.round(count + getRandomArbitrary(-6, 2))
                        })
                    } else {
                        // 100% changer
                        // console.log('100% changer')
                        setJoueursValues({
                            ...joueursValues,
                            resultat1: Math.round(count - getRandomArbitrary(1, 6)),
                            resultat2: Math.round(count - getRandomArbitrary(1, 6))
                        })
                    }
                } else {
                    // A VOIR ICI SI LE JOUEUR NE FAIT PAS UN SCORE SUFFISANT....
                    // setJoueursValues({
                    //     ...joueursValues,
                    //     resultat1: Math.round(max_global + getRandomArbitrary(-5, 5)),
                    //     resultat2: Math.round(max_global + getRandomArbitrary(-5, 5))
                    // })
                    timer.current = setTimeout(() => {
                        setTricheur(true)
                    }, 100)
                }
            }
        }
    }, [joueurDisplay])

    useEffect(() => {
        const text_success = region_global === "fr" ? "Vous avez réalisé assez de clics." : "Avete fatto abbastanza clic.";
        const text_error = region_global === "fr" ? "Vous n'avez pas réalisé assez de clics." : "Non hai fatto abbastanza clic.";
        return (
            disabled ? joueursValues.resultat1 > count || joueursValues.resultat2 > count ? showNotification(text_error, 'error') : showNotification(text_success, 'success') : console.log('DontShowNotif')
        )
    }, [joueursValues])

    const handleKeepRole = () => {
        setLoading({ ...loading, keep: true })

        timer.current = setTimeout(() => {
            setLoading({ ...loading, keep: true })
            record_trial(trial)
            post_current_trial(trial)
            history.push(`/${role_global}`)
        }, 1000)
    }

    const handleChooseRole = () => {
        setLoading({ ...loading, keep: true })
        setNewRoleDisplay(region_global === 'fr' ? newRole : newRole === "Receveur" ? "Ricevente" : newRole === "Commandeur" ? 'Committente' : 'Proponente')

        const gain_trial = gain_global + trial.gain_user
        const update = { role: newRole, maximum: max_global, gain: gain_trial }

        timer.current = setTimeout(() => {
            setOpen(true)
            setLoading({ ...loading, keep: false, all: true })
        }, 1000)

        timer.current = setTimeout(() => {
            setLoading({ ...loading, all: false })
            record_trial(trial)
            post_current_trial(trial)
            update_current_role(update)
        }, timetochange)
    }

    const handleRedirect = () => {
        setLoading({ ...loading, role1: true })
        setDisabled(true)

        const gain_trial = gain_global + trial.gain_user
        const update = { role: role_global, maximum: max_global, gain: gain_trial }

        timer.current = setTimeout(() => {
            setLoading({ ...loading, role1: false })
            update_current_role(update)
            history.push(`/${newRole}`)
        }, 1000)
    }

    function refreshPage() {
        reload_count_up();
        setChrono(false)
        setCount(0)
        setDisabled(false)
        // window.location.reload(false);
        setJoueurDisplay(false);
        setDynaCount([{
            count: 1,
            time: 0
        }])
    }

    const handleReload = () => {
        setLoading({ ...loading, tricheur: true })
        timer.current = setTimeout(() => {
            setTricheur(false)
            setLoading({ ...loading, tricheur: false })
            refreshPage();
        }, 1000)
    }

    const rows = [
        {
            id: 1,
            joueur: region_global === 'fr' ? 'Joueur 1' : 'Giocatore 1',
            id_trial: id_trial_global,
            role: role.joueur1,
            roledisplay: region_global === 'fr' ? role.joueur1 : role.joueur1 === "Receveur" ? "Ricevente" : role.joueur1 === "Commandeur" ? 'Committente' : 'Proponente',
            choix: joueursValues.changement1, // ici mettre via le state redux du trial 
            resultat: joueursValues.resultat1, // pareil
        },
        {
            id: 2,
            joueur: region_global === 'fr' ? 'Joueur 2' : 'Giocatore 2',
            id_trial: id_trial_global,
            role: role.joueur2,
            roledisplay: region_global === 'fr' ? role.joueur2 : role.joueur2 === "Receveur" ? "Ricevente" : role.joueur2 === "Commandeur" ? 'Committente' : 'Proponente',
            choix: joueursValues.changement2, // ici mettre via le state redux du trial 
            resultat: joueursValues.resultat2
        }
    ]

    if (nb_role_trial_global.commandeur >= 50 && nb_role_trial_global.receveur >= 50 && nb_role_trial_global.proposeur >= 50)
        return <Redirect to='/End' />

    return (
        <div className={style.root}>
            {!isMobile &&
                <div className={style.header}>
                    <Typography variant='h4'>{region_global === 'fr' ? 'Interface de changement de Rôle' : 'Interfaccia per il cambio di ruolo'}</Typography>
                </div>
            }
            <div className={style.svgBox}>
                {rows.map((row, index) => (
                    <div className={style.joueurContainer} key={index}>
                        <div className={style.svgContainer} style={{ opacity: !joueurDisplay && 0.5, transition: '0.5s ease-in-out' }}>
                            <MercuryDone />
                            <div className={style.levelup}>
                                <svg width="86" height={184 - (row.resultat * (150 / (max_global + 5)))} fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="levelup">
                                        <path d="M75 169.242C75 177.806 71.6152 185.837 65.4666 191.852C59.4347 197.76 51.4562 201 42.9732 201C42.8273 201 42.6856 201 42.5439 200.996C40.9431 200.975 39.3591 200.83 37.8001 200.578C31.318 199.515 25.307 196.478 20.5215 191.774C14.5855 185.944 11.2049 178.216 11.0089 170.02C10.7338 158.447 16.8199 147.632 26.891 141.79C29.7548 140.131 31.5389 137.049 31.5389 133.756V25.3777C31.5389 20.9673 34.0817 17.132 37.7917 15.2453C39.3549 14.4468 41.1266 14 43.0024 14C49.3219 14 54.4617 19.1055 54.4617 25.3777V133.756C54.4617 137.049 56.2458 140.131 59.1096 141.79C68.9098 147.475 75 157.992 75 169.242Z" fill="#4F667A" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M48.5 15.5L50.5 54.5L48 88.5C48 88.5 46.5 130 48 135.5C49.0681 139.417 51.911 142.826 55.987 147.714C57.635 149.691 59.4846 151.909 61.5 154.5C68.5 163.5 71 177 61.5 185.5C56.4529 190.016 45.6199 192.556 36.4981 194.695C33.1292 195.485 29.9937 196.22 27.4693 196.98C30.6759 198.764 34.1638 199.982 37.8 200.578C39.3591 200.83 40.9431 200.975 42.5438 200.996C42.6855 201 42.8273 201 42.9732 201C51.4561 201 59.4347 197.76 65.4665 191.852C71.6151 185.837 75 177.806 75 169.242C75 157.992 68.9097 147.475 59.1095 141.79C56.2458 140.131 54.4616 137.049 54.4616 133.756V25.3777C54.4616 21.0979 52.0685 17.3612 48.5404 15.4192L48.5 15.5Z" fill="#425463" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                        {!joueurDisplay &&
                            <div className={style.svgLoading}>
                                <CircularProgress style={{ color: '#425463', zIndex: 10 }} />
                            </div>
                        }
                        {joueurDisplay ? (
                            <div className={style.joueurInfo}>
                                {row.joueur} - {row.resultat} {region_global === 'fr' ? 'clic(s)' : 'clic'}
                            </div>
                        ) : (
                            <div className={style.joueurInfo}>
                                {row.joueur} ({row.roledisplay})
                            </div>
                        )}
                        {/* <div className={style.joueurInfo}>
                            <Typography>{row.joueur} - Changement de rôle :</Typography>
                            {row.choix ? <DoneIcon /> : <ClearIcon />}
                        </div> */}
                    </div>
                ))}
                {/* SUJET EN DESSOUS */}
                <div className={style.joueurContainer} id={style.userSvg}>
                    <div className={style.svgContainer}>
                        <Mercury />
                        <div className={style.levelup}>
                            <svg width="86" height={184 - (count * (150 / (max_global + 5)))} fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="levelup">
                                    <path d="M75 169.242C75 177.806 71.6152 185.837 65.4666 191.852C59.4347 197.76 51.4562 201 42.9732 201C42.8273 201 42.6856 201 42.5439 200.996C40.9431 200.975 39.3591 200.83 37.8001 200.578C31.318 199.515 25.307 196.478 20.5215 191.774C14.5855 185.944 11.2049 178.216 11.0089 170.02C10.7338 158.447 16.8199 147.632 26.891 141.79C29.7548 140.131 31.5389 137.049 31.5389 133.756V25.3777C31.5389 20.9673 34.0817 17.132 37.7917 15.2453C39.3549 14.4468 41.1266 14 43.0024 14C49.3219 14 54.4617 19.1055 54.4617 25.3777V133.756C54.4617 137.049 56.2458 140.131 59.1096 141.79C68.9098 147.475 75 157.992 75 169.242Z" fill="#4F667A" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M48.5 15.5L50.5 54.5L48 88.5C48 88.5 46.5 130 48 135.5C49.0681 139.417 51.911 142.826 55.987 147.714C57.635 149.691 59.4846 151.909 61.5 154.5C68.5 163.5 71 177 61.5 185.5C56.4529 190.016 45.6199 192.556 36.4981 194.695C33.1292 195.485 29.9937 196.22 27.4693 196.98C30.6759 198.764 34.1638 199.982 37.8 200.578C39.3591 200.83 40.9431 200.975 42.5438 200.996C42.6855 201 42.8273 201 42.9732 201C51.4561 201 59.4347 197.76 65.4665 191.852C71.6151 185.837 75 177.806 75 169.242C75 157.992 68.9097 147.475 59.1095 141.79C56.2458 140.131 54.4616 137.049 54.4616 133.756V25.3777C54.4616 21.0979 52.0685 17.3612 48.5404 15.4192L48.5 15.5Z" fill="#425463" />
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div className={style.joueurInfo}>
                        <Typography><b>{region_global === 'fr' ? 'Vous' : 'Io'}</b> ({region_global === 'fr' ? role_global : role_global === "Receveur" ? "Ricevente" : role_global === "Commandeur" ? 'Committente' : 'Proponente'})</Typography>
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
            </div>
            <div className={style.test}>
                <div className={style.headertest}>
                    {region_global === 'fr' ? <Typography>Vous devez réaliser le <strong>maximum</strong> de clics pour {choix_global ? 'changer de rôle.' : 'conserver votre rôle'}</Typography> : <Typography>È necessario ottenere il <strong>maggior numero di clic</strong> possibile per {choix_global ? 'cambiare i ruoli.' : 'mantenere il suo ruolo.'}</Typography>}
                </div>
                <div className={style.feedback} style={{ opacity: joueurDisplay ? 1 : 0 }}>
                    {region_global === 'fr' ? (
                        <>
                            {choix_global ? (
                                <Typography>{joueursValues.resultat1 > count || joueursValues.resultat2 > count ? "Vous n'avez pas réalisé un effort assez important pour changer votre rôle." : 'Vous avez réalisé un effort assez important pour changer de rôle.'}</Typography>
                            ) : (
                                <Typography>{joueursValues.resultat1 > count || joueursValues.resultat2 > count ? "Vous n'avez pas réalisé un effort assez important pour conserver votre rôle." : 'Vous avez réalisé un effort assez important pour conserver votre rôle.'}</Typography>
                            )}
                        </>) : (<>
                            {choix_global ? (
                                <Typography>{joueursValues.resultat1 > count || joueursValues.resultat2 > count ? "Non hai fatto uno sforzo sufficiente per cambiare il tuo ruolo." : 'Hai fatto un grande sforzo per cambiare il tuo ruolo.'}</Typography>
                            ) : (
                                <Typography>{joueursValues.resultat1 > count || joueursValues.resultat2 > count ? "Non avete fatto uno sforzo sufficiente per mantenere il vostro ruolo." : 'Lei ha fatto un grande sforzo per mantenere il suo ruolo.'}</Typography>
                            )}
                        </>)}

                </div>
                {region_global === 'fr' ? (
                    <Typography style={{ marginBottom: 10 }}><strong>Le chronomètre</strong> démarre au <strong style={{ color: 'red' }}>premier clic</strong>.</Typography>
                ) : (
                    <Typography style={{ marginBottom: 10 }}><strong>Il timer</strong> parte al <strong style={{ color: 'red' }}>primo clic</strong>.</Typography>
                )}
                <Button variant='outlined' color='primary' onClick={handleClick} disabled={disabled} style={{ padding: isMobile ? 15 : 20, width: 200 }}>
                    {count}
                </Button>
            </div>
            <div className={style.footer}>
                {choix_global ? (<>
                    {joueursValues.resultat1 > count || joueursValues.resultat2 > count ? (
                        <Button variant='outlined' color='inherit' onClick={handleKeepRole} disabled={!joueurDisplay || loading.keep}>{region_global === 'fr' ? joueurDisplay ? 'Conserver son rôle' : 'En attente des resultats' : joueurDisplay ? 'Mantenere il suo ruolo' : 'In attesa dei risultati'}</Button>
                    ) : (
                        <Button variant='outlined' color='primary' onClick={handleChooseRole} disabled={!joueurDisplay || loading.keep}>{region_global === 'fr' ? joueurDisplay ? 'Changer de rôle' : 'En attente des resultats' : joueurDisplay ? 'Cambiare i ruoli' : 'In attesa dei risultati'}</Button>
                    )}
                    {loading.keep && <div className={style.progressBar}><CircularProgress size={24} /></div>}
                </>) : (<>
                    {joueursValues.resultat1 > count || joueursValues.resultat2 > count ? (
                        <Button variant='outlined' color='inherit' onClick={handleChooseRole} disabled={!joueurDisplay || loading.keep}>{region_global === 'fr' ? joueurDisplay ? 'Changer de rôle' : 'En attente des resultats' : joueurDisplay ? 'Cambiare i ruoli' : 'In attesa dei risultati'}</Button>
                    ) : (
                        <Button variant='outlined' color='primary' onClick={handleKeepRole} disabled={!joueurDisplay || loading.keep}>{region_global === 'fr' ? joueurDisplay ? 'Conserver son rôle' : 'En attente des resultats' : joueurDisplay ? 'Mantenere il suo ruolo' : 'In attesa dei risultati'}</Button>
                    )}
                    {loading.keep && <div className={style.progressBar}><CircularProgress size={24} /></div>}
                </>)}
                <Dialog open={open}>
                    <DialogContent>
                        <div>
                            <div className={style.dialogHeader}>
                                <Typography variant='h4'>{region_global === 'fr' ? 'Votre nouveau rôle est :' : 'Il tuo nuovo ruolo è :'}</Typography>
                            </div>
                            <div className={style.dialogContent}>
                                <Chip label={loading.all ? region_global === 'fr' ? 'Tirage...' : 'Sorteggio' : newRoleDisplay} variant='outlined' color={loading.all ? 'primary' : 'secondary'} avatar={<Avatar>{loading.all ? 'T' : newRoleDisplay[0]}</Avatar>} />
                                <div className={style.continuer}>
                                    <Button variant='contained' color='primary' onClick={handleRedirect} disabled={loading.all || loading.role1} size='medium'>{region_global === 'fr' ? 'Continuer' : 'Continuare'}</Button>
                                    {loading.role1 && <div className={style.progressBar}><CircularProgress size={24} /></div>}
                                </div>
                            </div>
                            {loading.all && <div className={style.loadingDialog}><LinearProgress color="primary" size={20} /></div>}
                        </div>
                    </DialogContent>
                </Dialog>
                <Dialog open={tricheur}>
                    <DialogContent>
                        <div className={style.tricheurContent}>
                            <div className={style.tricheurHeader}>
                                <Typography>{region_global === 'fr' ? "Vous n'avez pas réalisé assez de clics pour pouvoir continuer" : "Non hai fatto abbastanza clic per continuare"}.</Typography>
                                <Typography style={{ marginTop: 5 }}><strong>{region_global === 'fr' ? "Veuillez recommencer" : "Per favore, ricomincia"}.</strong></Typography>
                            </div>
                            <div className={style.continuer}>
                                <Button variant='contained' color='primary' onClick={handleReload} disabled={loading.tricheur}>
                                    {region_global === 'fr' ? 'Recommencer' : 'Ricominciare'}
                                </Button>
                                {loading.tricheur && <div className={style.progressBar}><CircularProgress color="primary" size={20} /></div>}
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    role_global: state.role.role,
    max_global: state.role.maximum,
    id_trial_global: state.currentTrial.current_trial,
    choix_global: state.currentTrial.choix,
    state_global: state.currentTrial,
    gain_global: state.role.gain,
    nb_role_trial_global: state.nbTrials,
    region_global: state.langue.region
})

export default connect(mapStateToProps, { update_current_role, record_trial, post_current_trial, showNotification, reload_count_up })(Handgrip)