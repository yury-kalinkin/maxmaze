mxmz.loader = {}

mxmz.loader.load = function() {
    mxmz.loader.concatTranslates();
    mxmz.actionProcessor.init();
    mxmz.levelDataProcessor.loadLevel('100');  
};

mxmz.loader.concatTranslates = function() {
    mxmz.ru_translate = Object.assign({}, mxmz.ru_translate, mxmz.getDialogTumoRu());
    mxmz.en_translate = Object.assign({}, mxmz.en_translate, mxmz.getDialogTumoEn());
}