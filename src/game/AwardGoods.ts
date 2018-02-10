module game {
	export class AwardGoods extends egret.Bitmap {
		public static STATUS_READY: number = 0;    // 就绪状态
		public static STATUS_DROP: number = 1;     // 下落状态
		public static STATUS_END: number = 2;      // 结束状态
		// ------------------------------------
		public static TYPE_REDPACK = 'redpack';    // 红包
		public static TYPE_SUGER = 'suger';        // 糖果
		// ------------------------------------
		private dropTween: egret.Tween;
		private heightRatio: number = 1;
		private widthRatio: number = 1;
		private type: string;
		private status: number;
		public constructor(width: number = 86, height: number = 86, widthRatio: number = 1, heightRatio: number = 1) {
			super();
			// 初始化
			this.type = game.AwardGoods.TYPE_REDPACK;
			this.status = game.AwardGoods.STATUS_READY;
			this.heightRatio = heightRatio;
			this.widthRatio = widthRatio;
			let random = Util.getRandom(0, 6);
			this.texture = RES.getRes('pic_redpacket_png');
			this.width = width;
			this.height = height;
			this.x = random * 86 * widthRatio;
			this.y = 262 * heightRatio;

			this.startDrop();
		}
		private startDrop(): void {
			this.dropTween = egret.Tween.get(this);
			this.dropTween.to({
				y: (1136 - 86) * this.heightRatio
			}, 1000).call(this.emitDropEnd, this)
		}
		private emitDropEnd() {

			// console.log('hit test:' + this.hitTestPoint(86 * this.widthRatio, (1136 - 86) * this.heightRatio));

			let dropEnd = egret.Event.create(game.GameEvent, game.GameEvent.DROP_END, true, false);
			dropEnd.emitObj = this;
			this.dispatchEvent(dropEnd);
			egret.Event.release(dropEnd);
		}
	}
}