mxmz.inventoryHelper = {};

mxmz.inventoryHelper.categoryClasses = [
    'inventory-category-weapon',
    'inventory-category-ammo',
    'inventory-category-stuff',
    'inventory-category-elements',
    'inventory-category-artefact',
    'inventory-category-key'
];
mxmz.inventoryHelper.selectedCategoryClasses = [
    'inventory-category-weapon-selected',
    'inventory-category-ammo-selected',
    'inventory-category-stuff-selected',
    'inventory-category-elements-selected',
    'inventory-category-artefact-selected',
    'inventory-category-key-selected'
];
mxmz.inventoryHelper.categories = [
    [mxmz.itemsHelper.itemTypes.WEAPON],
    [mxmz.itemsHelper.itemTypes.AMMO],
    [
        mxmz.itemsHelper.itemTypes.ARMOR, 
        mxmz.itemsHelper.itemTypes.RESOURCE        
    ],
    [
        mxmz.itemsHelper.itemTypes.ELEMENT
    ],
    [mxmz.itemsHelper.itemTypes.ARTIFACT],
    [mxmz.itemsHelper.itemTypes.KEY]
];