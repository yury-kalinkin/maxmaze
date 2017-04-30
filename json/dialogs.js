mxmz.dialogs = [];

mxmz.dialogs.tumo = [
    new mxmz.Dialog('dialog.max.hello', ['dialog.tumo.hi', 'dialog.tumo.nihao', 'dialog.tumo.was.up']),
    new mxmz.Dialog('dialog.max.who.are.you', 'dialog.tumo.i.am.tumo', null, function() {
        return true;
    }),    
    new mxmz.Dialog('dialog.max.where.am.i', 'dialog.tumo.this.is.shards'),
    new mxmz.Dialog('dialog.max.bye', ['dialog.tumo.bye', 'dialog.tumo.will.see.later', 'dialog.tumo.leave'], 
        function() {
            mxmz.dialogProcessor.closeDialog();
        })
];