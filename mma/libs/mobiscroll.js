/*!
 * Mobiscroll v2.14.4
 * http://mobiscroll.com
 *
 * Copyright 2010-2014, Acid Media
 * Licensed under the MIT license.
 *
 */
(function ($, undefined) {

    function testProps(props) {
        var i;
        for (i in props) {
            if (mod[props[i]] !== undefined) {
                return true;
            }
        }
        return false;
    }

    function testPrefix() {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
            p;

        for (p in prefixes) {
            if (testProps([prefixes[p] + 'Transform'])) {
                return '-' + prefixes[p].toLowerCase() + '-';
            }
        }
        return '';
    }

    function init(that, options, args) {
        var ret = that;

        // Init
        if (typeof options === 'object') {
            return that.each(function () {
                if (!this.id) {
                    this.id = 'mobiscroll' + (++id);
                }
                if (instances[this.id]) {
                    instances[this.id].destroy();
                }
                new $.mobiscroll.classes[options.component || 'Scroller'](this, options);
            });
        }

        // Method call
        if (typeof options === 'string') {
            that.each(function () {
                var r,
                    inst = instances[this.id];

                if (inst && inst[options]) {
                    r = inst[options].apply(this, Array.prototype.slice.call(args, 1));
                    if (r !== undefined) {
                        ret = r;
                        return false;
                    }
                }
            });
        }

        return ret;
    }

    var id = +new Date(),
        instances = {},
        extend = $.extend,
        mod = document.createElement('modernizr').style,
        has3d = testProps(['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective']),
        hasFlex = testProps(['flex', 'msFlex', 'WebkitBoxDirection']),
        prefix = testPrefix(),
        pr = prefix.replace(/^\-/, '').replace(/\-$/, '').replace('moz', 'Moz');

    $.fn.mobiscroll = function (method) {
        extend(this, $.mobiscroll.components);
        return init(this, method, arguments);
    };

    $.mobiscroll = $.mobiscroll || {
        version: '2.14.4',
        util: {
            prefix: prefix,
            jsPrefix: pr,
            has3d: has3d,
            hasFlex: hasFlex,
            testTouch: function (e, elm) {
                if (e.type == 'touchstart') {
                    $(elm).attr('data-touch', '1');
                } else if ($(elm).attr('data-touch')) {
                    $(elm).removeAttr('data-touch');
                    return false;
                }
                return true;
            },
            objectToArray: function (obj) {
                var arr = [],
                    i;

                for (i in obj) {
                    arr.push(obj[i]);
                }

                return arr;
            },
            arrayToObject: function (arr) {
                var obj = {},
                    i;

                if (arr) {
                    for (i = 0; i < arr.length; i++) {
                        obj[arr[i]] = arr[i];
                    }
                }

                return obj;
            },
            isNumeric: function (a) {
                return a - parseFloat(a) >= 0;
            },
            isString: function (s) {
                return typeof s === 'string';
            },
            getCoord: function (e, c) {
                var ev = e.originalEvent || e;
                return ev.changedTouches ? ev.changedTouches[0]['page' + c] : e['page' + c];
            },
            getPosition: function (t, vertical) {
                var style = window.getComputedStyle ? getComputedStyle(t[0]) : t[0].style,
                    matrix,
                    px;

                if (has3d) {
                    $.each(['t', 'webkitT', 'MozT', 'OT', 'msT'], function (i, v) {
                        if (style[v + 'ransform'] !== undefined) {
                            matrix = style[v + 'ransform'];
                            return false;
                        }
                    });
                    matrix = matrix.split(')')[0].split(', ');
                    px = vertical ? (matrix[13] || matrix[5]) : (matrix[12] || matrix[4]);
                } else {
                    px = vertical ? style.top.replace('px', '') : style.left.replace('px', '');
                }

                return px;
            },
            constrain: function (val, min, max) {
                return Math.max(min, Math.min(val, max));
            }
        },
        tapped: false,
        presets: {
            scroller: {},
            numpad: {}
        },
        themes: {
            listview: {},
            menustrip: {}
        },
        i18n: {},
        instances: instances,
        classes: {},
        components: {},
        defaults: {
            theme: 'mobiscroll',
            context: 'body'
        },
        userdef: {},
        setDefaults: function (o) {
            extend(this.userdef, o);
        },
        presetShort: function (name, c, p) {
            this.components[name] = function (s) {
                return init(this, extend(s, { component: c, preset: p === false ? undefined : name }), arguments);
            };
        }
    };

})(jQuery);
(function ($, window, document, undefined) {

    var $activeElm,
        preventShow,
        extend = $.extend,
        ms = $.mobiscroll,
        instances = ms.instances,
        userdef = ms.userdef,
        util = ms.util,
        pr = util.jsPrefix,
        has3d = util.has3d,
        getCoord = util.getCoord,
        constrain = util.constrain,
        isString = util.isString,
        isOldAndroid = /android [1-3]/i.test(navigator.userAgent),
        animEnd = 'webkitAnimationEnd animationend',
        empty = function () { },
        prevdef = function (ev) { ev.preventDefault(); };

    ms.classes.Widget = function (el, settings, inherit) {
        var $ariaDiv,
            $ctx,
            $header,
            $markup,
            $overlay,
            $persp,
            $popup,
            $wnd,
            $wrapper,
            buttons,
            btn,
            doAnim,
            hasButtons,
            isModal,
            lang,
            modalWidth,
            modalHeight,
            posEvents,
            preset,
            preventPos,
            s,
            scrollLock,
            setReadOnly,
            theme,
            wasReadOnly,
            wndWidth,
            wndHeight,

            that = this,
            $elm = $(el),
            elmList = [],
            posDebounce = {};

        function onBtnStart(ev) {
            // Can't call preventDefault here, it kills page scroll
            if (btn) {
                btn.removeClass('dwb-a');
            }
            btn = $(this);
            // Active button
            if (!btn.hasClass('dwb-d') && !btn.hasClass('dwb-nhl')) {
                btn.addClass('dwb-a');
            }
            if (ev.type === 'mousedown') {
                $(document).on('mouseup', onBtnEnd);
            }
        }

        function onBtnEnd(ev) {
            if (btn) {
                btn.removeClass('dwb-a');
                btn = null;
            }
            if (ev.type === 'mouseup') {
                $(document).off('mouseup', onBtnEnd);
            }
        }

        function onWndKeyDown(ev) {
            if (ev.keyCode == 13) {
                that.select();
            } else if (ev.keyCode == 27) {
                that.cancel();
            }
        }

        function onShow(prevFocus) {
            if (!prevFocus) {
                $popup.focus();
            }
            that.ariaMessage(s.ariaMessage);
        }

        function onHide(prevAnim) {
            var activeEl,
                value,
                type,
                focus = s.focusOnClose;

            $markup.remove();

            if ($activeElm && !prevAnim) {
                setTimeout(function () {
                    if (focus === undefined || focus === true) {
                        preventShow = true;
                        activeEl = $activeElm[0];
                        type = activeEl.type;
                        value = activeEl.value;
                        try {
                            activeEl.type = 'button';
                        } catch (ex) { }
                        $activeElm.focus();
                        activeEl.type = type;
                        activeEl.value = value;
                    } else if (focus) {
                        // If a mobiscroll field is focused, allow show
                        if (instances[$(focus).attr('id')]) {
                            ms.tapped = false;
                        }
                        $(focus).focus();
                    }
                }, 200);
            }

            that._isVisible = false;

            event('onHide', []);
        }

        function onPosition(ev) {
            clearTimeout(posDebounce[ev.type]);
            posDebounce[ev.type] = setTimeout(function () {
                var isScroll = ev.type == 'scroll';
                if (isScroll && !scrollLock) {
                    return;
                }
                that.position(!isScroll);
            }, 200);
        }

        function show(beforeShow) {
            if (!ms.tapped) {
                if (beforeShow) {
                    beforeShow();
                }

                // Hide virtual keyboard
                if ($(document.activeElement).is('input,textarea')) {
                    $(document.activeElement).blur();
                }

                $activeElm = $elm;
                that.show();
            }

            setTimeout(function () {
                preventShow = false;
            }, 300); // With jQuery < 1.9 focus is fired twice in IE
        }

        function event(name, args) {
            var ret;
            args.push(that);
            $.each([userdef, theme, preset, settings], function (i, v) {
                if (v && v[name]) { // Call preset event
                    ret = v[name].apply(el, args);
                }
            });
            return ret;
        }

        /**
        * Positions the scroller on the screen.
        */
        that.position = function (check) {
            var w,
                l,
                t,
                anchor,
                aw, // anchor width
                ah, // anchor height
                ap, // anchor position
                at, // anchor top
                al, // anchor left
                arr, // arrow
                arrw, // arrow width
                arrl, // arrow left
                dh,
                scroll,
                sl, // scroll left
                st, // scroll top
                totalw = 0,
                minw = 0,
                css = {},
                nw = Math.min($wnd[0].innerWidth || $wnd.innerWidth(), $persp.width()), //$persp.width(), // To get the width without scrollbar
                nh = $wnd[0].innerHeight || $wnd.innerHeight();

            if ((wndWidth === nw && wndHeight === nh && check) || preventPos) {
                return;
            }

            if (that._isFullScreen || /top|bottom/.test(s.display)) {
                // Set width, if document is larger than viewport, needs to be set before onPosition (for calendar)
                $popup.width(nw);
            }

            if (event('onPosition', [$markup, nw, nh]) === false || !isModal) {
                return;
            }

            sl = $wnd.scrollLeft();
            st = $wnd.scrollTop();
            anchor = s.anchor === undefined ? $elm : $(s.anchor);

            // Set / unset liquid layout based on screen width, but only if not set explicitly by the user
            if (that._isLiquid && s.layout !== 'liquid') {
                if (nw < 400) {
                    $markup.addClass('dw-liq');
                } else {
                    $markup.removeClass('dw-liq');
                }
            }

            if (!that._isFullScreen && /modal|bubble/.test(s.display)) {
                $wrapper.width('');
                $('.mbsc-w-p', $markup).each(function () {
                    w = $(this).outerWidth(true);
                    totalw += w;
                    minw = (w > minw) ? w : minw;
                });
                w = totalw > nw ? minw : totalw;
                $wrapper.width(w).css('white-space', totalw > nw ? '' : 'nowrap');
            }

            modalWidth = that._isFullScreen ? nw : $popup.outerWidth();
            modalHeight = that._isFullScreen ? nh : $popup.outerHeight(true);
            scrollLock = modalHeight <= nh && modalWidth <= nw;

            that.scrollLock = scrollLock;

            if (s.display == 'modal') {
                l = Math.max(0, sl + (nw - modalWidth) / 2);
                t = st + (nh - modalHeight) / 2;
            } else if (s.display == 'bubble') {
                scroll = true;
                arr = $('.dw-arrw-i', $markup);
                ap = anchor.offset();
                at = Math.abs($ctx.offset().top - ap.top);
                al = Math.abs($ctx.offset().left - ap.left);

                // horizontal positioning
                aw = anchor.outerWidth();
                ah = anchor.outerHeight();
                l = constrain(al - ($popup.outerWidth(true) - aw) / 2, sl + 3, sl + nw - modalWidth - 3);

                // vertical positioning
                t = at - modalHeight; // above the input
                if ((t < st) || (at > st + nh)) { // if doesn't fit above or the input is out of the screen
                    $popup.removeClass('dw-bubble-top').addClass('dw-bubble-bottom');
                    t = at + ah; // below the input
                } else {
                    $popup.removeClass('dw-bubble-bottom').addClass('dw-bubble-top');
                }

                // Calculate Arrow position
                arrw = arr.outerWidth();
                arrl = constrain(al + aw / 2 - (l + (modalWidth - arrw) / 2), 0, arrw);

                // Limit Arrow position
                $('.dw-arr', $markup).css({ left: arrl });
            } else {
                l = sl;
                if (s.display == 'top') {
                    t = st;
                } else if (s.display == 'bottom') {
                    t = st + nh - modalHeight;
                }
            }

            t = t < 0 ? 0 : t;

            css.top = t;
            css.left = l;
            $popup.css(css);

            // If top + modal height > doc height, increase doc height
            $persp.height(0);
            dh = Math.max(t + modalHeight, s.context == 'body' ? $(document).height() : $ctx[0].scrollHeight);
            $persp.css({ height: dh });

            // Scroll needed
            if (scroll && ((t + modalHeight > st + nh) || (at > st + nh))) {
                preventPos = true;
                setTimeout(function () { preventPos = false; }, 300);
                $wnd.scrollTop(Math.min(t + modalHeight - nh, dh - nh));
            }

            wndWidth = nw;
            wndHeight = nh;
        };

        /**
        * Show mobiscroll on focus and click event of the parameter.
        * @param {jQuery} $elm - Events will be attached to this element.
        * @param {Function} [beforeShow=undefined] - Optional function to execute before showing mobiscroll.
        */
        that.attachShow = function ($elm, beforeShow) {
            elmList.push($elm);
            if (s.display !== 'inline') {
                if (setReadOnly) {
                    $elm.on('mousedown.dw', function (ev) {
                        // Prevent input to get focus on tap (virtual keyboard pops up on some devices)
                        ev.preventDefault();
                    });
                }
                if (s.showOnFocus) {
                    $elm.on('focus.dw', function () {
                        if (!preventShow) {
                            show(beforeShow);
                        }
                    });
                }

                if (s.showOnTap) {
                    that.tap($elm, function () {
                        show(beforeShow);
                    },true);/**6-1**/
                }
            }
        };

        /**
        * Set button handler.
        */
        that.select = function () {
            if (!isModal || that.hide(false, 'set') !== false) {
                that._fillValue();
                event('onSelect', [that._value]);
            }
        };

        /**
        * Cancel and hide the scroller instance.
        */
        that.cancel = function () {
            if (!isModal || that.hide(false, 'cancel') !== false) {
                event('onCancel', [that._value]);
            }
        };

        /**
        * Clear button handler.
        */
        that.clear = function () {
            event('onClear', [$markup]);
            if (isModal && !that.live) {
                that.hide(false, 'clear');
            }
            that.setValue(null, true);
        };

        /**
        * Enables the scroller and the associated input.
        */
        that.enable = function () {
            s.disabled = false;
            if (that._isInput) {
                $elm.prop('disabled', false);
            }
        };

        /**
        * Disables the scroller and the associated input.
        */
        that.disable = function () {
            s.disabled = true;
            if (that._isInput) {
                $elm.prop('disabled', true);
            }
        };

        /**
        * Shows the scroller instance.
        * @param {Boolean} prevAnim - Prevent animation if true
        * @param {Boolean} prevFocus - Prevent focusing if true
        */
        that.show = function (prevAnim, prevFocus) {
            // Create wheels
            var html;

            if (s.disabled || that._isVisible) {
                return;
            }

            if (doAnim !== false) {
                if (s.display == 'top') {
                    doAnim = 'slidedown';
                }
                if (s.display == 'bottom') {
                    doAnim = 'slideup';
                }
            }

            // Parse value from input
            that._readValue();

            event('onBeforeShow', []);

            // Create wheels containers
            html = '<div lang="' + s.lang + '" class="mbsc-' + s.theme +  (s.baseTheme ? ' mbsc-' + s.baseTheme : '') + ' dw-' + s.display + ' ' +
                (s.cssClass || '') +
                (that._isLiquid ? ' dw-liq' : '') +
                (isOldAndroid ? ' mbsc-old' : '') +
                (hasButtons ? '' : ' dw-nobtn') + '">' +
                    '<div class="dw-persp">' +
                        (isModal ? '<div class="dwo"></div>' : '') + // Overlay
                        '<div' + (isModal ? ' role="dialog" tabindex="-1"' : '') + ' class="dw' + (s.rtl ? ' dw-rtl' : ' dw-ltr') + '">' + // Popup
                            (s.display === 'bubble' ? '<div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div>' : '') + // Bubble arrow
                            '<div class="dwwr">' + // Popup content
                                '<div aria-live="assertive" class="dw-aria dw-hidden"></div>' +
                                (s.headerText ? '<div class="dwv">' + (isString(s.headerText) ? s.headerText : '') + '</div>' : '') + // Header
                                '<div class="dwcc">'; // Wheel group container

            html += that._generateContent();

            html += '</div>';

            if (hasButtons) {
                html += '<div class="dwbc">';
                $.each(buttons, function (i, b) {
                    b = isString(b) ? that.buttons[b] : b;

                    if (b.handler === 'set') {
                        b.parentClass = 'dwb-s';
                    }

                    if (b.handler === 'cancel') {
                        b.parentClass = 'dwb-c';
                    }

                    b.handler = isString(b.handler) ? that.handlers[b.handler] : b.handler;

                    html += '<div' + (s.btnWidth ? ' style="width:' + (100 / buttons.length) + '%"' : '') + ' class="dwbw ' + (b.parentClass || '') + '"><div tabindex="0" role="button" class="dwb' + i + ' dwb-e ' + (b.cssClass === undefined ? s.btnClass : b.cssClass) + (b.icon ? ' mbsc-ic mbsc-ic-' + b.icon : '') + '">' + (b.text || '') + '</div></div>';
                });
                html += '</div>';
            }
            html += '</div></div></div></div>';

            $markup = $(html);
            $persp = $('.dw-persp', $markup);
            $overlay = $('.dwo', $markup);
            $wrapper = $('.dwwr', $markup);
            $header = $('.dwv', $markup);
            $popup = $('.dw', $markup);
            $ariaDiv = $('.dw-aria', $markup);

            that._markup = $markup;
            that._header = $header;
            that._isVisible = true;

            posEvents = 'orientationchange resize';

            that._markupReady();

            event('onMarkupReady', [$markup]);

            // Show
            if (isModal) {

                // Enter / ESC
                $(window).on('keydown', onWndKeyDown);

                // Prevent scroll if not specified otherwise
                if (s.scrollLock) {
                    $markup.on('touchmove mousewheel DOMMouseScroll', function (ev) {
                        if (scrollLock) {
                            ev.preventDefault();
                        }
                    });
                }

                // Disable inputs to prevent bleed through (Android bug)
                if (pr !== 'Moz') {
                    $('input,select,button', $ctx).each(function () {
                        if (!this.disabled) {
                            $(this).addClass('dwtd').prop('disabled', true);
                        }
                    });
                }

                posEvents += ' scroll';

                ms.activeInstance = that;

                $markup.appendTo($ctx);

                if (has3d && doAnim && !prevAnim) {
                    $markup.addClass('dw-in dw-trans').on(animEnd, function () {
                        $markup.off(animEnd).removeClass('dw-in dw-trans').find('.dw').removeClass('dw-' + doAnim);
                        onShow(prevFocus);
                    }).find('.dw').addClass('dw-' + doAnim);
                }
            } else if ($elm.is('div')) {
                $elm.html($markup);
            } else {
                $markup.insertAfter($elm);
            }

            event('onMarkupInserted', [$markup]);

            // Set position
            that.position();

            $wnd.on(posEvents, onPosition);

            // Events
            $markup
                .on('selectstart mousedown', prevdef) // Prevents blue highlight on Android and text selection in IE
                .on('click', '.dwb-e', prevdef)
                .on('keydown', '.dwb-e', function (ev) {
                    if (ev.keyCode == 32) { // Space
                        ev.preventDefault();
                        ev.stopPropagation();
                        $(this).click();
                    }
                });

            setTimeout(function () {
                // Init buttons
                $.each(buttons, function (i, b) {
                    that.tap($('.dwb' + i, $markup), function (ev) {
                        b = isString(b) ? that.buttons[b] : b;
                        b.handler.call(this, ev, that);
                    }, true);
                });

                if (s.closeOnOverlay) {
                    that.tap($overlay, function () {
                        that.cancel();
                    });
                }

                if (isModal && !doAnim) {
                    onShow(prevFocus);
                }

                $markup
                    .on('touchstart mousedown', '.dwb-e', onBtnStart)
                    .on('touchend', '.dwb-e', onBtnEnd);

                that._attachEvents($markup);

            }, 300);

            event('onShow', [$markup, that._tempValue]);
        };

        /**
        * Hides the scroller instance.
        */
        that.hide = function (prevAnim, btn, force) {

            // If onClose handler returns false, prevent hide
            if (!that._isVisible || (!force && !that._isValid && btn == 'set') || (!force && event('onClose', [that._tempValue, btn]) === false)) {
                return false;
            }

            // Hide wheels and overlay
            if ($markup) {

                // Re-enable temporary disabled fields
                if (pr !== 'Moz') {
                    $('.dwtd', $ctx).each(function () {
                        $(this).prop('disabled', false).removeClass('dwtd');
                    });
                }

                if (has3d && isModal && doAnim && !prevAnim && !$markup.hasClass('dw-trans')) { // If dw-trans class was not removed, means that there was no animation
                    $markup.addClass('dw-out dw-trans').find('.dw').addClass('dw-' + doAnim).on(animEnd, function () {
                        onHide(prevAnim);
                    });
                } else {
                    onHide(prevAnim);
                }

                // Stop positioning on window resize
                $wnd.off(posEvents, onPosition);
            }

            if (isModal) {
                $(window).off('keydown', onWndKeyDown);
                delete ms.activeInstance;
            }
        };

        that.ariaMessage = function (txt) {
            $ariaDiv.html('');
            setTimeout(function () {
                $ariaDiv.html(txt);
            }, 100);
        };

        /**
        * Return true if the scroller is currently visible.
        */
        that.isVisible = function () {
            return that._isVisible;
        };

        // Protected functions to override

        that.setValue = empty;

        that._generateContent = empty;

        that._attachEvents = empty;

        that._readValue = empty;

        that._fillValue = empty;

        that._markupReady = empty;

        that._processSettings = empty;

        // Generic widget functions

        /**
        * Attach tap event to the given element.
        */
        that.tap = function (el, handler, prevent) {
            var startX,
                startY,
                moved;

            if (s.tap) {
                el.on('touchstart.dw', function (ev) {
                    // Can't always call preventDefault here, it kills page scroll
                    if (prevent) {
                        ev.preventDefault();
                    }
                    startX = getCoord(ev, 'X');
                    startY = getCoord(ev, 'Y');
                    moved = false;
                }).on('touchmove.dw', function (ev) {
                    // If movement is more than 20px, don't fire the click event handler
                    if (Math.abs(getCoord(ev, 'X') - startX) > 20 || Math.abs(getCoord(ev, 'Y') - startY) > 20) {
                        moved = true;
                    }
                }).on('touchend.dw', function (ev) {
                    var that = this;

                    if (!moved) {
                        // preventDefault and setTimeout are needed by iOS

                        ev.preventDefault();
                        //setTimeout(function () {
                        handler.call(that, ev);
                        //}, isOldAndroid ? 400 : 10);
                    }
                    // Prevent click events to happen
                    ms.tapped = true;
                    setTimeout(function () {
                        ms.tapped = false;
                    }, 500);
                });
            };

            el.on('click.dw', function (ev) {
                if (!ms.tapped) {
                    // If handler was not called on touchend, call it on click;
                    handler.call(this, ev);
                }
                ev.preventDefault();
                return false;
            });

        };

        /**
        * Sets one ore more options.
        */
        that.option = function (opt, value) {
            var obj = {};
            if (typeof opt === 'object') {
                obj = opt;
            } else {
                obj[opt] = value;
            }
            that.init(obj);
        };

        /**
        * Destroys the mobiscroll instance.
        */
        that.destroy = function () {
            // Force hide without animation
            that.hide(true, false, true);

            // Remove all events from elements
            $.each(elmList, function (i, v) {
                v.off('.dw');
            });

            // Reset original readonly state
            if (that._isInput && setReadOnly) {
                el.readOnly = wasReadOnly;
            }

            event('onDestroy', []);

            // Delete scroller instance
            delete instances[el.id];

            that = null;
        };

        /**
        * Returns the mobiscroll instance.
        */
        that.getInst = function () {
            return that;
        };

        /**
        * Triggers a mobiscroll event.
        */
        that.trigger = event;

        /**
        * Scroller initialization.
        */
        that.init = function (ss) {
            that.settings = s = {};

            // Update original user settings
            extend(settings, ss);
            extend(s, ms.defaults, that._defaults, userdef, settings);

            // Get theme defaults
            theme = ms.themes[s.theme] || ms.themes.mobiscroll;

            // Get language defaults
            lang = ms.i18n[s.lang];

            event('onThemeLoad', [lang, settings]);

            extend(s, theme, lang, userdef, settings);

            preset = ms.presets[that._class][s.preset];

            // Add default buttons
            s.buttons = s.buttons || (s.display !== 'inline' ? ['set', 'cancel'] : []);

            // Hide header text in inline mode by default
            s.headerText = s.headerText === undefined ? (s.display !== 'inline' ? '{value}' : false) : s.headerText;

            if (preset) {
                preset = preset.call(el, that);
                extend(s, preset, settings); // Load preset settings
            }

            if (!ms.themes[s.theme]) {
                s.theme = 'mobiscroll';
            }

            that._isLiquid = (s.layout || (/top|bottom/.test(s.display) ? 'liquid' : '')) === 'liquid';

            that._processSettings();

            // Unbind all events (if re-init)
            $elm.off('.dw');

            doAnim = isOldAndroid ? false : s.animate;
            buttons = s.buttons;
            isModal = s.display !== 'inline';
            setReadOnly = s.showOnFocus || s.showOnTap;
            $wnd = $(s.context == 'body' ? window : s.context);
            $ctx = $(s.context);

            that.context = $wnd;

            that.live = true;

            // If no set button is found, live mode is activated
            $.each(buttons, function (i, b) {
                if (b === 'set' || b.handler === 'set') {
                    that.live = false;
                    return false;
                }
            });

            that.buttons.set = { text: s.setText, handler: 'set' };
            that.buttons.cancel = { text: (that.live) ? s.closeText : s.cancelText, handler: 'cancel' };
            that.buttons.clear = { text: s.clearText, handler: 'clear' };

            that._isInput = $elm.is('input');

            hasButtons = buttons.length > 0;

            if (that._isVisible) {
                that.hide(true, false, true);
            }

            if (isModal) {
                that._readValue();
                if (that._isInput && setReadOnly) {
                    // Set element readonly, save original state
                    if (wasReadOnly === undefined) {
                        wasReadOnly = el.readOnly;
                    }
                    el.readOnly = true;
                }
                that.attachShow($elm);
            } else {
                that.show();
            }

            //if (that._isInput) {
            $elm.on('change.dw', function () {
                if (!that._preventChange) {
                    that.setVal($elm.val(), true, false);
                }
                that._preventChange = false;
            });
            //}

            event('onInit', []);
        };

        that.buttons = {};
        that.handlers = {
            set: that.select,
            cancel: that.cancel,
            clear: that.clear
        };

        that._value = null;

        that._isValid = true;
        that._isVisible = false;

        // Constructor
        if (!inherit) {
            instances[el.id] = that;
            that.init(settings);
        }
    };

    ms.classes.Widget.prototype._defaults = {
        // Localization
        lang: 'zh',
        setText: 'Set',
        selectedText: 'Selected',
        closeText: 'Close',
        cancelText: 'Cancel',
        clearText: 'Clear',
        // Options
        disabled: false,
        closeOnOverlay: true,
        showOnFocus: true,
        showOnTap: true,
        display: 'modal',
        scrollLock: true,
        tap: true,
        btnClass: 'dwb',
        btnWidth: true,
        focusOnClose: false // Temporary for iOS8
    };

    ms.themes.mobiscroll = {
        rows: 5,
        showLabel: false,
        headerText: false,
        btnWidth: false,
        selectedLineHeight: true,
        selectedLineBorder: 1,
        dateOrder: 'MMddyy',
        weekDays: 'min',
        checkIcon: 'ion-ios7-checkmark-empty',
        btnPlusClass: 'mbsc-ic mbsc-ic-arrow-down5',
        btnMinusClass: 'mbsc-ic mbsc-ic-arrow-up5',
        btnCalPrevClass: 'mbsc-ic mbsc-ic-arrow-left5',
        btnCalNextClass: 'mbsc-ic mbsc-ic-arrow-right5'
    };

    // Prevent re-show on window focus
    $(window).on('focus', function () {
        if ($activeElm) {
            preventShow = true;
        }
    });

    // Prevent standard behaviour on body click
    $(document).on('mouseover mouseup mousedown click', function (ev) {
        if (ms.tapped) {
            ev.stopPropagation();
            ev.preventDefault();
            return false;
        }
    });

})(jQuery, window, document);
(function ($, window, document, undefined) {

    var move,
        ms = $.mobiscroll,
        classes = ms.classes,
        instances = ms.instances,
        util = ms.util,
        pr = util.jsPrefix,
        has3d = util.has3d,
        hasFlex = util.hasFlex,
        getCoord = util.getCoord,
        constrain = util.constrain,
        testTouch = util.testTouch;

    classes.Scroller = function (el, settings, inherit) {
        var $markup,
            btn,
            isScrollable,
            itemHeight,
            s,
            trigger,

            click,
            moved,
            start,
            startTime,
            stop,
            p,
            min,
            max,
            target,
            index,
            lines,
            timer,
            that = this,
            $elm = $(el),
            iv = {},
            pos = {},
            pixels = {},
            wheels = [];

        // Event handlers

        function onStart(ev) {
            // Scroll start
            if (testTouch(ev, this) && !move && !click && !btn && !isReadOnly(this)) {
                // Prevent touch highlight
                ev.preventDefault();
                // Better performance if there are tap events on document
                ev.stopPropagation();

                move = true;
                isScrollable = s.mode != 'clickpick';
                target = $('.dw-ul', this);
                setGlobals(target);
                moved = iv[index] !== undefined; // Don't allow tap, if still moving
                p = moved ? getCurrentPosition(target) : pos[index];
                start = getCoord(ev, 'Y');
                startTime = new Date();
                stop = start;
                scroll(target, index, p, 0.001);

                if (isScrollable) {
                    target.closest('.dwwl').addClass('dwa');
                }

                if (ev.type === 'mousedown') {
                    $(document).on('mousemove', onMove).on('mouseup', onEnd);
                }
            }
        }

        function onMove(ev) {
            if (move) {
                if (isScrollable) {
                    // Prevent scroll
                    ev.preventDefault();
                    ev.stopPropagation();
                    stop = getCoord(ev, 'Y');
                    if (Math.abs(stop - start) > 3 || moved) {
                        scroll(target, index, constrain(p + (start - stop) / itemHeight, min - 1, max + 1));
                        moved = true;
                    }
                }
            }
        }

        function onEnd(ev) {
            if (move) {
                var time = new Date() - startTime,
                    val = constrain(p + (start - stop) / itemHeight, min - 1, max + 1),
                    speed,
                    dist,
                    tindex,
                    ttop = target.offset().top;

                // Better performance if there are tap events on document
                ev.stopPropagation();

                if (has3d && time < 300) {
                    speed = (stop - start) / time;
                    dist = (speed * speed) / s.speedUnit;
                    if (stop - start < 0) {
                        dist = -dist;
                    }
                } else {
                    dist = stop - start;
                }

                tindex = Math.round(p - dist / itemHeight);

                if (!moved) { // this is a "tap"
                    var idx = Math.floor((stop - ttop) / itemHeight),
                        li = $($('.dw-li', target)[idx]),
                        valid = li.hasClass('dw-v'),
                        hl = isScrollable;

                    if (trigger('onValueTap', [li]) !== false && valid) {
                        tindex = idx;
                    } else {
                        hl = true;
                    }

                    if (hl && valid) {
                        li.addClass('dw-hl'); // Highlight
                        setTimeout(function () {
                            li.removeClass('dw-hl');
                        }, 100);
                    }
                }

                if (isScrollable) {
                    calc(target, tindex, 0, true, Math.round(val));
                }

                if (ev.type === 'mouseup') {
                    $(document).off('mousemove', onMove).off('mouseup', onEnd);
                }

                move = false;
            }
        }

        function onBtnStart(ev) {
            btn = $(this);
            // +/- buttons
            if (testTouch(ev, this)) {
                step(ev, btn.closest('.dwwl'), btn.hasClass('dwwbp') ? plus : minus);
            }
            if (ev.type === 'mousedown') {
                $(document).on('mouseup', onBtnEnd);
            }
        }

        function onBtnEnd(ev) {
            btn = null;
            if (click) {
                clearInterval(timer);
                click = false;
            }
            if (ev.type === 'mouseup') {
                $(document).off('mouseup', onBtnEnd);
            }
        }

        function onKeyDown(ev) {
            if (ev.keyCode == 38) { // up
                step(ev, $(this), minus);
            } else if (ev.keyCode == 40) { // down
                step(ev, $(this), plus);
            }
        }

        function onKeyUp() {
            if (click) {
                clearInterval(timer);
                click = false;
            }
        }

        function onScroll(ev) {
            if (!isReadOnly(this)) {
                ev.preventDefault();
                ev = ev.originalEvent || ev;
                var delta = ev.wheelDelta ? (ev.wheelDelta / 120) : (ev.detail ? (-ev.detail / 3) : 0),
                    t = $('.dw-ul', this);

                setGlobals(t);
                calc(t, Math.round(pos[index] - delta), delta < 0 ? 1 : 2);
            }
        }

        // Private functions

        function step(ev, w, func) {
            ev.stopPropagation();
            ev.preventDefault();
            if (!click && !isReadOnly(w) && !w.hasClass('dwa')) {
                click = true;
                // + Button
                var t = w.find('.dw-ul');

                setGlobals(t);
                clearInterval(timer);
                timer = setInterval(function () { func(t); }, s.delay);
                func(t);
            }
        }

        function isReadOnly(wh) {
            if ($.isArray(s.readonly)) {
                var i = $('.dwwl', $markup).index(wh);
                return s.readonly[i];
            }
            return s.readonly;
        }

        function generateWheelItems(i) {
            var html = '<div class="dw-bf">',
                w = wheels[i],
                l = 1,
                labels = w.labels || [],
                values = w.values,
                keys = w.keys || values;

            $.each(values, function (j, v) {
                if (l % 20 === 0) {
                    html += '</div><div class="dw-bf">';
                }
                html += '<div role="option" aria-selected="false" class="dw-li dw-v" data-val="' + keys[j] + '"' + (labels[j] ? ' aria-label="' + labels[j] + '"' : '') + ' style="height:' + itemHeight + 'px;line-height:' + itemHeight + 'px;">' +
                    '<div class="dw-i"' + (lines > 1 ? ' style="line-height:' + Math.round(itemHeight / lines) + 'px;font-size:' + Math.round(itemHeight / lines * 0.8) + 'px;"' : '') + '>' + v + '</div></div>';
                l++;
            });

            html += '</div>';
            return html;
        }

        function setGlobals(t) {
            var multiple = t.closest('.dwwl').hasClass('dwwms');
            min = $('.dw-li', t).index($(multiple ? '.dw-li' : '.dw-v', t).eq(0));
            max = Math.max(min, $('.dw-li', t).index($(multiple ? '.dw-li' : '.dw-v', t).eq(-1)) - (multiple ? s.rows - 1 : 0));
            index = $('.dw-ul', $markup).index(t);
        }

        function formatHeader(v) {
            var t = s.headerText;
            return t ? (typeof t === 'function' ? t.call(el, v) : t.replace(/\{value\}/i, v)) : '';
        }

        function getCurrentPosition(t) {
            return Math.round(-util.getPosition(t, true) / itemHeight);
        }

        function ready(t, i) {
            clearTimeout(iv[i]);
            delete iv[i];
            t.closest('.dwwl').removeClass('dwa');
        }

        function scroll(t, index, val, time, active) {
            var px = -val * itemHeight,
                style = t[0].style;

            if (px == pixels[index] && iv[index]) {
                return;
            }

            //if (time && px != pixels[index]) {
                // Trigger animation start event
                //trigger('onAnimStart', [$markup, index, time]);
            //}

            pixels[index] = px;

            if (has3d) {
                style[pr + 'Transition'] = util.prefix + 'transform ' + (time ? time.toFixed(3) : 0) + 's ease-out';
                style[pr + 'Transform'] = 'translate3d(0,' + px + 'px,0)';
            } else {
                style.top = px + 'px';
            }

            if (iv[index]) {
                ready(t, index);
            }

            if (time && active) {
                t.closest('.dwwl').addClass('dwa');
                iv[index] = setTimeout(function () {
                    ready(t, index);
                }, time * 1000);
            }

            pos[index] = val;
        }

        function getValid(val, t, dir, multiple) {
            var cell = $('.dw-li[data-val="' + val + '"]', t),
                cells = $('.dw-li', t),
                v = cells.index(cell),
                l = cells.length;

            if (multiple) {
                setGlobals(t);
            } else if (!cell.hasClass('dw-v')) { // Scroll to a valid cell
                var cell1 = cell,
                    cell2 = cell,
                    dist1 = 0,
                    dist2 = 0;

                while (v - dist1 >= 0 && !cell1.hasClass('dw-v')) {
                    dist1++;
                    cell1 = cells.eq(v - dist1);
                }

                while (v + dist2 < l && !cell2.hasClass('dw-v')) {
                    dist2++;
                    cell2 = cells.eq(v + dist2);
                }

                // If we have direction (+/- or mouse wheel), the distance does not count
                if (((dist2 < dist1 && dist2 && dir !== 2) || !dist1 || (v - dist1 < 0) || dir == 1) && cell2.hasClass('dw-v')) {
                    cell = cell2;
                    v = v + dist2;
                } else {
                    cell = cell1;
                    v = v - dist1;
                }
            }

            return {
                cell: cell,
                v: multiple ? constrain(v, min, max) : v,
                val: cell.hasClass('dw-v') ? cell.attr('data-val') : null
            };
        }

        function scrollToPos(time, index, manual, dir, active) {
            // Call validation event
            if (trigger('validate', [$markup, index, time, dir]) !== false) {
                // Set scrollers to position
                $('.dw-ul', $markup).each(function (i) {
                    var t = $(this),
                        multiple = t.closest('.dwwl').hasClass('dwwms'),
                        sc = i == index || index === undefined,
                        res = getValid(that._tempWheelArray[i], t, dir, multiple),
                        cell = res.cell;

                    if (!(cell.hasClass('dw-sel')) || sc) {
                        // Set valid value
                        that._tempWheelArray[i] = res.val;

                        if (!multiple) {
                            $('.dw-sel', t).removeAttr('aria-selected');
                            cell.attr('aria-selected', 'true');
                        }

                        // Add selected class to cell
                        $('.dw-sel', t).removeClass('dw-sel');
                        cell.addClass('dw-sel');

                        // Scroll to position
                        scroll(t, i, res.v, sc ? time : 0.1, sc ? active : false);
                    }
                });

                trigger('onValidated', []);

                // Reformat value if validation changed something
                that._tempValue = s.formatResult(that._tempWheelArray);

                if (that.live) {
                    that._hasValue = manual || that._hasValue;
                    setValue(manual, manual, 0, true);
                }

                that._header.html(formatHeader(that._tempValue));

                if (manual) {
                    trigger('onChange', [that._tempValue]);
                }
            }

        }

        function calc(t, val, dir, anim, orig) {
            val = constrain(val, min, max);

            var cell = $('.dw-li', t).eq(val),
                o = orig === undefined ? val : orig,
                active = orig !== undefined,
                idx = index,
                dist = Math.abs(val - o),
                time = anim ? (val == o ? 0.1 : dist * s.timeUnit * Math.max(0.5, (100 - dist) / 100)) : 0;

            // Set selected scroller value
            that._tempWheelArray[idx] = cell.attr('data-val');

            scroll(t, idx, val, time, active);

            setTimeout(function () {
                // Validate
                scrollToPos(time, idx, true, dir, active);
            }, 10);
        }

        function plus(t) {
            var val = pos[index] + 1;
            calc(t, val > max ? min : val, 1, true);
        }

        function minus(t) {
            var val = pos[index] - 1;
            calc(t, val < min ? max : val, 2, true);
        }

        function setValue(fill, change, time, noscroll, temp) {
            if (that._isVisible && !noscroll) {
                scrollToPos(time);
            }

            that._tempValue = s.formatResult(that._tempWheelArray);

            if (!temp) {
                that._wheelArray = that._tempWheelArray.slice(0);
                that._value = that._hasValue ? that._tempValue : null;
            }

            if (fill) {

                trigger('onValueFill', [that._hasValue ? that._tempValue : '', change]);

                if (that._isInput) {
                    $elm.val(that._hasValue ? that._tempValue : '');
                }

                if (change) {
                    that._preventChange = true;
                    $elm.change();
                }
            }
        }

        // Call the parent constructor
        classes.Widget.call(this, el, settings, true);

        // Public functions

        /**
        * Gets the selected wheel values, formats it, and set the value of the scroller instance.
        * If input parameter is true, populates the associated input element.
        * @param {Array} values Wheel values.
        * @param {Boolean} [fill=false] Also set the value of the associated input element.
        * @param {Number} [time=0] Animation time
        * @param {Boolean} [temp=false] If true, then only set the temporary value.(only scroll there but not set the value)
        * @param {Boolean} [change=false] Trigger change on the input element
        */
        that.setVal = that._setVal = function (val, fill, change, temp, time) {
            that._hasValue = val !== null && val !== undefined;
            that._tempWheelArray = $.isArray(val) ? val.slice(0) : s.parseValue.call(el, val, that) || [];
            setValue(fill, change === undefined ? fill : change, time, false, temp);
        };

        /**
         * Returns the selected value
         */
        that.getVal = that._getVal = function (temp) {
            var val = that._hasValue ? that[temp ? '_tempValue' : '_value'] : null;
            return util.isNumeric(val) ? +val : val;
        };

        /*
         * Sets the wheel values (passed as an array)
         */
        that.setArrayVal = that.setVal;

        /*
         * Returns the selected wheel values as an array
         */
        that.getArrayVal = function (temp) {
            return temp ? that._tempWheelArray : that._wheelArray;
        };

        // @deprecated since 2.14.0, backward compatibility code
        // ---

        that.setValue = function (val, fill, time, temp, change) {
            that.setVal(val, fill, change, temp, time);
        };

        /**
        * Return the selected wheel values.
        */
        that.getValue = that.getArrayVal;

        // ---

        /**
        * Changes the values of a wheel, and scrolls to the correct position
        * @param {Array} idx Indexes of the wheels to change.
        * @param {Number} [time=0] Animation time when scrolling to the selected value on the new wheel.
        * @param {Boolean} [manual=false] Indicates that the change was triggered by the user or from code.
        */
        that.changeWheel = function (idx, time, manual) {
            if ($markup) {
                var i = 0,
                    nr = idx.length;

                $.each(s.wheels, function (j, wg) {
                    $.each(wg, function (k, w) {
                        if ($.inArray(i, idx) > -1) {
                            wheels[i] = w;
                            $('.dw-ul', $markup).eq(i).html(generateWheelItems(i));
                            nr--;
                            if (!nr) {
                                that.position();
                                scrollToPos(time, undefined, manual);
                                return false;
                            }
                        }
                        i++;
                    });
                    if (!nr) {
                        return false;
                    }
                });
            }
        };

        /**
        * Returns the closest valid cell.
        */
        that.getValidCell = getValid;

        // Protected overrides

        that._generateContent = function () {
            var lbl,
                html = '',
                l = 0;

            $.each(s.wheels, function (i, wg) { // Wheel groups
                html += '<div class="mbsc-w-p dwc' + (s.mode != 'scroller' ? ' dwpm' : ' dwsc') + (s.showLabel ? '' : ' dwhl') + '">' +
                            '<div class="dwwc"' + (s.maxWidth ? '' : ' style="max-width:600px;"') + '>' +
                                (hasFlex ? '' : '<table class="dw-tbl" cellpadding="0" cellspacing="0"><tr>');

                $.each(wg, function (j, w) { // Wheels
                    wheels[l] = w;
                    lbl = w.label !== undefined ? w.label : j;
                    html += '<' + (hasFlex ? 'div' : 'td') + ' class="dwfl"' + ' style="' +
                                    (s.fixedWidth ? ('width:' + (s.fixedWidth[l] || s.fixedWidth) + 'px;') :
                                    (s.minWidth ? ('min-width:' + (s.minWidth[l] || s.minWidth) + 'px;') : 'min-width:' + s.width + 'px;') +
                                    (s.maxWidth ? ('max-width:' + (s.maxWidth[l] || s.maxWidth) + 'px;') : '')) + '">' +
                                '<div class="dwwl dwwl' + l + (w.multiple ? ' dwwms' : '') + '">' +
                                (s.mode != 'scroller' ?
                                    '<div class="dwb-e dwwb dwwbp ' + (s.btnPlusClass || '') + '" style="height:' + itemHeight + 'px;line-height:' + itemHeight + 'px;"><span>+</span></div>' + // + button
                                    '<div class="dwb-e dwwb dwwbm ' + (s.btnMinusClass || '') + '" style="height:' + itemHeight + 'px;line-height:' + itemHeight + 'px;"><span>&ndash;</span></div>' : '') + // - button
                                '<div class="dwl">' + lbl + '</div>' + // Wheel label
                                '<div tabindex="0" aria-live="off" aria-label="' + lbl + '" role="listbox" class="dwww">' +
                                    '<div class="dww" style="height:' + (s.rows * itemHeight) + 'px;">' +
                                        '<div class="dw-ul" style="margin-top:' + (w.multiple ? 0 : s.rows / 2 * itemHeight - itemHeight / 2) + 'px;">';

                    // Create wheel values
                    html += generateWheelItems(l) +
                        '</div></div><div class="dwwo"></div></div><div class="dwwol"' +
                        (s.selectedLineHeight ? ' style="height:' + itemHeight + 'px;margin-top:-' + (itemHeight / 2 + (s.selectedLineBorder || 0)) + 'px;"' : '') + '></div></div>' +
                        (hasFlex ? '</div>' : '</td>');

                    l++;
                });

                html += (hasFlex ? '' : '</tr></table>') + '</div></div>';
            });

            return html;
        };

        that._attachEvents = function ($markup) {
            $markup
                .on('DOMMouseScroll mousewheel', '.dwwl', onScroll)
                .on('keydown', '.dwwl', onKeyDown)
                .on('keyup', '.dwwl', onKeyUp)
                .on('touchstart mousedown', '.dwwl', onStart)
                .on('touchmove', '.dwwl', onMove)
                .on('touchend', '.dwwl', onEnd)
                .on('touchstart mousedown', '.dwwb', onBtnStart)
                .on('touchend', '.dwwb', onBtnEnd);
        };

        that._markupReady = function () {
            $markup = that._markup;
            scrollToPos();
        };

        that._fillValue = function () {
            that._hasValue = true;
            setValue(true, true, 0, true);
        };

        that._readValue = function () {
            var v = $elm.val() || '';
            that._hasValue = v !== '';
            that._tempWheelArray = that._wheelArray ? that._wheelArray.slice(0) : s.parseValue(v, that) || [];
            setValue();
        };

        that._processSettings = function () {
            s = that.settings;
            trigger = that.trigger;
            itemHeight = s.height;
            lines = s.multiline;

            that._isLiquid = (s.layout || (/top|bottom/.test(s.display) && s.wheels.length == 1 ? 'liquid' : '')) === 'liquid';

            //that._wheelArray = null;
            //that._tempWheelArray = null;

            if (lines > 1) {
                s.cssClass = (s.cssClass || '') + ' dw-ml';
            }
        };

        // Properties

        that._selectedValues = {};

        // Constructor
        if (!inherit) {
            instances[el.id] = that;
            that.init(settings);
        }
    };

    // Extend defaults
    classes.Scroller.prototype._class = 'scroller';
    classes.Scroller.prototype._defaults = $.extend({}, classes.Widget.prototype._defaults, {
        // Options
        minWidth: 80,
        height: 40,
        rows: 3,
        multiline: 1,
        delay: 300,
        readonly: false,
        showLabel: true,
        wheels: [],
        mode: 'scroller',
        preset: '',
        speedUnit: 0.0012,
        timeUnit: 0.08,
        formatResult: function (d) {
            return d.join(' ');
        },
        parseValue: function (value, inst) {
            var val = [],
                ret = [],
                i = 0,
                keys;

            if (value !== null && value !== undefined) {
                val = (value + '').split(' ');
            }

            $.each(inst.settings.wheels, function (j, wg) {
                $.each(wg, function (k, w) {
                    keys = w.keys || w.values;
                    if ($.inArray(val[i], keys) !== -1) {
                        ret.push(val[i]);
                    } else {
                        ret.push(keys[0]);
                    }
                    i++;
                });
            });
            return ret;
        }
    });

})(jQuery, window, document);
(function ($, undefined) {
    var ms = $.mobiscroll;

    ms.datetime = {
        defaults: {
            shortYearCutoff: '+10',
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            monthText: 'Month',
            amText: 'am',
            pmText: 'pm',
            getYear: function (d) { return d.getFullYear(); },
            getMonth: function (d) { return d.getMonth(); },
            getDay: function (d) { return d.getDate(); },
            getDate: function (y, m, d, h, i, s) { return new Date(y, m, d, h || 0, i || 0, s || 0); },
            getMaxDayOfMonth: function (y, m) { return 32 - new Date(y, m, 32).getDate(); },
            getWeekNumber: function (d) {
                // Copy date so don't modify original
                d = new Date(d);
                d.setHours(0, 0, 0);
                // Set to nearest Thursday: current date + 4 - current day number
                // Make Sunday's day number 7
                d.setDate(d.getDate() + 4 - (d.getDay() || 7));
                // Get first day of year
                var yearStart = new Date(d.getFullYear(), 0, 1);
                // Calculate full weeks to nearest Thursday
                return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
            }
        },
        /**
        * Format a date into a string value with a specified format.
        * @param {String} format Output format.
        * @param {Date} date Date to format.
        * @param {Object} [settings={}] Settings.
        * @return {String} Returns the formatted date string.
        */
        formatDate: function (format, date, settings) {
            if (!date) {
                return null;
            }
            var s = $.extend({}, ms.datetime.defaults, settings),
                look = function (m) { // Check whether a format character is doubled
                    var n = 0;
                    while (i + 1 < format.length && format.charAt(i + 1) == m) {
                        n++;
                        i++;
                    }
                    return n;
                },
                f1 = function (m, val, len) { // Format a number, with leading zero if necessary
                    var n = '' + val;
                    if (look(m)) {
                        while (n.length < len) {
                            n = '0' + n;
                        }
                    }
                    return n;
                },
                f2 = function (m, val, s, l) { // Format a name, short or long as requested
                    return (look(m) ? l[val] : s[val]);
                },
                i,
                year,
                output = '',
                literal = false;

            for (i = 0; i < format.length; i++) {
                if (literal) {
                    if (format.charAt(i) == "'" && !look("'")) {
                        literal = false;
                    } else {
                        output += format.charAt(i);
                    }
                } else {
                    switch (format.charAt(i)) {
                        case 'd':
                            output += f1('d', s.getDay(date), 2);
                            break;
                        case 'D':
                            output += f2('D', date.getDay(), s.dayNamesShort, s.dayNames);
                            break;
                        case 'o':
                            output += f1('o', (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000, 3);
                            break;
                        case 'm':
                            output += f1('m', s.getMonth(date) + 1, 2);
                            break;
                        case 'M':
                            output += f2('M', s.getMonth(date), s.monthNamesShort, s.monthNames);
                            break;
                        case 'y':
                            year = s.getYear(date);
                            output += (look('y') ? year : (year % 100 < 10 ? '0' : '') + year % 100);
                            //output += (look('y') ? date.getFullYear() : (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
                            break;
                        case 'h':
                            var h = date.getHours();
                            output += f1('h', (h > 12 ? (h - 12) : (h === 0 ? 12 : h)), 2);
                            break;
                        case 'H':
                            output += f1('H', date.getHours(), 2);
                            break;
                        case 'i':
                            output += f1('i', date.getMinutes(), 2);
                            break;
                        case 's':
                            output += f1('s', date.getSeconds(), 2);
                            break;
                        case 'a':
                            output += date.getHours() > 11 ? s.pmText : s.amText;
                            break;
                        case 'A':
                            output += date.getHours() > 11 ? s.pmText.toUpperCase() : s.amText.toUpperCase();
                            break;
                        case "'":
                            if (look("'")) {
                                output += "'";
                            } else {
                                literal = true;
                            }
                            break;
                        default:
                            output += format.charAt(i);
                    }
                }
            }
            return output;
        },
        /**
        * Extract a date from a string value with a specified format.
        * @param {String} format Input format.
        * @param {String} value String to parse.
        * @param {Object} [settings={}] Settings.
        * @return {Date} Returns the extracted date.
        */
        parseDate: function (format, value, settings) {
            var s = $.extend({}, ms.datetime.defaults, settings),
                def = s.defaultValue || new Date();

            if (!format || !value) {
                return def;
            }

            // If already a date object
            if (value.getTime) {
                return value;
            }

            value = (typeof value == 'object' ? value.toString() : value + '');

            var shortYearCutoff = s.shortYearCutoff,
                year = s.getYear(def),
                month = s.getMonth(def) + 1,
                day = s.getDay(def),
                doy = -1,
                hours = def.getHours(),
                minutes = def.getMinutes(),
                seconds = 0, //def.getSeconds(),
                ampm = -1,
                literal = false, // Check whether a format character is doubled
                lookAhead = function (match) {
                    var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                    if (matches) {
                        iFormat++;
                    }
                    return matches;
                },
                getNumber = function (match) { // Extract a number from the string value
                    lookAhead(match);
                    var size = (match == '@' ? 14 : (match == '!' ? 20 : (match == 'y' ? 4 : (match == 'o' ? 3 : 2)))),
                        digits = new RegExp('^\\d{1,' + size + '}'),
                        num = value.substr(iValue).match(digits);

                    if (!num) {
                        return 0;
                    }
                    iValue += num[0].length;
                    return parseInt(num[0], 10);
                },
                getName = function (match, s, l) { // Extract a name from the string value and convert to an index
                    var names = (lookAhead(match) ? l : s),
                        i;

                    for (i = 0; i < names.length; i++) {
                        if (value.substr(iValue, names[i].length).toLowerCase() == names[i].toLowerCase()) {
                            iValue += names[i].length;
                            return i + 1;
                        }
                    }
                    return 0;
                },
                checkLiteral = function () {
                    iValue++;
                },
                iValue = 0,
                iFormat;

            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                        literal = false;
                    } else {
                        checkLiteral();
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                        case 'd':
                            day = getNumber('d');
                            break;
                        case 'D':
                            getName('D', s.dayNamesShort, s.dayNames);
                            break;
                        case 'o':
                            doy = getNumber('o');
                            break;
                        case 'm':
                            month = getNumber('m');
                            break;
                        case 'M':
                            month = getName('M', s.monthNamesShort, s.monthNames);
                            break;
                        case 'y':
                            year = getNumber('y');
                            break;
                        case 'H':
                            hours = getNumber('H');
                            break;
                        case 'h':
                            hours = getNumber('h');
                            break;
                        case 'i':
                            minutes = getNumber('i');
                            break;
                        case 's':
                            seconds = getNumber('s');
                            break;
                        case 'a':
                            ampm = getName('a', [s.amText, s.pmText], [s.amText, s.pmText]) - 1;
                            break;
                        case 'A':
                            ampm = getName('A', [s.amText, s.pmText], [s.amText, s.pmText]) - 1;
                            break;
                        case "'":
                            if (lookAhead("'")) {
                                checkLiteral();
                            } else {
                                literal = true;
                            }
                            break;
                        default:
                            checkLiteral();
                    }
                }
            }
            if (year < 100) {
                year += new Date().getFullYear() - new Date().getFullYear() % 100 +
                    (year <= (typeof shortYearCutoff != 'string' ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10)) ? 0 : -100);
            }
            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    var dim = 32 - new Date(year, month - 1, 32).getDate();
                    if (day <= dim) {
                        break;
                    }
                    month++;
                    day -= dim;
                } while (true);
            }
            hours = (ampm == -1) ? hours : ((ampm && hours < 12) ? (hours + 12) : (!ampm && hours == 12 ? 0 : hours));

            var date = s.getDate(year, month - 1, day, hours, minutes, seconds);

            if (s.getYear(date) != year || s.getMonth(date) + 1 != month || s.getDay(date) != day) {
                return def; // Invalid date
            }

            return date;
        }
    };

    // @deprecated since 2.11.0, backward compatibility code
    // ---
    ms.formatDate = ms.datetime.formatDate;
    ms.parseDate = ms.datetime.parseDate;
    // ---

})(jQuery);(function ($, undefined) {

    var ms = $.mobiscroll,
        datetime = ms.datetime,
        date = new Date(),
        defaults = {
            startYear: date.getFullYear() - 100,
            endYear: date.getFullYear() + 1,
            separator: ' ',
            // Localization
            dateFormat: 'mm/dd/yy',
            dateOrder: 'mmddy',
            timeWheels: 'hhiiA',
            timeFormat: 'hh:ii A',
            dayText: 'Day',
            yearText: 'Year',
            hourText: 'Hours',
            minuteText: 'Minutes',
            ampmText: '&nbsp;',
            secText: 'Seconds',
            nowText: 'Now'
        },
        /**
         * @class Mobiscroll.datetime
         * @extends Mobiscroll
         * Mobiscroll Datetime component
         */
        preset = function (inst) {
            var that = $(this),
                html5def = {},
                format;
            // Force format for html5 date inputs (experimental)
            if (that.is('input')) {
                switch (that.attr('type')) {
                case 'date':
                    format = 'yy-mm-dd';
                    break;
                case 'datetime':
                    format = 'yy-mm-ddTHH:ii:ssZ';
                    break;
                case 'datetime-local':
                    format = 'yy-mm-ddTHH:ii:ss';
                    break;
                case 'month':
                    format = 'yy-mm';
                    html5def.dateOrder = 'mmyy';
                    break;
                case 'time':
                    format = 'HH:ii:ss';
                    break;
                }
                // Check for min/max attributes
                var min = that.attr('min'),
                    max = that.attr('max');
                if (min) {
                    html5def.minDate = datetime.parseDate(format, min);
                }
                if (max) {
                    html5def.maxDate = datetime.parseDate(format, max);
                }
            }

            // Set year-month-day order
            var i,
                k,
                keys,
                values,
                wg,
                start,
                end,
                hasTime,
                mins,
                maxs,
                orig = $.extend({}, inst.settings),
                s = $.extend(inst.settings, ms.datetime.defaults, defaults, html5def, orig),
                offset = 0,
                validValues = [],
                wheels = [],
                ord = [],
                o = {},
                f = { y: getYear, m: getMonth, d: getDay, h: getHour, i: getMinute, s: getSecond, a: getAmPm },
                invalid = s.invalid,
                valid = s.valid,
                p = s.preset,
                dord = s.dateOrder,
                tord = s.timeWheels,
                regen = dord.match(/D/),
                ampm = tord.match(/a/i),
                hampm = tord.match(/h/),
                hformat = p == 'datetime' ? s.dateFormat + s.separator + s.timeFormat : p == 'time' ? s.timeFormat : s.dateFormat,
                defd = new Date(),
                steps = s.steps || {},
                stepH = steps.hour || s.stepHour || 1,
                stepM = steps.minute || s.stepMinute || 1,
                stepS = steps.second || s.stepSecond || 1,
                zeroBased = steps.zeroBased,
                mind = s.minDate || new Date(s.startYear, 0, 1),
                maxd = s.maxDate || new Date(s.endYear, 11, 31, 23, 59, 59),
                minH = zeroBased ? 0 : mind.getHours() % stepH,
                minM = zeroBased ? 0 : mind.getMinutes() % stepM,
                minS = zeroBased ? 0 : mind.getSeconds() % stepS,
                maxH = getMax(stepH, minH, (hampm ? 11 : 23)),
                maxM = getMax(stepM, minM, 59),
                maxS = getMax(stepM, minM, 59);

            format = format || hformat;

            if (p.match(/date/i)) {

                // Determine the order of year, month, day wheels
                $.each(['y', 'm', 'd'], function (j, v) {
                    i = dord.search(new RegExp(v, 'i'));
                    if (i > -1) {
                        ord.push({ o: i, v: v });
                    }
                });
                ord.sort(function (a, b) { return a.o > b.o ? 1 : -1; });
                $.each(ord, function (i, v) {
                    o[v.v] = i;
                });

                wg = [];
                for (k = 0; k < 3; k++) {
                    if (k == o.y) {
                        offset++;
                        values = [];
                        keys = [];
                        start = s.getYear(mind);
                        end = s.getYear(maxd);
                        for (i = start; i <= end; i++) {
                            keys.push(i);
                            values.push((dord.match(/yy/i) ? i : (i + '').substr(2, 2)) + (s.yearSuffix || ''));
                        }
                        addWheel(wg, keys, values, s.yearText);
                    } else if (k == o.m) {
                        offset++;
                        values = [];
                        keys = [];
                        for (i = 0; i < 12; i++) {
                            var str = dord.replace(/[dy]/gi, '').replace(/mm/, (i < 9 ? '0' + (i + 1) : i + 1) + (s.monthSuffix || '')).replace(/m/, i + 1 + (s.monthSuffix || ''));
                            keys.push(i);
                            values.push(str.match(/MM/) ? str.replace(/MM/, '<span class="dw-mon">' + s.monthNames[i] + '</span>') : str.replace(/M/, '<span class="dw-mon">' + s.monthNamesShort[i] + '</span>'));
                        }
                        addWheel(wg, keys, values, s.monthText);
                    } else if (k == o.d) {
                        offset++;
                        values = [];
                        keys = [];
                        for (i = 1; i < 32; i++) {
                            keys.push(i);
                            values.push((dord.match(/dd/i) && i < 10 ? '0' + i : i) + (s.daySuffix || ''));
                        }
                        addWheel(wg, keys, values, s.dayText);
                    }
                }
                wheels.push(wg);
            }

            if (p.match(/time/i)) {
                hasTime = true;

                // Determine the order of hours, minutes, seconds wheels
                ord = [];
                $.each(['h', 'i', 's', 'a'], function (i, v) {
                    i = tord.search(new RegExp(v, 'i'));
                    if (i > -1) {
                        ord.push({ o: i, v: v });
                    }
                });
                ord.sort(function (a, b) {
                    return a.o > b.o ? 1 : -1;
                });
                $.each(ord, function (i, v) {
                    o[v.v] = offset + i;
                });

                wg = [];
                for (k = offset; k < offset + 4; k++) {
                    if (k == o.h) {
                        offset++;
                        values = [];
                        keys = [];
                        for (i = minH; i < (hampm ? 12 : 24); i += stepH) {
                            keys.push(i);
                            values.push(hampm && i === 0 ? 12 : tord.match(/hh/i) && i < 10 ? '0' + i : i);
                        }
                        addWheel(wg, keys, values, s.hourText);
                    } else if (k == o.i) {
                        offset++;
                        values = [];
                        keys = [];
                        for (i = minM; i < 60; i += stepM) {
                            keys.push(i);
                            values.push(tord.match(/ii/) && i < 10 ? '0' + i : i);
                        }
                        addWheel(wg, keys, values, s.minuteText);
                    } else if (k == o.s) {
                        offset++;
                        values = [];
                        keys = [];
                        for (i = minS; i < 60; i += stepS) {
                            keys.push(i);
                            values.push(tord.match(/ss/) && i < 10 ? '0' + i : i);
                        }
                        addWheel(wg, keys, values, s.secText);
                    } else if (k == o.a) {
                        offset++;
                        var upper = tord.match(/A/);
                        addWheel(wg, [0, 1], upper ? [s.amText.toUpperCase(), s.pmText.toUpperCase()] : [s.amText, s.pmText], s.ampmText);
                    }
                }

                wheels.push(wg);
            }

            function get(d, i, def) {
                if (o[i] !== undefined) {
                    return +d[o[i]];
                }
                if (def !== undefined) {
                    return def;
                }
                return f[i](defd);
            }

            function addWheel(wg, k, v, lbl) {
                wg.push({
                    values: v,
                    keys: k,
                    label: lbl
                });
            }

            function step(v, st, min, max) {
                return Math.min(max, Math.floor(v / st) * st + min);
            }

            function getYear(d) {
                return s.getYear(d);
            }

            function getMonth(d) {
                return s.getMonth(d);
            }

            function getDay(d) {
                return s.getDay(d);
            }

            function getHour(d) {
                var hour = d.getHours();
                hour = hampm && hour >= 12 ? hour - 12 : hour;
                return step(hour, stepH, minH, maxH);
            }

            function getMinute(d) {
                return step(d.getMinutes(), stepM, minM, maxM);
            }

            function getSecond(d) {
                return step(d.getSeconds(), stepS, minS, maxS);
            }

            function getAmPm(d) {
                return ampm && d.getHours() > 11 ? 1 : 0;
            }

            function getDate(d) {
                if (d === null) {
                    return d;
                }
                var hour = get(d, 'h', 0);
                return s.getDate(get(d, 'y'), get(d, 'm'), get(d, 'd', 1), get(d, 'a', 0) ? hour + 12 : hour, get(d, 'i', 0), get(d, 's', 0));
            }

            function getMax(step, min, max) {
                return Math.floor((max - min) / step) * step + min;
            }

            function getClosestValidDate(d, dir) {
                var next,
                    prev,
                    nextValid = false,
                    prevValid = false,
                    up = 0,
                    down = 0;

                if (isValid(d)) {
                    return d;
                }

                if (d < mind) {
                    d = mind;
                }

                if (d > maxd) {
                    d = maxd;
                }

                next = d;
                prev = d;

                if (dir !== 2) {
                    nextValid = isValid(next);

                    while (!nextValid && next < maxd) {
                        next = new Date(next.getTime() + 1000 * 60 * 60 * 24);
                        nextValid = isValid(next);
                        up++;
                    }
                }

                if (dir !== 1) {
                    prevValid = isValid(prev);

                    while (!prevValid && prev > mind) {
                        prev = new Date(prev.getTime() - 1000 * 60 * 60 * 24);
                        prevValid = isValid(prev);
                        down++;
                    }
                }

                if (dir === 1 && nextValid) {
                    return next;
                }

                if (dir === 2 && prevValid) {
                    return prev;
                }

                return down < up && prevValid ? prev : next;
            }

            function isValid(d) {
                if (d < mind) {
                    return false;
                }

                if (d > maxd) {
                    return false;
                }

                if (isInObj(d, valid)) {
                    return true;
                }

                if (isInObj(d, invalid)) {
                    return false;
                }

                return true;
            }

            function isInObj(d, obj) {
                var curr,
                    j,
                    v;

                if (obj) {
                    for (j = 0; j < obj.length; j++) {
                        curr = obj[j];
                        v = curr + '';
                        if (!curr.start) {
                            if (curr.getTime) { // Exact date
                                if (d.getFullYear() == curr.getFullYear() && d.getMonth() == curr.getMonth() && d.getDate() == curr.getDate()) {
                                    return true;
                                }
                            } else if (!v.match(/w/i)) { // Day of month
                                v = v.split('/');
                                if (v[1]) {
                                    if ((v[0] - 1) == d.getMonth() && v[1] == d.getDate()) {
                                        return true;
                                    }
                                } else if (v[0] == d.getDate()) {
                                    return true;
                                }
                            } else { // Day of week
                                v = +v.replace('w', '');
                                if (v == d.getDay()) {
                                    return true;
                                }
                            }
                        }
                    }
                }
                return false;
            }

            function validateDates(obj, y, m, first, maxdays, idx, val) {
                var j, d, v;

                if (obj) {
                    for (j = 0; j < obj.length; j++) {
                        d = obj[j];
                        v = d + '';
                        if (!d.start) {
                            if (d.getTime) { // Exact date
                                if (s.getYear(d) == y && s.getMonth(d) == m) {
                                    idx[s.getDay(d) - 1] = val;
                                }
                            } else if (!v.match(/w/i)) { // Day of month
                                v = v.split('/');
                                if (v[1]) {
                                    if (v[0] - 1 == m) {
                                        idx[v[1] - 1] = val;
                                    }
                                } else {
                                    idx[v[0] - 1] = val;
                                }
                            } else { // Day of week
                                v = +v.replace('w', '');
                                for (k = v - first; k < maxdays; k += 7) {
                                    if (k >= 0) {
                                        idx[k] = val;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            function validateTimes(vobj, i, v, temp, y, m, d, target, valid) {
                var dd, ss, str, parts1, parts2, prop1, prop2, v1, v2, j, i1, i2, add, remove, all, hours1, hours2, hours3,
                    spec = {},
                    steps = { h: stepH, i: stepM, s: stepS, a: 1 },
                    day = s.getDate(y, m, d),
                    w = ['a', 'h', 'i', 's'];

                if (vobj) {
                    $.each(vobj, function (i, obj) {
                        if (obj.start) {
                            obj.apply = false;
                            dd = obj.d;
                            ss = dd + '';
                            str = ss.split('/');
                            if (dd && ((dd.getTime && y == s.getYear(dd) && m == s.getMonth(dd) && d == s.getDay(dd)) || // Exact date
                                (!ss.match(/w/i) && ((str[1] && d == str[1] && m == str[0] - 1) || (!str[1] && d == str[0]))) || // Day of month
                                (ss.match(/w/i) && day.getDay() == +ss.replace('w', '')) // Day of week
                                )) {
                                obj.apply = true;
                                spec[day] = true; // Prevent applying generic rule on day, if specific exists
                            }
                        }
                    });

                    $.each(vobj, function (x, obj) {
                        add = 0;
                        remove = 0;
                        i1 = 0;
                        i2 = undefined;
                        prop1 = true;
                        prop2 = true;
                        all = false;

                        if (obj.start && (obj.apply || (!obj.d && !spec[day]))) {

                            // Define time parts
                            parts1 = obj.start.split(':');
                            parts2 = obj.end.split(':');

                            for (j = 0; j < 3; j++) {
                                if (parts1[j] === undefined) {
                                    parts1[j] = 0;
                                }
                                if (parts2[j] === undefined) {
                                    parts2[j] = 59;
                                }
                                parts1[j] = +parts1[j];
                                parts2[j] = +parts2[j];
                            }

                            parts1.unshift(parts1[0] > 11 ? 1 : 0);
                            parts2.unshift(parts2[0] > 11 ? 1 : 0);

                            if (hampm) {
                                if (parts1[1] >= 12) {
                                    parts1[1] = parts1[1] - 12;
                                }

                                if (parts2[1] >= 12) {
                                    parts2[1] = parts2[1] - 12;
                                }
                            }

                            // Look behind
                            for (j = 0; j < i; j++) {
                                if (validValues[j] !== undefined) {
                                    v1 = step(parts1[j], steps[w[j]], mins[w[j]], maxs[w[j]]);
                                    v2 = step(parts2[j], steps[w[j]], mins[w[j]], maxs[w[j]]);
                                    hours1 = 0;
                                    hours2 = 0;
                                    hours3 = 0;
                                    if (hampm && j == 1) {
                                        hours1 = parts1[0] ? 12 : 0;
                                        hours2 = parts2[0] ? 12 : 0;
                                        hours3 = validValues[0] ? 12 : 0;
                                    }
                                    if (!prop1) {
                                        v1 = 0;
                                    }
                                    if (!prop2) {
                                        v2 = maxs[w[j]];
                                    }
                                    if ((prop1 || prop2) && (v1 + hours1 < validValues[j] + hours3 && validValues[j] + hours3 < v2 + hours2)) {
                                        all = true;
                                    }
                                    if (validValues[j] != v1) {
                                        prop1 = false;
                                    }
                                    if (validValues[j] != v2) {
                                        prop2 = false;
                                    }
                                }
                            }

                            // Look ahead
                            if (!valid) {
                                for (j = i + 1; j < 4; j++) {
                                    if (parts1[j] > 0) {
                                        add = steps[v];
                                    }
                                    if (parts2[j] < maxs[w[j]]) {
                                        remove = steps[v];
                                    }
                                }
                            }

                            if (!all) {
                                // Calculate min and max values
                                v1 = step(parts1[i], steps[v], mins[v], maxs[v]) + add;
                                v2 = step(parts2[i], steps[v], mins[v], maxs[v]) - remove;

                                if (prop1) {
                                    i1 = getValidIndex(target, v1, maxs[v], 0);
                                }

                                if (prop2) {
                                    i2 = getValidIndex(target, v2, maxs[v], 1);
                                }
                            }

                            // Disable values
                            if (prop1 || prop2 || all) {
                                if (valid) {
                                    $('.dw-li', target).slice(i1, i2).addClass('dw-v');
                                } else {
                                    $('.dw-li', target).slice(i1, i2).removeClass('dw-v');
                                }
                            }

                        }
                    });
                }
            }

            function getIndex(t, v) {
                return $('.dw-li', t).index($('.dw-li[data-val="' + v + '"]', t));
            }

            function getValidIndex(t, v, max, add) {
                if (v < 0) {
                    return 0;
                }
                if (v > max) {
                    return $('.dw-li', t).length;
                }
                return getIndex(t, v) + add;
            }

            function getArray(d) {
                var i,
                    ret = [];

                if (d === null || d === undefined) {
                    return d;
                }

                for (i in o) {
                    ret[o[i]] = f[i](d);
                }

                return ret;
            }

            function convertRanges(arr) {
                var i, v, start,
                    ret = [];

                if (arr) {
                    for (i = 0; i < arr.length; i++) {
                        v = arr[i];
                        if (v.start && v.start.getTime) {
                            start = new Date(v.start);
                            while (start <= v.end) {
                                ret.push(new Date(start.getFullYear(), start.getMonth(), start.getDate()));
                                start.setDate(start.getDate() + 1);
                            }
                        } else {
                            ret.push(v);
                        }
                    }
                    return ret;
                }
                return arr;
            }

            // Extended methods
            // ---

            inst.getVal = function (temp) {
                return inst._hasValue || temp ? getDate(inst.getArrayVal(temp)) : null;
            };

            /**
             * Sets the selected date
             *
             * @param {Date} d Date to select.
             * @param {Boolean} [fill=false] Also set the value of the associated input element. Default is true.
             * @param {Number} [time=0] Animation time to scroll to the selected date.
             * @param {Boolean} [temp=false] Set temporary value only.
             * @param {Boolean} [change=fill] Trigger change on input element.
             */
            inst.setDate = function (d, fill, time, temp, change) {
                inst.setArrayVal(getArray(d), fill, change, temp, time);
            };

            /**
             * Returns the selected date.
             *
             * @param {Boolean} [temp=false] If true, return the currently shown date on the picker, otherwise the last selected one.
             * @return {Date}
             */
            inst.getDate = inst.getVal;

            // ---


            // Initializations
            // ---

            inst.format = hformat;
            inst.order = o;

            inst.handlers.now = function () { inst.setDate(new Date(), false, 0.3, true, true); };
            inst.buttons.now = { text: s.nowText, handler: 'now' };

            invalid = convertRanges(invalid);
            valid = convertRanges(valid);

            // Normalize min and max dates for comparing later (set default values where there are no values from wheels)
            mind = getDate(getArray(mind));
            maxd = getDate(getArray(maxd));

            mins = { y: mind.getFullYear(), m: 0, d: 1, h: minH, i: minM, s: minS, a: 0 };
            maxs = { y: maxd.getFullYear(), m: 11, d: 31, h: maxH, i: maxM, s: maxS, a: 1 };

            // ---

            return {
                wheels: wheels,
                headerText: s.headerText ? function () {
                    return datetime.formatDate(hformat, getDate(inst.getArrayVal(true)), s);
                } : false,
                formatResult: function (d) {
                    return datetime.formatDate(format, getDate(d), s);
                },
                parseValue: function (val) {
                    return getArray(val ? datetime.parseDate(format, val, s) : (s.defaultValue || new Date()));
                },
                validate: function (dw, i, time, dir) {
                    var validated = getClosestValidDate(getDate(inst.getArrayVal(true)), dir),
                        temp = getArray(validated),
                        y = get(temp, 'y'),
                        m = get(temp, 'm'),
                        minprop = true,
                        maxprop = true;

                    $.each(['y', 'm', 'd', 'a', 'h', 'i', 's'], function (x, i) {
                        if (o[i] !== undefined) {
                            var min = mins[i],
                                max = maxs[i],
                                maxdays = 31,
                                val = get(temp, i),
                                t = $('.dw-ul', dw).eq(o[i]);

                            if (i == 'd') {
                                maxdays = s.getMaxDayOfMonth(y, m);
                                max = maxdays;
                                if (regen) {
                                    $('.dw-li', t).each(function () {
                                        var that = $(this),
                                            d = that.data('val'),
                                            w = s.getDate(y, m, d).getDay(),
                                            str = dord.replace(/[my]/gi, '').replace(/dd/, (d < 10 ? '0' + d : d) + (s.daySuffix || '')).replace(/d/, d + (s.daySuffix || ''));
                                        $('.dw-i', that).html(str.match(/DD/) ? str.replace(/DD/, '<span class="dw-day">' + s.dayNames[w] + '</span>') : str.replace(/D/, '<span class="dw-day">' + s.dayNamesShort[w] + '</span>'));
                                    });
                                }
                            }
                            if (minprop && mind) {
                                min = f[i](mind);
                            }
                            if (maxprop && maxd) {
                                max = f[i](maxd);
                            }
                            if (i != 'y') {
                                var i1 = getIndex(t, min),
                                    i2 = getIndex(t, max);
                                $('.dw-li', t).removeClass('dw-v').slice(i1, i2 + 1).addClass('dw-v');
                                if (i == 'd') { // Hide days not in month
                                    $('.dw-li', t).removeClass('dw-h').slice(maxdays).addClass('dw-h');
                                }
                            }
                            if (val < min) {
                                val = min;
                            }
                            if (val > max) {
                                val = max;
                            }
                            if (minprop) {
                                minprop = val == min;
                            }
                            if (maxprop) {
                                maxprop = val == max;
                            }
                            // Disable some days
                            if (i == 'd') {
                                var first = s.getDate(y, m, 1).getDay(),
                                    idx = {};

                                // Set invalid indexes
                                validateDates(invalid, y, m, first, maxdays, idx, 1);
                                // Delete indexes which are valid
                                validateDates(valid, y, m, first, maxdays, idx, 0);

                                $.each(idx, function (i, v) {
                                    if (v) {
                                        $('.dw-li', t).eq(i).removeClass('dw-v');
                                    }
                                });
                            }
                        }
                    });

                    // Invalid times
                    if (hasTime) {
                        $.each(['a', 'h', 'i', 's'], function (i, v) {
                            var val = get(temp, v),
                                d = get(temp, 'd'),
                                t = $('.dw-ul', dw).eq(o[v]);

                            if (o[v] !== undefined) {
                                validateTimes(invalid, i, v, temp, y, m, d, t, 0);
                                validateTimes(valid, i, v, temp, y, m, d, t, 1);

                                // Get valid value
                                validValues[i] = +inst.getValidCell(val, t, dir).val;
                            }
                        });
                    }

                    inst._tempWheelArray = temp;
                }
            };
        };

    $.each(['date', 'time', 'datetime'], function (i, v) {
        ms.presets.scroller[v] = preset;
    });

})(jQuery);
(function ($) {

    $.each(['date', 'time', 'datetime'], function (i, v) {
        $.mobiscroll.presetShort(v);
    });

})(jQuery);

/***select***/
(function ($, undefined) {

    var ms = $.mobiscroll,
        util = ms.util,
        isString = util.isString,
        defaults = {
            inputClass: '',
            invalid: [],
            rtl: false,
            showInput: true,
            group: false,
            groupLabel: 'Groups',
            checkIcon: 'checkmark',
            dataText: 'text',
            dataValue: 'value',
            dataGroup: 'group',
            dataDisabled: 'disabled'
        };

    ms.presetShort('select');

    ms.presets.scroller.select = function (inst) {
        var change,
            group,
            groupWheelIdx,
            i,
            input,
            optionArray,
            optionWheelIdx,
            option,
            origValues,
            prevGroup,
            timer,
            orig = $.extend({}, inst.settings),
            s = $.extend(inst.settings, defaults, orig),
            layout = s.layout || (/top|bottom/.test(s.display) ? 'liquid' : ''),
            isLiquid = layout == 'liquid',
            elm = $(this),
            multiple = s.multiple || elm.prop('multiple'),
            id = this.id + '_dummy',
            lbl = $('label[for="' + this.id + '"]').attr('for', id),
            label = s.label !== undefined ? s.label : (lbl.length ? lbl.text() : elm.attr('name')),
            selectedClass = 'dw-msel mbsc-ic mbsc-ic-' + s.checkIcon,
            origReadOnly = s.readonly,
            data = s.data,
            hasData = !!data,
            hasGroups = hasData ? data[0][s.dataGroup] : $('optgroup', elm).length,
            defaultValue = hasData ? data[0][s.dataValue] : $('option', elm).attr('value'),
            groupWheel = hasGroups && s.group,
            groupHdr = hasGroups && !groupWheel,
            values = elm.val() || [],
            invalid = [],
            selectedValues = {},
            options = {},
            groups = {};

        function prepareData() {
            var gr,
                lbl,
                opt,
                txt,
                val,
                c = 0,
                groupIndexes = {};

            optionArray = [];

            if (hasData) {
                $.each(data, function (i, v) {
                    txt = v[s.dataText];
                    val = v[s.dataValue];
                    lbl = v[s.dataGroup];
                    opt = {
                        value: val,
                        text: txt
                    };
                    options[val] = opt;
                    optionArray.push(opt);

                    if (hasGroups) {
                        if (groupIndexes[lbl] === undefined) {
                            gr = { label: lbl, options: [] };
                            groups[c] = gr;
                            groupIndexes[lbl] = c;
                            c++;
                        } else {
                            gr = groups[groupIndexes[lbl]];
                        }
                        opt.group = groupIndexes[lbl];
                        gr.options.push(opt);
                    }
                    if (v[s.dataDisabled]) {
                        invalid.push(val);
                    }
                });
            } else {
                if (hasGroups) {
                    $('optgroup', elm).each(function (i) {
                        groups[i] = { label: this.label, options: [] };
                        $('option', this).each(function () {
                            opt = {
                                value: this.value,
                                text: this.text,
                                group: i
                            };
                            options[this.value] = opt;
                            groups[i].options.push(opt);
                            if (this.disabled) {
                                invalid.push(this.value);
                            }
                        });
                    });
                } else {
                    $('option', elm).each(function () {
                        opt = {
                            value: this.value,
                            text: this.text
                        };
                        options[this.value] = opt;
                        optionArray.push(opt);
                        if (this.disabled) {
                            invalid.push(this.value);
                        }
                    });
                }
            }
        }

        function genValues(data, keys, values) {
            $.each(data, function (i, v) {
                values.push(v.text);
                keys.push(v.value);
            });
        }

        function genWheels() {
            var wheel,
                wg = 0,
                values = [],
                keys = [],
                w = [[]];

            // Generate group wheel
            if (groupWheel) {
                $.each(groups, function (i, v) {
                    values.push(v.label);
                    keys.push(i);
                });

                wheel = {
                    values: values,
                    keys: keys,
                    label: s.groupLabel
                };

                if (isLiquid) {
                    w[0][wg] = wheel;
                } else {
                    w[wg] = [wheel];
                }

                wg++;
            }

            values = [];
            keys = [];

            if (groupHdr) { // Generate options wheel with group headers
                $.each(groups, function (i, gr) {
                    values.push(gr.label);
                    keys.push('__group' + i);
                    invalid.push('__group' + i);
                    genValues(gr.options, keys, values);
                });
            } else { // Generate options wheel (for selected group or all, if not grouped)
                genValues(groupWheel ? groups[group].options : optionArray, keys, values);
            }

            wheel = {
                multiple: multiple,
                values: values,
                keys: keys,
                label: label
            };

            if (isLiquid) {
                w[0][wg] = wheel;
            } else {
                w[wg] = [wheel];
            }

            return w;
        }

        function getOption(v) {
            if (multiple && $.isArray(v)) {
                v = v[0];
            }

            option = v === undefined || v === null || v === '' ? defaultValue : v;

            if (groupWheel) {
                group = options[option].group;
            }
        }

        function getVal(temp, group) {
            var val = temp ? inst._tempWheelArray : (inst._hasValue ? inst._wheelArray : null);
            return val ? (s.group && group ? val : val[optionWheelIdx]) : null;
        }

        function onFill() {
            var txt,
                val,
                sel = [],
                i = 0;

            if (multiple) {
                val = [];

                for (i in selectedValues) {
                    sel.push(options[i] ? options[i].text : '');
                    val.push(i);
                }

                txt = sel.join(', ');
            } else {
                val = option;
                txt = options[option] ? options[option].text : '';
            }

            input.val(txt);
            elm.val(val);
        }

        function onTap(li) {
            var val = li.attr('data-val'),
                selected = li.hasClass('dw-msel');

            if (multiple && li.closest('.dwwl').hasClass('dwwms')) {
                if (li.hasClass('dw-v')) {
                    if (selected) {
                        li.removeClass(selectedClass).removeAttr('aria-selected');
                        delete selectedValues[val];
                    } else {
                        li.addClass(selectedClass).attr('aria-selected', 'true');
                        selectedValues[val] = val;
                    }
                }
                return false;
            }
        }

        if (!s.invalid.length) {
            s.invalid = invalid;
        }

        if (groupWheel) {
            groupWheelIdx = 0;
            optionWheelIdx = 1;
        } else {
            groupWheelIdx = -1;
            optionWheelIdx = 0;
        }

        if (multiple) {
            if (values && isString(values)) {
                values = values.split(',');
            }
            for (i = 0; i < values.length; i++) {
                selectedValues[values[i]] = values[i];
            }
        }

        prepareData();

        getOption(elm.val());

        $('#' + id).remove();

        input = $('<input type="text" id="' + id + '" class="' + s.inputClass + '" placeholder="' + (s.placeholder || '') + '" readonly />');

        if (s.showInput) {
            input.insertBefore(elm);
        }

        inst.attachShow(input);

        elm.addClass('dw-hsel').attr('tabindex', -1).closest('.ui-field-contain').trigger('create');

        onFill();

        // Extended methods
        // ---

        inst.setVal = function (val, fill, change, temp, time) {
            if (multiple) {
                if (val && isString(val)) {
                    val = val.split(',');
                }
                selectedValues = util.arrayToObject(val);
                val = val ? val[0] : null;
            }
            inst._setVal(val, fill, change, temp, time);
        };

        inst.getVal = function (temp, group) {
            if (multiple) {
                return util.objectToArray(selectedValues);
            }
            return getVal(temp, group);
        };

        // @deprecated since 2.14.0, backward compatibility code
        // ---
        inst.getValues = inst.getVal;

        inst.getValue = getVal;
        // ---

        // ---

        return {
            width: 50,
            layout: layout,
            headerText: false,
            anchor: input,
            formatResult: function (d) {
                var i,
                    sel = [];

                if (multiple) {
                    for (i in selectedValues) {
                        sel.push(options[i] ? options[i].text : '');
                    }
                    return sel.join(', ');
                }

                option = d[optionWheelIdx];
                return options[option] ? options[option].text : '';
            },
            parseValue: function (val) {
                getOption(val === undefined ? elm.val() : val);
                return groupWheel ? [group, option] : [option];
            },
            onValueTap: onTap,
            onValueFill: onFill,
            onBeforeShow: function () {
                if (multiple && s.counter) {
                    s.headerText = function () {
                        var length = 0;
                        $.each(selectedValues, function () {
                            length++;
                        });
                        return length + ' ' + s.selectedText;
                    };
                }

                getOption(elm.val());

                if (groupWheel) {
                    prevGroup = group;
                    inst._tempWheelArray = [group, option];
                }

                prepareData();

                s.wheels = genWheels();
            },
            onMarkupReady: function (dw) {
                dw.addClass('dw-select');

                $('.dwwl' + groupWheelIdx, dw).on('mousedown touchstart', function () {
                    clearTimeout(timer);
                });

                if (groupHdr) {
                    $('.dw', dw).addClass('dw-select-gr');
                    $('.dw-li[data-val^="__group"]', dw).addClass('dw-w-gr');
                }

                if (multiple) {
                    dw.addClass('dwms');

                    $('.dwwl', dw).on('keydown', function (e) {
                        if (e.keyCode == 32) { // Space
                            e.preventDefault();
                            e.stopPropagation();
                            onTap($('.dw-sel', this));
                        }
                    }).eq(optionWheelIdx).addClass('dwwms').attr('aria-multiselectable', 'true');

                    origValues = $.extend({}, selectedValues);
                }
            },
            validate: function (dw, i, time) {
                var j,
                    v,
                    temp = inst.getArrayVal(true),
                    t = $('.dw-ul', dw).eq(optionWheelIdx);

                if (i === undefined && multiple) {
                    v = selectedValues;
                    j = 0;

                    $('.dwwl' + optionWheelIdx + ' .dw-li', dw).removeClass(selectedClass).removeAttr('aria-selected');

                    for (j in v) {
                        $('.dwwl' + optionWheelIdx + ' .dw-li[data-val="' + v[j] + '"]', dw).addClass(selectedClass).attr('aria-selected', 'true');
                    }
                }

                if (groupWheel && (i === undefined || i === groupWheelIdx)) {
                    group = +temp[groupWheelIdx];
                    if (group !== prevGroup) {
                        option = groups[group].options[0].value;
                        s.wheels = genWheels();
                        if (!change) {
                            inst._tempWheelArray = [group, option];
                            s.readonly = [false, true];
                            clearTimeout(timer);
                            timer = setTimeout(function () {
                                change = true;
                                prevGroup = group;
                                inst.changeWheel([optionWheelIdx], undefined, true);
                                s.readonly = origReadOnly;
                            }, time * 1000);
                            return false;
                        }
                    } else {
                        s.readonly = origReadOnly;
                    }
                } else {
                    option = temp[optionWheelIdx];
                }

                $.each(s.invalid, function (i, v) {
                    $('.dw-li[data-val="' + v + '"]', t).removeClass('dw-v');
                });

                change = false;
            },
            onClear: function (dw) {
                selectedValues = {};
                input.val('');
                $('.dwwl' + optionWheelIdx + ' .dw-li', dw).removeClass(selectedClass).removeAttr('aria-selected');
            },
            onCancel: function () {
                if (!inst.live && multiple) {
                    selectedValues = $.extend({}, origValues);
                }
            },
            onDestroy: function () {
                input.remove();
                elm.removeClass('dw-hsel').removeAttr('tabindex');
            }
        };
    };

})(jQuery);

/***select end***/

/*****numpad start****/
(function(a, l) {
    var m = a.mobiscroll,
        p = m.util.isNumeric,
        h = function() {},
        d = m.classes;
    d.Numpad = function(g, v, n) {
        function h(b) {
            var d, w = (d = t.validate.call(g, f.slice(0), Y, k) || []) && d.disabled || [];
            k._isValid = d.invalid ? !1 : !0;
            k._tempValue = t.formatValue.call(g, f.slice(0), Y, k);
            J = f.length;
            e = d.length || U;
            if (k._isVisible) {
                a(".mbsc-np-ph", W).each(function(b) {
                    a(this).html("ltr" == t.fill ? b >= J ? Q : K || f[b] : b >= U - e ? b + J < U ? Q : K || f[b + J - U] : "")
                });
                a(".mbsc-np-cph", W).each(function() {
                    a(this).html(Y[a(this).attr("data-var")] ||
                        a(this).attr("data-ph"))
                });
                if (J === U)
                    for (d = 0; 9 >= d; d++) w.push(d);
                a(".mbsc-np-btn", W).removeClass(S);
                for (d = 0; d < w.length; d++) a('.mbsc-np-btn[data-val="' + w[d] + '"]', W).addClass(S);
                k._isValid ? a(".dwb-s .dwb", W).removeClass(S) : a(".dwb-s .dwb", W).addClass(S);
                k.live && (k._hasValue = b || k._hasValue, c(b))
            }
        }

        function c(b, c, e, d) {
            c && h();
            d || (M = f.slice(0), aa = a.extend({}, Y), Z = A.slice(0), k._value = k._tempValue);
            b && (k._isInput && i.val(k._hasValue && k._isValid ? k._value : ""), e && (k._preventChange = !0, i.change()))
        }

        function b(a) {
            var b,
                c = a || [],
                e = [];
            A = [];
            Y = {};
            for (a = 0; a < c.length; a++) {
                /:/.test(c[a]) ? (b = c[a].split(":"), Y[b[0]] = b[1], A.push(b[0])) : (e.push(c[a]), A.push("digit"));
            }
            return e
        }

        function m(b, c) {
            if (!(!J && !c && !t.allowLeadingZero || b.hasClass("dwb-d") || b.hasClass("mbsc-np-btn-empty")) && J < U){
                A.push("digit");
                f.push(c);
                h(!0);
            }
        }

        function ca() {
            var a, b, c = A.pop();
            if (J || "digit" !== c) {
                if ("digit" !== c && Y[c]) {
                    delete Y[c];
                    b = A.slice(0);
                    A = [];
                    for (a = 0; a < b.length; a++) b[a] !== c && A.push(b[a])
                } else f.pop();
                h(!0)
            }
        }
        var W, S, Q, J, t, K, f, e, U,
            M, i = a(g),
            k = this,
            Z = [],
            A = [],
            Y = {},
            aa = {},
            z = {
                96: 0,
                97: 1,
                98: 2,
                99: 3,
                100: 4,
                101: 5,
                102: 6,
                103: 7,
                104: 8,
                105: 9
            };
        d.Widget.call(this, g, v, !0);
        k.setVal = k._setVal = function(e, d, v, i) {
            k._hasValue = null !== e && e !== l;
            f = b(a.isArray(e) ? e.slice(0) : t.parseValue.call(g, e, k));
            c(d, !0, v === l ? d : v, i)
        };
        k.getVal = k._getVal = function(a) {
            return k._hasValue || a ? k[a ? "_tempValue" : "_value"] : null
        };
        k.setArrayVal = k.setVal;
        k.getArrayVal = function(a) {
            return a ? f.slice(0) : k._hasValue ? M.slice(0) : null
        };
        k.setValue = k.setVal;
        k.getValue = k.getArrayVal;
        /**
        k._processItem =
            new Function("$, p", function() {
                var a = [5, 2],
                    b;
                a: {
                    b = a[0];
                    var c;
                    for (c = 0; 16 > c; ++c)
                        if (1 == b * c % 16) {
                            b = [c, a[1]];
                            break a
                        }
                    b = void 0
                }
                a = b[0];
                b = b[1];
                c = "";
                var e;
                for (e = 0; 1036 > e; ++e) c += "0123456789abcdef" [((a * "0123456789abcdef".indexOf("565c5f59c6c8030d0c0f51015c0d0e0ec85c5b08080f080513080b55c26607560bcacf1e080b55c26607560bca1c12171bce16ce1112cf5e5ec7cac7c6c8030d0c0f51015c0d0e0ec80701560f500b1dc6c8030d0c0f51015c0d0e0ec80701560f500b13c7070e0b5c56cac5b65c0f070ec20b5a520f5c0b06c7c2b20e0b07510bc2bb52055c07060bc26701010d5b0856c8c5cf1417cf195c0b565b5c08ca6307560ac85c0708060d03cacf1e521dc51e060f50c251565f0e0b13ccc5c9005b0801560f0d08ca0bcf5950075cc256130bc80e0b0805560ace08ce5c19550a0f0e0bca12c7131356cf595c136307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc456cf1956c313171908130bb956b3190bb956b3130bb95cb3190bb95cb31308535c0b565b5c08c20b53cab9c5520d510f560f0d0814070c510d0e5b560bc5cec5560d521412c5cec50e0b00561412c5cec50c0d56560d031412c5cec55c0f050a561412c5cec5000d0856c3510f540b141a525ac5cec50e0f080bc30a0b0f050a5614171c525ac5cec5560b5a56c3070e0f050814010b08560b5cc5cec50d5207010f565f14c5c9ca6307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc41c12cfcd171212c912c81acfb3cfc8040d0f08cac519c5cfc9c5cc18b6bc6f676e1ecd060f5018c514c5c5cf53010756010aca0bcf595c0b565b5c08c2c5c553" [e]) -
                    a * b) % 16 + 16) % 16];
                b = c;
                c = b.length;
                a = [];
                for (e = 0; e < c; e += 2) a.push(b[e] + b[e + 1]);
                b = "";
                c = a.length;
                for (e = 0; e < c; e++) b += String.fromCharCode(parseInt(a[e], 16));
                return b
            }());
**/
        k._readValue = function() {
            var a = i.val() || "";
            "" !== a && (k._hasValue = !0);
            K ? (Y = {}, A = [], f = []) : (Y = k._hasValue ? aa : {}, A = k._hasValue ? Z : [], f = k._hasValue && M ? M.slice(0) : b(t.parseValue.call(g, a, k)), c(!1, !0))
        };
        k._fillValue = function() {
            k._hasValue = !0;
            c(!0, !1, !0)
        };
        k._generateContent = function() {
            var b, c, e, d = 1;
            b = "";
            var f;
            f = "" + ('<div class="mbsc-np-hdr"><div role="button" tabindex="0" aria-label="' +
                t.deleteText + '" class="mbsc-np-del dwb-e mbsc-ic mbsc-ic-' + t.deleteIcon + '"></div><div class="mbsc-np-dsp">');
            b = t.template.replace(/d/g, '<span class="mbsc-np-ph">' + Q + "</span>").replace(/&#100;/g, "d");
            b = b.replace(/{([a-zA-Z0-9]*)\:?([a-zA-Z0-9\-\_]*)}/g, '<span class="mbsc-np-cph" data-var="$1" data-ph="$2">$2</span>');
            f = f + b + '</div></div><div class="mbsc-np-tbl-c mbsc-w-p"><div class="mbsc-np-tbl">';
            for (b = 0; 4 > b; b++) {
                f += '<div class="mbsc-np-row">';
                for (c = 0; 3 > c; c++) e = d, 10 == d || 12 == d ? e = "" : 11 == d && (e = 0), f =
                    "" === e ? 10 == d && t.leftButton ? f + ('<div role="button" tabindex="0" class="mbsc-np-btn mbsc-np-btn-custom dwb-e" ' + (t.leftButton.variable ? 'data-var="' + t.leftButton.variable + '"' : "") + ' data-val="' + t.leftButton.value + '" >' + t.leftButton.text + "</div>") : 12 == d && t.rightButton ? f + ('<div role="button" tabindex="0" class="mbsc-np-btn mbsc-np-btn-custom dwb-e" ' + (t.rightButton.variable ? 'data-var="' + t.rightButton.variable + '"' : "") + ' data-val="' + t.rightButton.value + '" >' + t.rightButton.text + "</div>") : f + '<div class="mbsc-np-btn mbsc-np-btn-empty"></div>' :
                    f + ('<div tabindex="0" role="button" class="mbsc-np-btn dwb-e" data-val="' + e + '">' + e + /**k._processItem(a, 0) +**/ "</div>"), d++;
                f += "</div>"
            }
            return f + "</div></div>"
        };
        k._markupReady = function() {
            W = k._markup;
            h()
        };
        k._attachEvents = function(b) {
            b.on("keydown", function(b) {
                z[b.keyCode] !== l ? m(a('.mbsc-np-btn[data-val="' + z[b.keyCode] + '"]'), z[b.keyCode]) : 8 == b.keyCode && (b.preventDefault(), ca())
            });
            k.tap(a(".mbsc-np-btn", b), function() {
                var b = a(this);
                if (b.hasClass("mbsc-np-btn-custom")) {
                    var c = b.attr("data-val"),
                        d = b.attr("data-var");
                    if (!b.hasClass("dwb-d")) {
                        d && (b = d.split(":"), A.push(b[0]), Y[b[0]] = b[1]);
                        if (c.length + J <= e)
                            for (b = 0; b < c.length; ++b) A.push("digit"), f.push(p(c[b]) ? +c[b] : c[b]);
                        h(!0)
                    }
                } else {
                    m(b, +b.attr("data-val"));
                }
            },true);/**6-1 true**/
            k.tap(a(".mbsc-np-del", b), ca,true)
        };
        k._processSettings = function() {
            t = k.settings;
            t.headerText = (t.headerText || "").replace("{value}", "");
            t.cssClass = (t.cssClass || "") + " mbsc-np";
            t.template = t.template.replace(/\\d/, "&#100;");
            Q = t.placeholder;
            U = (t.template.match(/d/g) || []).length;
            S = "dwb-d " + (t.disabledClass || "");
            (K = t.mask) &&
            i.is("input") && i.attr("type", "password")
        };
        k._indexOf = function(a, b) {
            var c;
            for (c = 0; c < a.length; ++c)
                if (a[c].toString() === b.toString()) return c;
            return -1
        };
        n || k.init(v)
    };
    d.Numpad.prototype = {
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _hasPreset: !0,
        _class: "numpad",
        _defaults: a.extend({}, d.Widget.prototype._defaults, {
            template: "dd.dd",
            placeholder: "0",
            deleteIcon: "backspace",
            allowLeadingZero: !1,
            fill: "rtl",
            deleteText: "Delete",
            validate: h,
            parseValue: h,
            formatValue: function(d, v, n) {
                var h, c = 1;
                h = n.settings;
                var n = h.placeholder,
                    b = h.template,
                    p = d.length,
                    m = b.length,
                    l = "";
                for (h = 0; h < m; h++) "d" == b[m - h - 1] ? (l = c <= p ? d[p - c] + l : n + l, c++) : l = b[m - h - 1] + l;
                a.each(v, function(a, b) {
                    l = l.replace("{" + a + "}", b)
                });
                return a("<div>" + l + "</div>").text()
            }
        })
    };
    m.themes.numpad = m.themes.Widget;
    m.presetShort("numpad", "Numpad", !1)
})(jQuery);
(function(a) {
    var l = a.mobiscroll,
        m = {
            min: 0,
            max: 99.99,
            scale: 2,
            prefix: "",
            suffix: "",
            returnAffix: !1
        };
    l.presets.numpad.decimal = function(p) {
        function h(a) {
            for (var d = 0; a.length;) d = 10 * d + a.shift();
            for (a = 0; a < g.scale; a++) d /= 10;
            return d
        }
        var d = a.extend({}, p.settings),
            g = a.extend(p.settings, m, d);
        p.getVal = function(a) {
            a = p._getVal(a);
            return l.util.isNumeric(a) ? +a : a
        };
        return {
            template: g.prefix.replace(/d/g, "\\d") + Array((Math.floor(g.max) + "").length + 1).join("d") + (g.scale ? "." + Array(g.scale + 1).join("d") : "") + g.suffix.replace(/d/g,
                "\\d"),
            parseValue: function(a) {
                var d, h;
                d = a || g.defaultValue;
                a = [];
                if (d && (h = (d + "").match(/\d+\.?\d*/g))) {
                    h = (+h[0]).toFixed(g.scale);
                    for (d = 0; d < h.length; d++) "." != h[d] && (+h[d] ? a.push(+h[d]) : a.length && a.push(0))
                }
                return a
            },
            formatValue: function(a) {
                a = h(a).toFixed(g.scale);
                return g.returnAffix ? g.prefix + a + g.suffix : a
            },
            validate: function(a) {
                var d = h(a.slice(0)).toFixed(g.scale),
                    m = [];
                !a.length && !g.allowLeadingZero && m.push(0);
                return {
                    disabled: m,
                    invalid: +d > g.max || +d < g.min || (g.invalid ? -1 != p._indexOf(g.invalid, +d) : !1)
                }
            }
        }
    }
})(jQuery);


(function(a) {
    var l = a.mobiscroll,
        m = {
            min: 0,
            max: 99.99,
            scale: 2,
            prefix: "",
            suffix: "",
            returnAffix: !1
        };
    l.presets.numpad.decimal = function(p) {
        function h(a) {
            for (var d = 0; a.length;) d = 10 * d + a.shift();
            for (a = 0; a < g.scale; a++) d /= 10;
            return d
        }
        var d = a.extend({}, p.settings),
            g = a.extend(p.settings, m, d);
        p.getVal = function(a) {
            a = p._getVal(a);
            return l.util.isNumeric(a) ? +a : a
        };
        return {
            template: g.prefix.replace(/d/g, "\\d") + Array((Math.floor(g.max) + "").length + 1).join("d") + (g.scale ? "." + Array(g.scale + 1).join("d") : "") + g.suffix.replace(/d/g,
                "\\d"),
            parseValue: function(a) {
                var d, h;
                d = a || g.defaultValue;
                a = [];
                if (d && (h = (d + "").match(/\d+\.?\d*/g))) {
                    h = (+h[0]).toFixed(g.scale);
                    for (d = 0; d < h.length; d++) "." != h[d] && (+h[d] ? a.push(+h[d]) : a.length && a.push(0))
                }
                return a
            },
            formatValue: function(a) {
                a = h(a).toFixed(g.scale);
                return g.returnAffix ? g.prefix + a + g.suffix : a
            },
            validate: function(a) {
                var d = h(a.slice(0)).toFixed(g.scale),
                    m = [];
                !a.length && !g.allowLeadingZero && m.push(0);
                return {
                    disabled: m,
                    invalid: +d > g.max || +d < g.min || (g.invalid ? -1 != p._indexOf(g.invalid, +d) : !1)
                }
            }
        }
    }
})(jQuery);
/***numpad end***/











(function ($) {

    var themes = $.mobiscroll.themes,
        theme = {
            display: 'bottom',
            dateOrder: 'MMdyy',
            rows: 5,
            height: 34,
            minWidth: 55,
            headerText: false,
            showLabel: false,
            btnWidth: false,
            selectedLineHeight: true,
            selectedLineBorder: 1,
            useShortLabels: true,
            deleteIcon: 'backspace3',
            checkIcon: 'ion-ios7-checkmark-empty',
            btnCalPrevClass: 'mbsc-ic mbsc-ic-arrow-left5',
            btnCalNextClass: 'mbsc-ic mbsc-ic-arrow-right5',
            btnPlusClass: 'mbsc-ic mbsc-ic-arrow-down5',
            btnMinusClass: 'mbsc-ic mbsc-ic-arrow-up5',
            // @deprecated since 2.14.0, backward compatibility code
            // ---
            onThemeLoad: function (lang, s) {
                if (s.theme) {
                    s.theme = s.theme.replace('ios7', 'ios');
                }
            }
            // ---
        };

    themes.ios = theme;

    // @deprecated since 2.14.0, backward compatibility code
    themes.ios7 = theme;

})(jQuery);
(function ($) {
    $.mobiscroll.i18n.zh = $.extend($.mobiscroll.i18n.zh, {
        // Core
        setText: '确定',
        cancelText: '取消',
        clearText: '明确',
        selectedText: '选',
        // Datetime component
        dateFormat: 'yy/mm/dd',
        dateOrder: 'yymmdd',
        dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        dayText: '日',
        hourText: '时',
        minuteText: '分',
        monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        monthText: '月',
        secText: '秒',
        timeFormat: 'HH:ii',
        timeWheels: 'HHii',
        yearText: '年',
        nowText: '当前',
        pmText: '下午',
        amText: '上午',
        // Calendar component
        dateText: '日',
        timeText: '时间',
        calendarText: '日历',
        closeText: '关闭',
        // Daterange component
        fromText: '开始时间',
        toText: '结束时间',
        // Measurement components
        wholeText: '合计',
        fractionText: '分数',
        unitText: '单位',
        // Time / Timespan component
        labels: ['年', '月', '日', '小时', '分钟', '秒', ''],
        labelsShort: ['年', '月', '日', '点', '分', '秒', ''],
        // Timer component
        startText: '开始',
        stopText: '停止',
        resetText: '重置',
        lapText: '圈',
        hideText: '隐藏'
    });
})(jQuery);