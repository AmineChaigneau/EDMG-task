import style from './Rotate.module.css'
import { ReactComponent as Rotation } from './rotate.svg'
import { Typography } from '@material-ui/core'

const Rotate = () => {

    return(
        <div className={style.root}>
            <div className={style.svgcontent}>
                <Rotation />
            </div>
            <div className={style.text}>
                <Typography variant='h4'>Vous devez <strong>tourner</strong> votre téléphone (position paysage)</Typography>
            </div>
        </div>
    )
}

export default Rotate