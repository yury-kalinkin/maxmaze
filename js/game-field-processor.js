mxmz.gameFieldProcessor = {};

mxmz.gameFieldProcessor.isHerePlayerStart = function(place) {
	return place === 'p';
}

mxmz.gameFieldProcessor.isHereSpecialDecoration = function(place) {
	return place === 2;
}

mxmz.gameFieldProcessor.isHereCustomDecoration = function(place) {
	if (place.length && place.indexOf('_')  === 0) {
		return true;
	}
}

mxmz.gameFieldProcessor.isHereDeadZone = function(place) {
    if (place.length && place.indexOf('#')  === 0) {
            return true;
    }
}

mxmz.gameFieldProcessor.isHereWall = function(place) {
    return place === 1;
}

mxmz.gameFieldProcessor.isHereFloor = function(place) {
    return place === 0;
}

mxmz.gameFieldProcessor.isHerePickUp = function(place) {
    return mxmz.gameFieldProcessor.isHereCrystall(place) ||
            mxmz.gameFieldProcessor.isHereItem(place);
}

mxmz.gameFieldProcessor.isIt = function(place) {
    return place !== undefined && isNaN(place);
}

mxmz.gameFieldProcessor.isHereCrystall = function(place) {
    return (mxmz.gameFieldProcessor.isIt(place) && place.indexOf('c') === 0);
}

mxmz.gameFieldProcessor.isHereItem = function(place) {
    return (mxmz.gameFieldProcessor.isIt(place) && place.indexOf('i') === 0);
}

mxmz.gameFieldProcessor.isHerePack = function(place) {
    return (mxmz.gameFieldProcessor.isIt(place) && place.indexOf('p') === 0);
}

mxmz.gameFieldProcessor.isHerePortal = function(place) {
	return (isNaN(place) && place.indexOf('w') === 0);
}

mxmz.gameFieldProcessor.isHereMonster = function(place) {
	return (isNaN(place) && place.indexOf('m') === 0);
}

mxmz.gameFieldProcessor.isHereNpc = function(place) {
	return (isNaN(place) && place.indexOf('n-') === 0);
}

mxmz.gameFieldProcessor.isHereClosedBox = function(place) {
    return (isNaN(place) && mxmz.chestHelper.closedBoxes[place]);
}

mxmz.gameFieldProcessor.isHereBox = function(place) {
    return (isNaN(place) && place.indexOf('b') === 0);
}

mxmz.gameFieldProcessor.isHereRescuePod = function(place) {
    return place === 'rp';
}

///

mxmz.gameFieldProcessor.putWall = function(params) {
    mxmz.viewProcessor.addAnimationToViewElement(
            params.cell, mxmz.cssProcessor.getWallClass(mxmz.levelDataProcessor.levelType));
}

mxmz.gameFieldProcessor.putMonster = function(params) {
    var monsterType = params.element.replace('m', '');
    var newMonster = new mxmz.Monster(mxmz.utilsHelper.getRandomInt(1, 10000), params.index2+1, params.index1+1, monsterType);
    mxmz.levelDataProcessor.characters.push(newMonster);
    mxmz.viewProcessor.addAnimationToViewElement(
            params.cell, newMonster.getClass(monsterType, 'front', mxmz.levelDataProcessor.levelType));
    mxmz.viewProcessor.addAnimationToViewElement(
            params.cell, mxmz.cssProcessor.getFloorClass(mxmz.levelDataProcessor.levelType));    
}

mxmz.gameFieldProcessor.putNpc = function(params) {
    var npcType = params.element.replace('n-', '');
    var newNpc = new mxmz.Npc(mxmz.utilsHelper.getRandomInt(1, 10000), params.index2+1, params.index1+1, npcType);
    mxmz.levelDataProcessor.characters.push(newNpc);
    console.log('newNpc: ', newNpc);
    console.log('newNpc.getClass: ', newNpc.getClass(newNpc.imagePrefix, 'front'));
    mxmz.viewProcessor.addAnimationToViewElement(
            params.cell, newNpc.getClass(newNpc.imagePrefix, 'front'));
    mxmz.viewProcessor.addAnimationToViewElement(
            params.cell, mxmz.cssProcessor.getFloorClass(mxmz.levelDataProcessor.levelType));    
}

mxmz.gameFieldProcessor.putPlayerStart = function(params) {
    mxmz.viewProcessor.addAnimationToViewElement(
            params.cell, mxmz.cssProcessor.getFloorClass(mxmz.levelDataProcessor.levelType));
    params.maxStartX = params.index2+1;
    params.maxStartY = params.index1+1;
    params.isPresentPlayerStart = true;    
}

mxmz.gameFieldProcessor.putCrystall = function(params) {
    mxmz.viewProcessor.addAnimationToViewElement(
            params.cell, mxmz.cssProcessor.getCrystallClass(params.element));
    mxmz.viewProcessor.addAnimationToViewElement(
            params.cell, mxmz.cssProcessor.getFloorClass(mxmz.levelDataProcessor.levelType));    
}

mxmz.gameFieldProcessor.putItem = function(params) {
    mxmz.viewProcessor.addAnimationToViewElement(
            params.cell, mxmz.cssProcessor.getItemClass(params.element));
    mxmz.viewProcessor.addAnimationToViewElement(
            params.cell, mxmz.cssProcessor.getFloorClass(mxmz.levelDataProcessor.levelType));    
}

mxmz.gameFieldProcessor.putPack = function(params) {
    mxmz.viewProcessor.addAnimationToViewElement(
            params.cell, 'pack');
    mxmz.viewProcessor.addAnimationToViewElement(
            params.cell, mxmz.cssProcessor.getFloorClass(mxmz.levelDataProcessor.levelType));
}

mxmz.gameFieldProcessor.putSpecialDecoration = function(params) {
    mxmz.viewProcessor.addAnimationToViewElement(params.cell, 
    mxmz.cssProcessor.getSpecialDecorationClass(mxmz.levelDataProcessor.levelType, 
    mxmz.levelDataProcessor.maxDecorIndex));
}

mxmz.gameFieldProcessor.putCustomlDecoration = function(params) {
    mxmz.viewProcessor.addAnimationToViewElement(
            params.cell, mxmz.cssProcessor.getCustomDecorationClass(params.element));
}

mxmz.gameFieldProcessor.putDeadZone = function(params) {
    mxmz.viewProcessor.addAnimationToViewElement(params.cell, mxmz.cssProcessor.getDeadZoneClass(params.element));    
}

mxmz.gameFieldProcessor.putRescuePod = function(params) {
    mxmz.viewProcessor.addAnimationToViewElement(params.cell, 'rescue_pod');    
}

mxmz.gameFieldProcessor.putFloor = function(params) {
    mxmz.viewProcessor.addAnimationToViewElement(
            params.cell, mxmz.cssProcessor.getFloorClass(mxmz.levelDataProcessor.levelType))
}

mxmz.gameFieldProcessor.putPortal = function(params) {
    var portalType = mxmz.levelDataProcessor.getPortalType(params.element);
    mxmz.viewProcessor.addAnimationToViewElement(params.cell, mxmz.cssProcessor.getPortalClass(portalType));
    if (mxmz.levelDataProcessor.previousLevel && !params.isPresentPlayerStart && 
            parseInt(params.element.replace('w','').replace('f','')) === mxmz.levelDataProcessor.previousLevel.index) {
            params.maxStartX = params.index2+1;
            params.maxStartY = params.index1+1;           
            mxmz.viewProcessor.addAnimationToViewElement(params.cell, 'max_in_portal');
    }
    mxmz.gameFieldProcessor.putFloor(params);
}

mxmz.gameFieldProcessor.putBox = function(params) {
    var boxType = mxmz.chestHelper.allBoxes[params.element];
    mxmz.viewProcessor.addAnimationToViewElement(params.cell, mxmz.cssProcessor.getBoxClass(boxType));
    mxmz.gameFieldProcessor.putFloor(params);
}

mxmz.gameFieldProcessor.filler = function(methodList, params) {
    for (var method of methodList) {
        if (method[0](params.element)) {
            method[1](params);
            return;
        }
    }    
}

mxmz.gameFieldProcessor.fillGameField = function() {
    
    var params = {
        maxStartX: 0,
        maxStartY: 0,
        isPresentPlayerStart: false
    };

    var methodList = [
        [mxmz.gameFieldProcessor.isHereWall, mxmz.gameFieldProcessor.putWall],
        [mxmz.gameFieldProcessor.isHereMonster, mxmz.gameFieldProcessor.putMonster],
        [mxmz.gameFieldProcessor.isHereNpc, mxmz.gameFieldProcessor.putNpc],
        [mxmz.gameFieldProcessor.isHerePlayerStart, mxmz.gameFieldProcessor.putPlayerStart],
        [mxmz.gameFieldProcessor.isHereCrystall, mxmz.gameFieldProcessor.putCrystall],
        [mxmz.gameFieldProcessor.isHereItem, mxmz.gameFieldProcessor.putItem],
        [mxmz.gameFieldProcessor.isHerePack, mxmz.gameFieldProcessor.putPack],
        [mxmz.gameFieldProcessor.isHereSpecialDecoration, mxmz.gameFieldProcessor.putSpecialDecoration],
        [mxmz.gameFieldProcessor.isHereCustomDecoration, mxmz.gameFieldProcessor.putCustomlDecoration],
        [mxmz.gameFieldProcessor.isHereDeadZone, mxmz.gameFieldProcessor.putDeadZone],
        [mxmz.gameFieldProcessor.isHereRescuePod, mxmz.gameFieldProcessor.putRescuePod],
        [mxmz.gameFieldProcessor.isHerePortal, mxmz.gameFieldProcessor.putPortal],
        [mxmz.gameFieldProcessor.isHereBox, mxmz.gameFieldProcessor.putBox],
        [mxmz.gameFieldProcessor.isHereFloor, mxmz.gameFieldProcessor.putFloor]
    ];        

    mxmz.levelDataProcessor.levelMatrix.forEach(function(el, index) {
        el.forEach(function(el2, index2) {
            var classToSelect = '.cell.coord_' + parseInt(index2+1) + '_' + parseInt(index+1);
            var currCell = mxmz.viewProcessor.getViewElement(classToSelect);
            params.cell = currCell;
            params.index1 = index;
            params.index2 = index2;
            params.element = el2;

            mxmz.gameFieldProcessor.filler(methodList, params);

        })
    })

    mxmz.actionProcessor.setMaxStart(params.maxStartX, params.maxStartY);
}

mxmz.gameFieldProcessor.drawGameField = function() {
	
	var gameFieldDiv = mxmz.viewProcessor.getViewElement('.gameField');
	var rowDiv;
	var cellDiv;
	
	var x = 1;
	var y = 1;
	
	rowDiv = mxmz.viewProcessor.createViewElement('div');
	mxmz.viewProcessor.addAnimationToViewElement(rowDiv, 'newRow');
	mxmz.viewProcessor.appendSubElementToViewElement(gameFieldDiv, rowDiv);

	for (var i=1; i <= mxmz.levelDataProcessor.levelCellsCount; i++) {
		cellDiv = mxmz.viewProcessor.createViewElement('div');
		mxmz.viewProcessor.setAttributeToViewElement(cellDiv, 'class', 'cell');
		if (x > mxmz.levelDataProcessor.levelXSize) {
			rowDiv = mxmz.viewProcessor.createViewElement('div');
			mxmz.viewProcessor.addAnimationToViewElement(rowDiv, 'newRow');
			mxmz.viewProcessor.appendSubElementToViewElement(gameFieldDiv, rowDiv);
			x=1;
			y++;
		}
		mxmz.viewProcessor.addAnimationToViewElement(cellDiv, 'coord_' + x + '_' + y);
                mxmz.viewProcessor.appendSubElementToViewElement(rowDiv, cellDiv);
		x++;
	}
}