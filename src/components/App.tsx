import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { EditPage } from './EditPage';
import { ViewPage } from './ViewPage';
import theme from '../theme';
import '../styles/main.scss';
import { decode, PostObject } from '../common';
import * as constants from '../constants';

export const App = () => {
    const queryString = window.location.search;
    const urlParams2 = new URLSearchParams(queryString);
    const encodedPostObject = urlParams2.get("post");
    let postObject: PostObject = {
        postContent: constants.INVALID_POST_TEXT,
        fontSize: '16'
    };

    if (encodedPostObject) {
        try {
            const decodedPostObj = JSON.parse(decode(encodedPostObject));
            postObject = {
                ...decodedPostObj,
                fontSize: decodedPostObj.fontSize || '16'
            };
        } catch (e) {
            console.error('Something went wrong with the URL');
        }
    }

    return (
        <ChakraProvider theme={theme}>
            {!encodedPostObject
                ? <EditPage />
                : <ViewPage postObject={postObject} />
            }
        </ChakraProvider>
    );
};
