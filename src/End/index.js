import { useState, useEffect, useRef, useCallback } from 'react'
import Rating from '@material-ui/lab/Rating';
import { Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import style from './index.module.css'
import { connect } from 'react-redux'
import { ReactComponent as Applaud } from './applaud.svg'
import { post_trial } from '../Redux/Actions/trials_record';
import { post_rating } from '../Redux/Actions/rating';
import { record_trial } from '../Redux/Actions/trials_record'
import { post_current_trial } from '../Redux/Actions/current_trial'
import { time_update } from '../Redux/Actions/trials_record';
import { useHistory } from 'react-router-dom';
import reward from './EndScreen.png'
import { resetStore } from '../Redux/Actions/reset'

function downloadBlob(blob, filename) {
    const objectUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
}

const Confeti = ({ children }) => {
    return (
        <div className={style.hoverme}>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            {children}
        </div>
    )
}

const Billet = ({ gain }) => {

    return (
        <div className={style.billet}>
            <svg width="480" height="258" viewBox="0 0 480 258" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M479.8 0.570007V257.43H0.200012V0.570007H479.8Z" fill="#58935E" />
                <path d="M434.811 13H44.2843C44.2843 34.5077 28.6268 50.4951 10 51.0925V206.713C28.6268 207.31 44.2843 224.492 44.2843 246H434.811C434.811 224.492 449.373 207.31 468 206.713V51.0925C449.373 50.4951 434.811 34.5077 434.811 13Z" fill="#7FD695" />
                <path d="M397 108.58C401.039 108.58 404.987 109.778 408.345 112.021C411.703 114.265 414.32 117.454 415.866 121.186C417.411 124.917 417.816 129.023 417.028 132.984C416.24 136.945 414.295 140.583 411.439 143.439C408.583 146.295 404.945 148.24 400.984 149.028C397.023 149.816 392.917 149.411 389.186 147.866C385.454 146.32 382.265 143.703 380.021 140.345C377.778 136.987 376.58 133.039 376.58 129C376.579 126.318 377.107 123.663 378.133 121.185C379.159 118.707 380.663 116.456 382.559 114.559C384.456 112.663 386.707 111.159 389.185 110.133C391.663 109.107 394.318 108.579 397 108.58V108.58Z" fill="#61B257" />
                <path d="M240 33.02C258.983 33.02 277.54 38.6491 293.324 49.1956C309.107 59.742 321.409 74.732 328.674 92.2701C335.938 109.808 337.839 129.106 334.136 147.725C330.432 166.343 321.291 183.445 307.868 196.868C294.445 210.291 277.343 219.432 258.725 223.136C240.106 226.839 220.808 224.938 203.27 217.674C185.732 210.409 170.742 198.107 160.196 182.324C149.649 166.54 144.02 147.983 144.02 129C144.02 116.396 146.502 103.915 151.326 92.2697C156.149 80.6248 163.219 70.0439 172.131 61.1313C181.044 52.2187 191.625 45.1489 203.27 40.3255C214.915 35.5022 227.396 33.0198 240 33.02V33.02ZM309.71 129C309.71 115.213 305.622 101.735 297.962 90.2712C290.302 78.8075 279.415 69.8726 266.677 64.5964C253.939 59.3202 239.923 57.9397 226.4 60.6295C212.878 63.3192 200.457 69.9585 190.708 79.7076C180.958 89.4567 174.319 101.878 171.629 115.4C168.94 128.923 170.32 142.939 175.596 155.677C180.873 168.415 189.807 179.302 201.271 186.962C212.735 194.622 226.213 198.71 240 198.71C258.488 198.71 276.219 191.366 289.292 178.292C302.366 165.219 309.71 147.488 309.71 129V129Z" fill="#61B257" />
                <path d="M83 108.58C87.0391 108.578 90.9881 109.774 94.3475 112.017C97.7068 114.259 100.326 117.448 101.873 121.179C103.42 124.91 103.826 129.016 103.039 132.978C102.252 136.939 100.308 140.579 97.4527 143.436C94.5973 146.292 90.9588 148.238 86.9974 149.027C83.0361 149.816 78.9298 149.412 75.1979 147.867C71.4661 146.321 68.2763 143.704 66.0321 140.346C63.7879 136.988 62.59 133.039 62.59 129C62.5892 123.586 64.739 118.393 68.5665 114.564C72.394 110.734 77.5858 108.582 83 108.58V108.58Z" fill="#61B257" />
                <path d="M39.8581 208.375V51.4195C56.7776 50.8169 71 34.6923 71 13H41.1419C41.1419 34.6923 26.9196 50.8169 10 51.4195V208.375C26.9196 208.978 41.1419 226.308 41.1419 248H71C71 226.308 56.7776 208.978 39.8581 208.375Z" fill="#6DB57C" />
                <text textAnchor="middle" x="240" y="149" fill='yellow' style={{ fontSize: 60 }}>{gain}€</text>
            </svg>
        </div>
    )
}

function gainReal (gain) {
    const amout = gain/10;
    return amout >= 15 ? 15 : gain/10
}

const End = ({ trials_record_global, nb_trial_global, subject_id_global, post_trial, post_rating, time_global, time_update, gain_global, maximum_global, record_trial, state_global, post_current_trial, region_global, profile_global, calibration_global, fullscreen_global, maximum_arr_global, resetStore }) => {

    const timer = useRef();

    const history = useHistory();

    const [username, setUsername] = useState(0)

    const [value, setValue] = useState(0)

    const [loading, setLoading] = useState(false);

    const [com, setCom] = useState('')

    const [post, setPost] = useState(true)

    const d = new Date();

    const end = d.getTime();

    useEffect(() => {
        if (post) {
            record_trial(state_global)
            setPost(false)
        }
    }, [post])

    useEffect(() => {
        if (!post) {
            post_current_trial(state_global)

            const time = end - time_global;

            time_update(time);

            setUsername(subject_id_global)

            post_trial(subject_id_global, trials_record_global, nb_trial_global, time, gain_global, maximum_global, profile_global, calibration_global, fullscreen_global, maximum_arr_global)
        }
    }, [post])

    const handleChangeCom = (event) => {
        const Newvalue = event.target.value
        setCom(Newvalue)
    }

    const onSubmit = e => {
        e.preventDefault();
        setLoading(true);
        post_rating(value, com, subject_id_global);

        timer.current = setTimeout(() => {
            setLoading(false);
            resetStore();
            history.push('/');
        }, 1000);
    }

    const svgRef = useRef();

    const downloadSVG = useCallback(() => {
        const svg = svgRef.current.innerHTML;
        const blob = new Blob([svg], { type: "image/svg+xml" });
        downloadBlob(blob, `billet_experimentation.svg`);
    }, []);

    return (
        <div className={style.root}>
            <div className={style.header}>
                <Typography variant='h3'>{region_global === 'fr' ? "Fin de l'experimentation" : "Fine dell'esperimento"}</Typography>
                <div className={style.icon}>
                    <Applaud />
                </div>
            </div>
            <div className={style.container}>
                <div className={style.resultcontainer}>
                    <Confeti>
                        <img src={reward} alt='endscreen' />
                    </Confeti>
                    <div className={style.billetContainer} ref={svgRef}>
                        <Billet gain={gainReal(gain_global)} />
                    </div>
                    <div className={style.billetDownload}>
                        <Button onClick={downloadSVG} variant='contained' color='primary'>
                            {region_global === 'fr' ? 'Télécharger' : 'Scaricare'}
                        </Button>
                    </div>
                </div>
                <form className={style.formcontainer} onSubmit={e => onSubmit(e)}>
                    <div className={style.remerciment} style={{ marginBottom: 20 }}>
                        <Typography>
                            {region_global === 'fr' ? `Chère participant (joueur ${username}), nous vous remercions, pour la participation à ce jeu.` : `Grazie per aver partecipato a questo esperimento.`}
                        </Typography>
                        <Typography>
                            {region_global === 'fr' ? "Vous pouvez, si vous le souhaitez, donner une note et laisser un commentaire à propos de l'expérience." : "Qui sotto può valutare e lasciare un commento sulla Sua esperienza con l'esperimento."}
                        </Typography>
                        <Typography variant='h4'><strong>{region_global === 'fr' ? "Vous devez restez à votre place et fixer l'écran jusqu'à l'annonce de la fin de l'expérimentation" : "È necessario rimanere al proprio posto e fissare lo schermo fino all'annuncio della fine dell'esperimento."}</strong></Typography>
                    </div>
                    <Rating
                        name="rate"
                        value={value}
                        // onChange={handleChange}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                    <div className={style.input}>
                        <TextField
                            fullWidth
                            name='com'
                            label={region_global === 'fr' ? "Commentaire" : "Commento"}
                            placeholder={region_global === 'fr' ? "Votre commentaire..." : "Il tuo commento..."}
                            multiline
                            rows={4}
                            value={com}
                            variant='outlined'
                            onChange={handleChangeCom}
                        />
                    </div>
                    <div className={style.footer}>
                        <Button variant='outlined' color='primary' type='submit' disabled={loading}>
                            {region_global === 'fr' ? 'Envoyer' : 'Invia'}
                        </Button>
                        {loading && <div className={style.progressBar}><CircularProgress size={20} /></div>}
                    </div>
                </form>
            </div>



        </div>
    )
}

const mapStateToProps = state => ({
    subject_id_global: state.currentTrial.subject_id,
    trials_record_global: state.trialsRecord.trials,
    nb_trial_global: state.trialsRecord.nb_trial,
    time_global: state.trialsRecord.time_all,
    gain_global: state.role.gain,
    maximum_global: state.role.maximum,
    maximum_arr_global: state.role.max_arr,
    state_global: state.currentTrial,
    region_global: state.langue.region,
    profile_global: state.profile,
    calibration_global: state.calibration.calibration,
    fullscreen_global: state.trialsRecord.fullscreen,
})

export default connect(mapStateToProps, { post_trial, post_rating, time_update, record_trial, post_current_trial, resetStore })(End)