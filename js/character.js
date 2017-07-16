mxmz.Character = {

        lastCharacterView: null,
        characterType: null,
        freeze: false,
        
	getDamage: function(person, damage, vector) {
            
            this.life = this.life - damage;

            if (vector) {
                var moveTo = {
                    x: vector.x,
                    y: vector.y,
                    view: this.lastCharacterView
                }                
                this.move(moveTo);                      
            }
                var element = mxmz.viewProcessor.getViewElement('.cell.coord_' + this.x + '_' + this.y);
                var damageClass = this.getClass(this.imagePrefix, 'damage');
                element.classList.add(damageClass);
                setTimeout(function() {            
                    if (element) {
                        element.classList.remove(damageClass);
                    }            
                }, 500);

            if (this.life <= 0) {
                    this.characterDie();
            } else {
                this.processDamagedPerson(person);
            }           
            
	},
        
        processDamagedPerson: function(person) {
            return person;
        },
	
	characterDie: function() {
		mxmz.soundProcessor.play(mxmz.soundProcessor.sounds.MON_KILL);
		this.removeCharacterFromHisCurrentMatrixCell();
		this.removeCharacterClassFromHisCurrentDiv();
                this.removeCharacterDecayClassFromHisCurrentDiv();
		this.addCharacterDecay();
                this.dropLoot();
                this.x = -1;
                this.y = -1;
	},
        
        attack: function() {
            mxmz.max.changeLife(-this.damage);
        },
	
        reactToMax: function(toGoParams) {
            return toGoParams;
        },
        
        meetMax: function(toGoX, toGoY) {
            return toGoX === mxmz.max.x && toGoY === mxmz.max.y && !mxmz.cht._god;
        },
        
        move: function(characterGoTo) {
            
            var toGoX = this.x + characterGoTo.x;
            var toGoY = this.y + characterGoTo.y;
            
            if (this.canGoThere(toGoX, toGoY) && 
                    mxmz.viewProcessor.getViewElement('.cell.coord_' + this.x + '_' + this.y) !== null) {

                    if (this.meetMax(toGoX, toGoY)) {
                        var toGoParams = {
                            characterGoTo: characterGoTo,
                            toGoX: toGoX,
                            toGoY: toGoY
                        }
                        return this.reactToMax(toGoParams);
                    }
                    
                    this.moveOn(toGoX, toGoY, characterGoTo);

                    this.x = toGoX;
                    this.y = toGoY;

            } else {
                this.spinninAround(this.x, this.y, characterGoTo)
            }
        },
        
        moveOn: function(toGoX, toGoY, characterGoTo) {
            this.removeCharacterClassFromHisCurrentDiv();
            this.removeCharacterFromHisCurrentMatrixCell();
            this.addCharacterToHisNextDiv(toGoX, toGoY, characterGoTo);
            this.addCharacterToHisNextMatrixCell(toGoX, toGoY);            
        },
        
        spinninAround: function(x, y, characterGoTo) {
            this.removeCharacterClassFromHisCurrentDiv();
            this.addCharacterToHisNextDiv(x, y, characterGoTo);            
        },
        
	walk: function() {
	
		if (this.life <= 0) {
			return;
		}

		var characterGoTo = this.generateWalk();
                this.lastCharacterView = characterGoTo.view;
                this.move(characterGoTo);	
	},
	
	getClass: function (imagePrefix, characterView) {
            return this.characterType + '_' + imagePrefix + '_' + characterView;
	},
	
	addCharacterDecay: function() {
            var decayClass = this.getClass(this.imagePrefix, 'dead');
            console.log('decayClass:', decayClass)
            mxmz.viewProcessor.addAnimationToViewElementBySelector(
                    '.cell.coord_' + this.x + '_' + this.y, decayClass);		
	},
        
        chooseLoot: function() {
            var lootNum = mxmz.utilsHelper.getRandomInt(0, this.loot.length);
            if (this.loot[lootNum]) {
                var itemCode = this.loot[lootNum];
                return mxmz.itemsHelper.getItemByCode(itemCode);
            } else {//need to remove this shit
                itemCode = mxmz.itemsHelper.itemCode.SHIT;
                return mxmz.itemsHelper.getItemByCode(itemCode);
            }
            return null;
        },
        
        dropLoot: function() {
            var droppedLoot = this.chooseLoot();
            if (droppedLoot) {
                mxmz.levelDataProcessor.putItem(this.x, this.y, droppedLoot);
            }            
        },
	
	addCharacterToHisNextDiv: function(toGoX, toGoY, characterGoTo) {
            mxmz.viewProcessor.addAnimationToViewElementBySelector(
                    '.cell.coord_' + toGoX + '_' + toGoY, this.getClass(this.imagePrefix, characterGoTo.view));
	},
	
	addCharacterToHisNextMatrixCell: function(toGoX, toGoY) {
            mxmz.levelDataProcessor.levelMatrix[toGoY-1][toGoX-1] = 
                    mxmz.characterHelper.characterTypesMatrixCode[this.characterType] + this.type;
	},
	
	removeCharacterClassFromHisCurrentDiv: function() {
            var currentCharacterElement = mxmz.viewProcessor.getViewElement('.cell.coord_' + this.x + '_' + this.y);
            var characterDamageClass = this.getClass(this.imagePrefix, 'damage');
            mxmz.cssHelper.removeCharacterCss(currentCharacterElement, characterDamageClass);

	},
        
	removeCharacterDecayClassFromHisCurrentDiv: function() {
            var currentCharacterElement = mxmz.viewProcessor.getViewElement('.cell.coord_' + this.x + '_' + this.y);
            mxmz.cssHelper.removeCharacterDecayCss(currentCharacterElement);

	},
	
	removeCharacterFromHisCurrentMatrixCell: function() {
		mxmz.levelDataProcessor.levelMatrix[this.y-1][this.x-1] = 0;		
	},
	
	canGoThere: function (moveToX, moveToY) {
		if (mxmz.levelDataProcessor.levelMatrix[moveToY-1] === undefined) {
			return;
		}
		var placeToGo = mxmz.levelDataProcessor.levelMatrix[moveToY-1][moveToX-1];
		return placeToGo === 0
	},
	
	generateWalk: function() {
		var direction = mxmz.utilsHelper.getRandomInt(1, 4);
		switch (direction) {
			case 1: return {x:1, y:0, view: mxmz.characterHelper.directionTypes.RIGHT};
			case 2: return {x:-1, y:0, view: mxmz.characterHelper.directionTypes.LEFT};
			case 3: return {x:0, y:1, view: mxmz.characterHelper.directionTypes.FRONT};
			case 4: return {x:0, y:-1, view: mxmz.characterHelper.directionTypes.BACK};
			defaut: return {x:0, y:0, view: mxmz.characterHelper.directionTypes.FRONT};
		}
	}
	
}