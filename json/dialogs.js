mxmz.dialogs = [];

mxmz.dialogs.tumo = new mxmz.Dialog('?', [
    new mxmz.Phrase('dialog.max.hello', 
        ['dialog.tumo.hi', 'dialog.tumo.nihao', 'dialog.tumo.was.up']),
    new mxmz.Phrase('dialog.max.who.are.you', 
        'dialog.tumo.i.am.tumo', 
        null, 
        function() {
            return true;
        }, 
        new mxmz.Dialog('dialog.tumo.i.am.tumo', [
            new mxmz.Phrase('Cyclopoid? ', 
                ['We are humanoids with one giant eye.', 'You know... Some kind of aliens.', 'Yes. Me.']),
            new mxmz.Phrase('Can I ask you another question?', 
                ['Sure.', 'You have many questions.', 'Are you spying or something like this?'], 
                function() {
                    mxmz.dialogProcessor.switchDialog(mxmz.dialogs.tumo);
                }),
            new mxmz.Phrase('dialog.max.bye', ['Will stars help you in you journey.', 'Ok. Take care.'], 
                function() {
                    mxmz.dialogProcessor.closeDialog();
                })            
        ])),
    new mxmz.Phrase('dialog.max.where.am.i', 
        'dialog.tumo.this.is.shards'),
    new mxmz.Phrase('dialog.max.bye', 
        ['dialog.tumo.bye', 'dialog.tumo.will.see.later', 'dialog.tumo.leave'], 
        function() {
            mxmz.dialogProcessor.closeDialog();
        })
]);