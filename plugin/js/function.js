
var LEIHAUOLI_PLUGIN = LEIHAUOLI_PLUGIN || {};

LEIHAUOLI_PLUGIN_ACCORDION = function($wrapper,timer){
    this.$menu = $wrapper;
    this.changeTime = timer;
    this.init();
};

LEIHAUOLI_PLUGIN_ACCORDION.prototype = {

    init : function(){
        this.setParamerters();
        this.bindEvent();
    },

    setParamerters : function(){
        this.$trigger = this.$menu.children('dt');  //メニュー
        this.$contents = this.$menu.children('dd'); //コンテンツ
        this.contentsHeight = this.$contents.outerHeight();
        this.contentsPaddingTop = this.$contents.css('paddingTop');
        this.contentsPaddingBottom = this.$contents.css('paddingBottom');
    },

    bindEvent : function(){
        var myself = this;

        this.$trigger.on('click',function(){
            var $target = $(this);
            myself.changeContents($target);
        });
    },

    changeContents : function($target){
        var flg = $target.next().is(':hidden');

        this.$contents.filter(':visible').animate({
            'height':'0',
            'paddingTop':'0',
            'paddingBottom':'0'
        },this.changeTime,function(){
            $(this).css('display','none');
        });

        if(flg == true){
            
            $target.next().css({
                'display':'block',
                'height':'0',
                'paddingTop':'0',
                'paddingBottom':'0'
            });

            $target.next().animate({
                'height':this.contentsHeight,
                'paddingTop':this.contentsPaddingTop,
                'paddingBottom':this.contentsPaddingBottom
            },this.changeTime);

        };
    }

}

$(window).on('load resize',function(){
    new LEIHAUOLI_PLUGIN_ACCORDION($('.accordion'),600);
});