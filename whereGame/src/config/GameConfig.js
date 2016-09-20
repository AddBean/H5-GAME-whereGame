/**
 * Created by Administrator on 2014/9/22.
 */

var GC = GC || {};

GC.winSize = cc.size(320, 480);
GC.H = GC.winSize.height;
GC.W = GC.winSize.width;
GC.SCORE=0;
GC.TIME=20;//时间限制；

GC.SHIT_SPEED = 0.1;//陨石速度；
GC.CREAT_TIME = 1;//创造陨石时间间隔，计时方式也是分数；
GC.SHIT_COUNT=50;//射出子弹数量；
GC.SHIT_0=0;
GC.SHIT_1=1;

GC.SOUND=1;//声效；