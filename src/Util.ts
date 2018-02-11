class Util {
    public static stageW: number = 0;
    public static stageH: number = 0;
    public static widthRatio: number = 1;
    public static heightRatio: number = 1;

    public static createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    public static getRandom(a, b) {
        if (a === b) {
            return a;
        }
        let max = Math.max(a, b);
        let min = Math.min(a, b);
        let sum = max - min + 1;

        return Math.floor(Math.random() * sum + min);
    }
}