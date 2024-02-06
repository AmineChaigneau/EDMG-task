import { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { update_current_role } from '../Redux/Actions/role'
import { record_trial } from '../Redux/Actions/trials_record'
import { post_current_trial } from '../Redux/Actions/current_trial'


const Continuer = ({ role_global, max_global, gain_global, state_global, update_current_role, record_trial, post_current_trial }) => {

    useEffect(() => {
        record_trial(state_global)

        const gain_trial = gain_global + state_global.gain_user
        const update = { role: role_global, maximum: max_global, gain: gain_trial }
        update_current_role(update)
        post_current_trial(state_global)
    }, [role_global])
    return(
        <Redirect to={`/${role_global}`}/>
    )
}

const mapStateToProps = state => ({
    role_global: state.role.role,
    max_global: state.role.maximum,
    gain_global: state.role.gain,
    state_global: state.currentTrial,
})

export default connect(mapStateToProps, { update_current_role, record_trial, post_current_trial })(Continuer)