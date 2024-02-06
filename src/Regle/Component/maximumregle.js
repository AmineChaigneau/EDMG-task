import style from './informations.module.css'
import { connect } from 'react-redux'

const Maximumregle = ({ region_global }) => {

    return (
        <div>
            {region_global === 'fr' ?
                <>
                    <div className={style.paragraphe}>
                        Avant de commencer le jeu, vous allez vous voir offrir la possibilité de vous familiariser avec les différents rôle dans une <strong style={{ color: 'red' }}>phase d’entraînement</strong>. Vous aurez 5 essais par rôle. Pour terminer l’entraînement, vous allez avoir trois essais pour tester vos capacités de performance. Le joueur qui <strong>aura fait le plus de clics</strong> (lors des trois tentatives) gagnera <strong>une récompense</strong>.
                    </div>
                    <div className={style.paragraphe}>
                        Au cours du jeu vous aurez la possibilité, à tout moment, de consulter les informations relatives aux rôles, en cliquant sur le <strong style={{ color: 'blue' }}>bouton "?"</strong> en bas à gauche de votre écran.
                    </div>
                    <div className={style.paragraphe}>
                        <p className={style.description}>
                            Pour continuer, vous devez <strong>cocher la case en dessous</strong> : « J’ai bien compris et je passe à la phase d'entraînement », puis débuter l'entraînement. À la fin de la période d'entraînement, <strong>il faut attendre le feu vert de l'expérimentateur pour continuer</strong>.
                        </p>
                    </div>
                </> :
                <>
                    <div className={style.paragraphe}>
                        Prima di iniziare il gioco, avrai l'opportunità di familiarizzare con le interfacce dei diversi ruoli in una fase di prova. Avrai 5 prove per ruolo. Infine, avrai tre tentativi per testare le tue capacità di performance. Il giocatore che <strong>ha fatto più clic</strong> (durante i tre tentativi) vincerà <strong>un premio</strong>.
                    </div>
                    <div className={style.paragraphe}>
                        Durante il gioco avrà la possibilità di consultare le informazioni riguardo ai ruoli in qualsiasi momento, cliccando sul <strong style={{ color: 'blue' }}>pulsante "?"</strong> in basso a sinistra.
                    </div>
                    {/* 
                    <div>
                        Prima di iniziare l'esperimento, Le chiediamo di eseguire una breve procedura di calibrazione e poi una breve simulazione del gioco.
                    </div> 
                    */}
                    <div className={style.paragraphe}>
                        <p className={style.description}>
                            Per continuare, devi <strong>selezionare la casella qui sotto</strong> e poi cliccare sul pulsante "Iniziare la prova".  Al termine del periodo di addestramento, è necessario attendere <strong style={{ color: 'red'}}>l'autorizzazione dello sperimentatore</strong> prima di continuare.
                        </p>
                    </div>
                </>}
        </div>
    )
}

const mapStateToProps = state => ({
    region_global: state.langue.region
});

export default connect(mapStateToProps)(Maximumregle)