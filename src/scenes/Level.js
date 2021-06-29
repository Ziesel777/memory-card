
// You can write more code here

/* START-USER-IMPORT-CODE */
import option from '../game-option';
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
	}

	createCard(){
		let positions = this.getCardPosition();
		for(let pos of positions){
			this.add.sprite(pos.x, pos.y, "card").setOrigin(0, 0);
		}
	}

	create() {
		this.editorCreate();
		this.constCreate();

		this.createCard();
	}

	getCardPosition(){
		let {sysWidth, sysHeight, textures} = this;
		let positions = [];
		let {rows, cols} = option;

		let cardTexture = textures.get('card').getSourceImage();

		let margin = 4;
		let cardWidth = cardTexture.width + margin;
		let cardHeight = cardTexture.height + margin;

		let offsetX = (sysWidth - cardWidth * option.cols - margin)/2;
		let offsetY = (sysHeight - cardHeight * option.rows - margin)/2;

		for(let row=0; row<option.rows; row++){
			for(let col=0; col<option.cols; col++){
				positions.push({
					x: offsetX + col * cardWidth,
					y: offsetY + row * cardHeight,
				});
			}
		}

		return positions;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
