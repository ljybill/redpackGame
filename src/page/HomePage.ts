module page {
    export class HomePage extends egret.Sprite {
        private stageW: number = 0;
        private stageH: number = 0;
        private widthRatio: number = 1;
        private heightRatio: number = 1;

        public constructor(width: number, height: number, widthRatio: number, heightRatio: number) {
            super();
            this.stageW = width;
            this.stageH = height;
            this.widthRatio = widthRatio;
            this.heightRatio = heightRatio;

            this.createView();
        }

        private createView(): void {
            let homePage = Util.createBitmapByName('bg_homepage_jpg');
            homePage.width = this.stageW;
            homePage.height = this.stageH;
            this.addChild(homePage);

            // 底部开始游戏button
            let startGame = Util.createBitmapByName('btn_start_png');
            startGame.width = 296 * this.widthRatio;
            startGame.height = 82 * this.heightRatio;
            startGame.x = 173 * this.widthRatio;
            startGame.y = 946 * this.heightRatio;
            startGame.touchEnabled = true;
            startGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handlerStartGame, this);
            this.addChild(startGame);

            // homepage title
            let welcome = Util.createBitmapByName('red_continue_png');
            welcome.width = 404 * this.widthRatio;
            welcome.height = 248 * this.heightRatio;
            welcome.x = 117 * this.widthRatio;
            welcome.y = - 248 * this.heightRatio;
            welcome.alpha = 0;
            this.addChild(welcome);
            egret.Tween.get(welcome).to({
                y: 189 * this.heightRatio,
                alpha: 1
            }, 1000);
        }

        private handlerStartGame(evt: egret.TouchEvent) {
            let gameEvent = egret.Event.create(game.GameEvent, game.GameEvent.START_GAME, false, false);
            this.dispatchEvent(gameEvent);
            egret.Event.release(gameEvent);
        }
    }
}