mxmz.Monster = function (id, x, y, type) {

	// private fields

	var thisMonster = this;

	// public fields

        thisMonster.characterType = mxmz.characterHelper.characterTypes.MONSTER;

        thisMonster.id = id;
	thisMonster.x = x;
	thisMonster.y = y;
        thisMonster.type = type;
        
        thisMonster.data = mxmz.monsters[thisMonster.type];
        
        thisMonster.name = thisMonster.data.name;
	thisMonster.life = thisMonster.data.life;
        thisMonster.damage = thisMonster.data.damage;
        thisMonster.loot = thisMonster.data.loot;
        
        //redefined methods
        
        thisMonster.reactToMax = function(params) {
            thisMonster.attack();

            thisMonster.removeCharacterClassFromHisCurrentDiv();
            thisMonster.addCharacterToHisNextDiv(thisMonster.x, thisMonster.y, params.characterGoTo);

            if (mxmz.max.life <= 0) {

                thisMonster.removeCharacterFromHisCurrentMatrixCell();
                thisMonster.addCharacterToHisNextMatrixCell(params.toGoX, params.toGoY);			

                mxmz.max.killed(thisMonster.type);
                thisMonster.x = params.toGoX;
                thisMonster.y = params.toGoY;                            
            }

            return;            
        }
	
}

mxmz.Monster.prototype = mxmz.Character;