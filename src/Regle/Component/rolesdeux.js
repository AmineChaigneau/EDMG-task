import style from './informations.module.css'
import { connect } from 'react-redux'
import { Chip } from '@material-ui/core';
import proposeur from './image/proposeur.png'
import receveur from './image/receveur.png'
import commandeur from './image/commandeur.png'
import proposeur_it from './image/proposeur_it.png'
import receveur_it from './image/receveur_it.png'
import commandeur_it from './image/commandeur_it.png'
import { ChipRole } from '../../Component/FabRole'
import Animation from './animation'

const Roledeux = ({ region_global }) => {

    return (
        <div>
            {region_global === 'fr' ?
                <>
                    <Animation />
                    <div className={style.paragraphe}>
                        Au début de chaque tour, le <strong style={{ color: '#FAD129' }}>Proposeur</strong> reçoit une somme d'argent. Il doit faire une offre au <strong style={{ color: '#FD932E' }}>Receveur</strong>. Si l'offre est acceptée par le <strong style={{ color: '#D25CC0' }}>Commandeur</strong>, le <strong style={{ color: '#FAD129' }}>Proposeur</strong> et le <strong style={{ color: '#FD932E' }}>Receveur</strong> se partagent l'argent. Le <strong style={{ color: '#D25CC0' }}>Commandeur</strong> décide si l'offre est acceptée ou non, mais ne reçoit jamais d'argent. Si l'offre n'est pas acceptée, aucun joueur ne reçoit d'argent.
                    </div>
                    <div className={style.subtitle}>
                        <ChipRole label={'Proposeur'} name={'Proposeur'} />
                        <p>Il a la possibilité de choisir comment <strong>répartir la somme</strong> entre lui-même et le <strong style={{ color: '#FD932E' }}>receveur</strong>.</p>
                    </div>
                    <div className={style.image}>
                        <img src={proposeur} alt='proposeur_regle' />
                        <div className={style.imageContent}>
                            <div className={style.imageDescription}>
                                <Chip label={'1'} /> :  Cliquer sur le bouton "+" pour débuter la proposition.
                            </div>
                            <div className={style.imageDescription}>
                                <Chip label={'2'} /> :  Répartition de la somme d’argent.
                            </div>
                            <div className={style.imageDescription}>
                                <Chip label={'3'} /> :  Curseur à déplacer pour modifier la répartition entre sois-même et le <strong style={{ color: '#FD932E' }}>Receveur</strong>.
                            </div>
                            <div className={style.imageDescription}>
                                <Chip label={'4'} /> :  Cliquez sur « Proposer » pour transmettre l’offre aux autres joueurs.
                            </div>
                        </div>
                    </div>
                    <div className={style.subtitle}>
                        <ChipRole label={'Commandeur'} name={'Commandeur'} />
                        <p>Il a la possibilité <strong>d’approuver ou de refuser la proposition de répartition</strong> faite par le <strong style={{ color: '#FAD129' }}>Proposeur</strong>. Si la proposition est acceptée, le <strong style={{ color: '#FAD129' }}>Proposeur</strong> et le <strong style={{ color: '#FD932E' }}>Receveur</strong> reçoivent leur gain. Si la proposition est refusée, aucun joueur ne reçoit d'argent. Le <strong style={{ color: '#D25CC0' }}>Commandeur</strong> quant à lui ne reçoit aucun gain.</p>
                    </div>
                    <div className={style.image}>
                        <img src={commandeur} alt='commandeur_regle' />
                        <div className={style.imageContent}>
                            <div className={style.imageDescription}>
                                <Chip label={'1'} /> :  Proposition du <strong style={{ color: '#FAD129' }}>Proposeur</strong>.
                            </div>
                            <div className={style.imageDescription}>
                                <Chip label={'2'} /> :  Cliquez sur ce bouton pour activer les deux boutons de choix en haut aux extrémités de l’écran.
                            </div>
                            <div className={style.imageDescription}>
                                <Chip label={'3'} /> :  Choisir d’accepter (haut à droite) ou de refuser (haut à gauche) l’offre du <strong style={{ color: '#FAD129' }}>Proposeur</strong>.
                            </div>
                        </div>
                    </div>
                    <div className={style.subtitle}>
                        <ChipRole label={'Receveur'} name={'Receveur'} />
                        <p>Le Receveur <strong>gagne une somme d’argent (ou non)</strong> en fonction de la proposition du <strong style={{ color: '#FAD129' }}>Proposeur</strong> et de la décision du <strong style={{ color: '#D25CC0' }}>Commandeur</strong>.</p>
                    </div>
                    <div className={style.image}>
                        <img src={receveur} alt='receveur_regle' />
                        <div className={style.imageContent}>
                            <div className={style.imageDescription}>
                                <Chip label={'1'} /> :  Proposition du <strong style={{ color: '#FAD129' }}>Proposeur</strong>.
                            </div>
                            <div className={style.imageDescription}>
                                <Chip label={'2'} /> :  Décision du <strong style={{ color: '#D25CC0' }}>Commandeur</strong>.
                            </div>
                            <div className={style.imageDescription}>
                                <Chip label={'3'} /> :  Valider l’essai après avoir pris connaissance des actions des autres joueurs (continuer le jeu)
                            </div>
                        </div>
                    </div>
                </> :
                <>
                    <Animation />
                    <div className={style.paragraphe}>
                        All’inizio di ogni turno, il <strong style={{ color: '#FAD129' }}>Proponente</strong> riceve una somma di denaro, ma non la può tenere tutta per sé. Deve fare l’offerta al <strong style={{ color: '#FD932E' }}>Ricevente</strong> e se l’offerta viene accettata dal <strong style={{ color: '#D25CC0' }}>Committente</strong>, si spartiscono la somma. Il <strong style={{ color: '#D25CC0' }}>Committente</strong> decide se l’offerta viene accettata o meno, ma non riceve denaro. Se l’offerta non viene accettata, nessun giocatore riceve il denaro.
                    </div>
                    <div className={style.subtitle}>
                        <ChipRole label={'Proponente'} name={'Proposeur'} />
                        <p>: Ha la possibilità di scegliere come <strong>distribuire il denaro</strong> tra Lei e il <strong style={{ color: '#FD932E' }}>Ricevente</strong>.</p>
                    </div>
                    <div className={style.image}>
                        <img src={proposeur_it} alt='proposeur_regle_it' />
                        <div className={style.imageContent}>
                            <div className={style.imageDescription}>
                                <Chip label={'1'} /> :  Clicca sul pulsante "+" per iniziare la proposta.
                            </div>
                            <div className={style.imageDescription}>
                                <Chip label={'2'} /> :  Divisione della somma di denaro.
                            </div>
                            <div className={style.imageDescription}>
                                <Chip label={'3'} /> :  Sposta il cursore per cambiare la distribuzione tra te e il <strong style={{ color: '#FD932E' }}>Ricevente</strong>.
                            </div>
                            <div className={style.imageDescription}>
                                <Chip label={'4'} /> :  Clicca su "Invia" per inviare l'offerta agli altri giocatori.
                            </div>
                        </div>
                    </div>
                    <div className={style.subtitle}>
                        <ChipRole label={'Committente'} name={'Commandeur'} />
                        <p>Ha la possibilità di approvare o rifiutare l'offerta del <strong style={{ color: '#FAD129' }}>Proponente</strong>. Se la proposta viene accettata, il <strong style={{ color: '#FAD129' }}>Proponente</strong> e il <strong style={{ color: '#FD932E' }}>Ricevente</strong> incassano il denaro. Se la proposta non viene accettata, nessuno riceverà il denaro. Il <strong style={{ color: '#D25CC0' }}>Committente</strong>, però, non riceve denaro.</p>
                    </div>
                    <div className={style.image}>
                        <img src={commandeur_it} alt='commandeur_regle_it' />
                        <div className={style.imageContent}>
                            <div className={style.imageDescription}>
                                <Chip label={'1'} /> :  L'offerta del <strong style={{ color: '#FAD129' }}>Proponente</strong>.
                            </div>
                            <div className={style.imageDescription}>
                                <Chip label={'2'} /> :  Prima di accettare o rifiutare l'offerta; bisogna cliccare qui per attivare i due pulsanti nella parte superiore dello schermo.
                            </div>
                            <div className={style.imageDescription}>
                                <Chip label={'3'} /> :  Accettare (in alto a sinistra) o rifiutare (in alto a destra).
                            </div>
                        </div>
                    </div>
                    <div className={style.subtitle}>
                        <ChipRole label={'Ricevente'} name={'Receveur'} />
                        <p>Il <strong style={{ color: '#FD932E' }}>Ricevente</strong> <strong>guadagna il denaro</strong> se il <strong style={{ color: '#D25CC0' }}>Committente</strong> approva l'offerta del <strong style={{ color: '#FAD129' }}>Proponente</strong>.</p>
                    </div>
                    <div className={style.image}>
                        <img src={receveur_it} alt='receveur_regle_it' />
                        <div className={style.imageContent}>
                            <div className={style.imageDescription}>
                                <Chip label={'1'} /> :  L'offerta del <strong style={{ color: '#FAD129' }}>Proponente</strong>.
                            </div>
                            <div className={style.imageDescription}>
                                <Chip label={'2'} /> :  Accettazione o rifiuto dell'offerta da parte del <strong style={{ color: '#D25CC0' }}>Committente</strong>.
                            </div>
                            <div className={style.imageDescription}>
                                <Chip label={'3'} /> :  Clicca per continuare.
                            </div>
                        </div>
                    </div>
                </>}
        </div>
    )
}

const mapStateToProps = state => ({
    region_global: state.langue.region
});

export default connect(mapStateToProps)(Roledeux)