import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { BsFileText } from 'react-icons/bs';
import { PUBLISH_BTN_TEXT } from '../constants';

export const PublishButton = (props: ButtonProps) => {
    return (
        <>
            <Button
                rightIcon={<BsFileText />}
                w='120px' 
                position='fixed' 
                right='20px' 
                padding='0px' 
                paddingRight='0px' 
                bottom='10px'
                colorScheme='whatsapp'
                fontSize='20px'
                variant='ghost'
                _active={{ background: "unset", outline: "none" }}
                _focus={{ outline: "none" }}
                onClick={props.onClick}
            >
                {PUBLISH_BTN_TEXT}
            </Button>
        </>
    )
};
