import React from 'react';
import { Box, Button, ChakraProvider, Text, useColorMode } from '@chakra-ui/react';
import theme from '../theme';
import { Link } from 'react-router-dom';
import '../styles/main.scss';
import { FloatingControls } from './FloatingControls';

export const Landing = () => {
    const { colorMode } = useColorMode();
    const mainTextColor = colorMode === 'dark' ? 'rgb(167, 214, 247)' : 'rgb(42, 103, 247)';
    return (
        <ChakraProvider theme={theme}>
            <Box
                w='100%'
                h='100vh'
                display='flex'
                flexDirection='column'
                alignItems='center'
                margin={'120px 0'}
            >
                <Text fontSize='5xl' margin={'0 0 50px'}>
                    <span style={{ color: mainTextColor }}>Instant anonymous</span> blogging
                </Text>
                <Link to='/app'>
                    <Button size='lg' colorScheme='teal' variant='outline'>
                        Create post
                    </Button>
                </Link>
                <FloatingControls
                    displayMode='landing'
                    show={true}
                />
            </Box>
        </ChakraProvider>
    );
};
