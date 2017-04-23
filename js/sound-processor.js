mxmz.soundProcessor = {
    mute: true
};

mxmz.soundProcessor.sounds = {
    CRYSTALL: 'crystall',
    ITEM: 'item',
    HEALTH: 'health',
    DRIPS: 'drips',
    WIND: 'wind',
    BIRDS: 'birds',
    PORTAL: 'portal',
    MON1: 'mon1',
    MON2: 'mon2',
    MON3: 'mon3',
    MON4: 'mon4',
    MON_KILL: 'mon_kill',
    SHOTGUN: 'shotgun',
    WASP_GUN: 'waspgun',
    HAND: 'hand',
    PUNCH: 'punch',
    LAVA_DEATH: 'lava_death'
}

mxmz.soundProcessor.allSounds = {};

mxmz.soundProcessor.play = function(sound) {
    if (mxmz.soundProcessor.mute) {
        return;
    }
    switch (sound) {
        case mxmz.soundProcessor.sounds.CRYSTALL: {
            mxmz.soundProcessor.playFile('sounds/006-System06.ogg');
        }
        break;
        case mxmz.soundProcessor.sounds.ITEM: {
            mxmz.soundProcessor.playFile('sounds/056-Right02.ogg');
        }
        break;        
        case mxmz.soundProcessor.sounds.DRIPS: {
            mxmz.soundProcessor.playFile('sounds/016-Drips01.ogg', true, true);
        }
        break;
        case mxmz.soundProcessor.sounds.WIND: {
            mxmz.soundProcessor.playFile('sounds/002-Wind02.ogg', true, true);
        }
        break;
        case mxmz.soundProcessor.sounds.BIRDS: {
            mxmz.soundProcessor.playFile('sounds/Forest Bird Chirps.ogg', true, true);
        }
        break;
        case mxmz.soundProcessor.sounds.PORTAL: {
            mxmz.soundProcessor.playFile('sounds/010-System10.ogg');
        }
        break;
        case mxmz.soundProcessor.sounds.MON1: {
            mxmz.soundProcessor.playFile('sounds/082-Monster04.ogg');
        }
        break;
        case mxmz.soundProcessor.sounds.MON2: {
            mxmz.soundProcessor.playFile('sounds/083-Monster05.ogg');
        }
        break;
        case mxmz.soundProcessor.sounds.MON3: {
            mxmz.soundProcessor.playFile('sounds/084-Monster06.ogg');
        }
        break;
        case mxmz.soundProcessor.sounds.MON4: {
            mxmz.soundProcessor.playFile('sounds/085-Monster07.ogg');
        }
        break;
        case mxmz.soundProcessor.sounds.SHOTGUN: {
            mxmz.soundProcessor.playFile('sounds/44magnum.wav');
        }
        break;
        case mxmz.soundProcessor.sounds.WASP_GUN: {
            mxmz.soundProcessor.playFile('sounds/086-Action01.ogg');
        }
        break;        
        case mxmz.soundProcessor.sounds.HAND: {
            mxmz.soundProcessor.playFile('sounds/043-Knock04.ogg');
        }
        break;   
        case mxmz.soundProcessor.sounds.PUNCH: {
            mxmz.soundProcessor.playFile('sounds/boing.ogg');
        }
        break;    
        case mxmz.soundProcessor.sounds.MON_KILL: {
            mxmz.soundProcessor.playFile('sounds/Bell.ogg');
        }
        break;
        case mxmz.soundProcessor.sounds.LAVA_DEATH: {
            mxmz.soundProcessor.playFile('sounds/119-Fire03.ogg');
        }
        break;
        case mxmz.soundProcessor.sounds.HEALTH: {
            mxmz.soundProcessor.playFile('sounds/105-Heal01.ogg');
        }
        break;
        
    }    
};

mxmz.soundProcessor.playFile = function(fileName, isLoop, isAmbient) {
//    myAudio = new Audio(fileName); 
//    myAudio.addEventListener('ended', function() {
//        this.currentTime = 0;
//        this.play();
//    }, false);
//    myAudio.play();
    if (mxmz.soundProcessor.allSounds[fileName]) {
        fireAudio(mxmz.soundProcessor.allSounds[fileName]);
    } else {
        var audio = new Audio(fileName);
        mxmz.soundProcessor.allSounds[fileName] = {
            sound: audio,
            isLoop: isLoop || false,
            isAmbient: isAmbient || false
        };
        fireAudio(mxmz.soundProcessor.allSounds[fileName]);
    }
    
    function fireAudio(audioObject) {
        audioObject.sound.loop = audioObject.isLoop;
        audioObject.sound.pause();
        audioObject.sound.currentTime = 0;
        audioObject.sound.play();
    }
};

mxmz.soundProcessor.stopAllSoundsExceptAmbient = function() {
    for (var key of Object.keys(mxmz.soundProcessor.allSounds)) {
        if (!mxmz.soundProcessor.allSounds[key].isAmbient) {
            var sound = mxmz.soundProcessor.allSounds[key].sound;
            sound.pause();
            sound.currentTime = 0;            
        }
    }
}

mxmz.soundProcessor.stopAllSounds = function() {
    for (var key of Object.keys(mxmz.soundProcessor.allSounds)) {
        var sound = mxmz.soundProcessor.allSounds[key].sound;
        sound.pause();
        sound.currentTime = 0;
    }
}