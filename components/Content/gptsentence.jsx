import { useEffect, useState } from "react";
import { Frame } from "../Layout/layout";
import { PText } from "../Items/Texts/texts";
import OpenAI from "openai";
import { useDispatch } from "react-redux";
import { generatedGptSentence } from "@/redux/action";

const GptSentence = ({ type, tense, level }) => {
    const dispatch = useDispatch();
    const [ptSentence, setPtSentence] = useState('loading...');

    useEffect(() => {
        const contentGenerator = async (prompt) => {
            try {
                const openAI = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true});
                const contentGenerator = await openAI.chat.completions.create({
                    model: "gpt-4o-mini",
                    messages: [
                        {role:"system", 
                            content: prompt},
                    ],
                    max_tokens: 100,
                });
                setPtSentence(contentGenerator.choices[0].message.content);
            } catch(error) {
                console.log('Error', error)
                throw error;
            }
        }

        if(type && tense && level){
            let prompt = "";
        
            if (level === "Básico") {
                prompt = `You are a Portuguese language specialist. Generate a simple and easy-to-understand sentence in Portuguese. The sentence should be short and use the following type: ${type}, and the following tense: ${tense}.`;
            } else if (level === "Médio") {
                prompt = `You are a Portuguese language specialist. Generate a moderately complex sentence in Portuguese. The sentence should use the following type: ${type}, and the following tense: ${tense}. Make it slightly longer but still accessible for intermediate learners.`;
            } else if (level === "Difícil") {
                prompt = `You are a Portuguese language specialist. Generate a complex and detailed sentence in Portuguese. The sentence should use the following type: ${type}, and the following tense: ${tense}. Ensure it challenges an advanced learner but remains grammatically correct.`;
            } else if (level === "Fluente") {
                prompt = `You are a Portuguese language specialist. Generate a nuanced and sophisticated sentence in Portuguese. The sentence should use the following type: ${type}, and the following tense: ${tense}. Make it suitable for a fluent speaker, with advanced vocabulary and natural phrasing.`;
            }
        
            contentGenerator(prompt);
        } else {
            console.error("Error: level, type, or tense is missing.");
        }
    }, [type, tense, level]);

    useEffect(() => {
        if (ptSentence && ptSentence !== "loading...") {
            dispatch(generatedGptSentence(ptSentence));
        }
    }, [dispatch, ptSentence]); // Only dispatch when gptSentence changes

    return (
        <Frame style={{flexBasis: "100%"}}>
            <PText style={{fontSize: "18px", fontStyle: "italic", fontWeight: "350"}} pText={`${ptSentence}`} />
        </Frame>
    );

};

export const GptCorrection = ({ sentence, translation, level }) => {
    const [correction, setCorrection] = useState("");

    useEffect(() => {
        const contentCorrection = async () => {
            try {
                const openAI = new OpenAI({
                    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
                    dangerouslyAllowBrowser: true,
                });

                // Define the base prompt logic
                let prompt = "";

                if (level === "Básico") {
                    prompt = `
                    You are an enthusiastic English teacher helping beginner students with translations.
                    Analyze the Portuguese sentence: "${sentence}" and its English translation: "${translation}".
                    
                    Be forgiving and only check for **simple rules**:
                    - Allow auxiliary verbs (e.g., "I do go" instead of "I go").
                    - Accept both contracted forms (e.g., "I'm") and uncontracted forms (e.g., "I am").
                    - Focus on making the student feel confident. If a sentence is correct *enough*, call it "correct" with a small suggestion if needed.
                    
                    Respond in Portuguese with corrections (if any) in English. Keep the tone simple, supportive, and encouraging.`;
                } else if (level === "Médio") {
                    prompt = `
                    You are an enthusiastic English teacher helping intermediate students with translations.
                    Analyze the Portuguese sentence: "${sentence}" and its English translation: "${translation}".
                    
                    Focus on these aspects:
                    - Ensure auxiliary verbs (e.g., "He does go") match tense and tone.
                    - Encourage use of contracted forms (e.g., "I'm" over "I am") for natural English.
                    - If there’s a minor issue (e.g., missing plural or article), gently suggest a correction in quotes ("").
                    
                    Respond in Portuguese with corrections in English. Keep the tone supportive and moderately detailed.`;
                } else if (level === "Difícil") {
                    prompt = `
                    You are an advanced English teacher helping proficient students with translations.
                    Analyze the Portuguese sentence: "${sentence}" and its English translation: "${translation}".
                    
                    Expect higher accuracy:
                    - Point out errors in verb tense, auxiliary usage, and contractions.
                    - Correct issues with syntax, word order, or idiomatic expressions.
                    - Provide detailed feedback with grammar explanations for corrections in quotes ("").
                    
                    Respond in Portuguese with corrections in English. Use clear, advanced grammar terms to explain errors, but keep the tone engaging and constructive.`;
                } else if (level === "Fluente") {
                    prompt = `
                    You are an expert English teacher helping fluent speakers refine their translations.
                    Analyze the Portuguese sentence: "${sentence}" and its English translation: "${translation}".
                    
                    Focus on perfection:
                    - Critique nuanced grammar, idiomatic phrasing, and tone.
                    - Provide sophisticated feedback on meaning, context, and style.
                    - Explain corrections (in quotes) in-depth with grammar and cultural insights.
                    
                    Respond in Portuguese with corrections and examples in English. Keep the tone advanced, motivational, and professional.`;
                }

                // Call OpenAI API with the dynamically created prompt
                const contentGenerator = await openAI.chat.completions.create({
                    model: "gpt-4o-mini", // Replace with the correct model if necessary
                    messages: [
                        {
                            role: "system",
                            content: prompt,
                        },
                    ],
                    max_tokens: 300, // Adjust the token limit if needed
                });

                // Save the response in state
                setCorrection(contentGenerator.choices[0].message.content);
            } catch (error) {
                console.error("Error", error);
                throw error;
            }
        };

        // Only call contentCorrection if both sentence and translation are present
        if (sentence && translation && level) {
            contentCorrection();
        } else {
            console.error("Error: sentence, translation, or level is missing.");
        }
    }, [sentence, translation, level]); // Ensure level is included here

    return (
        <Frame>
            <PText pText={`${correction}`} />
        </Frame>
    );
};

/*`You are a Portuguese language specialist. Generate a unique, and original sentence
in Portuguese, in this level ${level} ensuring it is grammatically correct, avoiding repetition of words, mistake-free, and reflects natural,
everyday usage. The sentence should adhere to the specified type: ${type} and tense: ${tense}.
Provide only the Portuguese sentence, without any English translation or additional explanations.`*/
export default GptSentence;