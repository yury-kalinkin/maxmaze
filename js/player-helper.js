mxmz.playerHelper = {
    scores: null,
    currentLang: null
}

mxmz.playerHelper.getScoresForCrystall = function(crystallType) {
    switch (crystallType) {
        case 'c1':
            return 5;
        case 'c2':
            return 10;
        case 'c3':
            return 25;
        case 'c4':
            return 100;
        default:
            return null;
    }
}

mxmz.playerHelper.getTranslate = function() {
    return mxmz.playerHelper.currentLang;
}

mxmz.playerHelper.switchTranslate = function() {
    mxmz.playerHelper.currentLang = mxmz.playerHelper.currentLang === mxmz.en_translate ? mxmz.ru_translate : mxmz.en_translate;
}

mxmz.playerHelper.translate = function(key) {
    return mxmz.playerHelper.getTranslate()[key] || key;
}

mxmz.playerHelper.setScores = function(scores) {
    mxmz.viewProcessor.fillViewElementBySelector('.scores', '<b>$ ' + scores + '&nbsp</b>');
}

mxmz.playerHelper.setLife = function(life) {
    mxmz.viewProcessor.fillViewElementBySelector('.life', '<b>&#9829;&nbsp' + life + '&nbsp</b>');
}

mxmz.playerHelper.toggleGameInfo = function() {
    jQuery.each(jQuery('.gameInfo'), function(ind, el) {
        jQuery(el).toggleClass('hide');
    })
}

mxmz.playerHelper.refreshSelectedItem = function() {
    var selectedItem = mxmz.max.selectedItem;
    if (selectedItem && selectedItem.name) {
        mxmz.viewProcessor.fillViewElementBySelector(
                '.selected_item', '<b> ' + mxmz.playerHelper.translate(selectedItem.name) + '</b>');
    }    
}

mxmz.playerHelper.refreshCurrentAmmo = function() {
    var ammoInfoString = '';
    var currentAmmo = mxmz.max.currentAmmo;    
    if (currentAmmo && currentAmmo.data) {
        var currentAmmoQty = currentAmmo && currentAmmo.data && currentAmmo.data.qty;
        var currentAmmoName = mxmz.playerHelper.translate(currentAmmo.name);        
        ammoInfoString = '&nbsp/&nbsp<b>' + currentAmmoName + ':' + currentAmmoQty + '</b>';
    }
    mxmz.viewProcessor.fillViewElementBySelector('.current_ammo', ammoInfoString);
}

mxmz.playerHelper.initScores = function() {
    mxmz.playerHelper.scores = 0;
    mxmz.playerHelper.setScores(mxmz.playerHelper.scores);
}

mxmz.playerHelper.refreshWorldInfoSpan = function() {
    mxmz.viewProcessor.fillViewElementBySelector(
            '.world', '<b>' + mxmz.playerHelper.translate(mxmz.levelDataProcessor.currentLevel.name) + '</b>');
}

mxmz.playerHelper.changeTranslate = function() {
    mxmz.playerHelper.switchTranslate();
    mxmz.playerHelper.refreshWorldInfoSpan();
    mxmz.playerHelper.refreshSelectedItem();
    mxmz.playerHelper.refreshCurrentAmmo();
    mxmz.inventory.refreshInventoryDescription();
    mxmz.pack.refreshPackDescription();
    mxmz.chestHelper.changeOpenedChestItemsTranslate();
}

mxmz.playerHelper.refreshAllTranslate = function() {
    mxmz.playerHelper.refreshWorldInfoSpan();
    mxmz.playerHelper.refreshSelectedItem();
    mxmz.playerHelper.refreshCurrentAmmo();
    mxmz.inventory.refreshInventoryDescription();  
}