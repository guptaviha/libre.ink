import React, { useState, useEffect } from 'react';
import { Box, Center, Stack, useColorMode, Text, Heading, background } from '@chakra-ui/react';
import { FloatingControls } from './FloatingControls';
import MDEditor from '@uiw/react-md-editor';
import { PostObject, setTitle } from '../common';
import { Logo } from './Logo';

type ViewPageProps = {
    postObject: PostObject;
};

function ismobilesafari() {
    if( navigator.userAgent.match( /(iPod|iPhone|iPad)/ ) ) {
        return true
    } else {
        return false
    }
}

export const ViewPage = (props: ViewPageProps) => {
    const { postObject } = props;
    const { colorMode } = useColorMode();
    setTitle(postObject.postContent);

    console.log(ismobilesafari())

    return (
        <Box
            w='100%'
            h='100vh'
            margin='0 auto'
            // display='flex'
            // flexDirection='column'
            // alignItems='left'
            // padding="70px 0"
            overflow="scroll"
            data-color-mode={colorMode}
        >
            <MDEditor.Markdown
                source={postObject.postContent}
                style={{
                    margin: "70px 0 0 0",
                    background: "unset",
                    boxShadow: "unset",
                    // overflow: "scroll",
                    fontSize: `${postObject.fontSize}px`,
                }}
            />

            <Box display='flex' alignItems='center' justifyContent='center' margin="20px 0 40px">
                <Text fontSize={14} >Made with </Text>
                <Logo sizePx={30} /> 
                <Text fontSize={14} fontFamily='monospace'> Libre.ink</Text>
            </Box>           

            {ismobilesafari() ? <div style={{margin:"40px 0 140px"}}></div> : null}

            <FloatingControls
                editMode={false}
                show={true}
                postContent={postObject.postContent}
            />

        </Box>
    );
};

