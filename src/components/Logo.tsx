import React, { useState, useEffect, useRef } from 'react';
import { Box, Image, Link } from '@chakra-ui/react';
import ghostIconSW from '../../assets/icons/noun-ghost-sneaky-sw.svg';
import ghostIconC from '../../assets/icons/noun-ghost-sneaky-c.svg';
import ghostIconSE from '../../assets/icons/noun-ghost-sneaky-se.svg';
import ghostIconE from '../../assets/icons/noun-ghost-sneaky-e.svg';
import ghostIconW from '../../assets/icons/noun-ghost-sneaky-w.svg';
import ghostIconNW from '../../assets/icons/noun-ghost-sneaky-nw.svg';
import ghostIconNE from '../../assets/icons/noun-ghost-sneaky-ne.svg';

type LogoProps = {
    fixedLocationX?: number;
    fixedLocationY?: number;
    sizePx?: number;
};

export const Logo = (props: LogoProps) => {
    const [icon, setIcon] = useState(ghostIconSE);
    const logoRef = useRef();
    const { fixedLocationX, fixedLocationY, sizePx = 40} = props;
    let positionX = logoRef?.current?.offsetLeft;
    let positionY = logoRef?.current?.offsetTop;
    useEffect(() => {
        function handleMouseMove(e) {
            if (!positionX) {
                positionX = logoRef?.current?.offsetLeft;
                positionY = logoRef?.current?.offsetTop;
            }
            const x = e.x;
            const y = e.y;
            const leftBoundX = positionX;
            const rightBoundX = positionX + sizePx;
            const topBoundY = positionY;
            const bottomBoundY = positionY + sizePx;
            if (x < rightBoundX && y < bottomBoundY && x > leftBoundX && y > topBoundY) {
                setIcon(ghostIconC);
            } else if (x > rightBoundX && y > topBoundY && y < bottomBoundY) {
                setIcon(ghostIconE);
            } else if (x < leftBoundX && y > bottomBoundY) {
                setIcon(ghostIconSW);
            } else if (x < leftBoundX && y < topBoundY) {
                setIcon(ghostIconNW);
            } else if (x > rightBoundX && y < topBoundY) {
                setIcon(ghostIconNE);
            } else if (x < leftBoundX && y < bottomBoundY && y > topBoundY) {
                setIcon(ghostIconW);
            } else if (x > rightBoundX && y > bottomBoundY) {
                setIcon(ghostIconSE);
            }
        }
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.addEventListener('mousemove', handleMouseMove);
        }
    }, [positionX, positionY]);
    return (
        <Link href='/' _hover={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
            <Box position={fixedLocationY ? 'fixed' : 'relative'} top={fixedLocationY ? `${fixedLocationY}px` : 'unset'} left={fixedLocationX ? `${fixedLocationX}px` : 'unset'} display='flex' alignItems='center' ref={logoRef}>
                <Image src={icon} width={`${sizePx}px`} paddingRight='5px' />
            </Box>
        </Link>
    )
};
