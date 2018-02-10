module game {
	export class Bag extends egret.Bitmap {
		private touchStatus: boolean = false;
		private distance: egret.Point = new egret.Point();

		public constructor() {
			super();
			this.texture = RES.getRes('pic_fudai_png');
			this.touchEnabled = true;
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
			this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this)
		}
		private touchBegin(evt: egret.TouchEvent) {
			this.touchStatus = true;
			this.distance.x = evt.stageX - this.x;
			this.distance.y = evt.stageY - this.y;
			this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
		}
		private touchMove(evt: egret.TouchEvent) {
			if (this.touchStatus) {
				this.x = evt.stageX - this.distance.x;
				// 边缘检测
				if (this.x < this.width / 2) {
					this.x = this.width / 2;
				}
				if (this.x > (640 - this.width / 2)) {
					this.x = 640 - this.width / 2;
				}
				// this.y = evt.stageY - this.distance.y;
			}
		}
		private touchEnd(evt: egret.TouchEvent) {
			this.touchStatus = false;
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
		}
	}
}