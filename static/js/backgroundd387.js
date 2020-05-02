 !function(e) {
    var t= {}

    ;

    function n(r) {
        if(t[r])return t[r].exports;

        var i=t[r]= {

            i:r,
            l: !1,
            exports: {}
        }

        ;
        return e[r].call(i.exports, i, i.exports, n),
        i.l= !0,
        i.exports
    }

    n.m=e,
    n.c=t,
    n.d=function(e, t, r) {
        n.o(e, t)||Object.defineProperty(e, t, {
                configurable: !1, enumerable: !0, get:r
            }

        )
    }

    ,
    n.n=function(e) {
        var t=e&&e.__esModule?function() {
            return e.default
        }

        :function() {
            return e
        }

        ;
        return n.d(t, "a", t),
        t
    }

    ,
    n.o=function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }

    ,
    n.p="",
    n(n.s=431)
}

( {
        431:function(e, t, n) {
            "use strict"; var r=function() {
                function e(e, t) {
                    for(var n=0; n<t.length; n++) {
                        var r=t[n]; r.enumerable=r.enumerable|| !1, r.configurable= !0, "value"in r&&(r.writable= !0), Object.defineProperty(e, r.key, r)
                    }
                }

                return function(t, n, r) {
                    return n&&e(t.prototype, n), r&&e(t, r), t
                }
            }

            ();  !function() {
                var e=document.createElement("canvas"); e.id="fluid-canvas", e.style.zIndex=-200, document.body.appendChild(e), e.width=e.clientWidth, e.height=e.clientHeight; var t= {
                    TEXTURE_DOWNSAMPLE:2, DENSITY_DISSIPATION:.91, VELOCITY_DISSIPATION:1, PRESSURE_DISSIPATION:.71, PRESSURE_ITERATIONS:20, CURL:4, SPLAT_RADIUS:.003
                }

                , n=[], i=[], o=function(e) {
                    var t= {
                        alpha: !1, depth: !1, stencil: !1, antialias: !1
                    }

                    , n=e.getContext("webgl2", t), r= ! !n; r||(n=e.getContext("webgl", t)||e.getContext("experimental-webgl", t)); var i=void 0, o=void 0; r?(n.getExtension("EXT_color_buffer_float"), o=n.getExtension("OES_texture_float_linear")):(i=n.getExtension("OES_texture_half_float"), o=n.getExtension("OES_texture_half_float_linear")), n.clearColor(.05, .05, .05, 1); var a=r?n.HALF_FLOAT:i.HALF_FLOAT_OES, u=void 0, f=void 0, l=void 0; return r?(u=v(n, n.RGBA16F, n.RGBA, a), f=v(n, n.RG16F, n.RG, a), l=v(n, n.R16F, n.RED, a)):(u=v(n, n.RGBA, n.RGBA, a), f=v(n, n.RGBA, n.RGBA, a), l=v(n, n.RGBA, n.RGBA, a)), {
                        gl:n, ext: {
                            formatRGBA:u, formatRG:f, formatR:l, halfFloatTexType:a, supportLinearFiltering:o
                        }
                    }
                }

                (e), a=o.gl, u=o.ext; function v(e, t, n, r) {
                    if( !function(e, t, n, r) {
                            var i=e.createTexture(); e.bindTexture(e.TEXTURE_2D, i), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texImage2D(e.TEXTURE_2D, 0, t, 4, 4, 0, n, r, null); var o=e.createFramebuffer(); return e.bindFramebuffer(e.FRAMEBUFFER, o), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, i, 0), e.checkFramebufferStatus(e.FRAMEBUFFER)==e.FRAMEBUFFER_COMPLETE
                        }

                        (e, t, n, r))switch(t) {
                        case e.R16F:return v(e, e.RG16F, e.RG, r); case e.RG16F:return v(e, e.RGBA16F, e.RGBA, r); default:return null
                    }

                    return {
                        internalFormat:t, format:n
                    }
                }

                function f() {
                    this.id=-1, this.x=0, this.y=0, this.dx=0, this.dy=0, this.down= !0, this.moved= !1, this.color=[30, 0, 300]
                }

                n.push(new f); var l=function() {
                    function e(t, n) {
                        if(function(e, t) {
                                if( !(e instanceof t))throw new TypeError("Cannot call a class as a function")
                            }

                            (this, e), this.uniforms= {}

                            , this.program=a.createProgram(), a.attachShader(this.program, t), a.attachShader(this.program, n), a.linkProgram(this.program),  !a.getProgramParameter(this.program, a.LINK_STATUS))throw a.getProgramInfoLog(this.program); for(var r=a.getProgramParameter(this.program, a.ACTIVE_UNIFORMS), i=0; i<r; i++) {
                            var o=a.getActiveUniform(this.program, i).name; this.uniforms[o]=a.getUniformLocation(this.program, o)
                        }
                    }

                    return r(e, [ {
                            key:"bind", value:function() {
                                a.useProgram(this.program)
                            }
                        }

                        ]), e
                }

                (); function c(e, t) {
                    var n=a.createShader(e); if(a.shaderSource(n, t), a.compileShader(n),  !a.getShaderParameter(n, a.COMPILE_STATUS))throw a.getShaderInfoLog(n); return n
                }

                var m=c(a.VERTEX_SHADER, "\n    \t    precision highp float;\n    \t    precision mediump sampler2D;\n\n    \t    attribute vec2 aPosition;\n    \t    varying vec2 vUv;\n    \t    varying vec2 vL;\n    \t    varying vec2 vR;\n    \t    varying vec2 vT;\n    \t    varying vec2 vB;\n    \t    uniform vec2 texelSize;\n\n    \t    void main () {\n    \t        vUv = aPosition * 0.5 + 0.5;\n    \t        vL = vUv - vec2(texelSize.x, 0.0);\n    \t        vR = vUv + vec2(texelSize.x, 0.0);\n    \t        vT = vUv + vec2(0.0, texelSize.y);\n    \t        vB = vUv - vec2(0.0, texelSize.y);\n    \t        gl_Position = vec4(aPosition, 0.0, 1.0);\n    \t    }\n    \t"), s=c(a.FRAGMENT_SHADER, "\n    \t    precision highp float;\n    \t    precision mediump sampler2D;\n\n    \t    varying vec2 vUv;\n    \t    uniform sampler2D uTexture;\n    \t    uniform float value;\n\n    \t    void main () {\n    \t        gl_FragColor = value * texture2D(uTexture, vUv);\n    \t    }\n    \t"), d=c(a.FRAGMENT_SHADER, "\n    \t    precision highp float;\n    \t    precision mediump sampler2D;\n\n    \t    varying vec2 vUv;\n    \t    uniform sampler2D uVelocity;\n    \t\tuniform sampler2D uPressure;\n    \t\tuniform sampler2D uDensity;\n\n    \t    void main () {\n\t\t\t\tfloat rescale = 500.0;\n    \t\t\tvec4 color = vec4(87./255.,28./255.,173./255.,1.0);\n    \t\t\tvec4 velocity = texture2D(uVelocity, vUv)/rescale;\n    \t\t\tvec4 pressure = texture2D(uPressure, vUv)/rescale;\n    \t\t\tvelocity.xy = (abs(velocity.xy));\n    \t\t\tvelocity.b = pressure.x;\n                color.gb = color.gb + velocity.xy/vec2(1.0,2.0);\n                color.r = color.r + pressure.x/1.5;\n                color = color * min(1.25,velocity.x+velocity.y+velocity.z);//1.75\n                color += vec4(0.05, 0.05, 0.05, 0.0);\n    \t        gl_FragColor = color;\n    \t    }\n    \t"), E=c(a.FRAGMENT_SHADER, "\n    \t    precision highp float;\n    \t    precision mediump sampler2D;\n\n    \t    varying vec2 vUv;\n    \t    uniform sampler2D uTarget;\n    \t    uniform float aspectRatio;\n    \t    uniform vec3 color;\n    \t    uniform vec2 point;\n    \t    uniform float radius;\n\n    \t    void main () {\n    \t        vec2 p = vUv - point.xy;\n    \t        p.x *= aspectRatio;\n    \t        vec3 splat = exp(-dot(p, p) / radius) * color;\n    \t        vec3 base = texture2D(uTarget, vUv).xyz;\n    \t        gl_FragColor = vec4(base + splat, 1.0);\n    \t    }\n    \t"), T=c(a.FRAGMENT_SHADER, "\n    \t    precision highp float;\n    \t    precision mediump sampler2D;\n\n    \t    varying vec2 vUv;\n    \t    uniform sampler2D uVelocity;\n    \t    uniform sampler2D uSource;\n    \t    uniform vec2 texelSize;\n    \t    uniform float dt;\n    \t    uniform float dissipation;\n\n    \t    vec4 bilerp (in sampler2D sam, in vec2 p) {\n    \t        vec4 st;\n    \t        st.xy = floor(p - 0.5) + 0.5;\n    \t        st.zw = st.xy + 1.0;\n    \t        vec4 uv = st * texelSize.xyxy;\n    \t        vec4 a = texture2D(sam, uv.xy);\n    \t        vec4 b = texture2D(sam, uv.zy);\n    \t        vec4 c = texture2D(sam, uv.xw);\n    \t        vec4 d = texture2D(sam, uv.zw);\n    \t        vec2 f = p - st.xy;\n    \t        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);\n    \t    }\n\n    \t    void main () {\n    \t        vec2 coord = gl_FragCoord.xy - dt * texture2D(uVelocity, vUv).xy;\n    \t        gl_FragColor = dissipation * bilerp(uSource, coord);\n    \t        gl_FragColor.a = 1.0;\n    \t    }\n    \t"), p=c(a.FRAGMENT_SHADER, "\n    \t    precision highp float;\n    \t    precision mediump sampler2D;\n\n    \t    varying vec2 vUv;\n    \t    uniform sampler2D uVelocity;\n    \t    uniform sampler2D uSource;\n    \t    uniform vec2 texelSize;\n    \t    uniform float dt;\n    \t    uniform float dissipation;\n\n    \t    void main () {\n    \t        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;\n    \t        gl_FragColor = dissipation * texture2D(uSource, coord);\n    \t        gl_FragColor.a = 1.0;\n    \t    }\n    \t"), g=c(a.FRAGMENT_SHADER, "\n    \t    precision highp float;\n    \t    precision mediump sampler2D;\n\n    \t    varying vec2 vUv;\n    \t    varying vec2 vL;\n    \t    varying vec2 vR;\n    \t    varying vec2 vT;\n    \t    varying vec2 vB;\n    \t    uniform sampler2D uVelocity;\n\n    \t    vec2 sampleVelocity (in vec2 uv) {\n    \t        vec2 multiplier = vec2(1.0, 1.0);\n    \t        if (uv.x < 0.0) { uv.x = 0.0; multiplier.x = -1.0; }\n    \t        if (uv.x > 1.0) { uv.x = 1.0; multiplier.x = -1.0; }\n    \t        if (uv.y < 0.0) { uv.y = 0.0; multiplier.y = -1.0; }\n    \t        if (uv.y > 1.0) { uv.y = 1.0; multiplier.y = -1.0; }\n    \t        return multiplier * texture2D(uVelocity, uv).xy;\n    \t    }\n\n    \t    void main () {\n    \t        float L = sampleVelocity(vL).x;\n    \t        float R = sampleVelocity(vR).x;\n    \t        float T = sampleVelocity(vT).y;\n    \t        float B = sampleVelocity(vB).y;\n    \t        float div = 0.5 * (R - L + T - B);\n    \t        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);\n    \t    }\n    \t"), R=c(a.FRAGMENT_SHADER, "\n    \t    precision highp float;\n    \t    precision mediump sampler2D;\n\n    \t    varying vec2 vUv;\n    \t    varying vec2 vL;\n    \t    varying vec2 vR;\n    \t    varying vec2 vT;\n    \t    varying vec2 vB;\n    \t    uniform sampler2D uVelocity;\n\n    \t    void main () {\n    \t        float L = texture2D(uVelocity, vL).y;\n    \t        float R = texture2D(uVelocity, vR).y;\n    \t        float T = texture2D(uVelocity, vT).x;\n    \t        float B = texture2D(uVelocity, vB).x;\n    \t        float vorticity = R - L - T + B;\n    \t        gl_FragColor = vec4(vorticity, 0.0, 0.0, 1.0);\n    \t    }\n    \t"), x=c(a.FRAGMENT_SHADER, "\n    \t    precision highp float;\n    \t    precision mediump sampler2D;\n\n    \t    varying vec2 vUv;\n    \t    varying vec2 vT;\n    \t    varying vec2 vB;\n    \t    uniform sampler2D uVelocity;\n    \t    uniform sampler2D uCurl;\n    \t    uniform float curl;\n    \t    uniform float dt;\n\n    \t    void main () {\n    \t        float T = texture2D(uCurl, vT).x;\n    \t        float B = texture2D(uCurl, vB).x;\n    \t        float C = texture2D(uCurl, vUv).x;\n    \t        vec2 force = vec2(abs(T) - abs(B), 0.0);\n    \t        force *= 1.0 / length(force + 0.00001) * curl * C;\n    \t        vec2 vel = texture2D(uVelocity, vUv).xy;\n    \t        gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);\n    \t    }\n    \t"), y=c(a.FRAGMENT_SHADER, "\n    \t    precision highp float;\n    \t    precision mediump sampler2D;\n\n    \t    varying vec2 vUv;\n    \t    varying vec2 vL;\n    \t    varying vec2 vR;\n    \t    varying vec2 vT;\n    \t    varying vec2 vB;\n    \t    uniform sampler2D uPressure;\n    \t    uniform sampler2D uDivergence;\n\n    \t    vec2 boundary (in vec2 uv) {\n    \t        uv = min(max(uv, 0.0), 1.0);\n    \t        return uv;\n    \t    }\n\n    \t    void main () {\n    \t        float L = texture2D(uPressure, boundary(vL)).x;\n    \t        float R = texture2D(uPressure, boundary(vR)).x;\n    \t        float T = texture2D(uPressure, boundary(vT)).x;\n    \t        float B = texture2D(uPressure, boundary(vB)).x;\n    \t        float C = texture2D(uPressure, vUv).x;\n    \t        float divergence = texture2D(uDivergence, vUv).x;\n    \t        float pressure = (L + R + B + T - divergence) * 0.25;\n    \t        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);\n    \t    }\n    \t"), D=c(a.FRAGMENT_SHADER, "\n    \t    precision highp float;\n    \t    precision mediump sampler2D;\n\n    \t    varying vec2 vUv;\n    \t    varying vec2 vL;\n    \t    varying vec2 vR;\n    \t    varying vec2 vT;\n    \t    varying vec2 vB;\n    \t    uniform sampler2D uPressure;\n    \t    uniform sampler2D uVelocity;\n\n    \t    vec2 boundary (in vec2 uv) {\n    \t        uv = min(max(uv, 0.0), 1.0);\n    \t        return uv;\n    \t    }\n\n    \t    void main () {\n    \t        float L = texture2D(uPressure, boundary(vL)).x;\n    \t        float R = texture2D(uPressure, boundary(vR)).x;\n    \t        float T = texture2D(uPressure, boundary(vT)).x;\n    \t        float B = texture2D(uPressure, boundary(vB)).x;\n    \t        vec2 velocity = texture2D(uVelocity, vUv).xy;\n    \t        velocity.xy -= vec2(R - L, T - B);\n    \t        gl_FragColor = vec4(velocity, 0.0, 1.0);\n    \t    }\n    \t"), h=void 0, _=void 0, A=void 0, S=void 0, F=void 0, U=void 0, w=void 0; G(); var b=new l(m, s), P=new l(m, d), L=new l(m, E), I=new l(m, u.supportLinearFiltering?p:T), B=new l(m, g), C=new l(m, R), M=new l(m, x), N=new l(m, y), O=new l(m, D); function G() {
                    h=a.drawingBufferWidth>>t.TEXTURE_DOWNSAMPLE, _=a.drawingBufferHeight>>t.TEXTURE_DOWNSAMPLE; var e=u.halfFloatTexType, n=u.formatRGBA, r=u.formatRG, i=u.formatR; A=V(2, h, _, n.internalFormat, n.format, e, u.supportLinearFiltering?a.LINEAR:a.NEAREST), S=V(0, h, _, r.internalFormat, r.format, e, u.supportLinearFiltering?a.LINEAR:a.NEAREST), F=X(4, h, _, i.internalFormat, i.format, e, a.NEAREST), U=X(5, h, _, i.internalFormat, i.format, e, a.NEAREST), w=V(6, h, _, i.internalFormat, i.format, e, a.NEAREST)
                }

                function X(e, t, n, r, i, o, u) {
                    a.activeTexture(a.TEXTURE0+e); var v=a.createTexture(); a.bindTexture(a.TEXTURE_2D, v), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, u), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, u), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE), a.texImage2D(a.TEXTURE_2D, 0, r, t, n, 0, i, o, null); var f=a.createFramebuffer(); return a.bindFramebuffer(a.FRAMEBUFFER, f), a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, v, 0), a.viewport(0, 0, t, n), a.clear(a.COLOR_BUFFER_BIT), [v, f, e]
                }

                function V(e, t, n, r, i, o, a) {
                    var u=X(e, t, n, r, i, o, a), v=X(e+1, t, n, r, i, o, a); return {
                        get read() {
                            return u
                        }

                        , get write() {
                            return v
                        }

                        , swap:function() {
                            var e=u; u=v, v=e
                        }
                    }
                }

                var z=(a.bindBuffer(a.ARRAY_BUFFER, a.createBuffer()), a.bufferData(a.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), a.STATIC_DRAW), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, a.createBuffer()), a.bufferData(a.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), a.STATIC_DRAW), a.vertexAttribPointer(0, 2, a.FLOAT,  !1, 0, 0), a.enableVertexAttribArray(0), function(e) {
                        a.bindFramebuffer(a.FRAMEBUFFER, e), a.drawElements(a.TRIANGLES, 6, a.UNSIGNED_SHORT, 0)
                    }

                ), H=Date.now(), Y= !0, W= !1; function k() {
                    if(Y) {
                        var r=Math.min((Date.now()-H)/1e3, .016); H=Date.now(), a.viewport(0, 0, h, _), i.length>0&&function(t) {
                            for(var n=0; n<t; n++) {
                                var r=[10*Math.random(), 10*Math.random(), 10*Math.random()], i=e.width*Math.random(), o=e.height*Math.random(), a=1e3*(Math.random()-.5), u=1e3*(Math.random()-.5); j(i, o, a, u, r)
                            }
                        }

                        (i.pop()), I.bind(), a.uniform2f(I.uniforms.texelSize, 1/h, 1/_), a.uniform1i(I.uniforms.uVelocity, S.read[2]), a.uniform1i(I.uniforms.uSource, S.read[2]), a.uniform1f(I.uniforms.dt, r), a.uniform1f(I.uniforms.dissipation, t.VELOCITY_DISSIPATION), z(S.write[1]), S.swap(), a.uniform1i(I.uniforms.uVelocity, S.read[2]), a.uniform1i(I.uniforms.uSource, A.read[2]), a.uniform1f(I.uniforms.dissipation, t.DENSITY_DISSIPATION), z(A.write[1]), A.swap(); for(var o=0; o<n.length; o++) {
                            var u=n[o]; u.moved&&(j(u.x, u.y, u.dx, u.dy, u.color), u.moved= !1)
                        }

                        C.bind(), a.uniform2f(C.uniforms.texelSize, 1/h, 1/_), a.uniform1i(C.uniforms.uVelocity, S.read[2]), z(U[1]), M.bind(), a.uniform2f(M.uniforms.texelSize, 1/h, 1/_), a.uniform1i(M.uniforms.uVelocity, S.read[2]), a.uniform1i(M.uniforms.uCurl, U[2]), a.uniform1f(M.uniforms.curl, t.CURL), a.uniform1f(M.uniforms.dt, r), z(S.write[1]), S.swap(), B.bind(), a.uniform2f(B.uniforms.texelSize, 1/h, 1/_), a.uniform1i(B.uniforms.uVelocity, S.read[2]), z(F[1]), b.bind(); var v=w.read[2]; a.activeTexture(a.TEXTURE0+v), a.bindTexture(a.TEXTURE_2D, w.read[0]), a.uniform1i(b.uniforms.uTexture, v), a.uniform1f(b.uniforms.value, t.PRESSURE_DISSIPATION), z(w.write[1]), w.swap(), N.bind(), a.uniform2f(N.uniforms.texelSize, 1/h, 1/_), a.uniform1i(N.uniforms.uDivergence, F[2]), v=w.read[2], a.uniform1i(N.uniforms.uPressure, v), a.activeTexture(a.TEXTURE0+v); for(var f=0; f<t.PRESSURE_ITERATIONS; f++)a.bindTexture(a.TEXTURE_2D, w.read[0]), z(w.write[1]), w.swap(); O.bind(), a.uniform2f(O.uniforms.texelSize, 1/h, 1/_), a.uniform1i(O.uniforms.uPressure, w.read[2]), a.uniform1i(O.uniforms.uVelocity, S.read[2]), z(S.write[1]), S.swap(), a.viewport(0, 0, a.drawingBufferWidth, a.drawingBufferHeight), P.bind(), a.uniform1i(P.uniforms.uVelocity, S.read[2]), a.uniform1i(P.uniforms.uPressure, w.read[2]), a.uniform1i(P.uniforms.uDensity, A.read[2]), z(null), requestAnimationFrame(k)
                    }
                }

                function j(n, r, i, o, u) {
                     !W&&Y&&(L.bind(), a.uniform1i(L.uniforms.uTarget, S.read[2]), a.uniform1f(L.uniforms.aspectRatio, e.width/e.height), a.uniform2f(L.uniforms.point, n/e.width, 1-r/e.height), a.uniform3f(L.uniforms.color, i, -o, 1), a.uniform1f(L.uniforms.radius, t.SPLAT_RADIUS), z(S.write[1]), S.swap(), a.uniform1i(L.uniforms.uTarget, A.read[2]), a.uniform3f(L.uniforms.color, .3*u[0], .3*u[1], .3*u[2]), z(A.write[1]), A.swap())
                }

                k(), window.backgroundFluid= {
                    on:function() {
                        Y= !0, k()
                    }

                    , off:function() {
                        Y= !1
                    }

                    , lock:function() {
                        W= !0, t.VELOCITY_DISSIPATION=.98
                    }

                    , unlock:function() {
                        W= !1, t.VELOCITY_DISSIPATION=1
                    }
                }

                , document.addEventListener("chameleon:resize", function() {
                        e.width==e.clientWidth&&e.height==e.clientHeight||(e.width=e.clientWidth, e.height=e.clientHeight, G())
                    }

                ), window.addEventListener("mousemove", function(e) {
                        n[0].down= !0, n[0].moved=n[0].down, n[0].dx=10*(e.clientX-n[0].x), n[0].dy=10*(e.clientY-n[0].y), n[0].x=e.clientX, n[0].y=e.clientY
                    }

                ), window.addEventListener("touchmove", function(e) {
                        for(var t=e.targetTouches, r=0; r<t.length; r++) {
                            var i=n[r]; i.moved=i.down, i.dx=10*(t[r].pageX-i.x), i.dy=10*(t[r].pageY-i.y), i.x=t[r].pageX, i.y=t[r].pageY
                        }
                    }

                    ,  !1), window.addEventListener("touchstart", function(e) {
                        for(var t=e.targetTouches, r=0; r<t.length; r++)r>=n.length&&n.push(new f), n[r].id=t[r].identifier, n[r].down= !0, n[r].x=t[r].pageX, n[r].y=t[r].pageY, n[r].color=[Math.random()+.2, Math.random()+.2, Math.random()+.2]
                    }

                ), window.addEventListener("touchend", function(e) {
                        for(var t=e.changedTouches, r=0; r<t.length; r++)for(var i=0; i<n.length; i++)t[r].identifier==n[i].id&&(n[i].down= !1)
                    }

                )
            }

            ()
        }
    }

);