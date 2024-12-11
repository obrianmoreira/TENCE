import { Cards } from "@/components/Items/Cards/cards"
import { Frame } from "@/components/Layout/layout"
import { Wall } from "@/components/Layout/layout"
import { H1Text, H2Text, PText } from "@/components/Items/Texts/texts"
import { useState } from "react";
import Style from '../sections/Sections.module.css';
import GptSentence from "@/components/Content/gptsentence";
import { Button } from "@/components/Items/Button/button";
import { useSelector } from "react-redux";
import sentenceTypeArray from "@/redux/state";
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

    // English input to checked where the person click to write the sentence in English to be compared to Portuguese
    const [englishInput, setEnglishInput] = useState('Clique aqui para traduzir');

    // Show the options of auxiliaries, it works with the ternary operator
    const [showOptions, setShowOptions] = useState(false);

    // Show the options of sentence types, it works with the ternary operator
    const [showTypeOptions, setTypeOptions] = useState(false);
    const [showTenseOptions, setTenseOptions] = useState(false);


    // This is the first button. It gets the data from auxiliary and type to update buttonGpt variable
    const [typeGpt, setTypeGpt] = useState('');
    const [tenseGpt, setTenseGpt] = useState('');

    // This is the second button. It gets the data from user English version to update buttonGptAgain variable
    const [buttonGptAgain, setButtonGptAgain] = useState('');

    const [blockButton, setBlockButton] = useState(true);
    const [blockResetButton, setBlockResetButton] = useState(true);

    // When clicked it gets the data of the li placeholder and make it the data of the auxiliary input
    const handleAux = (auxInput) => {
        setAuxInput(auxInput)
    }

    // When clicked it gets the data of the li placeholder and make it the data of the type pf sentence input
    const handleType = (typeInput) => {
        setTypeInput(typeInput)
        setTypeOptions(!showTypeOptions)
    }

    const handleTense = (tenseInput) => {
        setTenseInput(tenseInput)
        setTenseOptions(!showTenseOptions)
    }

    // This function uses the first button to receive the auxiliary and type in the variable of the first button connected with Gpt
    const sendGpt = () => {
        setReset(true);
        setTypeGpt(typeInput);
        setTenseGpt(tenseInput)
        setTypeOptions(false);
        setBlockButton(false)
    }

    // This function uses the second button to receive the english input in the variable of the first button connected with Gpt
    const sendGptAgain = () => {
        setShowCorrection(!showCorrection)
        setButtonGptAgain(englishInput)
        setBlockResetButton(true);
        if (blockButton === false) {
            alert('Você precisa apertar o botão "Reiniciar" para nossa AI criar uma nova frase.')
        }
    }


    const handleRest = () => {
        setBlockButton(true);
        setTypeInput('Tipo de Frase');
        setTenseInput('Tempo Verbal');
        setReset(false);
        setShowCorrection(false);
        setBlockResetButton(false);
        setEnglishInput('Clique aqui para traduzir')
    }

    const ptGptSentence = useSelector(state => state.updateGptSentence.sentence)

    return (

        <>
            <Wall wall={Style.wall}>
            <Frame frame={Style.frameText}>
                    <H1Text h1Text={props.title} h1Style={Style.h1Style}/>
                    <PText pText={props.subTitle} pStyle={Style.pStyle}/>
                </Frame>
                <Cards cardClass={Style.card}>
                    <H2Text h2Text={props.titleCard} h2Style={Style.h2Style}/>
                    <Frame frame={Style.frameCard}>
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
                        </Frame>
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
                        </Frame>
                        <Frame frame={Style.frameButton}>
                            {blockButton ? (<Button buttonClick={sendGpt} buttonText="Gerar" buttonStyle={Style.btnStyle}/>) : (<Button buttonClick={sendGpt} buttonText="Gerar" buttonStyle={Style.btnDisabled} disabled="disabled"/>)}
                        </Frame>
                    </Frame>
                    {reset ? ( <Frame>
                        <br />
                        <Frame frame={Style.outputGpt}><GptSentence type={typeGpt}  tense={tenseGpt}/></Frame>
                        <br />
                        {showCorrection ? (<Frame frame={Style.outputGpt}><GptCorrection sentence={ptGptSentence} translation={englishInput}/></Frame>) : (<></>)}
                    </Frame>
                    ) : (<></>)}
                    <Frame frame={Style.frameItems}>
                        <div className={Style.userInput}>
                            <input className={Style.input} type="text" value={englishInput} onChange={() => setEnglishInput(event.target.value)} placeholder={englishInput}/>
                        </div>
                        <div className={Style.btnResult}>
                            <Button buttonClick={sendGptAgain} buttonText="Resultado" buttonStyle={Style.btnStyle}/>
                        </div>
                        <div>
                            {blockResetButton ? (<Button buttonClick={handleRest} buttonText="Reiniciar" buttonStyle={Style.btnStyle}/>) : (<Button buttonClick={sendGpt} buttonText="Reiniciar" buttonStyle={Style.btnDisabled} disabled="disabled"/>)}
                        </div>
                    </Frame>
                </Cards>
            </Wall>
            <a href=""><PText pText="Website criado por Brian Moreira, professor de Inglês aos seus queridos alunos." pStyle={Style.footerText}/></a>
        </>

    )

}

export default Form;