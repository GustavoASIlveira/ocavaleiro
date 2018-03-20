var Lv1State = {
	create: function(){
		this.map = game.add.tilemap('map');
		this.map.addTilesetImage('tileset01');
		this.skyLayer = this.map.createLayer('skyLayer');
		this.backgroundLayer = this.map.createLayer('backgroundLayer');
		this.blockLayer = this.map.createLayer('blockLayer');
		
		this.skyLayer.resizeWorld();
		
		this.map.setCollisionBetween(0,63,true,'blockLayer');
		
		
		//-- > Crates
		this.crates = game.add.group();
		this.crates.enableBody = true;
		this.map.createFromObjects('objectLayer',7,'crate',0,true,false,this.crates);
		this.crates.setAll('body.immovable',true);
		
		this.crateFrag = game.add.emitter(0,0,4);
		this.crateFrag.makeParticles('crateFrag');
		this.crateFrag.setXSpeed(-50,50);
		this.crateFrag.setYSpeed(-50,50);
		this.crateFrag.gravity.y = 800;
		//--> Fim Crates
		
		//--> Player
		this.player = game.add.sprite(32,game.world.height - 100,'player');
		this.player.anchor.set(.35,.5);
		this.player.animations.add('walk',[0,1,2,3],10,true);
		this.player.animations.add('attack',[4,5,6,7],15,false);
		game.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds = true;
		this.player.body.gravity.y = 800;
		this.player.body.setSize(10,25,6,7);
		this.player.canAttack = true;
		this.player.isAttacking = false;
		this.player.canJump = true;
		this.player.canWalk = true;
		//--> Fim do Player
		
		this.attackBox = game.add.sprite(this.player.x,this.player.y,null);
		game.physics.arcade.enable(this.attackBox);
		this.attackBox.body.setSize(14,6);
		
		
		game.camera.follow(this.player);
		
		this.controls = game.input.keyboard.createCursorKeys();
		
		this.controls.up.onUp.add(function(){
			this.player.canJump = true;
		},this);
		
		this.attackButton = game.input.keyboard.addKey(Phaser.Keyboard.Z);
		this.attackButton.onDown.add(function(){
			if(!this.player.isAttacking){
				this.player.isAttacking = true;
			}
		},this);
	},
	
	update: function(){
		this.attackBox.x = this.player.x + (7 * this.player.scale.x);
		this.attackBox.y = this.player.y + 2;
		
		game.physics.arcade.collide(this.player,this.blockLayer);
		game.physics.arcade.collide(this.player,this.crates);
		game.physics.arcade.overlap(this.attackBox,this.crates,this.destroyCrate,null,this);
		
		this.player.body.velocity.x = 0;
		
		if(this.attackButton.isUp){
			this.player.canAttack = true;
		}
		
		if(!this.player.isAttacking){
			this.move();
		} else {
			if(this.player.canAttack){
				if(!this.player.canJump){
					if(this.controls.left.isDown){
						this.moveLeft();
					} else
					if(this.controls.right.isDown){
						this.moveRight();
					}
				}
				
				this.player.animations.play('attack');
				this.player.animations.currentAnim.onComplete.add(function(){
					this.player.isAttacking = false;
					this.player.canAttack = false;
					this.player.frame = 0;
				},this);
			}
		}
	},
	
	moveRight: function(){
		this.player.scale.set(1,1);
		this.attackBox.scale.set(1,1);
		this.player.body.velocity.x = 60;
	},
	
	moveLeft: function(){
		this.player.scale.set(-1,1);
		this.attackBox.scale.set(-1,1);
		this.player.body.velocity.x = -60;
	},
	
	jump: function(){
		if((this.player.body.onFloor() || this.player.body.touching.down) && this.player.canJump){
			this.player.canJump = false;
			this.player.body.velocity.y = -260;
		}
	},
	
	attack: function(){
		this.player.canWalk = false;
		this.player.canJump = false;
		this.player.animations.play('attack');
	},
	
	move: function(){
		if(this.controls.right.isDown && this.player.canWalk){
			this.moveRight();
			this.player.animations.play('walk');
		} else
		if(this.controls.left.isDown && this.player.canWalk){
			this.moveLeft();
			this.player.animations.play('walk');
		}
		
		if(this.controls.up.isDown){
			this.jump();
		}
		
		if(this.player.body.velocity.x === 0){
			this.player.animations.stop();
			this.player.frame = 0;
		}
		
		if(!this.player.body.onFloor() && !this.player.body.touching.down){
			this.player.animations.stop();
			if(this.player.body.velocity.y > 0){
				this.player.frame = 3;
			} else {
				this.player.frame = 1;
			}
		}
	},
	
	destroyCrate: function(hitbox,crate){
		if(this.player.isAttacking){
			game.time.events.add(100,function(){
				this.crateFrag.x = crate.position.x;
				this.crateFrag.y = crate.position.y;
				this.crateFrag.start(true,500,null,4);
				crate.destroy();
			},this);
		}
	},
	
	render: function(){
	//	game.debug.body(this.attackBox);
	}
};
