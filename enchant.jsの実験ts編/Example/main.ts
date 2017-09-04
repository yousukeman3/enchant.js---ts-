///<reference path="../enchant.js.d.ts"/>
// code.9leap.net default template
// based on enchant.js v0.7.1

enchant();

window.onload = function () {
    var game = new enchant.Core(320, 320);
    game.fps = 15;
    game.preload("http://coderun.9leap.net/codes/132391/bg.png");
    var scene1 = new enchant.Scene();
    var backgroundImage = new enchant.Sprite(320, 320);
    game.onload = function () {
        backgroundImage.image = game.assets["http://coderun.9leap.net/codes/132391/bg.png"];
        scene1.addChild(backgroundImage);
        var label1 = new enchant.Label();
        label1.text = "まだ更新してないよ";
        label1.color = "red";
        scene1.addChild(label1);
        scene1.on("touchstart", function () {
            game.resume();
        });
        label1.on('enterframe', function () {
            label1.text = game.getElapsedTime();
            if (label1.text == 10) {
                game.pause();
            }
        });

        game.pushScene(scene1);
    };
    game.debug();
};
//seで困ったらこれをつかえ
//http://wikiwiki.jp/piporpg/?%A5%B5%A5%A6%A5%F3%A5%C9%C1%C7%BA%E0%20%C7%DB%C9%DB%A5%B5%A5%A4%A5%C8