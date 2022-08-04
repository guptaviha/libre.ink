import React, { useState, useEffect } from 'react';
import { Box, Center, Stack, useColorMode, Text, Heading, background } from '@chakra-ui/react';
import { FloatingControls } from './FloatingControls';
import MDEditor from '@uiw/react-md-editor';
import { PostObject, setTitle } from '../common';
import { Logo } from './Logo';

type ViewPageProps = {
    postObject: PostObject;
};

export const ViewPage = (props: ViewPageProps) => {
    const { postObject } = props;
    const { colorMode } = useColorMode();
    setTitle(postObject.postContent);

    return (
        <Box
            w='100%'
            h='100vh'
            margin='0 auto'
            display='flex'
            // background='red'
            flexDirection='column'
            alignItems='left'
            overflow="scroll"
            // padding='10px 0'
            data-color-mode={colorMode}
        >
            <MDEditor.Markdown
                source={postObject.postContent}
                style={{
                    margin: "70px 0 0",
                    background: "unset",
                    boxShadow: "unset",
                    // overflow: "unset",
                    fontSize: `${postObject.fontSize}px`,
                    // background: 'maroon',
                }}
            />

            <Box display='flex' alignItems='center' justifyContent='center' padding="40px 0 100px">
                <Text fontSize={14} >Made with </Text>
                <Logo sizePx={30} /> 
                <Text fontSize={14} fontFamily='monospace'> Libre.ink</Text>
            </Box>

            {/* <div id="footer-margin" style={{background:"green", margin:"50px 0"}}>
                Helloooo! I'm here.
            </div> */}

            {/* <br /><br /><br /><br /><br /><br /> */}

            <FloatingControls
                editMode={false}
                show={true}
                postContent={postObject.postContent}
            />

        </Box>
    );
};

