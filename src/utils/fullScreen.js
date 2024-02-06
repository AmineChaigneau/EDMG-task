import { useRef, useEffect, useCallback } from "react";
import useFullscreenStatus from "./useFullScreenStatus";
import { connect } from 'react-redux'
import { Dialog, Button, DialogContent, Typography } from '@material-ui/core'
import style from './fullScreen.module.css'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import { useWindowDimensions } from '../hook'
import { browserName } from 'react-device-detect';
import { ReactComponent as Chrome } from './chrome.svg'
import { fullscreen_count } from '../Redux/Actions/trials_record'
import { update_screen } from '../Redux/Actions/current_trial'

const FullScreen = ({ children, region_global, fullscreen_count, update_screen }) => {

    const { height, width } = useWindowDimensions();

    const screenUpdate = useCallback(() => {
        update_screen({ height_device: height, width_device: width })
      }, [update_screen, height, width])

    useEffect(() => {
        screenUpdate();
    }, [screenUpdate])

    const maximizeElement = useRef(null);
    let isFullscreen, setIsFullscreen;
    let errorMessage;

    try {
        [isFullscreen, setIsFullscreen] = useFullscreenStatus(maximizeElement);
    } catch (e) {
        errorMessage = "Fullscreen not supported";
        isFullscreen = false;
        setIsFullscreen = undefined;
    }

    const handleClick = () => {
        setIsFullscreen();
        console.log(isFullscreen)
    }

    const fullScreenMode = useCallback(() => {
        fullscreen_count();
        console.log(`browser dectect ${browserName} fullSreenMode: ${isFullscreen}`)
      }, [fullscreen_count, isFullscreen])

    useEffect(() => {
        !isFullscreen && fullScreenMode();
    }, [isFullscreen, fullScreenMode])

    return (
        <div ref={maximizeElement} style={{ background: '#fafafa' }}>
            {errorMessage ? (
                <div className={style.errorRoot}>
                    <div className={style.errorContainer}>
                        <div className={style.errorTitle}>
                            <Typography>{region_global === 'fr' ?  "Erreur" : "Errore"}</Typography>
                        </div>
                        <div className={style.errorParagraphe}>
                            <Typography>{region_global === 'fr' ? "Le mode plein écran (fullscreen mode) n'est pas supporté par votre navigateur." : "La modalità a schermo intero (fullscreen mode) non è supportata dal tuo browser."}</Typography>
                        </div>
                        <div className={style.errorIcon}>
                            <Typography>{region_global === 'fr' ? "Pour jouer au jeu veuillez vous orienter vers un autre navigateur, comme google chrome." : "Per giocare si prega di utilizzare un altro browser, come ad esempio google chrome."}</Typography>
                            <Chrome />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <Dialog open={!isFullscreen} style={{ zIndex: 999999 }}>
                    {/* <Dialog open={false} style={{ zIndex: 999999 }}> */}
                        <DialogContent>
                            <div className={style.title}>
                                {region_global === 'fr' ? (
                                    <Typography variant='h2'>
                                        PLEIN ECRAN REQUIS (FULLSCREEN)
                                    </Typography>
                                ) : (
                                    <Typography variant='h2'>
                                        SCHERMO INTERO RICHIESTO (FULLSCREEN)
                                    </Typography>
                                )}
                            </div>
                            <div className={style.paragraphe}>
                                {region_global === 'fr' ? (
                                    <Typography>
                                        En poursuivant votre navigateur exploitera <strong style={{ color: 'red' }}>la totalité de la surface d'affichage de votre écran</strong> (i.e fullscreen mode). Vous ne pourrez pas intéragir avec le jeu si le mode "fullscreen" n'est pas activé.
                                    </Typography>
                                ) : (
                                    <Typography>
                                        Mentre continuate, il vostro <strong style={{ color: 'red' }}>browser occuperà l'intera area di visualizzazione del vostro schermo</strong> (i.e fullscreen mode). Non sarà possibile interagire con il gioco se la modalità a schermo intero non è abilitata.
                                    </Typography>
                                )}
                            </div>
                            <div className={style.footer}>
                                <Button variant='outlined' onClick={handleClick}><FullscreenIcon style={{ marginRight: 5 }} />{region_global === 'fr' ? 'Continuer' : 'Continuare'}</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <div style={{ overflow: 'auto' }}>
                        {children}
                    </div>
                    {/* ADD ICI LE TEXT + RECORD LE NOMBRE DE FOIS + RECORD LA TAILLE DE L'ECRAN */}
                </>
            )}
        </div>
    );

}

const mapStateToProps = state => ({
    region_global: state.langue.region
})

export default connect(mapStateToProps, { fullscreen_count, update_screen })(FullScreen)