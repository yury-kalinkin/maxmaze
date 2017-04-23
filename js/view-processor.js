mxmz.viewProcessor = {};

mxmz.viewProcessor.getViewElement = function (selector){
    return document.querySelector(selector);
}

mxmz.viewProcessor.createViewElement = function (selector){
    return document.createElement(selector);
}

mxmz.viewProcessor.setAttributeToViewElement = function (element, attribute, value){
    element.setAttribute(attribute, value);
}

mxmz.viewProcessor.appendSubElementToViewElement = function (element, subElement){
    element.appendChild(subElement);
}

mxmz.viewProcessor.addAnimationToViewElement = function (element, animation){
    element.classList.add(animation);
}

mxmz.viewProcessor.addAnimationToViewElementBySelector = function (selector, animation){
    mxmz.viewProcessor.getViewElement(selector).classList.add(animation);
}

mxmz.viewProcessor.removeAnimationFromViewElement = function (element, animation){
    element.classList.remove(animation);
}

mxmz.viewProcessor.removeAnimationFromViewElementBySelector = function (selector, animation){
    mxmz.viewProcessor.getViewElement(selector).classList.remove(animation);
}

mxmz.viewProcessor.ereaseViewElement = function(selector) {
    document.querySelector(selector).innerHTML = '';
}

mxmz.viewProcessor.fillViewElementBySelector = function(selector, content) {
    mxmz.viewProcessor.getViewElement(selector).innerHTML = content;
}