class Sound extends egret.Bitmap {
    private ratationTween: egret.Tween;
    private sound: egret.Sound;
    private bgmChannel: egret.SoundChannel;
    private isPlaying: boolean = false;
    private soundPostion: number = 0;
    constructor() {
        super(RES.getRes('icon_music_png'));
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
        this.sound = RES.getRes('base_bgm_mp3');
        this.bgmChannel = this.sound.play(0, 0);
        
        this.bgmChannel.stop();

        this.isPlaying = true;
        this.startAnimation();
    }
    private touchHandler(evt: egret.TouchEvent): void {
        if (this.isPlaying) {
            // 暂停
            this.soundPostion = this.bgmChannel.position;
            this.bgmChannel.stop();
            this.isPlaying = false;
            this.texture = RES.getRes('icon_music_off_png');
            this.ratationTween.setPaused(true);
        } else {
            // 恢复
            this.bgmChannel = this.sound.play(this.soundPostion, 0);
            this.isPlaying = true;
            this.texture = RES.getRes('icon_music_png');
            this.ratationTween.setPaused(false);
        }
    }
    public setWidth(width: number) {
        width = parseInt(width + '', 10);
        this.width = width;
        this.anchorOffsetX = width / 2;
    }
    public setHeight(height: number) {
        height = parseInt(height + '', 10);
        this.height = height;
        this.anchorOffsetY = height / 2;
    }
    public setX(x: number) {
        this.x = x;
    }
    public setY(y: number) {
        this.y = y;
    }
    private startAnimation() {
        if (!this.ratationTween) {
            this.ratationTween = egret.Tween.get(this,
                {
                    loop: true
                })
        }
        this.ratationTween.to({ rotation: 360 }, 1800);
    }
}