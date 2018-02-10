module page {
	export class GamePage extends egret.Sprite {
		private stageW: number = 0;
		private stageH: number = 0;
		private widthRatio: number = 1;
		private heightRatio: number = 1;
		private timer: number;
		private timer2: number;
		private gameTimeLength: number = 60;
		private redPackList: Array<game.AwardGoods>;
		private bag: game.Bag;
		private scoreText: egret.TextField;
		private timeCountDown: game.TimeCountDown;
		private scoreTip: game.ScoreTip;

		public constructor(width: number, height: number, widthRatio: number, heightRatio: number) {
			super();
			this.stageW = width;
			this.stageH = height;
			this.widthRatio = widthRatio;
			this.heightRatio = heightRatio;
			this.redPackList = [];

			this.createView();
		}
		// 视图初始化
		private createView(): void {
			// 背景图初始化
			let backgroundImage = Util.createBitmapByName('bg_game_jpg');
			backgroundImage.width = this.stageW;
			backgroundImage.height = this.stageH;
			this.addChild(backgroundImage);

			// 福袋初始化
			this.bag = new game.Bag();
			this.bag.width = this.bag.width * this.widthRatio / 2;
			this.bag.height = this.bag.height * this.heightRatio / 2;
			this.bag.anchorOffsetX = this.bag.width / 2;
			this.bag.anchorOffsetY = this.bag.height / 2;
			this.bag.x = this.stageW / 2;
			this.bag.y = (this.stageH - 10) * this.heightRatio - this.bag.height;
			this.addChild(this.bag);

			// 倒计时初始化
			this.timeCountDown = new game.TimeCountDown();
			this.timeCountDown.setRect(105 * this.widthRatio, 113 * this.heightRatio, 68 * this.heightRatio);
			this.timeCountDown.x = 28 * this.widthRatio;
			this.timeCountDown.y = 177 * this.heightRatio;
			this.addChild(this.timeCountDown);

			// 计分器初始化
			this.scoreTip = new game.ScoreTip(this.widthRatio, this.heightRatio);
			this.scoreTip.x = 494 * this.widthRatio;
			this.scoreTip.y = 45 * this.heightRatio;
			this.addChild(this.scoreTip);

			// 开始游戏
			this.startGame();
		}
		// 开始游戏
		private startGame(): void {
			this.timer = setInterval(this.countDown(), 1000);
			this.timer2 = setInterval(this.loop(), 200);
			this.addEventListener(game.GameEvent.DROP_END, this.delRedPack, this);
			this.addEventListener(egret.Event.ENTER_FRAME, this.checkHit, this);
		}
		// 倒计时方法
		private countDown(): void {
			return function () {
				this.gameTimeLength--;
				this.timeCountDown.setTime(this.gameTimeLength);
				if (!this.gameTimeLength) {
					clearInterval(this.timer2);
					clearInterval(this.timer);
				}
			}.bind(this);
		}
		// 生成红包循环
		private loop(): void {
			return function () {
				let redpack = new game.AwardGoods(86, 86, this.widthRatio, this.heightRatio);
				this.redPackList.push(redpack);
				this.addChild(redpack);
			}.bind(this);
		}
		// 监听物品掉落到最下面的回调
		private delRedPack(evt: game.GameEvent) {
			if (evt.type === game.GameEvent.DROP_END && evt.emitObj) {
				if (this.redPackList.indexOf(evt.emitObj) > -1) {
					this.redPackList.splice(this.redPackList.indexOf(evt.emitObj), 1);
				}
				this.removeChild(evt.emitObj);
			}
		}
		// 每帧事件，检测是否碰撞
		private checkHit(evt: egret.Event) {
			// console.log(`福袋位置${this.bag.x} ${this.bag.y}`);
			for (let i = 0; i < this.redPackList.length; i++) {
				// console.log(`红包${i}位置 ${this.redPackList[i].x} ${this.redPackList[i].y}`);
				if (this.redPackList[i].hitTestPoint(this.bag.x - this.bag.width / 4, this.bag.y - this.bag.height / 2) || this.redPackList[i].hitTestPoint(this.bag.x + this.bag.width / 4, this.bag.y - this.bag.height / 2)) {
					this.removeChild(this.redPackList[i]);
					console.log('+1分');
					this.scoreTip.increase();
					this.redPackList.splice(i, 1);
				}
			}
		}
	}
}