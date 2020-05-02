function parallax() {
    if (distance < studioDistance) {
        if (studioScene != 0 || studioScene == 0 && movingLeft) {
            TweenMax.to(".top-bar", 0.5, {
                autoAlpha: 0
            })
        }

        $(".scene").each(function(i, el) {
            if (studioScene == i - 1) {
                TweenMax.to($(el), 0.5, {
                    x: winW - (winW / studioDistance) * distanceRaw
                })
            }
            else if (studioScene == i && studioScene != scenes - 1) {
                TweenMax.to($(el), 0.5, {
                    x: - (winW / studioDistance) * distanceRaw
                })
            } else if (studioScene == scenes - 1 && movingRight && studioScene == i) {
                TweenMax.to($(el), 0.5, {
                    x: - (winW / studioDistance) * distanceRaw
                })
            }
            else if (studioScene == i + 1) {
                TweenMax.to($(el), 0.5, {
                    x: -winW - (winW / studioDistance) * distanceRaw
                })
            }
            // SPECIAL CASES
            if (studioScene == 0 && i == 1) {
                if (movingRight) {
                    TweenMax.to($(el), 0.5, {
                        x: winW - sceneReveal
                    })
                } else {
                    TweenMax.to($(el), 0.5, {
                        x: winW - (winW / studioDistance) * distanceRaw - sceneReveal + (sceneReveal / studioDistance) * distanceRaw
                    })
                }
                // if (movingLeft) {
                //     TweenMax.to($(el), 0.5, {
                //         x: winW - (winW / studioDistance) * distanceRaw - sceneReveal + (sceneReveal / studioDistance) * distanceRaw
                //     })
                // } else if (movingRight) {
                //     TweenMax.to($(el), 0.5, {
                //         x: sceneReveal
                //     })
                // }
            }
            else if (studioScene == 1 && i == 1 && movingRight) {
                TweenMax.to($(el), 0.5, {
                    x: (winW - sceneReveal) / studioDistance * distance
                })
            }
            else if (i == 0) {
                TweenMax.to($(el), 0.5, {
                    x: 0
                })
            }
            // --- SCENE LAST
            if (studioScene == scenes - 1 && distance < studioDistance / 2) {
                TweenMax.set(".studio-next", {
                    autoAlpha: 1,
                })
                TweenMax.to(".studio-next", 0.5, {
                    x: - nextLinkW / studioDistance * 2 * distanceRaw,
                    className: "-=complete"
                })
                TweenMax.to(".studio-next .progress", 0.5, {
                    width: (100 / studioDistance * 2 * distanceRaw ) + "%",
                    left: nextLinkW - nextLinkW / studioDistance * 2 * distanceRaw
                })
                if (i == scenes - 1 && movingLeft) {
                    TweenMax.to($(el), 0.5, {
                        x: -200 / studioDistance * 2 * distance,
                        autoAlpha: 1 - 1 / studioDistance * 2 * distance
                    })
                }
            } else if (studioScene == scenes - 1 && distance >= studioDistance / 2 && movingLeft) {
                TweenMax.to(".studio-next", 0.5, {
                    x: -nextLinkW,
                    className: "+=complete"
                })
                if (i == scenes - 1) {
                    TweenMax.to($(el), 0.5, {
                        x: -200,
                        opacity: 0
                    })
                    TweenMax.to(".studio-next .progress", 0.5, {
                        width: "100%",
                        left: 0
                    })
                }
            }
        })
        // PARALLAX EFFECTS
        $(".scene div").each(function(i, el) {
            var parentIndex = $(el).parents(".scene").index();
            // ---- SCENE 0
            if (studioScene == 0 && movingLeft) {
                TweenMax.to(".gradient", 0.5, {
                    autoAlpha: 1 - 1 / studioDistance * distance,
                    width: gradientWidth - gradientWidth / studioDistance * distance
                })
                TweenMax.to(".models", 0.5, {
                    width: gradientWidth + gradientPadding - gradientWidth / studioDistance * distance
                })
                if (parentIndex == 0) {
                    TweenMax.to($(el), 0.5, {
                        x: -200 / studioDistance * distanceRaw
                    })
                }

                $(".project-link").each(function(i, el) {
                    if (page == parentIndex) {
                        TweenMax.to($(el).find(".frame"), 0.5, {
                            scale: 0.8 - 0.5 / studioDistance * distance,
                            strokeWidth: 85 + 115 / studioDistance * distance
                        })
                    }
                })
            }
            else if (studioScene == 1 && movingRight) {
                TweenMax.to(".gradient", 0.5, {
                    autoAlpha: 0 + 1 / studioDistance * distance,
                    width: gradientWidth / studioDistance * distance
                })
                TweenMax.to(".models", 0.5, {
                    width: gradientPadding + gradientWidth / studioDistance * distance
                })

                if (parentIndex == 0) {
                    TweenMax.to($(el), 0.5, {
                        x: -200 - 200 / studioDistance * distanceRaw
                    })
                }
            }
            // SCENE INDICATOR
            TweenMax.to(".scroll-position span", 0.5, {
                width: (100 / (scenes - 1) * studioScene) + (100 / (scenes - 1) / studioDistance * distanceRaw) + "%"
            })
            // ---- SIZE
            if ($(el).attr("data-parallax") == "size") {
                if (studioScene == parentIndex - 1) {
                    TweenMax.to($(el), 0.5, {
                        height: winH - 250 + 250 / studioDistance * distanceRaw
                    })
                }
                else if (studioScene == parentIndex && studioScene != scenes - 1) {
                    TweenMax.to($(el), 0.5, {
                        height: winH - 250 / studioDistance * distance
                    })
                } else if (studioScene == scenes - 1 && studioScene == parentIndex && movingRight) {
                    TweenMax.to($(el), 0.5, {
                        height: winH - 250 / studioDistance * distance
                    })
                }
                else if (studioScene == parentIndex + 1) {
                    TweenMax.to($(el), 0.5, {
                        height: winH - 250 - 250 / studioDistance * distanceRaw
                    })
                }
            }
            // ---- OPACITY
            if ($(el).attr("data-parallax") == "opacity") {
                if (studioScene == parentIndex) {
                    TweenMax.to($(el), 0.5, {
                        autoAlpha: 1 - 1 / studioDistance * distance,
                    })
                }
                else if (studioScene == parentIndex + 1 && movingRight) {
                    TweenMax.to($(el), 0.5, {
                        autoAlpha: 0 + 1 / studioDistance * distance,
                    })
                }
                else if (studioScene == parentIndex - 1 && movingLeft) {
                    TweenMax.to($(el), 0.5, {
                        autoAlpha: 0 + 1 / studioDistance * distance,
                    })
                }
                else {
                    TweenMax.to($(el), 0.5, {
                        autoAlpha: 0,
                    })
                }
            }
            // ---- TEXT
            if ($(el).attr("data-parallax") == "text") {
                if (
                    studioScene == parentIndex - 1 && distance > swipeDistance * 2 ||
                    studioScene == parentIndex + 1 && distance > swipeDistance * 2
                ) {
                    TweenMax.killTweensOf($(el).find(".fractured .letter"));
                    TweenMax.staggerTo($(el).find(".fractured .letter"), 1, {
                        autoAlpha: 1,
                        scale: 1,
                        x: 0,
                    }, 0.05)
                } else if (studioScene == parentIndex - 1 && distance < swipeDistance * 2) {
                    TweenMax.killTweensOf($(el).find(".fractured .letter"));
                    TweenMax.to($(el).find(".fractured .letter"), 0.2, {
                        autoAlpha: 0,
                        scale: 1.3,
                        x: 50,
                    })
                }
            }
            // ---- SPEED
            if ($(el).attr("data-parallax") == "speed") {
                if (studioScene == parentIndex - 1  && movingLeft) {
                    $(el).each(function(i, el) {
                        var sceneSpeed = $(el).attr("data-speed");
                        TweenMax.to($(el), 0.5, {
                            x: (winW - (winW / studioDistance * distance)) * (sceneSpeed / 10)
                        })
                    })
                }
                else if (studioScene == parentIndex) {
                    $(el).each(function(i, el) {
                        var sceneSpeed = $(el).attr("data-speed");
                        TweenMax.to($(el), 0.5, {
                            x: -(winW / studioDistance * distanceRaw) * (sceneSpeed / 10)
                        })
                    })
                }
                else if (studioScene == parentIndex + 1 && movingRight) {
                    $(el).each(function(i, el) {
                        var sceneSpeed = $(el).attr("data-speed");
                        TweenMax.to($(el), 0.5, {
                            x: (-winW + (winW / studioDistance * distance)) * (sceneSpeed / 10)
                        })
                    })
                }
            }
        })
    }
}

function parallaxEnd() {
    if (studio) {
        var timeVariation = 0;

        if (scrolling) {
            timeVariation = 0.5;
        } else {
            timeVariation = 0;
        }
        if (distance > studioDistance / 2 && movingLeft) {
            studioScene += 1;
            videoCursor();
            if (videoPlaying) {
                videoStop();
                videoPlaying = false;
            }
        } else if (distance > studioDistance / 2 && movingRight && studioScene > 0) {
            studioScene -= 1;
            videoCursor();
            if (videoPlaying) {
                videoStop();
                videoPlaying = false;
            }
        }

        if (studioScene == 0) {
            TweenMax.to(".top-bar", 0.5, {
                autoAlpha: 1
            })
        }
        else {
            TweenMax.to(".top-bar", 0.5, {
                autoAlpha: 0
            })
        }

        TweenMax.to(".studio-next", 0.5, {
            x: 0,
            className: "-=complete"
        })

        $(".scene").each(function(i, el) {
            if (studioScene == i) {
                TweenMax.to($(el), 0.5 + timeVariation, {
                    x: 0
                })
            }
            else if (studioScene == i + 1) {
                TweenMax.to($(el), 0.5 + timeVariation, {
                    x: -winW
                })
            }
            else if (studioScene == i - 1) {
                TweenMax.to($(el), 0.5 + timeVariation, {
                    x: winW
                })
            }

            if (studioScene == 0 && i == 1) {
                TweenMax.to($(el), 0.5 + timeVariation, {
                    x: winW - sceneReveal
                })
            }

            if (studioScene == 1 && i == 0) {
                TweenMax.to($(el), 0.5 + timeVariation, {
                    x: 0
                })
            }

            if (studioScene == scenes - 1 && i == scenes - 1) {
                TweenMax.to($(el), 0.5 + timeVariation, {
                    autoAlpha: 1
                })
            }
        })

        // PARALLAX EFFECTS
        $(".scene div").each(function(i, el) {
            var parentIndex = $(el).parents(".scene").index();
            // ---- SIZE
            if ($(el).attr("data-parallax") == "size") {
                if (studioScene == parentIndex) {
                    TweenMax.to($(el), 0.5 + timeVariation, {
                        height: winH
                    })
                }
                else {
                    TweenMax.to($(el), 0.5 + timeVariation, {
                        height: winH - 250
                    })
                }
            }
            // ---- OPACITY
            if ($(el).attr("data-parallax") == "opacity") {
                if (studioScene == parentIndex) {
                    TweenMax.to($(el), 0.5 + timeVariation, {
                        autoAlpha: 1,
                        x: 0
                    })
                }
                else {
                    TweenMax.to($(el), 0.5 + timeVariation, {
                        autoAlpha: 0,
                        x: 0
                    })
                }
            }
            // SCENE INDICATOR
            TweenMax.to(".scroll-position span", 0.5 + timeVariation, {
                width: 100 / (scenes - 1) * studioScene + "%"
            })
            // ---- SCENE 0
            if (studioScene == 0) {
                TweenMax.to(".gradient", 0.5 + timeVariation, {
                    autoAlpha: 1,
                    x: 0,
                    width: gradientWidth
                })
                TweenMax.to(".models", 0.5 + timeVariation, {
                    width: gradientWidth + gradientPadding
                })
                $(".project-link").each(function(i, el) {
                    if (page == parentIndex) {
                        TweenMax.to($(el).find(".frame"), 0.5 + timeVariation, {
                            scale: 0.8,
                            strokeWidth: 85
                        })
                    }
                })
            }
            else {
                TweenMax.to(".gradient", 0.5 + timeVariation, {
                    autoAlpha: 0,
                    width: 0
                })
                TweenMax.to(".models", 0.5 + timeVariation, {
                    width: 0
                })
                $(".project-link").each(function(i, el) {
                    if (page == parentIndex) {
                        TweenMax.to($(el).find(".frame"), 0.5 + timeVariation, {
                            scale: 0.3,
                            strokeWidth: 200
                        })
                    }
                })
                if (parentIndex == 0) {
                    TweenMax.to($(el), 0.5 + timeVariation, {
                        x: -200
                    })
                }
            }
            // ---- SPEED
            if ($(el).attr("data-parallax") == "speed") {
                var sceneSpeed = $(el).attr("data-speed");
                if (studioScene == parentIndex) {
                    TweenMax.to($(el), 0.5 + timeVariation, {
                        x: 0,
                    })
                } else if (studioScene > parentIndex) {
                    TweenMax.to($(el), 0.5 + timeVariation, {
                        x: -(winW) * (sceneSpeed / 10)
                    })
                } else if (studioScene < parentIndex) {
                    TweenMax.to($(el), 0.5 + timeVariation, {
                        x: winW * (sceneSpeed / 10)
                    })
                }
            }
            // ---- TEXT
            if ($(el).attr("data-parallax") == "text") {
                if (studioScene == parentIndex) {
                    TweenMax.killTweensOf($(el).find(".fractured .letter"));
                    TweenMax.staggerTo($(el).find(".fractured .letter"), 1, {
                        autoAlpha: 1,
                        rotationY: 0,
                        scale: 1,
                        x: 0,
                    }, 0.05)
                }
                else if (studioScene < parentIndex) {
                    TweenMax.killTweensOf($(el).find(".fractured .letter"));
                    TweenMax.to($(el).find(".fractured .letter"), 0.2, {
                        autoAlpha: 0,
                        scale: 1.3,
                        x: 50,
                    })
                }
                else if (studioScene > parentIndex) {
                    TweenMax.killTweensOf($(el).find(".fractured .letter"));
                    TweenMax.to($(el).find(".fractured .letter"), 0.2, {
                        autoAlpha: 0,
                        scale: 1.3,
                        x: -50,
                    })
                }
            }
            // ---- CLASS
            if ($(el).attr("data-class")) {
                var sceneClass = $(el).attr("data-class");
                if (studioScene == parentIndex) {
                    $("body").addClass(sceneClass);
                } else {
                    $("body").removeClass(sceneClass);
                }
            }
        })

        if (studioScene == scenes) {
            if (!transitioning) {
                setTimeout(function () {
                    if (page < projects - 1) {
                        page += 1;
                    } else {
                        page = 0;
                    }
                    studioOut();
                    $("#projectContent").empty();
                    $(".studio-next").empty();
                    TweenMax.to(".top-bar", 0.5, {
                        autoAlpha: 1
                    })
                    TweenMax.set(".line-scroll", {
                        autoAlpha: 0
                    })
                }, 1000);
            }
            transitioning = true;
        }
    }
}
