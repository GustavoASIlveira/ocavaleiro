var game = new Phaser.Game(480,320,Phaser.CANVAS);

	game.state.add('boot',BootState);
	game.state.add('load',LoadState);
	game.state.add('lv1',Lv1State);

	game.state.start('boot');
