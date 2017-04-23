mxmz.allItems = {
    hand: {
        id: 'weapon-hand-id',
        key: '0',
        name: mxmz.itemsHelper.itemCode.HAND + '.translate',
        description: mxmz.itemsHelper.itemCode.HAND + '.translate.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.HAND,
        type: mxmz.itemsHelper.itemTypes.WEAPON,
        data: {
            damage: 1,
            range: 1,
            reload_time: 500,
            code: mxmz.itemsHelper.itemCode.HAND,
            sound: mxmz.soundProcessor.sounds.HAND
        }        
    },
    shotgun: {
        id: 'weapon-shotgun-id',
        key: '1',
        name: 'weapon.' + mxmz.itemsHelper.itemCode.SHOTGUN + '.translate',
        description: 'weapon.' + mxmz.itemsHelper.itemCode.SHOTGUN + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.SHOTGUN,
        type: mxmz.itemsHelper.itemTypes.WEAPON,
        data: { 
            qty: 1,
            damage: 5,
            range: 2,
            ammo_code: mxmz.itemsHelper.itemCode.SHELLS,
            code: mxmz.itemsHelper.itemCode.SHOTGUN,
            reload_time: 1000,
            push: 1,
            sound: mxmz.soundProcessor.sounds.SHOTGUN
        }
    },
    waspGun: {
        id: 'weapon-wasp-gun-id',
        key: '2',
        name: 'weapon.' + mxmz.itemsHelper.itemCode.WASP_GUN + '.translate',
        description: 'weapon.' + mxmz.itemsHelper.itemCode.WASP_GUN + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.WASP_GUN,
        type: mxmz.itemsHelper.itemTypes.WEAPON,
        data: {
            qty: 1,
            damage: 2,
            range: 4,
            ammo_code: mxmz.itemsHelper.itemCode.WASPS,
            code: mxmz.itemsHelper.itemCode.WASP_GUN,
            reload_time: 250,
            push: 0,
            sound: mxmz.soundProcessor.sounds.WASP_GUN
        }
    },    
    shells: {
        id: 'ammo-shells-id',
        key: '100',
        name: 'ammo.' + mxmz.itemsHelper.itemCode.SHELLS + '.translate',
        description: 'ammo.' + mxmz.itemsHelper.itemCode.SHELLS + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.SHELLS,
        type: mxmz.itemsHelper.itemTypes.AMMO,
        data: {
            qty: 12,
            weapon_code: mxmz.itemsHelper.itemCode.SHOTGUN,
            code: mxmz.itemsHelper.itemCode.SHELLS,
            fireCssClass: mxmz.itemsHelper.itemCode.SHELLS + '-fire'
        }
    },
    'powered-shells': {
        id: 'ammo-powerd-shells-id',
        key: '101',
        name: 'ammo.' + mxmz.itemsHelper.itemCode.POWERED_SHELLS + '.translate',
        description: 'ammo.' + mxmz.itemsHelper.itemCode.POWERED_SHELLS + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.POWERED_SHELLS,
        type: mxmz.itemsHelper.itemTypes.AMMO,
        data: {
            qty: 6,
            weapon_code: mxmz.itemsHelper.itemCode.SHOTGUN,
            code: mxmz.itemsHelper.itemCode.POWERED_SHELLS,
            additional_damage: 5,
            fireCssClass: mxmz.itemsHelper.itemCode.SHELLS + '-fire'
        }
    },
    wasps: {
        id: 'ammo-wasps-id',
        key: '102',
        name: 'ammo.' + mxmz.itemsHelper.itemCode.WASPS + '.translate',
        description: 'ammo.' + mxmz.itemsHelper.itemCode.WASPS + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.WASPS,
        type: mxmz.itemsHelper.itemTypes.AMMO,
        data: {
            qty: 60,
            weapon_code: mxmz.itemsHelper.itemCode.WASP_GUN,
            code: mxmz.itemsHelper.itemCode.WASPS,
            fireCssClass: mxmz.itemsHelper.itemCode.WASPS + '-fire'
        }
    },
    'poison-wasps': {
        id: 'ammo-poison-wasps-id',
        key: '103',
        name: 'ammo.' + mxmz.itemsHelper.itemCode.POISON_WASPS + '.translate',
        description: 'ammo.' + mxmz.itemsHelper.itemCode.POISON_WASPS + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.POISON_WASPS,
        type: mxmz.itemsHelper.itemTypes.AMMO,
        data: {
            qty: 30,
            weapon_code: mxmz.itemsHelper.itemCode.WASP_GUN,
            code: mxmz.itemsHelper.itemCode.POISON_WASPS,
            additional_damage: 2,
            fireCssClass: mxmz.itemsHelper.itemCode.POISON_WASPS + '-fire'
        }
    },     
    'clone-module': {        
        id: 'artifact-' + mxmz.itemsHelper.itemCode.CLONE_MODULE + '-id',
        key: '400',
        name: 'artifact.' + mxmz.itemsHelper.itemCode.CLONE_MODULE + '.translate',
        description: 'artifact.' + mxmz.itemsHelper.itemCode.CLONE_MODULE + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.CLONE_MODULE,
        type: mxmz.itemsHelper.itemTypes.ARTIFACT,
        data: {
            code: mxmz.itemsHelper.itemCode.CLONE_MODULE
        }
    },
    clone: {
        id: 'resource-' + mxmz.itemsHelper.itemCode.CLONE + '-id',
        key: '300',
        name: 'resource.' + mxmz.itemsHelper.itemCode.CLONE + '.translate',
        description: 'resource.' + mxmz.itemsHelper.itemCode.CLONE + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.CLONE,
        type: mxmz.itemsHelper.itemTypes.RESOURCE,
        data: {
            qty: 1,
            code: mxmz.itemsHelper.itemCode.CLONE,
            action: mxmz.itemsHelper.resourceActions.RESPAWN
        }
    },   
    bioplasma: {
        id: 'element-bioplasma-id',
        key: '301',
        name: 'element.' + mxmz.itemsHelper.itemCode.BIOPLASMA + '.translate',
        description: 'element.' + mxmz.itemsHelper.itemCode.BIOPLASMA + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.BIOPLASMA,
        type: mxmz.itemsHelper.itemTypes.ELEMENT,
        data: {
            qty: 1,
            code: mxmz.itemsHelper.itemCode.BIOPLASMA
        }
    },
    petrorit: {
        id: 'element-petrorit-id',
        key: '302',
        name: 'element.' + mxmz.itemsHelper.itemCode.PETRORIT + '.translate',
        description: 'element.' + mxmz.itemsHelper.itemCode.PETRORIT + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.PETRORIT,
        type: mxmz.itemsHelper.itemTypes.ELEMENT,
        data: {
            qty: 1,
            code: mxmz.itemsHelper.itemCode.PETRORIT
        }
    },
    plutonius: {
        id: 'element-plutonius-id',
        key: '303',
        name: 'element.' + mxmz.itemsHelper.itemCode.PLUTONIUS + '.translate',
        description: 'element.' + mxmz.itemsHelper.itemCode.PLUTONIUS + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.PLUTONIUS,
        type: mxmz.itemsHelper.itemTypes.ELEMENT,
        data: {
            qty: 1,
            code: mxmz.itemsHelper.itemCode.PLUTONIUS
        }
    }, 
    organoid: {
        id: 'element-organoid-id',
        key: '304',
        name: 'element.' + mxmz.itemsHelper.itemCode.ORGANOID + '.translate',
        description: 'element.' + mxmz.itemsHelper.itemCode.ORGANOID + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.ORGANOID,
        type: mxmz.itemsHelper.itemTypes.ELEMENT,
        data: {
            qty: 1,
            code: mxmz.itemsHelper.itemCode.ORGANOID
        }
    },
    hyperquartz: {
        id: 'element-hyperquartz-id',
        key: '305',
        name: 'element.' + mxmz.itemsHelper.itemCode.HYPERQUARTZ + '.translate',
        description: 'element.' + mxmz.itemsHelper.itemCode.HYPERQUARTZ + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.HYPERQUARTZ,
        type: mxmz.itemsHelper.itemTypes.ELEMENT,
        data: {
            qty: 1,
            code: mxmz.itemsHelper.itemCode.HYPERQUARTZ
        }
    },
    'dark-matter': {
        id: 'element-dark-matter-id',
        key: '306',
        name: 'element.' + mxmz.itemsHelper.itemCode.DARK_MATTER + '.translate',
        description: 'element.' + mxmz.itemsHelper.itemCode.DARK_MATTER + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.DARK_MATTER,
        type: mxmz.itemsHelper.itemTypes.ELEMENT,
        data: {
            qty: 1,
            code: mxmz.itemsHelper.itemCode.DARK_MATTER
        }
    },
    kikis: {
        id: 'element-kikis-id',
        key: '307',
        name: 'element.' + mxmz.itemsHelper.itemCode.KIKIS + '.translate',
        description: 'element.' + mxmz.itemsHelper.itemCode.KIKIS + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.KIKIS,
        type: mxmz.itemsHelper.itemTypes.ELEMENT,
        data: {
            qty: 1,
            code: mxmz.itemsHelper.itemCode.KIKIS
        }
    },
    obsidian: {
        id: 'element-obsidian-id',
        key: '308',
        name: 'element.' + mxmz.itemsHelper.itemCode.OBSIDIAN + '.translate',
        description: 'element.' + mxmz.itemsHelper.itemCode.OBSIDIAN + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.OBSIDIAN,
        type: mxmz.itemsHelper.itemTypes.ELEMENT,
        data: {
            qty: 1,
            code: mxmz.itemsHelper.itemCode.OBSIDIAN
        }
    },
    diamona: {
        id: 'element-diamona-id',
        key: '309',
        name: 'element.' + mxmz.itemsHelper.itemCode.DIAMONA + '.translate',
        description: 'element.' + mxmz.itemsHelper.itemCode.DIAMONA + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.DIAMONA,
        type: mxmz.itemsHelper.itemTypes.ELEMENT,
        data: {
            qty: 1,
            code: mxmz.itemsHelper.itemCode.DIAMONA
        }
    },
    
    'small-medkit': {
        id: 'resource-' + mxmz.itemsHelper.itemCode.SMALL_MEDKIT + '-id',
        key: '310',
        name: 'resource.' + mxmz.itemsHelper.itemCode.SMALL_MEDKIT + '.translate',
        description: 'resource.' + mxmz.itemsHelper.itemCode.SMALL_MEDKIT + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.SMALL_MEDKIT,
        type: mxmz.itemsHelper.itemTypes.RESOURCE,
        data: {
            qty: 1,
            code: mxmz.itemsHelper.itemCode.SMALL_MEDKIT,
            action: mxmz.itemsHelper.resourceActions.CURE,
            value: 10
        }
    },
    'medkit': {
        id: 'resource-' + mxmz.itemsHelper.itemCode.MEDKIT + '-id',
        key: '311',
        name: 'resource.' + mxmz.itemsHelper.itemCode.MEDKIT + '.translate',
        description: 'resource.' + mxmz.itemsHelper.itemCode.MEDKIT + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.MEDKIT,
        type: mxmz.itemsHelper.itemTypes.RESOURCE,
        data: {
            qty: 1,
            code: mxmz.itemsHelper.itemCode.MEDKIT,
            action: mxmz.itemsHelper.resourceActions.CURE,
            value: 25
        }
    },
    'big-medkit': {
        id: 'resource-' + mxmz.itemsHelper.itemCode.BIG_MEDKIT + '-id',
        key: '312',
        name: 'resource.' + mxmz.itemsHelper.itemCode.BIG_MEDKIT + '.translate',
        description: 'resource.' + mxmz.itemsHelper.itemCode.BIG_MEDKIT + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.BIG_MEDKIT,
        type: mxmz.itemsHelper.itemTypes.RESOURCE,
        data: {
            qty: 1,
            code: mxmz.itemsHelper.itemCode.BIG_MEDKIT,
            action: mxmz.itemsHelper.resourceActions.CURE,
            value: 50
        }
    },     
    'mud-key': {
        id: 'key-dark-matter-id',
        key: '500',
        name: 'key.' + mxmz.itemsHelper.itemCode.MUD_KEY + '.translate',
        description: 'key.' + mxmz.itemsHelper.itemCode.MUD_KEY + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.MUD_KEY,
        type: mxmz.itemsHelper.itemTypes.KEY,
        data: {
            code: mxmz.itemsHelper.itemCode.MUD_KEY
        }
    },
    
    shit: {
        id: 'shit-id',
        key: '10000',
        name: 'resource.' + mxmz.itemsHelper.itemCode.SHIT + '.translate',
        description: 'resource.' + mxmz.itemsHelper.itemCode.SHIT + '.descr.translate',
        cssClass: mxmz.itemsHelper.itemCode.SHIT,
        type: mxmz.itemsHelper.itemTypes.RESOURCE,
        data: {
            qty: 1,
            code: mxmz.itemsHelper.itemCode.SHIT,
            action: mxmz.itemsHelper.resourceActions.CURE,
            value: 10            
        }
    },    

}