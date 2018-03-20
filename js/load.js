var LoadState = {
	preload: function(){
		var txtLoading = game.add.text(game.width/2,120,'LOADING...',{font:'20px emulogic',fill:'#fff'});
			txtLoading.anchor.set(.5);
			
		var loadingBar = game.add.sprite(game.width/2,game.height/2,'loadingBar');
			loadingBar.anchor.set(.5);
			
		game.load.setPreloadSprite(loadingBar);
		
		game.load.tilemap('map','assets/lv1.json',null,Phaser.Tilemap.TILED_JSON);
		game.load.image('tileset01','assets/Tiles_32x32.png');//Aqui a key tem que ser igual ao nome do tileset no Tiled
		game.load.image('crate','assets/img/crate.png');
		game.load.image('crateFrag','assets/img/crateFrag.png');
		game.load.image('part','assets/img/part.png');
		game.load.spritesheet('coin','assets/img/coin.png',32,32);
		game.load.spritesheet('player','assets/img/soldier.png',32,32);
		
		game.load.image('btnLeft','assets/img/btnLeft.png');
		game.load.image('btnRight','assets/img/btnRight.png');
		game.load.image('btnJump','assets/img/btnJump.png');
		game.load.image('btnAttack','assets/img/btnAttack.png');
	},
	
	create: function(){
		game.state.start('lv1');
	}
};
