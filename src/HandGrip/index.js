import { useState, useRef, useEffect } from 'react'
import style from './index.module.css'
import { Typography, Button, CircularProgress, Dialog, DialogContent, LinearProgress, Avatar, Chip, Divider, DialogTitle } from '@material-ui/core'
import { Redirect, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReactComponent as Chrono } from '../MaxForce/chrono.svg'
import { update_current_role } from '../Redux/Actions/role'
import { post_choice_trial, update_current_choice } from '../Redux/Actions/current_choice'
import { record_trial } from '../Redux/Actions/trials_record'
import { post_current_trial, reload_count_up } from '../Redux/Actions/current_trial'
import { getRandomArbitrary } from '../hook'
import { isMobile } from "react-device-detect";
import { ReactComponent as Mercury } from './mercury.svg'
import { ReactComponent as MercuryDone } from './mercurydone.svg'
import CachedIcon from '@material-ui/icons/Cached'
import SyncDisabledIcon from '@material-ui/icons/SyncDisabled'
import { ChipRole } from '../Component/FabRole'
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


const Handgrip = ({ id_choice_trial, subject_id_global, role_global, id_trial_global, choix_global, max_global, gain_global, update_current_role, state_global, record_trial, post_current_trial, nb_role_trial_global, region_global, post_choice_trial, reload_count_up, update_current_choice }) => {

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

    const [currentRole, setCurrentRole] = useState('')

    const [newRoleDisplay, setNewRoleDisplay] = useState('')

    // const [roleValue, setRoleValue] = useState({ role1: 0, role2: 0 })

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

    const [choiceTrial, setChoiceTrial] = useState({
        subject_id: subject_id_global,
        id_trial: id_choice_trial,
        player_option: false,
        player_value: 0,
        player_output: '',
        winorloose: '',
        effort: true,
        player1_value: 0,
        player1_choice: false,
        player2_value: 0,
        player2_choice: false,
        dyna_count: []
    })

    // UseEffect
    useEffect(() => {
        const array = ['Commandeur', 'Proposeur', 'Receveur']
        setCurrentRole(region_global === 'fr' ? role_global : role_global === "Receveur" ? "Ricevente" : role_global === "Commandeur" ? 'Committente' : 'Proponente')
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

        getCurrentCondition(choix_global, getDifferenceRole(array_role[item] - nb_trial[0], array_role[item] - nb_trial[1]))

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
    }


    const [output, setOutput] = useState('')

    // useEffect(() => {
    //     console.log(`resultat : ${output}`)
    // }, [output])

    // getDifferenceRole
    function getDifferenceRole(joueur1, joueur2) {
        const diff = Math.max(joueur1, joueur2)
        return diff
    }
    // getCurrentCondition 
    function getCurrentCondition(choice, diff) {
        if (choice) {
            // Change
            setOutput(diff >= 12 ? 'win' : diff <= -12 ? 'loose' : 'random')
        } else {
            // Keep
            setOutput(diff <= -12 ? 'win' : diff >= 12 ? 'loose' : 'random')
        }
    }

    const [isEffortHigh, setIsEffortHigh] = useState(false)
    // getCurrentValueOption
    function getCurrentOption(max_player, value_player) {
        // value_player < max_player * 0.5 && setTricheur(true)
        const effort = value_player >= max_player * 0.80 ? true : false
        setIsEffortHigh(effort)
        return effort
    }

    const [finalOutput, setFinalOutput] = useState('')
    const [response, setResponse] = useState(false)

    function getRandomPlayerValue(value_player, min, max) {
        const winorloose = Math.round(getRandomArbitrary(1, 2))
        setFinalOutput(winorloose === 1 ? 'win' : 'loose')
        const random = Math.round(getRandomArbitrary(1, 2))
        const randomwin = Math.round(getRandomArbitrary(1, 3))

        // console.log(randomwin)
        const array = winorloose === 1 ? (
            // win 
            randomwin === 1 ? [Math.round(getRandomArbitrary(value_player - 5, value_player - 1)), Math.round(getRandomArbitrary(min, value_player - 1))] : randomwin === '2' ? [Math.round(getRandomArbitrary(min, value_player - 1)), Math.round(getRandomArbitrary(value_player - 5, value_player - 1))] : [Math.round(getRandomArbitrary(min, value_player - 1)), Math.round(getRandomArbitrary(min, value_player - 1))]
        ) : (
            // loose
            random === 1 ? [Math.round(getRandomArbitrary(value_player, max)), Math.round(getRandomArbitrary(min, max))] : [Math.round(getRandomArbitrary(min, max)), Math.round(getRandomArbitrary(value_player, max))]
        )
        return array
    }

    function getRandomPalyerWin(value_player, min) {
        // win 
        setFinalOutput('win')
        const random = Math.round(getRandomArbitrary(1, 3))
        // console.log(random)
        // Plus de full aleatoire -> quand tu win : 1 proche ou l'autre, ou les 2 proche
        const array = random === 1 ? [Math.round(getRandomArbitrary(value_player - 5, value_player - 1)), Math.round(getRandomArbitrary(min, value_player - 1))] : random === '2' ? [Math.round(getRandomArbitrary(min, value_player - 1)), Math.round(getRandomArbitrary(value_player - 5, value_player - 1))] : [Math.round(getRandomArbitrary(value_player - 7, value_player - 1)), Math.round(getRandomArbitrary(value_player - 7, value_player - 1))]
        return array
    }

    function getRandomPlayerLoose(value_player, min, max) {
        // loose 
        setFinalOutput('loose')
        const random = Math.round(getRandomArbitrary(1, 2))
        const array = random === 1 ? [Math.round(getRandomArbitrary(value_player + 1, max)), Math.round(getRandomArbitrary(min, max))] : [Math.round(getRandomArbitrary(min, max)), Math.round(getRandomArbitrary(value_player + 1, max))]
        return array
    }

    function getNoEffortValue(value_player, max) {
        const winorloose = Math.round(getRandomArbitrary(1, 2))
        setFinalOutput(output === 'win' ? 'win' : output === 'loose' ? 'loose' : winorloose === 1 ? 'win' : 'loose')

        const array = [Math.round(getRandomArbitrary(value_player - 1, max)), Math.round(getRandomArbitrary(value_player - 1, max))]

        return array
    }

    function getPlayerValue(max_player, value_player, output) {
        const effort = getCurrentOption(max_player, value_player);
        const min = Math.round(max_player * 0.55)
        // comprends pas ça
        const max = value_player < max_player ? max_player + 5 : value_player + 10

        // Add les bonnes valeurs /output + effort
        const array = effort ? (
            // effort suffisant
            output === 'win' ? getRandomPalyerWin(value_player, min) : output === 'loose' ? getRandomPlayerLoose(value_player, min, max) : getRandomPlayerValue(value_player, min, max)
        ) : (
            // effort pas suffisant 
            getNoEffortValue(value_player, max)
        )
        return array
    }

    useEffect(() => {
        if (joueurDisplay) {
            if (count < max_global * 0.5) {
                setTricheur(true)
            } else {
                const values = getPlayerValue(max_global, count, output);
                setJoueursValues({
                    ...joueursValues,
                    resultat1: values[0],
                    resultat2: values[1]
                });
                setResponse(true)
            }
        }
    }, [joueurDisplay])

    function getRandomWords() {
        const array = ['change', 'keep']
        return [array[Math.floor(Math.random() * array.length)], array[Math.floor(Math.random() * array.length)]]
    }

    function getPlayerResponse(result) {
        const effort = getCurrentOption(max_global, count);

        const response = effort ? (
            result === 'win' ? (
                getRandomWords()
            ) : (
                choix_global ? ['change', 'change'] : ['keep', 'keep']
            )
        ) : (
            result === 'win' ? (
                choix_global ? ['change', 'change'] : ['keep', 'keep']
            ) : (
                Math.round(getRandomArbitrary(1, 2)) === 1 ? ['change', 'change'] : ['keep', 'keep']
            )
        )
        return response
    }

    useEffect(() => {
        if (response) {
            const responses = getPlayerResponse(finalOutput)
            setJoueursValues({
                ...joueursValues,
                changement1: responses[0],
                changement2: responses[1]
            });
            choix_global ? (
                finalOutput === 'loose' && setNewRole(role_global)
            ) : (
                finalOutput === 'win' && setNewRole(role_global)
            )
        }
    }, [response])

    const handleTirage = () => {
        setLoading({ ...loading, keep: true })

        // console.log(`Output : ${output} - ${finalOutput} - (effort: ${getCurrentOption(max_global, count)}) ; for count : player : ${count}, j1 : ${joueursValues.resultat1} - ${joueursValues.changement1}, j2 : ${joueursValues.resultat2} - ${joueursValues.changement2}`)
        // console.log(Math.max(count, joueursValues.resultat1, joueursValues.resultat2))

        const player_option = choix_global ? 'change' : 'keep'

        setChoiceTrial({
            ...choiceTrial,
            player_option: player_option,
            player_value: count,
            player_output: output,
            winorloose: finalOutput,
            effort: getCurrentOption(max_global, count),
            player1_value: joueursValues.resultat1,
            player1_choice: joueursValues.changement1,
            player2_value: joueursValues.resultat2,
            player2_choice: joueursValues.changement2,
            dyna_count: dynaCount
        })

        //Change this pour avoir les bonne values
        setTrial({
            ...trial,
            testvalue: count,
            testdynamique: dynaCount
        })

        setNewRoleDisplay(region_global === 'fr' ? newRole : newRole === "Receveur" ? "Ricevente" : newRole === "Commandeur" ? 'Committente' : 'Proponente')

        timer.current = setTimeout(() => {
            setOpen(true)
            setLoading({ ...loading, keep: false, all: true })
        }, 2000)

        timer.current = setTimeout(() => {
            setLoading({ ...loading, all: false })
        }, timetochange)
    }

    const handleRedirect = () => {
        setLoading({ ...loading, role1: true })
        setDisabled(true)

        const gain_trial = gain_global + trial.gain_user

        const update = { role: newRole, maximum: max_global, gain: gain_trial }

        // console.log(trial)

        timer.current = setTimeout(() => {
            setLoading({ ...loading, role1: false })
            update_current_role(update)
            update_current_choice(choiceTrial)
            post_choice_trial(choiceTrial)
            record_trial(trial)
            post_current_trial(trial)
            history.push(`/${newRole}`)
        }, 1000)
    }

    function refreshPage() {
        reload_count_up();
        setChrono(false)
        setCount(0)
        setDisabled(false)
        setJoueurDisplay(false);
        setDynaCount([{
            count: 1,
            time: 0
        }])
        setJoueursValues({
            ...joueursValues,
            resultat1: 0,
            resultat2: 0
        });
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
            choix: joueursValues.changement1,
            resultat: joueursValues.resultat1
        },
        {
            id: 2,
            joueur: region_global === 'fr' ? 'Joueur 2' : 'Giocatore 2',
            id_trial: id_trial_global,
            role: role.joueur2,
            roledisplay: region_global === 'fr' ? role.joueur2 : role.joueur2 === "Receveur" ? "Ricevente" : role.joueur2 === "Commandeur" ? 'Committente' : 'Proponente',
            choix: joueursValues.changement2,
            resultat: joueursValues.resultat2
        }
    ]

    if (nb_role_trial_global.commandeur >= 32 && nb_role_trial_global.receveur >= 32 && nb_role_trial_global.proposeur >= 32)
        return <Redirect to='/Assumption' />

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
                                {row.joueur} - {row.resultat} {region_global === 'fr' ? 'clic(s)' : 'clic'} - <Avatar style={{ width: 25, height: 25, marginLeft: 5 }}>{row.choix === 'change' ? <CachedIcon /> : <SyncDisabledIcon />}</Avatar>
                            </div>
                        ) : (
                            <div className={style.joueurInfo}>
                                {row.joueur} ({row.roledisplay})
                            </div>
                        )}
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
                        <Typography><b>{region_global === 'fr' ? 'Vous' : 'Io'}</b> ({region_global === 'fr' ? role_global : role_global === "Receveur" ? "Ricevente" : role_global === "Commandeur" ? 'Committente' : 'Proponente'}) - </Typography><Avatar style={{ width: 23, height: 23, marginLeft: 5, background: joueurDisplay ? finalOutput === 'win' ? '#4caf50' : '#E43D26' : '' }}>{choix_global ? <CachedIcon /> : <SyncDisabledIcon />}</Avatar>
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
                <Button variant='outlined' color='primary' onClick={handleTirage} disabled={!joueurDisplay || loading.keep}>{region_global === 'fr' ? 'Continuer' : 'Continuare'}</Button>
                {loading.keep && <div className={style.progressBar}><CircularProgress size={24} /></div>}

                {/*  MODIFIER ICI */}
                <Dialog open={open}>
                    <DialogTitle>
                        {region_global === 'fr' ? 'Résultats' : 'Risultati'}
                    </DialogTitle>
                    <DialogContent>
                        <div className={style.dialogRoleContainer}>
                            <div className={style.dialogPlayers}>
                                {!isEffortHigh ? (
                                    <>
                                        {region_global === 'fr' ? (
                                            <Typography>Vous dépender des autres joueurs. Vous n'avez pas réalisé <strong style={{ color: '#E43D26' }}>un effort assez important</strong> pour valider votre choix en priorité. :</Typography>
                                        ) : (
                                            <Typography>Dipendi dagli altri giocatori. Non hai fatto <strong style={{ color: '#E43D26' }}>uno sforzo sufficiente</strong> per convalidare la tua scelta come priorità :</Typography>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {(choix_global && finalOutput === 'win') || (!choix_global && finalOutput === 'win') ? (
                                            <>
                                                {region_global === 'fr' ? (
                                                    <Typography>Vous avez réalisé <strong style={{ color: '#4caf50' }}>un effort assez important</strong> pour valider votre choix :</Typography>
                                                ) : (
                                                    <Typography>Hai fatto <strong style={{ color: '#4caf50' }}>uno sforzo sufficiente</strong> per convalidare la tua scelta :</Typography>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {region_global === 'fr' ? (
                                                    <Typography>Vous n'avez pas réalisé <strong style={{ color: '#E43D26' }}>un effort assez important</strong> pour valider votre choix :</Typography>
                                                ) : (
                                                    <Typography>Non hai fatto <strong style={{ color: '#E43D26' }}>uno sforzo sufficiente</strong> per convalidare la tua scelta :</Typography>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                                <div>
                                    {region_global === 'fr' ? (
                                        <Chip variant='outlined' label={choix_global ? 'Changer de rôle' : 'Conserver son rôle'} avatar={<Avatar style={{ width: 23, height: 23, marginLeft: 5, background: finalOutput === 'win' ? '#4caf50' : '#E43D26' }}>{choix_global ? <CachedIcon style={{ fill: 'white' }} /> : <SyncDisabledIcon style={{ fill: 'white' }} />}</Avatar>} />
                                    ) : (
                                        <Chip variant='outlined' label={choix_global ? 'Cambiare i ruoli' : 'Mantenere il suo ruolo'} avatar={<Avatar style={{ width: 23, height: 23, marginLeft: 5, background: finalOutput === 'win' ? '#4caf50' : '#E43D26' }}>{choix_global ? <CachedIcon style={{ fill: 'white' }} /> : <SyncDisabledIcon style={{ fill: 'white' }} />}</Avatar>} />
                                    )}
                                </div>
                            </div>
                            <Divider />
                            {loading.all ? (
                                <div className={style.dialogHeader}>
                                    <Typography variant='h4'>{region_global === 'fr' ? 'Tirage des nouveaux rôles...' : 'Sorteggio del nuovo ruolo...'}</Typography>
                                    <CircularProgress size={20} />
                                </div>
                            ) : (
                                <div>
                                    {(choix_global && finalOutput === 'win') || (!choix_global && finalOutput === 'loose') ? (
                                        <div className={style.dialogHeader}>
                                            <Typography variant='h4'>{region_global === 'fr' ? 'Votre nouveau rôle est :' : 'Il tuo nuovo ruolo è :'}</Typography>
                                        </div>
                                    ) : (
                                        <div className={style.dialogHeader}>
                                            <Typography variant='h4'>{region_global === 'fr' ? 'Votre rôle est conservé :' : 'Il tuo ruolo è mantenuto :'}</Typography>
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className={style.dialogContent}>
                                {/* <Chip label={loading.all ? region_global === 'fr' ? 'Tirage des nouveaux rôles...' : 'Sorteggio del nuovo ruolo...' : newRoleDisplay} variant='outlined' color={loading.all ? 'primary' : 'secondary'} avatar={<Avatar>{loading.all ? 'T' : newRoleDisplay[0]}</Avatar>} /> */}
                                {loading.all ? (
                                    <>
                                        <Chip label={region_global === 'fr' ? 'Tirage des nouveaux rôles...' : 'Sorteggio del nuovo ruolo...'} variant='outlined' color='primary' avatar={<Avatar>T</Avatar>}/>
                                        <div className={style.info}>
                                            <Typography>{region_global === 'fr' ? 'En attente...' : 'In attesa di...'}</Typography>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <ChipRole name={newRole} label={newRoleDisplay}/>
                                        <div className={style.info}>
                                            {(choix_global && finalOutput === 'win') || (!choix_global && finalOutput === 'loose') ? (
                                                <>
                                                    {region_global === 'fr' ? (
                                                        <Typography>Vous avez <strong>changé</strong> de rôle ({currentRole} à {newRoleDisplay})</Typography>
                                                    ) : (
                                                        <Typography>Hai <strong>cambiato</strong> il tuo ruolo (da {currentRole} a {newRoleDisplay})</Typography>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {region_global === 'fr' ? (
                                                        <Typography>Vous avez <strong>conservé</strong> votre rôle ({newRoleDisplay})</Typography>
                                                    ) : (
                                                        <Typography>Hai <strong>mantenuto</strong> il tuo ruolo ({newRoleDisplay})</Typography>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </>
                                )}
                                <div className={style.continuer}>
                                    <Button variant='contained' color='primary' onClick={handleRedirect} disabled={loading.role1 || loading.all} size='medium'>{region_global === 'fr' ? 'Continuer' : 'Continuare'}</Button>
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
    id_choice_trial: state.currentTrial.id_trial_subject,
    state_global: state.currentTrial,
    subject_id_global: state.currentTrial.subject_id,
    gain_global: state.role.gain,
    nb_role_trial_global: state.nbTrials,
    region_global: state.langue.region
})

export default connect(mapStateToProps, { update_current_role, record_trial, post_current_trial, reload_count_up, update_current_choice, post_choice_trial })(Handgrip)