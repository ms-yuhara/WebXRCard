import React from 'react';
import { render } from 'react-dom'
import WebXRCard from '../../src'

const App = () =>

    <div>
        <h2>AR mode</h2>
        <WebXRCard mode="ar" src="https://modelviewer.dev/shared-assets/models/Astronaut.glb" ios-src="https://modelviewer.dev/shared-assets/models/Astronaut.usdz" alt="A 3D model of an astronaut" />
        <h2>VR mode</h2>
        <WebXRCard mode="vr" src="https://modelviewer.dev/shared-assets/models/Astronaut.glb" ios-src="https://modelviewer.dev/shared-assets/models/Astronaut.usdz" alt="A 3D model of an astronaut" />
    </div>;

render(<App />, document.getElementById('root'));
