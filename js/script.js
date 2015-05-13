/**
 * @name Site
 * @description Define global variables and functions
 * @version 1.0
 */
var Site = (function($, window, undefined) {
  var privateVar = 1;

  function privateMethod1() {
    // todo
  }

  return {
    publicVar: 1,
    publicObj: {
      var1: 1,
      var2: 2
    },
    publicMethod1: privateMethod1
  };

})(jQuery, window);

jQuery(function() {
  Site.publicMethod1();
});

// Scripts for about-page
(function($, window){
  var contentContainer = $('#content-container.about'),
      content = contentContainer.find('.content'),
      headerMobileH = 80,
      sliderMobileH = 200,
      footerMobileH = 110;
  var setScrollContent = function(){
    var winH = $(window).height(),
        winW = $(window).width(),
        contentH = 0,
        contentContainerH = '100%';
    if (winW <= 480) {
      contentContainerH = winH - headerMobileH - sliderMobileH - footerMobileH;
      contentH = contentContainerH - 16;
    } else {
      contentH = winH - 250;
    }
    contentContainer.css({
      'height': contentContainerH
    });
    content.css({
      'height': contentH
    });
  };

  $(window).on('resize', function(){
    setScrollContent();
  });
  setScrollContent();
})(jQuery, window);
// Scripts for about-page
(function($, window){
  var contentContainer = $('#content-container.accom'),
      content = contentContainer.find('.content'),
      headerMobileH = 80,
      sliderMobileH = 200,
      footerMobileH = 110;
  var setScrollContent = function(){
    var winH = $(window).height(),
        winW = $(window).width(),
        contentH = 0,
        contentContainerH = '100%';
    
    $('.photo-list').mCustomScrollbar({
      theme:"minimal"
    });

    var hideRoomDetail = function(){
      $('.room-detail')
        .stop()
        .removeClass('show')
        .delay(300)
        .queue(function(){
          $(this).css({
            'visibility': 'hidden'
          });
        });
    };

    var showRoomDetail = function(id){      
      console.log($('.room-detail.r-' + id).length);
      $('.room-detail.r-' + id)
        .stop()
        .css({
          'visibility': 'visible'
        }).addClass('show');
    };

    $('.room-list .photo-list .photo-wrap').on('click',function(){
      console.log($(this).data('id'));
      showRoomDetail($(this).data('id'));
    });
    $('.room-detail .close-btn').on('click', function(){
      hideRoomDetail();
    });
  };

  $(window).on('resize', function(){
    setScrollContent();
  });
  setScrollContent();
})(jQuery, window);
/**
 *  @name homeSlider
 *  @description Homepage main slider
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'home-slider';

  var readyForBlurEffect = function() {
    var overlay = $('<div class="overlay"></div>'),
        self = this,
        slideInd = 0;

    this.element.find('.slide').css({
      'z-index': '1'
    }).each(function(){
      var _this = $(this),
          imgUrl = _this.data('url');
      _this.css({
        'background-image': 'url(' + imgUrl + ')',
        'background-position': 'center center',
        'background-size': 'cover',
        'background-repeat': 'no-repeat'
      });
      _this.addClass('sl-' + slideInd);
      self.blahs.slideCls.push('sl-' + slideInd);
      slideInd++;
    });

    this.blahs.maxSlide = this.element.find('.slide').length;

    overlay.css({
      'width': '100%',
      'height': '100%',
      'position': 'absolute',
      'z-index': 3,
      'top': '0px',
      'left': '0px',
      'background': '#ffffff',
      'opacity': '0',
    });

    this.element.append(overlay);
  };

  var readyForFadeEffect = function(){
    var self = this,
        slideInd = 0;

    this.element.find('.slide').css({
      'z-index': '1'
    }).each(function(){
      var _this = $(this),
          imgUrl = _this.data('url');
      _this.css({
        'background-image': 'url(' + imgUrl + ')',
        'background-position': 'center center',
        'background-size': 'cover',
        'background-repeat': 'no-repeat'
      });
      _this.addClass('sl-' + slideInd);
      self.blahs.slideCls.push('sl-' + slideInd);
      slideInd++;
    });

    this.blahs.maxSlide = this.element.find('.slide').length;

  };

  var initEffectRequiredElement = function() {
    var elem = this.element,
        blahs = this.blahs;
    switch (this.options.effect.type) {
      case 'blur':  readyForBlurEffect.call(this);break;
      case 'fade':  readyForFadeEffect.call(this);break;
      default:
    }
    elem.find('.slide').hide();
    elem.find('.slide:first').show();
    blahs.curSlideCls = blahs.slideCls[blahs.curSlide];
  };

  // go-to-slide functions for each effect
  var blurToSlide = function(ind) {
    var elem = this.element,
        blahs = this.blahs,
        duration = this.options.effect.duration,
        overlay = elem.find('.overlay'),
        targetSlide = null, curSlideElem = null;

    curSlideElem = elem.find('.slide.' + blahs.curSlideCls);
    blahs.curSlide = ind;
    blahs.curSlideCls = blahs.slideCls[blahs.curSlide];
    targetSlide = elem.find('.slide.' + blahs.curSlideCls);

    overlay
      .animate({
        'opacity': 0.9
      }, duration, function() {
        curSlideElem.fadeOut('fast');
        targetSlide.fadeIn('fast');
      })
      .animate({
        'opacity': 0
      }, duration);

  };

  var fadeToSlide = function(ind) {
    var elem = this.element,
        blahs = this.blahs,
        duration = this.options.effect.duration,
        overlay = elem.find('.overlay'),
        targetSlide = null, curSlideElem = null;

    console.log('fading');
    curSlideElem = elem.find('.slide.' + blahs.curSlideCls);
    blahs.curSlide = ind;
    blahs.curSlideCls = blahs.slideCls[blahs.curSlide];
    targetSlide = elem.find('.slide.' + blahs.curSlideCls);

    curSlideElem.fadeOut(duration);
    targetSlide.fadeIn(duration);

  };

  var gotoSlide = function(ind) {
    switch (this.options.effect.type) {
      case 'blur':
        blurToSlide.call(this, ind);
        break;
      case 'fade':
        fadeToSlide.call(this, ind);
        break;
      default:
    }
  };

  var nextSlide = function() {
    var curSlide = this.blahs.curSlide,
        maxSlide = this.blahs.maxSlide;
    if (curSlide < maxSlide - 1) {
      gotoSlide.call(this, curSlide + 1);
    } else {
      this.blahs.directForward = false;
    }
  };

  var prevSlide = function() {
    var curSlide = this.blahs.curSlide;
    if (curSlide > 0) {
      gotoSlide.call(this, curSlide - 1);
    } else {
      this.blahs.directForward = true;
    }
  };

  var autoPlayProcess = function() {
    var forward = this.blahs.directForward;
    if (forward) {
      nextSlide.call(this);
    } else {
      prevSlide.call(this);
    }
  };

  var clearAutoplay = function() {
    clearInterval(this.blahs.autoPlayTimer);
    this.blahs.autoPlayTimer = null;
  };

  var startAutoplay = function() {
    var self = this;
    this.blahs.autoPlayTimer = setInterval(function(){
      autoPlayProcess.call(self);
    }, this.options.autoPlayPeriod);
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      this.blahs = {
        maxSlide: 0,
        curSlide: 0,
        curSlideCls: '',
        slideCls: [],
        directForward: true,
        autoPlayTimer: null
      };
      // initialize
      initEffectRequiredElement.call(this);
      if (this.options.autoPlay) {
        startAutoplay.call(this);
      }
      // add events
    },
    destroy: function() {
      // deinitialize
      // remove events
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {
    key: 'value',
    effect: {
      type: 'fade',
      duration: 700
    },
    autoPlay: true,
    autoPlayPeriod: 2500,
    onCallback: null
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({
      key: 'custom'
    });
  });

}(jQuery, window));

/**
 *  @name plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  var desktopSizes = {
        bannerHeight: 220,
        footerHeight: 62,
        booknowButtonHeight: 58
      };
  var mobileSizes = {
        bannerHeight: 80,
        footerHeight: 58,
        booknowButtonHeight: 52
      };

  var resizeNav = function() {
    var win = $(window),
        mainNav = $('nav.main-nav'),
        minusHeightTotal = 0,
        mainSlider = $('#home-slider');
    if (win.width() > 480) {
      minusHeightTotal = desktopSizes.bannerHeight + desktopSizes.footerHeight + desktopSizes.booknowButtonHeight;
      mainNav.css({display: 'block'});
      mainNav.css({
        height: win.height() - minusHeightTotal
      });
    } else {
      mainNav.css({display: 'none'});  
      minusHeightTotal = mobileSizes.bannerHeight + mobileSizes.footerHeight + mobileSizes.booknowButtonHeight;
      // nav with content
      mainNav.css({
        height: mainSlider.height() + 'px'
      });      
    }
  };

  $(window).load(function(){
    $("nav.main-nav").mCustomScrollbar();
  });
  $(window).resize(function(){
    resizeNav();
    setTimeout(resizeNav, 500);
  });

  $(document).ready(function(){
    resizeNav();
  });

  // mobile swithc menu
  $('.menu-switch').on('click', function(){
    if ($(this).attr('class') === 'open menu-switch inline-svg') {
      $(this).attr('class', 'menu-switch inline-svg');
    } else {
      $(this).attr('class', 'open menu-switch inline-svg');      
    }
    $('nav.main-nav').stop().slideToggle('normal', function(){
      $(this).mCustomScrollbar();
    });
  });
}(jQuery, window));

/**
 *  @name plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'plugin';
  var privateVar = null;
  var privateMethod = function() {
    // to do
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      this.vars = {
        key: 'value'
      };
      // initialize
      // add events
    },
    publicMethod: function(params) {
      // to do
      $.isFunction(this.options.onCallback) && this.options.onCallback();
      this.element.trigger('customEvent');
    },
    destroy: function() {
      // deinitialize
      // remove events
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {
    key: 'value',
    onCallback: null
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({
      key: 'custom'
    });
    $('[data-' + pluginName + ']').on('customEvent', function(){
      // to do
    });
  });

}(jQuery, window));
