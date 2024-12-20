const selectSentenceType = (sentenceType) => {

    return {

        type: 'UPDATE_SENTENCE_TYPE',
        payload: sentenceType,

    };

};

const selectSentenceTense = (sentenceTense) => {

    return {

        type: 'UPDATE_SENTENCE_TENSE',
        payload: sentenceTense,

    };

};

const selectSentenceLevel = (sentenceLevel) => {
    return {
        type: 'UPDATE_SENTENCE_LEVEL',
        payload: sentenceLevel,
    };
}

export const generatedGptSentence = (gptSentence) => {

    return {
        type: 'UPDATE_GPT_SENTENCE',
        payload: gptSentence,

    };

};

export const generatedGptCorrection = (gptCorrection) => {

    return {
        type: 'UPDATE_GPT_CORRECTION',
        payload: gptCorrection,

    };

};