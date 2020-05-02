var renderIncrement = 0;
var container = document.getElementById("models");
var camera = new THREE.PerspectiveCamera( 8, 1, 1, 1000 ),
    mouseX = 0,
    mouseY = 0;
    var camera2 = new THREE.PerspectiveCamera( 4, 2, 30, 1000 ),
        mouseX = 0,
        mouseY = 0;
camera.position.z = 80;
camera.position.x = 0;
camera2.position.z = 60;
camera2.position.x = 0.8;
init();
setTimeout(function () {
    render();
},500);

function init() {
  /*  // Dew Challenge
    rendererDC = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    bottle = new THREE.ColladaLoader();
    sceneDC = new THREE.Scene(); 
    spotLightDC = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1.3 );

    container.appendChild(rendererDC.domElement);
    rendererDC.setSize( 600, 600 );

    bottle.load("bottle.dae", function(collada) {
        spotLightDC.position.set(-1000,1000,1000);
        bottle = collada.scene;
        sceneDC.add(bottle).add(spotLightDC);
    }) */

    // Sunstate
    rendererSS = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    sun = new THREE.ColladaLoader();
    sceneSS = new THREE.Scene();
    spotLightSS = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1.3 );

    container.appendChild(rendererSS.domElement);
    rendererSS.setSize( 600, 600 );

    sun.load("sun.dae", function(collada) {
        spotLightSS.position.set(-1000,1000,1000);
        sun = collada.scene;
        sceneSS.add(sun).add(spotLightSS);
    })

    // Gamers League
    rendererGML = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    helmet = new THREE.ColladaLoader();
    sceneGML = new THREE.Scene();
    spotLightGML = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1.3 );

    container.appendChild(rendererGML.domElement);
    rendererGML.setSize( 600, 600 );

    helmet.load("helmet_2.dae", function(collada) {
        spotLightGML.position.set(-3000,3000,3000);
        helmet = collada.scene;
        sceneGML.add(helmet).add(spotLightGML);
    })

  /*    // Sim¨®n Cuchiller¨ªas
    rendererSCU = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    knife = new THREE.ColladaLoader();
    sceneSCU = new THREE.Scene();
    spotLightSCU = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1.3 );

    container.appendChild(rendererSCU.domElement);
    rendererSCU.setSize( 600, 600 );

    knife.load("knife.dae", function(collada) {
        spotLightSCU.position.set(-1000,1000,1000);
        knife = collada.scene;
        sceneSCU.add(knife).add(spotLightSCU);
    })
*/
   /*   // Guild Storm
    rendererGS = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    storm = new THREE.ColladaLoader();
    sceneGS = new THREE.Scene();
    spotLightGS = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1.3 );

    container.appendChild(rendererGS.domElement);
    rendererGS.setSize( 600, 600 );

    storm.load("storm.dae", function(collada) {
        spotLightGS.position.set(-1000,1000,1000);
        storm = collada.scene;
        sceneGS.add(storm).add(spotLightGS).rotation.x = 0.7;
    })  */

    // About page
    rendererABT = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    pipes = new THREE.ColladaLoader();
    sceneABT = new THREE.Scene();
    spotLightABT = new THREE.HemisphereLight( 0x202025, 0x0d0e16, 1 );
    neonLightABT = new THREE.PointLight( 0xff0054, 1, 100 );
    neonLightABT.position.set( 0, 0, 0 );
    neonLightABT2 = new THREE.PointLight( 0x03d8ff, 1, 100 );
    neonLightABT2.position.set( -40, 0, -5 );

    rendererABT.setSize( $(".about-render").width(), $(".about-render").width() / 2 );

}

var colorDC1,
    colorDC2,
    colorSS1,
    colorSS2,
    colorGML1,
    colorGML2,
    colorSCU1,
    colorSCU2,
    colorGS1,
    colorGS2,
    colorMT1,
    colorMT2,
    white1 = "#eef0ef",
    white2 = "#bfbbab"
;

function renderColor() {
  //  spotLightDC.color.setStyle( colorDC1 );
 //   spotLightDC.groundColor.setStyle( colorDC2 );
    spotLightSS.color.setStyle( colorSS1 );
    spotLightSS.groundColor.setStyle( colorSS2 );
    spotLightGML.color.setStyle( colorGML1 );
    spotLightGML.groundColor.setStyle( colorGML2 );
//    spotLightSCU.color.setStyle( colorSCU1 );
//    spotLightSCU.groundColor.setStyle( colorSCU2 );
  //  spotLightGS.color.setStyle( colorGS1 );
 //   spotLightGS.groundColor.setStyle( colorGS2 );
}

function renderColoring() {
    if (menu) {
        TweenMax.to(window, colorT, {
            colorDC1: white1,
            colorDC2: white2,
            colorSS1: white1,
            colorSS2: white2,
            colorGML1:  white1,
            colorGML2: white2,
            colorSCU1:  white1,
            colorSCU2: white2,
            colorGS1:  white1,
            colorGS2: white2,
            colorMT1:  white1,
            colorMT2: white2,
            onUpdate: function() {
                renderColor()
            }
        })
    } else if (studio) {
        TweenMax.to(window, colorT, {
            colorDC1: "#2a2e2c",
            colorDC2: "#1a1c1b",
            colorSS1: "#352b32",
            colorSS2: "#271c24",
            colorGML1:  "#292c2f",
            colorGML2: "#1d1f21",
            colorSCU1:  "#31302d",
            colorSCU2: "#141412",
            colorGS1:  "#332022",
            colorGS2: "#100d0d",
            onUpdate: function() {
                renderColor()
            }
        })
    } else {
        TweenMax.to(window, colorT, {
            colorDC1: "#25292e",
            colorDC2: "#131516",
            colorSS1: "#f6d387",
            colorSS2: "#fa6479",
            colorGML1:  "#3d3348",
            colorGML2: "#1a1b27",
            colorSCU1:  "#c59b62",
            colorSCU2: "#7d694c",
            colorGS1:  "#6142b1",
            colorGS2: "#6d65e3",
            onUpdate: function() {
                renderColor()
            }
        })
    }
}

var oldLogFunction = console.log;

function render() {
    requestAnimationFrame( render );

    if (!about) {
        renderIncrement += 0.000008 * mouseX;

   /*     rendererDC.render( sceneDC, camera );
        bottle.rotation.x = 0.005 * mouseY;
        bottle.rotation.y = renderRotation + renderIncrement;  */

        rendererSS.render( sceneSS, camera );
        sun.rotation.x = 0;
        sun.rotation.y = renderRotation + renderIncrement;

        rendererGML.render( sceneGML, camera );
        helmet.rotation.x = 0.001 * mouseY;
        helmet.rotation.y = renderRotation + renderIncrement;

   /*       rendererSCU.render( sceneSCU, camera );
        knife.rotation.x = 0.0005 * mouseY;
        knife.rotation.y = renderRotation + renderIncrement; */

    /*      rendererGS.render( sceneGS, camera );
        storm.rotation.x = 0.001 * mouseY;
        storm.rotation.y = renderRotation + renderIncrement; */
        console.log = oldLogFunction; // reset console.log
        console.log = function(){}; // noop
    } else {
        rendererABT.render( sceneABT, camera2 );
        pipes.rotation.y = renderRotation + (0.0001 * mouseX);

        TweenMax.to($(".neon-sign"), 0.2, {
            rotationY: -7 + 0.0005 * mouseX,
            skewY: -1.5 - 0.00078 * mouseX,
            y: 6,
            x: 450 - 0.005 * mouseX,
        })
    }
}

document.addEventListener('mousemove', onDocumentMouseMove, false);
function onDocumentMouseMove(e) {
    if (mouseRotation) {
        mouseX = e.clientX - winW / 2;
        mouseY = e.clientY - winH / 2;
    } else {
        mouseX = 0;
        mouseY = 0;
    }
}
