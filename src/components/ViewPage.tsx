import React from 'react';
import { Box, Heading, Link, useColorMode } from '@chakra-ui/react';
import Typewriter from 'typewriter-effect';
import { FloatingControls } from './FloatingControls';
import MDEditor from '@uiw/react-md-editor';

type ViewPageProps = {
    post: string;
};

export const ViewPage = (props: ViewPageProps) => {
    const { post } = props;
    const { colorMode } = useColorMode();

    return (
        <Box p='7' w='100%' h='100vh' display='flex' flexDirection='column' alignItems='left'>
            <div data-color-mode={colorMode} >
                <MDEditor.Markdown
                    source={post}
                    style={{
                        "padding": "50px",
                        "background": "unset",
                        "boxShadow": "unset"
                    }}
                />
            </div>
            
            <FloatingControls
                editMode={false}
                show={true}
            />

        </Box>
    );
};

