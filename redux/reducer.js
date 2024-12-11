import sentenceTypeArray, { correctionGpt } from "./state"; 
import { sentenceTenseArray } from "./state";
import { sentenceGpt } from "./state";

const reducer = (state = sentenceTypeArray, action) => {

    switch (action.type) {
        case 'UPDATE_SENTENCE_TYPE':
            return {
                ...state,
                name: action.payload,
            };
        default:
            return state
    };

};

export const updateGptSentence = (state = sentenceGpt, action) => {
    switch(action.type) {
        case 'UPDATE_GPT_SENTENCE':
            return {
                ...state,
                sentence: action.payload,
            };
        default:
            return state;
    }
}

export const updateGptCorrection = (state = correctionGpt, action) => {
    switch(action.type) {
        case 'UPDATE_GPT_CORRECTION':
            return {
                ...state,
                correction: action.payload,
            };
        default:
            return state;
    }
}

export const reducerSentenceTense = (state = sentenceTenseArray, action) => {

    switch (action.type) {
        case 'UPDATE_SENTENCE_TENSE':
            return {
                ...state,
                name: action.payload,
            };
        default:
            return state
    };

};

export default reducer;