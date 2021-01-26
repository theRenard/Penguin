/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import StateMachine from "~/utils/StateMachine";

export default class PlayerController {

  private sprite: Phaser.Physics.Matter.Sprite;
  private stateMachine: StateMachine<PlayerController>;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(sprite: Phaser.Physics.Matter.Sprite, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    this.sprite = sprite;
    this.cursors = cursors;
    this.createAnimation();
    this.stateMachine = new StateMachine(this, 'player');

    this.stateMachine
      .addState('idle', {
        onEnter: this.idleOnEnter,
        onUpdate: this.idleOnUpdate
      })
      .addState('walk', {
        onEnter: this.walkOnEnter,
        onUpdate: this.walkOnUpdate
      })
      .addState('jump', {
        onEnter: this.jumpOnEnter,
        onUpdate: this.jumpOnUpdate
      })
      .setState('idle');

      this.sprite.setOnCollide(() => {
        if (this.stateMachine.isCurrentState('jump')) {
          this.stateMachine.setState('idle');
        }
      })

  }
  private idleOnEnter() {
    this.sprite.play('player-idle');
  }

  private idleOnUpdate() {
    if (this.cursors.left.isDown || this.cursors.right.isDown) {
      this.stateMachine.setState('walk');
    }
    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space);
    if (spaceJustPressed) {
      this.stateMachine.setState('jump');
    }
  }
  walkOnEnter() {
    this.sprite.play('player-walk');
  }
  walkOnUpdate() {
    const speed = 5;
    if (this.cursors.left.isDown) {
      this.sprite.setVelocityX(-speed);
      this.sprite.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.sprite.flipX = false;
      this.sprite.setVelocityX(speed);
    } else {
      this.sprite.setVelocityX(0);
      this.stateMachine.setState('idle');
    }
  }

  private jumpOnEnter() {
    this.sprite.setVelocityY(-15);
  }

  private jumpOnUpdate() {
    const speed = 5;
    if (this.cursors.left.isDown) {
      this.sprite.setVelocityX(-speed);
      this.sprite.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.sprite.flipX = false;
      this.sprite.setVelocityX(speed);
    } else {
      this.sprite.setVelocityX(0);
      this.stateMachine.setState('idle');
    }
  }
  private createAnimation() {
    this.sprite.anims.create({
      key: 'player-idle',
      frames: [{ key: 'penguin', frame: 'penguin_walk01.png' }]
    })
    this.sprite.anims.create({
      key: 'player-walk',
      frameRate: 30,
      frames: this.sprite.anims.generateFrameNames('penguin', {
        start: 1,
        end: 4,
        prefix: 'penguin_walk0',
        suffix: '.png'
      }),
      repeat: -1,
    })
  }
  update(dt: number) {
    this.stateMachine.update(dt);
  }
}