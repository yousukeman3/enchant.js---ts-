"use strict"
///<reference path="../enchant.js.d.ts"/>
// code.9leap.net default template
// based on enchant.js v0.7.1

let myRandom = function (max: number, min: number) {
    let _ = Math.round(Math.random() * (max + 1 - min)) + min;
    //console.log(_);
    return _;
}

enchant();

window.onload = function () {
    let game = new enchant.Core(320, 320);
    game.fps = 15;
    game.preload("http://coderun.9leap.net/codes/132391/bg.png","http://coderun.9leap.net/codes/132391/shooting.png");
    game.onload = function () {

        let scene1 = new enchant.Scene();
        let backgroundImage = new enchant.Sprite(320, 320);
        backgroundImage.image = game.assets["http://coderun.9leap.net/codes/132391/bg.png"];
        scene1.addChild(backgroundImage);


        let ownMachine = new enchant.Sprite(32, 32);
        ownMachine.image = game.assets["http://coderun.9leap.net/codes/132391/shooting.png"];
        ownMachine.y = 320 - 32;
        scene1.addChild(ownMachine);


        let bullets: enchant.Sprite[] = [];
        let enemys: enchant.Sprite[] = [];


        let waitBullet = 5;
        let bulletCount = 0;

        let waitenemy = 0;
        let enemyCount = 0;
        let enemyrate = 45;
        let enemySpeed = 5;


        let ownMachineFunc = function () {
            if (game.input.right) {
                ownMachine.x += 4;
                if (game.input.Dash) {
                    ownMachine.x += 4;
                }
                if (ownMachine.x > 320 - 32) {
                    ownMachine.x = 320 - 32;
                }
            }
            if (game.input.left) {
                ownMachine.x -= 4;
                if (game.input.Dash) {
                    ownMachine.x -= 4;
                }
                if (ownMachine.x < 0) {
                    ownMachine.x = 0;
                }
            }
        };

        
        let bulletFunc = function () {
            //console.log(bullets.length);
            bullets.forEach(function (bullet, index, bulletAllay) {
                if (!(bullet == null || bullet == undefined)) {
                    bullet.y -= 10;
                    
                    if (bullet.y < -32) {
                        scene1.removeChild(bullet);
                        bullets.shift();
                        //console.log(bullets.length);
                    }
                }
            });
            if (game.input.Shoot && bulletCount > waitBullet) {
                let index = bullets.push(new enchant.Sprite(32, 32)) - 1;
                bullets[index].image = game.assets["http://coderun.9leap.net/codes/132391/shooting.png"];
                bullets[index].frame = 2;
                bullets[index].x = ownMachine.x;
                bullets[index].y = ownMachine.y - 32;
                scene1.addChild(bullets[index]);
                bulletCount = 0;
            }
            bulletCount++;
        };

        let enemyFunc = function () {
            enemys.forEach(function (enemy, index, enemyAllay) {
                if (!(enemy == null || enemy == undefined)) {
                    enemy.y += enemySpeed;

                    if (enemy.y > 320) {
                        scene1.removeChild(enemy);
                        enemys.shift();
                    }
                }
            });
            if (myRandom(0, enemyrate) == 1) {
                let index = enemys.push(new enchant.Sprite(32, 32)) - 1;
                enemys[index].image = game.assets["http://coderun.9leap.net/codes/132391/shooting.png"];
                enemys[index].frame = 1;
                enemys[index].x = myRandom(0, 320 - 32);
                enemys[index].y = -32;
                scene1.addChild(enemys[index]);
            }
        }

        let perDecision = function () {
            bullets.forEach(function () {

            });
        }

        game.keybind('D'.charCodeAt(0), 'Dash');
        game.keybind('S'.charCodeAt(0), 'Shoot');

        scene1.addEventListener("enterframe", ownMachineFunc);
        scene1.addEventListener("enterframe", bulletFunc);
        scene1.addEventListener("enterframe", enemyFunc);
        game.pushScene(scene1);
    };
    game.start();
};
//seで困ったらこれをつかえ
//http://wikiwiki.jp/piporpg/?%A5%B5%A5%A6%A5%F3%A5%C9%C1%C7%BA%E0%20%C7%DB%C9%DB%A5%B5%A5%A4%A5%C8
