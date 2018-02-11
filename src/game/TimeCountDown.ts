module game {
	export class TimeCountDown extends egret.Sprite {
		private bg: egret.Bitmap;
		private time: egret.TextField;
		private gameTimeLength: number;

		public constructor(gameTimeLength: number) {
			super();
			this.gameTimeLength = gameTimeLength;
			this.init();
		}
		private init() {
			this.bg = Util.createBitmapByName('bg_countdown_png');
			this.addChild(this.bg);

			this.time = new egret.TextField();
			this.setTime(this.gameTimeLength);
			this.time.size = 24;
			this.time.textColor = 0xffffff;
			this.time.textAlign = 'center';
			this.addChild(this.time);
		}
		public setRect(width: number, height: number, textY: number) {
			this.bg.width = width;
			this.bg.height = height;
			this.time.width = width;
			this.time.y = textY;
		}

		public setTime(time: number) {
			this.time.text = `${time < 10 ? '0' + time : time}秒`
		}
	}
}