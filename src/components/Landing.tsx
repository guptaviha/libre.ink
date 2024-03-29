import React from 'react';
import { Box, Button, ChakraProvider, Text, useColorMode } from '@chakra-ui/react';
import theme from '../theme';
import { Link } from 'react-router-dom';
import { FloatingControls } from './FloatingControls';
import '../styles/main.scss';
import { setTitle } from '../common';
import { LANDING_PAGE_TITLE } from '../constants';

function isMobile() {
    if (navigator.userAgent.toLowerCase().match(/mobile/i)) {
        return true;
    }
    return false;
}

export const Landing = () => {
    const { colorMode } = useColorMode();
    const mainTextColor = colorMode === 'dark' ? 'rgb(167, 214, 247)' : 'rgb(42, 103, 247)';
    setTitle(LANDING_PAGE_TITLE);
    return (
        <ChakraProvider theme={theme}>
            <Box
                w='100%'
                h='100vh'
                display='flex'
                flexDirection='column'
                alignItems='center'
                overflow='scroll'
                paddingBottom="50px"
                margin="60px 0"
                className='landing-page'
            >
                <Text fontSize='5xl' margin={'40px 0 30px'}>
                    <span style={{ color: mainTextColor }}>Instant anonymous</span> blogging
                </Text>
                <Text margin='0 0 25px' textAlign={isMobile() ? 'left' : 'center'} lineHeight="taller">
                    libre.ink is a truly anonymous instant-publish blog platform with a unique quirk.
                    <br />We store your blog post right in the URL.
                </Text>
                <Link to='/app'>
                    <Button size='lg' variant='outline' margin='0 0 50px'>
                        Start writing
                    </Button>
                </Link>
                <Box marginBottom={isMobile() ? "200px" : "50px"} boxShadow="0 14px 28px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);">
                    <video muted loop autoPlay width="800" height="600">
                        <source src='https://github.com/guptaviha/libre.ink/raw/main/assets/Quick-Tutorial.mov' />
                    </video>
                </Box>
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
