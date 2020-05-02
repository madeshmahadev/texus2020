	
 !function e(t, i, s) {
    function o(d, a) {
        if( !i[d]) {
            if( !t[d]) {
                var r="function"==typeof require&&require;
                if( !a&&r)return r(d,  !0);
                if(n)return n(d,  !0);
                var h=new Error("Cannot find module '"+d+"'");
                throw h.code="MODULE_NOT_FOUND",
                h
            }

            var l=i[d]= {
                exports: {}
            }

            ;

            t[d][0].call(l.exports, function(e) {
                    var i=t[d][1][e]; return o(i?i:e)
                }

                , l, l.exports, e, t, i, s)
        }

        return i[d].exports
    }

    for(var n="function"==typeof require&&require, d=0; d<s.length; d++)o(s[d]);
    return o
}

( {
        1:[function(e, t, i) {
            "use strict"; function s(e, t) {
                if( !(e instanceof t))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(i, "__esModule", {
                    value: !0
                }

            ); var o=function() {
                function e(e, t) {
                    for(var i=0; i<t.length; i++) {
                        var s=t[i]; s.enumerable=s.enumerable|| !1, s.configurable= !0, "value"in s&&(s.writable= !0), Object.defineProperty(e, s.key, s)
                    }
                }

                return function(t, i, s) {
                    return i&&e(t.prototype, i), s&&e(t, s), t
                }
            }

            (), n=function() {
                function e() {
                    var t=this; s(this, e); var i=document.getElementById("intro-content"), o=document.getElementById("sphere-image"), n=document.getElementById("intro"), d=document.getElementById("blur"); this.mobilePhone=document.getElementById("mobile-phone"), this.phone=document.getElementById("phone"); var a=document.getElementById("buttons-container"), r=document.getElementsByClassName("copy-title"), h=document.getElementById("author-copy"), l=document.getElementById("logo"); this.cookiesButton=document.getElementById("cookies-button"), this.cookies=document.getElementById("cookies"), this.getCookies()||(this.cookies.classList.add("show"), this._closeCookies=this.closeCookies.bind(this), this.cookiesButton.addEventListener("click", this._closeCookies)), setTimeout(function() {
                            i.style.display="block", o.style.display="block", d.style.display="block"; 
							}

                        , 500), setTimeout(function() {
                            o.classList.add("fade-in"), d.classList.add("fade-in")
                        }

                        , 1e3), setTimeout(function() {
                            i.classList.add("fade-in"), o.style.webkitTransform="", o.style.transform=""
                        }

                        , 2e3), setTimeout(function() {
                            i.classList.add("fade-out"), o.classList.add("zoom")
                        }

                        , 4e3), setTimeout(function() {
                            n.classList.add("fade-out")
                        }

                        , 6500), setTimeout(function() {
                            l.classList.add("fade-in")
                        }
/*
                        , 7200), setTimeout(function() {
                            r[0].classList.add("show"), r[1].classList.add("show"), r[2].classList.add("show"), a.classList.add("show")
                        }

                        , 7700), setTimeout(function() {
                            t.videoWrapper.classList.add("show"), t.mobilePhone.classList.add("show"), t.phone.classList.add("show"), t.phone.style.webkitTransform="", t.phone.style.transform="", t.width>991&&(t.video.setAttribute("loop",  !0), t.playVideo())
                        }

                        , 8500), setTimeout(function() {
                            h.classList.add("show")
                        } */

                        , 1e4)
                }

                return o(e, [ {
                        key:"getCookies", value:function(e) {
                            return decodeURIComponent(document.cookie).includes("visited")
                        }
                    }

                    , {
                        key:"setCookies", value:function() {
                            var e=new Date, t=2592e6; e.setTime(e.getTime()+t); var i="expires="+e.toUTCString(); document.cookie="visited="+Date.now()+";"+i+";path=/"
                        }
                    }

                    , {
                        key:"closeCookies", value:function() {
                            this.cookiesButton.removeEventListener("click", this._closeCookies), this.cookies.classList.add("fade-out"), this.setCookies()
                        }
                    }

                    , {
                        key:"playVideo", value:function() {
                            this.playButton.parentElement.classList.add("hide"), this.video.play()
                        }
                    }

                    , {
                        key:"pauseVideo", value:function() {
                            this.playButton.parentElement.classList.remove("hide"), this.video.pause()
                        }
                    }

                    , {
                        key:"endVideo", value:function() {
                            this.video.currentTime=0, this.pauseVideo()
                        }
                    }

                    , {
                        key:"createParallax", value:function() {
                            this.figures=[], this.offsetsX=[30, -30, 18, -15, 20, -15, 30], this.offsetsY=[35, -30, 18, -20, 15, -20, 30]; for(var e=0; e<7; e++) {
                                var t=document.getElementById("figure-"+e); this.figures.push(t)
                            }
                        }
                    }

                    , {
                        key:"setFigurePosition", value:function(e, t, i) {
                            var s=this.figures[e].style["-webkit-transform"], o=this.figures[e].style.transform, n=s.indexOf("translate"), d=o.indexOf("translate"); n===-1&&d===-1&&(n=s.length, d=o.length); var a=this.figures[e].style["-webkit-transform"].slice(0, n), r=this.figures[e].style.transform.slice(0, d); this.figures[e].style["-webkit-transform"]=a+" translate("+t+"px, "+i+"px)", this.figures[e].style.transform=r+" translate("+t+"px, "+i+"px)"
                        }
                    }

                    

                   /* , {
                        key:"onResize", value:function() {
                            this.height=window.innerHeight, this.width=window.innerWidth, this.height_2=this.height/2, this.width_2=this.width/2, this.createVideoPlayer()
                        }
                    }

                    , {
                        key:"createVideoPlayer", value:function() {
                            var e="video-wrapper", t="play-button", i="video"; this.width<992&&(e="mobile-video-wrapper", t="mobile-play-button", i="mobile-video"), this.playButton&&this.video&&(this.playButton.removeEventListener("click", this.playVideo.bind(this)), this.video.removeEventListener("click", this.pauseVideo.bind(this)), this.video.removeEventListener("ended", this.endVideo.bind(this))), this.videoWrapper=document.getElementById(e), this.playButton=document.getElementById(t), this.video=document.getElementById(i), this.playButton.addEventListener("click", this.playVideo.bind(this)), this.video.addEventListener("click", this.pauseVideo.bind(this)), this.video.addEventListener("ended", this.endVideo.bind(this)); var s=662/308; if(this.width<992) {
                                var o=this.width/100*61.5, n=this.width/100*64.8/s; this.videoWrapper.style.height=n+"px", this.videoWrapper.style.width=o+"px", n=this.width/100*71.25/s, o=this.width/100*68, this.mobilePhone.style.height=n+"px", this.mobilePhone.style.width=o+"px"
                            }

                            else if(this.width<768) {
                                var d=this.width/100*79, a=this.width/100*83/s; this.videoWrapper.style.height=a+"px", this.videoWrapper.style.width=d+"px", a=this.width/100*92.2/s, d=this.width/100*88, this.mobilePhone.style.height=a+"px", this.mobilePhone.style.width=d+"px"
                            }

                            else {
                                var r=this.width/100*47/(917/492); this.videoWrapper.style.height=r+"px"
                            }
                        }
                    } */

                    ]), e
            }

            (); i.default=n
        }

        , {}

        ], 2:[function(e, t, i) {
            "use strict"; function s(e) {
                return e&&e.__esModule?e: {
                    default:e
                }
            }

            var o=e("./App"), n=s(o); document.addEventListener("DOMContentLoaded", function() {
                    setTimeout(function() {
                            var e=new n.default; window.onresize=e.onResize.bind(e)
                        }

                        , 100)
                }

            )
        }

        , {
            "./App":1
        }

        ]
    }

    , {}

    , [2]);