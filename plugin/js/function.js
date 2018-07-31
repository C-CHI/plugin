
var LEIHAUOLI_PLUGIN = LEIHAUOLI_PLUGIN || {};

LEIHAUOLI_PLUGIN_ACCORDION = function($wrapper,timer){
    this.$wrapper = $wrapper;
    this.hideValue = 0;
    this.changeTime = timer;
    this.init();
};

LEIHAUOLI_PLUGIN_ACCORDION.prototype = {

    init : function(){
        this.setParamerters();
        this.bindEvent();
    },

    setParamerters : function(){
        this.$trigger = this.$wrapper.children('dt');  //メニュー
        this.$contents = this.$wrapper.children('dd'); //コンテンツ
        this.contentsHeight = this.$contents.outerHeight(); //コンテンツ高さ
        this.contentsPaddingTop = this.$contents.css('paddingTop'); //コンテンツ上余白
        this.contentsPaddingBottom = this.$contents.css('paddingBottom'); //コンテンツ下余白
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
            'height':this.hideValue,
            'paddingTop':this.hideValue,
            'paddingBottom':this.hideValue
        },this.changeTime,function(){
            $(this).css('display','none');
        });

        if(flg == true){
            
            $target.next().css({
                'display':'block',
                'height':this.hideValue,
                'paddingTop':this.hideValue,
                'paddingBottom':this.hideValue
            });

            $target.next().animate({
                'height':this.contentsHeight,
                'paddingTop':this.contentsPaddingTop,
                'paddingBottom':this.contentsPaddingBottom
            },this.changeTime);

        };
    }

}

LEIHAUOLI_PLUGIN_ACCORDION_MORE_DISPLAY = function($wrapper,$trigger,animationSpeed,firstDisplay,nextDisplay){
    this.$wrapper = $wrapper;
    this.$triggerBox = $trigger;
    this.firstDisplay = firstDisplay;
    this.nextDisplay = nextDisplay;
    this.animationSpeed = animationSpeed;
    this.init();
};

LEIHAUOLI_PLUGIN_ACCORDION_MORE_DISPLAY.prototype = {
    
    init : function(){
        this.setParamerters();
        this.bindEvent();
        this.defaultContents();
    },

    setParamerters : function(){
        this.$window = $(window);
        this.$list = this.$wrapper.children('li');
        this.$trigger = this.$triggerBox.children('a');
    },

    bindEvent : function(){
        var myself = this;

        this.$trigger.on('click',function(e){
            e.preventDefault();
            myself.changeContents();
        });

        this.$window.on('resize',function(){
            myself.contentsResize();
        });
    },

    defaultContents : function(){
        this.contentsHeight = 0;
        this.index = 0;

        for(var i = 0; i <= this.firstDisplay-1; i++){
            this.contentsHeight += this.$list.eq(i).outerHeight();
            this.index++;
        };

        this.$wrapper.height(this.contentsHeight);
    },

    changeContents : function(){
        if(this.index >= 10) return;

        for(var i = 0; i <= this.nextDisplay-1; i++){
            this.contentsHeight += this.$list.eq(this.index).outerHeight();
            this.index++;
        }
        
        this.$wrapper.animate({'height':this.contentsHeight},this.animationSpeed);
    },

    contentsResize : function(){
        this.defaultContents();
    }

}

$(window).on('load',function(){
    new LEIHAUOLI_PLUGIN_ACCORDION($('.accordion'),600);
    new LEIHAUOLI_PLUGIN_ACCORDION($('.accordion2'),600);
    new LEIHAUOLI_PLUGIN_ACCORDION_MORE_DISPLAY($('.accordion-wrapper'),$('.trigger'),600,3,2);
});