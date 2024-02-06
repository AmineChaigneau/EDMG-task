import {
    LOAD_USER_MAIA_SUCCES,
    LOAD_USER_MAIA_FAIL,
    POST_USER_MAIA_SUCCES,
    POST_USER_MAIA_FAIL
} from '../Actions/types'

const initialState = {
    subject_id: '',
    maia_completed: false,
    data_maia: [{ label: 'Lorsque je suis tendu, je perçois où la tension se situe dans mon corps.', value: '' }, { label: 'Lorsque je me sens mal dans mon corps, je le remarque.', value: '' }, { label: "J'identifie/je remarque à quel endroit de mon corps je me sens confortable", value: '' }, { label: "Je perçois les changements dans ma respiration, par exemple lorsqu'elle ralentit ou accélère", value: '' }, { label: "Je ne perçois pas (j’ignore) les tensions physiques ou l’inconfort jusqu’à ce qu’ils ne deviennent sévères.", value: '' }, { label: "Je me détache des sensations d’inconfort.", value: '' }, { label: "Lorsque je ressens de la douleur ou de l’inconfort, je m'efforce de les surmonter.", value: '' }, { label: "Lorsque je ressens une douleur physique, cela me stresse", value: '' }, { label: "Je commence à me soucier que quelque chose n'aille pas dès que je ressens le moindre inconfort.", value: '' }, { label: "Je peux percevoir une sensation corporelle déplaisante sans m'en inquiéter.", value: '' }, { label: "Je peux prêter attention à ma respiration sans être distrait par les choses qui arrivent autour de moi.", value: '' }, { label: "Je peux rester conscient de mes sensations corporelles intérieures même lorsqu'il se passe beaucoup de choses autour de moi).", value: '' }, { label: "Lorsque je suis en conversation avec quelqu'un, je peux porter attention à ma posture.", value: '' }, { label: "Je peux rediriger mon attention sur mon corps si je suis distrait.", value: '' }, { label: "Je peux détourner mon attention de mes pensées pour la tourner vers mon corps (vers mes sensations corporelles).", value: '' }, { label: "Je peux conserver la conscience de l'ensemble de mon corps même lorsqu'une partie de moi-même éprouve de la douleur ou de l'inconfort.", value: '' }, { label: 'Je suis capable de focaliser mes pensées de façon consciente sur mon corps dans son entier.', value: '' }, { label: 'Je perçois comment mon corps change lorsque je suis en colère.', value: '' }, { label: "Lorsque quelque chose ne va pas dans ma vie, je peux le ressentir dans mon corps.", value: '' }, { label: "Je remarque que mes sensations corporelles changent après une expérience apaisante.", value: '' }, { label: "Je perçois que ma respiration devient dégagée et aisée lorsque je me sens confortable.", value: '' }, { label: "Je perçois comment mon corps change lorsque je me sens heureux/joyeux.", value: '' }, { label: "Lorsque je me sens débordé, je peux trouver un endroit calme à l’intérieur de moi.", value: '' }, { label: "Lorsque je prends conscience de mon corps, je ressens une sensation de calme.", value: '' }, { label: "Je peux utiliser ma respiration pour réduire la tension.", value: '' }, { label: "Lorsque je suis pris dans mes pensées, je peux calmer mon esprit en me concentrant sur mon corps / sur ma respiration.", value: '' }, { label: "Je suis à l'écoute de mon corps concernant mon état émotionnel.", value: '' }, { label: "Lorsque je suis stressé, je prends le temps d'explorer comment mon corps se sent.", value: '' }, { label: "J’écoute mon corps afin de m’informer sur ce que je dois faire.", value: '' }, { label: "Je suis chez moi dans mon corps.", value: '' }, { label: "Je sens que mon corps est un endroit sûr.", value: '' }, { label: "Je fais confiance à mes sensations corporelles.", value: '' }]
}

export default function maia(state = initialState, action) {
    const { type, payload } = action; 

    switch (type) {
        case LOAD_USER_MAIA_SUCCES:
        case POST_USER_MAIA_SUCCES:
            return {
                ...state,
                subject_id: payload.username,
                maia_completed: payload.maia_completed,
                data_maia: payload.data_maia
            }
        case LOAD_USER_MAIA_FAIL:
            return {
                ...state,
                subject_id: '',
                maia_completed: false,
                data_maia: [{ label: 'Lorsque je suis tendu, je perçois où la tension se situe dans mon corps.', value: '' }, { label: 'Lorsque je me sens mal dans mon corps, je le remarque.', value: '' }, { label: "J'identifie/je remarque à quel endroit de mon corps je me sens confortable", value: '' }, { label: "Je perçois les changements dans ma respiration, par exemple lorsqu'elle ralentit ou accélère", value: '' }, { label: "Je ne perçois pas (j’ignore) les tensions physiques ou l’inconfort jusqu’à ce qu’ils ne deviennent sévères.", value: '' }, { label: "Je me détache des sensations d’inconfort.", value: '' }, { label: "Lorsque je ressens de la douleur ou de l’inconfort, je m'efforce de les surmonter.", value: '' }, { label: "Lorsque je ressens une douleur physique, cela me stresse", value: '' }, { label: "Je commence à me soucier que quelque chose n'aille pas dès que je ressens le moindre inconfort.", value: '' }, { label: "Je peux percevoir une sensation corporelle déplaisante sans m'en inquiéter.", value: '' }, { label: "Je peux prêter attention à ma respiration sans être distrait par les choses qui arrivent autour de moi.", value: '' }, { label: "Je peux rester conscient de mes sensations corporelles intérieures même lorsqu'il se passe beaucoup de choses autour de moi).", value: '' }, { label: "Lorsque je suis en conversation avec quelqu'un, je peux porter attention à ma posture.", value: '' }, { label: "Je peux rediriger mon attention sur mon corps si je suis distrait.", value: '' }, { label: "Je peux détourner mon attention de mes pensées pour la tourner vers mon corps (vers mes sensations corporelles).", value: '' }, { label: "Je peux conserver la conscience de l'ensemble de mon corps même lorsqu'une partie de moi-même éprouve de la douleur ou de l'inconfort.", value: '' }, { label: 'Je suis capable de focaliser mes pensées de façon consciente sur mon corps dans son entier.', value: '' }, { label: 'Je perçois comment mon corps change lorsque je suis en colère.', value: '' }, { label: "Lorsque quelque chose ne va pas dans ma vie, je peux le ressentir dans mon corps.", value: '' }, { label: "Je remarque que mes sensations corporelles changent après une expérience apaisante.", value: '' }, { label: "Je perçois que ma respiration devient dégagée et aisée lorsque je me sens confortable.", value: '' }, { label: "Je perçois comment mon corps change lorsque je me sens heureux/joyeux.", value: '' }, { label: "Lorsque je me sens débordé, je peux trouver un endroit calme à l’intérieur de moi.", value: '' }, { label: "Lorsque je prends conscience de mon corps, je ressens une sensation de calme.", value: '' }, { label: "Je peux utiliser ma respiration pour réduire la tension.", value: '' }, { label: "Lorsque je suis pris dans mes pensées, je peux calmer mon esprit en me concentrant sur mon corps / sur ma respiration.", value: '' }, { label: "Je suis à l'écoute de mon corps concernant mon état émotionnel.", value: '' }, { label: "Lorsque je suis stressé, je prends le temps d'explorer comment mon corps se sent.", value: '' }, { label: "J’écoute mon corps afin de m’informer sur ce que je dois faire.", value: '' }, { label: "Je suis chez moi dans mon corps.", value: '' }, { label: "Je sens que mon corps est un endroit sûr.", value: '' }, { label: "Je fais confiance à mes sensations corporelles.", value: '' }]            
            }
        case POST_USER_MAIA_FAIL: 
            return {
                ...state
            }
        default: 
            return state
    }
}