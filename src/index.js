/*
 * Copyright (c) 2020, Yusuke Hara
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React from 'react';
import '@google/model-viewer';
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

    if (canvas == null) { return; }

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

            // The default camera looks at the back of the asset
            // Rotate the camera by 180 degrees to the front of the asset
            scene.activeCamera.alpha += Math.PI;

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
        return <model-viewer {...props} auto-rotate autoplay camera-controls ar magic-leap></model-viewer>;
    } else if (props.mode == "vr") {
        const [id, setID] = React.useState("renderCanvas-" + getUniqueStr());

        if (document.getElementById(id) == null) {
            setTimeout(() => prepareBabylonCanvas(id, props.src, props.mode), 1000);
        }

        return <canvas id={id} className="renderCanvas" title={props.alt}></canvas>;
    }

    return <div aria-hidden="true" className="markdown css-1b7yvbl"><p>Invalid mode!</p></div>;
}

export default WebXRCard;
