import Phaser from 'phaser';
import PlayerController from './PlayerController';

export default class Game extends Phaser.Scene {

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private penguin!: Phaser.Physics.Matter.Sprite;
  private playerController?: PlayerController;
  constructor() {
    super('game')
  }

  preload(): void {
    this.load.atlas('penguin', 'assets/penguin.png', 'assets/penguin.json');
    this.load.image('tiles', 'assets/sheet.png');
    this.load.tilemapTiledJSON('tilemap', 'assets/game.json');
  }

  init(): void {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create(): void {
    const map = this.make.tilemap({ key: 'tilemap' });
    const tileset = map.addTilesetImage('Iceworld', 'tiles');
    const ground = map.createLayer('ground', tileset);
    ground.setCollisionByProperty({ collides: true });

    this.matter.world.convertTilemapLayer(ground);

    const objectLayer = map.getObjectLayer('objects');

    objectLayer.objects.forEach((obj) =>{
        const { x = 0, y = 0, name } = obj;

        switch(name) {
          case 'spawn':

            this.penguin = this.matter.add
            .sprite(x, y , 'penguin')
              .setFixedRotation();

            this.playerController = new PlayerController(this.penguin, this.cursors)

            this.cameras.main.startFollow(this.penguin);
            break;
        }
      })
  }

  update(t: number, dt: number): void {
    if (!this.playerController) return;
    this.playerController.update(dt);
  }
}