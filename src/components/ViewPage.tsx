import React, { useState, useEffect } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import { FloatingControls } from './FloatingControls';
import MDEditor from '@uiw/react-md-editor';
import { PostObject, setTitle } from '../common';


const localStorageFont = Number(localStorage.getItem('fontSize') ? localStorage.getItem('fontSize') : 16);

type ViewPageProps = {
    postObject: PostObject;
};

export const ViewPage = (props: ViewPageProps) => {
    const { postObject } = props;
    const { colorMode } = useColorMode();
    const [fontSize, setFontSize] = useState(localStorageFont);
    setTitle(postObject.postContent);

    useEffect(() => {
        localStorage.setItem('fontSize', fontSize);
    }, [fontSize]);

    return (
        <Box
            w='100%'
            h='100vh'
            margin='0 auto'
            display='flex'
            flexDirection='column'
            alignItems='left'
            data-color-mode={colorMode}
        >
            <MDEditor.Markdown
                source={postObject.postContent}
                style={{
                    margin: "70px 0 0",
                    background: "unset",
                    boxShadow: "unset",
                    overflow: "auto",
                    fontSize: `${fontSize}px`
                }}
            />

            <FloatingControls
                editMode={false}
                show={true}
                postContent={postObject.postContent}
                fontSize={fontSize}
                setFontSize={setFontSize}
            />

        </Box>
    );
};

