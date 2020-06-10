import React from 'react';
import { render } from 'react-dom'
import WebXRCard from '../../src'

const tagStyle = { color: '#ff5252' };
const attrNameStyle = { color: '#00b0ff' };
const attrValueStyle = { color: '#00bfa5' };

const App = () =>

    <div>
        <h2>AR mode</h2>
        <code>
            <span style={tagStyle}>&lt;WebXRCard</span>
            <span style={attrNameStyle}> mode=</span><b><span style={attrValueStyle}>"ar"</span></b>
            <span style={attrNameStyle}> src=</span><span style={attrValueStyle}>"https://modelviewer.dev/shared-assets/models/Astronaut.glb"</span>
            <span style={attrNameStyle}> ios-src=</span><span style={attrValueStyle}>"https://modelviewer.dev/shared-assets/models/Astronaut.usdz"</span>
            <span style={attrNameStyle}> alt=</span><span style={attrValueStyle}>"A 3D model of an astronaut"</span>
            <span style={tagStyle}>&gt;&lt;/WebXRCard&gt;</span>
        </code>
        <p></p>
        <WebXRCard mode="ar" src="https://modelviewer.dev/shared-assets/models/Astronaut.glb" ios-src="https://modelviewer.dev/shared-assets/models/Astronaut.usdz" alt="A 3D model of an astronaut"></WebXRCard>
        <h2>VR mode</h2>
        <code>
            <span style={tagStyle}>&lt;WebXRCard</span>
            <span style={attrNameStyle}> mode=</span><b><span style={attrValueStyle}>"vr"</span></b>
            <span style={attrNameStyle}> src=</span><span style={attrValueStyle}>"https://modelviewer.dev/shared-assets/models/Astronaut.glb"</span>
            <span style={attrNameStyle}> alt=</span><span style={attrValueStyle}>"A 3D model of an astronaut"</span>
            <span style={tagStyle}>&gt;&lt;/WebXRCard&gt;</span>
        </code>
        <p></p>
        <WebXRCard mode="vr" src="https://modelviewer.dev/shared-assets/models/Astronaut.glb" alt="A 3D model of an astronaut"></WebXRCard>
    </div>;

render(<App />, document.getElementById('root'));
