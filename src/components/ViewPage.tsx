import React from 'react';
import { Box, useColorMode, Text } from '@chakra-ui/react';
import { FloatingControls } from './FloatingControls';
import MDEditor from '@uiw/react-md-editor';
import { PostObject, setTitle } from '../common';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';

type ViewPageProps = {
    postObject: PostObject;
};

function ismobilesafari() {
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        return true
    } else {
        return false
    }
}

export const ViewPage = (props: ViewPageProps) => {
    const { postObject } = props;
    const { colorMode } = useColorMode();
    setTitle(postObject.postContent);

    return (
        <Box
            w='100%'
            h='100vh'
            margin='0 auto'
            overflow="scroll"
            data-color-mode={colorMode}
        >
            <MDEditor.Markdown
                source={postObject.postContent}
                style={{
                    margin: "70px 0 0 0",
                    background: "unset",
                    boxShadow: "unset",
                    // overflow: 'auto',
                    fontSize: `${postObject.fontSize}px`
                }}
            />

            <Box display='flex' alignItems='center' justifyContent='center' margin="20px 0 40px">
                <Text fontSize={14} >Made with </Text>
                <Logo sizePx={30} />
                <Text fontSize={14} fontFamily='monospace'><Link to='/'> Libre.ink</Link></Text>
            </Box>

            {ismobilesafari() ? <div style={{ margin: "40px 0 140px" }}></div> : null}

            <FloatingControls
                displayMode='view'
                show={true}
                postContent={postObject.postContent}
            />
        </Box>
    );
};

