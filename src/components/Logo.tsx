import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { Box, Heading, Image, Link } from '@chakra-ui/react';
import { APP_TITLE } from '../constants';
import ghostIconSW from '../../assets/icons/noun-ghost-straight-sw.svg';
import ghostIconC from '../../assets/icons/noun-ghost-straight-c.svg';
import ghostIconSE from '../../assets/icons/noun-ghost-straight-se.svg';
import ghostIconE from '../../assets/icons/noun-ghost-straight-e.svg';
import ghostIconW from '../../assets/icons/noun-ghost-straight-w.svg';
import ghostIconNW from '../../assets/icons/noun-ghost-straight-nw.svg';

export const Logo = () => {
    const [icon, setIcon] = useState(ghostIconSE);
    useEffect(() => {
        function handleMouseMove(e) {
            const x = e.x;
            const y = e.y;
            if (x < 30 && y < 30 && x > 20 && y > 20) {
                setIcon(ghostIconC);
            } else if (x > 30 && y < 30) {
                setIcon(ghostIconE);
            } else if (x < 30 && y > 30) {
                setIcon(ghostIconSW);
            } else if (x < 20 && y < 20) {
                setIcon(ghostIconNW);
            } else if (x < 20 && y < 40 && y > 20) {
                setIcon(ghostIconW);
            } else {
                setIcon(ghostIconSE);
            }
        }
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.addEventListener('mousemove', handleMouseMove);
        }
    }, []);
    return (
        <Link href='/' _hover={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
            <Box position='fixed' top='24px' left='10px' display='flex' alignItems='center'>
                <Image src={icon} width='40px' paddingRight='5px' />
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
