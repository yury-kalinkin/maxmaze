mxmz.dialogs = [];

mxmz.dialogs.tumo = new mxmz.Dialog()
        .setGreeting('Yup?')
        .setPhrases([
            new mxmz.Phrase()
                    .setMaxPhrase('Hello')
                    .setNPCAnswer(['Hi.', 'Nihao, human.', 'Hey! Wasup?!']),
            new mxmz.Phrase()
                    .setMaxPhrase('Who are you?')
                    .setSubDialog(
                        new mxmz.Dialog('I am Tumo. Cyclopoid.', [
                            new mxmz.Phrase()
                                    .setMaxPhrase('Cyclopoid?')
                                    .setNPCAnswer(['We are humanoids with one giant eye.', 'You know... Some kind of aliens.', 'Yes. Me.']),
                            new mxmz.Phrase()
                                    .setMaxPhrase('Can I ask you another question?')
                                    .setNPCAnswer(['Sure.', 'You have many questions.', 'Are you spying or something like this?'])
                                    .setResult(function() {
                                        mxmz.dialogProcessor.switchDialog(mxmz.dialogs.tumo);
                                    }),
                            new mxmz.Phrase()
                                    .setMaxPhrase('Bye.')
                                    .setNPCAnswer(['Will stars help you in you journey.', 'Ok. Take care.'])
                                    .setResult(function() {
                                        mxmz.dialogProcessor.closeDialog();
                                    })
                        ])
                    ),
            new mxmz.Phrase()
                    .setMaxPhrase('Where am I?')
                    .setNPCAnswer('You are in Shards. This is shard of Rocks.'),
            new mxmz.Phrase()
                    .setMaxPhrase('Bye.')
                    .setNPCAnswer(['Bye, human!', 'Ok. Will see you later.', 'Leave so soon?'])
                    .setResult(function() {
                        mxmz.dialogProcessor.closeDialog();
                    })
        ]);

mxmz.dialogs['nagi-1'] = new mxmz.Dialog('Good stars, stranger.', [
    new mxmz.Phrase()
            .setMaxPhrase('Can you tell me about this place?')
            .setSubDialog(new mxmz.Dialog()
                .setGreeting('This place is calling "Shards". It is Our Sanctuary. The Good One save us all here.')
                .setPhrases([
                    new mxmz.Phrase()
                            .setMaxPhrase('The Good One? Who is it?')
                            .setNPCAnswer(['He is our Saver.', 'He is Pillar of our home', 
                                'He is the one, who does not care about any life.']),
                    new mxmz.Phrase()
                            .setMaxPhrase('Sanctuary?')
                            .setNPCAnswer(['We all lost our homes.', 'We are hiding here', 
                                'We are no where to go.']),
                    new mxmz.Phrase()
                            .setMaxPhrase('I have more qestions.')
                            .setNPCAnswer(['Ask.', 'Go on', 'I am glad to answer.'])
                            .setResult(function() {
                                mxmz.dialogProcessor.switchDialog(mxmz.dialogs['nagi-1']);
                            })
                ])
            ),
    new mxmz.Phrase()
            .setMaxPhrase('Tell me about yourself.')
            .setNPCAnswer(['I am an orphant. Like others.', 'I came here from far away. Like others.', 
                'I living in shards because I no where to go.']),
    new mxmz.Phrase()
            .setMaxPhrase('I will die soon. I wonna sex.')
            .setNPCAnswer(['Are you junkie?', 'Are you frik?', 'Fuck off!'])
            .setCondition(function() {
                return mxmz.max.life < 10;
            })
            .setResult(function() {mxmz.dialogProcessor.closeDialog()}),
    new mxmz.Phrase('Never mind.', 
        ['Ok.', 'As you wish.', 'Come back any time.'],
        function() {
            mxmz.dialogProcessor.closeDialog();
        })        
]);

mxmz.dialogs['nagi-2'] = new mxmz.Dialog()
        .setGreeting(['I do not know you.', 'You are scaring me.', 'I do not trust strangers.', 'Get lost']);