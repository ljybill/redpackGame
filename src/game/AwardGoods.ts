module game {
	export class AwardGoods extends egret.Bitmap {
		private dropTween: egret.Tween;
		private heightRatio: number = 1;
		private widthRatio: number = 1;
		public constructor(width: number = 86, height: number = 86, widthRatio: number = 1, heightRatio: number = 1) {
			super();
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