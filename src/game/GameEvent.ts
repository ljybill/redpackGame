module game {
	export class GameEvent extends egret.Event {
		public static START_GAME: string = 'start_game';   // 游戏开始事件
		public static END_GAME: string = 'end_game';       // 游戏结束事件 
		public static DROP_END: string = 'drop_end';       // 物品掉落到最底事件
		public emitObj: any;
		public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
			super(type, bubbles, cancelable);
		}
	}
}