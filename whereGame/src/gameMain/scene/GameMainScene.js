/**
 * Created by Administrator on 2014/9/30.
 */
/*此为游戏主场景的逻辑控制及层显示初始化*/
var GamePanelLayer = null;
var GMSLayer = cc.Layer.extend({
        _right_icon: null,
        _lift_icon: null,
        _wajueji: null,
        _right_shit: null,
        _lift_shit: null,
        _score_msg: null,
        _touch_flag: 0,
        _right_btn: null,
        _lift_btn: null,
        _shit_count: 0,
        _time_msg: GC.TIME,
        ctor: function () {
            this._super();
            this.init();
        },
        /* 初始化添加游戏对象、事件监听*/
        init: function () {
            cc.spriteFrameCache.addSpriteFrames(res.wajueji_plist);
            GamePanelLayer = this;
            this.initConst();
            this.addMusicControl();
            this.addBg();
            this.addRightPanel();
            this.addLiftPanel();
            this.schedule(this.timeCount, GC.CREAT_TIME);//启动计时；
            this.addMsg();
            this.creatIcon();
            var w = new Wajueji();
            this._wajueji = w;
            this.addChild(w, 4);
            this._wajueji.play_flip();
            initMusic();
            playMusic(true);
        },
        initConst: function () {
            GC.SCORE = 0;

            GC.SHIT_SPEED = 0.1;//翔速度；
            GC.CREAT_TIME = 1;//计时间隔；
            GC.SHIT_COUNT = 50;//射出子弹数量；
            GC.SHIT_0 = 0;
            GC.SHIT_1 = 1;
            GC.TIME = 20;//20秒时间限制；

            GC.SOUND = 1;//声效；
        },
        addMusicControl: function () {
            this.menuItemToggle = new cc.MenuItemToggle(new cc.MenuItemImage(res.music_sel), new cc.MenuItemImage(res.music), this.toggleMusicCallback, this);
            this.menuItemToggle.setPosition(cc.pAdd(cc.visibleRect.top, cc.p(100,-30)));
            var togglemenu = new cc.Menu(this.menuItemToggle);
            togglemenu.anchorX = 0;
            togglemenu.anchorY = 0;
            togglemenu.x = 0;
            togglemenu.y = 0;
            this.addChild(togglemenu, 1);
        },
        toggleMusicCallback: function (sender) {
            if (sender.getSelectedIndex() == 0) {
                GC.SOUND=1;
                playMusic(true);
            } else {
                GC.SOUND=0;
                playMusic(false);
            }
        },
        timeCount: function () {
            GC.TIME--;
            this._time_msg.setString(" " + GC.TIME);
            if (GC.TIME <= 0) {
                this.gameOver();
                this.unschedule(this.timeCount);
            }
        },
        //画上分数；
        addMsg: function () {
            //分数显示
            var msg_x = GC.W / 6;
            var msg_y = GC.H * 8 / 9 + 20;
            var score_ico = new cc.Sprite(res.score_ico);
            score_ico.x = msg_x - 20;
            score_ico.y = msg_y + 3;
            this.addChild(score_ico);


            //分数
            var Score = new cc.LabelTTF(" " + GC.SCORE, "Arail", 20);
            Score.x = msg_x;
            Score.y = msg_y;

            this._score_msg = Score;

            this.addChild(Score);

            //时间显示

            var time_ico = new cc.Sprite(res.time_ico);
            time_ico.x = msg_x + 30;
            time_ico.y = msg_y + 3;
            this.addChild(time_ico);


            //时间
            var Time = new cc.LabelTTF(" " + GC.TIME, "Arail", 20);
            Time.x = msg_x + 50;
            Time.y = msg_y;

            this._time_msg = Time;

            this.addChild(Time);
        },
        addBg: function () {
            var bg = new GMSBGLayer();
            var bg2 = new cc.Sprite(res.bg2);
            this.addChild(bg2, 3);
            bg2.x = GC.W / 2;
            bg2.y = GC.H / 2 + 1;
            this.addChild(bg, 0);
        },
        addRightPanel: function () {
            var RightNormal = new cc.Sprite(res.right_btn);
            var RightSelected = new cc.Sprite(res.right_btn_false);
            var RightDisabled = new cc.Sprite(res.right_btn_false);

            var Right = new cc.MenuItemSprite(
                RightNormal, RightSelected, RightDisabled,
                function () {
                    cc.log("右");
                    this.clickDo(0);
                }, this);
            this._right_btn = Right;
            var menu = new cc.Menu(Right);
            menu.alignItemsVerticallyWithPadding(20);
            this.addChild(menu, 4);
            menu.x = GC.W - 80;
            menu.y = 40;
        },
        addLiftPanel: function () {
            var liftNormal = new cc.Sprite(res.lift_btn);
            var liftSelected = new cc.Sprite(res.lift_btn_false);
            var liftDisabled = new cc.Sprite(res.lift_btn_false);

            var lift = new cc.MenuItemSprite(
                liftNormal, liftSelected, liftDisabled,
                function () {
                    cc.log("左");
                    this.clickDo(1);
                }, this);
            this._lift_btn = lift;
            var menu = new cc.Menu(lift);
            menu.alignItemsVerticallyWithPadding(20);
            this.addChild(menu, 4);
            menu.x = 80;
            menu.y = 40;
        },
        clickDo: function (dir) {

            this._right_btn.enabled = false;
            this._lift_btn.enabled = false;

            switch (dir) {
                case 1:
                    if (GC.SOUND) {
                        cc.audioEngine.playEffect(res.car_engine_wma);
                    }
                    this._wajueji.play_flip();
                    cc.log("右挖到蓝翔");
                    if (this._right_shit == 0 && this._touch_flag == 1) {
                        GC.SCORE++;
                        this._score_msg.setString(" " + GC.SCORE);
                        this._right_icon.getScore();
                        this._touch_flag = 0;
                        this._shit_count--;
                        this.creatIcon();
                    } else if (this._touch_flag == 1) {
                        cc.log("右挖错了,gameOver");
                        this.gameOver();
                    }
                    break;
                case 0:
                    if (GC.SOUND) {
                        cc.audioEngine.playEffect(res.car_engine_wma);
                    }
                    this._wajueji.play();
                    if (this._lift_shit == 0 && this._touch_flag == 1) {
                        cc.log("左挖到蓝翔");
                        GC.SCORE++;
                        this._score_msg.setString(" " + GC.SCORE);
                        this._lift_icon.getScore();
                        this._touch_flag = 0;
                        this._shit_count--;
                        this.creatIcon();
                    } else if (this._touch_flag == 1) {
                        cc.log("左挖错了,gameOver");
                        this.gameOver();
                    }
                    break;
            }
        },
        creatIcon: function () {
            this._touch_flag = 1;
            this._right_btn.enabled = true;
            this._lift_btn.enabled = true;
            if (this._right_icon != null) {
                this._right_icon.destroySelf();
                this._lift_icon.destroySelf();
                this._right_shit = null;
                this._lift_shit = null;
            }
            var icon1 = Math.floor(Math.random() * 10);
            var icon2 = Math.floor(Math.random() * 10);
            var pick_one1 = icon1 % 2;//产生2个随机数；
            var pick_one2 = icon2 % 2;//产生2个随机数；
            if (pick_one1 == 0) {
                pick_one2 = 1;
            } else {
                pick_one2 = 0;
            }
            //cc.log("random:" + pick_one1 + pick_one2);
            var shit1 = new Shit(this, GC.SHIT_0, pick_one1);
            var shit2 = new Shit(this, GC.SHIT_1, pick_one2);

            this._right_shit = pick_one1;
            this._lift_shit = pick_one2;

            this._right_icon = shit1;
            this._lift_icon = shit2;

            this.addChild(shit1, 1);
            this.addChild(shit2, 1);
            this._shit_count++;
            if (this._shit_count > 3) {
                this.gameOver();
            }

        },
        gameOver: function () {
            var scene = new cc.Scene();
            var msg = null;
            if (GC.SCORE < 10) {
                msg = "还是去学烹饪吧！";
            } else if (GC.SCORE < 20) {
                msg = "其实呢，你还是适合搞烹饪……";
            } else if (GC.SCORE < 30) {
                msg = "呃，分有点低，还是去清华北大吧！";
            } else if (GC.SCORE < 40) {
                msg = "你获得了挖翔能手称号。";
            } else if (GC.SCORE < 50) {
                msg = "你可以用挖掘机炒菜了！";
            } else if (GC.SCORE < 60) {
                msg = "你已经有实力和老丈人干架了！";
            } else if (GC.SCORE >= 70) {
                msg = "你已经天下无敌了！";
            }
            scene.addChild(new GMOLayer(GC.SCORE, msg));
            cc.director.runScene(new cc.TransitionFade(1.2, scene));
        }
    })
    ;
var getById = function (id) {
    return document.getElementById(id);
};
var initMusic = function () {
    var audio = getById("myAudio");
    audio.src = "res/Music/bg.mp3";
};
var playMusic = function (status) {
    var audio = getById("myAudio");
    if (status) {
        if (audio.paused) {
            audio.play();
            musicPlayStatus = true;
        }
    } else {
        if (!audio.paused) {
            audio.pause();
            musicPlayStatus = false;
        }
    }
    ;
}

