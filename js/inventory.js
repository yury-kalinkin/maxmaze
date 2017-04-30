mxmz.inventory = {
    currentCursorCategoryIndex: 0,
    inventoryShow: false,    
    inventorySize: 5,
    categorySize: mxmz.inventoryHelper.categories.length,
    selectedItemIndex: 0,
    currentCursorItemIndex: 0,
    filteredItems: [],
    ammoSelection: false
};

mxmz.inventory.currentBorders = {
    lower: 0,
    upper: mxmz.inventory.inventorySize
}

mxmz.inventory.drawInventoryCategories = function() {
    
    mxmz.inventory.inventoryShow = false;
    
    var invenoryCategoryBoxDiv = mxmz.viewProcessor.getViewElement('.inventoryCategoryBox');
    
    var rowDiv = mxmz.viewProcessor.createViewElement('div');
    invenoryCategoryBoxDiv.appendChild(rowDiv);
    for (var i = 0; i < mxmz.inventory.categorySize; i++) {
        var cellDiv = mxmz.viewProcessor.createViewElement('div');
        cellDiv.classList.add('category-cell');
        cellDiv.classList.add('inventory-category-' + i + '-cell');
        if (mxmz.inventory.currentCursorCategoryIndex === i) {
            cellDiv.classList.add(mxmz.inventoryHelper.selectedCategoryClasses[i]);
        } else {
            cellDiv.classList.add(mxmz.inventoryHelper.categoryClasses[i]);
        }        
        rowDiv.appendChild(cellDiv);
        invenoryCategoryBoxDiv.appendChild(rowDiv);
    }
};

mxmz.inventory.drawInventory = function (){
    mxmz.inventory.inventoryShow = true;
    mxmz.itemsDisplayProcessor.draw(
            mxmz.inventory.filteredItems, mxmz.inventory.currentBorders.lower, mxmz.inventory.currentBorders.upper);
}

mxmz.inventory.update = function (){        
    mxmz.itemsDisplayProcessor.updateItemList(mxmz.inventory.filteredItems, mxmz.inventory);
    mxmz.inventory.showMarker(mxmz.inventory.selectedItemIndex, 'inventory-selected');
}

mxmz.inventory.refreshInventoryDescription = function() {
    if (!mxmz.inventory.inventoryShow) {
        return;
    }
    mxmz.itemsDisplayProcessor.refreshItemsDescription(mxmz.inventory.filteredItems, mxmz.inventory);
   
}

mxmz.inventory.selectCategory = function(step) {

    if (mxmz.inventory.inventoryShow) {
        return;
    }

    mxmz.inventory.currentBorders.lower = 0;
    mxmz.inventory.currentBorders.upper = mxmz.inventory.inventorySize;

    var nextCategoryIndex = mxmz.inventory.currentCursorCategoryIndex + step; 
    
//    nextCategoryIndex = nextCategoryIndex < 0 ? 
//        0 : nextCategoryIndex > 4 ? 
//        4 : mxmz.inventory.currentCursorCategoryIndex;

    if (nextCategoryIndex < 0){
        nextCategoryIndex = 0;
    } else if (nextCategoryIndex === mxmz.inventory.categorySize) {
        nextCategoryIndex = mxmz.inventory.categorySize-1;
    }

    var prevElem = mxmz.viewProcessor.getViewElement(
            '.inventoryCategoryBox .inventory-category-' + mxmz.inventory.currentCursorCategoryIndex + '-cell');
    var classToRemove = mxmz.inventoryHelper.selectedCategoryClasses[mxmz.inventory.currentCursorCategoryIndex];
    var classToAdd = mxmz.inventoryHelper.categoryClasses[mxmz.inventory.currentCursorCategoryIndex];    
    
    prevElem.classList.remove(classToRemove);
    prevElem.classList.add(classToAdd);    

    var nextElem = mxmz.viewProcessor.getViewElement(
            '.inventoryCategoryBox .inventory-category-' + nextCategoryIndex + '-cell');
    classToRemove = mxmz.inventoryHelper.categoryClasses[nextCategoryIndex];
    classToAdd = mxmz.inventoryHelper.selectedCategoryClasses[nextCategoryIndex];
    
    nextElem.classList.remove(classToRemove);
    nextElem.classList.add(classToAdd);
    
    mxmz.inventory.currentCursorCategoryIndex = nextCategoryIndex;
    
}

mxmz.inventory.activateCategory = function() {

    if (mxmz.inventory.inventoryShow) {
        return;
    }
    
    mxmz.viewProcessor.addAnimationToViewElementBySelector('.inventoryCategoryBox', 'hide');
    mxmz.inventory.show(mxmz.inventoryHelper.categories[mxmz.inventory.currentCursorCategoryIndex]);
    
}

mxmz.inventory.selectItem = function(step) {
    
    if (!mxmz.inventory.inventoryShow) {
        return;
    }

    var showMarkerCondition = function() {
        return mxmz.inventory.currentCursorItemIndex !== mxmz.inventory.selectedItemIndex 
            || mxmz.inventory.ammoSelection;
    };

    mxmz.itemsDisplayProcessor.selectItem(mxmz.inventory.filteredItems, mxmz.inventory, step, showMarkerCondition);

}

mxmz.inventory.activateItem = function(index) {

    if (!mxmz.inventory.filteredItems[index]) {
        return;
    }
    
    mxmz.max.selectedItem = mxmz.inventory.filteredItems[index];
    mxmz.max.loadAmmoIfNeed(); 

    mxmz.inventory.hideMarker(mxmz.inventory.selectedItemIndex, 'inventory-selected');
    mxmz.inventory.hideMarker(mxmz.inventory.currentCursorItemIndex, 'inventory-pointed');
    mxmz.inventory.showMarker(index, 'inventory-selected');
    
    mxmz.inventory.selectedItemIndex = index;
    mxmz.playerHelper.refreshAllTranslate();
}

mxmz.inventory.setAmmo = function(index) {
    if (!mxmz.inventory.filteredItems[index]) {
        return;
    }
    mxmz.max.loadAmmo(mxmz.inventory.filteredItems[index]);
    mxmz.inventory.showLastInventory();
    mxmz.playerHelper.refreshCurrentAmmo();
}

mxmz.inventory.showLastInventory = function() {
    mxmz.inventory.ammoSelection = false;
    var categoryFilter = 
            mxmz.inventoryHelper.categories[mxmz.inventory.currentCursorCategoryIndex];
    mxmz.inventory.filteredItems = mxmz.max.items.filter(function(item){
        return categoryFilter.indexOf(item.type) !== -1;
    });
    mxmz.inventory.currentCursorItemIndex = mxmz.inventory.selectedItemIndex;
    mxmz.inventory.update();    
}

mxmz.inventory.show = function(categoryFilter) {    
    
    mxmz.inventory.inventoryShow = true; 
    
    mxmz.inventory.filteredItems = mxmz.max.items.filter(function(item){
        return categoryFilter.indexOf(item.type) !== -1;
    });    
    
    var selectedInCurrentCategory = false;
    
    for(var i=0; i < mxmz.inventory.filteredItems.length; i++) {
        if (mxmz.inventory.filteredItems[i].id === mxmz.max.selectedItem.id) {
            selectedInCurrentCategory = true;
            if (i < mxmz.inventory.inventorySize) {
                mxmz.inventory.currentBorders.lower = 0;
                mxmz.inventory.currentBorders.upper = mxmz.inventory.inventorySize;
            } else {
                mxmz.inventory.currentBorders.lower = i - mxmz.inventory.inventorySize+1;
                mxmz.inventory.currentBorders.upper = i+1;
            }
            
        }
    }
    
    if (!selectedInCurrentCategory){
        mxmz.inventory.currentBorders.lower = 0;
        mxmz.inventory.currentBorders.upper = mxmz.inventory.inventorySize;        
    }
    
    mxmz.inventory.drawInventory(categoryFilter);
    mxmz.inventory.refreshInventoryDescription();
    
    mxmz.inventory.selectedItemIndex = -1;

    for(var i=0; i < mxmz.inventory.filteredItems.length; i++) {
        if (mxmz.inventory.filteredItems[i].id === mxmz.max.selectedItem.id) {
            mxmz.inventory.selectedItemIndex = i;
        }
    }
    
    if (mxmz.inventory.selectedItemIndex === -1 
            || (mxmz.inventory.selectedItemIndex < mxmz.inventory.currentBorders.lower 
            || mxmz.inventory.selectedItemIndex > mxmz.inventory.currentBorders.upper)) {
        mxmz.inventory.currentCursorItemIndex = 0;
        mxmz.inventory.showMarker(mxmz.inventory.currentCursorItemIndex, 'inventory-pointed');
    } else {
        mxmz.inventory.currentCursorItemIndex = mxmz.inventory.selectedItemIndex;
        mxmz.inventory.showMarker(mxmz.inventory.selectedItemIndex, 'inventory-selected');
        mxmz.inventory.hideMarker(mxmz.inventory.currentCursorItemIndex, 'inventory-pointed');
    }    

}

mxmz.inventory.hide = function () {    
    mxmz.inventory.inventoryShow = false;
    mxmz.viewProcessor.ereaseViewElement('.inventoryBox');
}

mxmz.inventory.reset = function() {
    mxmz.viewProcessor.removeAnimationFromViewElementBySelector('.inventoryCategoryBox', 'hide');
    mxmz.viewProcessor.ereaseViewElement('.inventoryCategoryBox');
    mxmz.inventory.hide();    
}

mxmz.inventory.inventoryKeyBoard = function () {
    
    mxmz.inventory.drawInventoryCategories();

    document.onkeydown = function (e) {
//        console.log('e.keyCode', e.keyCode);
        switch (e.keyCode) {
            case 73: {
                    if (mxmz.inventory.inventoryShow){
                        if (mxmz.inventory.ammoSelection) {
                            mxmz.inventory.showLastInventory();
                        } else {
                            mxmz.inventory.hide();
                            mxmz.viewProcessor.removeAnimationFromViewElementBySelector(
                                    '.inventoryCategoryBox', 'hide');                            
                        }
                    } else {
                        mxmz.viewProcessor.ereaseViewElement('.inventoryCategoryBox');
                        mxmz.max.redrawMax();
                        mxmz.max.keyBoard();
                    }
                    
                break;
            }
            case 65: {
                mxmz.inventory.selectCategory(-1);
                break;                    
            }
            case 37: {
                mxmz.inventory.selectCategory(-1);
                break;                    
            }            
            case 68: {
                mxmz.inventory.selectCategory(1);
                break;                    
            }
            case 39: {
                mxmz.inventory.selectCategory(1);
                break;                    
            }            
            case 76: {
                mxmz.playerHelper.changeTranslate();
                break;
            }
            case 87: {
                mxmz.inventory.selectItem(-1);
                break;
            }
            case 38: {
                mxmz.inventory.selectItem(-1);
                break;
            }            
            case 83: {
                mxmz.inventory.selectItem(1);
                break;
            }
            case 40: {
                mxmz.inventory.selectItem(1);
                break;
            }            
            case 32: {
                    if (!mxmz.inventory.inventoryShow) {
                        mxmz.inventory.activateCategory();
                    } else {
                        if (mxmz.inventory.ammoSelection) {
                            mxmz.inventory.setAmmo(mxmz.inventory.currentCursorItemIndex);
                        } else {
                            mxmz.inventory.activateItem(mxmz.inventory.currentCursorItemIndex);
                        }                       
                    }                
                break;
            }
            case 16: {
                    var ammoForLoad;
                    if (mxmz.inventory.isAmmoPresentForSelectedWeapon()) {
                        ammoForLoad = mxmz.max.items.filter(function(item){
                            return item.type === mxmz.itemsHelper.itemTypes.AMMO &&
                                    item.data.weapon_code === mxmz.max.selectedItem.data.code;
                            });
                    }
                    if (ammoForLoad && ammoForLoad.length) {                    
                        mxmz.inventory.ammoSelection = true;
                        mxmz.inventory.filteredItems = mxmz.max.items.filter(function(item){
                            return item.type === mxmz.itemsHelper.itemTypes.AMMO &&
                                    item.data.weapon_code === mxmz.max.selectedItem.data.code;
                        });
                        
                        if (mxmz.inventory.filteredItems.length) {
                            mxmz.inventory.showAmmoSelectionForSelectedWeapon();
                        }
                    }             
                break;
            }
            default:
            {
            }
        }

    };
    
};

mxmz.inventory.showAmmoSelectionForSelectedWeapon = function() {
    mxmz.inventory.update();
    mxmz.inventory.hideMarker(mxmz.inventory.currentCursorItemIndex, 'inventory-selected');
    mxmz.inventory.currentCursorItemIndex = 0;
    mxmz.inventory.showMarker(mxmz.inventory.currentCursorItemIndex, 'inventory-pointed');    
}

mxmz.inventory.isAmmoPresentForSelectedWeapon = function() {
    return mxmz.inventory.inventoryShow && mxmz.max.selectedItem.key === 
            (mxmz.inventory.filteredItems[mxmz.inventory.currentCursorItemIndex] && 
                mxmz.inventory.filteredItems[mxmz.inventory.currentCursorItemIndex].key) &&
            mxmz.max.selectedItem.type === mxmz.itemsHelper.itemTypes.WEAPON;
}

mxmz.inventory.showMarker = function(index, inventoryClass) {
    mxmz.itemsDisplayProcessor.showMarker(mxmz.inventory, index, inventoryClass);
};

mxmz.inventory.hideMarker = function(index, inventoryClass) {
    mxmz.itemsDisplayProcessor.hideMarker(mxmz.inventory, index, inventoryClass);
};