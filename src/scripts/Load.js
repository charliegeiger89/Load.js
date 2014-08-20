(function() {
    'use strict';

    var options = {
        delay: 500,
        background: 'rgba(0, 154, 227, 0.9)',
        color: '#FFF'
    };

    var sheet;
    var _win = window;
    var _doc = document;
    var _FPS = 16.6666666667;
    var _RAF = _win.requestAnimationFrame ||
        _win.webkitRequestAnimationFrame ||
        _win.mozRequestAnimationFrame ||
        _win.msRequestAnimationFrame ||
        _win.oRequestAnimationFrame ||
        function(a) {
            _win.setTimeout(a, _FPS);
        };

    var data = {
        selector: [
            '#loadingBackground',
            '#loadingOuter1',
            '#loadingOuter2',
            '#loadingInner',
            '#loadingWrap',
            '#loadingContent',
            '#loadingInnerInner',
            '.done'
        ],
        style: [
            'height: ' + window.innerHeight + ';width: ' + window.innerWidth + ';background: ' + options.background + ';text-align: center;color: ' + options.color + ';font-family: Verdana, sans-serif!important;display: block;z-index: 999999;position: fixed;top: 0;right: 0;bottom: 0;left: 0;-webkit-animation: backgroundFade .25s;-moz-animation: backgroundFade .25s;animation: backgroundFade .25s;-webkit-transition: opacity 0.5s ease-in;-moz-transition: opacity 0.5s ease-in;-o-transition: opacity 0.5s ease-in;transition: opactiy 0.5s ease-in;',
            '-webkit-animation: spin2 2s infinite;-moz-animation: spin2 2s infinite;animation: spin2 2s infinite;line-height: 104px;height: 100px;width: 100px;left: 50%;top: 50%;margin: -52px 0 0 -47px;font-size: 8px;display: block;position: fixed;',
            '-webkit-animation: spin2 2s infinite;-moz-animation: spin2 2s infinite;animation: spin2 2s infinite;line-height: 104px;height: 100px;width: 100px;left: 50%;font-size: 8px;top: 50%;margin: -52px 0 0 -54px;display: block;position: fixed;',
            'width: 122px;height: 122px;display: block;border: 1px solid transparent;border-radius: 50%;border-top-color: ' + options.color + ';border-bottom-color: ' + options.color + ';position: fixed;top: 50%;left: 50%;margin: -62px 0 0 -62px;-webkit-animation: spin 2s infinite;-moz-animation: spin 2s infinite;animation: spin 2s infinite;',
            'height: 100%;width: 100%;display: block;z-index: 999999;position: absolute;top: 0;right: 0;bottom: 0;left: 0;text-align: center;',
            'width: 122px;height: 160px;display: block;position: fixed;top: 50%;left: 50%;margin: -80px 0 0 -61px;',
            'height: 80px;width: 80px;left: 50%;top: 50%;margin: -41px 0 0 -41px;display: block;text-align: center;position: fixed;border-radius: 100%;border: 1px solid ' + options.color + ';-webkit-animation: pulse 4s infinite;-moz-animation: pulse 4s infinite;animation: pulse 4s infinite;',
            'opacity:0;'
        ],
        prefix: {
            webkitSelector: [
                '@-webkit-keyframes spin',
                '@-webkit-keyframes spin2',
                '@-webkit-keyframes pulse'
            ],
            mozSelector: [
                '@-moz-keyframes spin',
                '@-moz-keyframes spin2',
                '@-moz-keyframes pulse'
            ],
            noSelector: [
                '@keyframes spin',
                '@keyframes spin2',
                '@keyframes pulse'
            ]
        },
        rules: {
            webkitRules: [
                '0% {-webkit-transform: rotateZ(0deg);} 100% {-webkit-transform: rotateZ(360deg);}', '0% {-webkit-transform: rotateZ(0deg);opacity: 0;} 50% {-webkit-transform: rotateZ(360deg);opacity: 1;} 100% {-webkit-transform: rotateZ(360deg);}'
            ],
            mozRules: [
                '0% {-moz-transform: rotateZ(0deg);} 100% {-moz-transform: rotateZ(360deg);}', '0% {-moz-transform: rotateZ(0deg);opacity: 0;} 50% {-moz-transform: rotateZ(360deg);opacity: 1;} 100% {-moz-transform: rotateZ(360deg);}', '0% {opacity: 0.5;-moz-transform: scale(0.5);} 50% {opacity: 1;-moz-transform: scale(1);} 100% {opacity: 0.5;-moz-transform: scale(0.5);}', '0% {opacity: 0.5;-webkit-transform: scale(0.5);} 50% {opacity: 1;-webkit-transform: scale(1);} 100% {opacity: 0.5;-webkit-transform: scale(0.5);}'
            ],
            noRules: [
                '0% {transform: rotateZ(0deg);} 100% {transform: rotateZ(360deg);}', '0% {transform: rotateZ(0deg);opacity: 0;} 50% {transform: rotateZ(360deg);opacity: 1;} 100% {transform: rotateZ(360deg);}', '0% {opacity: 0.5;transform: scale(0.5);} 0% {opacity: 1;transform: scale(1);} 100% {opacity: 0.5;transform: scale(0.5);}'
            ]
        }
    }


    function createLoadingElements() {
        /*jshint multistr: true */
        var loading = '<div id="loadingBackground"> \
            <div id="loadingWrap"> \
                <div id="loadingContent"> \
                    <div id="loadingInner"></div> \
                    <div id="loadingInnerInner"></div> \
                    <div id="loadingOuter1"> \
                    • \
                    • \
                    </div> \
                    <div id="loadingOuter2"> \
                    • \
                    • \
                    </div> \
                </div> \
                <div id="loadingText"></div> \
                <div id="loadingText2"></div> \
            </div> \
        </div>';

        _doc.body.innerHTML += loading;
    };

    function createSheet() {
        var style = _doc.createElement("style");
        style.appendChild(_doc.createTextNode(""));
        _doc.head.appendChild(style);
        return style.sheet;
    };

    function insertCSS() {
        var selector = arguments[0];
        var rules = arguments[1];
        if (selector) {
            var selectorLength = selector.length;
            for (var i = 0; i < selectorLength; i++) {
                if (sheet.insertRule) {
                    sheet.insertRule(selector[i] + "{" + rules[i] + "}", 0);
                } else {
                    sheet.addRule(selector[i], rules[i], 0);
                }
            }
        }
    }

    function checkBrowser() {
        var chrome = window.chrome;
        var firefox = typeof InstallTrigger !== 'undefined';
        chrome ?
            insertCSS(data.prefix.webkitSelector, data.rules.webkitRules) :
            firefox ?
            insertCSS(data.prefix.mozSelector, data.rules.mozRules) :
            insertCSS(data.prefix.noSelector, data.rules.noRules);
    }

    function clear() {
        setTimeout(function() {
            var loadingWrap = _doc.querySelector(data.selector[0]);
            loadingWrap.className = 'done';
            setTimeout(function() {
                _doc.body.removeChild(loadingWrap)
            }, 500);
        }, options.delay);
    }

    function clearOnReady() {
        document.readyState === "complete" ? clear() : _RAF(clearOnReady);
    }

    (function init() {
        createLoadingElements();
        sheet = createSheet();
        insertCSS(data.selector, data.style);
        checkBrowser();
        clearOnReady();
    })();

})();
