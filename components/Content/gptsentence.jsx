import { useEffect, useState } from "react";
import { Frame } from "../Layout/layout";
import { PText } from "../Items/Texts/texts";
import OpenAI from "openai";
import { useDispatch } from "react-redux";
import { generatedGptSentence } from "@/redux/action";

const GptSentence = ({ type, tense }) => {
    const dispatch = useDispatch();
    const [ptSentence, setPtSentence] = useState('');

    useEffect(() => {
        const contentGenerator = async () => {
            try {
                const openAI = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true});
                const contentGenerator = await openAI.chat.completions.create({
                    model: "gpt-4o-mini",
                    messages: [
                        {role:"system", content: `You are a specialista in Portuguese. Create a random sentence in Portuguese with this sentence type: "${type}" connected with this tense: "${tense}. Pay close attention to create a correct sentence and use appropriate Portuguese expressions. Never show english sentences too.`},
                    ],
                    max_tokens: 100,
                });
                setPtSentence(contentGenerator.choices[0].message.content);
            } catch(error) {
                console.log('Error', error)
                throw error;
            }
        }
        contentGenerator();
    }, [type, tense]);

    useEffect(() => {
        if (ptSentence) {
            dispatch(generatedGptSentence(ptSentence));
        }
    }, [dispatch, ptSentence]); // Only dispatch when gptSentence changes

    return (
        <Frame>
            <PText pText={`${ptSentence}`} />
        </Frame>
    );

};

export const GptCorrection = ({sentence, translation}) => {
    const [correction, setCorrection] = useState("");

    useEffect(() => {
        const contentCorrection = async () => {
            try {
                const openAI = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true});
                const contentGenerator = await openAI.chat.completions.create({
                    model: "gpt-4o-mini",
                    messages: [
                        {role:"system", content: `"You are a very enthusiastic English expert that correct in a concise but warm way. Don't forget to greed the attempt or win at the end. Use emoticons for funny interactions. If the sentence were a win, you don't need to use "vamos la", for example. Remember the goal is not a precise translation but a good adaptation because the student is still Compare this portuguese sentence: ${sentence} with this english sentence: ${translation}. Tell the user using Brazilian Portuguese language if ${translation} is a good translation of the first of ${sentence}. If ${translation} isn't a good translation, show in English using "" how would be a good translation in for ${sentence}. Remember you must talk in Brazilian Portuguese with the user but the sentence corrected must be in English using "". You also must remember to be precise in the correction.`},
                    ],
                    max_tokens: 100,
                });
                setCorrection(contentGenerator.choices[0].message.content);
            } catch(error) {
                console.log('Error', error)
                throw error;
            }
        }
        contentCorrection();
    }, [sentence, translation]);

    return (
        <Frame>
            <PText pText={`${correction}`} />
        </Frame>
    );

}

export default GptSentence;