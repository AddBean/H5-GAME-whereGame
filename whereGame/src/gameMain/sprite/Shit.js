/**
 * Created by jd on 2014/10/20.
 */
var Shit = cc.Sprite.extend({
    _context:null,
    _dir:0,//0左1右
    _random_pick:0,//随机挑选；
    _alive_flag:true,

    ctor: function (context, dir,random_pick) {
        switch(random_pick){
            case 0:
                this._super(res.shit_1);
                break;
            case 1:
                this._super(res.shit_2);
                break;
            default:
                this._super(res.logo);
                break;
        }

        this._context=context;
        this._alive_flag=true;
        this._dir=dir;
        this._random_pick=random_pick;

        if(this._dir==0){
            this.x = 70;
            this.y = GC.H/2-80;
            this.moveTo(70,GC.H/2-25);
        }else{
            this.x = 230;
            this.y = GC.H/2-80;
            this.moveTo(230,GC.H/2-25);
        }
    },
    destroySelf:function(){
        this.destroy();
    },
    getScore:function(){
        this.actionMove = cc.moveTo(1, cc.p(GC.W * 3 / 5 + 20, GC.H * 8 / 9 + 20));
        this.runAction(cc.sequence(this.actionMove));
        this.schedule(this.destroy,1);//启动计时；
        this.destroy();
    },
    /* 自毁*/
    destroy: function () {
        //Explosion.getOrCreateExplosion(this.x, this.y);//动画
        this._alive_flag = 0;
        this.visible = false;
        this.active = false;
        this.stopAllActions();
        this.unschedule(this);
        this._alive_flag=false;
    },
    /* 翔移动*/
    moveTo: function (x,y) {

        var action1 = cc.fadeIn(1.0);
       // var action2 = cc.fadeOut(1.0);
        this.endX = x;
        this.endY = y;
       // this.actionMoveDone = new cc.CallFunc(this.spriteMoveFinished, this);
        this.actionMove = cc.moveTo(GC.SHIT_SPEED, cc.p(this.endX, this.endY));
        //this.runAction(action1);
        this.runAction(cc.sequence(this.actionMove));
    }
});
