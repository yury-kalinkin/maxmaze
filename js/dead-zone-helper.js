mxmz.deadHelper = {};

mxmz.deadHelper.getDeathInDeadZoneClass = function(deadZoneCell) {    
    if(deadZoneCell.replace('#', '').indexOf('mgm') >= 0) {
        return 'dead-zone-magma';
    }
}