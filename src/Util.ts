class Util {
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