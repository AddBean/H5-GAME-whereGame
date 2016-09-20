/**
 * Created by jd on 2014/10/24.
 */
var Wajueji = cc.Sprite.extend({
    _context: null,
    _active: true,
    _toC:40,
    ctor: function () {
        this._super("#w1.png");
        this._active = 1;
        this.x = GC.W / 2+this._toC;
        this.y = GC.H / 2;
    },
    play: function () {
        this.stopAllActions();
        this.x = GC.W / 2+this._toC;
        var animFrames = [];
        var str = "";
        for (var i = 1; i < 17; i++) {
            str = "w" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        for (var i = 17; i > 0; i--) {
            str = "w" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = new cc.Animation(animFrames, 0.01);
        this.animation = cc.animate(animation);
        var flip = cc.flipX(false);
        var seq = cc.sequence(flip);
        this.runAction(seq);
        this.runAction(this.animation);
    },
    play_flip: function () {
        this.stopAllActions();
        this.x = GC.W / 2-this._toC;
        var animFrames = [];
        var str = "";
        for (var i = 1; i < 17; i++) {
            str = "w" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        for (var i = 17; i > 0; i--) {
            str = "w" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = new cc.Animation(animFrames, 0.01);
        this.animation = cc.animate(animation);
        var flip = cc.flipX(true);
        var seq = cc.sequence(flip);
       this.runAction(seq);
        this.runAction(this.animation);

    },
    destroy: function () {
        this.unschedule(this.shoot);
        this._active = 0;
        this.visible = false;
        this.active = false;
        this.stopAllActions();
    },
    disVisible: function () {
        this.visible = false;
    }
});