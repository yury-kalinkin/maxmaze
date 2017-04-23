mxmz.characterHelper = {};

mxmz.characterHelper.characterTypes = {
    MONSTER: 'monster',
    NPC: 'npc'
}

mxmz.characterHelper.characterTypesMatrixCode = {}
mxmz.characterHelper.characterTypesMatrixCode[mxmz.characterHelper.characterTypes.MONSTER] = 'm';
mxmz.characterHelper.characterTypesMatrixCode[mxmz.characterHelper.characterTypes.NPC] = 'n-';

mxmz.characterHelper.npcRelationship = {
    GOOD: 1,
    NEUTRAL: 0,
    BAD: -1
}

mxmz.characterHelper.directionTypes = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right',
    BACK: 'back',
    FRONT: 'front'
};