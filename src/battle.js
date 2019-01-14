export class Battle {
  constructor(player, enemy) {
    this.player = player;
    this.enemy = enemy;
  }

  attack() {
    this.player.inBattle = true;
    this.enemy.inBattle = true;
    this._battleFreeze();
      let playerAttack = setInterval(() => {
        this.enemy.death();
        this.player.death();
        if (this.enemy.dead === true || this.player.dead === true) {
          this.player.inBattle = false;
          this.enemy.inBattle = false;
          clearInterval(playerAttack);
        } else {
          this.enemy.health -= this.player.attack;
          this.player.experience += 10; //this is the experience added per hit
          this.player.levelUp();
          console.log('player hit, enemy health:', this.enemy.health);
        }
      }, (5000-(this.player.speed*400)));

    let enemyAttack = setInterval(() => {
      this.enemy.death();
      this.player.death();
      if (this.enemy.dead === true || this.player.dead === true) {
        this.player.inBattle = false;
        this.enemy.inBattle = false;
        clearInterval(enemyAttack);
      } else {
        this.player.health -= this.enemy.attack;
        console.log('enemy hit, this.player health:', this.player.health);
      }
    }, (5000-(this.enemy.speed*400)));
  }

  _battleFreeze() {
    setInterval(() => {
      if (this.player.inBattle === true) {
        this.player._speed = 0;
      } else {
        this.player._speed = 5;
        clearInterval();
      }
    }, 100)
  }

  useHealthPotion() {
    if (this.player.inventory.includes('health_potion')) {
      this.player.health += 5;
    } else console.log('no health potion present');
  }

}
