import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { EditPage } from './EditPage';
import { ViewPage } from './ViewPage';
import theme from '../theme';
import '../styles/main.scss';
import { decode } from '../common';
import * as constants from '../constants';

export const App = () => {
    const queryString = window.location.search;
    const urlParams2 = new URLSearchParams(queryString);
    const encodedPostObject = urlParams2.get("post");
    let decodedPost;

    if (encodedPostObject) {
        try {
            decodedPost = (JSON.parse(decode(encodedPostObject)));
        } catch (e) {
            decodedPost = {
                postContent: constants.INVALID_POST_TEXT,
            };
        }
    }

    return (
        <ChakraProvider theme={theme}>
            {!encodedPostObject
                ? <EditPage />
                : <ViewPage postObject={decodedPost} />
            }
        </ChakraProvider>
    );
};
