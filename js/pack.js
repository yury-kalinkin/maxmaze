mxmz.pack = {
    packShow: false,
    packSize: 5,
    selectedItemIndex: 0,
    currentCursorItemIndex: 0,
    packItems: [],
};

mxmz.pack.currentBorders = {
    lower: 0,
    upper: mxmz.pack.packSize
}

mxmz.pack.drawPack = function(items, from, to) {
    mxmz.pack.packShow = true;
    mxmz.pack.packItems = items;
    mxmz.pack.packKeyBoard();
    mxmz.itemsDisplayProcessor.draw(mxmz.pack.packItems, 0, mxmz.pack.packSize);
};

mxmz.pack.hide = function () {    
    mxmz.pack.packShow = false;
    mxmz.viewProcessor.ereaseViewElement('.inventoryBox');
};

mxmz.pack.refreshPackDescription = function() {
    if (!mxmz.pack.packShow) {
        return;
    }
    
    mxmz.itemsDisplayProcessor.refreshItemsDescription(mxmz.pack.packItems, mxmz.pack);
 
}

mxmz.pack.selectItem = function(step) {
    
    if (!mxmz.pack.packShow) {
        return;
    }

    var showMarkerCondition = function() {
        return true;
    };

    mxmz.itemsDisplayProcessor.selectItem(mxmz.pack.packItems, mxmz.pack, step, showMarkerCondition);

}

mxmz.pack.update = function() {
    mxmz.itemsDisplayProcessor.updateItemList(mxmz.pack.packItems, mxmz.pack);
};

mxmz.pack.showMarker = function(index, inventoryClass) {
    mxmz.itemsDisplayProcessor.showMarker(mxmz.pack, index, inventoryClass);
};

mxmz.pack.hideMarker = function(index, inventoryClass) {
    mxmz.itemsDisplayProcessor.hideMarker(mxmz.pack, index, inventoryClass);
};

mxmz.pack.exitPack = function() {
    console.log('mxmz.pack.exitPack');
    mxmz.pack.hide();
    mxmz.viewProcessor.removeAnimationFromViewElementBySelector(
            '.inventoryCategoryBox', 'hide');                            
    mxmz.max.redrawMax();
    mxmz.max.keyBoard();
};

mxmz.pack.packKeyBoard = function () {

    document.onkeydown = function (e) {
//        console.log('mxmz.pack.packKeyBoard > e.keyCode', e.keyCode);
        switch (e.keyCode) {
            case 13: {
                mxmz.pack.exitPack();
                break;
            }
            case 69: {
                mxmz.pack.exitPack();
                break;
            }            
            case 76: {
                mxmz.playerHelper.changeTranslate();
                break;
            }
            case 87: {
                mxmz.pack.selectItem(-1);
                break;
            }
            case 38: {
                mxmz.pack.selectItem(-1);
                break;
            }            
            case 83: {
                mxmz.pack.selectItem(1);
                break;
            }
            case 40: {
                mxmz.pack.selectItem(1);
                break;
            }
            default:
            {
            }
        }

    };
    
};