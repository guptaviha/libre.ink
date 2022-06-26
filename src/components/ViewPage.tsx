import React, { useState, useEffect } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import { FloatingControls } from './FloatingControls';
import MDEditor from '@uiw/react-md-editor';
import { setTitle } from '../common';


const localStorageFont = (localStorage.getItem('fontSize') ? localStorage.getItem('fontSize') : 16);

type ViewPageProps = {
    post: string;
};

export const ViewPage = (props: ViewPageProps) => {
    const { post } = props;
    const { colorMode } = useColorMode();
    const [fontSizeSlider, setFontSizeSlider] = useState(localStorageFont);
    setTitle(post);

    useEffect(() => {
        localStorage.setItem('fontSize', fontSizeSlider);
    }, [fontSizeSlider]);

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
                source={post}
                style={{
                    margin: "70px 0 0",
                    background: "unset",
                    boxShadow: "unset",
                    overflow: "auto",
                    fontSize: `${fontSizeSlider}px`
                }}
            />

            <FloatingControls
                editMode={false}
                show={true}
                postContent={post}
                fontSizeSlider={fontSizeSlider}
                setFontSizeSlider={setFontSizeSlider}
            />

        </Box>
    );
};

