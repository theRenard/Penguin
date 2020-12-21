/**
 * Assets from
 *
 * https://www.gameartguppy.com/shop/penguin/
 *  */

import Phaser from 'phaser';
import Game from '~/scenes/Game';

declare const process: {
	env: {
		NODE_ENV: string
	}
}


const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	scale: {
		// mode: Phaser.Scale.FIT,
		parent: 'phaser',
		width: 600,
		height: 600,
	},
	// pixelArt: true,
	physics: {
		default: 'matter',
		matter: {
			debug: process.env.NODE_ENV === 'development',
		}
	},
	scene: [Game],
};

new Phaser.Game(config);
