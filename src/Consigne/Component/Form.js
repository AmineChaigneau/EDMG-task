import { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import style from './Form.module.css'
import { Typography, TextField, Button, Select, Checkbox, CircularProgress, FormHelperText } from '@material-ui/core'
import countryList from 'react-select-country-list'
import Dialog from './Dialog'
import { update_profile, post_profile } from '../../Redux/Actions/profile'
import { useHistory } from 'react-router-dom'
import { isMobile } from 'react-device-detect';
import { useWindowDimensions } from '../../hook'
import { browserName } from 'react-device-detect';

const Form = ({ update_profile, post_profile, subject_id_global, region_global }) => {

    const { height, width } = useWindowDimensions();

    const paysList = countryList().getData();

    const timer = useRef();

    const [formData, setFormData] = useState({
        username: 0,
        age: '',
        genre: '',
        ville: '',
        pays: '',
        profession: '',
        souris: false,
        preference: '',
        maintool: '',
        cond: false,
        consent: false,
        accept: false
    })

    useEffect(() => {
        setFormData({
            ...formData,
            username: subject_id_global,
        });
    }, [subject_id_global]);

    const history = useHistory();

    const [loading, setLoading] = useState(false)

    const handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleChangeCheck = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.checked });
    };

    const onSubmit = e => {
        e.preventDefault();

        setLoading(true);
        timer.current = setTimeout(() => {
            setLoading(false);

            update_profile({ username: formData.username, age: formData.age, genre: formData.genre, ville: formData.ville, pays: formData.pays, profession: formData.profession, souris: formData.souris, preference: formData.preference, maintool: formData.maintool, region: region_global, device: isMobile, height_device: height, width_device: width, browser: browserName});
            post_profile(formData.username, formData.age, formData.genre, formData.ville, formData.pays, formData.profession, formData.souris, formData.preference, formData.maintool, region_global, isMobile, height, width, browserName);

            // history.push('/Maia')
            history.push('/Regle')
        }, 1000);
    }

    return (
        <form onSubmit={e => onSubmit(e)} className={style.form}>
            <div className={style.root}>
                <Typography variant='h3' style={{ marginBottom: 20 }}>{region_global === 'fr' ? "Informations nécessaires" : "Informazioni preliminari"}</Typography>
                <div className={style.container}>
                    <div className={style.input}>
                        {/* age */}
                        <Select
                            fullWidth
                            id='age'
                            name='age'
                            variant='outlined'
                            margin='dense'
                            native
                            value={formData.age}
                            onChange={handleChange}
                        >
                            <option value={''}>{region_global === 'fr' ? 'Âge *' : 'Età *'}</option>
                            <option value={20}>15-20</option>
                            <option value={25}>21-25</option>
                            <option value={30}>26-30</option>
                            <option value={35}>31-35</option>
                            <option value={40}>36-40</option>
                            <option value={45}>41-45</option>
                            <option value={50}>46-50</option>
                            <option value={55}>51-55</option>
                            <option value={60}>56-60</option>
                            <option value={65}>61-65</option>
                            <option value={70}>66-70</option>
                            <option value={75}>70+</option>
                        </Select>
                    </div>
                    <div className={style.input}>
                        {/* sexe */}
                        <Select
                            fullWidth
                            id='genre'
                            name='genre'
                            variant='outlined'
                            margin='dense'
                            native
                            value={formData.genre}
                            onChange={handleChange}
                        >
                            {region_global === 'fr' ? (<>
                                <option value={''}>Genre *</option>
                                <option value={'M'}>Homme</option>
                                <option value={'F'}>Femme</option>
                                <option value={'S'}>Autre</option>
                            </>) : (<>
                                <option value={''}>Genere *</option>
                                <option value={'M'}>Uomo</option>
                                <option value={'F'}>Donna</option>
                                <option value={'S'}>Altro</option>
                            </>)}
                        </Select>
                    </div>
                    <div className={style.input}>
                        {/* pays */}
                        <Select
                            fullWidth
                            required
                            id='pays'
                            name='pays'
                            variant="outlined"
                            margin="dense"
                            native
                            value={formData.pays}
                            onChange={handleChange}
                        >
                            {region_global === 'fr' ? (<option value={""}>Pays *</option>) : (<option value={""}>Paese *</option>)}
                            {paysList.map((d, i) =>
                                <option key={i} value={d.value}>{d.label}</option>
                            )}
                        </Select>
                    </div>
                    <div className={style.input}>
                        {/* ville */}
                        <TextField
                            fullWidth
                            id='ville'
                            name='ville'
                            label={region_global === 'fr' ? 'Ville de résidence *' : 'Provincia di residenza *'}
                            type='text'
                            variant="outlined"
                            margin="dense"
                            value={formData.ville}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={style.input}>
                        {/* Profession */}
                        <TextField
                            fullWidth
                            id='profession'
                            name='profession'
                            label={region_global === 'fr' ? 'Profession *' : 'Professione attuale *'}
                            type='text'
                            variant="outlined"
                            margin="dense"
                            value={formData.profession}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        {!isMobile &&
                            <div className={style.checkLabel}>
                                <Checkbox
                                    checked={formData.souris}
                                    onChange={handleChangeCheck}
                                    name="souris"
                                    color='primary'
                                />
                                <Typography variant='body1'>{region_global === 'fr' ? "Je participe à l'expérimentation en utilisant une souris (utilisez-vous un trackpad ? Si oui, merci de ne pas cocher)." : "Sto partecipando all'esperimento usando un mouse (se stai utilizzando un trackpad, per favore non selezionare)."}</Typography>
                            </div>
                        }
                    </div>
                    <div className={style.inputrow}>
                        <div className={style.inputBoth}>
                            {/* sexe */}
                            <Select
                                fullWidth
                                id='preference'
                                name='preference'
                                variant='outlined'
                                margin='dense'
                                native
                                value={formData.preference}
                                onChange={handleChange}
                            >
                                {region_global === 'fr' ? (<>
                                    <option value={''}>Main dominante *</option>
                                    <option value={'d'}>Droite</option>
                                    <option value={'g'}>Gauche</option>
                                </>) : (<>
                                    <option value={''}>Mano dominante *</option>
                                    <option value={'d'}>Destra</option>
                                    <option value={'g'}>Sinistra</option>
                                </>)}
                            </Select>
                            {/* Question + FR IT */}
                            {region_global === 'fr' ? (
                                <FormHelperText>Quelle est votre <strong>main dominante</strong> ?</FormHelperText>
                            ) : (
                                <FormHelperText>Qual è la tua <strong>mano dominante</strong> ?</FormHelperText>
                            )}
                        </div>
                        {!isMobile &&
                            <div className={style.inputBoth}>
                                {/* sexe */}
                                <Select
                                    fullWidth
                                    id='maintool'
                                    name='maintool'
                                    variant='outlined'
                                    margin='dense'
                                    native
                                    value={formData.maintool}
                                    onChange={handleChange}
                                >
                                    {region_global === 'fr' ? (<>
                                        <option value={''}>Main sur {formData.souris ? 'la souris' : 'le trackpad'} *</option>
                                        <option value={'d'}>Droite</option>
                                        <option value={'g'}>Gauche</option>
                                    </>) : (<>
                                        <option value={''}>Mano sul {formData.souris ? 'mouse' : 'trackpad'} *</option>
                                        <option value={'d'}>Destra</option>
                                        <option value={'g'}>Sinistra</option>
                                    </>)}
                                </Select>
                                {/* MODIFIER LE TRACKPAD / SOURIS */}
                                {region_global === 'fr' ? (
                                    <FormHelperText>Avec quelle main utilisez vous <strong>{formData.souris ? 'la souris' : 'le trackpad'}</strong> ?</FormHelperText>
                                ) : (
                                    <FormHelperText>Con quale mano usi <strong>{formData.souris ? 'il mouse' : 'il trackpad'}</strong> ?</FormHelperText>
                                )}
                            </div>
                        }
                    </div>
                    <div>
                        <div className={style.checkLabel}>
                            <Checkbox
                                checked={formData.cond}
                                onChange={handleChangeCheck}
                                name="cond"
                                color='primary'
                            />
                            <Typography variant='body1'>{region_global === 'fr' ? "J'ai pris connaissance des conditions de l'expérimentation et du comité éthique. *" : "Confermo di aver compreso le politiche, i termini e le condizioni e di voler procedere con l'esperimento. *"}</Typography>
                            <Dialog />
                        </div>
                        <div className={style.checkLabel}>
                            <Checkbox
                                checked={formData.consent}
                                onChange={handleChangeCheck}
                                name="consent"
                                color='primary'
                            />
                            <Typography variant='body1'>{region_global === 'fr' ? "Je donne mon consentement à l'utilisation des données me concernant sous forme anonyme et agrégée, à des fins de recherche scientifique. *" : "Acconsento all'utilizzo dei miei dati in forma anonima e aggregata per scopi di ricerca scientifica. *"}</Typography>
                        </div>
                        <div className={style.checkLabel}>
                            <Checkbox
                                checked={formData.accept}
                                onChange={handleChangeCheck}
                                name="accept"
                                color='primary'
                            />
                            <Typography variant='body1'>{region_global === 'fr' ? "J'accepte volontairement de participer à l'étude et je comprends que je peux me retirer de l'étude à tout moment, sans donner d'explications. *" : "Sono consapevole di potermi ritirare in qualsiasi momento senza dare alcuna spiegazione. *"}</Typography>
                        </div>
                    </div>
                    <div className={style.buttonWrapper}>
                        <Button
                            color='primary'
                            type='submit'
                            variant='contained'
                            disabled={
                                !formData.age.trim().length
                                || !formData.genre.trim().length
                                || !formData.ville.trim().length
                                || !formData.pays.trim().length
                                || !formData.profession.trim().length
                                || !formData.preference.trim().length
                                || !formData.maintool.trim().length
                                || !formData.cond
                                || !formData.consent
                                || !formData.accept
                                || loading
                            }
                        >
                            {region_global === 'fr' ? 'Valider' : 'Continuare'}
                        </Button>
                        {!formData.age.trim().length
                            || !formData.genre.trim().length
                            || !formData.ville.trim().length
                            || !formData.pays.trim().length
                            || !formData.profession.trim().length
                            || !formData.preference.trim().length
                            || !formData.maintool.trim().length
                            || !formData.cond
                            || !formData.consent
                            || !formData.accept ?
                            <FormHelperText>{region_global === 'fr' ? "Vous devez renseigner l'ensemble des informations (*)" : "È necessario compilare tutti i campi contrassegnati da *"}</FormHelperText> : <FormHelperText></FormHelperText>
                        }
                        {loading && <div className={style.progressBar}><CircularProgress size={24} /></div>}
                    </div>
                </div>
            </div>
        </form>
    )
}

const mapStateToProps = state => ({
    subject_id_global: state.currentTrial.subject_id,
    region_global: state.langue.region
});

export default connect(mapStateToProps, { update_profile, post_profile })(Form)
