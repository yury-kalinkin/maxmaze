mxmz.packHelper = {};

mxmz.packHelper.openPack = function(packMaster) {
    var loot = mxmz.packHelper.getItemsFromPack(packMaster);
    mxmz.pack.drawPack(loot, 0, loot.length);
    loot.forEach(function(item) {
        mxmz.max.getItem(item);
    });
}

mxmz.packHelper.getItemsFromPack = function(packMaster) {
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