mxmz.Max = function () {

    // private fields

    var thisMax = this;
    
    var punchViews = initPunchViews();
    
    var lastDirection = mxmz.characterHelper.directionTypes.DOWN;

    //public fields

    thisMax.x = 0;
    thisMax.y = 0;
    thisMax.maxLastDirection = {x: 0, y: 1};
    thisMax.maxDirection = {x: 0, y: 1};
    thisMax.look = 0;
    thisMax.lookCoords = {x: 0, y: 1};
    
    thisMax.MAXIMUM_LIFE = 20;
    
    thisMax.life = thisMax.MAXIMUM_LIFE;
    mxmz.playerHelper.setLife(thisMax.life);
    
    thisMax.selectedItem = {};
    thisMax.currentAmmo = {};
    thisMax.items = [];
    thisMax.reloading = false;
    
    thisMax.items.push(mxmz.allItems.hand);

    // public methods       

    thisMax.getItem = function(newItem) {
        
        var alreadyPresents = thisMax.items.find(function(item){
            return item.key === newItem.key;
        });
        if (alreadyPresents) {
            alreadyPresents.data.qty = alreadyPresents.data.qty + newItem.data.qty;
        } else {
            thisMax.items.push(newItem);
        }      
    }
    
    thisMax.removeItemIfQtyIsEmpty = function(itemToRemove) {
        if (itemToRemove.data && itemToRemove.data.qty <= 0) {
            removeItemWrapper(itemToRemove);
        }                
    }
    
    thisMax.removeItem = function(itemToRemove) {
        removeItemWrapper(itemToRemove);
    }   
    
    //Hand. No girls. Just hand.
    thisMax.selectedItem = thisMax.items[0];  

    thisMax.lookForward = function () {
        var matrixX = thisMax.y - 1 + thisMax.maxDirection.y;
        var matrixY = thisMax.x - 1 + thisMax.maxDirection.x;

        thisMax.lookCoords.y = matrixX + 1;
        thisMax.lookCoords.x = matrixY + 1;

        var lookAt = matrixX >= 0 && matrixX <= mxmz.levelDataProcessor.levelMatrix.length - 1
                ? mxmz.levelDataProcessor.levelMatrix[matrixX][matrixY] : undefined;
        thisMax.look = lookAt;
    }
    
    thisMax.loadAmmoIfNeed = function() {
        thisMax.currentAmmo = thisMax.items.find(function(item) {
            return thisMax.selectedItem.data && 
                    item.type === mxmz.itemsHelper.itemTypes.AMMO &&
                    item.data.weapon_code === thisMax.selectedItem.data.code;
        });
    }
    
    thisMax.loadAmmo = function(ammo) {
        thisMax.currentAmmo = thisMax.items.find(function(item) {
            return item.key === ammo.key;
        });
    }

    thisMax.goingTo = function (moveToX, moveToY, view) {
        mxmz.cssHelper.removeMaxCss(mxmz.viewProcessor.getViewElement('.cell.coord_' + thisMax.x + '_' + thisMax.y));
        mxmz.viewProcessor.addAnimationToViewElementBySelector('.cell.coord_' + moveToX + '_' + moveToY, view);

        thisMax.x = moveToX;
        thisMax.y = moveToY;
    }

    thisMax.move = function (direction, lookAround) {

        var moveData = getMoveData(direction);        
        
        if (lookAround) {
            if (thisMax.maxLastDirection.x !== thisMax.maxDirection.x 
                    || thisMax.maxLastDirection.y !== thisMax.maxDirection.y) {
                thisMax.maxLastDirection.x = thisMax.maxDirection.x;
                thisMax.maxLastDirection.y = thisMax.maxDirection.y;
                spinningAround(moveData.class);
                return;
            }            
        }
                
        thisMax.maxLastDirection.x = thisMax.maxDirection.x;
        thisMax.maxLastDirection.y = thisMax.maxDirection.y;                
        
        var moveToX = thisMax.x + parseInt(moveData.x);
        var moveToY = thisMax.y + parseInt(moveData.y);

        if (!mxmz.levelDataProcessor.levelMatrix[moveToY - 1]) {
            spinningAround(moveData.class);
            return;
        }

        ifMaxMovesInStartRemoveStartPoint();
        ifspinningAroundInPortalDrawMax(moveToX, moveToY, moveData.class);
        ifGoOutFromPortalDrawPortal(moveToX, moveToY);

        var cellToGo = mxmz.levelDataProcessor.levelMatrix[moveToY - 1][moveToX - 1];

        if (mxmz.gameFieldProcessor.isHereCrystall(cellToGo)) {
            mxmz.pickUpProcessor.pickUpCrystall(moveToX, moveToY, cellToGo);
            cellToGo = 0;
        }
        
        if (mxmz.gameFieldProcessor.isHereItem(cellToGo)) {
            mxmz.pickUpProcessor.pickUpItem(moveToX, moveToY, cellToGo);
            cellToGo = 0;
        }
        
        if (mxmz.gameFieldProcessor.isHerePack(cellToGo)) {
            mxmz.pickUpProcessor.pickUpPack(moveToX, moveToY, cellToGo);
            cellToGo = 0;
        }

        if (cellToGo !== undefined && mxmz.gameFieldProcessor.isHerePortal(cellToGo)) {
            var nextLevel = cellToGo.replace('w', '').replace('f', '');
            mxmz.actionProcessor.warp(nextLevel);
        }

        if (cellToGo !== undefined && (mxmz.gameFieldProcessor.isHereWall(cellToGo) ||
                mxmz.gameFieldProcessor.isHereSpecialDecoration(cellToGo) ||
                mxmz.gameFieldProcessor.isHereCustomDecoration(cellToGo)) && mxmz.cht._ghost) {
            thisMax.goingTo(moveToX, moveToY, moveData.class);
        }
        
        if (cellToGo !== undefined && mxmz.gameFieldProcessor.isHereDeadZone(cellToGo)) {
            if (mxmz.cht._god) {
                thisMax.goingTo(moveToX, moveToY, moveData.class);
            } else {
                thisMax.dieInDeadZone(cellToGo);
                return;
            }            
        }

        if (mxmz.gameFieldProcessor.isHereFloor(cellToGo)) {
            thisMax.goingTo(moveToX, moveToY, moveData.class);
        } else {
            spinningAround(moveData.class);
        }

    }
    
    thisMax.redrawMax = function() {
        spinningAround(getMoveData(lastDirection).class);
    }

    thisMax.use = function () {
        
        if (isInPortal()) {
            return;
        }            
        
        mxmz.itemsHelper.activateItem(thisMax.selectedItem);
    }

    thisMax.keyBoard = function () {

        document.onkeydown = function (e) {
            //console.log('e.keyCode', e.keyCode);   
            
            var lookAround = e.shiftKey;
            
            switch (e.keyCode) {
                case 69:
                {
                    interaction();
                    break;
                }
                case 13:
                {
                    interaction();
                    break;
                }                
                
                case 87:
                {
                    moveWrapper(mxmz.characterHelper.directionTypes.UP, lookAround)
                    break;
                }
                case 38:
                {
                    moveWrapper(mxmz.characterHelper.directionTypes.UP, lookAround)
                    break;
                }                
                case 83:
                {
                    moveWrapper(mxmz.characterHelper.directionTypes.DOWN, lookAround)
                    break;
                }
                case 40:
                {
                    moveWrapper(mxmz.characterHelper.directionTypes.DOWN, lookAround)
                    break;
                }                
                case 65:
                {
                    moveWrapper(mxmz.characterHelper.directionTypes.LEFT, lookAround)
                    break;
                }
                case 37:
                {
                    moveWrapper(mxmz.characterHelper.directionTypes.LEFT, lookAround)
                    break;
                }                
                case 68:
                {
                    moveWrapper(mxmz.characterHelper.directionTypes.RIGHT, lookAround)
                    break;
                }
                case 39:
                {
                    moveWrapper(mxmz.characterHelper.directionTypes.RIGHT, lookAround)
                    break;
                }                
                case 73:
                {
                    mxmz.inventory.inventoryKeyBoard();
                    break;
                }
                case 76:
                {
                    mxmz.playerHelper.changeTranslate();
                    break;
                }
                case 71: {
                    mxmz.soundProcessor.mute = !mxmz.soundProcessor.mute;
                    if (mxmz.soundProcessor.mute) {
                        mxmz.soundProcessor.stopAllSounds();
                    } else {
                        mxmz.soundProcessor.play(mxmz.levelDataHelper.getLevelAmbient(mxmz.levelDataProcessor.currentLevel.type));
                    }
                    break;
                }
                case 32:
                {
                    thisMax.use();
                    break;
                }
                case 90:
                {
                    thisMax.drop();
                    break;
                }                
                default:
                {
                }
            }

        };
    }
    
    thisMax.drop = function() {
        thisMax.lookForward();
        if (thisMax.look === 0) {
            if (mxmz.itemsHelper.isDroppable(thisMax.selectedItem) && thisMax.selectedItem.data) {
                mxmz.levelDataProcessor.putItem(thisMax.lookCoords.x, thisMax.lookCoords.y, thisMax.selectedItem);
                thisMax.removeItem(thisMax.selectedItem);
                thisMax.selectedItem = thisMax.items[0];
                mxmz.playerHelper.refreshAllTranslate();
                mxmz.max.redrawMax();
            }            
        }
    }

    thisMax.killed = function(monsterType) {
        mxmz.playerHelper.toggleGameInfo();
        mxmz.inventory.reset();
        showDeath(monsterType);
        mxmz.soundProcessor.play('mon' + monsterType.substring(0, monsterType.indexOf('-')));
        deathScreenKeyboard();
    }
    
    thisMax.dieInDeadZone = function(deadZoneCell) {
        mxmz.playerHelper.toggleGameInfo();
        mxmz.inventory.reset();
        showDeath(deadZoneCell, true);
        mxmz.soundProcessor.play(mxmz.soundProcessor.sounds.LAVA_DEATH);
        deathScreenKeyboard();        
    }
    
    thisMax.getDamage = function() {
        var element = mxmz.viewProcessor.getViewElement('.cell.coord_' + thisMax.x + '_' + thisMax.y);
        mxmz.viewProcessor.addAnimationToViewElement(element, 'max_damage')
        setTimeout(function() {            
            if (element) {
                mxmz.viewProcessor.removeAnimationFromViewElement(element,'max_damage');
            }            
        }, 500);
    }
    
    thisMax.getHealing = function() {
        var element = mxmz.viewProcessor.getViewElement('.cell.coord_' + thisMax.x + '_' + thisMax.y);
        mxmz.viewProcessor.addAnimationToViewElement(element, 'max_healing')
        setTimeout(function() {            
            if (element) {
                mxmz.viewProcessor.removeAnimationFromViewElement(element,'max_healing');
            }            
        }, 500);
    }    
    
    thisMax.drawParticles = function(fireCssClass, x, y) {
        var element = mxmz.viewProcessor.getViewElement('.cell.coord_' + x + '_' + y);
        mxmz.viewProcessor.addAnimationToViewElement(element, fireCssClass);
        setTimeout(function() {
            if (element) {
                mxmz.viewProcessor.removeAnimationFromViewElement(element, fireCssClass);
            }            
        }, 500);
    }    
    
    thisMax.changeLife = function(deltaLife) {
        thisMax.life = thisMax.life+deltaLife;
        mxmz.playerHelper.setLife(thisMax.life);
        
        if (deltaLife > 0) {
            mxmz.soundProcessor.play(mxmz.soundProcessor.sounds.HEALTH);
            thisMax.getHealing();
        } else {
            thisMax.getDamage();
        }
        
    }
    
    thisMax.showPunch = function() {
        var element = mxmz.viewProcessor.getViewElement('.cell.coord_' + thisMax.x + '_' + thisMax.y);
        mxmz.viewProcessor.addAnimationToViewElement(element, punchViews[lastDirection]);
        setTimeout(function() {
            if (element) {
                var classList = element.classList;
                for (var i = 0; i < classList.length; i++) {
                    if (classList[i].indexOf('_punch') > 0) {
                        mxmz.viewProcessor.removeAnimationFromViewElement(element, classList[i]);
                        return;
                    }
                } 
            }            
        }, 500);
    }    

    // private methods
    
    function moveWrapper(direction, lookAround) {
        setDirection(direction);
        thisMax.move(direction, lookAround);
        thisMax.lookForward();
    }
    
    function deathScreenKeyboard() {
        document.onkeydown = function (e) {
            if (e.keyCode === 13) {
                respawnMax();
                return;
            }
        }         
    }
    
    function respawnMax() {
        hideMaxDeath();
        mxmz.playerHelper.toggleGameInfo();
        thisMax.keyBoard();
        thisMax.life = thisMax.MAXIMUM_LIFE;
        mxmz.levelDataProcessor.needToRefreshLevel();
        mxmz.playerHelper.setLife(thisMax.life);
    }

    function setDirection(direction) {

        switch (direction) {
            case mxmz.characterHelper.directionTypes.UP:
            {
                thisMax.maxDirection = {x: 0, y: -1};
                break;
            }
            case mxmz.characterHelper.directionTypes.DOWN:
            {
                thisMax.maxDirection = {x: 0, y: 1};
                break;
            }
            case mxmz.characterHelper.directionTypes.LEFT:
            {
                thisMax.maxDirection = {x: -1, y: 0};
                break;
            }
            case mxmz.characterHelper.directionTypes.RIGHT:
            {
                thisMax.maxDirection = {x: 1, y: 0};
                break;
            }
            default:
            {
            }
        }
    }

    function hideMaxDeath() {
        mxmz.viewProcessor.ereaseViewElement('.gameField');        
        mxmz.viewProcessor.ereaseViewElement('.deathMessage');
        mxmz.cssHelper.removeMaxDeathCss();        
    }

    function showDeath(deathReason, isDeadZone) {
        mxmz.viewProcessor.ereaseViewElement('.gameField');
        mxmz.viewProcessor.addAnimationToViewElementBySelector('.gameField', 'death');
        var deathClass;
        if (!isDeadZone) {
            deathClass = geMonstertDeathClass(deathReason);
        } else {
            deathClass = mxmz.deadHelper.getDeathInDeadZoneClass(deathReason);
        }
        mxmz.viewProcessor.addAnimationToViewElementBySelector('.gameField', deathClass);
        mxmz.viewProcessor.fillViewElementBySelector('.deathMessage', 
        '<h1>' + mxmz.playerHelper.translate('max.dead') + '</h1>');
    }

    function geMonstertDeathClass(monsterType) {
        return 'death_monster_' + monsterType;
    }

    function interaction() {      
        mxmz.interactionProcessor.interaction(thisMax.look);
        thisMax.lookForward();
    }

    //

    function spinningAround(view) {
        mxmz.cssHelper.removeMaxCss(mxmz.viewProcessor.getViewElement('.cell.coord_' + thisMax.x + '_' + thisMax.y));
        mxmz.viewProcessor.addAnimationToViewElementBySelector(
                '.cell.coord_' + thisMax.x + '_' + thisMax.y, view)
    }

    function getWeaponClass() {        
        if (thisMax.selectedItem.data && thisMax.selectedItem.data.ammo_code &&
                thisMax.selectedItem.type === mxmz.itemsHelper.itemTypes.WEAPON) {
            return '_' + thisMax.selectedItem.cssClass;
        } else {
            return '';
        }
    }

    function getMoveData(direction) {
        var god = '';//mxmz.cht._god ? '_god' : '';
        var weapon = getWeaponClass();
        lastDirection = direction;
        switch (direction) {
            case mxmz.characterHelper.directionTypes.UP:
            {
                return {x: '0',
                    y: '-1',
                    class: 'max_back' + weapon};
            }
            case mxmz.characterHelper.directionTypes.DOWN:
            {
                return {x: '0',
                    y: '1',
                    class: 'max_front' + weapon + god};
            }
            case mxmz.characterHelper.directionTypes.LEFT:
            {
                return {x: '-1',
                    y: '0',
                    class: 'max_left' + weapon + god};
            }
            case mxmz.characterHelper.directionTypes.RIGHT:
            {
                return {x: '1',
                    y: '0',
                    class: 'max_right' + weapon + god};
            }
            default:
            {
            }
        }
    }

    isInPortal = function isInPortal() {
        var maxCurrentPosition = mxmz.levelDataProcessor.levelMatrix[thisMax.y - 1][thisMax.x - 1];
        if (mxmz.gameFieldProcessor.isHerePortal(maxCurrentPosition)) {
            return true;
        }
        return false;
    }

    function ifGoOutFromPortalDrawPortal(moveToX, moveToY) {

        if (isInPortal() && (isCanGoThere(moveToX, moveToY) || mxmz.cht._ghost)) {
            mxmz.viewProcessor.removeAnimationFromViewElementBySelector(
                    '.cell.coord_' + thisMax.x + '_' + thisMax.y, 'max_in_portal');
        }
    }

    function isCanGoThere(moveToX, moveToY) {
        var placeToGo = moveToY === undefined ? moveToX : mxmz.levelDataProcessor.levelMatrix[moveToY - 1][moveToX - 1];
        if (placeToGo == undefined || mxmz.gameFieldProcessor.isHereWall(placeToGo) ||
                mxmz.gameFieldProcessor.isHereSpecialDecoration(placeToGo) ||
                mxmz.gameFieldProcessor.isHereCustomDecoration(placeToGo) ||
                mxmz.gameFieldProcessor.isHereMonster(placeToGo) || placeToGo === 'rp') {
            return false;
        }
        return true;
    }

    function ifspinningAroundInPortalDrawMax(moveToX, moveToY, maxViev) {

        if (isInPortal() && !isCanGoThere(moveToX, moveToY)) {
            mxmz.viewProcessor.removeAnimationFromViewElementBySelector(
                    '.cell.coord_' + thisMax.x + '_' + thisMax.y, 'max_in_portal');
            spinningAround(maxViev);
        }
    }

    function ifMaxMovesInStartRemoveStartPoint() {

        if (mxmz.levelDataProcessor.levelMatrix[thisMax.y - 1][thisMax.x - 1] === 'p') {
            mxmz.levelDataProcessor.levelMatrix[thisMax.y - 1][thisMax.x - 1] = 0;
        }

    }
    
    function removeItemWrapper(itemToRemove) {
        if (itemToRemove.type === mxmz.itemsHelper.itemTypes.AMMO) {
            thisMax.currentAmmo = null;
        }
        var indexToRemove;
        thisMax.items.find(function(item, index){
            if(item.key === itemToRemove.key) {
                indexToRemove = index; 
            };
        });            
        thisMax.items.splice(indexToRemove, 1);        
    }
    
    function initPunchViews() {
        var punchViews = {}
        punchViews[mxmz.characterHelper.directionTypes.UP] = 'max_back_punch';
        punchViews[mxmz.characterHelper.directionTypes.DOWN] = 'max_front_punch';
        punchViews[mxmz.characterHelper.directionTypes.LEFT] = 'max_left_punch';
        punchViews[mxmz.characterHelper.directionTypes.RIGHT] = 'max_right_punch';
        
        return punchViews;
    }
  
}