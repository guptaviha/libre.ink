import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';
import Typewriter from 'typewriter-effect';

type ViewPageProps = {
    post: string;
};

export const ViewPage = (props: ViewPageProps) => {
    const { post } = props;
    return (
        <Box p='12' w='100%' h='100vh' display='flex' flexDirection='column' alignItems='center'>
            <Heading as={'h4'} size="sm" fontFamily='monospace'>
                <Typewriter
                    options={{
                        strings: ['Mini Blog'],
                        autoStart: true,
                        loop: false,
                        pauseFor: 900000,
                    }}
                />
            </Heading>
            <Text
                id="view-container"
                size="lg"
                m="50px"
                minHeight="400px"
                maxHeight="400px"
            >
                {post}
            </Text>

        </Box>
    );
};

