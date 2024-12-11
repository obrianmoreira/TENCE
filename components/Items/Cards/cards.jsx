import Style from '../Cards/Cards.module.css'

export const Cards = ({children, cardClass}) => {

    return (
        <>
        
            <div id={cardClass} className={Style.cardClass}>
                {children}
            </div>
        
        </>
    )

}