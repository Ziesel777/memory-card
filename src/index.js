import Phaser from "phaser";
import Level from "./scenes/Level";

class Boot extends Phaser.Scene {

	constructor() {
		super("Boot");
	}

	preload() {

		this.load.pack("pack", "assets/asset-pack.json");
	}

	create() {

	this.scene.start("Level");
	}
}

const game = new Phaser.Game({
	width: 1280,
	height: 720,
	backgroundColor: "#2f2f2f",
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT,
		autoCenter: Phaser.Scale.Center.CENTER_BOTH
	},
	scene: [Boot, Level],
});

game.scene.start("Boot");


