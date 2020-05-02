// Settings
var page = 0,
    disabledIntro = false,
    menuPage = 0,
    projects = 2,
    swipeDistance = 300,
    distanceBounce = 100,
    renderSpacing= 540,
    magneticMargin = {r: 80, b: 70}
;

// Video
var mouseInVideo = false,
    videoPlaying = false,
    videoData
;

// Definition
var intro = true,
    tutorial = true,
    home = false,
    studio = false,
    menu = false,
    about = false,
    transitioning = false,
    mousetracking = true,
    mouseTransition = false,
    renderRotation = 0,
    mouseRotation = true,
    menuCD = 0,
    menuCDSwitch = false,
    cursorChanged = false,
    colorT = 0,
    aboutScroll = false,
    scrolling = false,
    aboutPos = 0,
    xPlus = 0,
    aboutH = $(".about-text").outerHeight(),
    splitH = $(".about-page .split-left").outerHeight(),
    fails = 0,
    winW = $(window).outerWidth(),
    winH = $(window).outerHeight(),
    winR = Math.sqrt(Math.pow(winW, 2) + Math.pow(winH, 2))
;

// Responsive sizes
var gradientWidth = 0,
    gradientPadding = 0,
    renderCenter = 0
;

// Recurrent elements
var pCanvas = ".project-link canvas",
    pFrame = ".project-link .frame",
    pSmall = ".project-link small",
    pH2 = ".project-link h2",
    pSpan = ".project-link span"
;

// Swipe
var mouseThen = 0,
    mouseYThen = 0,
    mouseX = 0,
    mouseY = 0,
    dist = 0,
    distance = 0,
    distStack = 0,
    scenes = 0,
    introWidth = 0,
    studioScene = 0,
    sceneReveal = 0,
    studioDistance = 0,
    nextLinkW = 0,
    swiping = false,
    movingLeft = false,
    movingRight = false,
    movingUp = false,
    movingDown = false
;

function responsiveness() {
    winW = $(window).outerWidth();
    winH = $(window).outerHeight();

  

    // large
    if (winW > 1200) {
        introWidth = $(".intro").outerWidth();
        sceneReveal = (winW - ((winH - 250 - 80) * 16 / 9)) / 2 + (winW - introWidth);
        studioDistance = 700;
        swipeDistance = 300;
        magneticMargin = {r: 80, b: 65};
        gradientWidth = 600;
        gradientPadding = 40;
        nextLinkW = 600;
        renderCenter = 40;
    } else if (winW < 1201 && winW > 599) {
        sceneReveal = (winW - ((winH - 250 - 80) * 16 / 9)) / 2 + (winW - 600);
        studioDistance = winW / 3;
        swipeDistance = winW / 4;
        magneticMargin = {r: 50, b: 50};
        gradientWidth = 600;
        gradientPadding = 20;
        nextLinkW = 600;
        renderCenter = 20;
    } else if (winW < 600) {
        sceneReveal = 0;
        studioDistance = winW / 2;
        swipeDistance = winW / 4;
        magneticMargin = {r: 20, b: 37};
        gradientWidth = winW;
        gradientPadding = 0;
        nextLinkW = winW;
        renderCenter = (winW - 600) / 2;
    }

    TweenMax.to(".magnetic > div > span", 0.5, {
        right: magneticMargin.r,
        bottom: magneticMargin.b,
    })
    TweenMax.to(".magnetic > div > a", 0.5, {
        right: magneticMargin.r,
        bottom: magneticMargin.b
    })

    if (home) {
        TweenMax.set(".gradient", {
            width: winW,
            height: winH,
            top: 0,
            left: 0
        })
    }

    if (studio) {
        TweenMax.set(pCanvas, {
            y: winH / 2 - 300,
            x: gradientPadding,
            marginLeft: 0
        })
        TweenMax.set(pFrame, {
            x: gradientPadding,
            y: winH / 2 - 300,
            marginLeft: 0
        })
        $(".scene").each(function(i, el) {
            TweenMax.set($(el), {
                y: "-50%"
            })
            if (studioScene == i && i == 0) {
                TweenMax.set($(el), {
                    x: 0
                })
            } else if (studioScene == 0 && i == 1) {
                TweenMax.set($(el), {
                    x: winW - sceneReveal
                })
            } else if (studioScene != i) {
                if (studioScene > i) {
                    TweenMax.set($(el), {
                        x: -winW
                    })
                } else {
                    TweenMax.set($(el), {
                        x: winW
                    })
                }
            }
        })
        if (studioScene == 0) {
            TweenMax.set(".models", {
                width: gradientWidth + gradientPadding
            })
        }

        TweenMax.to(".gradient", 0.5, {
            top: gradientPadding,
            height: winH - gradientPadding * 2,
            width: gradientWidth,
            left: gradientPadding
        })

        $(".scene > div").each(function(i, el) {
            if ($(el).attr("data-parallax") == "size") {
                var parentIndex = $(el).parent().index();
                if (studioScene == parentIndex) {
                    TweenMax.to($(el), 0.5, {
                        height: winH
                    })
                } else {
                    TweenMax.to($(el), 0.5, {
                        height: winH - 250
                    })
                }
            }
        })
    }

    if (!studio || studio && winW < 600) {
        TweenMax.set(pCanvas, {
            x: winW / 2 - 300,
            y: winH / 2 - 300,
            marginLeft: 0
        })
        TweenMax.set(pFrame, {
            x: winW / 2 - 300,
            y: winH / 2 - 300,
            marginLeft: 0
        })
        TweenMax.set(".models", {
            width: winW
        })
        TweenMax.set(".circle-progress", {
            x: "-50%",
            y: "-50%"
        })
    }
    aboutH = $(".about-text").outerHeight();
    splitH = $(".about-page .split-left").outerHeight();
    aboutPos = 0;

    TweenMax.to(".about-text", 0.5, {
        y: 0
    })

    if (aboutH > splitH) {
        aboutScroll = true;
        $(".about-page .split-left").addClass("shaded");
        TweenMax.set(".about-page .split-left", {
            alignItems: "flex-start"
        })
    } else {
        aboutScroll = false;
        $(".about-page .split-left").removeClass("shaded");
        TweenMax.set(".about-page .split-left", {
            alignItems: "center"
        })
    }
}

$(window).on("resize", function() {
    responsiveness()
})

$(window).on("mousewheel", function(event) {
 

    if (about && aboutScroll) {
        if (event.deltaY == -1 && splitH - aboutPos <= aboutH - 50) {
            aboutPos -= 100;
            TweenMax.to(".about-text", 0.5, {
                y: aboutPos
            })
        } else if (event.deltaY == 1 && aboutPos <= -100) {
            aboutPos += 100;
            TweenMax.to(".about-text", 0.5, {
                y: aboutPos
            })
        }
    } else if (home) {
        if (event.deltaY == -1 && !transitioning) {
            projectOut();
            if (page < projects - 1) {
                TweenMax.set(window, {
                    page: "+= 1",
                    delay: 1,
                    onComplete: function() {
                        projectIn();
                    }
                })
            } else {
                TweenMax.set(window, {
                    page: 0,
                    delay: 1,
                    onComplete: function() {
                        projectIn();
                    }
                })
            }
        } else if (event.deltaY == 1 && !transitioning) {
            projectOut();
            if (page > 0) {
                TweenMax.set(window, {
                    page: "-= 1",
                    delay: 1,
                    onComplete: function() {
                        projectIn();
                    }
                })
            } else {
                TweenMax.set(window, {
                    page: projects - 1,
                    delay: 1,
                    onComplete: function() {
                        projectIn();
                    }
                })
            }
        }

        if (tutorial) {
            TweenMax.set(window, {
                introText: "Marvelous! I Better Learn From You",
                onComplete: textChange,
                delay: 1
            })
            TweenMax.set(window, {
                introText: "I'll stop bothering you now, enjoy my projects by clicking on Discover",
                onComplete: textChange,
                delay: 4
            })
            TweenMax.set(window, {
                introText: "Adiós!",
                onComplete: textChange,
                delay: 9
            })
            TweenMax.set(window, {
                introText: "",
                onComplete: textChange,
                delay: 11
            })
            tutorial = false;
        }
    } else if (studio) {
        if (event.deltaY == -1 && !transitioning) {
            if (studioScene < scenes - 1) {
                TweenMax.set(window, {
                    transitioning: true,
                    scrolling: true,
                    studioScene: "+=1"
                })
                TweenMax.set(window, {
                    transitioning: false,
                    scrolling: false,
                    delay: 0.5
                })
                parallaxEnd();
            } else {
                transitioning = true;
                TweenMax.to(".studio-next", 0.5, {
                    x: -nextLinkW,
                    className: "+=complete"
                })
                TweenMax.set(".studio-next .progress", {
                    width: 0,
                    left: "100%"
                })
                TweenMax.set(".close", {
                    className: "-=active"
                })
                TweenMax.to(".studio-next .progress", 1.5, {
                    width: "100%",
                    left: 0,
                    onComplete: function() {
                        studioScene += 1;
                        transitioning = false;
                        parallaxEnd();
                    }
                })
                $(".scene").each(function(i, el) {
                    if (i == scenes - 1) {
                        TweenMax.to($(el), 0.5, {
                            x: -200,
                            autoAlpha: 0.1,
                        })
                    }
                })
            }
        } else if (event.deltaY == 1 && !transitioning) {
            if (studioScene > 0) {
                TweenMax.set(window, {
                    transitioning: true,
                    scrolling: true,
                    studioScene: "-=1"
                })
                TweenMax.set(window, {
                    transitioning: false,
                    scrolling: false,
                    delay: 0.5
                })
                parallaxEnd();
            }
        }

        if (videoPlaying) {
            videoStop();
            videoPlaying = false;
        }
    }
})

// DOM creation and manipulation
function projectConstruction() {
    $(".models canvas").wrap("<div class='project-link'>");

    $(".project").each(function(i, el) {
        $(".project-link:nth-of-type("+(i+1)+")")
        .append("<span>"+('0' + (i+1)).slice(-2)+"</small>")
        .append("<h2>"+$(el).find("h1").text()+"</h2>")
        .append("<small>"+$(el).data("description")+"</small>")
        .prepend("<svg class='frame' fill='transparent' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><circle cx='100' cy='100' r='100'/></svg>")
        .addClass($(el).data("name"));
    })

    for ( i = 0; i < projects; i++) {
        $(".circle-progress-bullets").prepend("<div class='bullet-project'><span></span></div>");
    }

    $(".circle-progress-bullets .bullet-project").each(function(i, el) {
        TweenMax.set($(el), { rotation: 360 / projects * i })
    })

    fractureText();
}

function fractureText() {
    if (studio && !about) {
        $(".project-content .fractured > span").html(function(index, html) {
            return html.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="word">$2</span>')
        });
        $(".project-content .fractured .word").html(function(index, html) {
            return html.replace(/\S/g, '<span class="letter">$&</span>');
        });
        $(".intro h1").each(function(i, el) {
            $(el).prepend("<small>"+('0' + (page + 1)).slice(-2)+"</small>")
        })
    } else {
        $(".fractured > span, a.fractured > span").html(function(index, html) {
            return html.replace(/\S/g, '<span>$&</span>');
        });
    }
}

function sideText() {
    TweenMax.to(".line", 0.5, {
        height: "0%",
        top: "100%"
    })
    TweenMax.to(".counter span", 0.5, {
        marginBottom: -45,
        delay: 0.5,
    })
    TweenMax.set(".line", {
        top: 0,
        delay: 1
    })
    TweenMax.to(".line", 0.5, {
        ease: Elastic.easeOut.config(1, 1),
        height: "100%",
        delay: 1
    })
    TweenMax.set(".counter span", {
        marginBottom: 45,
        delay: 1
    })
    TweenMax.staggerTo(".counter span", 0.5, {
        ease: Elastic.easeOut.config(1, 1),
        marginBottom: 0,
        delay: 1.5,
    }, 0.03)
}

function fireworks() {
    TweenMax.set(".fireworks-plane", {
        autoAlpha: 1,
    })
    TweenMax.set(".firework-1", {
        strokeDashoffset: -358,
        strokeDasharray: "0, 10000",
        scale: 1
    })
    TweenMax.staggerTo(".firework-1", 0.25, {
        ease: Power4.easeOut,
        strokeDasharray: "100, 10000"
    }, 0.2)
    TweenMax.staggerTo(".firework-1", 0.25, {
        ease: Power4.easeOut,
        strokeDasharray: "0, 10000",
        delay: 0.25
    }, 0.2)
    TweenMax.staggerTo(".firework-1", 0.83, {
        ease: Power4.easeOut,
        strokeDashoffset: 100,
        scale: 0
    }, 0.2)
    TweenMax.set(".firework-2 span span", {
        height: 0,
        bottom: 0
    })
    TweenMax.to(".firework-2 span span", 0.5, {
        height: 20,
        delay: 0.5
    })
    TweenMax.to(".firework-2 span span", 0.5, {
        height: 0,
        bottom: 20,
        delay: 0.8,
    })
}

// Phone / desktop pointer position
$(document).on("touchstart touchmove", function(e) { mousetracking = false; })
$("body").on("touchstart", function(e) { mousetracking = false; mouseThen = e.originalEvent.touches[0].clientX, mouseYThen = e.originalEvent.touches[0].clientY;
}).on("mousedown", function(e) { mouseThen = e.clientX; mouseYThen = e.clientY
}).on("touchmove", function(e) { mousetracking = false; if (swiping) { mouseX = e.originalEvent.touches[0].clientX; mouseY = e.originalEvent.touches[0].clientY; }
}).on("mousemove", function(e) { mousetracking = true; mouseX = e.clientX; mouseY = e.clientY; })

$("body").on("mousedown touchstart", function(e) {
    if (!mouseInVideo) {
        TweenMax.to(".mouse-track .outer-circle", 0.5, {
            strokeWidth: 6,
            height: 6,
            width: 6,
        })
    }
    if (!transitioning && !intro) {
        menuCDSwitch = true;
        menuCountdown();
        swiping = true;
    }
    if (intro) {
        menuCDSwitch = true;
        introCountdown();
        swiping = true;
    }

}).on("mousemove touchmove", function(e) {
    e.preventDefault();
    if (swiping && !transitioning) {
        distanceRaw = mouseThen - mouseX;
        distance = Math.abs(distanceRaw);
        swipe();
        if (mouseThen > mouseX) {
            movingLeft = true;
            movingRight = false;
        } else if (mouseX > mouseThen) {
            movingLeft = false;
            movingRight = true;
        }

        if (mouseYThen > mouseY) {
            movingDown = true;
            movingUp = false;
        } else if (mouseY > mouseYThen) {
            movingDown = false;
            movingUp = true;
        }
    }
    mouseTrack();
}).on("mouseup touchend", function(e) {
    swiping = false;
    swipeCancel();
    distance = 0;
})

$("a.fractured").each(function(i, el) {
    $(el).on("mouseenter", function() {
        TweenMax.staggerTo($(el).find("span span"), 0.2, {
            x: 5,
            y: 5,
            autoAlpha: 0
        }, 0.05)
        TweenMax.staggerTo($(el).find("span span"), 0, {
            x: -5,
            y: -5,
            autoAlpha: 0,
            delay: 0.2,
        }, 0.05)
        TweenMax.staggerTo($(el).find("span span"), 0.2, {
            x: 0,
            y: 0,
            autoAlpha: 1,
            delay: 0.2
        }, 0.05)
        TweenMax.to(".mouse-track .outer-circle", 0.5, {
            height: 80,
            width: 80,
            strokeWidth: 2,
            autoAlpha: 0
        })
        TweenMax.set(".countdown", {
            autoAlpha: 0
        })
        TweenMax.to(".mouse-track .inner-circle", 0.5, {
            autoAlpha: 0
        })
    }).on("mouseleave", function() {
        TweenMax.to(".mouse-track .outer-circle", 0.5, {
            height: 18,
            width: 18,
            strokeWidth: 2,
            autoAlpha: 1
        })
        TweenMax.to(".mouse-track .inner-circle", 0.5, {
            autoAlpha: 0.6
        })
    })
})

$(".magnetic").on("mouseenter", function(e) {
    if (studio || about) {
        TweenMax.staggerTo(".close a span", 0.2, {
            x: 5,
            y: 5,
            autoAlpha: 0
        }, 0.05)
        TweenMax.staggerTo(".close a span", 0, {
            x: -5,
            y: -5,
            autoAlpha: 0,
            delay: 0.2,
        }, 0.05)
        TweenMax.staggerTo(".close a span", 0.2, {
            x: 0,
            y: 0,
            autoAlpha: 1,
            delay: 0.2
        }, 0.05)
    } else if (home) {
        TweenMax.staggerTo(".open a span", 0.2, {
            x: 5,
            y: 5,
            autoAlpha: 0
        }, 0.05)
        TweenMax.staggerTo(".open a span", 0, {
            x: -5,
            y: -5,
            autoAlpha: 0,
            delay: 0.2,
        }, 0.05)
        TweenMax.staggerTo(".open a span", 0.2, {
            x: 0,
            y: 0,
            autoAlpha: 1,
            delay: 0.2
        }, 0.05)
    }
}).on("mousemove", function(e) {
    if (studio || about) {
        xPlus = 21;
    } else if (home) {
        xPlus = 0;
    }
    if (!transitioning) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        TweenMax.to($(".magnetic div > span"), 0.5, {
            ease: Power3.easeOut,
            right: winW - mouseX - 85 + xPlus,
            bottom: winH - mouseY - 11,
            scale: 1.3
        })
        TweenMax.to($(".magnetic > div > a"), 0.5, {
            ease: Power2.easeOut,
            right: winW - mouseX - 85 + xPlus,
            bottom: winH - mouseY - 11
        })
        TweenMax.to(".mouse-track .outer-circle", 0.5, {
            strokeWidth: 8,
            height: 40,
            width: 40,
            autoAlpha: 0.2,
        })
        TweenMax.to(".mouse-track .inner-circle", 0.5, {
            autoAlpha: 0,
        })
    }
}).on("mouseleave", function() {
    TweenMax.to(".magnetic div > span", 1, {
        ease: Elastic.easeOut.config(1, 0.75),
        right: magneticMargin.r,
        bottom: magneticMargin.b,
        scale: 1
    })
    TweenMax.to(".magnetic > div > a", 1, {
        ease: Elastic.easeOut.config(1, 0.75),
        right: magneticMargin.r,
        bottom: magneticMargin.b
    })
    TweenMax.to(".mouse-track .outer-circle", 0.5, {
        strokeWidth: 2,
        height: 20,
        width: 20,
        autoAlpha: 1,
    })
    TweenMax.to(".mouse-track .inner-circle", 0.5, {
        autoAlpha: 0.6,
    })
}).on("mousedown touchstart", function() {
    if (home && !transitioning) {
        studioIn();
    } else if (studio && !transitioning) {
        studioOut();
    } else if (about && !transitioning) {
        aboutOut();
    }
})

function swipe() {
    if (distance > 3) { menuCDSwitch = false; }
    if (home && !transitioning) {
        TweenMax.to(".circle-trail", 0.5, {
            autoAlpha: 1
        })
        TweenMax.set(".circle-progress-bullets .bullet span", {
            autoAlpha: 1
        })
        TweenMax.to(".circle-progress-bullets .bullet span", 0.5, {
            scale: 1
        })
        TweenMax.set(".circle-progress", {
            rotation: page * 360 / projects - 90,
            autoAlpha: 1
        })
        if (movingLeft && distance > 3) {
            TweenMax.to(".mouse-track .arrow-left", 0.5, {
                autoAlpha: 1,
                x: -5
            })
            TweenMax.to(".mouse-track .arrow-right", 0.5, {
                autoAlpha: 0,
                x: 0
            })
        } else if (movingRight && distance > 3) {
            TweenMax.to(".mouse-track .arrow-right", 0.5, {
                autoAlpha: 1,
                x: 5
            })
            TweenMax.to(".mouse-track .arrow-left", 0.5, {
                autoAlpha: 0,
                x: 0
            })
        }
        if (movingLeft && distance <= swipeDistance) {
            $(".bullet-project").each(function(i, el) {
                if (i == page + 1) {
                    TweenMax.set($(el).find("span"), {
                        scale: 0 + distance * 1.5 / swipeDistance,
                    })
                }
                if (page == projects - 1 && i == 0) {
                    TweenMax.set($(el).find("span"), {
                        scale: 0 + distance * 1.5 / swipeDistance,
                    })
                }
                if (i == page) {
                    TweenMax.to($(el).find("span"), 0.3, {
                        scale: 1.5,
                    })
                }
            })
            TweenMax.set(".circle-progress", {
                strokeDashoffset: 629 - distance * 629 / projects / swipeDistance,
            })
            TweenMax.set(".bullet", {
                rotation: page * 360 / projects + 360 / projects / swipeDistance * distance
            })
        } else if (movingLeft && distance > swipeDistance) {
            $(".bullet-project").each(function(i, el) {
                if (i == page + 1) {
                    TweenMax.to($(el).find("span"), 0.3, {
                        scale: 1.5,
                    })
                }
                if (page == projects - 1 && i == 0) {
                    TweenMax.to($(el).find("span"), 0.3, {
                        scale: 1.5,
                    })
                }
            })
            TweenMax.to(".circle-progress", 0.3, {
                strokeDashoffset: 629 - 629 / projects
            })
            TweenMax.to(".bullet", 0.3, {
                rotation: page * 360 / projects + 360 / projects
            })
        }
        if (movingRight && distance <= swipeDistance) {
            $(".bullet-project").each(function(i, el) {
                if (i == page - 1) {
                    TweenMax.set($(el).find("span"), {
                        scale: 0 + distance * 1.5 / swipeDistance,
                    })
                }
                if (page == 0 && i == projects - 1) {
                    TweenMax.set($(el).find("span"), {
                        scale: 0 + distance * 1.5 / swipeDistance,
                    })
                }
                if (i == page) {
                    TweenMax.to($(el).find("span"), 0.3, {
                        scale: 1.5,
                    })
                }
            })
            TweenMax.set(".circle-progress", {
                strokeDashoffset: 629 + distance * 629 / projects / swipeDistance,
            })
            TweenMax.set(".bullet", {
                rotation: page * 360 / projects - 360 / projects / swipeDistance * distance
            })
        } else if (movingRight && distance > swipeDistance) {
            $(".bullet-project").each(function(i, el) {
                if (i == page - 1) {
                    TweenMax.to($(el).find("span"), 0.3, {
                        scale: 1.5,
                    })
                }
                if (page == 0 && i == projects - 1) {
                    TweenMax.to($(el).find("span"), 0.3, {
                        scale: 1.5,
                    })
                }
            })
            TweenMax.to(".circle-progress", 0.3, {
                strokeDashoffset: 629 + 629 / projects
            })
            TweenMax.to(".bullet", 0.3, {
                rotation: page * 360 / projects - 360 / projects
            })
        }
        $(".project-link").each(function(i, el) {
            if (page == i) {
                if (distance <= swipeDistance) {
                    TweenMax.set($(el).find(".frame"), {
                        scale: 1 - distance * (2 / 3 / swipeDistance),
                        strokeWidth: 85 + 115 / swipeDistance * distance
                    })
                    TweenMax.set($(el).find("canvas"), {
                        scale: 1 + distance * (0.2 / swipeDistance)
                    })
                } else {
                    TweenMax.to($(el).find(".frame"), 0.5, {
                        scale: 1 / 3,
                        strokeWidth: 200
                    })
                    TweenMax.to($(el).find("canvas"), 0.5, {
                        scale: 1.2
                    })
                }
            }
        })
        $(".project").each(function(i, el) {
            if (page == i) {
                TweenMax.to($(el), 0.5, {
                    autoAlpha: 0
                })
            }
        })
    }
    if (menu && !transitioning) {
        $(".project-link").each(function(i, el) {
            var leftVal = i * 540 - mouseX * ((projects * 540) - winW + 200) / winW;
            TweenMax.to($(el).find("canvas"), 0.5, {
                ease: Power4.easeOut,
                x: leftVal
            })
            TweenMax.to($(el).find(".frame"), 0.5, {
                ease: Power2.easeOut,
                x: leftVal
            })
            TweenMax.to($(el).find("h2"), 0.5, {
                ease: Power1.easeOut,
                x: leftVal
            })
            TweenMax.to($(el).find("span"), 0.5, {
                ease: Power1.easeOut,
                x: leftVal
            })
            TweenMax.to($(el).find("small"), 0.5, {
                ease: Power1.easeOut,
                x: leftVal
            })
            menuPage = mouseX * projects / winW - 0.5;

            if (i == Math.round(menuPage)) {
                TweenMax.to($(el).find(".frame"), 0.5, {
                    scale: 0.6
                })
                TweenMax.to($(el).find("small"), 0.5, {
                    autoAlpha: 1,
                    marginTop: 5
                })
            } else {
                TweenMax.to($(el).find(".frame"), 0.5, {
                    scale: 0.4
                })
                TweenMax.to($(el).find("small"), 0.5, {
                    autoAlpha: 0,
                    marginTop: 25
                })
            }
        })
    }
    if (studio && !transitioning) {
        parallax();
    }
    if (about && aboutScroll && !transitioning) {
        distance = mouseYThen - mouseY;

        aboutPos = -distStack -distance;

        if (splitH - aboutPos <= aboutH + distanceBounce && aboutPos < distanceBounce) {
            TweenMax.to(".about-text", 0.5, {
                y: aboutPos
            })
        }
    }
}

function mouseTrack() {
    if (mousetracking) {
        TweenMax.set(".mouse-track", {
            autoAlpha: 1
        })
        TweenMax.to(".mouse-track .outer-circle", 0.2, {
            left: mouseX,
            top: mouseY
        })
        TweenMax.to(".mouse-track .inner-circle", 0.4, {
            left: mouseX,
            top: mouseY
        })
        TweenMax.to(".mouse-track .arrow-left", 0.2, {
            left: mouseX,
            top: mouseY
        })
        TweenMax.to(".mouse-track .arrow-right", 0.2, {
            left: mouseX,
            top: mouseY
        })
        TweenMax.to(".mouse-track .play", 0.35, {
            left: mouseX,
            top: mouseY,
        })
        TweenMax.to(".mouse-track .stop", 0.35, {
            left: mouseX,
            top: mouseY
        })
    }
}

function mouseCountdown() {
    if (!mouseTransition) {
        TweenMax.to(".mouse-track .outer-circle", 2, {
            ease: Back.easeOut.config(3),
            strokeWidth: 2,
            height: 40,
            width: 40,
        })
        TweenMax.set(".countdown", {
            autoAlpha: 1,
            delay: 0.5
        })
        TweenMax.killTweensOf(window);
        TweenMax.set(window, {
            introText: "Keep On Holding..",
            onComplete: textChange,
            delay: 1
        })
        TweenMax.to(".countdown", 1.5, {
            strokeDashoffset: 0,
            delay: 0.5,
            onComplete: function() {
                tutorial = true;
                menuIn();
                TweenMax.to(".introduction", 0.5, {
                    autoAlpha: 0,
                    delay: 0.5
                })
                TweenMax.set(window, {
                    introText: "",
                    onComplete: textChange,
                    delay: 1
                })
                menuCDSwitch = false;
                menuCD = 0;
                intro = false;
                TweenMax.set(".intro-text", {
                    className: "+=tutorial",
                    delay: 1.5
                })
                TweenMax.set(window, {
                    introText: "Release over any event",
                    onComplete: textChange,
                    delay: 2
                })
            }
        })
    }
}

function introCountdown() {
    if (menuCDSwitch && intro) {
        menuCD += 0.01;
        requestAnimationFrame(introCountdown);
        if (menuCD > 0.5 && menuCD < 1.5) {
            mouseCountdown();
            mouseTransition = true;
        }
    } else if (!menuCDSwitch && intro) {
        menuCD = 0;
        if (distance > 3 && !mouseTransition) {
            TweenMax.killTweensOf(window);
            TweenMax.set(window, {
                introText: "Seems like you are moving too much..",
                fails: "+=1",
                onComplete: textChange
            })
            TweenMax.set(window, {
                introText: "Press and hold anywhere to begin a tutorial",
                delay: 3,
                onComplete: textChange
            })
        } else if (distance < 3) {
            TweenMax.killTweensOf(window);
            TweenMax.set(window, {
                introText: "Keep On Holding..",
                fails: "+=1",
                onComplete: textChange
            })
            TweenMax.set(window, {
                introText: "Press and hold anywhere to begin a tutorial",
                delay: 3,
                onComplete: function() {
                    textChange();
                }
            })
        }
    }
}

function menuCountdown() {
    if (menuCDSwitch && !mouseInVideo && !about && !intro) {
        menuCD += 0.01;
        requestAnimationFrame(menuCountdown);
        if (menuCD > 0.5 && menuCD < 1.5) {
            menuCDSwitch = false;
            swiping = false;
            TweenMax.to(".mouse-track .outer-circle", 2, {
                ease: Back.easeOut.config(3),
                strokeWidth: 2,
                height: 40,
                width: 40,
            })
            TweenMax.set(".countdown", {
                autoAlpha: 1
            })
            TweenMax.to(".countdown", 1, {
                strokeDashoffset: 0,
                delay: 0.5,
                onComplete: function() {
                    menuIn();
                }
            })
        }
    } else if (!menuCDSwitch && !intro && !mouseInVideo && !about) {
        menuCD = 0;
    }
}

function swipeCancel() {
    TweenMax.to(".mouse-track .arrow-left, .mouse-track .arrow-right", 0.5, {
        autoAlpha: 0,
        x: 0
    })
    if (!mouseInVideo) {
        TweenMax.to(".mouse-track .outer-circle", 0.5, {
            strokeWidth: 2,
            height: 18,
            width: 18,
        })
        TweenMax.to(".mouse-track .inner-circle", 0.5, {
            strokeWidth: 2,
            height: 2,
            width: 2,
        })
    }
    TweenMax.killTweensOf(".countdown");
    TweenMax.to(".countdown", 0.5, {
        strokeDashoffset: 125,
        onComplete: function() {
            TweenMax.set(".countdown", {
                autoAlpha: 0
            })
        }
    })
    menuCDSwitch = false;
    mouseTransition = false;
    TweenMax.to(".mouse-track .arrow-left, .mouse-track .arrow-right", 0.5, {
        autoAlpha: 0,
        x: 0
    })
    if (home && !transitioning) {
        TweenMax.to(".circle-trail", 0.5, {
            autoAlpha: 0
        })
        TweenMax.to(".bullet-project span", 0.5, {
            scale: 0,
            delay: 0.5
        })
        TweenMax.to(".bullet span", 0.5, {
            scale: 0,
            delay: 0.5
        })
        if (distance < swipeDistance) {
            TweenMax.to(".circle-progress", 0.5, {
                strokeDashoffset: 629,
            })
            TweenMax.set(".circle-progress", {
                autoAlpha: 0,
                delay: 0.5
            })
            TweenMax.to(".bullet", 0.5, {
                rotation: page * 360 / projects
            })
            $(".project-link").each(function(i, el) {
                if (page == i && !transitioning) {
                    TweenMax.to($(el).find(".frame"), 1, {
                        ease: Elastic.easeOut.config(1, 0.75),
                        scale: 1,
                        strokeWidth: 85,
                    })
                    TweenMax.to($(el).find("canvas"), 2, {
                        ease: Elastic.easeOut.config(1, 0.75),
                        scale: 1
                    })
                }
            })
            $(".project").each(function(i, el) {
                if (page == i) {
                    TweenMax.to($(el), 0.5, {
                        autoAlpha: 1
                    })
                }
            })
        }

        if (distance >= swipeDistance && movingLeft) {
            projectOut();
            if (page < projects - 1) {
                TweenMax.set(window, {
                    page: "+= 1",
                    delay: 1,
                    onComplete: function() {
                        projectIn();
                    }
                })
                TweenMax.to(".circle-progress", 0.5, {
                    rotation: (360 / projects * (page + 1)) - 90,
                    strokeDashoffset: 629,
                })
                TweenMax.set(".circle-progress", {
                    autoAlpha: 0,
                    delay: 0.5
                })
            } else if (page == projects - 1) {
                TweenMax.set(window, {
                    page: 0,
                    delay: 1,
                    onComplete: function() {
                        projectIn();
                    }
                })
                TweenMax.to(".circle-progress", 0.5, {
                    rotation: 270,
                    strokeDashoffset: 629,
                })
            }
        }
        if (distance >= swipeDistance && movingRight) {
            projectOut();
            if (page > 0) {
                TweenMax.set(window, {
                    page: "-= 1",
                    delay: 1,
                    onComplete: function() {
                        projectIn();
                    }
                })
                TweenMax.to(".circle-progress", 0.5, {
                    rotation: (360 / projects * (page - 1)) - 90,
                    strokeDashoffset: 629,
                })
            } else if (page == 0) {
                TweenMax.set(window, {
                    page: projects - 1,
                    delay: 1,
                    onComplete: function() {
                        projectIn();
                    }
                })
                TweenMax.to(".circle-progress", 0.5, {
                    rotation: - 90 - 360 / projects,
                    strokeDashoffset: 629,
                })
                TweenMax.to(".circle-progress-bullets .bullet", 0.5, {
                    rotation: 0 - 360 / projects
                })
            }
        }
    }
    if (menu) {
        if (transitioning) {
            TweenMax.killAll();
            menuOut();
            transitioning = false;
        } else {
            page = Math.round(menuPage);
            TweenMax.killAll();
            menuOut();
        }
    }
    if (about && !transitioning && aboutScroll) {
        if (splitH - aboutPos >= aboutH) {
            distStack = aboutH - splitH;
            TweenMax.to(".about-text", 0.5, {
                y: splitH - aboutH
            })
        } else if (aboutPos > 0) {
            distStack = 0;
            TweenMax.to(".about-text", 0.5, {
                y: 0
            })
        } else {
            distStack += distance;
            TweenMax.to(".about-text", 0.5, {
                y: aboutPos
            })
        }
    }
    if (studio && !transitioning) {
        parallaxEnd()
    }
}

function projectIn() {
    home = true;
    studio = false;
    mouseRotation = true;

    responsiveness();
    renderColoring();
    setTimeout(function () {
        $(".counter .page").html(page + 1);
        $(".counter .total").html(projects);
    }, 1000);
    sideText();
    TweenMax.set(window, {
        transitioning: false,
        delay: 0.3
    })
    TweenMax.to(".line-aux", 0.5, {
        autoAlpha: 1,
        delay: 1
    })
    TweenMax.to(".mobile-menu", 0.5, {
        autoAlpha: 1,
        delay: 1
    })
    TweenMax.staggerTo(".menu-top a", 0.5, {
        autoAlpha: 1,
        y: 0,
        delay: 1
    }, 0.2)
    TweenMax.set(".discover", {
        autoAlpha: 1
    })
    TweenMax.set(".open", {
        className: "+=active"
    })
    TweenMax.set(".close", {
        className: "-=active"
    })
    TweenMax.set(window, {
        renderRotation: -12.5,
        renderIncrement: 0,
        mouseX: 0,
        mouseY: 0,
    })
    TweenMax.to(window, 2, {
        ease: Circ.easeOut,
        renderRotation: 0
    })
    TweenMax.staggerTo(".open a span", 0.2, {
        x: 0,
        y: 0,
        autoAlpha: 1,
        delay: 1
    }, 0.05)
    $(".project-link").each(function(i, el) {
        if (page == i) {
            TweenMax.set(el, {
                autoAlpha: 1
            })
            TweenMax.set($(el).find("canvas"), {
                autoAlpha: 0,
                scale: 0,
                marginTop: 0,
                marginLeft: 0
            })
            TweenMax.to($(el).find("canvas"), 2, {
                ease: Elastic.easeOut.config(1, 0.75),
                autoAlpha: 1,
                scale: 1
            })
            TweenMax.set($(el).find(".frame"), {
                scale: 1 / 3,
                marginTop: 0,
                marginLeft: 0,
                autoAlpha: 1,
                strokeWidth: 200
            })
            TweenMax.to($(el).find(".frame"), 1, {
                ease: Elastic.easeOut.config(1, 0.75),
                scale: 1,
                strokeWidth: 85
            })
        } else {
            TweenMax.set(el, {
                autoAlpha: 0
            })
        }
    })
    $(".project").each(function(i, el) {
        if (page == i) {
            var currentProject = $(el).data("name");
            TweenMax.set("body", {
                className: currentProject
            })
            TweenMax.to($(el), 0.5, {
                autoAlpha: 1
            })

            $(el).find(".fractured").each(function(i, el) {
                TweenMax.set($(el), {
                    x: -150,
                    rotationX: 0,
                    rotationY: 0,
                    scale: 0.6
                })
                TweenMax.to($(el), 0.5, {
                    rotationX: 0,
                    rotationY: 0,
                    scale: 1
                })
                TweenMax.to($(el), 3, {
                    ease: Power3.easeOut,
                    x: 0,
                    scale: 1
                })
                TweenMax.set($(el).find("span span"), {
                    rotationX: 0,
                    autoAlpha: 0,
                    scale: 0.6,
                    y: -20,
                    x: 0,
                })
                TweenMax.staggerTo($(el).find("span span"), 1.2, {
                    ease: Power3.easeOut,
                    rotationX: 0,
                    scale: 1,
                    autoAlpha: 1,
                    y: 0,
                }, 0.05)
            })

            $(el).find(".project-details").each(function(i, el) {
                TweenMax.set($(el), {
                    x: -100,
                    rotationX: 0,
                    rotationY: -0,
                    scale: 0.6
                })
                TweenMax.to($(el), 5, {
                    x: 0,
                    ease: Power3.easeOut,
                    scale: 1
                })
                TweenMax.set($(el).find("li"), {
                    top: -20,
                    autoAlpha: 0,
                    y: 0,
                    x: 0,
                    scale: 1
                })
                TweenMax.staggerTo($(el).find("li"), 0.5, {
                    top: 0,
                    autoAlpha: 1,
                    delay: 0.5
                }, 0.1)
            })
        }
    })
    TweenMax.set(".gradient", {
        width: winW,
        height: winH,
        top: 0,
        left: 0
    })
    TweenMax.to(".gradient", 0.5, {
        autoAlpha: 1,
    })
    TweenMax.set(".models", {
        width: "100%"
    })
    TweenMax.to(".scroll-position", 0.5, {
        autoAlpha: 0,
    })
    TweenMax.to(".scroll-position span", 0.5, {
        width: 0,
        delay: 0.5
    })
}

function projectOut() {
    transitioning = true;
    if (tutorial) {
        TweenMax.set(window, {
            introText: "That's It! ",
            onComplete: textChange,
            delay: 2
        })
        TweenMax.set(window, {
            introText: "YAAAAY! Thank You!!!",
            onComplete: textChange,
            delay: 4
        })
        TweenMax.set(window, {
            introText: "Click Reveal To See Events",
            onComplete: textChange,
            delay: 4
        })
        TweenMax.set(".intro-text", {
            autoAlpha: 0,
            delay: 12.5
        })
        TweenMax.set(window, {
            introText: "",
            onComplete: textChange,
            delay: 12
        })
        tutorial = false;
    }

    $(".project-link").each(function(i, el) {
        if (page == i) {
            TweenMax.to($(el).find("canvas"), 0.5, {
                autoAlpha: 0,
                scale: 0.6
            })
        } else {

        }
    })

    $(".project").each(function(i, el) {
        TweenMax.to($(el), 0.5, {
            autoAlpha: 0
        })
    })

    $(".project-link").each(function(i, el) {
        if (page == i) {
            TweenMax.to($(el).find(".frame"), 0.5, {
                strokeWidth: 200
            })
            TweenMax.to($(el).find(".frame"), 1, {
                ease: Power4.easeOut,
                scale: 0,
                delay: 0.5,
            })
        }
    })
}

function studioIn() {
    home = false;
    transitioning = true;
    if (tutorial) {
        TweenMax.killTweensOf(window);
        TweenMax.set(window, {
            introText: "",
            onComplete: textChange,
        })
        tutorial = false;
    }

    TweenMax.to(".mobile-menu", 0.5, {
        autoAlpha: 0
    })

    TweenMax.set(".open", {
        className: "-=active"
    })
    $(".project").each(function(i, el) {
        if (page == i) {
            currentProject = $(el).data("name");
        }
    })

    TweenMax.to(".gradient", 0.5, {
        top: gradientPadding,
        height: winH - gradientPadding * 2,
        width: winW - gradientPadding * 2,
        left: gradientPadding
    })
    TweenMax.to(".gradient", 1.5, {
        ease: Back.easeOut.config(2),
        width: gradientWidth,
        delay: 0.5
    })
    TweenMax.to(".project", 0.5, {
        autoAlpha: 0
    })
    TweenMax.set("body", {
        className: "studio "+ currentProject,
        delay: 1
    })

    $(".project-link").each(function(i, el) {
        if (page == i) {
            TweenMax.to($(el).find("canvas"), 0.5, {
                scale: 1.4
            })
            TweenMax.to($(el).find("canvas"), 1, {
                ease: Power4.easeOut,
                scale: 0,
                delay: 0.5,
                x: renderCenter
            })
            TweenMax.to($(el).find(".frame"), 0.5, {
                strokeWidth: 200
            })
            TweenMax.to($(el).find(".frame"), 1, {
                ease: Power4.easeOut,
                scale: 0,
                delay: 0.5,
                x: renderCenter
            })
        }
    })

    $("#projectContent").load("projects/" + currentProject + ".html", function() {
        TweenMax.set(window, {
            transitioning: false,
            delay: 1.5,
            onComplete: function() {
                studio = true;
                renderColoring();
                studioFunctions();
            }
        })
        $(".project-link").each(function(i, el) {
            if (page == i) {
                TweenMax.to($(el).find("canvas"), 2, {
                    ease: Elastic.easeOut.config(1, 0.75),
                    scale: 0.8,
                    delay: 1.5
                })
                TweenMax.to($(el).find(".frame"), 1, {
                    ease: Elastic.easeOut.config(1, 0.75),
                    scale: 0.8,
                    strokeWidth: 85,
                    delay: 1.5
                })
            }
        })
    });
}

function studioOut() {
    studio = false;
    $(".studio-next").empty();
    TweenMax.to(".scene", 0.5, {
        autoAlpha: 0,
        onComplete: function() {
            $("#projectContent").empty();
        }
    })
    if (videoPlaying) {
        videoStop();
        videoPlaying = false;
    }
    videoCursor();
    TweenMax.killTweensOf(".line-scroll");
    TweenMax.to(".line-scroll", 0.5, {
        autoAlpha: 0
    })
    TweenMax.to(".gradient", 0.5, {
        width: "100%",
        left: 0,
        top: 0,
        height: winH
    })
    TweenMax.set(".models", {
        width: "100%",
        delay: 1,
    })
    $(".project-link").each(function(i, el) {
        if (page == i) {
            TweenMax.to($(el).find("canvas"), 0.5, {
                x: winW / 2 - 300,
                scale: 0
            })
            TweenMax.to($(el).find(".frame"), 0.5, {
                x: winW / 2 - 300,
                scale: 0.3,
                strokeWidth: 200,
                onComplete: function() {
                    TweenMax.set(".open a span", {
                        x: 5,
                        y: 5,
                        autoAlpha: 0,
                    })
                    TweenMax.to(".top-bar", 0.5, {
                        autoAlpha: 1
                    })
                    projectIn();
                }
            })
        }
    })

}

function studioFunctions() {
    fireworks();
    fractureText();
    responsiveness();
    mouseRotation = false;

    TweenMax.set(window, {
        renderRotation: -12.5,
        renderIncrement: 0,
        mouseX: 0,
        mouseY: 0,
    })
    TweenMax.to(window, 2, {
        ease: Circ.easeOut,
        renderRotation: 0
    })

    studioScene = 0;
    scenes = $(".scene").length;
    introWidth = $(".intro").outerWidth();
    TweenMax.staggerTo(".open a span", 0.2, {
        x: -5,
        y: -5,
        autoAlpha: 0
    }, 0.05)
    TweenMax.set(".close", {
        className: "+=active"
    })
    TweenMax.set(".close a span", {
        x: 5,
        y: 5,
        autoAlpha: 0,
    })
    TweenMax.to(".line-scroll", 0.5, {
        autoAlpha: 1,
        delay: 1
    })
    TweenMax.to(".scroll-position", 0.5, {
        autoAlpha: 1,
        delay: 1
    })
    TweenMax.set(".intro h1 small", {
        scale: 0
    })
    TweenMax.to(".intro h1 small", 1, {
        ease: Back.easeOut.config(3),
        scale: 1,
        delay: 0.6
    })
    TweenMax.staggerTo(".close a span", 0.2, {
        x: 0,
        y: 0,
        autoAlpha: 1,
        delay: 1
    }, 0.05)
    $(".scene").each(function(i, el) {
        TweenMax.set($(el), {
            y: "-50%"
        })
        TweenMax.set($(el), {
            autoAlpha: 0
        })
        if (studioScene == i) {
            TweenMax.set($(el), {
                x: -200
            })
            TweenMax.to($(el), 2, {
                autoAlpha: 1,
                x: 0
            })
            TweenMax.set($(el).find(".fractured .letter"), {
                autoAlpha: 0,
                scale: 1.3,
                x: 50,
            })
            TweenMax.staggerTo($(el).find(".fractured .letter"), 1, {
                autoAlpha: 1,
                rotationY: 0,
                scale: 1,
                x: 0,
            }, 0.05)
        } else if (studioScene != i && i == 1) {
            TweenMax.set($(el), {
                x: winW
            })
        }

        if (i > 1) {
            TweenMax.set($(el), {
                autoAlpha: 1,
                x: winW,
            })
        }
        if (studioScene == 0 && i == 1) {
            TweenMax.set($(el), {
                marginLeft: -200,
                x: winW - sceneReveal,
            })
            TweenMax.to($(el), 2, {
                marginLeft: 0,
                autoAlpha: 1,
                delay: 0.5
            })
            TweenMax.set($(el).find("> div"), {
                height: winH - 250
            })
        }
    })
    $(".project").each(function(i, el) {
        var currentProject = $(el).data("name").replace("-", ' ');
        if (page == i - 1 && page < projects - 1) {
            $(".studio-next").append("<div class='button'></div><div class='progress'></div><small>Next Destination</small><h4>"+currentProject+"</h4>")
        } else if (page == projects - 1 && i == 0) {
            $(".studio-next").append("<div class='button'></div><div class='progress'></div><small>Next Destination</small><h4>"+currentProject+"</h4>")
        }
    })
    video();
}

var inner = $(".inner-circle"),
    outer = $(".outer-circle")
;

function video() {
    $(".video").on("mouseenter", function() {
        if (studio) {
            mouseInVideo = true;
            videoCursor();
        }
    }).on("mouseleave", function() {
        mouseInVideo = false;
        setTimeout(function () {
            videoCursor();
        }, 100);
    })

    $(".scene .video").each(function(i, el) {
        $(el).on("mouseup touchend", function() {
            if (!videoPlaying && distance < 3 && !transitioning) {
                transitioning = true;
                videoPlaying = true;
                setTimeout(function () {
                    transitioning = false;
                }, 400);
                videoCursor();
                videoPlay();
            } else if (videoPlaying && distance < 3 && !transitioning) {
                transitioning = true;
                videoPlaying = false;
                setTimeout(function () {
                    transitioning = false;
                }, 400);
                videoCursor();
                videoStop();
            }
        })
    })
}

function videoPlay() {
    $(".scene .video").each(function(i, el) {
        var parentIndex = $(el).parents(".scene").index();
        var videoData = $(el).attr("data-video");
        if (studioScene == parentIndex) {
            TweenMax.to($(el).find("img"), 0.5, {
                autoAlpha: 0,
                onComplete: function() {
                    $(el).append(
                        '<div class="video-wrap">'
                            +'<iframe src="https://player.vimeo.com/video/'+videoData+'?autoplay=1&muted=1&loop=1&color=3dde6e&title=0&byline=0&portrait=0" width="100%" height="100%" frameborder="0"</iframe>'
                        +'</div>'
                    );
                }
            })
        }
    })
}


function videoStop() {
    $(".scene .video").each(function(i, el) {
        var parentIndex = $(el).parents(".scene").index();
        TweenMax.to($(el).find("iframe"), 0.5, {
            autoAlpha: 0,
            onComplete: function() {
                TweenMax.to($(el).find("img"), 0.5, {
                    autoAlpha: 1,
                })
                $(el).find(".video-wrap").remove();
            }
        })
    })
}

function videoCursor() {
    if (mouseInVideo) {
        if (videoPlaying) {
            TweenMax.killTweensOf(".play");
            TweenMax.killTweensOf(outer);
            TweenMax.to(inner, 0.5, {
                height: 30,
                width: 30,
                strokeWidth: 30
            })
            TweenMax.to(outer, 0.5, {
                height: 0,
                width: 0,
                strokeWidth: 2
            })
            TweenMax.to(".play", 0.5, {
                scale: 0,
            })
            TweenMax.to(".stop", 0.5, {
                scale: 0.8,
                delay: 0.2
            })
        } else {
            TweenMax.killTweensOf(".play");
            TweenMax.killTweensOf(".stop");
            TweenMax.killTweensOf(outer);
            TweenMax.to(inner, 0.5, {
                height: 30,
                width: 30,
                strokeWidth: 30
            })
            TweenMax.to(outer, 0.5, {
                height: 0,
                width: 0,
                strokeWidth: 2
            })
            TweenMax.to(".stop", 0.5, {
                scale: 0,
            })
            TweenMax.to(".play", 0.5, {
                scale: 0.8,
                delay: 0.2
            })
        }
    } else {
        TweenMax.killTweensOf(".play");
        TweenMax.killTweensOf(".stop");
        TweenMax.to(inner, 0.5, {
            height: 2,
            width: 2,
            strokeWidth: 2
        })
        TweenMax.set(".countdown", {
            strokeDashoffset: 125,
            delay: 0.5
        })
        TweenMax.to(".countdown", 0.5, {
            autoAlpha: 0,
        })
        TweenMax.to(outer, 0.5, {
            height: 18,
            width: 18,
            strokeWidth: 2
        })
        TweenMax.to(".play", 0.5, {
            scale: 0,
        })
        TweenMax.to(".stop", 0.5, {
            scale: 0,
        })
    }
}

$(".contact-link").on('click', function (event) {
    window.location.href = "mailto:hello@carlosgnotario.com";
});

$(".skip").on("mousedown touchend", function(i, el) {
    if (intro) {
        TweenMax.killTweensOf(window);
        if (fails > 2) {
            TweenMax.set(window, {
                introText: "So much to learn, I know its annoying. :(",
                onComplete: textChange
            })
            TweenMax.set(window, {
                introText: "",
                onComplete: textChange,
                delay: 2.5
            })
            TweenMax.set(".intro-text", {
                autoAlpha: 0,
                delay: 3
            })
        } else {
            TweenMax.set(window, {
                introText: "Wohooo! Seems like you know how to guide me xD",
                onComplete: textChange
            })
            TweenMax.set(window, {
                introText: "",
                onComplete: textChange,
                delay: 2.5
            })
            TweenMax.set(".intro-text", {
                autoAlpha: 0,
                delay: 3
            })
        }
        TweenMax.to(".introduction", 0.5, {
            autoAlpha: 0,
            delay: 2.5,
            onComplete: projectIn
        })
        intro = false;
    }
})

if (disabledIntro == true) {
    TweenMax.killTweensOf(window);
    TweenMax.set(window, {
        introText: "Wohooo! Seems like you know how to guide me xD",
        onComplete: textChange
    })
    TweenMax.set(window, {
        introText: "",
        onComplete: textChange,
        delay: 0
    })
    TweenMax.set(".intro-text", {
        autoAlpha: 0,
        delay: 0
    })
    TweenMax.to(".introduction", 0.5, {
        autoAlpha: 0,
        delay: 0,
        onComplete: projectIn
    })
    intro = false;
}

$(".logo").on("mousedown touchend", function() {
    if (studio) {
        studioOut();
    } else if (about) {
        aboutOut();
    }
})

$(".logo, .skip").on("mouseenter", function() {
    TweenMax.to(".mouse-track .outer-circle", 0.5, {
        height: 80,
        width: 80,
        strokeWidth: 2,
        autoAlpha: 0
    })
    TweenMax.set(".countdown", {
        autoAlpha: 0
    })
    TweenMax.to(".mouse-track .inner-circle", 0.5, {
        autoAlpha: 0
    })
}).on("mouseleave", function() {
    TweenMax.to(".mouse-track .outer-circle", 0.5, {
        height: 18,
        width: 18,
        strokeWidth: 2,
        autoAlpha: 1
    })
    TweenMax.to(".mouse-track .inner-circle", 0.5, {
        autoAlpha: 0.6
    })
})

$(".mobile-menu").on("mousedown touchstart", function() {
    if (!menu || !about) {
        menuIn();
    }
})


function menuIn() {
    transitioning = true;
    menu = true;
    mouseRotation = false;
    swiping = true;

    TweenMax.to(window, 2, {
        ease: Circ.easeOut,
        renderRotation: "+=12.5",
    })
    TweenMax.set(window, {
        renderRotation: -12.5,
        renderIncrement: 0,
        mouseX: 0,
        mouseY: 0,
        delay: 2
    })
    TweenMax.to(window, 2, {
        ease: Circ.easeOut,
        renderRotation: 0,
        delay: 2
    })
    TweenMax.set(window, {
        home: false,
        studio: false,
        transitioning: false,
        delay: 1,
        onComplete: function() {
            renderColoring();
        }
    })
    setTimeout(function () {
        $(".counter .page").html("ME");
        $(".counter .total").html("NU");
    }, 1000);
    sideText();
    // Build it up
    TweenMax.set("body", {
        className: "menu",
        delay: 1
    })
    $(".project-link").each(function(i, el) {
        var leftVal = i * 540 - mouseThen * ((projects * 540) - winW + 200) / winW;
        TweenMax.set($(el), {
            autoAlpha: 1,
            delay: 1
        })
        if (page == i) {
            TweenMax.to($(el).find("canvas"), 1, {
                scale: 0,
            })
            TweenMax.to($(el).find(".frame"), 1, {
                scale: 0,
                strokeWidth: 200
            })
        }
        // First stage delay 1
        TweenMax.set($(el).find(".frame"), {
            scale: 0,
            x: leftVal,
            y: winH / 2 - 480,
            marginLeft: -400,
            strokeWidth: 200,
            delay: 1
        })
        TweenMax.set($(el).find("canvas"), {
            x: leftVal,
            y: winH / 2 - 480,
            marginLeft: -400,
            autoAlpha: 1,
            scale: 0,
            delay: 1,
        })
        TweenMax.set($(el).find("h2"), {
            y: -80,
            autoAlpha: 0,
            x: leftVal,
            marginLeft: -400,
            delay: 1,
        })
        TweenMax.set($(el).find("span"), {
            autoAlpha: 1,
            height: 0,
            x: leftVal,
            marginLeft: -400,
            y: -80,
            delay: 1,
        })
        TweenMax.set($(el).find("small"), {
            y: -80,
            x: leftVal,
            marginLeft: -400,
            scale: 0,
            delay: 1,
        })
        // Second stage delay 1.5
        TweenMax.staggerTo($(el).find("canvas"), 2, {
            ease: Back.easeOut.config(3),
            y: winH / 2 - 300,
            delay: 1.5,
        }, -0.1)
        TweenMax.staggerTo($(el).find("canvas"), 2, {
            ease: Power2.easeOut,
            scale: 1 / 3,
            marginLeft: 0,
            delay: 1.5,
        }, -0.1)
        TweenMax.staggerTo($(el).find("canvas"), 2, {
            ease: Power2.easeOut,
            scale: 1 / 3,
            marginLeft: 0,
            delay: 1.5,
        }, -0.1)
        TweenMax.staggerTo($(el).find(".frame"), 2, {
            ease: Back.easeOut.config(3),
            y: winH / 2 - 300,
            delay: 1.5
        }, -0.1)
        TweenMax.staggerTo($(el).find(".frame"), 2, {
            ease: Power2.easeOut,
            scale: 0.4,
            strokeWidth: 70,
            marginLeft: 0,
            delay: 1.5
        }, -0.1)
        TweenMax.staggerTo($(el).find("h2"), 2, {
            ease: Power2.easeOut,
            marginTop: -22,
            autoAlpha: 1,
            marginLeft: 0,
            delay: 1.5
        }, -0.1)
        TweenMax.staggerTo($(el).find("h2"), 2, {
            ease: Back.easeOut.config(3),
            delay: 1.5,
            y:0,
        }, -0.1)
        TweenMax.staggerTo($(el).find("span"), 2, {
            ease: Power2.easeOut,
            marginLeft: 0,
            delay: 1.5,
        }, -0.1)
        TweenMax.staggerTo($(el).find("span"), 2, {
            ease: Power2.easeOut,
            height: 18,
            delay: 2,
        }, -0.1)
        TweenMax.staggerTo($(el).find("span"), 2, {
            ease: Back.easeOut.config(3),
            delay: 1.5,
            y:0,
        }, -0.1)
        TweenMax.set($(el).find("small"), {
            scale: 1,
            delay: 1.5
        })
        TweenMax.staggerTo($(el).find("small"), 2, {
            ease: Power2.easeOut,
            marginLeft: 0,
            delay: 1.5,
        }, -0.1)
        TweenMax.staggerTo($(el).find("small"), 2, {
            ease: Back.easeOut.config(3),
            delay: 1.5,
            y:0,
        }, -0.1)
    })
    if (studio) {
        studio = false;
        TweenMax.to(".gradient", 0.5, {
            width: winW,
            height: winH,
            left: 0,
            top: 0
        })
        TweenMax.to(".models", 0.5, {
            width: winW,
        })
        TweenMax.to(".scene", 0.5, {
            autoAlpha: 0,
            onComplete: function() {
                TweenMax.set(".close", {
                    className: "-=active"
                })
                $("#projectContent").empty();
                $(".studio-next").empty();
                TweenMax.to(".top-bar", 0.5, {
                    autoAlpha: 1
                })
            }
        })
    }
    // Hide stuff
    $(".project").each(function(i, el) {
        TweenMax.to($(el), 0.5, {
            autoAlpha: 0,
        })
    })
    TweenMax.killTweensOf(".line-scroll");
    TweenMax.to(".line-scroll", 0.5, {
        autoAlpha: 0
    })
    TweenMax.set(".open", {
        className: "-=active",
        delay: 1
    })
    TweenMax.to(".circles", 0.5, {
        autoAlpha: 0
    })
    TweenMax.to(".circle-trail", 0.5, {
        autoAlpha: 0
    })
    TweenMax.to(".bullet-project span", 0.5, {
        scale: 0,
        delay: 0.5
    })
    TweenMax.to(".bullet span", 0.5, {
        scale: 0,
        delay: 0.5,
    })
    TweenMax.set(".bullet span", {
        autoAlpha: 0,
        delay: 1
    })
}

function menuOut() {
    menu = false;
    transitioning = true;
    home = true;
    mouseRotation = true;
    if (tutorial) {
        TweenMax.set(".intro-text", {
            className: "+=tutorial",
        })
        TweenMax.to(".introduction", 0.5, {
            autoAlpha: 0
        })
        TweenMax.set(window, {
            introText: "",
            onComplete: textChange,
        })
        TweenMax.set(window, {
            introText: "Great! Now you may also swipe and scroll",
            onComplete: textChange,
            delay: 1
        })
    }
    TweenMax.to(".mobile-menu", 0.5, {
        autoAlpha: 1,
        delay: 2
    })
    $(".project-link").each(function(i, el) {
        TweenMax.to($(el), 1, {
            autoAlpha: 0,
            onComplete: function() {
                projectIn();
                TweenMax.to(".circles", 0.5, {
                    autoAlpha: 1
                })
            }
        })
        TweenMax.set($(el).find("h2"), {
            autoAlpha: 0,
            delay: 1
        })
        TweenMax.set($(el).find("small"), {
            autoAlpha: 0,
            delay: 1
        })
        TweenMax.set($(el).find("span"), {
            autoAlpha: 0,
            delay: 1
        })
        videoCursor();
    })
}

function aboutIn() {
    responsiveness();
    transitioning = true;
    about = true;

    TweenMax.to(".mobile-menu", 0.5, {
        autoAlpha: 0
    })

    if (tutorial) {
        TweenMax.set(window, {
            introText: "",
            onComplete: textChange,
            delay: 2
        })
        TweenMax.set(window, {
            introText: "",
            onComplete: textChange,
            delay: 6
        })
        TweenMax.set(window, {
            introText: "",
            onComplete: textChange,
            delay: 10
        })
    }

    TweenMax.to(window, 1, {
        ease: Circ.easeOut,
        renderRotation: "-=12.5",
    })
    TweenMax.set("body", {
        className: "about",
        delay: 2.5,
        onComplete: function() {

        }
    })
    TweenMax.to(".about-page", 2, {
        autoAlpha: 1
    })

    // Remove content
    if (home) {
        home = false;
        $(".project").each(function(i, el) {
            if (page == i) {
                TweenMax.staggerTo($(el).find(".fractured span span"), 1, {
                    autoAlpha: 0,
                    x: -40,
                    scale: 0.4
                }, 0.04)
                TweenMax.staggerTo($(el).find(".project-details li"), 1, {
                    autoAlpha: 0,
                    x: -40,
                    scale: 0.4
                }, 0.04)
            }
        })
        $(".project-link").each(function(i, el) {
            if (page == i) {
                TweenMax.to($(el).find("canvas"), 1, {
                    autoAlpha: 0,
                    scale: 0.4,
                    marginLeft: -100
                })
                TweenMax.to($(el).find(".frame"), 1, {
                    autoAlpha: 0,
                    scale: 0.4,
                    marginLeft: -100
                })
            }
        })
    } else if (studio) {
        studio = false;
        mouseRotation = true;
        TweenMax.to(".gradient", 1, {
            width: "0%",
        })
        TweenMax.set(".gradient", {
            width: "100%",
            left: 0,
            top: 0,
            height: winH,
            delay: 4,
        })
        TweenMax.to(".scene", 1, {
            autoAlpha: 0,
            onComplete: function() {
                $(".studio-next").empty();
                $("#projectContent").empty();
            }
        })
        TweenMax.killTweensOf(".line-scroll");
        TweenMax.to(".line-scroll", 0.5, {
            autoAlpha: 0
        })
        TweenMax.to(".scroll-position", 0.5, {
            autoAlpha: 0,
        })
        $(".project-link").each(function(i, el) {
            if (page == i) {
                TweenMax.to($(el).find("canvas"), 1, {
                    autoAlpha: 0,
                    scale: 0.4,
                    marginLeft: -100
                })
                TweenMax.to($(el).find(".frame"), 1, {
                    autoAlpha: 0,
                    scale: 0.4,
                    marginLeft: -100
                })
            }
        })
    }
    TweenMax.set(".open", {
        className: "-=active"
    })
    TweenMax.set(".close a span", {
        x: 5,
        y: 5,
        autoAlpha: 0,
        delay: 3
    })
    TweenMax.staggerTo(".close a span", 0.2, {
        x: 0,
        y: 0,
        autoAlpha: 1,
        delay: 4
    }, 0.05)

    // Mask
    TweenMax.to(".gradient-about", 1, {
        autoAlpha: 1,
        className: "+=active"
    })
    TweenMax.set(".about-page", {
        className: "+=active",
        delay: 4
    })

    // Building & re-organizing
    TweenMax.set(".about-text .fractured span span", {
        autoAlpha: 0,
        x: 50,
        scale: 0.8
    })
    TweenMax.set(".about-page", {
        autoAlpha: 0
    })
    TweenMax.set(".about-text p", {
        autoAlpha: 0,
        y: 100,
    })
    TweenMax.set(".about-text ul", {
        autoAlpha: 0,
        y: 100,
    })
    TweenMax.set(".split-left", {
        autoAlpha: 1,
        delay: 2.5
    })
    TweenMax.set(".about-render", {
        autoAlpha: 0,
        y: -400,
        scaleY: 0.6,
    })
    TweenMax.set(".neon-sign", {
        autoAlpha: 0
    })
    TweenMax.set(window, {
        renderRotation: -2,
        renderIncrement: 0,
        mouseX: 0,
        mouseY: 0,
        delay: 1
    })
    TweenMax.set(".close", {
        className: "+=active",
        delay: 3,
        onComplete: function() {
            transitioning = false;
        }
    })

    // Add content
    setTimeout(function () {
        $(".counter .page").html("ABOUT");
        $(".counter .total").html("ME");
    }, 2500);
    setTimeout(function () {
        sideText();
    }, 1500);
    TweenMax.staggerTo(".about-text .fractured span span", 2, {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        delay: 2.5
    }, 0.05)
    TweenMax.staggerTo(".about-text p, .about-text ul", 2, {
        autoAlpha: 1,
        y: 0,
        delay: 2.5
    }, 0.3)
    TweenMax.to(".neon-sign", 2, {
        autoAlpha: 1,
        delay: 5
    })
    TweenMax.to(window, 4, {
        ease: Circ.easeOut,
        renderRotation: 0,
        delay: 2
    })
    TweenMax.to(".about-render", 2, {
        ease: Bounce.easeOut,
        autoAlpha: 1,
        scaleY: 1,
        y: 0,
        delay: 2.5,
        scale: 1
    })
}

function aboutOut() {
    transitioning = true;
    if (tutorial) {
        TweenMax.killTweensOf(window);
        TweenMax.set(window, {
            introText: "",
            onComplete: textChange,
            delay: 2
        })
    }
    TweenMax.to(".about-page", 2, {
        autoAlpha: 0,
        onComplete: function() {
            $(".about-page").removeClass("active");
        }
    })
    TweenMax.set(".close", {
        className: "-=active"
    })
    TweenMax.to(".about-render", 2, {
        autoAlpha: 0,
        delay: 0.3
    })
    TweenMax.to(".neon-sign", 1, {
        autoAlpha: 0,
    })
    TweenMax.to(".split-left", 1, {
        autoAlpha: 0,
    })
    TweenMax.to(".gradient-about", 1, {
        autoAlpha: 0,
        delay: 1,
        onComplete: function() {
            $(".gradient-about").removeClass("active");
            projectIn();
            about = false;
        }
    })
}

var introText;

function introduction() {
    intro = true;
    TweenMax.killTweensOf(window);
    TweenMax.set(window, {
        introText: "Po has finally landed.",
        onComplete: textChange
    })
    TweenMax.set(window, {
        introText: "Its time for you to guide him",
        delay: 3,
        onComplete: textChange
    })
    TweenMax.set(window, {
        introText: "Press and hold anywhere on screen to learn more",
        delay: 6,
        onComplete: textChange
    })
}

function fractureIntro() {
    $(".intro-text").html(function(index, html) {
        return html.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="word">$2</span>')
    });
}

function textChange() {
    TweenMax.killTweensOf(".intro-text span");
    TweenMax.to(".intro-text span", 0.5, {
        autoAlpha: 0,
        onComplete: function() {
            $(".intro-text").html(introText);
            fractureIntro();
            TweenMax.killTweensOf(".intro-text span");
            TweenMax.set(".intro-text span", {
                y: -5,
                x: -5,
                autoAlpha: 0,
            })
            TweenMax.staggerTo(".intro-text span", 0.5, {
                y: 0,
                x: 0,
                autoAlpha: 1,
            }, 0.05)
        }
    })
    if (fails < 3 && fails > 1) {
        TweenMax.to(".skip", 0.5, {
            autoAlpha: 1
        })
    } else if (fails > 3) {
        TweenMax.fromTo(".skip", 0.5, {
            color: "inherit",
            y: 0
        }, {
            color: "#f14343",
            y: 10,
            repeat: -1,
            yoyo: true
        })
    }
}

introduction();

projectConstruction();
responsiveness();
