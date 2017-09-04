/**
 * Export the library classes globally. When no arguments are given, all classes defined in enchant.js as well as all classes defined in plugins will be exported. When more than one argument is given, by default only classes defined in enchant.js will be exported. When you wish to export plugin classes you must explicitly deliver the plugin identifiers as arguments.
 */
declare function enchant();

declare function enchant(moduleName: string);

declare function enchant(moduleNames: string[]);

declare module enchant {

    class EventTarget {
		// method
		addEventListener(type:string, listener:(e:Event)=>any);

		clearEventListener(type:string);

		dispatchEvent(e:Event);

		on(type:string, listener:(e:Event)=>any);

		removeEventListener(type:string, listener:(e:Event)=>any);
	}

	class Core extends EventTarget {
		constructor(weight:number, height:number);

		// field
		assets(key:string):Surface;

		currentScene:Scene;
		fps:number;
		frame:any;
		height:any;
		input:any;
		static instance:Core;
		loadingScene:Scene;
		ready:any;
		rootScene:Scene;
		running:any;
		scale:any;
		width:any;
		// undocumented field
		onload:Function;

		// method
		addManager(childManager, nextManager);

		debug();

		static findExt(path):any;

		getDomElement():any;

		getDomElementAsNext():any;

		getElapsedTime():number;

		getNextManager(manager):any;

		initialize(node);

		keybind(key:number, button:string);

		keyunbind(key:number);

		load(asset:string, callback?:Function);

		pause();

		popScene():enchant.Scene;

		preload(asset:string):any;

		preload(assets:string[]):any;

		preload(...assets:string[]):any;

		pushScene(scene):Scene;

		remove();

		removeManager(childManager);

		removeScene(scene):enchant.Scene;

		render(inheritMat);

		replaceScene(scene):enchant.Scene;

		resume();

		setLayer(layer);

		start();

		stop();
	}

	class Node extends EventTarget {
		// field
		age:number;
		parentNode:Node;
		scene:Scene;
		x:number;
		y:number;

		tl:Timeline;

		// method
		moveBy(x:number, y:number);

		moveTo(x:number, y:number);
	}

	class Entity extends Node {
		// field
		backgroundColor:any;
		buttonMode:any;
		buttonPressed:boolean;
		compositeOperation:any;
		height:number;
		opacity:number;
		originX:number;
		originY:number;
		rotation:number;
		scaleX:number;
		scaleY:number;
		touchEnabled:boolean;
		visible:boolean;
		width:number;

		// method
		disableCollection();

		enableCollection();

		intersect(other:{x:number;y:number;width:number;height:number;}):boolean;

		rotate(deg:number);

		scale(x:number, y:number);

		within(other:{x:number;y:number;width:number;height:number;}, distance?:number):boolean;
	}

	class Sprite extends Entity {
		constructor(weight:number, height:number);

		// field
		frame:any; // number[] or number
		height:number;
		width:number;
		image:Surface;
	}

	class Action {
		// TODO
	}

	class ActionEventTarget extends EventTarget {
		// TODO
	}

	class CanvasLayer {
		// TODO
	}

	class Class {
		// TODO
	}

	class DOMSound {
		// TODO
	}

	class Easing {
		// TODO
	}

	class ENV {
		// TODO
	}

	class Event {
		constructor(type:string);

		// field
		static A_BUTTON_DOWN:any;
		static A_BUTTON_UP:any;
		static ACTION_ADDED:any;
		static ACTION_END:any;
		static ACTION_REMOVED:any;
		static ACTION_START:any;
		static ACTION_TICK:any;
		static ADDED:any;
		static ADDED_TO_SCENE:any;
		static ADDED_TO_TIMELINE:any;
		static B_BUTTON_DOWN:any;
		static B_BUTTON_UP:any;
		static CHILD_ADDED:any;
		static CHILD_REMOVED:any;
		static DOWN_BUTTON_DOWN:any;
		static DOWN_BUTTON_UP:any;
		static ENTER:any;
		static ENTER_FRAME:any;
		static EXIT:any;
		static EXIT_FRAME:any;
		static INPUT_CHANGE:any;
		static INPUT_END:any;
		static INPUT_START:any;
		static LEFT_BUTTON_DOWN:any;
		static LEFT_BUTTON_UP:any;
		static LOAD:any;
		static PROGRESS:any;
		static REMOVED:any;
		static REMOVED_FROM_SCENE:any;
		static REMOVED_FROM_TIMELINE:any;
		static RENDER:any;
		static RIGHT_BUTTON_DOWN:any;
		static RIGHT_BUTTON_UP:any;
		static TOUCH_END:any;
		static TOUCH_MOVE:any;
		static TOUCH_START:any;
		static UP_BUTTON_DOWN:any;
		static UP_BUTTON_UP:any;

		localX:number;
		localY:number;
		target:any;
		type:string;
		x:number;
		y:number;
	}

	class Group extends Node {
		constructor();

		// field
		childNodes:any;
		firstChild:any;
		lastChild:any;
		originX:any;
		originY:any;
		rotation:any;
		scaleX:any;
		scaleY:any;

		// method
		addChild(node:Node);

		insertBefore(node:Node, reference:Node);

		removeChild(node:Node);
	}

    class Label extends Entity {
        constructor();

        text: string;
        color: string;
		// TODO
	}

	class Map extends Entity {
		// TODO
	}

	class ParallelAction extends Action {
		// TODO
	}

	class Scene extends Group {
		constructor();
	}

	class Sound {
		// TODO
	}

	class Surface {
		// TODO
	}

	class Timeline {
		constructor(node:Node, unitialized?:boolean);

		// method
		action(params):Timeline;

		and():Timeline;

		clear():Timeline;

		cue(cue:any):void;

		delay(time:number):Timeline;

		exec(func:Function):void;

		fadeIn(time:number, easing?:Function):Timeline;

		fadeOut(time:number, easing?:Function):Timeline;

		fadeTo(opacity:number, time:number, easing?:Function):Timeline;

		hide():Timeline;

		loop():Timeline;

		moveBy(x:number, y:number, time:number, easing?:Function):Timeline;

		moveTo(x:number, y:number, time:number, easing?:Function):Timeline;

		moveX(x:number, time:number, easing?:Function):Timeline;

		moveY(y:number, time:number, easing?:Function):Timeline;

		next(remainingTime:any):void;

		pause():Timeline;

		removeFromScene():Timeline;

		repeat(func:Function, time:number):Timeline;

		resume():Timeline;

		rotateBy(deg:number, time:number, easing?:Function):Timeline;

		rotateTo(deg:number, time:number, easing?:Function):Timeline;

		scaleBy(scaleX:number, scaleY:number, time:number, easing?:Function):Timeline;

		scaleTo(scaleX:number, scaleY:number, time:number, easing?:Function):Timeline;

		setFrameBased():void;

		setTimeBased():void;

		show():Timeline;

		skip(frames:number):Timeline;

		then(func:Function):Timeline;

		tick(enterFrameEvent):void;

		tween(params):Timeline;

		unloop():Timeline;

		waitUntil(func:Function):Timeline;
	}

	class Tween {
		// TODO
	}

	class WebAudioSound {
		// TODO
	}
}
