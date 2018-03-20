var BootState = {
	preload: function(){
		game.load.image('loadingBar','assets/img/loadingBar.png');
	},
	
	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		
		game.state.start('load');
	}
};
