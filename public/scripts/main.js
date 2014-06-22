/** 
 * HTML_Compressor.js v1.0.0 
 * http://www.koheishingai.com 
 * 
 * Licensed under the MIT license. 
 * http://www.opensource.org/licenses/mit-license.php 
 * 
 * Copyright 2014, koheishingai 
 * http://www.koheishingai.com 
 */
 
$(function () {
    var flg = {};
    var timer = null;

    function init() {
        flg.compress = false;
        flg.help = false;
        setTimeout(function () {
            $("#over-wrap").addClass("dark");
            $("#content").addClass("visible");
            $("#logo").addClass("visible");
            $("#title").addClass("visible");
        }, 800);
    }

    function reset() {
        $("#source").val("");
        $("#title").removeClass("visible");
        $("#bottom").removeClass("down");
        $(".la-anim-6 ").fadeOut();
        setTimeout(function () {
            $("#content").css({
                "height": "420px",
                "width": "340px",
                "margin": "-210px 0 0 -170px"
            });
            $("#source").removeClass('visible').removeClass('visible2').removeClass('visible3').css("opacity", "");
            setTimeout(function () {
                $("#close").removeClass("visible");
                $("#title").text("HTML Compressor").addClass("visible");
                $("#top").fadeIn();
                $("#bottom").fadeIn();
                flg.help = false;
                flg.compress = false;
            }, 297);
        }, 390);
    }

    function compressor() {
        $(".la-anim-6 ").fadeIn();
        $("#title").removeClass("visible");
        $("#close").removeClass("visible");
        $("#source").removeClass('visible').removeClass('visible2').removeClass('visible3');
        $("#bottom").addClass("down");
        setTimeout(function () {
            $("#content").css({
                "height": "420px",
                "width": "340px",
                "margin": "-210px 0 0 -170px"
            });
            setTimeout(function () {
                var allHTML = $("#source").val();
                allHTML = allHTML.replace(/(\r\n|\n|\r|\t)/gm, "");
                allHTML = allHTML.replace(/\s+/g, " ");
                $("#source").val(allHTML);
                $("#title").text("Now Compressing...").addClass("visible");
                setTimeout(function () {
                    PieDraw();
                }, 490);
            }, 297);
        }, 390);
    }

    function deleteCElement(check) {
        $("#top").fadeOut("fast", function () {
            $("#close").addClass("visible");
        });
        if (check !== true) {
            $("#bottom").fadeOut("fast");
            setTimeout(function () {
                $("#source").addClass("visible3");
            }, 200);
        } else {
            if (window.innerWidth > 700) {
                $("#source").addClass("visible");
            } else {
                $("#source").addClass("visible2");
            }
        }
        $("#title").removeClass("visible");
        setTimeout(function () {
            if (window.innerWidth > 700) {
                var tempWidth = window.innerWidth;
                tempWidth = tempWidth * 0.75;
                var tempMargin = tempWidth / 2;
                tempMargin = tempMargin * -1;
                $("#content").css({
                    "height": "520px",
                    "width": tempWidth,
                    "margin": "-260px 0 0 " + tempMargin + "px"
                });
            } else {}
        }, 200);
    }

    function openHelp() {
        $("#title").text("How to Use?").addClass("visible");
    }

    function openComp() {
        $("#bottom").removeClass("down");
        $("#title").text("Compress HTML Source").addClass("visible");
    }
    $("#wrap-background").load(function () {
        init();
    });
    $("#top").click(function () {
        if (flg.help === false) {
            $("#source").val('1st > Click the COMPRESS Button\n\n2nd > Paste Your HTML Source Code to the Form\n\n3rd > Click the COMPRESS Button Again');
            deleteCElement(false);
            setTimeout(function () {
                openHelp();
            }, 470);
            flg.help = true;
        } else {
            flg.help = false;
        }
    });
    $("#bottom").click(function () {
        if (flg.compress === false) {
            $("#source").val('<!DOCTYPE html>\n<html>\n <head>\n <meta charset="utf-8">\n <title>HTML Compressor</title>\n <link rel="stylesheet" href="styles/html_compressor.css">\n <script src="/scripts/html_compressor.js">\n </head>\n <body>\n <h1>Hello HTML Compressor!</h1>\n </body>\n</html>');
            deleteCElement(true);
            setTimeout(function () {
                openComp();
            }, 470);
            flg.compress = true;
        } else {
            compressor();
        }
    });
    $("#close").click(function () {
        $("#source").css("opacity", "0");
        reset();
    });
    $(window).resize(function () {
        if (timer !== false) {
            clearTimeout(timer)
        }
        timer = setTimeout(function () {
            if (window.innerWidth < 701) {
                reset();
            }
        }, 200)
    });
    var loader = document.getElementById('la-anim-6-loader'),
        border = document.getElementById('la-anim-6-border'),
        α = 0,
        π = Math.PI,
        t = 15,
        tdraw;

    function PieDraw() {
        α++;
        α %= 360;
        var r = (α * π / 180),
            x = Math.sin(r) * 250,
            y = Math.cos(r) * -250,
            mid = (α > 180) ? 1 : 0,
            anim = 'M 0 0 v -250 A 250 250 1 ' + mid + ' 1 ' + x + ' ' + y + ' z';
        loader.setAttribute('d', anim);
        border.setAttribute('d', anim);
        console.log(α);
        if (α != 0) {
            tdraw = setTimeout(PieDraw, t);
        }
        if (α === 0) {
            PieReset();
        }
    }

    function PieReset() {
        deleteCElement(true);
        setTimeout(function () {
            openComp();
        }, 470);
        clearTimeout(tdraw);
        var anim = 'M 0 0 v -250 A 250 250 1 0 1 0 -250 z';
        loader.setAttribute('d', anim);
        border.setAttribute('d', anim);
    }
    var inProgress = false;
    Array.prototype.slice.call(document.querySelectorAll('#la-buttons > button')).forEach(function (el, i) {
        var anim = el.getAttribute('data-anim'),
            animEl = document.querySelector('.' + anim);
        el.addEventListener('click', function () {
            if (inProgress) return false;
            inProgress = true;
            classie.add(animEl, 'la-animate');
            if (anim === 'la-anim-6') {
                PieDraw();
            }
            setTimeout(function () {
                classie.remove(animEl, 'la-animate');
                if (anim === 'la-anim-6') {
                    PieReset();
                }
                inProgress = false;
            }, 6000);
        });
    });
});