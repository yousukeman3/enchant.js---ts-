///<reference path="../enchant.js.d.ts"/>
// code.9leap.net default template
// based on enchant.js v0.7.1

enchant();

window.onload = function () {
    var game = new enchant.Core(320, 320);
    game.fps = 15;
    game.preload("http://coderun.9leap.net/codes/132391/bg.png","http://coderun.9leap.net/codes/132391/shooting.png");
    var scene1 = new enchant.Scene();
    var backgroundImage = new enchant.Sprite(320, 320);
    game.onload = function () {
        backgroundImage.image = game.assets["http://coderun.9leap.net/codes/132391/bg.png"];
        scene1.addChild(backgroundImage);
        var ownMachine = new enchant.Sprite(32, 32);
        ownMachine.image = game.assets["http://coderun.9leap.net/codes/132391/shooting.png"];
        scene1.addChild(ownMachine);
        var bullets: enchant.Sprite[];
        ownMachine.y = 320 - 32;
        game.keybind('D'.charCodeAt(0), 'Dash');
        game.keybind('S'.charCodeAt(0), 'Shoot');
        var ownMachineFunc: () => void;
        var waitBullet = 5;

        scene1.addEventListener('enterframe',ownMachineFunc = function (){
            //console.log(game.input.Dash);
            if (game.input.right) {
                ownMachine.x += 4;
                if (game.input.Dash) {
                    ownMachine.x += 4;
                }
                if (ownMachine.x > 320 - 32){
                    ownMachine.x = 320 - 32;
                }
            }
            if (game.input.left) {
                ownMachine.x -= 4;
                if (game.input.d) {
                    ownMachine.x -= 4;
                }
                if (ownMachine.x < 0){
                    ownMachine.x = 0;
                }
            }
            if (game.input.Shoot) {
                bullets.forEach(function (bullet, index, bulles) {
                    if (bullet == null || bullet == undefined) {
                        bullet = new enchant.Sprite(32, 32);
                        bullet.x = ownMachine.x;
                        bullet.y = ownMachine.y + 32;
                    }
                    if (!(bullet == null || bullet == undefined)) {
                        bullet.y += 10;
                        if (bullet.y > 320) {
                            bullet = null;
                        }
                    }
                });
            }
        });
        game.pushScene(scene1);
    };
    game.start();
};
//seで困ったらこれをつかえ
//http://wikiwiki.jp/piporpg/?%A5%B5%A5%A6%A5%F3%A5%C9%C1%C7%BA%E0%20%C7%DB%C9%DB%A5%B5%A5%A4%A5%C8