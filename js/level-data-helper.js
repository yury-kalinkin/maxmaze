mxmz.levelDataHelper = {};

mxmz.levelDataHelper.levelTypes = {
    ROCKS: 'rocks',
    SANDS: 'sands',
    WOODS: 'woods'
}

mxmz.levelDataHelper.getLevelAmbient = function (levelType) {
    switch (levelType) {
        case mxmz.levelDataHelper.levelTypes.ROCKS:
            return mxmz.soundProcessor.sounds.DRIPS;
        case mxmz.levelDataHelper.levelTypes.SANDS:
            return mxmz.soundProcessor.sounds.WIND;            
        case mxmz.levelDataHelper.levelTypes.WOODS:
            return mxmz.soundProcessor.sounds.BIRDS;           
    }

}