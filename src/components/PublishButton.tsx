import { Button, ButtonProps } from '@chakra-ui/react';
import { BsFileText } from 'react-icons/bs';

export const PublishButton = (props: ButtonProps) => {
    return (
        <>
            <Button
                rightIcon={<BsFileText />}
                w='120px' position='fixed' right='20px' padding='0px' paddingRight='0px' bottom='10px'
                colorScheme='whatsapp'
                fontSize='20px'
                variant='ghost'
                // _hover={{ background: "unset" }} 
                _active={{ background: "unset", outline: "none" }}
                _focus={{ outline: "none" }}
                onClick={props.onClick}>
                Publish
            </Button>
        </>
    )
};
