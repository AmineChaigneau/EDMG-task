
import { useState, useRef, useEffect } from 'react'
import style from './index.module.css'
import { Typography, Radio, RadioGroup, FormControlLabel, Button, CircularProgress } from '@material-ui/core';
import usePagination from './pagination'
import { useHistory } from 'react-router-dom'
import { post_maia } from '../Redux/Actions/maia'
import { connect } from 'react-redux'

const Maia = ({ post_maia, subject_id_global, region_global }) => {

    const [options, setOptions] = useState([{ label: 'Lorsque je suis tendu, je perçois où la tension se situe dans mon corps.', value: '' }, { label: 'Lorsque je me sens mal dans mon corps, je le remarque.', value: '' }, { label: "J'identifie/je remarque à quel endroit de mon corps je me sens confortable", value: '' }, { label: "Je perçois les changements dans ma respiration, par exemple lorsqu'elle ralentit ou accélère", value: '' }, { label: "Je ne perçois pas (j’ignore) les tensions physiques ou l’inconfort jusqu’à ce qu’ils ne deviennent sévères.", value: '' }, { label: "Je me détache des sensations d’inconfort.", value: '' }, { label: "Lorsque je ressens de la douleur ou de l’inconfort, je m'efforce de les surmonter.", value: '' }, { label: "Lorsque je ressens une douleur physique, cela me stresse", value: '' }, { label: "Je commence à me soucier que quelque chose n'aille pas dès que je ressens le moindre inconfort.", value: '' }, { label: "Je peux percevoir une sensation corporelle déplaisante sans m'en inquiéter.", value: '' }, { label: "Je peux prêter attention à ma respiration sans être distrait par les choses qui arrivent autour de moi.", value: '' }, { label: "Je peux rester conscient de mes sensations corporelles intérieures même lorsqu'il se passe beaucoup de choses autour de moi).", value: '' }, { label: "Lorsque je suis en conversation avec quelqu'un, je peux porter attention à ma posture.", value: '' }, { label: "Je peux rediriger mon attention sur mon corps si je suis distrait.", value: '' }, { label: "Je peux détourner mon attention de mes pensées pour la tourner vers mon corps (vers mes sensations corporelles).", value: '' }, { label: "Je peux conserver la conscience de l'ensemble de mon corps même lorsqu'une partie de moi-même éprouve de la douleur ou de l'inconfort.", value: '' }, { label: 'Je suis capable de focaliser mes pensées de façon consciente sur mon corps dans son entier.', value: '' }, { label: 'Je perçois comment mon corps change lorsque je suis en colère.', value: '' }, { label: "Lorsque quelque chose ne va pas dans ma vie, je peux le ressentir dans mon corps.", value: '' }, { label: "Je remarque que mes sensations corporelles changent après une expérience apaisante.", value: '' }, { label: "Je perçois que ma respiration devient dégagée et aisée lorsque je me sens confortable.", value: '' }, { label: "Je perçois comment mon corps change lorsque je me sens heureux/joyeux.", value: '' }, { label: "Lorsque je me sens débordé, je peux trouver un endroit calme à l’intérieur de moi.", value: '' }, { label: "Lorsque je prends conscience de mon corps, je ressens une sensation de calme.", value: '' }, { label: "Je peux utiliser ma respiration pour réduire la tension.", value: '' }, { label: "Lorsque je suis pris dans mes pensées, je peux calmer mon esprit en me concentrant sur mon corps / sur ma respiration.", value: '' }, { label: "Je suis à l'écoute de mon corps concernant mon état émotionnel.", value: '' }, { label: "Lorsque je suis stressé, je prends le temps d'explorer comment mon corps se sent.", value: '' }, { label: "J’écoute mon corps afin de m’informer sur ce que je dois faire.", value: '' }, { label: "Je suis chez moi dans mon corps.", value: '' }, { label: "Je sens que mon corps est un endroit sûr.", value: '' }, { label: "Je fais confiance à mes sensations corporelles.", value: '' }])

    useEffect(() => {
        region_global === 'it' && setOptions([{ label: 'Quando sono teso noto che in punti del mio corpo è localizzata la tensione.', value: '' }, { label: 'Noto quando sono a disagio nel mio corpo.', value: '' }, { label: 'Noto i punti del mio corpo in cui mi sento a mio agio.', value: '' }, { label: 'Noto i cambiamenti nel mio respiro, per esempio se rallenta o acclera', value: '' }, { label: 'Non noto la tensione fisica o il disagio fino a quando questi non diventano più seri.', value: '' }, { label: 'Mi distolgo dalle sensazioni di disagio.', value: '' }, { label: 'Quando provo dolore o disagio, cerco comunque di andare avanti con quello che stavo facendo nonostante ciò.', value: '' }, { label: 'Quando sento un dolore fisico, mi agito.', value: '' }, { label: 'Inizio a preoccuparmi che ci sia qualcosa che non va, se percepisco un disagio.', value: '' }, { label: 'Posso notare una sensazione corporea spiacevole senza preoccuparmene.', value: '' }, { label: 'Posso prestare attenzione sul mio respiro senza farmi distrarre dalle cose che succedono attorno a me.', value: '' }, { label: 'Posso mantenere la consapevolezza delle mie sensazioni fisiche interiori anche se attorno a me avvengono molte cose.', value: '' }, { label: 'Quando sto conversando con qualcuno, riesco a prestare attenzione alla mia postura.', value: '' }, { label: 'Posso ritrovare la consapevolezza del mio corpo se sono distratto.', value: '' }, { label: 'Riesco a ridirezionare l’attenzione dall’atto di pensare all’atto di percepire il mio corpo.', value: '' }, { label: 'Riesco a mantenere la consapevolezza del mio corpo nella sua interezza anche quando una parte di me è dolorante o a disagio.', value: '' }, { label: 'Sono capace di focalizzarmi intenzionalmente sul mio corpo nella sua interezza.', value: '' }, { label: 'Noto in che modo il mio corpo cambia quando sono arrabbiato.', value: '' }, { label: 'Quando qualcosa va storto nella mia vita, riesco a percepirlo nel mio corpo.', value: '' }, { label: 'Noto di sentire il mio corpo diverso dopo un’esperienza serena.', value: '' }, { label: 'Noto che il mio respiro diventa libero e agevole quando mi sento a mio agio.', value: '' }, { label: 'Noto come il mio corpo cambia quando mi sento felice/gioioso.', value: '' }, { label: 'Quando mi sento sopraffatto, riesco a trovare dentro di me un posto tranquillo.', value: '' }, { label: 'Quando rivolgo la consapevolezza sul mio corpo, provo un senso di calma.', value: '' }, { label: 'Riesco ad utilizzare il mio respiro per ridurre la tensione.', value: '' }, { label: 'Quando mi assalgono i pensieri, posso calmare la mente concentrandomi sul mio corpo/respiro.', value: '' }, { label: 'Ascolto le informazioni provenienti dal mio corpo riguardanti i miei stati emotivi.', value: '' }, { label: 'Quando sono agitato, prendo il tempo necessario per indagare come sta il mio corpo.', value: '' }, { label: 'Ascolto il mio corpo per sapere cosa fare.', value: '' }, { label: 'Nel mio corpo mi sento a casa.', value: '' }, { label: 'Sento che il mio corpo è un posto sicuro.', value: '' }, { label: 'Mi fido delle sensazioni del mio corpo.', value: '' }])
    }, [region_global])

    const [completed, setCompleted] = useState(false)

    const [loading, setLoading] = useState(false)

    const history = useHistory();

    const timer = useRef();

    const updateSelection = index => e => {
        let newArr = [...options];
        newArr[index] = { label: e.target.name, value: e.target.value }

        setOptions(newArr);

        setCompleted(newArr.every(isCompleted))
    }

    let [page, setPage] = useState(0);
    const PER_PAGE = 6;

    const _DATA = usePagination(options, PER_PAGE);

    const handleNext = () => {
        setPage(page + PER_PAGE);
        _DATA.next();
    };

    const handleBack = () => {
        setPage(page - PER_PAGE);
        _DATA.prev();
    };

    const isCompleted = (currentValue) => currentValue.value.trim().length

    const maia_completed = completed;
    const data_maia = options;

    const onSubmit = (e) => {
        e.preventDefault()

        setLoading(true);

        timer.current = setTimeout(() => {
            setLoading(false);

            // post
            post_maia(subject_id_global, maia_completed, data_maia)

            // redirect
            history.push('/Regle')
        }, 1000);
    }

    return (
        <div className={style.root}>
            <form className={style.form} onSubmit={e => onSubmit(e)}>
                <div className={style.header}>
                    <div className={style.title}>
                        <Typography variant='h1'>Multidimensional Assessment of Interoceptive Awareness</Typography>
                    </div>
                    <div className={style.consigne}>
                        <Typography>{region_global === 'fr' ? "Veuillez répondre en utilisant l'échelle ci-dessous, en tenant compte du fait que l'échelle va de 'jamais' à 'toujours'." : "La invitiamo a rispondere, utilizzando la scala sotto riportata, tenendo conto che la scala va da 'Mai' a 'Sempre'."}</Typography>
                    </div>
                </div>
                <div>
                    {_DATA.currentData().map((option, index) =>
                        <div key={index} className={style.label}>
                            <div className={style.desc}>
                                <Typography variant={'body1'}>{option.label}</Typography>
                            </div>
                            <RadioGroup name={option.label} value={option.value} onChange={updateSelection(index + page)} row style={{ padding: 5 }}>
                                <FormControlLabel value={0} control={<Radio color='primary' checked={option.value === "0"} />} label={region_global === 'fr' ? "Jamais" : "Mai"} key={'Jamais'} />
                                <FormControlLabel value={1} control={<Radio color='primary' checked={option.value === "1"} />} label={region_global === 'fr' ?"Un peu" : "Un po' di"} key={'Un peu'} />
                                <FormControlLabel value={2} control={<Radio color='primary' checked={option.value === "2"} />} label={region_global === 'fr' ?"Modérément" : "Moderatamente"} key={'Modérément'} />
                                <FormControlLabel value={3} control={<Radio color='primary' checked={option.value === "3"} />} label={region_global === 'fr' ?"Assez souvent" : "Molto spesso"} key={'Assez souvent'} />
                                <FormControlLabel value={4} control={<Radio color='primary' checked={option.value === "4"} />} label={region_global === 'fr' ?"Toujours" : "Sempre"} key={'Toujours'} />
                            </RadioGroup>
                            <div className={style.divider} />
                        </div>
                    )}
                </div>
                <div className={style.navigation}>
                    <Button disabled={page === 0} onClick={handleBack}>{region_global === 'fr' ? "Retour" : "Indietro"}</Button>
                    <Button disabled={page > options.length - PER_PAGE} onClick={handleNext}>{region_global === 'fr' ? "Suivant" : "Prossimo"}</Button>
                </div>
                <div className={style.submit}>
                    <Button
                        variant='contained'
                        type='submit'
                        color='primary'
                        disabled={!completed || loading}
                    >
                        {region_global === 'fr' ? "Continuer" : "Continuare"}
                    </Button>
                    {/* <Button 
                        variant='outlined' 
                        color='primary' 
                        disabled={false}
                        onClick={() => history.push('/Regle')}
                        style={{ marginLeft: 10 }}
                    >
                        Passer
                    </Button> */}
                    {loading && <div className={style.progressBar}><CircularProgress size={24} /></div>}
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    subject_id_global: state.currentTrial.subject_id,
    region_global: state.langue.region
})

export default connect(mapStateToProps, { post_maia })(Maia)