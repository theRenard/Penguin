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

type extraConfig = {
	pixelArt: boolean
}

const config: Phaser.Types.Core.GameConfig & extraConfig = {
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.FIT,
		parent: 'phaser',
		width: 600,
		height: 600,
	},
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			debug: process.env.NODE_ENV === 'development',
      useTree: false,
      gravity: { y: 200 }
		}
	},
	scene: [Game],
};

new Phaser.Game(config);
