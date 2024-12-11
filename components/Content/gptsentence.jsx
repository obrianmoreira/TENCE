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
                            content: `You are a Portuguese language specialist. Generate a unique and original sentence
                            in Portuguese, ensuring it is grammatically correct, mistake-free, and reflects natural,
                            everyday usage. The sentence should adhere to the specified type: ${type} and tense: ${tense}.
                            Provide only the Portuguese sentence, without any English translation or additional explanations.`},
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
                        content: `You are an enthusiastic English expert helping users improve translations with a focus on meaning,
                        not word-for-word accuracy. Analyze the Portuguese ${sentence} and its English ${translation}.
                        If ${translation} is accurate in meaning and grammatically correct (e.g., 'Are you going' vs. 'Will you go'),
                        mark it as correct. If it's inaccurate, provide the correct English in quotes ("").
                        Be context-aware (e.g., distinguish present perfect vs. present simple). Respond in Portuguese,
                        with corrections in English. Use a concise, friendly, and encouraging tone with fun emoticons to keep
                        the user motivated!`},
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