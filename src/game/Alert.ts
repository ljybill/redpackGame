module game {
	export class Alert extends egret.Sprite {
		private maskRect: egret.Bitmap;
		private bg: egret.Bitmap;
		private text: egret.TextField;
		private btn: egret.Bitmap;

		public constructor() {
			super();

			this.maskRect = Util.createBitmapByName('bg_opacity_png');
			this.maskRect.width = Util.stageW;
			this.maskRect.height = Util.stageH;
			this.addChild(this.maskRect);

			this.bg = Util.createBitmapByName('popup_congratulation_png');
			this.bg.width = Util.stageW;
			this.bg.height = Util.stageH;
			this.addChild(this.bg);

			this.text = new egret.TextField();
			this.text.text = '游戏结束';
			this.text.size = 72;
			this.text.x = 183 * Util.widthRatio;
			this.text.y = 481 * Util.heightRatio;
			this.addChild(this.text);

			this.btn = Util.createBitmapByName('btn_submit_png');
			this.btn.width = 296 * Util.widthRatio;
			this.btn.height = 82 * Util.heightRatio;
			this.btn.x = 173 * Util.widthRatio;
			this.btn.y = 711 * Util.heightRatio;
			this.addChild(this.btn);
			this.btn.touchEnabled = true;
			this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.popSubmit, this);
		}
		private popSubmit() {
			let gameEvent = egret.Event.create(game.GameEvent, game.GameEvent.ALERT_BTN_CLICK, false, false);
			this.dispatchEvent(gameEvent);
			egret.Event.release(gameEvent);
		}
	}
}