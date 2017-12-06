"use strict";
///<reference path="../enchant.js.d.ts"/>
// code.9leap.net default template
// based on enchant.js v0.7.1
let myRandom = (max, min) => {
    return Math.round(Math.random() * (max + 1 - min)) + min;
};
enchant();
window.onload = () => {
    let game = new enchant.Core(320, 320);
    game.fps = 15;
    game.preload("bg.png", "shooting.png");
    game.onload = () => {
        let scene1 = new enchant.Scene();
        let backgroundImage = new enchant.Sprite(320, 320);
        //backgroundImage.scale(game.width / backgroundImage.width, game.height / backgroundImage.height);
        backgroundImage.image = game.assets["bg.png"];
        scene1.addChild(backgroundImage);
        let ownMachine = new enchant.Sprite(32, 32);
        ownMachine.image = game.assets["shooting.png"];
        ownMachine.y = game.height - 32;
        scene1.addChild(ownMachine);
        let score = 0;
        let scoreLabel = new enchant.Label();
        scoreLabel.text = "score:" + score + "          →と←で機体操作、Dはダッシュ、Sでシュート!!";
        scoreLabel.color = "white";
        scene1.addChild(scoreLabel);
        let gameover = new enchant.Sprite(190, 97);
        gameover.image = game.assets["end.png"];
        gameover.x = (game.width - 190) / 2;
        gameover.y = (game.height - 97) / 2;
        let bullets = [];
        let bulletsLeft = [];
        let bulletsRight = [];
        let enemys = [];
        const ownMachineSpeed = 4;
        const ownMachineSpeedAddition = 4;
        const waitBullet = 0;
        let bulletCount = 0;
        let bulletCountLeft = 0;
        let bulletCountRight = 0;
        let bulletWide = 5;
        let enemyCount = 0;
        const enemyRate = 50;
        const enemySpeed = 5;
        let gameoverFunc = () => {
            if (game.input.Retry) {
                scene1.removeChild(gameover);
                score = 0;
                scoreLabel.text = "score:" + score + "          →と←で機体操作、Dはダッシュ、Sでシュート!!";
                scene1.removeEventListener("enterframe", gameoverFunc);
                scene1.addEventListener("enterframe", ownMachineFunc);
                scene1.addEventListener("enterframe", bulletFuncBeta);
                scene1.addEventListener("enterframe", enemyFunc);
                scene1.addEventListener("enterframe", perDecisionBeta);
            }
        };
        let ownMachineFunc = () => {
            if (game.input.right) {
                ownMachine.x += ownMachineSpeed;
                if (game.input.Dash) {
                    ownMachine.x += ownMachineSpeedAddition;
                }
                if (ownMachine.x > 320 - 32) {
                    ownMachine.x = 320 - 32;
                }
            }
            if (game.input.left) {
                ownMachine.x -= ownMachineSpeed;
                if (game.input.Dash) {
                    ownMachine.x -= ownMachineSpeedAddition;
                }
                if (ownMachine.x < 0) {
                    ownMachine.x = 0;
                }
            }
        };
        let bulletFunc = () => {
            //console.log(bullets.length);
            bullets.forEach((bullet, index, bulletAllay) => {
                if (!(bullet == null || bullet == undefined)) {
                    bullet.y -= 10;
                    if (bullet.y < -32) {
                        scene1.removeChild(bullet);
                        bullets.shift();
                        console.log(bullets.length);
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
        let bulletFuncBeta = () => {
            //console.log(bullets.length);
            console.log("Beta");
            let bulletMove = (bulletAllay, relativePlace) => {
                bulletAllay.forEach((bullet, index, bulletAllay) => {
                    if (!(bullet == null || bullet == undefined)) {
                        bullet.y -= 10;
                        bullet.x += relativePlace;
                        if (bullet.y < -32) {
                            scene1.removeChild(bullet);
                            bulletAllay.shift();
                            console.log(bulletAllay.length);
                        }
                    }
                });
            };
            let bulletCleate = (bulletAllay, relativePlace, bulletCounter) => {
                if (game.input.Shoot && bulletCounter > waitBullet) {
                    let index = bulletAllay.push(new enchant.Sprite(32, 32)) - 1;
                    bulletAllay[index].image = game.assets["shooting.png"];
                    bulletAllay[index].frame = 2;
                    bulletAllay[index].x = ownMachine.x + relativePlace;
                    bulletAllay[index].y = ownMachine.y - 32;
                    scene1.addChild(bulletAllay[index]);
                    bulletCounter = 0;
                }
            };
            let bulletsFunc = (bulletAllay, relativePlace, bulletCounter) => {
                bulletMove(bulletAllay, relativePlace);
                bulletCleate(bulletAllay, relativePlace, bulletCounter);
                bulletCounter++;
            };
            bulletsFunc(bullets, 0, bulletCount);
            bulletsFunc(bulletsLeft, -bulletWide, bulletCountLeft);
            bulletsFunc(bulletsRight, bulletWide, bulletCountRight);
        };
        let enemyFunc = () => {
            enemys.forEach((enemy, index, enemyAllay) => {
                if (!(enemy == null || enemy == undefined)) {
                    enemy.y += enemySpeed;
                    if (enemy.y > game.height) {
                        scene1.removeChild(enemy);
                        enemys.shift();
                        console.log(enemys.length);
                    }
                }
            });
            if (myRandom(0, enemyRate) == 1) {
                let index = enemys.push(new enchant.Sprite(32, 32)) - 1;
                enemys[index].image = game.assets["shooting.png"];
                enemys[index].frame = 1;
                enemys[index].x = myRandom(0, game.width - 32);
                enemys[index].y = -32;
                scene1.addChild(enemys[index]);
            }
        };
        let perDecisionBeta = () => {
            let jugeBullet = (bulletAllay) => {
                bulletAllay.forEach((bullet, indexb, bulletAllay) => {
                    enemys.forEach((enemy, index, enemyAllay) => {
                        //console.log("〇");
                        if (bullet.within(enemy, 16)) {
                            scene1.removeChild(enemy);
                            enemys.splice(index, 1);
                            score++;
                            scoreLabel.text = "score:" + score + "          →と←で機体操作、Dはダッシュ、Sでシュート!!";
                        }
                    });
                });
            };
            jugeBullet(bullets);
            jugeBullet(bulletsLeft);
            jugeBullet(bulletsRight);
            enemys.forEach((enemy, index, enemyAllay) => {
                if (enemy.within(ownMachine, 16) || enemy.y > game.height - 32) {
                    console.log("gameoverだお");
                    scoreLabel.text = "score:" + score + "          スペースキーでコンテニュー";
                    scene1.removeEventListener("enterframe", ownMachineFunc);
                    scene1.removeEventListener("enterframe", bulletFuncBeta);
                    scene1.removeEventListener("enterframe", enemyFunc);
                    scene1.removeEventListener("enterframe", perDecisionBeta);
                    enemys.forEach((enemy, index, enemyAllay) => {
                        scene1.removeChild(enemy);
                    });
                    bullets.forEach((bullet, index, bulletAllay) => {
                        scene1.removeChild(bullet);
                    });
                    enemys = [];
                    bullets = [];
                    scene1.addChild(gameover);
                    scene1.addEventListener("enterframe", gameoverFunc);
                }
            });
        };
        let perDecision = () => {
            bullets.forEach((bullet, indexb, bulletAllay) => {
                enemys.forEach((enemy, index, enemyAllay) => {
                    //console.log("〇");
                    if (bullet.within(enemy, 16)) {
                        scene1.removeChild(enemy);
                        enemys.splice(index, 1);
                        score++;
                        scoreLabel.text = "score:" + score + "          →と←で機体操作、Dはダッシュ、Sでシュート!!";
                    }
                });
            });
            enemys.forEach((enemy, index, enemyAllay) => {
                if (enemy.within(ownMachine, 16) || enemy.y > game.height - 32) {
                    console.log("gameoverだお");
                    scoreLabel.text = "score:" + score + "          スペースキーでコンテニュー";
                    scene1.removeEventListener("enterframe", ownMachineFunc);
                    scene1.removeEventListener("enterframe", bulletFuncBeta);
                    scene1.removeEventListener("enterframe", enemyFunc);
                    scene1.removeEventListener("enterframe", perDecisionBeta);
                    enemys.forEach((enemy, index, enemyAllay) => {
                        scene1.removeChild(enemy);
                    });
                    bullets.forEach((bullet, index, bulletAllay) => {
                        scene1.removeChild(bullet);
                    });
                    enemys = [];
                    bullets = [];
                    scene1.addChild(gameover);
                    scene1.addEventListener("enterframe", gameoverFunc);
                }
            });
        };
        game.keybind('D'.charCodeAt(0), 'Dash');
        game.keybind('S'.charCodeAt(0), 'Shoot');
        game.keybind(' '.charCodeAt(0), 'Retry');
        scene1.addEventListener("enterframe", ownMachineFunc);
        scene1.addEventListener("enterframe", bulletFuncBeta);
        scene1.addEventListener("enterframe", enemyFunc);
        scene1.addEventListener("enterframe", perDecision);
        game.pushScene(scene1);
    };
    game.start();
};
//# sourceMappingURL=main.js.map