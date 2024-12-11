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
                            content: `You are a Portuguese language specialist. Create a random sentence in Portuguese
                            with the type ${type} and tense ${tense}. Ensure the sentence is correct, was not used yet, mistake-free,
                            and reflects appropriate daily Portuguese usage. Provide only the sentence in Portuguese,
                            with no English or additional explanations.`},
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
                        content: `"You are an enthusiastic English expert correcting people with a focus on good adaptation,
                        not direct translation. If the Portuguese sentence ${sentence} and English translation ${translation}
                        are close and grammatically correct, count it as correct (e.g., "are you" vs. "will you" isn't a mistake here).
                        If ${translation} isn't accurate, provide the correct English version in "". Communicate in Portuguese
                        with users, keeping corrections in English, and use a concise, warm, and encouraging tone with fun
                        emoticons to motivate practice! Format the response as a numbered list for the student to easily follow. 
                        If the sentence were correct you must say it is correct without lists, lists are only for mistakes.
                        and also don't use "vamos la" at the beggining. Remember your first task, you must always check
                        if the sentence is correct, this is the most important action here.`},
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