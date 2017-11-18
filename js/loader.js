mxmz.loader = {}

mxmz.loader.load = function() {
    mxmz.loader.concatTranslates();
    mxmz.actionProcessor.init();
    mxmz.levelDataProcessor.loadLevel('100');  
};

mxmz.loader.concatTranslates = function() {
    mxmz.ru_translate = Object.assign({}, mxmz.ru_translate, mxmz.getDialogTumoRu(), 
        mxmz.getDialogNagi1Ru(), mxmz.getDialogNagi2Ru());
    mxmz.en_translate = Object.assign({}, mxmz.en_translate, mxmz.getDialogTumoEn(),
        mxmz.getDialogNagi1En(), mxmz.getDialogNagi2En());
}