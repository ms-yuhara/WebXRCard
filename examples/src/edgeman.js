import React from 'react';
import { render } from 'react-dom'
import WebXRCard from '../../src'

const tagStyle = { color: '#ff5252' };
const attrNameStyle = { color: '#00b0ff' };
const attrValueStyle = { color: '#00bfa5' };

const App = () =>

    <div>
        <code>
            <span style={tagStyle}>&lt;WebXRCard</span>
            <span style={attrNameStyle}> mode=</span><b><span style={attrValueStyle}>"vr"</span></b>
            <span style={attrNameStyle}> src=</span><span style={attrValueStyle}>"https://edgewatcher.azurewebsites.net/edgeman.glb"</span>
            <span style={attrNameStyle}> alt=</span><span style={attrValueStyle}>"Edgeman"</span>
            <span style={tagStyle}>&gt;&lt;/WebXRCard&gt;</span>
        </code>
        <p></p>
        <WebXRCard mode="vr" src="https://edgewatcher.azurewebsites.net/edgeman.glb" alt="Edgeman"></WebXRCard>
    </div>;

render(<App />, document.getElementById('root'));
