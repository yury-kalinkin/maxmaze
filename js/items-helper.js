mxmz.itemsHelper = {}

mxmz.itemsHelper.inventoryTypes = {
    ITEM: 'item',    
    LAPTOP: 'laptop'
}

mxmz.itemsHelper.itemTypes = {
    WEAPON: 'weapon',
    AMMO: 'ammo',
    ARMOR: 'armor',
    KEY: 'key',
    ELEMENT: 'element',
    RESOURCE: 'resource',
    ARTIFACT: 'artifact'
}

mxmz.itemsHelper.artifactActions = {
    RESPAWN: 'respawn'
}

mxmz.itemsHelper.resourceActions = {
    RESPAWN: 'respawn',
    CURE: 'cure',
}

mxmz.itemsHelper.itemCode = {
    HAND: 'hand',
    SHOTGUN: 'shotgun',
    WASP_GUN: 'wasp-gun',
    SHELLS: 'shells',
    WASPS: 'wasps',
    POISON_WASPS: 'poison-wasps',    
    POWERED_SHELLS: 'powered-shells',    
    CLONE_MODULE: 'clone-module',
    CLONE: 'clone',
    SMALL_MEDKIT: 'small-medkit',
    MEDKIT: 'medkit',
    BIG_MEDKIT: 'big-medkit',
    BIOPLASMA: 'bioplasma',
    PETRORIT: 'petrorit',
    PLUTONIUS: 'plutonius',
    ORGANOID: 'organoid',
    HYPERQUARTZ: 'hyperquartz',
    DARK_MATTER: 'dark-matter',
    KIKIS: 'kikis',
    OBSIDIAN: 'obsidian',
    DIAMONA: 'diamona',
    MUD_KEY: 'mud-key',
    SHIT: 'shit'
}

mxmz.itemsHelper.activateItem = function(item) {
    switch(item.type) {
        case mxmz.itemsHelper.itemTypes.WEAPON: {
            mxmz.itemsHelper.activateWeapon(item);
            break;
        }
        case mxmz.itemsHelper.itemTypes.RESOURCE: {
            mxmz.itemsHelper.activateResource(item);
            break;
        }        
    }
}

mxmz.itemsHelper.activateResource = function(resource) {
    var max = mxmz.max;
    mxmz.itemsHelper.fireResourceAction(resource);
    max.selectedItem.data.qty--;
    max.removeItemIfQtyIsEmpty(max.selectedItem);
    if (!max.selectedItem.data.qty) {
        max.selectedItem = max.items[0];
        mxmz.playerHelper.refreshAllTranslate();
    }    
}

mxmz.itemsHelper.fireResourceAction = function(item) {
    var max = mxmz.max;
    switch(item.data.action) {
        case mxmz.itemsHelper.resourceActions.CURE: {
            max.changeLife(item.data.value);
            break;
        }
    }
}

mxmz.itemsHelper.activateWeapon = function(weapon) {
    var max = mxmz.max;
    
    var getPushData = function (push) {
        return {
            x: max.maxDirection.x * push,
            y: max.maxDirection.y * push
        }
    }
    
    var range = max.selectedItem.data.range;
    var additionalDamage = 
            max.currentAmmo && max.currentAmmo.data && max.currentAmmo.data.additional_damage 
        ? max.currentAmmo.data.additional_damage : 0;
    var fireCssClass = 
            max.currentAmmo && max.currentAmmo.data && max.currentAmmo.data.fireCssClass;
    var damage = max.selectedItem.data.damage + additionalDamage;
    var reloadTime = max.selectedItem.data.reload_time;
    var push = max.selectedItem.data.push && getPushData(max.selectedItem.data.push);
    if (max.reloading) {
        return;
    }
    max.reloading = true;            
    setTimeout(function(){
        max.reloading = false;
    }, reloadTime);
    if (max.selectedItem.data.code === mxmz.itemsHelper.itemCode.HAND || 
            (max.currentAmmo && max.currentAmmo.data && max.currentAmmo.data.qty)) {
        if(max.selectedItem.data.code === mxmz.itemsHelper.itemCode.HAND) {
            max.showPunch();
        }                

        if (max.selectedItem.data.sound) {
            mxmz.soundProcessor.play(max.selectedItem.data.sound);
        }               
        var step = 1;
        var bingo = false;
        var blocked = false;
        while(step <= range && !bingo && !blocked) {
            var target = mxmz.levelDataProcessor.getCharacterByCoords(
                    max.lookCoords.x + max.maxDirection.x*(step-1), 
            max.lookCoords.y + max.maxDirection.y*(step-1));
            blocked = mxmz.levelDataProcessor.getCellValueByCoords(
                    max.lookCoords.x + max.maxDirection.x*(step-1), 
            max.lookCoords.y + max.maxDirection.y*(step-1)) !== 0;
            if (fireCssClass && !target && !blocked) {
                max.drawParticles(fireCssClass, max.lookCoords.x + max.maxDirection.x*(step-1), 
                max.lookCoords.y + max.maxDirection.y*(step-1));
            }
            if (target && target.life) {
                if(max.selectedItem.data.code === mxmz.itemsHelper.itemCode.HAND) {
                    mxmz.soundProcessor.play(mxmz.soundProcessor.sounds.PUNCH);
                }
                target.getDamage(max, damage, push);
                bingo = true;
            }
            step++;
        }
        max.currentAmmo && max.currentAmmo.data && max.currentAmmo.data.qty--;
        if (max.currentAmmo) {
            max.removeItemIfQtyIsEmpty(max.currentAmmo);
        }                
        mxmz.playerHelper.refreshCurrentAmmo();
    }
}

mxmz.itemsHelper.getItemByKey = function(itemKey) {
    var result;
    var itemQty = itemKey.indexOf('-') !== -1 && 
            itemKey.substring(itemKey.indexOf('-')+1, itemKey.length);
    itemKey = itemKey.replace('i','');
    if (itemQty) {
        itemKey = itemKey.replace('-' + itemQty,'');
    }
    var keys = Object.keys(mxmz.allItems);    
    for(var key of keys) {
        if (mxmz.allItems[key].key === itemKey) {
            resutl = mxmz.utilsHelper.cloneObj(mxmz.allItems[key]);
            if (itemQty && resutl.data.qty) {                
                resutl.data.qty = parseInt(itemQty);
            }
            return resutl;
        }
    }
};

mxmz.itemsHelper.getItemByCode = function(itemCode) {
    return mxmz.utilsHelper.cloneObj(mxmz.allItems[itemCode]);
};

mxmz.itemsHelper.isDroppable = function(item) {
    return item.id !== 'weapon-hand-id';
};