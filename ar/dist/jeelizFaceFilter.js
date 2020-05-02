 /**
  * Jeeliz Face Filter - https://github.com/jeeliz/jeelizFaceFilter
  *
  * Copyright 2018 Jeeliz ( https://jeeliz.com )
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  * http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
 var JEEFACEFILTERAPI = (function() {
     function ma(b, e, f) {
         return b * (1 - f) + e * f
     }

     function za(b, e) {
         var f = new XMLHttpRequest;
         f.open("GET", b, !0);
         f.withCredentials = !1;
         f.onreadystatechange = function() {
             4 !== f.readyState || 200 !== f.status && 0 !== f.status || e(f.responseText)
         };
         f.send()
     }

     function Ba(b, e, f) {
         return Math.min(Math.max((f - b) / (e - b), 0), 1)
     }

     function Ca(b) {
         switch (b) {
             case "relu":
                 return "gl_FragColor=max(vec4(0.,0.,0.,0.),gl_FragColor);";
             case "elu":
                 return "gl_FragColor=mix(exp(-abs(gl_FragColor))-vec4(1.,1.,1.,1.),gl_FragColor,step(0.,gl_FragColor));";
             case "elu01":
                 return "gl_FragColor=mix(0.1*exp(-abs(gl_FragColor))-vec4(0.1,0.1,0.1,0.1),gl_FragColor,step(0.,gl_FragColor));";
             case "arctan":
                 return "gl_FragColor=atan(3.14159265359*texture2D(u0,vUV))/3.14159265359;";
             case "copy":
                 return "";
             default:
                 return !1
         }
     }

     function Da(b, e) {
         var f = e % 8;
         return b[(e - f) / 8] >> 7 - f & 1
     }

     function Ea(b) {
         var e = JSON.parse(b);
         b = e.ne;
         var f = e.nf,
             k = e.n;
         var g = "undefined" === typeof btoa ? Buffer.from(e.data, "base64").toString("latin1") : atob(e.data);
         var m = g.length;
         e = new Uint8Array(m);
         for (var p = 0; p < m; ++p) e[p] = g.charCodeAt(p);
         g = new Float32Array(k);
         m = new Float32Array(f);
         p = b + f + 1;
         for (var t = 0; t < k; ++t) {
             for (var v = p * t, l = 0 === Da(e, v) ? 1 : -1, r = v + 1, u = 1, B = 0, z = r + b - 1; z >= r; --z) B += u * Da(e, z), u *= 2;
             r = B;
             v = v + 1 + b;
             u = m.length;
             B = 0;
             for (z = v; z < v + u; ++z) m[B] = Da(e, z), ++B;
             for (u = v = 0; u < f; ++u) v += m[u] * Math.pow(2, -u - 1);
             g[t] = 0 === v && 0 ===
                 r ? 0 : l * (1 + v) * Math.pow(2, 1 + r - Math.pow(2, b - 1))
         }
         return g
     }
     var w = function() {
             function b(h, A) {
                 h = a.createShader(h);
                 a.shaderSource(h, A);
                 a.compileShader(h);
                 return a.getShaderParameter(h, a.COMPILE_STATUS) ? h : !1
             }

             function e(h, A) {
                 h = b(a.VERTEX_SHADER, h);
                 A = b(a.FRAGMENT_SHADER, A);
                 var C = a.createProgram();
                 a.attachShader(C, h);
                 a.attachShader(C, A);
                 a.linkProgram(C);
                 return C
             }

             function f(h) {
                 void 0 === h.Y && (h.Y = "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}");
                 void 0 === h.ta && (h.ta = ["a0"]);
                 void 0 === h.fa && (h.fa = [2]);
                 if (void 0 === h.precision || "highp" === h.precision) h.precision = v;
                 h.id = p++;
                 void 0 !== h.Yc && h.Yc.forEach(function(C, da) {
                     h.b = h.b.replace(C, h.Ha[da])
                 });
                 h.ib = 0;
                 h.fa.forEach(function(C) {
                     h.ib += 4 * C
                 });
                 h.Ga = e(h.Y, "precision " + h.precision + " float;\n" + h.b);
                 h.l = {};
                 h.f.forEach(function(C) {
                     h.l[C] = a.getUniformLocation(h.Ga, C)
                 });
                 h.attributes = {};
                 h.ga_ = [];
                 h.ta.forEach(function(C) {
                     var da = a.getAttribLocation(h.Ga, C);
                     h.attributes[C] = da;
                     h.ga_.push(da)
                 });
                 if (h.g) {
                     a.useProgram(h.Ga);
                     m = h;
                     g = h.id;
                     for (var A in h.g) a.uniform1i(h.l[A],
                         h.g[A])
                 }
                 h.Rd = !0
             }

             function k(h) {
                 Fa.dd(D);
                 g !== h.id && (D.qa(), g = h.id, m = h, a.useProgram(h.Ga), h.ga_.forEach(function(A) {
                     0 !== A && a.enableVertexAttribArray(A)
                 }))
             }
             var g = -1,
                 m = !1,
                 p = 0,
                 t = !1,
                 v = "highp",
                 l = ["u1"],
                 r = ["u0"],
                 u = {
                     u1: 0
                 },
                 B = {
                     u0: 0
                 },
                 z = {
                     u1: 0,
                     u2: 1
                 },
                 Q = {
                     u3: 0
                 },
                 R = {
                     s0: {
                         b: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                         f: l,
                         g: u
                     },
                     s1: {
                         b: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                         f: l,
                         g: u,
                         precision: "lowp"
                     },
                     s2: {
                         b: "uniform sampler2D u1,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a*b;}",
                         f: ["u1", "u2"],
                         g: z
                     },
                     s3: {
                         b: "uniform sampler2D u1;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a.r*f;}",
                         f: l,
                         g: u
                     },
                     s4: {
                         b: "uniform sampler2D u1,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a.a*b.r*f;}",
                         f: ["u1", "mask"],
                         g: z
                     },
                     s5: {
                         b: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(1.-vv0.x,vv0.y));}",
                         f: l,
                         g: u
                     },
                     s6: {
                         b: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(vv0.x,1.-vv0.y));}",
                         f: l,
                         g: u
                     },
                     s7: {
                         b: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*u4;}",
                         f: ["u0", "u4"],
                         g: B
                     },
                     s8: {
                         b: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;const vec4 g=vec4(.25,.25,.25,.25),e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);float b=dot(a*u4,g);gl_FragColor=b*e;}",
                         f: ["u0", "u4"],
                         g: B
                     },
                     s9: {
                         b: "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u1,vv0));gl_FragColor=a*e;}",
                         f: l,
                         g: u
                     },
                     s10: {
                         b: "uniform sampler2D u1,u5;uniform float u6;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u5,vv0);gl_FragColor=mix(b,a,u6*f);}",
                         f: ["u1", "u5", "u6"],
                         g: {
                             u1: 0,
                             u5: 1
                         }
                     },
                     s11: {
                         b: "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u1,vv0+u7)+texture2D(u1,vv0+u7*vec2(1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,1.)));}",
                         f: ["u1", "u7"],
                         g: u
                     },
                     s12: {
                         b: "uniform sampler2D u1;uniform vec4 u8;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 k(float a){if(a==0.)return vec4(0.,0.,0.,0.);float l=128.*step(a,0.);a=abs(a);float c=floor(log2(a)),m=c+127.,b=(a/exp2(c)-1.)*8388608.,d=m/2.,n=fract(d)*2.,o=floor(d),p=e(b,0.,8.),q=e(b,8.,16.),r=n*128.+e(b,16.,23.),j=l+o;return vec4(p,q,r,j)/255.;}void main(){float a=dot(texture2D(u1,vv0),u8);gl_FragColor=k(a);}",
                         f: ["u1", "u8"],
                         g: u
                     },
                     s13: {
                         b: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=e/(e+exp(-a));gl_FragColor=b;}",
                         f: r,
                         g: B
                     },
                     s14: {
                         b: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(0.,0.,0.,0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=max(e,a);}",
                         f: r,
                         g: B
                     },
                     s15: {
                         b: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=mix(exp(-abs(a))-e,a,step(0.,a));}",
                         f: r,
                         g: B
                     },
                     s16: {
                         b: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=exp(-abs(a))-e;gl_FragColor=mix(.1*b,a,step(0.,a));}",
                         f: r,
                         g: B
                     },
                     s17: {
                         b: "uniform sampler2D u0,u6,u9;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),c=texture2D(u6,vv0),d=texture2D(u9,vv0),b=a/d;gl_FragColor=c*mix(exp(-abs(b))-f,b,step(0.,a));}",
                         f: ["u0", "u6", "u9"],
                         g: {
                             u0: 0,
                             u6: 1,
                             u9: 2
                         }
                     },
                     s18: {
                         b: "uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=atan(e*texture2D(u0,vv0))/e;}",
                         f: r,
                         g: B
                     },
                     s19: {
                         b: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=log(e+a);gl_FragColor=b;}",
                         f: r,
                         g: B
                     },
                     s20: {
                         b: "uniform sampler2D u0,u10;uniform float u11;const vec2 f=vec2(.5,.5);const float g=1e-5;const vec4 h=vec4(1.,1.,1.,1.),i=vec4(0.,0.,0.,0.);varying vec2 vv0;void main(){vec4 a=texture2D(u10,f);float b=u11*u11;vec4 c=max(b*a,g*h);gl_FragColor=texture2D(u0,vv0)/c;}",
                         f: ["u0", "u12", "u11"],
                         g: {
                             u0: 0,
                             u12: 1
                         }
                     },
                     s21: {
                         b: "uniform sampler2D u1;uniform vec2 u13;varying vec2 vv0;void main(){float a=u13.x*u13.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u13.y),g=floor(u13.x*fract(b*u13.y)),f=(g*u13.y+d)/a;gl_FragColor=texture2D(u1,f+c/a);}",
                         f: ["u1", "u13"],
                         g: u
                     },
                     s22: {
                         b: "uniform sampler2D u14,u15,u16;varying vec2 vv0;void main(){vec4 a=texture2D(u16,vv0);vec2 b=a.rg,c=a.ba;vec4 d=texture2D(u14,b),e=texture2D(u15,c);gl_FragColor=d*e;}",
                         f: ["u14", "u15", "u16"],
                         g: {
                             u15: 0,
                             u14: 1,
                             u16: 2
                         }
                     },
                     s23: {
                         b: "uniform float u17;uniform sampler2D u14,u15;varying vec2 vv0;void main(){vec2 a=fract(vv0*u17);vec4 b=texture2D(u14,vv0),c=texture2D(u15,a);gl_FragColor=b*c;}",
                         f: ["u15", "u14", "u17"],
                         g: {
                             u15: 0,
                             u14: 1
                         }
                     },
                     s24: {
                         b: "uniform float u17;uniform sampler2D u14,u15,u18,u19,u20,u21;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(1e-3,1e-3,1e-3,1e-3);void main(){vec2 i=vv0*u17,m=floor(i),c=i-m;vec4 n=texture2D(u14,vv0),d=texture2D(u15,c),a=texture2D(u21,vv0);a=a*255.;vec4 o=texture2D(u18,c),p=texture2D(u19,c),q=texture2D(u20,c),j=step(-g,-a),b=e-j,k=b*step(-e-g,-a);b*=e-k;vec4 h=b*step(-2.*e-g,-a);b*=e-h;vec4 l=b;d=j*d+k*o+h*p+l*q,gl_FragColor=n*d;}",
                         f: "u14 u15 u17 u21 u18 u19 u20".split(" "),
                         g: {
                             u15: 0,
                             u14: 1,
                             u21: 3,
                             u18: 4,
                             u19: 5,
                             u20: 6
                         }
                     },
                     s25: {
                         b: "uniform sampler2D u14,u15,u22;uniform float u17,u23,u24,u25;varying vec2 vv0;const vec2 j=vec2(1.,1.);void main(){vec2 a=floor(u23*vv0),g=u23*vv0-a;float b=u17/u23;vec2 c=floor(g*b),d=g*b-c,h=(a+d)/u23;float l=u23*u25/u17;vec2 m=l*c,i=(m+d*u24)/u25,e=step(i,j);vec4 n=texture2D(u14,h),o=texture2D(u15,i),p=n*o*e.x*e.y,k=texture2D(u22,h);gl_FragColor=p*u24*u24+k;}",
                         f: "u14 u15 u17 u23 u24 u25 u22".split(" "),
                         g: {
                             u15: 0,
                             u14: 1,
                             u22: 2
                         }
                     },
                     s26: {
                         b: "uniform sampler2D u14,u15;varying vec2 vv0;void main(){vec4 a=texture2D(u14,vv0),b=texture2D(u15,vv0);gl_FragColor=a*b;}",
                         f: ["u14", "u15"],
                         g: {
                             u15: 0,
                             u14: 1
                         }
                     },
                     s27: {
                         b: "uniform sampler2D u1,u22;uniform float u26;varying vec2 vv0;void main(){gl_FragColor=texture2D(u22,vv0)+u26*texture2D(u1,vv0);}",
                         f: ["u1", "u22", "u26"],
                         g: {
                             u1: 0,
                             u22: 1
                         }
                     },
                     s28: {
                         b: "varying vec2 vv0;uniform sampler2D u1;const vec4 g=vec4(1.,1.,1.,1.),e=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=dot(a,e)*g;}",
                         f: l,
                         g: u,
                         precision: "lowp"
                     },
                     s29: {
                         b: "varying vec2 vv0;uniform sampler2D u1;uniform float u27;const vec3 e=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u27)).rgb,c=texture2D(u1,vv0+vec2(u27,u27)).rgb,d=texture2D(u1,vv0+vec2(u27,0.)).rgb;gl_FragColor=vec4(dot(a,e),dot(b,e),dot(c,e),dot(d,e));}",
                         f: ["u1", "u27"],
                         g: u,
                         precision: "lowp"
                     },
                     s30: {
                         b: "varying vec2 vv0;uniform sampler2D u1;uniform float u27;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u27)).rgb,c=texture2D(u1,vv0+vec2(u27,u27)).rgb,d=texture2D(u1,vv0+vec2(u27,0.)).rgb;gl_FragColor=vec4(a.r,b.g,c.b,dot(d,f));}",
                         f: ["u1", "u27"],
                         g: u,
                         precision: "lowp"
                     },
                     s31: {
                         b: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u28;const vec4 g=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u1,vec2(vv0.x-u28,vv0.y-u28))*1.,a-=texture2D(u1,vec2(vv0.x-u28,vv0.y))*2.,a-=texture2D(u1,vec2(vv0.x-u28,vv0.y+u28))*1.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y-u28))*1.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y))*2.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y+u28))*1.;vec4 b=vec4(0.);b-=texture2D(u1,vec2(vv0.x-u28,vv0.y-u28))*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u28))*2.,b-=texture2D(u1,vec2(vv0.x+u28,vv0.y-u28))*1.,b+=texture2D(u1,vec2(vv0.x-u28,vv0.y+u28))*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u28))*2.,b+=texture2D(u1,vec2(vv0.x+u28,vv0.y+u28))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u1,vv0).a),f=texture2D(u2,vv0);gl_FragColor=f.a*e.r*g;}",
                         f: ["u1", "u2", "u28"],
                         g: z
                     },
                     s32: {
                         b: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u28;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float i=0.;vec2 l=k*u28,a,b;float c,d,g=0.;for(float f=-4.;f<=4.;f+=1.)for(float e=-4.;e<=4.;e+=1.)a=vec2(f,e),c=length(a)/2.,d=exp(-c*c),b=vv0+l*a,i+=d*texture2D(u1,b).r,g+=d;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u1,b).r-i/g)*j;}",
                         f: ["u1", "u2", "u28"],
                         g: z
                     },
                     s33: {
                         b: "uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}const vec2 h=vec2(.5,.5),i=vec2(1.,0.),j=vec2(0.,1.);void main(){vec2 a=vv0-u7*h;vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*i),d=texture2D(u3,a+u7*j),k=texture2D(u3,a+u7),l=e(b,c),g=e(d,k);gl_FragColor=e(l,g);}",
                         f: ["u3", "u7"],
                         g: Q
                     },
                     s34: {
                         b: "uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;const vec2 j=vec2(1.,0.),k=vec2(0.,1.),l=vec2(2.,0.),m=vec2(0.,2.);vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}vec4 f(vec2 a){vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*j),d=texture2D(u3,a+u7*k),g=texture2D(u3,a+u7),i=e(b,c),h=e(d,g);return e(i,h);}void main(){vec2 a=vv0+u7*vec2(-.55,-1.05);vec4 b=f(a),c=f(a+u7*l),d=f(a+u7*2.),g=f(a+u7*m),i=e(b,c),h=e(d,g);gl_FragColor=e(i,h);}",
                         f: ["u3", "u7"],
                         g: Q
                     },
                     s35: {
                         b: "uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*a;}",
                         f: ["u1"],
                         g: u,
                         precision: "lowp"
                     },
                     s36: {
                         b: "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;const float d=15444.;void main(){vec4 a=1001./d*texture2D(u1,vv0-3.*u7)+2002./d*texture2D(u1,vv0-2.*u7)+3003./d*texture2D(u1,vv0-u7)+3432./d*texture2D(u1,vv0)+3003./d*texture2D(u1,vv0+u7)+2002./d*texture2D(u1,vv0+2.*u7)+1001./d*texture2D(u1,vv0+3.*u7);gl_FragColor=a;}",
                         f: ["u7", "u1"],
                         g: u,
                         precision: "lowp"
                     },
                     s37: {
                         b: "uniform sampler2D u1,u29,u30;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);const float h=.1;void main(){vec4 a=texture2D(u29,vv0),b=texture2D(u30,vv0),c=texture2D(u1,vv0),d=max(g*h,b-a*a),f=sqrt(d);gl_FragColor=(c-a)/f;}",
                         f: ["u1", "u29", "u30"],
                         g: {
                             u1: 0,
                             u29: 1,
                             u30: 2
                         }
                     }
                 },
                 U = {
                     s38: {
                         b: "uniform float u17,u31;uniform sampler2D u14,u15,u22;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-5,1e-5);void main(){vec4 sum=texture2D(u22,vv0);float toSparsity=1.1111;vec2 uvFrom,uvWeight,xyPatch=ZERO2,eps2=EPS2/u17,xyTo=floor(vv0*u17+eps2);float weightSize=toSparsity*u17;vec2 halfFromSparsity=ONE2*(toSparsity-1.)/2.;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.)xyPatch.y=patch_y,uvFrom=(xyTo+HALF2+u31*(xyPatch-halfFromSparsity))/u17,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),uvWeight=(xyTo*toSparsity+xyPatch+HALF2)/weightSize,sum+=texture2D(u14,uvWeight)*texture2D(u15,uvFrom);}gl_FragColor=sum,gl_FragColor*=2.2222;}",
                         f: ["u17", "u14", "u15", "u22", "u31"],
                         Ha: ["1.1111", "gl_FragColor\\*=2.2222;"]
                     },
                     s39: {
                         b: "uniform float u17,u31,u25;uniform sampler2D u14,u15,u22;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-4,1e-4);void main(){vec4 sum=texture2D(u22,vv0);float fromSparsity=1.1111,shrinkFactor=3.3333;vec2 uvFrom,uvWeight,xyFrom,xyPatchTo,xyPatch=ZERO2,xyShrink=ZERO2,eps2=EPS2/u25,xyTo=floor(vv0*u17+eps2);float weightSize=fromSparsity*u25;vec2 halfFromSparsity=ONE2*(fromSparsity-1.)/2.;float toSparsity=weightSize/u17;vec2 xyFrom0=xyTo*shrinkFactor;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.){xyPatch.y=patch_y;for(float shrink_x=0.;shrink_x<3.3333;shrink_x+=1.){xyShrink.x=shrink_x;for(float shrink_y=0.;shrink_y<3.3333;shrink_y+=1.)xyShrink.y=shrink_y,xyFrom=xyFrom0+xyShrink+shrinkFactor*u31*(xyPatch-halfFromSparsity),uvFrom=(xyFrom+HALF2)/u25,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),xyPatchTo=xyPatch*shrinkFactor+xyShrink,uvWeight=(xyTo*toSparsity+xyPatchTo+HALF2)/weightSize,sum+=texture2D(u14,uvWeight)*texture2D(u15,uvFrom);}}}gl_FragColor=sum,gl_FragColor*=2.2222;}",
                         f: "u17 u25 u14 u15 u22 u31".split(" "),
                         Ha: ["1.1111", "gl_FragColor\\*=2.2222;", "3.3333"]
                     }
                 },
                 D = {
                     ab: function() {
                         return t
                     },
                     m: function() {
                         if (!t) {
                             v = "highp";
                             for (var h in R) f(R[h], h);
                             w.set("s0");
                             a.enableVertexAttribArray(0);
                             h = Ga.m();
                             t = !0;
                             return h
                         }
                     },
                     bc: function(h) {
                         h.forEach(function(A) {
                             D.lb(A)
                         })
                     },
                     lb: function(h) {
                         R[h.id] = h;
                         f(h, h.id)
                     },
                     zb: function(h, A, C) {
                         A || (A = h);
                         R[A] = Object.create(U[h]);
                         U[h].Ha && U[h].Ha.forEach(function(da, ua) {
                             R[A].b = R[A].b.replace(new RegExp(da, "g"), C[ua])
                         });
                         f(R[A], A)
                     },
                     set: function(h) {
                         k(R[h])
                     },
                     xc: function(h) {
                         return "undefined" !== typeof R[h]
                     },
                     Bd: function() {
                         return m.yd
                     },
                     qa: function() {
                         -1 !== g && (g = -1, m.ga_.forEach(function(h) {
                             0 !== h && a.disableVertexAttribArray(h)
                         }))
                     },
                     gb: function() {
                         var h = 0;
                         m.ga_.forEach(function(A, C) {
                             C = m.fa[C];
                             a.vertexAttribPointer(A, C, a.FLOAT, !1, m.ib, h);
                             h += 4 * C
                         })
                     },
                     rb: function() {
                         a.enableVertexAttribArray(0)
                     },
                     na: function() {
                         a.vertexAttribPointer(m.ga_[0], 2, a.FLOAT, !1, 8, 0)
                     },
                     Ub: function(h, A) {
                         a.uniform1i(m.l[h], A)
                     },
                     B: function(h, A) {
                         a.uniform1f(m.l[h], A)
                     },
                     ma: function(h, A, C) {
                         a.uniform2f(m.l[h],
                             A, C)
                     },
                     be: function(h, A) {
                         a.uniform2fv(m.l[h], A)
                     },
                     ce: function(h, A) {
                         a.uniform3fv(m.l[h], A)
                     },
                     ed: function(h, A, C, da) {
                         a.uniform3f(m.l[h], A, C, da)
                     },
                     Vb: function(h, A) {
                         a.uniform4fv(m.l[h], A)
                     },
                     de: function(h, A) {
                         a.uniformMatrix2fv(m.l[h], !1, A)
                     },
                     ee: function(h, A) {
                         a.uniformMatrix3fv(m.l[h], !1, A)
                     },
                     fe: function(h, A) {
                         a.uniformMatrix4fv(m.l[h], !1, A)
                     },
                     J: function(h, A) {
                         D.set(h);
                         A.forEach(function(C) {
                             switch (C.type) {
                                 case "4f":
                                     a.uniform4fv(m.l[C.name], C.value);
                                     break;
                                 case "3f":
                                     a.uniform3fv(m.l[C.name], C.value);
                                     break;
                                 case "2f":
                                     a.uniform2fv(m.l[C.name],
                                         C.value);
                                     break;
                                 case "1f":
                                     a.uniform1f(m.l[C.name], C.value);
                                     break;
                                 case "1i":
                                     a.uniform1i(m.l[C.name], C.value);
                                     break;
                                 case "mat2":
                                     a.uniformMatrix2fv(m.l[C.name], !1, C.value);
                                     break;
                                 case "mat3":
                                     a.uniformMatrix3fv(m.l[C.name], !1, C.value);
                                     break;
                                 case "mat4":
                                     a.uniformMatrix4fv(m.l[C.name], !1, C.value)
                             }
                         })
                     },
                     Kd: function() {
                         return "lowp"
                     }
                 };
             return D
         }(),
         a = !1,
         Ia = function() {
             function b(l) {
                 console.log("ERROR in ContextFeedForward : ", l);
                 return !1
             }

             function e() {
                 if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
                     var l =
                         navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                     l = 2 < l.length ? [parseInt(l[1], 10), parseInt(l[2], 10), parseInt(l[3] || 0, 10)] : [0, 0, 0];
                     return 12 === l[0] || 13 === l[0] ? !0 : !1
                 }
                 return /(Mac)/i.test(navigator.platform) && ((l = navigator.userAgent) ? (l = l.match(/Mac OS X (\d+)_(\d+)/) || l.match(/Mac OS X (\d+).(\d+)/), l = !l || 3 > l.length ? !1 : [parseInt(l[1], 10), parseInt(l[2], 10)]) : l = !1, l && 10 === l[0] && 15 === l[1]) ? !0 : !1
             }
             var f = !1,
                 k = !1,
                 g = !1,
                 m = !1,
                 p = !0,
                 t = !1,
                 v = {
                     A: function() {
                         return f.width
                     },
                     M: function() {
                         return f.height
                     },
                     Cd: function() {
                         return f
                     },
                     Ad: function() {
                         return a
                     },
                     u: function() {
                         return p
                     },
                     flush: function() {
                         a.flush()
                     },
                     Dc: function() {
                         t || (t = new Uint8Array(f.width * f.height * 4));
                         a.readPixels(0, 0, f.width, f.height, a.RGBA, a.UNSIGNED_BYTE, t);
                         return t
                     },
                     Ed: function() {
                         return f.toDataURL("image/jpeg")
                     },
                     Fd: function() {
                         I.K();
                         k || (k = document.createElement("canvas"), g = k.getContext("2d"));
                         k.width = f.width;
                         k.height = f.height;
                         var l = v.Dc(),
                             r = g.createImageData(k.width, k.height),
                             u, B, z = k.width,
                             Q = k.height,
                             R = r.data;
                         for (B = 0; B < Q; ++B) {
                             var U = Q - B - 1;
                             for (u = 0; u < z; ++u) {
                                 var D =
                                     4 * (B * z + u);
                                 var h = 4 * (U * z + u);
                                 R[D] = l[h];
                                 R[D + 1] = l[h + 1];
                                 R[D + 2] = l[h + 2];
                                 R[D + 3] = l[h + 3]
                             }
                         }
                         g.putImageData(r, 0, 0);
                         return k.toDataURL("image/png")
                     },
                     Dd: function(l) {
                         !k && l && (k = document.createElement("canvas"), g = k.getContext("2d"));
                         var r = l ? k : document.createElement("canvas");
                         r.width = f.width;
                         r.height = f.height;
                         (l ? g : r.getContext("2d")).drawImage(f, 0, 0);
                         return r
                     },
                     m: function(l) {
                         l.qc && !l.Na ? f = document.getElementById(l.qc) : l.Na && (f = l.Na);
                         f || (f = document.createElement("canvas"));
                         f.width = l && void 0 !== l.width ? l.width : 512;
                         f.height =
                             l && void 0 !== l.height ? l.height : 512;
                         "undefined" === typeof l && (l = {});
                         void 0 === l.premultipliedAlpha && (l.premultipliedAlpha = !1);
                         void 0 === l.Cb && (l.Cb = !0);
                         void 0 === l.antialias && (l.antialias = !1);
                         var r = {
                             antialias: l.antialias,
                             alpha: !0,
                             preserveDrawingBuffer: !0,
                             premultipliedAlpha: l.premultipliedAlpha,
                             stencil: !1,
                             depth: l.Cb
                         };
                         e() || (a = f.getContext("webgl2", r));
                         a ? p = !0 : ((a = f.getContext("webgl", r)) || (a = f.getContext("experimental-webgl", r)), p = !1);
                         if (!a) return b("WebGL is not enabled");
                         (m = a.getExtension("WEBGL_lose_context")) &&
                         f.addEventListener("webglcontextlost", l.Sc, !1);
                         if (!Ha.m()) return b("Not enough capabilities");
                         if (!Ha.lc() && p) return b("Your configuration cannot process color buffer float");
                         a.clearColor(0, 0, 0, 0);
                         a.disable(a.DEPTH_TEST);
                         a.disable(a.BLEND);
                         a.disable(a.DITHER);
                         a.disable(a.STENCIL_TEST);
                         a.disable(a.SCISSOR_TEST);
                         a.GENERATE_MIPMAP_HINT && a.hint(a.GENERATE_MIPMAP_HINT, a.FASTEST);
                         a.disable(a.SAMPLE_ALPHA_TO_COVERAGE);
                         a.disable(a.SAMPLE_COVERAGE);
                         return !0
                     },
                     Ic: function() {
                         if (!w.m()) return !1;
                         a.depthFunc(a.LEQUAL);
                         a.clearDepth(1);
                         return !0
                     }
                 };
             return v
         }(),
         Fa = function() {
             var b = "undefined" === typeof w ? null : w;
             return {
                 dd: function(e) {
                     b !== e && (b && b.qa(), b = e)
                 },
                 ab: function() {
                     return b.ab()
                 },
                 na: function() {
                     b.na()
                 },
                 gb: function() {
                     b.gb()
                 },
                 qa: function() {
                     b.qa()
                 },
                 set: function(e) {
                     b.set(e)
                 }
             }
         }(),
         S = function() {
             var b = null,
                 e = null,
                 f = 0,
                 k = -2,
                 g = -2,
                 m = !1,
                 p = {
                     reset: function() {
                         g = k = -2
                     },
                     m: function() {
                         m || (b = a.createBuffer(), a.bindBuffer(a.ARRAY_BUFFER, b), a.bufferData(a.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), a.STATIC_DRAW), e = a.createBuffer(),
                             a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, e), a.bufferData(a.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), a.STATIC_DRAW), p.ha(), m = !0)
                     },
                     a: function(t) {
                         var v = f++,
                             l = t.W ? t.W.length : 0,
                             r = "undefined" === typeof t.mode ? a.STATIC_DRAW : t.mode,
                             u = a.createBuffer();
                         a.bindBuffer(a.ARRAY_BUFFER, u);
                         a.bufferData(a.ARRAY_BUFFER, t.Yb instanceof Float32Array ? t.Yb : new Float32Array(t.Yb), r);
                         k = v;
                         if (t.W) {
                             var B = a.createBuffer();
                             a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, B);
                             if (65536 > t.W.length) {
                                 var z = Uint16Array;
                                 var Q = a.UNSIGNED_SHORT;
                                 var R =
                                     2
                             } else z = Uint32Array, Q = a.UNSIGNED_INT, R = 4;
                             a.bufferData(a.ELEMENT_ARRAY_BUFFER, t.W instanceof z ? t.W : new z(t.W), r);
                             g = v
                         }
                         var U = {
                             kc: function(D) {
                                 k !== v && (a.bindBuffer(a.ARRAY_BUFFER, u), k = v);
                                 D && Fa.gb()
                             },
                             hc: function() {
                                 g !== v && (a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, B), g = v)
                             },
                             bind: function(D) {
                                 U.kc(D);
                                 U.hc()
                             },
                             wd: function() {
                                 a.drawElements(a.TRIANGLES, l, Q, 0)
                             },
                             xd: function(D, h) {
                                 a.drawElements(a.TRIANGLES, D, Q, h * R)
                             },
                             remove: function() {
                                 a.deleteBuffer(u);
                                 t.W && a.deleteBuffer(B);
                                 U = null
                             }
                         };
                         return U
                     },
                     ha: function() {
                         -1 !== k && (a.bindBuffer(a.ARRAY_BUFFER,
                             b), k = -1); - 1 !== g && (a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, e), g = -1)
                     },
                     h: function(t, v) {
                         t && S.ha();
                         v && Fa.na();
                         a.drawElements(a.TRIANGLES, 3, a.UNSIGNED_SHORT, 0)
                     },
                     Bc: function() {
                         a.deleteBuffer(b);
                         a.deleteBuffer(e)
                     }
                 };
             return p
         }(),
         I = function() {
             var b = null,
                 e = null,
                 f = null,
                 k = !1,
                 g = {
                     w: -2,
                     zc: 1
                 };
             return {
                 m: function() {
                     if (!k) {
                         b = a.createFramebuffer();
                         var m = Ha.u();
                         e = m && a.DRAW_FRAMEBUFFER ? a.DRAW_FRAMEBUFFER : a.FRAMEBUFFER;
                         f = m && a.READ_FRAMEBUFFER ? a.READ_FRAMEBUFFER : a.FRAMEBUFFER;
                         k = !0
                     }
                 },
                 Hd: function() {
                     return e
                 },
                 Wa: function() {
                     return f
                 },
                 aa: function() {
                     return a.FRAMEBUFFER
                 },
                 Ld: function() {
                     return g
                 },
                 zd: function() {
                     return b
                 },
                 a: function(m) {
                     void 0 === m.Bb && (m.Bb = !1);
                     var p = m.oa ? m.oa : !1,
                         t = m.width,
                         v = void 0 !== m.height ? m.height : m.width,
                         l = b,
                         r = !1,
                         u = !1,
                         B = 0;
                     p && (t = t ? t : p.A(), v = v ? v : p.M());
                     var z = {
                         Tb: function() {
                             u || (l = a.createFramebuffer(), u = !0, B = g.zc++)
                         },
                         ac: function() {
                             z.Tb();
                             z.j();
                             r = a.createRenderbuffer();
                             a.bindRenderbuffer(a.RENDERBUFFER, r);
                             a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_COMPONENT16, t, v);
                             a.framebufferRenderbuffer(e, a.DEPTH_ATTACHMENT, a.RENDERBUFFER,
                                 r);
                             a.clearDepth(1)
                         },
                         bind: function(Q, R) {
                             B !== g.w && (a.bindFramebuffer(e, l), g.w = B);
                             p && p.j();
                             R && a.viewport(0, 0, t, v);
                             Q && a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT)
                         },
                         pd: function() {
                             B !== g.w && (a.bindFramebuffer(e, l), g.w = B)
                         },
                         clear: function() {
                             a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT)
                         },
                         sd: function() {
                             a.clear(a.COLOR_BUFFER_BIT)
                         },
                         td: function() {
                             a.clear(a.DEPTH_BUFFER_BIT)
                         },
                         fd: function() {
                             a.viewport(0, 0, t, v)
                         },
                         j: function() {
                             B !== g.w && (a.bindFramebuffer(e, l), g.w = B)
                         },
                         rtt: function(Q) {
                             p = Q;
                             g.w !== B && (a.bindFramebuffer(a.FRAMEBUFFER,
                                 l), g.w = B);
                             Q.j()
                         },
                         K: function() {
                             a.bindFramebuffer(e, null);
                             g.w = -1
                         },
                         resize: function(Q, R) {
                             t = Q;
                             v = R;
                             r && (a.bindRenderbuffer(a.RENDERBUFFER, r), a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_COMPONENT16, t, v))
                         },
                         remove: function() {
                             a.bindFramebuffer(e, l);
                             a.framebufferTexture2D(e, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, null, 0);
                             r && a.framebufferRenderbuffer(e, a.DEPTH_ATTACHMENT, a.RENDERBUFFER, null);
                             a.bindFramebuffer(e, null);
                             a.deleteFramebuffer(l);
                             r && a.deleteRenderbuffer(r);
                             z = null
                         }
                     };
                     m.Bb && z.ac();
                     return z
                 },
                 K: function() {
                     a.bindFramebuffer(e,
                         null);
                     g.w = -1
                 },
                 kd: function() {
                     a.bindFramebuffer(e, null);
                     a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                     a.viewport(0, 0, Ha.A(), Ha.M());
                     g.w = -1
                 },
                 reset: function() {
                     g.w = -2
                 },
                 U: function() {
                     0 !== g.w && (a.bindFramebuffer(e, b), g.w = 0)
                 },
                 clear: function() {
                     a.viewport(0, 0, Ha.A(), Ha.M());
                     a.clear(a.COLOR_BUFFER_BIT)
                 }
             }
         }(),
         Y = function() {
             function b(c) {
                 a.bindTexture(a.TEXTURE_2D, c)
             }

             function e(c) {
                 da[0] = c;
                 c = ua[0];
                 var E = c >> 16 & 32768,
                     V = c >> 12 & 2047,
                     H = c >> 23 & 255;
                 return 103 > H ? E : 142 < H ? E | 31744 | ((255 == H ? 0 : 1) && c & 8388607) : 113 > H ? (V |= 2048, E | (V >>
                     114 - H) + (V >> 113 - H & 1)) : E = (E | H - 112 << 10 | V >> 1) + (V & 1)
             }

             function f(c) {
                 var E = new Uint16Array(c.length);
                 c.forEach(function(V, H) {
                     E[H] = e(V)
                 });
                 return E
             }

             function k() {
                 if (null !== ra.Ya) return ra.Ya;
                 var c = m(f([1, 1, 1, 1]));
                 return null === c ? !0 : ra.Ya = c
             }

             function g() {
                 if (null !== ra.Za) return ra.Za;
                 var c = m(new Uint8Array([255, 255, 255, 255]));
                 return null === c ? !0 : ra.Za = c
             }

             function m(c) {
                 if (!Fa.ab() || !Q) return null;
                 var E = null;
                 try {
                     var V = a.getError();
                     E = ba.a({
                         isFloat: !1,
                         G: !0,
                         array: c,
                         width: 1
                     });
                     V = a.getError();
                     if (V !== a.NO_ERROR) return !1
                 } catch (H) {
                     return !1
                 }
                 I.K();
                 a.viewport(0, 0, 1, 1);
                 a.clearColor(0, 0, 0, 0);
                 a.clear(a.COLOR_BUFFER_BIT);
                 Fa.set("s0");
                 E.nb(0);
                 S.h(!1, !0);
                 c = new Uint8Array(4);
                 a.readPixels(0, 0, 1, 1, a.RGBA, a.UNSIGNED_BYTE, c);
                 c = .9 < c[0];
                 E.remove();
                 I.U();
                 return c
             }
             var p = 0,
                 t = null,
                 v = 0,
                 l = null,
                 r = !1,
                 u = null,
                 B = null,
                 z = null,
                 Q = !1,
                 R = !1,
                 U = null,
                 D = null,
                 h = [
                     [1, 0, 0, 0],
                     [0, 1, 0, 0],
                     [0, 0, 1, 0],
                     [0, 0, 0, 1]
                 ],
                 A = !1,
                 C = !1,
                 da = new Float32Array(1),
                 ua = new Int32Array(da.buffer),
                 ra = {
                     Ya: null,
                     Za: null
                 },
                 ba = {
                     m: function() {
                         if (!Q) {
                             B = [a.RGB, !1, a.RGB, a.RGBA];
                             z = [a.RGB, !1, a.RGB, a.RGBA];
                             t = [a.TEXTURE0, a.TEXTURE1,
                                 a.TEXTURE2, a.TEXTURE3, a.TEXTURE4, a.TEXTURE5, a.TEXTURE6, a.TEXTURE7
                             ];
                             A = "undefined" !== typeof JEContext;
                             C = "undefined" !== typeof Ha;
                             A && JEContext.Xd() && t.push(a.TEXTURE8, a.TEXTURE9);
                             l = [-1, -1, -1, -1, -1, -1, -1, -1];
                             u = [a.UNSIGNED_BYTE, a.FLOAT, a.FLOAT];
                             if (!r) {
                                 for (var c = new Float32Array(16384), E = 0; 16384 > E; ++E) c[E] = 2 * Math.random() - 1;
                                 r = {
                                     random: ba.a({
                                         isFloat: !0,
                                         isPot: !0,
                                         array: c,
                                         width: 64
                                     }),
                                     Xb: ba.a({
                                         isFloat: !1,
                                         isPot: !0,
                                         width: 1,
                                         array: new Uint8Array([0, 0, 0, 0])
                                     })
                                 }
                             }
                             Q = !0
                         }
                     },
                     Hc: function() {
                         ba.ld()
                     },
                     Pd: function() {
                         return r.Xb
                     },
                     ld: function() {
                         u[1] = Ha.ya()
                     },
                     $c: function() {
                         z = B = [a.RGBA, a.RGBA, a.RGBA, a.RGBA]
                     },
                     Yd: function(c, E) {
                         w.set("s1");
                         I.K();
                         var V = c.A(),
                             H = c.M();
                         a.viewport(0, 0, V, H);
                         c.c(0);
                         S.h(!1, !1);
                         a.readPixels(0, 0, V, H, a.RGBA, a.UNSIGNED_BYTE, E)
                     },
                     Ac: function(c, E, V) {
                         a.activeTexture(a.TEXTURE0);
                         p = 0;
                         var H = a.createTexture();
                         b(H);
                         var na = Ha.u() && a.RGBA32F ? a.RGBA32F : a.FLOAT;
                         E = E instanceof Float32Array ? E : new Float32Array(E);
                         var fa = Math.log2(E.length);
                         fa !== Math.floor(fa) && (a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE),
                             a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE));
                         a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST);
                         a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST);
                         a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, V);
                         a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, c.A(), c.M(), 0, a.RGBA, na, E);
                         b(null);
                         a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1);
                         I.U();
                         w.set("s0");
                         c.I();
                         a.clearColor(0, 0, 0, 0);
                         a.clear(a.COLOR_BUFFER_BIT);
                         b(H);
                         S.h(!0, !1);
                         a.deleteTexture(H)
                     },
                     a: function(c) {
                         function E() {
                             b(F);
                             P && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,
                                 P);
                             c.isPot ? (a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, c.Fb ? a.MIRRORED_REPEAT : a.REPEAT), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, c.X ? a.MIRRORED_REPEAT : a.REPEAT)) : (a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE));
                             c.Aa && "undefined" !== typeof JESETTINGS && a.texParameterf(a.TEXTURE_2D, JEContext.Gd().TEXTURE_MAX_ANISOTROPY_EXT, JESETTINGS.nd);
                             a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, c.isLinear ? a.LINEAR : a.NEAREST);
                             c.isLinear ? a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, c.isMipmap && !ha ? a.NEAREST_MIPMAP_LINEAR : a.LINEAR) : a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, c.isMipmap && !ha ? a.NEAREST_MIPMAP_NEAREST : a.NEAREST);
                             Z = B[c.ka - 1];
                             L = z[c.ka - 1];
                             oa = u[V];
                             if (Ha.u()) {
                                 var q = a.RGBA32F;
                                 Z === a.RGBA && oa === a.FLOAT && q && (L = q);
                                 Z === a.RGB && oa === a.FLOAT && q && (L = q, Z = a.RGBA)
                             }
                             if (c.G && !c.isFloat || c.isFloat && c.isMipmap && Ga.Lc())(q = a.RGBA16F) && (L = q), oa = Ha.ya();
                             c.Ib && "undefined" !== typeof a.texStorage2D && (sa = c.Ib);
                             c.Gb && 4 === c.ka &&
                                 (Z = JEContext.Nd());
                             if (c.D) a.texImage2D(a.TEXTURE_2D, 0, L, Z, oa, c.D);
                             else if (c.url) a.texImage2D(a.TEXTURE_2D, 0, L, Z, oa, ia);
                             else if (pa) {
                                 try {
                                     a.getError(), a.texImage2D(a.TEXTURE_2D, 0, L, J, N, 0, Z, oa, pa), a.getError() !== a.NO_ERROR && (a.texImage2D(a.TEXTURE_2D, 0, L, J, N, 0, Z, oa, null), a.getError() !== a.NO_ERROR && a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, J, N, 0, a.RGBA, a.UNSIGNED_BYTE, null))
                                 } catch (y) {
                                     a.texImage2D(a.TEXTURE_2D, 0, L, J, N, 0, Z, oa, null)
                                 }
                                 c.isKeepArray || (pa = null)
                             } else a.texImage2D(a.TEXTURE_2D, 0, L, J, N, 0, Z, oa, null);
                             if (c.isMipmap)
                                 if (!ha &&
                                     X) X.Va(), Aa = !0;
                                 else if (ha) {
                                 q = Math.log(Math.min(J, N)) / Math.log(2);
                                 ya = Array(1 + q);
                                 ya[0] = F;
                                 for (var O = 1; O <= q; ++O) {
                                     var ja = Math.pow(2, O),
                                         d = J / ja;
                                     ja = N / ja;
                                     var n = a.createTexture();
                                     b(n);
                                     a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST);
                                     a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST);
                                     a.texImage2D(a.TEXTURE_2D, 0, L, d, ja, 0, Z, oa, null);
                                     b(null);
                                     ya[O] = n
                                 }
                                 Aa = !0
                             }
                             b(null);
                             l[p] = -1;
                             P && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1);
                             K = !0;
                             qa && X && (qa(X), qa = !1)
                         }
                         "undefined" === typeof c.isFloat && (c.isFloat = !1);
                         "undefined" ===
                         typeof c.G && (c.G = !1);
                         "undefined" === typeof c.isPot && (c.isPot = !0);
                         "undefined" === typeof c.isLinear && (c.isLinear = !1);
                         "undefined" === typeof c.isMipmap && (c.isMipmap = !1);
                         "undefined" === typeof c.Ma && (c.Ma = !1);
                         void 0 === c.Aa && (c.Aa = !1);
                         void 0 === c.X && (c.X = !1);
                         void 0 === c.Fb && (c.Fb = !1);
                         void 0 === c.Gb && (c.Gb = !1);
                         void 0 === c.ka && (c.ka = 4);
                         void 0 === c.Db && (c.Db = !1);
                         "undefined" === typeof c.isFlipY && (c.isFlipY = c.url || c.array ? !0 : !1);
                         "undefined" === typeof c.isKeepArray && (c.isKeepArray = !1);
                         c.data && (c.array = "string" === typeof c.data ?
                             Ea(c.data) : c.isFloat ? new Float32Array(c.data) : new Uint8Array(c.data), c.isFlipY = !1);
                         var V = 0,
                             H = c.D ? !0 : !1,
                             na = null,
                             fa = null,
                             aa = !1,
                             ta = null;
                         c.isFloat && (c.G = !0);
                         c.G && (V = 1);
                         c.Db || Ha.u() || !c.isFloat || !C || Ha.ob() || (c.isFloat = !1);
                         c.isFloat && (V = 2);
                         c.Aa && A && !JEContext.Sd() && (c.Aa = !1);
                         var F = a.createTexture(),
                             qa = c.Ma,
                             ia = null,
                             pa = !1,
                             J = 0,
                             N = 0,
                             K = !1,
                             ka = v++,
                             ea = !1,
                             ca = null,
                             x = null,
                             M = null,
                             va = null,
                             L = null,
                             Z = null,
                             oa = null,
                             P = c.isFlipY,
                             ha = c.G && c.isMipmap && "undefined" !== typeof Ga && !Ga.nc() ? !0 : !1,
                             ya = null,
                             sa = -1,
                             Aa = !1;
                         "undefined" !==
                         typeof c.width && c.width && (J = c.width, N = "undefined" !== typeof c.height && c.height ? c.height : J);
                         var X = {
                             get: function() {
                                 return F
                             },
                             A: function() {
                                 return J
                             },
                             M: function() {
                                 return N
                             },
                             Qd: function() {
                                 return c.url
                             },
                             Td: function() {
                                 return c.isFloat
                             },
                             Vd: function() {
                                 return c.G
                             },
                             Wd: function() {
                                 return c.isLinear
                             },
                             Va: function() {
                                 a.generateMipmap(a.TEXTURE_2D)
                             },
                             jc: function(q, O) {
                                 ha ? (q || (q = X.wb()), X.Ka(O), b(ya[q]), l[O] = -1) : X.c(O)
                             },
                             wb: function() {
                                 -1 === sa && (sa = Math.log(J) / Math.log(2));
                                 return sa
                             },
                             Cc: function(q) {
                                 if (ha) {
                                     q || (q = X.wb());
                                     w.set("s11");
                                     X.Ka(0);
                                     for (var O = J, ja = N, d = 1; d <= q; ++d) O /= 2, ja /= 2, w.ma("u7", .25 / O, .25 / ja), a.viewport(0, 0, O, ja), b(ya[d - 1]), a.framebufferTexture2D(I.aa(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, ya[d], 0), S.h(!1, 1 === d);
                                     l[0] = -1
                                 } else X.Va()
                             },
                             Ka: function(q) {
                                 q !== p && (a.activeTexture(t[q]), p = q)
                             },
                             c: function(q) {
                                 if (!K) return !1;
                                 X.Ka(q);
                                 if (l[q] === ka) return !1;
                                 b(F);
                                 l[q] = ka;
                                 return !0
                             },
                             nb: function(q) {
                                 a.activeTexture(t[q]);
                                 p = q;
                                 b(F);
                                 l[q] = ka
                             },
                             j: function() {
                                 a.framebufferTexture2D(I.aa(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, F, 0)
                             },
                             I: function() {
                                 a.viewport(0,
                                     0, J, N);
                                 a.framebufferTexture2D(I.aa(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, F, 0)
                             },
                             je: function() {
                                 a.framebufferTexture2D(I.aa(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, null, 0)
                             },
                             resize: function(q, O) {
                                 J = q;
                                 N = O;
                                 E()
                             },
                             clone: function(q) {
                                 q = ba.a({
                                     width: J,
                                     height: N,
                                     G: c.G,
                                     isFloat: c.isFloat,
                                     isLinear: c.isLinear,
                                     X: c.X,
                                     isFlipY: q ? !P : P,
                                     isPot: c.isPot
                                 });
                                 Fa.set("s0");
                                 I.U();
                                 q.j();
                                 a.viewport(0, 0, J, N);
                                 X.c(0);
                                 S.h(!0, !0);
                                 return q
                             },
                             fd: function() {
                                 a.viewport(0, 0, J, N)
                             },
                             remove: function() {
                                 a.deleteTexture(F);
                                 X = null
                             },
                             refresh: function() {
                                 X.nb(0);
                                 P &&
                                     a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !0);
                                 H ? a.texImage2D(a.TEXTURE_2D, 0, L, Z, a.UNSIGNED_BYTE, c.D) : a.texImage2D(a.TEXTURE_2D, 0, L, J, N, 0, Z, oa, pa);
                                 P && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1)
                             },
                             pb: function() {
                                 var q = J * N * 4;
                                 x = [new Uint8Array(q), new Uint8Array(q), new Uint8Array(q), new Uint8Array(q)];
                                 ca = [new Float32Array(x[0].buffer), new Float32Array(x[1].buffer), new Float32Array(x[2].buffer), new Float32Array(x[3].buffer)];
                                 M = new Uint8Array(4 * q);
                                 va = new Float32Array(M.buffer);
                                 ea = !0
                             },
                             Sb: function() {
                                 ea || X.pb();
                                 a.readPixels(0,
                                     0, J, 4 * N, a.RGBA, a.UNSIGNED_BYTE, M);
                                 for (var q = J * N, O = 2 * q, ja = 3 * q, d = 0; d < q; ++d) ca[0][d] = va[d], ca[1][d] = va[d + q], ca[2][d] = va[d + O], ca[3][d] = va[d + ja];
                                 return ca
                             },
                             qb: function() {
                                 I.K();
                                 w.set("s12");
                                 X.c(0);
                                 for (var q = 0; 4 > q; ++q) a.viewport(0, N * q, J, N), w.Vb("u8", h[q]), S.h(!1, 0 === q)
                             },
                             ke: function(q) {
                                 var O = oa === u[0] && !g();
                                 b(F);
                                 P && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, P);
                                 O ? (aa || (na = document.createElement("canvas"), na.width = J, na.height = N, fa = na.getContext("2d"), ta = fa.createImageData(J, N), aa = !0), ta.data.set(q), fa.putImageData(ta,
                                     0, 0), a.texImage2D(a.TEXTURE_2D, 0, L, Z, oa, na)) : a.texImage2D(a.TEXTURE_2D, 0, L, J, N, 0, Z, oa, q);
                                 l[p] = ka;
                                 P && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1)
                             },
                             le: function(q, O) {
                                 b(F);
                                 a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, O);
                                 a.texImage2D(a.TEXTURE_2D, 0, L, Z, oa, q);
                                 l[p] = ka;
                                 O && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1)
                             },
                             $d: function(q, O) {
                                 var ja = J * N,
                                     d = 4 * ja;
                                 q = c.G ? q ? "RGBE" : "JSON" : "RGBA";
                                 O && (q = O);
                                 O = Ha.u() && !1;
                                 var n = null;
                                 switch (q) {
                                     case "RGBE":
                                         n = "s40";
                                         break;
                                     case "JSON":
                                         n = O ? "s0" : "s12";
                                         break;
                                     case "RGBA":
                                     case "RGBAARRAY":
                                         n = "s6"
                                 }
                                 ea || ("RGBA" ===
                                     q || "RGBE" === q || "RGBAARRAY" === q ? (x = new Uint8Array(d), ea = !0) : "JSON" !== q || O || X.pb());
                                 I.K();
                                 w.set(n);
                                 X.c(0);
                                 d = null;
                                 if ("RGBA" === q || "RGBE" === q || "RGBAARRAY" === q) {
                                     a.viewport(0, 0, J, N);
                                     S.h(!0, !0);
                                     a.readPixels(0, 0, J, N, a.RGBA, a.UNSIGNED_BYTE, x);
                                     if ("RGBAARRAY" === q) return {
                                         data: x
                                     };
                                     R || (U = document.createElement("canvas"), D = U.getContext("2d"), R = !0);
                                     U.width = J;
                                     U.height = N;
                                     ja = D.createImageData(J, N);
                                     ja.data.set(x);
                                     D.putImageData(ja, 0, 0);
                                     d = U.toDataURL("image/png")
                                 } else if ("JSON" === q)
                                     if (O) d = new Float32Array(ja), a.viewport(0,
                                         0, J, N), S.h(!0, !0), a.readPixels(0, 0, J, N, a.RGBA, a.FLOAT, d);
                                     else {
                                         for (d = 0; 4 > d; ++d) a.viewport(0, N * d, J, N), w.Vb("u8", h[d]), S.h(!d, !d);
                                         X.Sb();
                                         d = Array(ja);
                                         for (O = 0; O < ja; ++O) d[4 * O] = ca[0][O], d[4 * O + 1] = ca[1][O], d[4 * O + 2] = ca[2][O], d[4 * O + 3] = ca[3][O]
                                     } return {
                                     format: q,
                                     data: d,
                                     width: J,
                                     height: N,
                                     isMirrorY: c.X,
                                     isFlipY: "RGBA" === q ? c.isFlipY : !c.isFlipY
                                 }
                             }
                         };
                         c.isMipmap && !ha && K && !Aa && (X.Va(), Aa = !0);
                         if (c.url) b(F), a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, 1, 1, 0, a.RGBA, a.UNSIGNED_BYTE, null), ia = new Image, ia.vd = "Anonymous", ia.crossOrigin = "Anonymous",
                             ia.src = c.url, ia.onload = function() {
                                 J = ia.width;
                                 N = ia.height;
                                 E()
                             };
                         else if (c.D) {
                             var G = function() {
                                 J = void 0 !== c.D.videoWidth ? c.D.videoWidth : c.D.width;
                                 N = void 0 !== c.D.videoHeight ? c.D.videoHeight : c.D.height;
                                 J ? E() : setTimeout(G, 1)
                             };
                             G()
                         } else c.array ? (c.G && !c.isFloat ? c.array instanceof Uint16Array ? (pa = c.array, E()) : k() ? (pa = f(c.array), E()) : (E(), ba.Ac(X, c.array, P)) : (pa = c.isFloat ? c.array instanceof Float32Array ? c.array : new Float32Array(c.array) : c.array instanceof Uint8Array ? c.array : new Uint8Array(c.array), E()), c.isKeepArray ||
                             (pa && pa !== c.array && (pa = null), delete c.array)) : E();
                         X.Md = X.A;
                         qa && K && (qa(X), qa = !1);
                         return X
                     },
                     K: function(c) {
                         c !== p && (a.activeTexture(t[c]), p = c);
                         l[c] = -1;
                         b(null)
                     },
                     qd: function(c) {
                         r.random.c(c)
                     },
                     reset: function() {
                         for (var c = 0; c < t.length; ++c) l[c] = -1;
                         p = -1
                     },
                     Zd: function() {
                         p = -1
                     },
                     he: function() {
                         for (var c = 0; c < t.length; ++c) ba.K(c)
                     },
                     Bc: function() {
                         r && (r.random.remove(), r.Xb.remove())
                     },
                     ie: function(c, E) {
                         if ("RGBA" === c.format || "RGBE" === c.format) {
                             var V = new Image;
                             V.src = c.data;
                             V.onload = function() {
                                 ba.a({
                                     X: c.isMirrorY,
                                     isFlipY: c.isFlipY,
                                     isFloat: !1,
                                     D: V,
                                     Ma: function(H) {
                                         if ("RGBA" === c.format) E(H);
                                         else {
                                             var na = c.width,
                                                 fa = c.height,
                                                 aa = ba.a({
                                                     X: c.isMirrorY,
                                                     isFloat: !0,
                                                     width: na,
                                                     height: fa,
                                                     isFlipY: c.isFlipY
                                                 });
                                             I.U();
                                             a.viewport(0, 0, na, fa);
                                             w.set("s41");
                                             aa.j();
                                             H.c(0);
                                             S.h(!0, !0);
                                             ba.K(0);
                                             E(aa);
                                             a.flush();
                                             setTimeout(H.remove, 50)
                                         }
                                     }
                                 })
                             }
                         } else "JSON" === c.format ? E(ba.a({
                             isFloat: !0,
                             isFlipY: c.isFlipY,
                             width: c.width,
                             height: c.height,
                             array: new Float32Array(c.data)
                         })) : E(!1)
                     }
                 };
             return ba
         }(),
         Ja = {
             a: function(b) {
                 var e = [Y.a(b), Y.a(b)],
                     f = [e[1], e[0]],
                     k = f,
                     g = {
                         cd: function(m) {
                             k[1].j();
                             k[0].c(m);
                             g.Wb()
                         },
                         ae: function(m) {
                             k[1].I();
                             k[0].c(m);
                             g.Wb()
                         },
                         Wb: function() {
                             k = k === e ? f : e
                         },
                         refresh: function() {
                             k[0].refresh();
                             k[1].refresh()
                         },
                         c: function(m) {
                             k[0].c(m)
                         },
                         Id: function() {
                             return k[0]
                         }
                     };
                 return g
             }
         },
         Ha = function() {
             function b() {
                 e = "undefined" === typeof Ia ? JEContext : Ia;
                 f = !0
             }
             var e = null,
                 f = !1,
                 k = !1,
                 g = !1,
                 m = !1,
                 p = !1,
                 t = !1,
                 v = !1,
                 l = !1,
                 r = !1,
                 u = !1,
                 B = !1,
                 z = !0,
                 Q = !0,
                 R = !0,
                 U = null,
                 D = "undefined" === typeof window ? {} : window,
                 h = {
                     m: function() {
                         if (f) return !0;
                         b();
                         h.sb();
                         h.Ua();
                         h.vc();
                         h.wc();
                         I.m();
                         Y.m();
                         if (!h.rc()) return !1;
                         S.m();
                         Y.Hc();
                         return !0
                     },
                     A: function() {
                         f || b();
                         return e.A()
                     },
                     M: function() {
                         f || b();
                         return e.M()
                     },
                     u: function() {
                         f || b();
                         return e.u()
                     },
                     vc: function() {
                         B = (u = a.getExtension("EXT_color_buffer_float") || a.getExtension("WEBGL_color_buffer_float") || a.getExtension("OES_color_buffer_float")) ? !0 : !1;
                         D.GL_EXT_COLORBUFFERFLOAT = u
                     },
                     wc: function() {
                         a.getExtension("EXT_color_buffer_half_float") || a.getExtension("WEBGL_color_buffer_half_float") || a.getExtension("OES_color_buffer_half_float")
                     },
                     sb: function() {
                         if (!k) {
                             this.u() || (g = a.getExtension("OES_texture_float") ||
                                 a.getExtension("MOZ_OES_texture_float") || a.getExtension("WEBKIT_OES_texture_float"), p = (D.GL_EXT_FLOAT = g) ? !0 : !1);
                             if (p || this.u()) m = a.getExtension("OES_texture_float_linear") || a.getExtension("MOZ_OES_texture_float_linear") || a.getExtension("WEBKIT_OES_texture_float_linear"), D.GL_EXT_FLOATLINEAR = m;
                             k = !0
                         }
                     },
                     Ua: function() {
                         if (!r) {
                             if (!this.u()) {
                                 if (t = a.getExtension("OES_texture_half_float") || a.getExtension("MOZ_OES_texture_half_float") || a.getExtension("WEBKIT_OES_texture_half_float")) U = t.HALF_FLOAT_OES, v = !0;
                                 !U && a.HALF_FLOAT && (U = a.HALF_FLOAT);
                                 !U && a.FLOAT && (U = a.FLOAT);
                                 D.GL_EXT_HALFFLOAT = t
                             }
                             if (v || this.u()) l = a.getExtension("OES_texture_half_float_linear") || a.getExtension("MOZ_OES_texture_half_float_linear") || a.getExtension("WEBKIT_OES_texture_half_float_linear"), D.GL_EXT_HALFFLOATLINEAR = l;
                             r = !0
                         }
                     },
                     ya: function() {
                         if (h.u()) return a.HALF_FLOAT;
                         h.Ua();
                         return v ? U : a.FLOAT
                     },
                     ob: function() {
                         return z
                     },
                     mc: function() {
                         return Q
                     },
                     rd: function() {
                         return R
                     },
                     lc: function() {
                         return B
                     },
                     tc: function() {
                         Q = z = !0;
                         var A = a.createFramebuffer();
                         a.bindFramebuffer(a.FRAMEBUFFER, A);
                         var C = a.createTexture();
                         a.bindTexture(a.TEXTURE_2D, C);
                         a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST);
                         a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST);
                         a.texImage2D(a.TEXTURE_2D, 0, h.u() && a.RGBA32F ? a.RGBA32F : a.RGBA, 1, 1, 0, a.RGBA, a.FLOAT, null);
                         a.framebufferTexture2D(I.aa(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, C, 0);
                         var da = a.checkFramebufferStatus(I.Wa());
                         da !== a.FRAMEBUFFER_COMPLETE && (z = !1);
                         a.texImage2D(a.TEXTURE_2D, 0, h.u() && a.RGBA16F ? a.RGBA16F : a.RGBA,
                             1, 1, 0, a.RGBA, h.ya(), null);
                         a.framebufferTexture2D(I.aa(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, C, 0);
                         da = a.checkFramebufferStatus(I.Wa());
                         da !== a.FRAMEBUFFER_COMPLETE && (Q = !1);
                         a.bindTexture(a.TEXTURE_2D, null);
                         a.bindFramebuffer(a.FRAMEBUFFER, null);
                         a.deleteTexture(C);
                         a.deleteFramebuffer(A)
                     },
                     sc: function() {
                         var A = I.a({
                             width: 1
                         });
                         A.Tb();
                         var C = Y.a({
                             width: 1,
                             isFloat: !0,
                             ka: 3
                         });
                         A.j();
                         C.j();
                         a.flush();
                         a.checkFramebufferStatus(I.Wa()) !== a.FRAMEBUFFER_COMPLETE ? (Y.$c(), R = !1) : R = !0;
                         A.remove();
                         C.remove()
                     },
                     rc: function() {
                         h.tc();
                         if (!z && !Q) return !1;
                         h.sc();
                         return !0
                     }
                 };
             return h
         }(),
         Ga = function() {
             function b(z, Q, R, U) {
                 a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, U ? a.NEAREST_MIPMAP_NEAREST : a.LINEAR);
                 var D = null;
                 try {
                     if (D = a.getError(), D !== a.NO_ERROR && console.log("GLERR in test_mipmapping() :", D), a.texImage2D(a.TEXTURE_2D, 0, z, 2, 2, 0, a.RGBA, Q, R), D = a.getError(), D !== a.NO_ERROR) return !1
                 } catch (h) {
                     return !1
                 }
                 U && a.generateMipmap(a.TEXTURE_2D);
                 S.ha();
                 S.h(!1, !0);
                 a.readPixels(0, 0, 1, 1, a.RGBA, a.UNSIGNED_BYTE, p);
                 D = a.getError();
                 D === a.INVALID_OPERATION &&
                     "undefined" !== typeof a.PIXEL_PACK_BUFFER && (a.bindBuffer(a.PIXEL_PACK_BUFFER, null), a.readPixels(0, 0, 1, 1, a.RGBA, a.UNSIGNED_BYTE, p), D = a.getError());
                 return D !== a.NO_ERROR ? !1 : 0 !== p[0]
             }

             function e(z) {
                 return Ha.ob() && b(r, a.FLOAT, new Float32Array(v), z) ? (m = g.kb, !0) : !1
             }

             function f(z) {
                 return Ha.mc() ? b(u, Ha.ya(), new Uint16Array(v), z) || b(u, a.FLOAT, new Float32Array(v), z) ? (m = g.Ja, !0) : !1 : !1
             }
             var k = !1,
                 g = {
                     kb: 3,
                     Ja: 2,
                     RGBA8: 0
                 },
                 m = g.RGBA8,
                 p = new Uint8Array(4),
                 t = [.8, 1, .8, 1],
                 v = t.concat(t, t, t),
                 l = !0,
                 r = null,
                 u = null,
                 B = {
                     m: function() {
                         Ha.sb();
                         Ha.Ua();
                         u = r = a.RGBA;
                         if (Ia.u()) {
                             var z = a.RGBA32F;
                             z && (r = z);
                             (z = a.RGBA16F) && (u = z)
                         }
                         S.m();
                         I.reset();
                         I.K();
                         a.viewport(0, 0, 1, 1);
                         w.set("s0");
                         k = !0;
                         z = a.createTexture();
                         a.activeTexture(a.TEXTURE0);
                         a.bindTexture(a.TEXTURE_2D, z);
                         a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.REPEAT);
                         a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.REPEAT);
                         a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST);
                         if (f(!0) || e(!0)) return !0;
                         l = !1;
                         if (f(!1) || e(!1)) return !0;
                         if (Ia.u()) {
                             u = r = a.RGBA;
                             if (f(!0) || e(!0)) return !0;
                             l = !1;
                             if (f(!1) ||
                                 e(!1)) return !0
                         }
                         return !1
                     },
                     nc: function() {
                         return l
                     },
                     Jd: function() {
                         return m
                     },
                     Ud: function() {
                         k || B.m();
                         return m === g.kb
                     },
                     Lc: function() {
                         k || B.m();
                         return m === g.Ja
                     }
                 };
             return B
         }(),
         Ka = {
             a: function(b) {
                 var e = Y.a(b.alpha),
                     f = Y.a(b.beta);
                 return {
                     uc: function() {
                         e.c(1);
                         f.c(2)
                     }
                 }
             }
         },
         Ma = {
             a: function(b) {
                 var e = null,
                     f = !1,
                     k = !1,
                     g = !1,
                     m = !1,
                     p = null,
                     t = "undefined" === typeof b.preprocessing ? !1 : b.preprocessing,
                     v = "undefined" === typeof b.preprocessingSize ? b.size : b.preprocessingSize;
                 b.mask && (f = !0, SETTINGS && void 0 !== SETTINGS.gc && (b.mask = SETTINGS.gc +
                     b.mask), e = Y.a({
                     isFloat: !1,
                     url: b.mask
                 }));
                 var l = !1;
                 b.customInputShader && (l = "s42", w.lb({
                     name: "_",
                     id: l,
                     b: b.customInputShader,
                     f: ["uSource"],
                     precision: "lowp"
                 }), w.J(l, [{
                     type: "1i",
                     name: "_",
                     value: 0
                 }]));
                 switch (t) {
                     case "sobel":
                         p = "s31";
                         g = !0;
                         break;
                     case "meanNormalization":
                         p = "s32";
                         g = !0;
                         break;
                     case "grayScale":
                         p = "s28";
                         g = !1;
                         break;
                     case "grayScaleTilt":
                         p = "s29";
                         m = !0;
                         g = !1;
                         break;
                     case "rgbGrayTilt":
                         p = "s30";
                         m = !0;
                         g = !1;
                         break;
                     case "copy":
                         p = l ? l : "s0";
                         break;
                     case "inputLightRegulation":
                         p = l ? l : "s28";
                         La.m({
                             Ab: v,
                             Qb: b.size,
                             Kb: b.nBlurPass,
                             Kc: !1
                         });
                         k = !0;
                         break;
                     case "direct":
                     case "none":
                         p = !1;
                         break;
                     default:
                         p = "s3"
                 }
                 m && w.J(p, [{
                     name: "u27",
                     type: "1f",
                     value: b.tilt
                 }]);
                 f && (p += "Mask");
                 var r = Y.a({
                         isFloat: !1,
                         isPot: !1,
                         width: b.size
                     }),
                     u = {
                         A: function() {
                             return v
                         },
                         Xa: function() {
                             return u.A()
                         },
                         Fc: function() {
                             return k ? La.xb() : r
                         },
                         H: function() {
                             I.U();
                             p && (w.set(p), g && w.B("u28", 1 / b.size), r.I(), f && e.c(1), S.h(!1, !1), r.c(0), k && La.Uc(r))
                         }
                     };
                 return u
             }
         },
         Sa = {
             a: function(b) {
                 "undefined" === typeof b.disableNormalize && (b.disableNormalize = !1);
                 var e = null,
                     f = null,
                     k = null,
                     g = null,
                     m = null,
                     p = null,
                     t = null,
                     v = null,
                     l = [],
                     r = [],
                     u = !1,
                     B = null,
                     z = !0,
                     Q = -1,
                     R = b.isReorganize ? b.isReorganize : !1,
                     U = b.kernelsNumber ? !0 : !1,
                     D = b.dynPelu ? Ka.a(b.dynPelu) : !1,
                     h = D ? !0 : !1,
                     A = {
                         isEnabled: !1
                     };
                 b.Jc ? (b.sparsity = "undefined" !== typeof b.sparsity ? b.sparsity : b.Ea.Xa(), z = !1) : "full" === b.connectivityUp && (b.sparsity = b.Ea.Xa());
                 var C = {
                         elu: "s15",
                         elu01: "s16",
                         relu: "s14",
                         arctan: "s18",
                         sigmoid: "s13",
                         copy: "s0",
                         softplus: "s19",
                         dynPelu: "s17"
                     } [b.activation],
                     da = b.sparsity * b.sparsity,
                     ua = !1,
                     ra = b.size,
                     ba = "";
                 if (b.maxPooling) {
                     switch (b.maxPooling.size) {
                         case 2:
                             ba =
                                 "s33";
                             break;
                         case 4:
                             ba = "s34"
                     }
                     ua = !0;
                     ra /= b.maxPooling.size;
                     p = Y.a({
                         isFloat: !0,
                         isPot: !1,
                         width: ra
                     })
                 }
                 var c = void 0 !== b.Rc && b.Rc ? !0 : !1,
                     E = null,
                     V = null,
                     H = null;
                 if (c) {
                     E = "s43" + b.index.toString();
                     w.zb("s43", E, [((b.normalization.n - 1) / 2).toFixed(1)]);
                     w.J(E, [{
                         type: "1i",
                         name: "u1",
                         value: 0
                     }, {
                         type: "2f",
                         name: "u7",
                         value: [1 / b.size, 1 / b.size]
                     }, {
                         type: "1f",
                         name: "u6",
                         value: b.normalization.alpha
                     }, {
                         type: "1f",
                         name: "u9",
                         value: b.normalization.beta
                     }, {
                         type: "1f",
                         name: "u32",
                         value: b.normalization.k
                     }]);
                     var na = {
                         isFloat: !0,
                         isPot: !0,
                         width: b.size
                     };
                     V = Y.a(na);
                     H = Y.a(na)
                 }
                 var fa = -1,
                     aa = null;
                 z && (g = Y.a({
                     isFloat: !0,
                     isPot: !1,
                     width: b.size
                 }));
                 f = Y.a(b.bias);
                 var ta = {
                     A: function() {
                         return b.size
                     },
                     Xa: function() {
                         return ra
                     },
                     ub: function() {
                         return b.classesCount
                     },
                     ic: function(F) {
                         v.c(F)
                     },
                     Vc: function() {
                         b.remap && b.remap.isEnabled && (A = {
                             isEnabled: !0,
                             Nc: Y.a({
                                 isFloat: !1,
                                 isFlipY: !1,
                                 array: new Uint8Array(b.remap.maskTexture.data),
                                 width: b.remap.maskTexture.width,
                                 isPot: !1
                             }),
                             layers: b.remap.layers.map(function(F) {
                                 return b.parent.Ec(F)
                             }),
                             depth: b.remap.depth
                         })
                     },
                     bd: function() {
                         switch (b.connectivityUp) {
                             case "direct":
                                 aa =
                                     Na.a(b.connectivity);
                                 break;
                             case "square":
                                 aa = Oa.a(b.connectivity);
                                 break;
                             case "squareFast":
                                 aa = Pa.a(b.connectivity, b.activation);
                                 break;
                             case "full":
                                 aa = Qa.a(b.connectivity);
                                 break;
                             case "conv":
                                 Q = b.kernelsNumber, aa = Ra.a(b.connectivity), R && (m = Y.a({
                                     width: ra,
                                     isFloat: !0,
                                     isFlipY: !1,
                                     isPot: !1
                                 }))
                         }
                         if (aa.ca) {
                             var F = b.size * b.sparsity;
                             fa = Math.log(F / b.size) / Math.log(2);
                             e = Y.a({
                                 isMipmap: !0,
                                 isFloat: !0,
                                 isPot: !0,
                                 width: F,
                                 Ib: fa
                             });
                             k = Y.a({
                                 isFloat: !0,
                                 isPot: !0,
                                 width: b.size
                             })
                         }
                     },
                     H: function(F) {
                         v = F;
                         aa.ca ? (e.I(), U && f.c(2), aa.H(A), e.c(0),
                             e.Cc(fa), k.I(), U ? w.set("s0") : (w.set("s27"), w.B("u26", da), f.c(1)), e.jc(fa, 0), S.h(!1, !1), w.set(C), c ? V.j() : g.j(), k.c(0), h && D.uc(), S.h(!1, !1)) : (g.I(), f.c(1), aa.H());
                         c && (w.set(E), H.j(), V.c(0), S.h(!1, !1), w.set("s44"), w.B("u6", 1), g.j(), H.c(1), S.h(!1, !1));
                         if (z) return ua ? (p.I(), g.c(0), w.set(ba), w.ma("u7", 1 / b.size, 1 / b.size), S.h(!1, !1), F = p) : F = g, F.c(0), R && (m.j(), w.set("s21"), w.ma("u13", Q, ra / Q), S.h(!1, !1), F = m, m.c(0)), F;
                         F = g;
                         b.disableNormalize || (w.set("gpuRawAvg" === u ? "s8" : "s7"), w.B("u4", 1 / b.size), t.I(), g.c(0), S.h(!1,
                             !1), F = t);
                         switch (u) {
                             case "cpuRGBA2Float":
                                 F.qb();
                                 F = ta.Wc(F);
                                 B(F);
                                 break;
                             case "gpuRawAvg":
                             case "gpuRaw":
                                 F.c(0);
                             case "none":
                                 B(F)
                         }
                         return !1
                     },
                     pc: function(F) {
                         F && "undefined" !== typeof F.Pb && (u = F.Pb, B = F.Tc);
                         g = Y.a({
                             isFloat: !0,
                             isPot: !0,
                             isMipmap: !1,
                             width: b.size
                         });
                         F = "undefined" !== typeof b.classesCount && b.classesCount ? b.classesCount : b.size * b.size;
                         for (var qa = 0, ia = 0, pa = 0; qa < F; ++qa) l.push(ia + (b.size - 1 - pa) * b.size), r.push([-1, -1, -1, -1]), ++ia, ia === b.size && (ia = 0, ++pa);
                         b.disableNormalize || (t = Y.a({
                             isFloat: !0,
                             isPot: !0,
                             width: b.size
                         }))
                     },
                     Wc: function(F) {
                         F.qb();
                         var qa = F.Sb();
                         l.forEach(function(ia, pa) {
                             r[pa][0] = qa[0][ia];
                             r[pa][1] = qa[1][ia];
                             r[pa][2] = qa[2][ia];
                             r[pa][3] = qa[3][ia]
                         });
                         return r
                     }
                 };
                 b.Ea && ta.bd(b.Ea);
                 return ta
             }
         };

     function Ta() {
         var b = null,
             e = null,
             f = null,
             k = 0;
         this.Ec = function(g) {
             return b[g]
         };
         this.Zc = function(g) {
             var m = null;
             k = g.length;
             b = g.map(function(p, t) {
                 p = Object.assign({}, p, {
                     index: t,
                     parent: this,
                     Ea: m,
                     Jc: t === k - 1
                 });
                 return m = t = 0 === t ? Ma.a(p) : Sa.a(p)
             });
             e = b[0];
             f = b[k - 1];
             b.forEach(function(p, t) {
                 0 !== t && p.Vc()
             })
         };
         this.H = function(g, m) {
             var p = m;
             b.forEach(function(t) {
                 p = t.H(p, g)
             });
             return p
         };
         this.vb = function() {
             return e.A()
         };
         this.xb = function() {
             return f.Fc()
         };
         this.ad = function(g) {
             f.pc(g)
         };
         this.ub = function() {
             return f.ub()
         }
     }
     var Na = {
             a: function(b) {
                 var e = Y.a(b.weights);
                 delete b.weights.data;
                 return {
                     ca: !0,
                     xa: function() {
                         return 1
                     },
                     Gc: function() {
                         return e
                     },
                     H: function() {
                         w.set("s26");
                         e.c(1);
                         S.h(!1, !1)
                     }
                 }
             }
         },
         Qa = {
             a: function(b) {
                 var e = b.fromLayerSize,
                     f = Y.a(b.weights);
                 return {
                     ca: !0,
                     xa: function() {
                         return e
                     },
                     H: function(k) {
                         if (k.isEnabled) {
                             w.set("s24");
                             k.Nc.c(3);
                             var g, m = Math.min(k.layers.length, k.depth);
                             for (g = 0; g < m; ++g) k.layers[g].ic(4 + g)
                         } else w.set("s23");
                         w.B("u17", b.toLayerSize);
                         f.c(1);
                         S.h(!1, !1)
                     }
                 }
             }
         },
         Oa = {
             a: function(b) {
                 for (var e = b.fromLayerSize,
                         f = b.toLayerSize, k = b.toSparsity, g = k * f, m = g / e, p = e / f, t = 0, v = 0, l = 0, r = Array(k * f * k * f * 4), u = Array(k * f * k * f * 4), B = Array(e * e), z = 0; z < B.length; ++z) B[z] = 0;
                 z = Math.floor(k / 2);
                 for (var Q = .5 / f, R = .5 / e, U = .5 / g, D = 0; D < f; ++D)
                     for (var h = Math.round(D * p), A = 0; A < f; ++A) {
                         var C = Math.round(A * p),
                             da = D / f,
                             ua = A / f;
                         da += Q;
                         ua += Q;
                         for (var ra = 0; ra < k; ++ra) {
                             var ba = h + ra - z;
                             0 > ba && (ba += e);
                             ba >= e && (ba -= e);
                             for (var c = 0; c < k; ++c) {
                                 var E = t / g,
                                     V = v / g,
                                     H = C + c - z;
                                 0 > H && (H += e);
                                 H >= e && (H -= e);
                                 var na = ba / e,
                                     fa = H / e;
                                 V = 1 - V - 1 / g;
                                 na += R;
                                 fa += R;
                                 E += U;
                                 V += U;
                                 var aa = D * k + ra,
                                     ta = A * k + c;
                                 ta = f * k -
                                     ta - 1;
                                 aa = ta * f * k + aa;
                                 r[4 * aa] = E;
                                 r[4 * aa + 1] = V;
                                 r[4 * aa + 2] = na;
                                 r[4 * aa + 3] = fa;
                                 fa = B[H * e + ba]++;
                                 aa = fa % m;
                                 na = ba * m + aa;
                                 H = H * m + (fa - aa) / m;
                                 H = e * m - 1 - H;
                                 H = H * e * m + na;
                                 u[4 * H] = E;
                                 u[4 * H + 1] = V;
                                 u[4 * H + 2] = da;
                                 u[4 * H + 3] = ua;
                                 ++t >= g && (t = 0, ++v);
                                 ++l
                             }
                         }
                     }
                 B = null;
                 var F = Y.a(b.weights);
                 Y.a({
                     width: g,
                     isFloat: !0,
                     array: new Float32Array(u),
                     isPot: !0
                 });
                 u = null;
                 var qa = Y.a({
                     width: g,
                     isFloat: !0,
                     array: new Float32Array(r),
                     isPot: !0
                 });
                 r = null;
                 return {
                     ca: !0,
                     xa: function() {
                         return m
                     },
                     H: function() {
                         w.set("s22");
                         F.c(1);
                         qa.c(2);
                         S.h(!1, !1)
                     }
                 }
             }
         },
         Ra = {
             a: function(b) {
                 var e = b.kernelsNumber,
                     f = b.toSparsity,
                     k = f * b.toLayerSize / b.fromLayerSize,
                     g = Y.a(b.weights);
                 return {
                     ca: !0,
                     xa: function() {
                         return k
                     },
                     Od: function() {
                         return f
                     },
                     Gc: function() {
                         return g
                     },
                     H: function() {
                         w.set("s25");
                         w.B("u23", e);
                         w.B("u24", f);
                         w.B("u17", b.toLayerSize);
                         w.B("u25", b.fromLayerSize);
                         g.c(1);
                         S.h(!1, !1)
                     }
                 }
             }
         },
         Pa = {
             a: function(b, e) {
                 var f = b.fromLayerSize,
                     k = b.toLayerSize,
                     g = b.toSparsity,
                     m = b.stride ? b.stride : 1,
                     p = g * k / f,
                     t = k < f,
                     v = f / k,
                     l = Y.a(b.weights),
                     r = "s45" + [f.toString(), k.toString(), g.toString(), m.toString(), e].join("_");
                 w.xc(r) || (b = Ca(e),
                     k = [{
                         type: "1f",
                         name: "u17",
                         value: k
                     }, {
                         type: "1f",
                         name: "u31",
                         value: m
                     }], t && k.push({
                         type: "1f",
                         name: "u25",
                         value: f
                     }), f = [(t ? p : g).toFixed(1), b], t && f.push(v.toFixed(1)), w.zb(t ? "s39" : "s38", r, f), w.J(r, k.concat([{
                         type: "1i",
                         name: "u15",
                         value: 0
                     }, {
                         type: "1i",
                         name: "u22",
                         value: 1
                     }, {
                         type: "1i",
                         name: "u14",
                         value: 3
                     }])));
                 return {
                     ca: !1,
                     xa: function() {
                         return p
                     },
                     H: function() {
                         w.set(r);
                         l.c(3);
                         S.h(!1, !1)
                     }
                 }
             }
         },
         La = function() {
             var b = -1,
                 e = -1,
                 f = -1,
                 k = -1,
                 g = !1,
                 m = null,
                 p = null,
                 t = null,
                 v = null,
                 l = null;
             return {
                 m: function(r) {
                     b = r.Kb ? r.Kb : 3;
                     e = r.Ab ? r.Ab : 64;
                     f = r.Qb ? r.Qb : 64;
                     g = r.Kc ? !0 : !1;
                     r = {
                         isFloat: !1,
                         width: e,
                         isPot: !1,
                         isFlipY: !1
                     };
                     m = Y.a(r);
                     p = Y.a(r);
                     t = Y.a(r);
                     v = Y.a(r);
                     l = Y.a({
                         isFloat: !0,
                         width: f,
                         isPot: !1,
                         isFlipY: !1
                     });
                     k = 1 / e
                 },
                 Uc: function(r) {
                     w.set("s35");
                     v.j();
                     S.h(g, !1);
                     w.set("s36");
                     for (var u = 0; u < b; ++u) m.j(), w.ma("u7", k, 0), S.h(g, !1), t.j(), v.c(0), S.h(g, !1), p.j(), m.c(0), w.ma("u7", 0, k), S.h(g, !1), v.j(), t.c(0), S.h(g, !1), u !== b - 1 && p.c(0);
                     w.set("s37");
                     l.j();
                     r.c(0);
                     p.c(1);
                     v.c(2);
                     S.h(g, !1);
                     l.c(0)
                 },
                 xb: function() {
                     return l
                 }
             }
         }();

     function Ua(b, e) {
         b[e] = !0;
         b.setAttribute(e, "true")
     }

     function Va() {
         return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
     }

     function Wa() {
         var b = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
         return 2 < b.length ? [parseInt(b[1], 10), parseInt(b[2], 10), parseInt(b[3] || 0, 10)] : [0, 0, 0]
     }

     function Xa() {
         var b = navigator.userAgent.toLowerCase();
         return -1 !== b.indexOf("safari") && -1 === b.indexOf("chrome") ? !0 : !1
     }

     function Ya() {
         return navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? !0 : !1
     }

     function Za(b) {
         if (!b) return b;
         var e = !1;
         if (b.video) {
             var f = function(k) {
                 var g = {};
                 "undefined" !== typeof k.min && (g.min = k.min);
                 "undefined" !== typeof k.max && (g.max = k.max);
                 "undefined" !== typeof k.ideal && (g.ideal = k.ideal);
                 return g
             };
             e = {};
             "undefined" !== typeof b.video.width && (e.width = f(b.video.width));
             "undefined" !== typeof b.video.height && (e.height = f(b.video.height));
             "undefined" !== typeof b.video.facingMode && (e.facingMode = b.video.facingMode)
         }
         e = {
             audio: b.audio,
             video: e
         };
         "undefined" !== typeof b.deviceId && (e.deviceId = b.deviceId);
         return e
     }

     function $a(b) {
         var e = b.video.width;
         b.video.width = b.video.height;
         b.video.height = e;
         return b
     }

     function ab(b) {
         function e(u) {
             return [480, 576, 640, 648, 720, 768, 800, 960, 1080, 1152, 1280, 1366, 1920].sort(function(B, z) {
                 return Math.abs(B - u) - Math.abs(z - u)
             })
         }

         function f(u) {
             var B = Za(b);
             k.push(u(B))
         }
         var k = [];
         if (!b || !b.video) return k;
         if (b.video.width && b.video.height) {
             if (b.video.width.ideal && b.video.height.ideal) {
                 var g = e(b.video.width.ideal).slice(0, 3),
                     m = e(b.video.height.ideal).slice(0, 3),
                     p = {},
                     t = 0;
                 for (p.T = void 0; t < g.length; p = {
                         T: p.T
                     }, ++t) {
                     p.T = g[t];
                     var v = {},
                         l = 0;
                     for (v.S = void 0; l < m.length; v = {
                             S: v.S
                         }, ++l)
                         if (v.S = m[l],
                             p.T !== b.video.width.ideal || v.S !== b.video.height.ideal) {
                             var r = Math.max(p.T, v.S) / Math.min(p.T, v.S);
                             r < 4 / 3 - .1 || r > 16 / 9 + .1 || f(function(u, B) {
                                 return function(z) {
                                     z.video.width.ideal = u.T;
                                     z.video.height.ideal = B.S;
                                     return z
                                 }
                             }(p, v))
                         }
                 }
             }
             f(function(u) {
                 return $a(u)
             })
         }
         b.video.width && b.video.height && (b.video.width.ideal && b.video.height.ideal && f(function(u) {
             delete u.video.width.ideal;
             delete u.video.height.ideal;
             return u
         }), f(function(u) {
             delete u.video.width;
             delete u.video.height;
             return u
         }));
         b.video.facingMode && (f(function(u) {
             delete u.video.facingMode;
             return u
         }), b.video.width && b.video.height && f(function(u) {
             $a(u);
             delete u.video.facingMode;
             return u
         }));
         k.push({
             audio: b.audio,
             video: !0
         });
         return k
     }

     function bb(b) {
         try {
             var e = window.matchMedia("(orientation: portrait)").matches ? !0 : !1
         } catch (k) {
             e = window.innerHeight > window.innerWidth
         }
         if (e && b && b.video) {
             e = b.video.width;
             var f = b.video.height;
             e && f && e.ideal && f.ideal && e.ideal > f.ideal && (b.video.height = e, b.video.width = f)
         }
     }

     function cb(b) {
         b.volume = 0;
         Ua(b, "muted");
         if (Xa()) {
             if (1 === b.volume) {
                 var e = function() {
                     b.volume = 0;
                     window.removeEventListener("mousemove", e, !1);
                     window.removeEventListener("touchstart", e, !1)
                 };
                 window.addEventListener("mousemove", e, !1);
                 window.addEventListener("touchstart", e, !1)
             }
             setTimeout(function() {
                 b.volume = 0;
                 Ua(b, "muted")
             }, 5)
         }
     }

     function db(b, e, f) {
         return new Promise(function(k, g) {
             if (b.srcObject && b.srcObject.getVideoTracks) {
                 var m = b.srcObject.getVideoTracks();
                 1 !== m.length ? g("INVALID_TRACKNUMBER") : (m = m[0], e ? eb(b, k, g, f) : (m.stop(), k()))
             } else g("BAD_IMPLEMENTATION")
         })
     }

     function fb(b, e, f, k) {
         function g(p) {
             m || (m = !0, f(p))
         }
         var m = !1;
         navigator.mediaDevices.getUserMedia(k).then(function(p) {
             function t() {
                 setTimeout(function() {
                     if (b.currentTime) {
                         var v = b.videoWidth,
                             l = b.videoHeight;
                         if (0 === v || 0 === l) g("VIDEO_NULLSIZE");
                         else {
                             v && (b.style.width = v.toString() + "px");
                             l && (b.style.height = l.toString() + "px");
                             v = {
                                 oc: null,
                                 gd: null,
                                 Oc: null
                             };
                             try {
                                 var r = p.getVideoTracks()[0];
                                 r && (v.Oc = r, v.oc = r.getCapabilities(), v.gd = r.getSettings())
                             } catch (u) {}
                             Xa() || Va() ? b.parentNode && null !== b.parentNode ? (m || e(b, p,
                                 v), setTimeout(function() {
                                 b.play()
                             }, 100)) : (document.body.appendChild(b), cb(b), m || e(b, p, v), setTimeout(function() {
                                 b.style.transform = "scale(0.0001,0.0001)";
                                 b.style.position = "fixed";
                                 b.style.bottom = "0px";
                                 b.style.right = "0px";
                                 cb(b);
                                 setTimeout(function() {
                                     b.play()
                                 }, 100)
                             }, 80)) : m || e(b, p, v)
                         }
                     } else g("VIDEO_NOTSTARTED")
                 }, 700)
             }
             "undefined" !== typeof b.srcObject ? b.srcObject = p : (b.src = window.URL.createObjectURL(p), b.videoStream = p);
             cb(b);
             b.addEventListener("loadeddata", function() {
                 var v = b.play();
                 cb(b);
                 "undefined" === typeof v ?
                     t() : v.then(function() {
                         t()
                     }).catch(function() {
                         g("VIDEO_PLAYPROMISEREJECTED")
                     })
             }, !1)
         }).catch(function(p) {
             g(p)
         })
     }

     function eb(b, e, f, k) {
         if (b)
             if (Ya()) {
                 if (k && k.video) {
                     if (Va()) {
                         var g = Wa();
                         (12 > g[0] || 12 === g[0] && 2 > g[1]) && bb(k)
                     }
                     k.video.width && k.video.width.ideal && (b.style.width = k.video.width.ideal + "px");
                     k.video.height && k.video.height.ideal && (b.style.height = k.video.height.ideal + "px")
                 }
                 Ua(b, "autoplay");
                 Ua(b, "playsinline");
                 k && k.audio ? b.volume = 0 : Ua(b, "muted");
                 fb(b, e, function() {
                     function m(t) {
                         if (0 === t.length) f("INVALID_FALLBACKCONSTRAINTS");
                         else {
                             var v = t.shift();
                             fb(b, e, function() {
                                 m(t)
                             }, v)
                         }
                     }
                     var p = ab(k);
                     m(p)
                 }, k)
             } else f && f("MEDIASTREAMAPI_NOTFOUND");
         else f && f("VIDEO_NOTPROVIDED")
     }

     function gb(b) {
         if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return b(!1, "NOTSUPPORTED"), !1;
         navigator.mediaDevices.enumerateDevices().then(function(e) {
             (e = e.filter(function(f) {
                 return f.kind && -1 !== f.kind.toLowerCase().indexOf("video") && f.label && f.deviceId
             })) && e.length && 0 < e.length ? b(e, !1) : b(!1, "NODEVICESFOUND")
         }).catch(function() {
             b(!1, "PROMISEREJECTED")
         })
     }
     window.JEEFACEFILTERAPI = function() {
         var b, e, f, k, g, m, p, t, v, l, r, u, B, z;

         function Q() {
             return -1 !== [ea.play, ea.pause].indexOf(ca)
         }

         function R(d) {
             if (ca !== ea.pause) {
                 var n = ca === ea.play ? M.sa : K.fc;
                 Aa = setTimeout(A.bind(null, d), n)
             }
         }

         function U() {
             if (ca === ea.play) return !1;
             ca = ea.play;
             q.timestamp = Date.now();
             X && window.cancelAnimationFrame(X);
             A(0)
         }

         function D(d, n, y, W, T) {
             d = 4 * (3 * n + d) + y;
             return W + (ha.buffer[d] / 255 + ha.buffer[d + 12] / 65025) * (T - W)
         }

         function h() {
             I.U();
             S.reset();
             Y.reset();
             w.qa();
             w.rb();
             a.disable(a.DEPTH_TEST);
             a.disable(a.BLEND);
             S.ha();
             w.na()
         }

         function A() {
             if (ca !== ea.pause) {
                 w.rb();
                 S.reset();
                 S.ha();
                 a.disable(a.DEPTH_TEST);
                 I.U();
                 w.na();
                 if (!x.$a) {
                     var d = x.element.currentTime - x.Fa;
                     0 > d && (x.Fa = x.element.currentTime);
                     1E3 * d < K.md || (x.oa.refresh(), x.Fa += d, w.set("s48"), x.pa.I(), x.oa.c(0), S.h(!1, !1))
                 }
                 if (G.L.length > q.F) G.L.splice(0, G.L.length - q.F);
                 else
                     for (; G.L.length < q.F;) G.L.push(0);
                 if (1 !== G.i)
                     if (sa.every(E)) {
                         for (var n = 0, y = d = 0; y < sa.length; ++y) sa[y].detected > n && (n = sa[y].detected, d = 0);
                         for (n = 0; n < q.F; ++n) G.L[n] = d
                     } else {
                         d = G.Hb;
                         n = 0;
                         for (y = !1; n <
                             q.F; ++n) {
                             if (E(sa[d]))
                                 if (y) {
                                     do ++d === G.i && (d = 0); while (E(sa[d]))
                                 } else y = !0;
                             G.L[n] = d++;
                             d >= G.i && (d = 0)
                         }
                         G.Hb = d
                     } for (d = 0; d < q.F; ++d) G.V = G.L[d], G.cb = (.5 + G.V) / G.i, G.Eb = G.L.lastIndexOf(G.V) === d, w.set("s49"), M.$ && w.B("u37", sa[G.V].rz), 1 !== G.i && w.B("u36", G.cb), P.za.I(), x.pa.c(0), ha.Ia.c(1), S.h(!1, !1), P.za.c(0), va.H(!1, P.za);
                 d = Date.now();
                 q.ja = d - q.timestamp;
                 q.timestamp = d; - 1 !== L.nDetectsPerLoop ? q.F = L.nDetectsPerLoop : (d = K.La, q.Mb = q.Lb / q.ja, q.Nb = q.Mb * d + q.Nb * (1 - d), q.Ob = 1E3 / q.ja, q.ba = q.Ob * K.La + q.ba * (1 - K.La), q.ba > K.Z[1] ?
                     (d = K.ra[1], 1 < G.i && (++d, n = sa.filter(V).length, d *= Math.max(1, n)), q.F = Math.min(q.F + 1, d), q.ba = (K.Z[0] + K.Z[1]) / 2) : q.ba < K.Z[0] && (q.F = Math.max(q.F - 1, K.ra[0]), q.ba = (K.Z[0] + K.Z[1]) / 2));
                 I.K();
                 a.viewport(0, 0, 3, 2 * G.i);
                 w.set("s47");
                 ha.Ia.c(0);
                 S.h(!1, !1);
                 a.readPixels(0, 0, 3, 2 * G.i, a.RGBA, a.UNSIGNED_BYTE, ha.buffer);
                 for (d = 0; d < G.i; ++d)
                     if (-1 !== G.L.indexOf(d)) {
                         var W = d;
                         n = ya[W];
                         var T = [W];
                         y = sa[W];
                         var la = O[W],
                             wa = 2 * W;
                         n.wa = D(1, wa, 3, 0, 1);
                         y.detected = ma(y.detected, n.wa, K.cc);
                         if (n.wa < K.bb) M.$ && (y.rz = 0);
                         else {
                             var xa = ha.hb;
                             n.x = D(0,
                                 wa, 1, -1, 1);
                             n.y = D(0, wa, 2, -1, 1);
                             n.N = D(0, wa, 3, 0, 1);
                             n.eb = D(1, wa, 0, -xa[0], xa[0]);
                             n.fb = D(1, wa, 1, -xa[1], xa[1]);
                             n.la = D(1, wa, 2, -xa[2], xa[2]);
                             for (xa = 0; xa < K.Da; ++xa) n.tb[xa] = K.yc[xa](D(2, wa, xa, 0, 1));
                             T.Sa = n.x - y.x;
                             T.Ta = n.y - y.y;
                             T.Ra = n.N - y.s;
                             T.Oa = n.eb - y.rx;
                             T.Pa = n.fb - y.ry;
                             T.Qa = M.$ ? n.la : n.la - y.rz;
                             T = (1 - Ba(Z.translationFactorRange[0], Z.translationFactorRange[1], Math.sqrt(T.Sa * T.Sa + T.Ta * T.Ta + T.Ra * T.Ra) / q.ja)) * (1 - Ba(Z.rotationFactorRange[0], Z.rotationFactorRange[1], Math.sqrt(T.Oa * T.Oa + T.Pa * T.Pa + T.Qa * T.Qa) / q.ja)) * Ba(Z.qualityFactorRange[0],
                                 Z.qualityFactorRange[1], n.wa);
                             W = la[++ja[W] % la.length] = T;
                             for (wa = 0; wa < la.length; ++wa) W = Math.min(W, la[wa]);
                             W = Math.max(.5, W);
                             T = Math.min(W, T);
                             la = ma(Z.alphaRange[1], Z.alphaRange[0], Math.pow(T, K.ec));
                             y.x = ma(y.x, n.x, la);
                             y.y = ma(y.y, n.y, la);
                             y.s = ma(y.s, n.N, la);
                             y.rx = ma(y.rx, n.eb, la);
                             y.ry = ma(y.ry, n.fb, la);
                             y.rz = M.$ ? y.rz + la * n.la : ma(y.rz, n.la, la);
                             la = Math.max(la, K.dc);
                             for (W = 0; W < K.Da; ++W) y.expressions[W] = ma(y.expressions[W], n.tb[W], la);
                             ++n.Ca
                         }
                     } I.kd();
                 I.reset();
                 Y.reset();
                 a.enable(a.DEPTH_TEST);
                 M.ua && (1 === G.i ? M.ua(sa[0]) :
                     M.ua(sa));
                 a.disable(a.BLEND);
                 ca === ea.play && (X = window.requestAnimationFrame(R))
             }
         }

         function C() {
             function d(y) {
                 for (var W = [], T = 0; T < G.i; ++T) W.push(Object.assign({}, y));
                 return W
             }
             x.pa = Y.a({
                 isPot: !1,
                 isLinear: !0,
                 isFloat: !1,
                 width: P.O,
                 height: P.R
             });
             P.za = Y.a({
                 isPot: !0,
                 isFloat: !1,
                 width: va.vb()
             });
             var n = {
                 width: 3,
                 height: G.i,
                 isFloat: !0,
                 isPot: !1,
                 array: function(y) {
                     for (var W = new Float32Array(y.length * G.i), T = 0, la; T < G.i; ++T)
                         for (la = 0; la < y.length; ++la) W[T * y.length + la] = y[la];
                     return W
                 }(new Float32Array([0, L.borderWidth, L.borderHeight,
                     0, 0, 0, 0, 0, 0, 0, 0, 0
                 ]))
             };
             ha.Ia = Ja.a(n);
             ha.buffer = new Uint8Array(8 * n.width * G.i);
             ya = d({
                 wa: 0,
                 x: 0,
                 y: 0,
                 N: 1,
                 eb: 0,
                 fb: 0,
                 la: 0,
                 tb: new Float32Array(K.Da),
                 Ca: 0
             });
             sa = d({
                 detected: 0,
                 x: 0,
                 y: 0,
                 s: 1,
                 rx: 0,
                 ry: 0,
                 rz: 0,
                 expressions: new Float32Array(K.Da)
             });
             d({
                 Sa: 0,
                 Ta: 0,
                 Ra: 0,
                 Oa: 0,
                 Pa: 0,
                 Qa: 0
             })
         }

         function da() {
             w.J("s49", [{
                 type: "1i",
                 name: "u1",
                 value: 0
             }, {
                 type: "1i",
                 name: "u34",
                 value: 1
             }, {
                 type: "2f",
                 name: "u35",
                 value: P.v
             }, {
                 type: "1f",
                 name: "u36",
                 value: .5
             }, {
                 type: "1f",
                 name: "u37",
                 value: 0
             }]);
             w.J("s50", [{
                 type: "1i",
                 name: "u38",
                 value: 0
             }, {
                 type: "1i",
                 name: "u34",
                 value: 1
             }, {
                 type: "1f",
                 name: "u41",
                 value: K.jd
             }, {
                 type: "1f",
                 name: "u42",
                 value: K.$b
             }, {
                 type: "1f",
                 name: "u43",
                 value: K.Zb
             }, {
                 type: "3f",
                 name: "u40",
                 value: [ha.da[0] * P.v[0], ha.da[1] * P.v[1], ha.da[2]]
             }, {
                 type: "1f",
                 name: "u36",
                 value: .5
             }, {
                 type: "1f",
                 name: "u44",
                 value: 1
             }, {
                 type: "1f",
                 name: "u37",
                 value: 0
             }]);
             var d = [{
                 type: "1i",
                 name: "u38",
                 value: 0
             }];
             w.J("s51", d);
             w.J("s52", d);
             w.J("s47", [{
                 type: "1i",
                 name: "u34",
                 value: 0
             }, {
                 type: "1f",
                 name: "u47",
                 value: P.v[0]
             }, {
                 type: "2f",
                 name: "u46",
                 value: [0, .5 / G.i]
             }])
         }

         function ua() {
             var d = va.vb(),
                 n = P.O / d;
             m =
                 L.minScale * n;
             p = L.maxScale * n;
             t = (1 - 2 * L.borderWidth) / L.nStepsX;
             v = (1 - 2 * L.borderHeight) / L.nStepsY;
             l = (p - m) / L.nStepsScale;
             r = L.borderWidth;
             u = L.borderHeight;
             B = 1 - L.borderWidth;
             z = 1 - L.borderHeight;
             P.v[0] = d / P.O;
             P.v[1] = d / P.R;
             b = L.borderWidth;
             e = L.borderHeight;
             f = m;
             k = L.borderWidth;
             g = L.borderHeight;
             oa = m
         }

         function ra(d) {
             if (M.ea) ba("string" === typeof M.ea ? JSON.parse(M.ea) : M.ea, d);
             else {
                 var n = M.jb;
                 "JSON" !== n.toUpperCase().split(".").pop() && (n += K.save);
                 za(n, function(y) {
                     y = JSON.parse(y);
                     ba(y, d)
                 })
             }
         }

         function ba(d, n) {
             if (d.exportData) {
                 var y =
                     d.exportData;
                 y.thetaXYZfactor && (ha.ge = y.thetaXYZfactor);
                 y.trackingDxysFactor && (ha.da = y.trackingDxysFactor)
             }
             n(d)
         }

         function c() {
             if (Ia.m({
                     Na: M.P,
                     width: P.O,
                     height: P.R,
                     debug: !1,
                     Sc: function() {
                         J("GLCONTEXT_LOST")
                     },
                     antialias: !0,
                     premultipliedAlpha: !0
                 })) {
                 if (Ia.Ic()) return !0;
                 J("GL_INCOMPATIBLE");
                 return !1
             }
             J("GL_INCOMPATIBLE");
             return !1
         }

         function E(d) {
             return d.detected < K.bb
         }

         function V(d) {
             return d.detected > K.bb
         }

         function H(d, n, y, W) {
             return y > d ? Math.max(0, d + n / 2 - (y - W / 2)) : Math.max(0, y + W / 2 - (d - n / 2))
         }

         function na() {
             return ya.some(function(d,
                 n) {
                 if (n === G.V) return !1;
                 n = ya[G.V];
                 if (n.Ca > d.Ca || 3 > d.Ca || H(n.x / 2, n.N, d.x / 2, d.N) < K.Jb * n.N) return !1;
                 var y = P.O / P.R;
                 return H(n.y / 2, n.N * y, d.y / 2, d.N * y) > K.Jb * n.N * y
             })
         }

         function fa() {
             var d = G.V;
             ha.Ia.cd(1);
             1 !== G.i && (a.viewport(0, 0, 3, G.i), w.set("s0"), w.Ub("u1", 1), S.h(!1, !1), w.Ub("u1", 0));
             a.viewport(0, d, 1, 1);
             w.set("s50");
             M.$ && w.B("u37", sa[d].rz);
             1 !== G.i && w.B("u36", G.cb);
             if (1 < G.i) {
                 var n = na() ? 0 : 1;
                 w.B("u44", n)
             }
             w.ed("u39", k, g, oa);
             S.h(!1, !1);
             G.Eb && (a.viewport(1, d, 1, 1), w.set("s51"), S.h(!1, !1), a.viewport(2, d, 1, 1), w.set("s52"),
                 S.h(!1, !1));
             f += l;
             f > p && (b += t, f = m, b > B && (b = r, e += v, e > z && (e = u)));
             k = b + .8 * (Math.random() - .5) * t;
             g = e + .8 * (Math.random() - .5) * v;
             oa = f + .8 * (Math.random() - .5) * l
         }

         function aa() {
             x.oa = Y.a({
                 D: x.element,
                 isPot: !1,
                 isFloat: !1,
                 isFlipY: !0
             })
         }

         function ta() {
             w.J("s48", [{
                 type: "1i",
                 name: "u1",
                 value: 0
             }, {
                 type: "mat2",
                 name: "u33",
                 value: x.o
             }])
         }

         function F() {
             x.C[0] = .5;
             x.C[1] = .5;
             var d = x.v[1] / x.v[0],
                 n = Ia.M() / Ia.A();
             90 === Math.abs(ka.rotate) && (d = 1 / d);
             d > n ? x.C[1] *= n / d : x.C[0] *= d / n;
             w.J("s50", [{
                 name: "u45",
                 type: "1f",
                 value: n
             }]);
             x.o[0] = 0;
             x.o[1] = 0;
             x.o[2] =
                 0;
             x.o[3] = 0;
             switch (ka.rotate) {
                 case 0:
                     x.o[0] = x.C[0];
                     x.o[3] = x.C[1];
                     break;
                 case 180:
                     x.o[0] = -x.C[0];
                     x.o[3] = -x.C[1];
                     break;
                 case 90:
                     x.o[1] = x.C[0];
                     x.o[2] = -x.C[1];
                     break;
                 case -90:
                     x.o[1] = -x.C[0], x.o[2] = x.C[1]
             }
             ka.flipX && (x.o[0] *= -1, x.o[2] *= -1)
         }

         function qa() {
             var d = x.element.videoWidth,
                 n = x.element.videoHeight,
                 y = x.v[0] !== d || x.v[1] !== n;
             y && (x.v[0] = d, x.v[1] = n);
             return y
         }

         function ia(d, n) {
             if (ca === ea.error) return !1;
             x.element = d;
             qa();
             n && n();
             return !0
         }

         function pa(d, n, y) {
             d && d();
             x.va = {
                 video: {
                     facingMode: {
                         ideal: ka.facingMode
                     },
                     width: {
                         min: ka.minWidth,
                         max: ka.maxWidth,
                         ideal: ka.idealWidth
                     },
                     height: {
                         min: ka.minHeight,
                         max: ka.maxHeight,
                         ideal: ka.idealHeight
                     }
                 },
                 audio: !1
             };
             ka.deviceId && (x.va.deviceId = ka.deviceId);
             eb(Ya() ? document.createElement("video") : !1, function(W) {
                 n && n(W);
                 y(W)
             }, function() {
                 J("WEBCAM_UNAVAILABLE")
             }, x.va)
         }

         function J(d) {
             ca !== ea.error && (ca = ea.error, M.ia && M.ia(d))
         }

         function N(d, n) {
             for (var y in d) "undefined" !== typeof n[y] && (d[y] = n[y]);
             n === L && L.nDetectsPerLoop && (q.F = L.nDetectsPerLoop, q.Lb = L.nDetectsPerLoop)
         }
         var K = {
                 save: "NNC.json",
                 mb: 0,
                 fc: 25,
                 La: .2,
                 Z: [45, 55],
                 od: 1 / 3.5,
                 ra: [2, 7],
                 Xc: {
                     minScale: .15,
                     maxScale: .6,
                     borderWidth: .2,
                     borderHeight: .2,
                     nStepsX: 6,
                     nStepsY: 5,
                     nStepsScale: 3,
                     nDetectsPerLoop: -1
                 },
                 jd: 50,
                 Jb: .12,
                 bb: .6,
                 Pc: 8,
                 $b: .8,
                 Zb: 1,
                 hd: {
                     translationFactorRange: [.0015, .005],
                     rotationFactorRange: [.003, .02],
                     qualityFactorRange: [.9, .98],
                     alphaRange: [.05, 1]
                 },
                 hb: [.65, 1, .262],
                 da: [.092, .092, .3],
                 cc: .2,
                 ec: 2,
                 dc: .1,
                 Qc: 8,
                 Da: 1,
                 yc: [Ba.bind(null, .3, .75)],
                 md: 20
             },
             ka = {
                 facingMode: "user",
                 idealWidth: 800,
                 idealHeight: 600,
                 minWidth: 480,
                 maxWidth: 1280,
                 minHeight: 480,
                 maxHeight: 1280,
                 rotate: 0,
                 flipX: !1
             },
             ea = {
                 Mc: -1,
                 error: -2,
                 yb: 0,
                 play: 1,
                 pause: 2
             },
             ca = ea.yb,
             x = {
                 $a: !1,
                 element: !1,
                 oa: !1,
                 pa: !1,
                 v: [0, 0],
                 C: [.5, .5],
                 o: [.5, 0, 0, .5],
                 Fa: 0,
                 va: null
             },
             M = {
                 ia: !1,
                 ua: !1,
                 jb: "./",
                 ea: !1,
                 P: !1,
                 sa: K.mb,
                 Rb: K.mb,
                 Ba: !1,
                 $: !1
             },
             va = null,
             L = Object.create(K.Xc),
             Z = Object.create(K.hd);
         var oa = f = g = k = e = b = p = m = z = B = u = r = l = v = t = 0;
         var P = {
                 O: 0,
                 R: 0,
                 v: [0, 0],
                 za: null
             },
             ha = {
                 Ia: null,
                 buffer: null,
                 da: K.da.slice(0),
                 hb: K.hb.slice(0)
             },
             ya = null,
             sa = null,
             Aa = !1,
             X = !1,
             G = {
                 i: 1,
                 V: 0,
                 L: [0],
                 Eb: !1,
                 Hb: 0,
                 cb: 0
             },
             q = {
                 ja: 0,
                 timestamp: 0,
                 Mb: 0,
                 Nb: 0,
                 F: K.ra[0],
                 Lb: K.ra[0],
                 Ob: 0,
                 ba: 0,
                 ud: 1
             },
             O = [],
             ja = [];
         return {
             init: function(d) {
                 function n() {
                     ca !== ea.error && 2 === ++W && (F(), aa(), ta(), M.ia && (M.ia(!1, {
                         GL: a,
                         canvasElement: M.P,
                         videoTexture: x.pa.get(),
                         maxFacesDetected: G.i,
                         videoElement: x.element
                     }), h()), U())
                 }
                 if (ca !== ea.yb) return d.callbackReady && d.callbackReady("ALREADY_INITIALIZED"), !1;
                 ca = ea.Mc;
                 d.callbackReady && (M.ia = d.callbackReady);
                 d.callbackTrack && (M.ua = d.callbackTrack);
                 "undefined" !== typeof d.animateDelay && (M.sa = d.animateDelay);
                 "undefined" !== typeof d.NNCpath && (M.jb = d.NNCpath);
                 "undefined" !== typeof d.NNC && (M.ea = d.NNC);
                 "undefined" !== typeof d.maxFacesDetected && (G.i = Math.max(1, d.maxFacesDetected));
                 "undefined" !== typeof d.followZRot && (M.$ = d.followZRot ? !0 : !1);
                 if (G.i > K.Pc) return J("MAXFACES_TOOHIGH"), !1;
                 if (!d.canvasId && !d.canvas) return J("NO_CANVASID"), !1;
                 M.P = d.canvas ? d.canvas : document.getElementById(d.canvasId);
                 if (!M.P) return J("INVALID_CANVASID"), !1;
                 P.O = M.P.width;
                 P.R = M.P.height;
                 if (!P.O || !P.R) return J("INVALID_CANVASDIMENSIONS"), !1;
                 for (var y = 0; y < G.i; ++y) O.push(new Float32Array(K.Qc)),
                     ja.push(0);
                 d.scanSettings && N(L, d.scanSettings);
                 d.stabilizationSettings && N(Z, d.stabilizationSettings);
                 var W = 0;
                 d.videoSettings && d.videoSettings.videoElement ? ia(d.videoSettings.videoElement, n) : (d.videoSettings && N(ka, d.videoSettings), pa(d.onWebcamAsk, d.onWebcamGet, function(T) {
                     ia(T, n)
                 }));
                 ra(function(T) {
                     if (!c()) return !1;
                     va = new Ta;
                     va.Zc(T.layers);
                     va.ad({
                         Pb: "gpuRawAvg",
                         Tc: fa
                     });
                     w.bc([{
                         id: "s48",
                         name: "_",
                         Y: "attribute vec2 a0;uniform mat2 u33;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=vec2(.5,.5)+u33*a0;}",
                         ta: ["a0"],
                         fa: [2],
                         b: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                         f: ["u1", "u33"],
                         precision: "lowp"
                     }, {
                         id: "s49",
                         name: "_",
                         b: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                         Y: "attribute vec2 a0;uniform sampler2D u34;uniform vec2 u35;uniform float u36,u37;varying vec2 vv0;void main(){vec4 a=texture2D(u34,vec2(.17,u36));vec2 d=a.gb,e=a.a*u35;float b=cos(u37),c=sin(u37);vec2 g=mat2(b,c,-c,b)*a0;vv0=d+g*.5*e,gl_Position=vec4(a0,0.,1.);}",
                         ta: ["a0"],
                         fa: [2],
                         f: ["u1", "u34", "u35", "u36", "u37"],
                         precision: "lowp"
                     }, {
                         id: "s50",
                         name: "_",
                         b: "uniform sampler2D u38,u34;uniform vec3 u39,u40;uniform float u41,u42,u43,u36,u44,u37,u45;const vec4 e=vec4(.25,.25,.25,.25);void main(){vec4 g=texture2D(u38,vec2(.625,.625)),h=texture2D(u38,vec2(.875,.625)),a=texture2D(u34,vec2(.17,u36));float b=dot(g,e),i=dot(h,e);bool j=b>u42&&b>i+u43;j?a.r=2.:a.r>u41?a.r=0.:a.r>1.9?a.r+=1.:0.,a.r*=u44;if(a.r<.9)a=vec4(1.,u39);else{a.r*=step(1.9,a.r);float k=dot(e,texture2D(u38,vec2(.875,.875))),l=dot(e,texture2D(u38,vec2(.125,.625))),m=dot(e,texture2D(u38,vec2(.375,.625))),c=cos(u37),d=sin(u37);vec2 f=mat2(c,d*u45,-d/u45,c)*vec2(k,l);a.gba+=vec3(f,m)*u40*a.a;}gl_FragColor=a;}",
                         Y: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                         f: "u38 u34 u39 u41 u40 u44 u37 u45 u42 u43 u36".split(" ")
                     }, {
                         id: "s51",
                         name: "_",
                         Y: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                         b: "uniform sampler2D u38;const vec4 e=vec4(.25,.25,.25,.25);const vec3 g=vec3(.5,.5,.5);void main(){float a=dot(e,texture2D(u38,vec2(.125,.875))),b=dot(e,texture2D(u38,vec2(.375,.875))),c=dot(e,texture2D(u38,vec2(.625,.875))),d=dot(e,texture2D(u38,vec2(.625,.625)));vec3 f=vec3(a,b,c)*.5+g;gl_FragColor=vec4(f,d);}",
                         f: ["u38"]
                     }, {
                         id: "s52",
                         name: "_",
                         Y: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                         b: "uniform sampler2D u38;const vec4 e=vec4(.25,.25,.25,.25);void main(){float a=dot(e,texture2D(u38,vec2(.25,.25)));gl_FragColor=vec4(a,0.,0.,0.);}",
                         f: ["u38"]
                     }, {
                         id: "s47",
                         name: "_",
                         b: "uniform sampler2D u34;uniform vec2 u46;uniform float u47;varying vec2 vv0;void main(){float g=step(.5,mod(gl_FragCoord.y+1.5,2.)),c=step(.33,vv0.x);vec4 a=texture2D(u34,vv0+u46);a.a=mix(a.a*u47,a.a,c);vec4 d=floor(255.*a),f=255.*(255.*a-d),b=mix(d,f,g)/255.;b.x=mix(step(a.x,1.5),b.x,c),gl_FragColor=b;}",
                         f: ["u34", "u47", "u46"]
                     }]);
                     C();
                     ua();
                     da();
                     n()
                 });
                 return !0
             },
             toggle_pause: function(d, n) {
                 if (Q()) return n = n ? db(x.element, !d, x.va) : Promise.resolve(), d ? ca === ea.play && (Aa && (clearTimeout(Aa), Aa = !1), X && (window.cancelAnimationFrame(X), X = !1), ca = ea.pause) : U(), n
             },
             toggle_slow: function(d) {
                 Q() && ca === ea.play && (d && !M.Ba ? (M.Rb = M.sa, L.nDetectsPerLoop = 1, this.set_animateDelay(100), M.Ba = !0) : !d && M.Ba && (L.nDetectsPerLoop = -1, this.set_animateDelay(M.Rb), M.Ba = !1))
             },
             set_animateDelay: function(d) {
                 M.sa = d
             },
             resize: function() {
                 var d = M.P.width,
                     n = M.P.height;
                 if (!qa() && d === P.O && n === P.R) return !1;
                 P.O = d;
                 P.R = n;
                 ua();
                 da();
                 F();
                 ta();
                 return !0
             },
             set_inputTexture: function(d, n, y) {
                 x.v[0] = n;
                 x.v[1] = y;
                 x.$a = !0;
                 F();
                 h();
                 ta();
                 w.set("s48");
                 x.pa.I();
                 a.activeTexture(a.TEXTURE0);
                 a.bindTexture(a.TEXTURE_2D, d);
                 S.h(!0, !0)
             },
             reset_inputTexture: function() {
                 qa();
                 x.$a = !1;
                 F();
                 ta()
             },
             get_videoDevices: function(d) {
                 return gb(d)
             },
             set_scanSettings: function(d) {
                 N(L, d);
                 ua();
                 da()
             },
             set_stabilizationSettings: function(d) {
                 N(Z, d)
             },
             set_videoOrientation: function(d, n) {
                 Q() && (ka.flipX = n, ka.rotate =
                     d, F(), ta())
             },
             update_videoElement: function(d, n) {
                 ia(d, function() {
                     aa();
                     F();
                     n && n()
                 })
             }
         }
     }();;
     return JEEFACEFILTERAPI;
 })();