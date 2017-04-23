mxmz.cssHelper = {};

mxmz.cssHelper.removeMaxCss = function(element) {
    var classList = element.classList;
    for (var i = 0; i < classList.length; i++) {
        if (classList[i] !== 'max_in_portal' && classList[i].indexOf('max_') === 0) {
            element.classList.remove(classList[i]);            
            mxmz.cssHelper.removeMaxSpecialCss(element);
            return;
        }
    }    
}

mxmz.cssHelper.removeMaxSpecialCss = function(element) {
    element.classList.remove('max_damage');
    element.classList.remove('max_healing');
    element.classList.remove('max_front_punch');
    element.classList.remove('max_left_punch');
    element.classList.remove('max_right_punch');
    element.classList.remove('max_back_punch');
}

mxmz.cssHelper.removeCharacterCss = function(element, additionalClass) {
    mxmz.cssHelper.removeMonsterCss(element, additionalClass);
    mxmz.cssHelper.removeNpcCss(element, additionalClass);
}

mxmz.cssHelper.removeMonsterCss = function(element, additionalClass) {
    var classList = element.classList;
    for (var i = 0; i < classList.length; i++) {
        if (classList[i].indexOf('monster_') === 0 && classList[i].indexOf('dead') < 0) {
            element.classList.remove(classList[i]);
            element.classList.remove(additionalClass);
            return;
        }
    }
}

mxmz.cssHelper.removeNpcCss = function(element, additionalClass) {
    var classList = element.classList;
    for (var i = 0; i < classList.length; i++) {
        if (classList[i].indexOf('npc_') === 0 && classList[i].indexOf('dead') < 0) {
            element.classList.remove(classList[i]);
            element.classList.remove(additionalClass);
            return;
        }
    }
}

mxmz.cssHelper.removeMaxDeathCss = function() {
    var element = mxmz.viewProcessor.getViewElement('.death');
    var classList = element.classList;
    for (var i = 0; i < classList.length; i++) {
        if (classList[i].indexOf('death_monster') === 0 
                || classList[i].indexOf('dead-zone') === 0) {
            element.classList.remove(classList[i]);
            mxmz.viewProcessor.removeAnimationFromViewElementBySelector('.gameField', 'death');
            return;
        }
    }
}

mxmz.cssHelper.removeCharacterDecayCss = function(element) {
    mxmz.cssHelper.removeMonsterDecayCss(element);
}

mxmz.cssHelper.removeMonsterDecayCss = function(element) {    
    var classList = element.classList;
    for (var i = 0; i < classList.length; i++) {
        if (classList[i].indexOf('monster') === 0 && classList[i].indexOf('dead') > 0) {
            element.classList.remove(classList[i]);
            return;
        }
    }    
}

mxmz.cssHelper.removeClosedChestClass = function(selector) {
    mxmz.viewProcessor.getViewElement(selector);
    mxmz.viewProcessor.removeAnimationFromViewElementBySelector(selector, 'max_chest_closed');
    mxmz.viewProcessor.removeAnimationFromViewElementBySelector(selector, 'alien_chest_closed');
    mxmz.viewProcessor.removeAnimationFromViewElementBySelector(selector, 'max_spec_chest_closed');
    mxmz.viewProcessor.removeAnimationFromViewElementBySelector(selector, 'alien_spec_chest_closed');    
}