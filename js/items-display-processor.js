mxmz.itemsDisplayProcessor = {};

mxmz.itemsDisplayProcessor.draw = function(items, from, to) {
    var inventoryBoxDiv = mxmz.viewProcessor.getViewElement('.inventoryBox');
    var rowDiv;
    var cellDiv;

    for (var i = from; i < to; i++) {
        var currItem = items[i];
        rowDiv = mxmz.viewProcessor.createViewElement('div');        
        inventoryBoxDiv.appendChild(rowDiv);        
        cellDiv = mxmz.viewProcessor.createViewElement('div');
        cellDiv.setAttribute('class', 'inventory-image-cell');
        if (currItem){
            cellDiv.classList.add(items[i].cssClass);
        }
        rowDiv.appendChild(cellDiv);
        cellDiv = mxmz.viewProcessor.createViewElement('div');
        cellDiv.setAttribute('class', 'inventory-description-cell');               
        rowDiv.appendChild(cellDiv);
        rowDiv.classList.add('inventory-newRow');
        rowDiv.classList.add('inventory-row-' + i);
        if (currItem){
            var descr = mxmz.playerHelper.translate(currItem.description);
            var qty = currItem.data && currItem.data.qty ? '(' + currItem.data.qty + ') ' : '';
            mxmz.viewProcessor.fillViewElementBySelector(
                    '.inventory-row-' + i + ' .inventory-description-cell', qty + descr);
        }                 
    }    
};

mxmz.itemsDisplayProcessor.updateItemList = function (itemsList, itemsObject){
    mxmz.viewProcessor.ereaseViewElement('.inventoryBox');
    mxmz.itemsDisplayProcessor.draw(
            itemsList, itemsObject.currentBorders.lower, itemsObject.currentBorders.upper);    
}

mxmz.itemsDisplayProcessor.showMarker = function(itemsObject, index, inventoryClass) {
    if(index < itemsObject.currentBorders.lower || index >= itemsObject.currentBorders.upper) {
        return;
    }
    mxmz.viewProcessor.addAnimationToViewElementBySelector(
            '.inventory-row-' + index + ' .inventory-image-cell', inventoryClass);
    mxmz.viewProcessor.addAnimationToViewElementBySelector(
            '.inventory-row-' + index + ' .inventory-description-cell', inventoryClass);
};

mxmz.itemsDisplayProcessor.hideMarker = function(itemsObject, index, inventoryClass) {
    if(index < itemsObject.currentBorders.lower || index >= itemsObject.currentBorders.upper) {
        return;
    }
    mxmz.viewProcessor.removeAnimationFromViewElementBySelector(
            '.inventory-row-' + index + ' .inventory-image-cell', inventoryClass);
    mxmz.viewProcessor.removeAnimationFromViewElementBySelector(
            '.inventory-row-' + index + ' .inventory-description-cell', inventoryClass);    
};

mxmz.itemsDisplayProcessor.selectItem = function(itemsList, itemsObject, step, showMarkerCondition) {

    var currItemIndex = itemsObject.currentCursorItemIndex + step; 
    
    if (itemsList[currItemIndex] && 
            (currItemIndex < itemsObject.currentBorders.lower 
            || currItemIndex > (itemsObject.currentBorders.upper - 1))) {
        itemsObject.currentCursorItemIndex = itemsObject.currentCursorItemIndex + step;
        itemsObject.currentBorders.lower = itemsObject.currentBorders.lower + step;
        itemsObject.currentBorders.upper = itemsObject.currentBorders.upper + step;
        itemsObject.update(step);
    } else {
        currItemIndex = currItemIndex < 0 ? 
            0 : currItemIndex > (itemsObject.currentBorders.upper - 1) ? 
            (itemsObject.currentBorders.upper - 1) : currItemIndex;        
    }

    itemsObject.hideMarker(itemsObject.currentCursorItemIndex, 'inventory-pointed');
    
    itemsObject.currentCursorItemIndex = currItemIndex;    
    
    if (showMarkerCondition()) {        
        itemsObject.showMarker(itemsObject.currentCursorItemIndex, 'inventory-pointed');
    }

}

mxmz.itemsDisplayProcessor.refreshItemsDescription = function(itemsList, itemsObject) {
    for (var i = itemsObject.currentBorders.lower; i < itemsObject.currentBorders.upper; i++) {
        var currItem = itemsList[i];
        if (currItem){
            var descr = mxmz.playerHelper.translate(currItem.description);
            var qty = currItem.data && currItem.data.qty ? '(' + currItem.data.qty + ') ' : '';
            mxmz.viewProcessor.fillViewElementBySelector(
                    '.inventory-row-' + i + ' .inventory-description-cell', qty + descr);
        }
    }    
}