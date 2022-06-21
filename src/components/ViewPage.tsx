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
    document.title = "VihasTitle";

    return (
        <Box p='60px' w={{ base: '100%', md: '80%', lg: '70%' }}
            h='100vh'
            margin='auto'
            overflow='hidden'
            display='flex' flexDirection='column' alignItems='left'
        >
            <br></br>

            <div style={{
                overflow: "auto",
                // background: 'maroon', 
                height: "80vh"
            }} >
                <div data-color-mode={colorMode} >
                    <MDEditor.Markdown
                        source={post}
                        // height='6000px'
                        style={{
                            // "padding": "50px",
                            "background": "unset",
                            "boxShadow": "unset"
                        }}
                    />
                </div>
            </div>

            <FloatingControls
                editMode={false}
                show={true}
            />

        </Box>
    );
};

