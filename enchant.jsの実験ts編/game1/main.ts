"use strict"
///<reference path="../enchant.js.d.ts"/>
// code.9leap.net default template
// based on enchant.js v0.7.1

let myRandom = function (max: number, min: number) {
    return Math.round(Math.random() * (max + 1 - min)) + min;
}

enchant();

window.onload = function () {
    let game = new enchant.Core(320, 320);
    game.fps = 15;
    game.preload("bg.png","shooting.png");
    game.onload = function () {

        let scene1 = new enchant.Scene();
        let backgroundImage = new enchant.Sprite(320, 320);
        backgroundImage.image = game.assets["bg.png"];
        scene1.addChild(backgroundImage);


        let ownMachine = new enchant.Sprite(32, 32);
        ownMachine.image = game.assets["shooting.png"];
        ownMachine.y = 320 - 32;
        scene1.addChild(ownMachine);


        let score = 0;

        let scoreLabel = new enchant.Label();
        scoreLabel.text = "score:" + score;
        scoreLabel.color = "white";
        scene1.addChild(scoreLabel);

        let gameover = new enchant.Sprite(190, 97);
        gameover.image = game.assets["end.png"];
        gameover.x = (320 - 190) / 2;
        gameover.y = (320 - 97) / 2;


        let bullets: enchant.Sprite[] = [];
        let enemys: enchant.Sprite[] = [];


        let waitBullet = 5;
        let bulletCount = 0;

        let waitenemy = 0;
        let enemyCount = 0;
        let enemyrate = 45;
        let enemySpeed = 5;


        let gameoverFunc = function () {
            if (game.input.Retry) {
                scene1.removeChild(gameover);
                score = 0;
                scoreLabel.text = "score:" + score;
                scene1.removeEventListener("enterframe", gameoverFunc);
                scene1.addEventListener("enterframe", ownMachineFunc);
                scene1.addEventListener("enterframe", bulletFunc);
                scene1.addEventListener("enterframe", enemyFunc);
                scene1.addEventListener("enterframe", perDecision);
            }
        }


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
                bullets[index].image = game.assets["shooting.png"];
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
                enemys[index].image = game.assets["shooting.png"];
                enemys[index].frame = 1;
                enemys[index].x = myRandom(0, 320 - 32);
                enemys[index].y = -32;
                scene1.addChild(enemys[index]);
            }
        }

        let perDecision = function () {
            bullets.forEach(function (bullet,indexb,bulletAllay) {
                enemys.forEach(function (enemy, index, enemyAllay) {
                    //console.log("〇");
                    if (bullet.within(enemy, 16)) {
                        scene1.removeChild(enemy);
                        enemys.splice(index, 1);
                        score++;
                        scoreLabel.text = "score:" + score;
                    }
                });
            });
            enemys.forEach(function (enemy, index, enemyAllay) {
                if (enemy.within(ownMachine, 16) || enemy.y > 320 - 32) {
                    //gameoverだお
                    scene1.removeEventListener("enterframe", ownMachineFunc);
                    scene1.removeEventListener("enterframe", bulletFunc);
                    scene1.removeEventListener("enterframe", enemyFunc);
                    scene1.removeEventListener("enterframe", perDecision);
                    while (enemys.length > 0) {
                        scene1.removeChild(enemys[0]);
                        enemys.shift();
                    }
                    while (bullets.length > 0) {
                        scene1.removeChild(bullets[0]);
                        enemys.shift();
                    }
                    scene1.addChild(gameover);
                    scene1.addEventListener("enterframe", gameoverFunc);
                }
            });
        }


        game.keybind('D'.charCodeAt(0), 'Dash');
        game.keybind('S'.charCodeAt(0), 'Shoot');
        game.keybind(' '.charCodeAt(0), 'Retry');

        scene1.addEventListener("enterframe", ownMachineFunc);
        scene1.addEventListener("enterframe", bulletFunc);
        scene1.addEventListener("enterframe", enemyFunc);
        scene1.addEventListener("enterframe", perDecision);
        game.pushScene(scene1);
    };
    game.start();
};
//seで困ったらこれをつかえ
//http://wikiwiki.jp/piporpg/?%A5%B5%A5%A6%A5%F3%A5%C9%C1%C7%BA%E0%20%C7%DB%C9%DB%A5%B5%A5%A4%A5%C8
