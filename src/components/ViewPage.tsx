import React from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import { FloatingControls } from './FloatingControls';
import MDEditor from '@uiw/react-md-editor';
import { setTitle } from '../common';

type ViewPageProps = {
    post: string;
};

export const ViewPage = (props: ViewPageProps) => {
    const { post } = props;
    const { colorMode } = useColorMode();
    setTitle(post);

    return (
        <Box w={{ base: '100%', md: '80%', lg: '70%' }}
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
                    padding: "0 50px 50px",
                    background: "unset",
                    boxShadow: "unset",
                    overflow: "auto"
                }}
            />

            <FloatingControls
                editMode={false}
                show={true}
            />

        </Box>
    );
};

