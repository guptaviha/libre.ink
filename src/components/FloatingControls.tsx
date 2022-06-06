import { Button, Box, Fade, IconButton, Popover, PopoverContent, PopoverTrigger, Table, TableContainer, Tbody, Td, Tr, useColorMode } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsVolumeUp, BsVolumeMute } from 'react-icons/bs';
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';
import { FiBarChart2 } from 'react-icons/fi';
import { BsInfo } from 'react-icons/bs';
import { StatsType } from './EditPage';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

const camelToTitleCase = (text: string) => {
    const result = text.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
};

type FloatingControlsProps = {
    stats: StatsType;
    show: boolean;
    soundOn: boolean;
    setSoundOn: (soundOn: boolean) => void;
};

export const FloatingControls = (props: FloatingControlsProps) => {
    const { stats, show, soundOn, setSoundOn } = props;
    const [statsBoxOpen, setStatsBoxOpen] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Fade style={{ transitionDuration: '0.4s' }} in={show}>
            <IconButton
                _focus={{ outline: "none" }}
                onClick={() => setSoundOn(!soundOn)}
                position='absolute'
                top='10px'
                right='10px'
                aria-label='audio-toggle'
                variant='ghost'
                isRound={true}
                size='lg'
                fontSize='30px'
                icon={soundOn ? <BsVolumeUp /> : <BsVolumeMute />}
            />
            <IconButton
                _focus={{ outline: "none" }}
                onClick={() => toggleColorMode()}
                position='absolute'
                top='10px'
                right='60px'
                aria-label='audio-toggle'
                variant='ghost'
                isRound={true}
                size='lg'
                fontSize='30px'
                icon={colorMode === 'dark' ? <MdOutlineLightMode /> : <MdOutlineNightlight />}
            />
            <IconButton
                _focus={{ outline: "none" }}
                onClick={onOpen}
                position='absolute'
                top='10px'
                right='110px'
                aria-label='audio-toggle'
                variant='ghost'
                isRound={true}
                size='lg'
                fontSize='30px'
                icon={<BsInfo />}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                    Welcome to mini-blog!
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        The serverless instant-publish blog platform that lets you publish as fast as you can write.
                        <br></br>
                        <br></br>
                        <b>Remember to save your blog URL</b> because all the content of your blog post lives in the URL. The application does not talk to a database or server of any kind.
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Got it!
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Popover>
                <PopoverTrigger>
                    <IconButton
                        _focus={{ outline: "none" }}
                        onClick={() => setStatsBoxOpen(!statsBoxOpen)}
                        position='absolute'
                        bottom='10px'
                        left='10px'
                        aria-label='stats-count'
                        variant='ghost'
                        size='lg'
                        fontSize='30px'
                        isRound={true}
                        icon={<FiBarChart2 />}
                    />
                </PopoverTrigger>
                <PopoverContent left='10px' _focus={{ outline: "none" }}>
                    <Box>
                        <TableContainer>
                            <Table variant='unstyled'>
                                <Tbody>
                                    {Object.keys(stats).map((statKey) => (
                                        <Tr key={statKey}>
                                            <Td>{camelToTitleCase(statKey)}</Td>
                                            <Td>{stats[statKey]}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                </PopoverContent>
            </Popover>
        </Fade>
    )
};
