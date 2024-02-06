import { Button, Typography } from "@material-ui/core"
import style from './index.module.css'
import { useHistory } from 'react-router-dom'
import { time_update } from '../Redux/Actions/trials_record'
import { connect } from 'react-redux'

const Acceuil = ({ time_update, region_global }) => {

    const history = useHistory();

    const d = new Date();

    const start = d.getTime();

    function handleClick() {
        time_update(start)
        history.push("/Consigne");
    }

    return (
        <div className={style.root}>
            <div className={style.header}>
                <Typography variant='h1'>
                    {region_global === 'fr' ? "Bienvenue !" : "Benvenuto/a !"}
                </Typography>
            </div>
            <div className={style.container}>
                <Button variant='contained' color='primary' onClick={handleClick}>
                    {region_global === 'fr' ? "Cliquez pour continuer" : "Premere qui per iniziare"}
                </Button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    region_global: state.langue.region
});

export default connect(mapStateToProps, { time_update })(Acceuil)