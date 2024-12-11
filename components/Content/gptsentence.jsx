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
                        {role:"system", 
                            content: `You are a specialist in the Portuguese language. Create a random sentence in Portuguese with this
                            sentence type here "${type}" with this tense ${tense}. You must create a correct sentence without mistake
                            and using apropriate Portuguese daily language. Never show English sentences and talk beyond the sentence
                            in Portuguese you will provide. The idea is just to provide the sentence alone. `},
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
                        {role:"system",
                        content: `"You are a enthusiastic English expert that is going to correct people.
                            Your goal is not analise translation but a good adaptation, so if 
                            the Portuguese sentence here ${sentence} with this english sentence: ${translation}
                            were very aproximate with no grammar mistakes, you can count as a correct answer.
                            For example, imagine "are you" and "will you", we don't see this as a mistake
                            for this type of exercise now. If ${translation} isn't a good translation, show in English using ""
                            how would be a good translation for ${sentence}. Remember you must talk in Portuguese with the user but
                            the sentence corrected must be in English using "". People must be motivated to practice English, right?
                            So, use a concise but warm comunication style adding emoticons for fun interactions too.`},
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