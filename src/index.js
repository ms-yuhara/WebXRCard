import React from 'react';
import "@google/model-viewer";
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import './styles.css';

function getUniqueStr(myStrong) {
    var strong = 1000;
    if (myStrong) strong = myStrong;
    return new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16);
}

function prepareBabylonCanvas(id, src) {
    if ((id == null) || (src == null)) { return; }

    var canvas = document.getElementById(id);

    var engine = null;
    var scene = null;
    var sceneToRender = null;
    var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };

    var delayCreateScene = function () {
        // Create a scene
        var scene = new BABYLON.Scene(engine);
        scene.createDefaultCameraOrLight();

        // Append glTF model to scene
        Promise.all([
            BABYLON.SceneLoader.AppendAsync(src)
        ]).then(function () {
            scene.createDefaultCamera(true, true, true);

            const env = scene.createDefaultEnvironment();

            // Here we add XR support
            const xr = scene.createDefaultXRExperienceAsync({
                floorMeshes: [env.ground]
            });
        });

        return scene;
    };

    var engine;

    try {
        engine = createDefaultEngine();
    } catch (e) {
        console.log("the available createEngine function failed. Creating the default engine instead");
        engine = createDefaultEngine();
    }

    if (!engine) throw 'engine should not be null.';

    scene = delayCreateScene();
    sceneToRender = scene;

    engine.runRenderLoop(function () {
        if (sceneToRender) {
            sceneToRender.render();
        }
    });

    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });
}

function WebXRCard(props) {
    if (props.mode == "ar") {
        return <model-viewer {...props} auto-rotate camera-controls ar magic-leap></model-viewer>;
    } else if (props.mode == "vr") {
        const id = "renderCanvas-" + getUniqueStr();
        setTimeout(() => prepareBabylonCanvas(id, props.src), 1000);
        return <canvas id={id} className="renderCanvas"></canvas>;
    }

    return <div aria-hidden="true" className="markdown css-1b7yvbl"><p>Invalid mode!</p></div>;
}

export default WebXRCard;
