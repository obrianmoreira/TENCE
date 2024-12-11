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
                            with the type ${type} and tense ${tense}. Ensure the sentence is correct, mistake-free,
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
                        content: `"You are a Portuguese language specialist. When creating a sentence, follow these steps and list them for clarity:
                        Create a random sentence in Portuguese based on the given type ${type} and tense ${tense}.
                        Ensure the sentence is correct, mistake-free, and reflects appropriate daily Portuguese usage.
                        Provide only the sentence in Portuguese—do not include any English or additional explanations.
                        Format the response as a numbered list for the student to easily follow.
                        This way, the student will see a clear list format and understand the sentence structure better!`},
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