import Style from '../Button/Button.module.css'

export const Button = (props) => {

    return (

        <>

            <div id={props.buttonDiv}>
                <button id={props.buttonStyle} className={Style.buttonStyle} src={props.buttonSrc} onClick={props.buttonClick} disabled={props.disabled}>
                    {props.buttonText}
                </button>
            </div>
        
        </>

    )

}