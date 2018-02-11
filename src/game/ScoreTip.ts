module game {
	export class ScoreTip extends egret.Sprite {
		private redpack: egret.Bitmap;
		private score: egret.TextField;
		private scoreNum: number;

		public constructor() {
			super();
			this.scoreNum = 0;
			this.init();
		}
		private init() {
			this.redpack = Util.createBitmapByName('pic_redpacket_png');
			this.redpack.width = 60 * Util.widthRatio;
			this.redpack.height = 60 * Util.heightRatio;
			this.addChild(this.redpack);

			this.score = new egret.TextField();
			this.score.text = `x ${this.scoreNum}`;
			this.score.size = 26;
			this.score.textColor = 0xb52720;
			this.score.x = 56 * Util.widthRatio;
			this.score.y = 16 * Util.heightRatio;
			this.addChild(this.score);
		}
		public increase() {
			this.scoreNum++;
			this.score.text = `x ${this.scoreNum}`
		}
	}
}