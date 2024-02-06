import style from './informations.module.css'
// import { ReactComponent as Rotate } from '../../Component/rotate.svg'
import { connect } from 'react-redux'
import schema from '../Component/image/schemaRegle.png'

const Informations = ({ region_global }) => {

    return (
        <div>
            {region_global === 'fr' ?
                <>
                    <div className={style.imageSchema}>
                        <img src={schema} alt='schema regle' />
                    </div>
                    <div className={style.paragraphe}>
                        <strong>Vous et deux autres joueurs</strong>, sélectionnés aléatoirement, vont avoir la possibilité de gagner de l’argent virtuel dans un jeu multi-joueur.
                    </div>
                    <div className={style.paragraphe}>
                        Vous ne devez pas communiquer avec les deux autres joueurs. Tout au long du jeu, vous devez <strong>impérativement</strong> fixer votre écran.
                    </div>
                    <div className={style.paragraphe}>
                        L’ensemble des instructions relatives à l’expérimentation va vous être détaillé dans cette section. Il est <strong>important de lire attentivement l’ensemble des règles</strong> pour s’assurer du bon déroulement de la tâche.
                    </div>
                    <div className={style.paragraphe}>
                        L'expérience va durer environ <strong>40 minutes</strong>. Nous vous remercions pour votre participation. Nous vous rappelons que pouvez quitter l’expérimentation à tout moment en cliquant sur le bouton « Quitter » en haut à droite de votre écran.
                    </div>
                    {/* <div className={style.paragraphe}>
                        <p className={style.description}>
                            Pour rappel, si vous effectuez la tâche sur votre téléphone, il doit être positionné à l’horizontale.
                        </p>
                    </div> */}
                </> :
                <>
                    <div className={style.imageSchema}>
                        <img src={schema} alt='schema regle' />
                    </div>
                    <div className={style.paragraphe}>
                        Questa sezione contiene tutte le istruzioni necessarie. È <strong>importante leggerle attentamente</strong>.
                    </div>
                    <div className={style.paragraphe}>
                        {/* <strong>Non si deve comunicare con gli altri due giocatori</strong>. Per tutto il gioco è necessario fissare lo schermo. */}
                        Il gioco va affrontato in maniera autonoma da parte di ogni giocatore, per cui è importante <strong>evitare assolutamente di interagire e/o comunicare con altri partecipanti</strong> durante l’intero periodo di svolgimento dell’esperimento. Inoltre, La preghiamo di focalizzare la Sua attenzione esclusivamente al proprio schermo per tutto il tempo della durata del gioco.
                    </div>
                    <div className={style.paragraphe}>
                        L’esperimento ha la durata di circa <strong>40 minuti</strong>. La ricordiamo che può abbandonare l'esperimento in qualsiasi momento cliccando sul pulsante " Uscita " in alto a destra. La ringraziamo per la partecipazione.
                    </div>
                    {/* <div className={style.paragraphe}>
                        <p className={style.description}>
                            Come promemoria, se si esegue l'operazione sul telefono, questo deve essere posizionato orizzontalmente
                        </p>
                    </div> */}
                </>}
            {/* <div className={style.svgContent}>
                <Rotate />
            </div> */}
        </div>
    )
}

const mapStateToProps = state => ({
    region_global: state.langue.region
});

export default connect(mapStateToProps)(Informations)