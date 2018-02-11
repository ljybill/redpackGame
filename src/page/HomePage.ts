module page {
    export class HomePage extends egret.Sprite {

        public constructor(width: number, height: number, widthRatio: number, heightRatio: number) {
            super();

            this.createView();
        }

        private createView(): void {
            let homePage = Util.createBitmapByName('bg_homepage_jpg');
            homePage.width = Util.stageW;
            homePage.height = Util.stageH;
            this.addChild(homePage);

            // 底部开始游戏button
            let startGame = Util.createBitmapByName('btn_start_png');
            startGame.width = 296 * Util.widthRatio;
            startGame.height = 82 * Util.heightRatio;
            startGame.x = 173 * Util.widthRatio;
            startGame.y = 946 * Util.heightRatio;
            startGame.touchEnabled = true;
            startGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handlerStartGame, this);
            this.addChild(startGame);

            // homepage title
            let welcome = Util.createBitmapByName('red_continue_png');
            welcome.width = 404 * Util.widthRatio;
            welcome.height = 248 * Util.heightRatio;
            welcome.x = 117 * Util.widthRatio;
            welcome.y = - 248 * Util.heightRatio;
            welcome.alpha = 0;
            this.addChild(welcome);
            egret.Tween.get(welcome).to({
                y: 189 * Util.heightRatio,
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