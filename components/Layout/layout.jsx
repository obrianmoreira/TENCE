import { react, useState } from 'react'
import Style from '../Layout/Layout.module.css'

export const Wall = ({children, wall}) => {

    return (

        <>
        
            <div id={wall} className={Style.wall}>
                {children}
            </div>

        </>

    )

}

export const Frame = ({children, frame, style}) => {

    return (

        <>
        
            <div id={frame} className={Style.frame} style={style}>
                {children}
            </div>

        </>

    )


}