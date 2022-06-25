import React from 'react';
import Typewriter from 'typewriter-effect';
import { Box, Heading, Image, Link } from '@chakra-ui/react';
import { APP_TITLE } from '../constants';
import ghostIconSW from '../../assets/icons/noun-ghost-120578.svg';

export const Logo = () => {
    return (
        <Link href='/' _hover={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
            <Box position='fixed' top='24px' left='10px' display='flex' alignItems='center'>
                <Image src={ghostIconSW} width='40px' paddingRight='5px' />
                <Heading size={{ base: 'lg', sm: 'md', md: 'md', lg: 'md' }} fontFamily='monospace' title='Your favorite anonymous publishing platform'>
                    <Typewriter
                        options={{
                            strings: [APP_TITLE],
                            autoStart: true,
                            loop: false,
                            pauseFor: 90000000,
                        }}
                    />
                </Heading>
            </Box>
        </Link>
    )
};
