import style from './informations.module.css'
import { connect } from 'react-redux'
import { Chip } from '@material-ui/core';
import handgripview from './image/handgrip.png'
import infomenu from './image/infomenu.png'
import handgripview_it from './image/handgrip_it.png'
import infomenu_it from './image/infomenu_it.png'
import choix from './image/choix.png'
import choix_it from './image/choix_it.png'

const Deroulement = ({ region_global }) => {

    return (
        <div>
            {region_global === 'fr' ?
                <>
                    <div className={style.paragraphe}>
                        Le jeu se déroulera sur <strong>96-112 essais</strong>, tous les 4 essais vous aurez la possibilité de <strong>changer de rôle</strong> (par exemple de passer de <strong style={{ color: '#FD932E'}}>Receveur</strong> à <strong style={{ color: '#FAD129'}}>Proposeur</strong>). Vous pourrez également <strong>choisir de conserver</strong> votre rôle actuel.
                    </div>
                    <div className={style.imagebis} style={{ marginBottom: 15 }}>
                        <img src={choix} alt='choix'/>
                        <div className={style.imageContent}>
                            <div className={style.imageDescription}>
                                <Chip label={'1'} /> :  Activer les deux options (changer ou conserver son rôle).
                            </div>
                            <div className={style.imageDescription}>
                                <Chip label={'2'} /> :  Faire son choix le plus rapidement possible en cliquant sur un des deux choix (changer de rôle en haut à gauche, conserver son rôle en haut à droite).
                            </div>
                        </div>
                    </div>
                    <div className={style.paragraphe}>
                        Dans les deux cas, vous serez en <strong>concurrence avec les autres participants</strong>. Pendant <strong>5 secondes</strong>, vous devrez effectuer <strong>le nombre maximum de clics</strong> sur le bouton. En fonction de votre performance et de celle des autres joueurs, vous pouvez conserver votre rôle ou en changer (selon votre choix). Si vous réalisez la meilleure performance (le plus de clics) votre choix sera confirmé. Si vous ne réalisez pas la meilleure performance, votre nouveau rôle dépendra du choix d'un ou des deux autres joueurs.
                    </div>
                    <div className={style.image}>
                        <img src={handgripview} alt='handgripview' style={{ height: 300 }}/>
                        <div className={style.imageContent}>
                            <div className={style.imageDescription}>
                                <Chip label={'3'} /> :  Jauge représentant le nombre de clics.
                            </div>
                            <div className={style.imageDescription}>
                                <Chip label={'4'} /> :  Le chronomètre se déclenche au <strong style={{ color: 'red' }}>premier clic</strong>, puis vous devez réaliser <strong>le maximum de clics en 5 secondes</strong>.
                            </div>
                            <div className={style.imageDescription}>
                                <Chip label={'5'} /> :  Valeurs réalisées par les deux autres joueurs. Elles s'affichent une fois que l'ensemble des participants a complété l'essai.
                            </div>
                        </div>
                    </div>
                    <div className={style.paragraphe}>
                        <p className={style.description}>
                            Tout au long du jeu, votre rôle, ainsi que la somme d’argent accumulée sont accessibles en haut de la page.
                        </p>
                    </div>
                    <div className={style.imagemenu}>
                        <img src={infomenu} alt='informations_menu' />
                    </div>
                </> :
                <>
                    <div className={style.paragraphe} style={{ marginBottom: 15 }}>
                        Il gioco si svolgerà in <strong>96-112 turni</strong>. Ogni <strong>4 turni</strong>, ci sarà una <strong>gara di clic tra i giocatori</strong> - chi farà più clic in 5 secondi avrà la possibilità di <strong>cambiare</strong> (ad es. da <strong style={{ color: '#FD932E'}}>Ricevente</strong> diventare <strong style={{ color: '#FAD129'}}>Proponente</strong>) o <strong>mantenere</strong> il suo ruolo. Se ottieni la migliore performance (il maggior numero di clic) la tua scelta sarà confermata. Se non ottieni la migliore performance, il tuo nuovo ruolo dipenderà dalla scelta di uno o entrambi gli altri giocatori.
                    </div>
                    <div className={style.imagebis} style={{ marginBottom: 15 }}>
                        <img src={choix_it} alt='choix'/>
                        <div className={style.imageContent}>
                            <div className={style.imageDescription}>
                                <Chip label={'1'} /> :  Clicca qui per attivare le due opzioni. 
                            </div>
                            <div className={style.imageDescription}>
                                <Chip label={'2'} /> :  Scelga se mantenere (pulsante di sinistra) o cambiare il ruolo (pulsante di destra).
                            </div>
                        </div>
                    </div>
                    <div className={style.imagebis}>
                        <img src={handgripview_it} alt='handgripview_it' style={{ height: 335 }}/>
                        <div className={style.imageContent}>
                            <div className={style.imageDescription}>
                                <Chip label={'3'} /> :  Contatore di clic.
                            </div>
                            <div className={style.imageDescription}>
                                <Chip label={'4'} /> :  Il timer parte al <strong style={{ color: 'red' }}>primo clic</strong>, cerchi di fare più clic possibili all'interno del <strong style={{ color: 'green' }}>rettangolo verde</strong>.
                            </div>
                            <div className={style.imageDescription}>
                                <Chip label={'5'} /> :  Numero di clic degli altri giocatori, vengono visualizzati una volta che tutti i partecipanti hanno completato la prova.
                            </div>
                        </div>
                    </div>
                    <div className={style.paragraphe}>
                        <p className={style.description}>
                            Il denaro guadagnato resterà comunque sul Suo conto (in alto a destra dello schermo).
                        </p>
                    </div>
                    <div className={style.imagemenu}>
                        <img src={infomenu_it} alt='informations_menu_it' />
                    </div>
                </>}
        </div>
    )
}

const mapStateToProps = state => ({
    region_global: state.langue.region
});

export default connect(mapStateToProps)(Deroulement)