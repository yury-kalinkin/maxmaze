mxmz.Npc = function (id, x, y, type) {

	// private fields

	var thisNpc = this;

	// public fields

        thisNpc.characterType = mxmz.characterHelper.characterTypes.NPC;

        thisNpc.id = id;
	thisNpc.x = x;
	thisNpc.y = y;
        thisNpc.type = type;
        
        thisNpc.data = mxmz.npcs[thisNpc.type];
        
        thisNpc.name = thisNpc.data.name;
	thisNpc.life = thisNpc.data.life;
        thisNpc.damage = thisNpc.data.damage;
        thisNpc.code = thisNpc.data.code;
        
        //redefined methods
        
        thisNpc.dropLoot = function() {
            mxmz.levelDataProcessor.putPack(thisNpc.x, thisNpc.y, thisNpc.code);
        },        
        
        thisNpc.reactToMax = function(params) {
            if(thisNpc.data.relationship < 0) {
                thisNpc.attack();
                thisNpc.removeCharacterClassFromHisCurrentDiv();
                thisNpc.addCharacterToHisNextDiv(thisNpc.x, thisNpc.y, params.characterGoTo);

                if (mxmz.max.life <= 0) {

                    thisNpc.removeCharacterFromHisCurrentMatrixCell();
                    thisNpc.addCharacterToHisNextMatrixCell(params.toGoX, params.toGoY);			

                    mxmz.max.killed(this.type);
                    thisNpc.x = params.toGoX;
                    thisNpc.y = params.toGoY;                            
                }                
            }

            return;            
        }
        
        thisNpc.processDamagedPerson = function(person) {
            if (person instanceof mxmz.Max) {
                thisNpc.relationshipToMaxDown();
            }
        }
        
        thisNpc.relationshipToMaxUp = function() {
            if (thisNpc.data.relationship < mxmz.characterHelper.npcRelationship.GOOD) {
                thisNpc.data.relationship++;
            };
        };
	
        thisNpc.relationshipToMaxDown = function() {
            if (thisNpc.data.relationship > mxmz.characterHelper.npcRelationship.BAD) {
                thisNpc.data.relationship--;
            };
        }        
        
}

mxmz.Npc.prototype = mxmz.Character;