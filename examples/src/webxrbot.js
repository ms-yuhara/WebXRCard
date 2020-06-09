import React, { useMemo } from 'react';
import { render } from 'react-dom'
import ReactWebChat, { createDirectLine, createStore } from 'botframework-webchat';
import WebXRCard from '../../src'

const attachmentMiddleware = () => next => card => {
    switch (card.attachment.contentType) {
        case 'model/gltf-binary':
            return (
                <WebXRCard mode={card.attachment.content.mode} src={card.attachment.content.url} ios-src={card.attachment.content.alturl} alt={card.attachment.content.description} />
            );

        default:
            return next(card);
    }
};

const App = () =>

    <ReactWebChat
        attachmentMiddleware={attachmentMiddleware}
        directLine={createDirectLine({ token: 'YOUR_DIRECT_LINE_TOKEN' })}
        store={createStore()}
    />;

render(<App />, document.getElementById('webchat'));