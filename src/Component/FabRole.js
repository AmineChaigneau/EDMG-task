import { useState, useEffect } from 'react'
import style from './FabRole.module.css'
import { Chip, Avatar } from '@material-ui/core'

export const FabRole = ({ name, margin }) => {

    const [bg, setBg] = useState('#CFCFCF')

    useEffect(() => {
        setBg(name === 'Proposeur' ? '#FAD129' : name === 'Commandeur' ? '#D25CC0' : name === 'Receveur' ? '#FD932E' : '#CFCFCF')
    }, [name, setBg])

    return(
        <div className={style.fab} style={{ background: bg, marginRight: margin}}>
            {name[0]}
        </div>
    )
}

export const ChipRole = ({ name, label, margin }) => {

    const [bg, setBg] = useState('#CFCFCF')
    const [darkbg, setDarkBg] = useState('#CFCFCF')

    useEffect(() => {
        setBg(name === 'Proposeur' ? '#FAD129' : name === 'Commandeur' ? '#D25CC0' : name === 'Receveur' ? '#FD932E' : '#CFCFCF')
        setDarkBg(name === 'Proposeur' ? '#ECC527' : name === 'Commandeur' ? '#A7579B' : name === 'Receveur' ? '#CD731D' : '#939393')
    }, [name, setBg, setDarkBg])

    return(
        <>
            <Chip 
                style={{ color: 'white', background: bg, marginLeft: margin }}
                label={label}
                avatar={<Avatar style={{ color: 'white', background: darkbg }}>{label[0]}</Avatar>}
            />
        </>
    )
}