import Style from '../Texts/Texts.module.css'

export const Texts = ({children}, props) => {

    return (
        <>
        
            <div id={props.main} className={Style.main}>
                {children}
            </div>
        
        </>
    )

}

export const H1Text = (props) => {

    return (
        <>
        
            <h1 id={props.h1Style} className={Style.h1Style}>
                {props.h1Text}
            </h1>
        
        </>
    )

}

export const H2Text = (props) => {

    return (
        <>
        
            <h2 id={props.h2Style} className={Style.h2Style}>
                {props.h2Text}
            </h2>
        
        </>
    )

}

export const H3Text = (props) => {

    return (
        <>
        
            <h3 id={props.h3Style} className={Style.h3Style}>
                {props.h3Text}
            </h3>
        
        </>
    )

}

export const H4Text = (props) => {

    return (
        <>
        
            <h4 id={props.h4Style} className={Style.h4Style}>
                {props.h4Text}
            </h4>
        
        </>
    )

}

export const H5Text = (props) => {

    return (
        <>
        
            <h5 id={props.h5Style} className={Style.h5Style}>
                {props.h5Text}
            </h5>
        
        </>
    )

}

export const H6Text = (props) => {

    return (
        <>
        
            <h6 id={props.h6Style} className={Style.h6Style}>
                {props.h6Text}
            </h6>
        
        </>
    )

}


export const PText = (props) => {

    return (
        <>
        
            <p id={props.pStyle} className={Style.pStyle}>
                {props.pText}
            </p>
        
        </>
    )

}

