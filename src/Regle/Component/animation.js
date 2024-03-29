import { Typography } from '@material-ui/core'
import { ReactComponent as Argent } from '../../Ressources/argent.svg'
import style from './animation.module.css'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


const Role = ({ name, bg }) => {
    return (
        <div
            className={style.fabAnim}
            style={{
                background: bg
            }}>
            <div className={style.fab}>
                {name[0]}
            </div>
        </div>
    )
}

const Arrow = () => {
    return (
        <div className={style.arrowContainer}>
            <svg width="100" height="24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M99.0607 13.0607C99.6464 12.4749 99.6464 11.5251 99.0607 10.9393L89.5147 1.3934C88.9289 0.807612 87.9792 0.807612 87.3934 1.3934C86.8076 1.97918 86.8076 2.92893 87.3934 3.51472L95.8787 12L87.3934 20.4853C86.8076 21.0711 86.8076 22.0208 87.3934 22.6066C87.9792 23.1924 88.9289 23.1924 89.5147 22.6066L99.0607 13.0607ZM0 13.5H98V10.5H0V13.5Z" fill="black" />
            </svg>
        </div>
    )
}

const Animation = () => {


    return (
        <div className={style.player}>
            <div className={style.playerinfo}>
                <div className={style.roleContainer}>
                    <Role name={'Proposeur'} bg={'#FAD129'} />
                    <div className={style.proposeur}>
                        <Typography>5€</Typography>
                        <Argent />
                        <Typography>5€</Typography>
                    </div>
                </div>
                <Arrow />
                <div className={style.roleContainer}>
                    <Role name={'Commandeur'} bg={'#D25CC0'} />
                    <div className={style.commandeur}>
                        <HighlightOffIcon style={{ color: '#CFCFCF' }} />
                        <CheckCircleOutlineIcon style={{ color: 'green' }} />
                    </div>
                </div>
                <Arrow />
                <div className={style.roleContainer}>
                    <Role name={'Receveur'} bg={'#FD932E'} />
                </div>
            </div>
        </div>
    )
}

export default Animation