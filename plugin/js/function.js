
var LEIHAUOLI_PLUGIN = LEIHAUOLI_PLUGIN || {};

LEIHAUOLI_PLUGIN.ACCORDION = function($wrapper,timer){
    this.$wrapper = $wrapper;
    this.hideValue = 0;
    this.changeTime = timer;
    this.init();
};

LEIHAUOLI_PLUGIN.ACCORDION.prototype = {

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

LEIHAUOLI_PLUGIN.ACCORDION_MORE_DISPLAY = function($wrapper,$trigger,animationSpeed,firstDisplay,nextDisplay){
    this.$wrapper = $wrapper;
    this.$triggerBox = $trigger;
    this.firstDisplay = firstDisplay;
    this.nextDisplay = nextDisplay;
    this.animationSpeed = animationSpeed;
    this.init();
};

LEIHAUOLI_PLUGIN.ACCORDION_MORE_DISPLAY.prototype = {
    
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

};

LEIHAUOLI_PLUGIN.DIALOG = function($open,$close,$dialog){
    this.$openTrigger = $open;
    this.$closeTrigger = $close;
    this.$target = $dialog;
    this.init();
};

LEIHAUOLI_PLUGIN.DIALOG.prototype = {
    init : function(){
        this.setParameters();
        this.bindEvent();
    },

    setParameters : function(){
        this.$background = $('.background');
    },

    bindEvent : function(){
        this.$openTrigger.on('click',$.proxy(this.modalDisplay,this));
        this.$closeTrigger.on('click',$.proxy(this.modalHide,this));
    },

    modalDisplay : function(){
        this.$target.css({'display':'block'});
        this.$background.addClass('background').css({'display':'block'});
    },

    modalHide : function(){
        this.$target.css({'display':'none'});
        this.$background.css({'display':'none'}).removeClass('background');
    }
};

$(window).on('load',function(){
    new LEIHAUOLI_PLUGIN.ACCORDION($('.accordion'),600);
    new LEIHAUOLI_PLUGIN.ACCORDION($('.accordion2'),600);
    new LEIHAUOLI_PLUGIN.ACCORDION_MORE_DISPLAY($('.accordion-wrapper'),$('.trigger'),600,3,2);
    new LEIHAUOLI_PLUGIN.DIALOG($('#open'),$('#close'),$('#dialog'));
});