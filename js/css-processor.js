mxmz.cssProcessor = {}

mxmz.cssProcessor.getPortalClass = function(portalType) {
    portalType = portalType.length ? '_' + portalType : '';
    var portalPostfix = portalType;
    return 'portal' + portalPostfix;
}

mxmz.cssProcessor.getBoxClass = function(boxType) {
    return boxType;
}

mxmz.cssProcessor.getCrystallClass = function(crystallType) {
    return 'crystall_' + crystallType.replace('c', '');
}

mxmz.cssProcessor.getItemClass = function(itemKey) {
    return mxmz.itemsHelper.getItemByKey(itemKey).cssClass;
}

mxmz.cssProcessor.getSpecialDecorationClass = function(levelType, maxDecorIndex) {
    return 'spec_decor_' + mxmz.utilsHelper.getRandomInt(0, maxDecorIndex) + levelType;
}

mxmz.cssProcessor.getCustomDecorationClass = function(place) {
    return 'custom_decor' + place;
}

mxmz.cssProcessor.getDeadZoneClass = function(place) {    
    return 'dead_zone_' + place.replace('#', '');
}

mxmz.cssProcessor.getWallClass = function(levelType) {
    return 'wall_' + mxmz.utilsHelper.getRandomInt(0, 2) + levelType;
}

mxmz.cssProcessor.getFloorClass = function(levelType) {
    return 'floor_' + mxmz.utilsHelper.getRandomInt(0, 2) + levelType;
}