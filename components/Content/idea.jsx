import { useEffect, useState } from "react";
import GptCorrection from "./gptcorrection";
import { H1Text, PText } from "../Items/Texts/texts";
import axios from "axios";
import { stringify } from "postcss";
import { Button } from "../Items/Button/button";
import { Frame, Wall } from "../Layout/layout";

const Idea = ({}) => {

    const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    const [gptSearch, setGptSearch] = useState([]);
    const [searchText, setSearchText] = useState('Entre com algo para pesquisar sobre myData');
    const [realSearch, setRealSearch] = useState('Nothing yet');
    const [showSearch, setShowSearch] = useState(false);

    const myData = [
        {id: 1, text: 'Cat!'},
        {id: 2, text: 'Mouse!'},
    ];

    const prompt = `${realSearch} ${JSON.stringify(myData)}`

    const handleSearch = () => {

        setRealSearch(searchText);

        if (showSearch === true) {
            setShowSearch(true);
        } else {
            setShowSearch(!showSearch);
        }

    }

    useEffect(() => {

        if(prompt) {

            const GeneratedSentence = async () => {

                try {

                    const res = await axios.post (
                        "https://api.openai.com/v1/engines/text-davinci-003/completions",
                        {
                            prompt: prompt,
                            max_tokens: 100,
                            temperature: 0.7,
                        },
                        {
                            headers: {

                                "Authorization": `Bearer ${API_KEY}`,
                                "Content-Type": "application/json",

                            }
                        }

                    );

                    const {choices} = res.data;
                    if(choices && choices.length > 0) {
                        const content = choices[0].text;
                        setGptSearch(content);
                    }

                } catch(error) {

                    console.log("Eror", error);

                }   

            }

            GeneratedSentence();

        }

    }, [prompt, API_KEY]);
    
    return (
        
        <>
            <Wall>
                <input type="text" placeholder={searchText} onChange={() => setSearchText(event.target.value)} value={searchText}/>
                <Button buttonText="Pesquisar" buttonClick={handleSearch} />
                {showSearch ? (

                    <>
                    
                        <Frame>
                            {
                                gptSearch   
                            }
                        </Frame>
                    
                    </>
                    
                    ) : (<></>)}
            </Wall>
        </>
    
    )

}

export default Idea;