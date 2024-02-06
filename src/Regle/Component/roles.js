import style from './informations.module.css'
import { connect } from 'react-redux'
import schema from '../Component/image/schemaRole.png'
import schema_it from '../Component/image/schemaRole_it.png'

const Role = ({ region_global, subject_id_global, genre_global }) => {

    return (
        <div>
            {region_global === 'fr' ?
                <>
                    <div className={style.imageSchema}>
                        <img src={schema} alt='schema regle' />
                    </div>
                    <div className={style.paragraphe}>
                        L’objectif de cette section est de décrire le déroulement global du jeu. Veuillez lire attentivement l’ensemble des instructions. Des images du jeu vous seront également présentées afin d’illustrer les différentes étapes du jeu.
                    </div>
                    <div className={style.paragraphe}>
                        Vous êtes le <strong>joueur {subject_id_global}</strong>. Vous, et les deux autres joueurs, allez avoir la possibilité de gagner de l'argent.
                    </div>
                    <div className={style.paragraphe}>
                        Chacun d’entre vous aura un rôle différent : <strong style={{ color: '#FAD129' }}>Proposeur</strong>, <strong style={{ color: '#D25CC0' }}>Commandeur</strong> ou <strong style={{ color: '#FD932E' }}>Receveur</strong>. Chaque rôle a ses propres caractéristiques, qui seront expliquées plus en détail par la suite. Le jeu se joue à tour de rôle et à chaque tour, il y a <strong>un « pot » d’argent fictif à répartir</strong>. En fonction de votre rôle, et des actions possibles, vous aurez la possibilité de gagner ou non une partie de la somme. Chaque joueur a accès à toutes les informations concernant les actions des autres joueurs, et connaît donc le résultat de chacun des essais. Chacun des joueurs a également la possibilité de changer de rôle tous les 4 tours.
                    </div>
                    <div className={style.paragraphe}>
                        <p className={style.description}>Cliquer sur le bouton pour afficher les rôles</p>
                    </div>
                </> :
                <>
                    <div className={style.imageSchema}>
                        <img src={schema_it} alt='schema regle' />
                    </div>
                    <div className={style.paragraphe}>
                        Lei è <strong>{genre_global === 'F' ? "la giocatrice" : "il giocatore"} {subject_id_global}</strong>.
                    </div>
                    <div className={style.paragraphe}>
                        Insieme ad altri due giocatori, parteciperà a un gioco in cui avrà la possibilità di vincere del denaro.
                    </div>
                    <div className={style.paragraphe}>
                        Oltre a Lei, ci sono altri due giocatori e ognuno di voi avrà un ruolo diverso: <strong style={{ color: '#FAD129' }}>Proponente</strong>, <strong style={{ color: '#D25CC0' }}>Committente</strong> e <strong style={{ color: '#FD932E' }}>Ricevente</strong>. Ogni ruolo ha le proprie caratteristiche, che saranno spiegate meglio in seguito. Il gioco si svolge a turni ed in ogni turno c’è una somma di denaro da vincere. Ogni giocatore può accedere a tutte le informazioni sulle scelte e azioni fatte dagli altri giocatori al termine di ogni turno. Ogni giocatore potrà inoltre cambiare il proprio ruolo ogni 4 turni.
                    </div>
                </>}
        </div>
    )
}

const mapStateToProps = state => ({
    region_global: state.langue.region,
    subject_id_global: state.currentTrial.subject_id,
    genre_global: state.profile.genre,
});

export default connect(mapStateToProps)(Role)