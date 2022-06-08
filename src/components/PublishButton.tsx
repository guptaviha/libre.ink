import { Button, ButtonProps, IconButton, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
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


        // <Popover trigger='hover' placement='left'>
        //     <PopoverContent w='130px' position='fixed' right='-55px' padding='2px' paddingRight='35px' bottom='-23px'>
        //         <Button 
        //         colorScheme='whatsapp' 
        //         fontSize='20px' 
        //         variant='ghost' 
        //         _hover={{ background: "unset" }} 
        //         _active={{ background: "unset", outline: "none" }} 
        //         _focus={{ outline: "none" }} 
        //         onClick={props.onClick}>
        //             Publish
        //         </Button>
        //     </PopoverContent>
        //     <PopoverTrigger>
        //         <IconButton 
        //         colorScheme='whatsapp' 
        //         icon={<BsFileText />} 
        //         onClick={props.onClick} 
        //         isRound 
        //         position='absolute' 
        //         bottom='10px' right='10px' 
        //         aria-label='publish' 
        //         variant='ghost' 
        //         zIndex='10' size='lg' fontSize='30px' 
        //         _hover={{ background: "unset" }} 
        //         _active={{ background: "unset", outline: "none" }} 
        //         _focus={{ outline: "none" }} 
        //     />
        //     </PopoverTrigger>
        // </Popover>);
    )
};