module page {
	export class GamePage extends egret.Sprite {
		public static STATUS_RUNNING = 'running';
		public static STATUS_END = 'end';

		private timer: number;
		private timer2: number;
		private gameTimeLength: number = 20;
		private redPackList: game.RedPack[];
		private bag: game.Bag;
		private scoreText: egret.TextField;
		private timeCountDown: game.TimeCountDown;
		private scoreTip: game.ScoreTip;
		private status: string;

		public constructor(width: number, height: number, widthRatio: number, heightRatio: number) {
			super();
			this.redPackList = [];

			this.createView();
		}
		// 视图初始化
		private createView(): void {
			// 背景图初始化
			let backgroundImage = Util.createBitmapByName('bg_game_jpg');
			backgroundImage.width = Util.stageW;
			backgroundImage.height = Util.stageH;
			this.addChild(backgroundImage);

			// 福袋初始化
			this.bag = new game.Bag();
			this.bag.width = this.bag.width * Util.widthRatio / 2;
			this.bag.height = this.bag.height * Util.heightRatio / 2;
			this.bag.anchorOffsetX = this.bag.width / 2;
			this.bag.anchorOffsetY = this.bag.height / 2;
			this.bag.x = Util.stageW / 2;
			this.bag.y = (Util.stageH - 10) * Util.heightRatio - this.bag.height;
			this.addChild(this.bag);

			// 倒计时初始化
			this.timeCountDown = new game.TimeCountDown(this.gameTimeLength);
			this.timeCountDown.setRect(105 * Util.widthRatio, 113 * Util.heightRatio, 68 * Util.heightRatio);
			this.timeCountDown.x = 28 * Util.widthRatio;
			this.timeCountDown.y = 177 * Util.heightRatio;
			this.addChild(this.timeCountDown);

			// 计分器初始化
			this.scoreTip = new game.ScoreTip();
			this.scoreTip.x = 494 * Util.widthRatio;
			this.scoreTip.y = 45 * Util.heightRatio;
			this.addChild(this.scoreTip);

			// 开始游戏
			this.startGame();
		}
		// 开始游戏
		private startGame(): void {
			this.status = page.GamePage.STATUS_RUNNING;
			this.timer = setInterval(this.countDown(), 1000);
			this.timer2 = setInterval(this.loop(), 500);
			this.addEventListener(game.GameEvent.DROP_END, this.delRedPack, this);
			this.addEventListener(egret.Event.ENTER_FRAME, this.checkHit, this);
		}
		// 倒计时方法
		private countDown(): void {
			return function () {
				this.gameTimeLength--;
				this.timeCountDown.setTime(this.gameTimeLength);
				if (!this.gameTimeLength) {
					this.endGame();
				}
			}.bind(this);
		}
		// 生成红包循环
		private loop(): void {
			return function () {
				let redpack = new game.RedPack(86, 86);
				this.redPackList.push(redpack);
				this.addChild(redpack);
				if (Util.getRandom(1, 10) % 9 === 0) {
					let redpack = new game.RedPack(86, 86);
					this.redPackList.push(redpack);
					this.addChild(redpack);
				}
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
			if (this.status === page.GamePage.STATUS_END) {
				return;
			}
			for (let i = 0; i < this.redPackList.length; i++) {
				// console.log(`红包${i}位置 ${this.redPackList[i].x} ${this.redPackList[i].y}`);
				if (this.redPackList[i].hitTestPoint(this.bag.x - this.bag.width / 4, this.bag.y - this.bag.height / 2)
					|| this.redPackList[i].hitTestPoint(this.bag.x + this.bag.width / 4, this.bag.y - this.bag.height / 2)) {
					this.removeChild(this.redPackList[i]);
					if (this.redPackList[i].type === game.RedPack.TYPE_REDPACK) {
						console.log('+1分');
						this.scoreTip.increase();
					} else if (this.redPackList[i].type === game.RedPack.TYPE_BOOM) {
						console.log('游戏结束');
						this.endGame();
					}
					this.redPackList.splice(i, 1);
				}
			}
		}
		// 结束游戏
		private endGame() {
			this.status = page.GamePage.STATUS_END;
			let gameEvent = egret.Event.create(game.GameEvent, game.GameEvent.END_GAME, false, false);
			this.dispatchEvent(gameEvent);
			egret.Event.release(gameEvent);

			clearInterval(this.timer2);
			clearInterval(this.timer);
		}
	}
}