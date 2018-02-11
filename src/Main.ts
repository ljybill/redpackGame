class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;
    private homePage: page.HomePage;
    private gamePage: page.GamePage;
    private stageW: number = 0;
    private stageH: number = 0;
    private widthRatio: number = 1;
    private heightRatio: number = 1;
    private soundBtn: Sound = null;
    private alert: game.Alert;

    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    // 当主程加载到stage
    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {
                // console.log('hello,world')
            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        // 初始化舞台数据
        this.stageH = this.stage.stageHeight;
        this.stageW = this.stage.stageWidth;
        this.widthRatio = this.stageW / 640;
        this.heightRatio = this.stageH / 1136;
        Util.widthRatio = this.widthRatio;
        Util.heightRatio = this.heightRatio;
        Util.stageH = this.stageH;
        Util.stageW = this.stageW;
        this.initGameScene();
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */


    private initGameScene(): void {
        this.soundBtn = new Sound();
        this.soundBtn.setWidth(48 * this.widthRatio);
        this.soundBtn.setHeight(48 * this.heightRatio);
        this.soundBtn.setX((556 + 24) * this.heightRatio);
        this.soundBtn.setY((160 + 24) * this.widthRatio);

        this.homePage = new page.HomePage(this.stageW, this.stageH, this.widthRatio, this.heightRatio);
        this.homePage.addEventListener(game.GameEvent.START_GAME, this.control, this);
        this.stage.addChild(this.homePage);
        this.stage.addChild(this.soundBtn);

        this.stage.setChildIndex(this.soundBtn, 100);
    }

    private control(evt: game.GameEvent) {
        if (evt.type === game.GameEvent.START_GAME) {
            this.gamePage = new page.GamePage(this.stageW, this.stageH, this.widthRatio, this.heightRatio);
            this.stage.addChild(this.gamePage);
            this.gamePage.addEventListener(game.GameEvent.END_GAME, this.control, this);
            this.stage.removeChild(this.homePage);
            this.stage.setChildIndex(this.soundBtn, 100);
        }
        if (evt.type === game.GameEvent.END_GAME) {
            this.alert = new game.Alert();
            this.stage.addChild(this.alert);
            this.alert.addEventListener(game.GameEvent.ALERT_BTN_CLICK, this.handleAlertSubmit, this);
        }
    }
    private handleAlertSubmit(evt: game.GameEvent) {
        if (evt.type === game.GameEvent.ALERT_BTN_CLICK) {
            switch (evt.willAction) {
                case 'reset': {
                    this.resetGame();
                }
            }
        }
    }

    private resetGame() {
        this.gamePage = null;
        this.homePage = null;
        this.soundBtn = null;
        this.alert = null;
        this.initGameScene();
    }
}