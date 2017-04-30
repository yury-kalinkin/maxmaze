mxmz.npcs = {
    'tumo': {
        name: 'npc.tumo.guy',
        code: 'tumo',
        life: 10,
        damage: 5,
        pack: [
            new mxmz.packHelper.packItemWrapper(mxmz.itemsHelper.itemCode.POISON_WASPS, 2),
            new mxmz.packHelper.packItemWrapper(mxmz.itemsHelper.itemCode.BIG_MEDKIT),
            new mxmz.packHelper.packItemWrapper(mxmz.itemsHelper.itemCode.KIKIS, 4),
            new mxmz.packHelper.packItemWrapper(mxmz.itemsHelper.itemCode.PLUTONIUS, 10),
            new mxmz.packHelper.packItemWrapper(mxmz.itemsHelper.itemCode.SHOTGUN),
            new mxmz.packHelper.packItemWrapper(mxmz.itemsHelper.itemCode.DARK_MATTER),
            new mxmz.packHelper.packItemWrapper(mxmz.itemsHelper.itemCode.MUD_KEY),
            new mxmz.packHelper.packItemWrapper(mxmz.itemsHelper.itemCode.CLONE)
        ],
        relationship: mxmz.characterHelper.npcRelationship.NEUTRAL,
        speak: mxmz.dialogs.tumo
    }
}

