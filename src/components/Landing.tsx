import React from 'react';
import { Box, Button, ChakraProvider, Image, Text, useColorMode } from '@chakra-ui/react';
import theme from '../theme';
import { Link } from 'react-router-dom';
import { FloatingControls } from './FloatingControls';
import '../styles/main.scss';
import tutorialGif from '../../assets/Quick-Tutorial.gif';
// import tutorialMov from '../../assets/Quick-Tutorial.mov';

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
                overflow='scroll'
                padding="100px 0 50px"
            >
                <Text fontSize='5xl' margin={'0 0 30px'}>
                    <span style={{ color: mainTextColor }}>Instant anonymous</span> blogging
                </Text>
                <Text margin='0 0 25px' textAlign='center'>
                    Libre.ink is a truly anonymous instant-publish blog platform that has a unique quirk.
                    <br />We store your blog post right in the URL.
                </Text>
                <Link to='/app'>
                    <Button size='lg' variant='outline' margin='0 0 50px'>
                        Write post
                    </Button>
                </Link>
                <video autoplay muted width="800" height="600" name="Libre.ink">
                    <source src={'https://github.com/guptaviha/libre.ink/raw/main/assets/Quick-Tutorial.mov'} />
                    {/* <source src={'/Quick-Tutorial.mov'} /> */}
                </video>
                {/* <Image
                    src={tutorialGif}
                    margin='0 0 100px'
                    boxShadow="0 14px 28px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);"
                    boxSize='750px'
                /> */}
                {/* <img
                    src={tutorialGif}
                    margin='0 0 100px'
                    width='750px'
                    box-shadow="0 14px 28px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);"
                /> */}
                <FloatingControls
                    displayMode='landing'
                    show={true}
                />
            </Box>
        </ChakraProvider>
    );
};
