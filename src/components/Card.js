import Phaser from 'phaser';

export default class Card extends Phaser.GameObjects.Sprite{
	constructor(scene, id, position){
		super(scene, 0, 0, 'cards', 'card-back');
		this.id = id;
		this.isOpen = false;

		this.scene.add.existing(this);

		this.setInteractive();
		this.setPosition(-this.width, -this.height);
		// this.on('pointerdown', this.onOpen);
	}

	flip(){
		this.scene.tweens.add({
			targets: this,
			scaleX: 0,
			ease: 'Linear',
			duration: 150,
			onComplete: ()=>{
				this.show();
			}
		});
	}

	show(){
		let typeCard = this.isOpen? `card-front-${this.id}`: 'card-back';
		this.setFrame(typeCard);

		this.scene.tweens.add({
			targets: this,
			scaleX: 1,
			ease: 'Linear',
			duration: 150,
			onComplete: ()=>{

			}
		});
	}

	move({x,y,delay}){
		this.scene.tweens.add({
			targets: this,
			x,y,
			delay,
			ease: 'Linear',
			duration: 300,
		});
	}

	onOpen(call){
		this.flip();
		this.isOpen = true;

		if(call) call();
	}

	onClose(){
		this.flip();
		this.isOpen = false;
	}
}