import React, { useMemo } from 'react';
import { render } from 'react-dom'
import ReactWebChat, { createDirectLine, createStyleSet, createStore, createBrowserWebSpeechPonyfillFactory } from 'botframework-webchat';
import WebXRCard from '../../src'

(async function () {
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

    // "styleSet" is a set of CSS rules which are generated from "styleOptions"
    const styleSet = createStyleSet({
        bubbleBackground: 'rgba(0, 0, 255, .1)',
        bubbleFromUserBackground: 'rgba(0, 255, 0, .1)'
    });

    // After generated, you can modify the CSS rules
    styleSet.textContent = {
        ...styleSet.textContent,
        fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        fontSize: '1.0rem'
    };

    const store = createStore({}, ({ dispatch }) => next => action => {
        if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
            dispatch({
                type: 'WEB_CHAT/SEND_EVENT',
                payload: {
                    name: 'webchat/join',
                    value: { language: window.navigator.language }
                }
            });
        }

        return next(action);
    });

    const App = () =>

        <ReactWebChat
            attachmentMiddleware={attachmentMiddleware}
            directLine={createDirectLine({ token: 'YOUR_DIRECT_LINE_TOKEN' })}
            locale={Navigator.language}
            styleSet={styleSet}
            store={store}
            webSpeechPonyfillFactory={createBrowserWebSpeechPonyfillFactory()}
        />;

    render(<App />, document.getElementById('webchat'));
})().catch(err => console.error(err));
