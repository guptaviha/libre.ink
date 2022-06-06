import { Button, ButtonProps, IconButton, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import { FiEdit2 } from 'react-icons/fi';

export const PublishButton = (props: ButtonProps) => {
    return (
        <Popover trigger='hover' placement='left'>
            <PopoverContent w='125px' position='absolute' right='-45px' bg='#009900' padding='2px' paddingRight='35px' bottom='-23px'>
                <Button fontSize='20px' variant='unstyled' onClick={props.onClick}>Publish</Button>
            </PopoverContent>
            <PopoverTrigger>
                <IconButton icon={<FiEdit2 />} onClick={props.onClick} isRound position='absolute' bottom='10px' right='10px' aria-label='publish' variant='unstyled' zIndex='10' size='lg' fontSize='30px' />
            </PopoverTrigger>
        </Popover>);
};