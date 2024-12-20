import { Cards } from "@/components/Items/Cards/cards"
import { Frame } from "@/components/Layout/layout"
import { Wall } from "@/components/Layout/layout"
import { H1Text, H2Text, PText } from "@/components/Items/Texts/texts"
import { useState } from "react";
import Style from '../sections/Sections.module.css';
import GptSentence from "@/components/Content/gptsentence";
import { Button } from "@/components/Items/Button/button";
import { useSelector } from "react-redux";
import sentenceTypeArray, { sentenceLevelArray } from "@/redux/state";
import { sentenceTenseArray } from "@/redux/state";
import { GptCorrection } from "@/components/Content/gptsentence";

const Form = (props) => {

    const [reset, setReset] = useState(false);
    const [showCorrection, setShowCorrection] = useState(false);

    // Auxiliar input where the person click to open the options and retrieve the auxiliar data
    const [auxInput, setAuxInput] = useState('Escola Seu Auxiliar');
    
    // Type of the sentence input where the person click to open the options and retrieve the type of sentence data
    const [typeInput, setTypeInput] = useState('Tipo de Frase');
    const [tenseInput, setTenseInput] = useState('Tempo Verbal');
    const [levelInput, setLevelInput] = useState('Dificuldade');

    // English input to checked where the person click to write the sentence in English to be compared to Portuguese
    const [englishInput, setEnglishInput] = useState('Clique aqui para traduzir');

    // Show the options of auxiliaries, it works with the ternary operator
    const [showOptions, setShowOptions] = useState(false);

    // Show the options of sentence types, it works with the ternary operator
    const [showTypeOptions, setTypeOptions] = useState(false);
    const [showTenseOptions, setTenseOptions] = useState(false);
    const [showLevelOptions, setLevelOptions] = useState(false);

    // This is the first button. It gets the data from auxiliary and type to update buttonGpt variable
    const [typeGpt, setTypeGpt] = useState('');
    const [tenseGpt, setTenseGpt] = useState('');
    const [levelGpt, setLevelGpt] = useState('');

    // This is the second button. It gets the data from user English version to update buttonGptAgain variable
    const [buttonGptAgain, setButtonGptAgain] = useState('');

    const [blockButton, setBlockButton] = useState(true);
    const [blockResetButton, setBlockResetButton] = useState(true);

    // Filter Menu Boolean
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    //
    const [englishLastVersion, setEnglishLastVersion] = useState('');

    //
    const [loading, setLoading] = useState(true);

    //
    const [mainText, setMainText] = useState('Defina a frase que quer treinar no botão')
    

    // When clicked it gets the data of the li placeholder and make it the data of the auxiliary input
    const handleAux = (auxInput) => {
        setAuxInput(auxInput)
    }

    // When clicked it gets the data of the li placeholder and make it the data of the type pf sentence input
    const handleType = (typeInput) => {
        setTypeInput(typeInput)
        setTypeOptions(!showTypeOptions)
        setMainText("loading...")
    }

    const handleTense = (tenseInput) => {
        setTenseInput(tenseInput)
        setTenseOptions(!showTenseOptions)
        setLoading(true);
        setMainText("loading...")
    }

    const handleLevel = (levelInput) => {
        setLevelInput(levelInput)
        setLevelOptions(!showLevelOptions)
        setLoading(true);
        setMainText("loading...")
    }

    const handleSubFilters = (data) => {
        if(data === "tense") {
            setTenseOptions(!showTenseOptions);
            setTypeOptions(false);
            setLevelOptions(false);
        } else if(data === "type"){
            setTypeOptions(!showTypeOptions);
            setTenseOptions(false);
            setLevelOptions(false);
        } else if(data === "level"){
            setLevelOptions(!showLevelOptions);
            setTenseOptions(false);
            setTypeOptions(false);
        }
    }

    // This function uses the first button to receive the auxiliary and type in the variable of the first button connected with Gpt
    const sendGpt = () => {
        handleRest();
        setLoading(false);
        setTypeGpt(typeInput);
        setTenseGpt(tenseInput);
        setLevelGpt(levelInput);
        setTypeOptions(false);
        setBlockButton(false);
        setShowFilterMenu(!showFilterMenu);
    }

    // This function uses the second button to receive the english input in the variable of the first button connected with Gpt
    const sendGptAgain = () => {
        setShowCorrection(!showCorrection)
        setButtonGptAgain(englishInput)
        setBlockResetButton(true);
        setEnglishLastVersion(englishInput);
    }


    const handleRest = () => {
        setBlockButton(true);
        setTypeInput('Tipo de Frase');
        setTenseInput('Tempo Verbal');
        setReset(false);
        setShowCorrection(false);
        setBlockResetButton(false);
        setEnglishInput('Clique aqui para traduzir')
        setEnglishLastVersion('');
    }

    const ptGptSentence = useSelector(state => state.updateGptSentence.sentence)

    return (

        <>
            <Wall wall={Style.wall}>
                <Frame frame={Style.frameText}>
                    <H1Text h1Text={props.title} h1Style={Style.h1Style}/>
                    <PText pText={props.subTitle} pStyle={Style.pStyle}/>
                </Frame>
                <Frame frame={Style.frameTools}>
                    <Cards cardClass={Style.card}>
                        <Frame frame={Style.frameTitle}>
                            {loading ? 
                                (<>
                                    <Frame style={{flexBasis: "100%"}}>
                                        <PText style={{fontSize: "18px", fontStyle: "italic", fontWeight: "350"}} pText={mainText} />
                                    </Frame>
                                </>) 
                                :
                                (<>
                                    <GptSentence type={typeGpt} tense={tenseGpt} level={levelGpt}/>
                                </>)
                            }
                            <Button buttonClick={() => setShowFilterMenu(!showFilterMenu)} buttonText="☰" buttonStyle={Style.btnStyleFilter} buttonDiv={Style.filterButtonDiv}/>
                        </Frame>
                        {showFilterMenu ? 
                            (<>
                                <Frame style={{display: "flex"}}>
                                    <Cards cardClass={Style.cardFilters}>
                                        <Frame>
                                            <Frame>
                                                <p className={Style.itemP} onClick={() => handleSubFilters("tense")}>{tenseInput}</p>
                                                {/** <Button buttonText="v" buttonStyle={Style.inputButton} buttonClick={() => setTenseOptions(!showTenseOptions)}/>    */}
                                            </Frame>
                                            {showTenseOptions ?  ( 
                                                
                                                <>
                                                    <Cards cardClass={Style.cardSubFilters}>
                                                        <ul>
                                                            {sentenceTenseArray.sentenceTense.map((type) => {
                                                                return(
                                                                    <>
                                                                        <li className={Style.itemLi} onClick={() => handleTense(type.name)}>{type.name}</li>
                                                                    </>
                                                                )
                                                            })}
                                                        </ul>
                                                    </Cards>
            
                                                </>
                                            
                                            ) : (<></>)}
                                        </Frame>
                                        <Frame>
                                            <Frame>
                                                <p className={Style.itemP} onClick={() => handleSubFilters("type")}>{typeInput}</p>
                                                {/** <Button buttonText="v" buttonStyle={Style.inputButton} buttonClick={() => setTenseOptions(!showTenseOptions)}/>    */}
                                            </Frame>
                                            {showTypeOptions ?  ( 
                                                
                                                <>
                                                    <Cards cardClass={Style.cardSubFilters}>
                                                        <ul>
                                                            {sentenceTypeArray.sentenceType.map((type) => {
                                                                return(
                                                                    <>
                                                                        <li className={Style.itemLi} onClick={() => handleType(type.name)}>{type.name}</li>
                                                                    </>
                                                                )
                                                            })}
                                                        </ul>
                                                    </Cards>
            
                                                </>
                                            
                                            ) : (<></>)}
                                        </Frame>
                                        <Frame>
                                            <Frame>
                                                <p className={Style.itemP} onClick={() => handleSubFilters("level")}>{levelInput}</p>
                                                {/** <Button buttonText="v" buttonStyle={Style.inputButton} buttonClick={() => setTenseOptions(!showTenseOptions)}/>    */}
                                            </Frame>
                                            {showLevelOptions ?  ( 
                                                
                                                <>
                                                    <Cards cardClass={Style.cardSubFilters}>
                                                        <ul>
                                                            {sentenceLevelArray.sentenceLevel.map((level) => {
                                                                return(
                                                                    <>
                                                                        <li className={Style.itemLi} onClick={() => handleLevel(level.name)}>{level.name}</li>
                                                                    </>
                                                                )
                                                            })}
                                                        </ul>
                                                    </Cards>
            
                                                </>
                                            
                                            ) : (<></>)}
                                        </Frame>
                                        <Frame frame={Style.frameButton}>
                                            <Button buttonClick={sendGpt} buttonText="Gerar" buttonStyle={Style.btnStyle}/>
                                        </Frame>
                                    </Cards>
                                    
                                </Frame>
                            </>) 
                            : 
                            (<>
                            </>)
                        }
                        {englishLastVersion === "" ? (<>
                            <Frame frame={Style.outputGpt}>
                                <p></p>
                            </Frame>
                        </>): (<>
                        <Frame frame={Style.outputGpt}>
                            <GptCorrection sentence={ptGptSentence} translation={englishLastVersion} level={levelInput}/>
                        </Frame></>)}
                        <Frame frame={Style.frameItems}>
                            <div className={Style.userInput}>
                                <input className={Style.input} type="text" value={englishInput} onChange={() => setEnglishInput(event.target.value)} placeholder={englishInput}/>
                            </div>
                            <div className={Style.btnResult}>
                                <Button buttonClick={sendGptAgain} buttonText="➤" buttonStyle={Style.btnStyleFilter}/>
                            </div>
                        </Frame>
                    </Cards>
                </Frame>
            </Wall>
            <a href=""><PText pText="Website criado por Brian Moreira, professor de Inglês aos seus queridos alunos." pStyle={Style.footerText}/></a>
        </>

    )

}

{/**
    
{reset ? 

{showTenseOptions ?  ( 
                                                
                                                <>
                                                    <Frame frame={Style.inputFrame}>
                                                        <ul>
                                                            {sentenceTenseArray.sentenceTense.map((type) => {
                                                                return(
                                                                    <>
                                                                        <li onClick={() => handleTense(type.name)}>{type.name}</li>
                                                                    </>
                                                                )
                                                            })}
                                                        </ul>
                                                    </Frame>
            
                                                </>
                                            
                                            ) : (
                                                <>
                    
                                                </>
                                            )}
                                            {showTenseOptions ?  ( 
                                                
                                                <>
                                                    <Frame frame={Style.inputFrame}>
                                                        <ul>
                                                            {sentenceTenseArray.sentenceTense.map((type) => {
                                                                return(
                                                                    <>
                                                                        <li onClick={() => handleTense(type.name)}>{type.name}</li>
                                                                    </>
                                                                )
                                                            })}
                                                        </ul>
                                                    </Frame>
            
                                                </>
                                            
                                            ) : (
                                                <>
                    
                                                </>
                                            )}
                            <Button buttonClick={sendGptAgain} buttonText="☰" buttonStyle={Style.btnStyleFilter} buttonDiv={Style.filterButtonDiv}/>


                            {/*
                            
                            <div>
                                {blockResetButton ? (<Button buttonClick={handleRest} buttonText="Reiniciar" buttonStyle={Style.btnStyle}/>) : (<Button buttonClick={sendGpt} buttonText="Reiniciar" buttonStyle={Style.btnDisabled} disabled="disabled"/>)}
                            </div>
<Frame frame={Style.frameCard}>

                            {/* Bellow you find the type of sentence controler 

                                <Frame>
                                    <Frame frame={Style.frameInput}>
                                        <input className={Style.input} placeholder={typeInput}></input>
                                        <Button buttonText="v" buttonStyle={Style.inputButton} buttonClick={() => setTypeOptions(!showTypeOptions)}/>
                                    </Frame>
                                    {showTypeOptions ?  ( 
                                    
                                        <>
                                            <Frame frame={Style.inputFrame}>
                                                <ul>
                                                    {sentenceTypeArray.sentenceType.map((type) => {
                                                        return(
                                                            <>
                                                                <li onClick={() => handleType(type.name)}>{type.name}</li>
                                                            </>
                                                        )
                                                    })}
                                                </ul>
                                            </Frame>

                                        </>
                                    
                                    ) : (
                                        <>

                                        </>
                                    )}
                                </Frame>*/}

                            {/* The end of the type sentence controler */}

                            {/* Bellow you find the sentence tense controler 

                                <Frame>
                                    <Frame frame={Style.frameInput}>
                                        <input className={Style.input} placeholder={tenseInput}/>
                                        <Button buttonText="v" buttonStyle={Style.inputButton} buttonClick={() => setTenseOptions(!showTenseOptions)}/>   
                                    </Frame>
                                    {showTenseOptions ?  ( 
                                        
                                        <>
                                            <Frame frame={Style.inputFrame}>
                                                <ul>
                                                    {sentenceTenseArray.sentenceTense.map((type) => {
                                                        return(
                                                            <>
                                                                <li onClick={() => handleTense(type.name)}>{type.name}</li>
                                                            </>
                                                        )
                                                    })}
                                                </ul>
                                            </Frame>

                                        </>
                                    
                                    ) : (
                                        <>
            
                                        </>
                                    )}
                                </Frame> */}

                            {/* The end of the tense sentence controler */}

                            {/* Bellow you find the generate button 

                                <Frame frame={Style.frameButton}>
                                    {blockButton ? (<Button buttonClick={sendGpt} buttonText="Gerar" buttonStyle={Style.btnStyle}/>) : (<Button buttonClick={sendGpt} buttonText="Gerar" buttonStyle={Style.btnDisabled} disabled="disabled"/>)}
                                </Frame>*/}

                            {/* The end of the generate button 

                            </Frame>
                            ( <Frame>
                                <Frame frame={Style.outputGpt}><GptSentence type={typeGpt}  tense={tenseGpt}/></Frame>
                                {showCorrection ? (<Frame frame={Style.outputGpt}><GptCorrection sentence={ptGptSentence} translation={englishInput}/></Frame>) : (<></>)}
                                </Frame>
                            ) : (<>
                                
                                </>)}
                                {reset ? 
                                    ( <Frame>
                                        <Frame frame={Style.frameInput}>
                                            <input className={Style.input} placeholder={tenseInput}/>
                                            <Button buttonText="v" buttonStyle={Style.inputButton} buttonClick={() => setTenseOptions(!showTenseOptions)}/>   
                                        </Frame>
                                        {showTenseOptions ?  ( 
                                            
                                            <>
                                                <Frame frame={Style.inputFrame}>
                                                    <ul>
                                                        {sentenceTenseArray.sentenceTense.map((type) => {
                                                            return(
                                                                <>
                                                                    <li onClick={() => handleTense(type.name)}>{type.name}</li>
                                                                </>
                                                            )
                                                        })}
                                                    </ul>
                                                </Frame>
        
                                            </>
                                        
                                        ) : (
                                            <>
                
                                            </>
                                        )}
                                    </Frame>
                                    ) : (<></>)
                                }    
    
*/}

export default Form;