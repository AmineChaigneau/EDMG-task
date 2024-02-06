import { useState, useRef } from 'react'
import { Button, withStyles, Slider, Typography, CircularProgress } from "@material-ui/core"
import style from './index.module.css'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { update_assuptions, post_assumptions } from '../Redux/Actions/assumptions'
import { ReactComponent as Applaud } from '../End/applaud.svg'

const SliderStyled = withStyles({
    thumb: {
        height: 20,
        width: 20,
        marginTop: -8,
        marginLeft: 0,
    },
    track: {
        height: 5
    },
    rail: {
        height: 5
    },
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
})(Slider);

const Assumption = ({ subject_id_global, region_global, update_assuptions, post_assumptions }) => {

    const history = useHistory();

    const timer = useRef();

    const [loading, setLoading] = useState(false)

    const [slidervalue, setSlidervalue] = useState({
        subject_id: subject_id_global,
        power: 0,
        effort: 0,
        commandeur: 0,
        receveur: 0,
        proposeur: 0,
        joueur: 0,
        regle: 0,
        coherence: 0,
        resultat: 0
    });

    const handleChange = (event, newValue, id) => {
        setSlidervalue({
            ...slidervalue,
            [id]: newValue
        });
    }

    function handleClick() {
        setLoading(true)
        timer.current = setTimeout(() => {
            setLoading(false);
            update_assuptions(slidervalue)
            history.push("/End");
            post_assumptions(slidervalue)
        }, 1000);
    }

    return (
        <div className={style.root}>
            <div className={style.title}>
                <Typography variant='h3'>{region_global === 'fr' ? "Une toute dernière étape avant la récompense !" : "Un ultimo passo prima della ricompensa!"}</Typography>
                <div className={style.icon}>
                    <Applaud />
                </div>
            </div>
            <div className={style.container}>
                <div className={style.slider}>
                    <div className={style.header}>
                        <Typography>{region_global === 'fr' ? "Avez-vous eu du pouvoir sur les deux autres joueurs au cours du jeu" : "Aveva potere sugli altri due giocatori durante il gioco"} ?</Typography>
                    </div>
                    <SliderStyled
                        style={{ zIndex: 2 }}
                        id='power'
                        value={slidervalue.power}
                        onChange={(e, value) => handleChange(e, value, 'power')}
                        min={0}
                        max={10}
                        step={0.1}
                    />
                    <div className={style.left}>
                        <Typography>{region_global === 'fr' ? "Très peu de pouvoir" : "Poco potere"}</Typography>
                    </div>
                    <div className={style.right}>
                        <Typography>{region_global === 'fr' ? "Beaucoup de pouvoir" : "Molto potere "}</Typography>
                    </div>
                </div>
                <div className={style.slider}>
                    <div className={style.header}>
                        <Typography>{region_global === 'fr' ? "Comment qualifieriez-vous la pénibilité de l'effort que vous avez réalisé au court du jeu (clic) ?" : "Come descriverebbe lo sforzo che ha messo nel gioco (click)?"}</Typography>
                    </div>
                    <SliderStyled
                        style={{ zIndex: 2 }}
                        id='effort'
                        value={slidervalue.effort}
                        onChange={(e, value) => handleChange(e, value, 'effort')}
                        min={0}
                        max={10}
                        step={0.1}
                    />
                    <div className={style.left}>
                        <Typography>{region_global === 'fr' ? "Très peu pénible" : "Per niente faticoso"}</Typography>
                    </div>
                    <div className={style.right}>
                        <Typography>{region_global === 'fr' ? "Très très pénible" : "Molto, molto faticoso"}</Typography>
                    </div>
                </div>
                <div className={style.slider}>
                    <div className={style.header}>
                        <Typography>{region_global === 'fr' ? 'Avez-vous eu du pouvoir sur les autres joueurs en tant que "Commandeur" ?' : 'Aveva potere sugli altri giocatori come "Committente"?'}</Typography>
                    </div>
                    <SliderStyled
                        style={{ zIndex: 2 }}
                        id='commandeur'
                        value={slidervalue.commandeur}
                        onChange={(e, value) => handleChange(e, value, 'commandeur')}
                        min={0}
                        max={10}
                        step={0.1}
                    />
                    <div className={style.left}>
                        <Typography>{region_global === 'fr' ? "Très peu de pouvoir" : "Poco potere"}</Typography>
                    </div>
                    <div className={style.right}>
                        <Typography>{region_global === 'fr' ? "Beaucoup de pouvoir" : "Molto potere"}</Typography>
                    </div>
                </div>
                <div className={style.slider}>
                    <div className={style.header}>
                        <Typography>{region_global === 'fr' ? 'Avez-vous eu du pouvoir sur les autres joueurs en tant que "Proposeur" ?' : 'Aveva potere sugli altri giocatori come "Proponente"?'}</Typography>
                    </div>
                    <SliderStyled
                        style={{ zIndex: 2 }}
                        id='proposeur'
                        value={slidervalue.proposeur}
                        onChange={(e, value) => handleChange(e, value, 'proposeur')}
                        min={0}
                        max={10}
                        step={0.1}
                    />
                    <div className={style.left}>
                        <Typography>{region_global === 'fr' ? "Très peu de pouvoir" : "Poco potere"}</Typography>
                    </div>
                    <div className={style.right}>
                        <Typography>{region_global === 'fr' ? "Beaucoup de pouvoir" : "Molto potere"}</Typography>
                    </div>
                </div>
                <div className={style.slider}>
                    <div className={style.header}>
                        <Typography>{region_global === 'fr' ? 'Avez-vous eu du pouvoir sur les autres joueurs en tant que "Receveur" ?' : 'Aveva potere sugli altri giocatori come "Ricevente"?'}</Typography>
                    </div>
                    <SliderStyled
                        style={{ zIndex: 2 }}
                        id='receveur'
                        value={slidervalue.receveur}
                        onChange={(e, value) => handleChange(e, value, 'receveur')}
                        min={0}
                        max={10}
                        step={0.1}
                    />
                    <div className={style.left}>
                        <Typography>{region_global === 'fr' ? "Très peu de pouvoir" : "Poco potere"}</Typography>
                    </div>
                    <div className={style.right}>
                        <Typography>{region_global === 'fr' ? "Beaucoup de pouvoir" : "Molto potere"}</Typography>
                    </div>
                </div>
                <div className={style.slider}>
                    <div className={style.header}>
                        <Typography>{region_global === 'fr' ? "Quelle a été votre perception des deux autres joueurs ?" : "Qual era la sua percezione degli altri due giocatori?"}</Typography>
                    </div>
                    <SliderStyled
                        style={{ zIndex: 2 }}
                        id='joueur'
                        value={slidervalue.joueur}
                        onChange={(e, value) => handleChange(e, value, 'joueur')}
                        min={0}
                        max={10}
                        step={0.1}
                    />
                    <div className={style.left}>
                        <Typography>{region_global === 'fr' ? "Très mauvaise" : "Pessima"}</Typography>
                    </div>
                    <div className={style.right}>
                        <Typography>{region_global === 'fr' ? "Très bonne" : "Ottima"}</Typography>
                    </div>
                </div>
                <div className={style.divider}></div>
                {/* PRE-TEST */}
                <div className={style.slider}>
                    <div className={style.header}>
                        <Typography>{region_global === 'fr' ? "Comment jugez-vous votre compréhension des règles avant de débuter le jeu ?" : "Come valuteresti la tua comprensione delle regole prima di iniziare il gioco?"}</Typography>
                    </div>
                    <SliderStyled
                        style={{ zIndex: 2 }}
                        id='regle'
                        value={slidervalue.regle}
                        onChange={(e, value) => handleChange(e, value, 'regle')}
                        min={0}
                        max={10}
                        step={0.1}
                    />
                    <div className={style.left}>
                        <Typography>{region_global === 'fr' ? "Très mauvaise" : "Pessima"}</Typography>
                    </div>
                    <div className={style.right}>
                        <Typography>{region_global === 'fr' ? "Très bonne" : "Ottima"}</Typography>
                    </div>
                </div>
                <div className={style.slider}>
                    <div className={style.header}>
                        <Typography>{region_global === 'fr' ? "Comment jugez-vous la cohérence des informations qui vous sont présentées au cours du jeu ?" : "Come valuti la coerenza delle informazioni che ti sono state presentate durante il gioco?"}</Typography>
                    </div>
                    <SliderStyled
                        style={{ zIndex: 2 }}
                        id='coherence'
                        value={slidervalue.coherence}
                        onChange={(e, value) => handleChange(e, value, 'coherence')}
                        min={0}
                        max={10}
                        step={0.1}
                    />
                    <div className={style.left}>
                        <Typography>{region_global === 'fr' ? "Très mauvaise" : "Pessima"}</Typography>
                    </div>
                    <div className={style.right}>
                        <Typography>{region_global === 'fr' ? "Très bonne" : "Ottima"}</Typography>
                    </div>
                </div>
                <div className={style.slider}>
                    <div className={style.header}>
                        <Typography>{region_global === 'fr' ? "Comment jugez-vous les différents résultats des essais de changement de rôle (après votre effort) ?" : "Come valuta i diversi risultati dei test di cambio di ruolo (dopo il suo sforzo)?"}</Typography>
                    </div>
                    <SliderStyled
                        style={{ zIndex: 2 }}
                        id='resultat'
                        value={slidervalue.resultat}
                        onChange={(e, value) => handleChange(e, value, 'resultat')}
                        min={0}
                        max={10}
                        step={0.1}
                    />
                    <div className={style.left}>
                        <Typography>{region_global === 'fr' ? "Très incohérent" : "Pessimi"}</Typography>
                    </div>
                    <div className={style.right}>
                        <Typography>{region_global === 'fr' ? "Très cohérent" : "Ottimi"}</Typography>
                    </div>
                </div>
            </div>
            <div className={style.footer}>
                <Button variant='outlined' color='primary' onClick={handleClick} disabled={loading}>
                    {region_global === 'fr' ? "Continuer" : "Continuare"}
                </Button>
                {loading && <div className={style.progressBar}><CircularProgress size={24} /></div>}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    region_global: state.langue.region,
    subject_id_global: state.currentTrial.subject_id
});

export default connect(mapStateToProps, { update_assuptions, post_assumptions })(Assumption)