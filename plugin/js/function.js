
var LEIHAUOLI_PLUGIN = LEIHAUOLI_PLUGIN || {};

LEIHAUOLI_PLUGIN_ACCORDION = {

    init : function(){
        this.setParamerters();
        this.bindEvent();
        this.opt();
    },

    opt : function(){
        this.changeTime = 800;
    },

    setParamerters : function(){
        this.$trigger = $('.accordion').children('dt');
        this.$contents = $('.accordion').children('dd');
        this.contentsHeight = this.$contents.outerHeight(),
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

        this.$contents.filter(':visible').animate({
            'height':'0',
            'paddingTop':'0',
            'paddingBottom':'0'
        },this.changeTime,function(){

        $(this).css('display','none');

        });

        if($target.next().is(':hidden') == true){
            
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
        }

    }

}

$(window).on('load',function(){
    LEIHAUOLI_PLUGIN_ACCORDION.init();
});