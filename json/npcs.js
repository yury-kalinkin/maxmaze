mxmz.npcs = {
    'tumo': {
        name: 'tumo.guy',
        code: 'tumo',
        life: 10,
        damage: 5,
        pack: [
            new mxmz.packHelper.packItemWrapper(mxmz.itemsHelper.itemCode.POISON_WASPS, 2),
            new mxmz.packHelper.packItemWrapper(mxmz.itemsHelper.itemCode.BIG_MEDKIT),
            new mxmz.packHelper.packItemWrapper(mxmz.itemsHelper.itemCode.KIKIS, 4),
            new mxmz.packHelper.packItemWrapper(mxmz.itemsHelper.itemCode.PLUTONIUS, 10),
            new mxmz.packHelper.packItemWrapper(mxmz.itemsHelper.itemCode.SHOTGUN)
        ],
        relationship: mxmz.characterHelper.npcRelationship.NEUTRAL,
        speak: 'Hao, human!'
    }
}

