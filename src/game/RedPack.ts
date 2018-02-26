module game {
	export class RedPack extends egret.Bitmap {
		public static STATUS_READY: number = 0;    // 就绪状态
		public static STATUS_DROP: number = 1;     // 下落状态
		public static STATUS_END: number = 2;      // 结束状态
		// ------------------------------------
		public static TYPE_REDPACK = 'redpack';    // 红包
		public static TYPE_SUGER = 'suger';        // 糖果
		public static TYPE_BOOM = 'boom';          // 炸弹
		// ------------------------------------
		private dropTween: egret.Tween;
		public type: string;
		public status: number;
		public constructor(width: number = 86, height: number = 86) {
			super();
			// 根据概率设置生成的物品
			let random = Util.getRandom(0, 100);
			if (random >= 0 && random <= 79) {
				this.type = game.RedPack.TYPE_REDPACK;
				this.texture = RES.getRes('pic_redpacket_png');
			} else {
				this.type = game.RedPack.TYPE_BOOM;
				this.texture = RES.getRes('pic_bone_png');
			}
			this.status = game.RedPack.STATUS_READY;
			random = Util.getRandom(0, 6);
			this.width = width;
			this.height = height;
			this.x = random * 86 * Util.widthRatio;
			this.y = 262 * Util.heightRatio;

			this.startDrop();
		}
		private startDrop(): void {
			this.status = game.RedPack.STATUS_DROP;
			this.dropTween = egret.Tween.get(this);
			this.dropTween.to({
				y: (1136 - 86) * Util.heightRatio
			}, 1600, egret.Ease.cubicIn).call(this.emitDropEnd, this)
		}
		private emitDropEnd() {
			this.status = game.RedPack.STATUS_END;
			let dropEnd = egret.Event.create(game.GameEvent, game.GameEvent.DROP_END, true, false);
			dropEnd.emitObj = this;
			this.dispatchEvent(dropEnd);
			egret.Event.release(dropEnd);
		}
	}
}