import { isMobile } from 'react-device-detect'
import { Typography } from '@material-ui/core'
import { ReactComponent as Computer } from './computer.svg'
import { ReactComponent as Warning } from './warning.svg'
import style from './mobileview.module.css'


const MobileView = ({ children }) => {

    return(
        <>
        {isMobile ? (
            <div className={style.root}>
                <div className={style.warning}>
                    <Warning />
                </div>
                <div className={style.title}>
                    <Typography variant='h2'>To access this game, you must <strong>use a computer</strong></Typography>
                </div>
                <div className={style.content}>
                    <Computer />
                </div>
            </div>
        ) : (
            <div>{children}</div>
        )}
        </>
    )
}

export default MobileView