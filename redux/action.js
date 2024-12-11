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