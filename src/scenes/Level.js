
// You can write more code here

/* START-USER-IMPORT-CODE */
import option from '../game-option';

import Card from '../components/Card';
/* END-USER-IMPORT-CODE */

/* START OF COMPILED CODE */

import Phaser from "phaser";

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		/* END-USER-CTR-CODE */
	}

	editorCreate() {

		// bg_1
		const bg_1 = this.add.image(0, 0, "bg-1");
		bg_1.setOrigin(0, 0);
	}

	/* START-USER-CODE */

	// Write your code here
	constCreate(){
		this.sysWidth = this.sys.game.config.width;
		this.sysHeight = this.sys.game.config.height;
		this.timeout = option.timeout;

		/** @type {Array<Card>} */
		this.cards = [];

		/** @type {Card} */
		this.openCard = null;

		this.countOpenCard = 0;
	}

	createCards(){
		for(let id of option.cards){
			for(let i=0; i<2; i++){
				this.cards.push(new Card(this, id));
			}
		}

		this.input.on('gameobjectdown', this.onCardClick, this);
	}

	createText(){
		this.timeoutText = this.add.text(10, 330, 'Time:', {
			font: '36px CurseCasual',
			fill: '#ffffff',
		})
	}

	onTimer(){
		if(this.timeout > -1) {
			this.timeoutText.setText(`Time: ${this.timeout--}`);
		}

		if(this.timeout == -1){
			this.sounds.timeout.play();
			this.timeout = -2;

			setTimeout(() => {
				this.start();
			}, 3000);
		}
	}

	createTimer(){
		this.time.addEvent({
			delay: 1000,
			loop: true,
			callback: this.onTimer,
			callbackScope: this,
		});
	}

	createSound(){
		let sounds = this.sounds = {
			card: this.sound.add('card'),
			complete: this.sound.add('complete'),
			success: this.sound.add('success'),
			theme: this.sound.add('theme'),
			timeout: this.sound.add('timeout'),
		}
		if (this.game.sound.context.state === 'suspended') {
			this.game.sound.context.resume();
		}

		sounds.theme.play({
			volume: 0.1,
		});
	}

	create() {
		this.editorCreate();
		this.constCreate();

		this.createSound();
		this.createTimer();
		this.createText();
		this.createCards();

		this.start();
	}

	start(){
		this.timeout = option.timeout;
		this.openCard = null;
		this.countOpenCard = 0;
		this.initCards();
	}

	cardHide(){
		for(let [index,card] of Object.entries(this.cards)){
			let [x,y] = [-card.width, -card.height];

			card.onClose();
			// card.setPosition(x,y);
			card.move({x,y,delay:50*index});
		}
	}

	initCards(){
		let positions = this.getCardPosition();

		for(let [index,card] of Object.entries(this.cards)){
			let {x,y} = positions.pop();

			card.onClose();
			// card.setPosition(x,y);
			card.move({x,y,delay:50*index});
		}
	}

	getCardPosition(){
		let {sysWidth, sysHeight, textures} = this;
		let positions = [];
		let {rows, cols} = option;

		let cardTexture = textures.get('card').getSourceImage();

		let margin = 4;
		let cardWidth = cardTexture.width + margin;
		let cardHeight = cardTexture.height + margin;

		let offsetX = (sysWidth - cardWidth * option.cols - margin)/2 + cardWidth/2;
		let offsetY = (sysHeight - cardHeight * option.rows - margin)/2 + cardHeight/2;

		for(let row=0; row<option.rows; row++){
			for(let col=0; col<option.cols; col++){
				positions.push({
					x: offsetX + col * cardWidth,
					y: offsetY + row * cardHeight,
				});
			}
		}

		return Phaser.Utils.Array.Shuffle(positions);
	}

	/**
	 *
	 * @param {*} pointer
	 * @param {Card} card
	 */
	onCardClick(pointer, card){
		if(card.isOpen){
			return false;
		}

		if(this.openCard){
			if(this.openCard.id === card.id){
				this.openCard = null;
				this.countOpenCard++;

				this.sounds.complete.play();
			} else {
				this.openCard.onClose();
				this.openCard = card;
			}
		} else {
			this.openCard = card;
		}

		card.onOpen(()=>{ this.sounds.card.play() });

		if(this.countOpenCard === this.cards.length/2){
			this.sounds.success.play();

			setTimeout(() => {
				this.start();
			}, 3000);
		}
	}



	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
