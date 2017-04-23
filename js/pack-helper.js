mxmz.packHelper = {};

mxmz.packHelper.openPack = function(packMaster) {
    var loot = mxmz.packHelper.getItemsFromPack(packMaster);
    mxmz.inventory.draw(loot, 0, loot.length);
    mxmz.interactionProcessor.keyDown(mxmz.interactionProcessor.interactions.OPEN_PACK);
    loot.forEach(function(item) {
        mxmz.max.getItem(item);
    });
}

mxmz.packHelper.getItemsFromPack = function(packMaster) {
    console.log('getItemsFromPack > packMaster:', packMaster);
    var packItemsList = [];    
    for (var itemWrapper of mxmz.npcs[packMaster].pack) {
        var currItem = mxmz.itemsHelper.getItemByCode(itemWrapper.itemCode);
        currItem.data.qty = currItem.data.qty * itemWrapper.itemQtyMult;
        packItemsList.push(currItem);
    }
    return mxmz.utilsHelper.cloneObj(packItemsList);
}

mxmz.packHelper.packItemWrapper = function(itemCode, itemQtyMult) {
    this.itemCode = itemCode;
    this.itemQtyMult = itemQtyMult ? itemQtyMult : 1;
}