import { useToast, Stack, Button, Box, Fade, IconButton, Popover, PopoverContent, PopoverTrigger, Table, TableContainer, Tbody, Td, Tr, useColorMode } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsVolumeUp, BsVolumeMute, BsFacebook, BsClipboard, BsClipboardCheck } from 'react-icons/bs';
import { MdOutlineLightMode, MdOutlineNightlight, MdOutlineMailOutline, MdOutlineMarkEmailRead } from 'react-icons/md';
import { RiFontSize } from 'react-icons/ri';
import { FiBarChart2, FiSave, FiPocket } from 'react-icons/fi';
import { BsInfo, BsGithub, BsTwitter } from 'react-icons/bs';
import { SiInternetarchive } from 'react-icons/si';
import { StatsType } from './EditPage';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react'
import { PublishButton } from './PublishButton';


const camelToTitleCase = (text: string) => {
    const result = text.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
};

type FloatingControlsProps = {
    postContent?: string;
    stats?: StatsType;
    show: boolean;
    soundOn?: boolean;
    setSoundOn?: (soundOn: boolean) => void;
    editMode: boolean;
};

export const FloatingControls = (props: FloatingControlsProps) => {
    const { stats, show, soundOn, postContent, setSoundOn, editMode } = props;
    const [statsBoxOpen, setStatsBoxOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [isEmailed, setIsEmailed] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const toast = useToast()
    const { isOpen: isOpenInfo, onOpen: onOpenInfo, onClose: onCloseInfo } = useDisclosure();
    const { isOpen: isOpenFont, onOpen: onOpenFont, onClose: onCloseFont } = useDisclosure();
    const { isOpen: isOpenSave, onOpen: onOpenSave, onClose: onCloseSave } = useDisclosure();
    const btnPadding = 50;
    const pageMargin = 10;
    let currBtnPageMargin = 10;

    return (
        <>
            {editMode ? <PublishButton id="publish-btn" onClick={() => {
                const encodedPost = btoa(postContent);
                window.location.search = `?post=${encodedPost}`;
            }} /> : null}

            <Fade style={{ transitionDuration: '0.4s' }} in={show}>

                {/* Dark Mode Btn */}
                <IconButton
                    _focus={{ outline: "none" }}
                    onClick={() => toggleColorMode()}
                    position='fixed'
                    // top='10px'
                    top={pageMargin + "px"}
                    // right='10px'
                    right={currBtnPageMargin + "px"}
                    aria-label='audio-toggle'
                    variant='ghost'
                    isRound={true}
                    size='lg'
                    fontSize='30px'
                    icon={colorMode === 'dark' ? <MdOutlineLightMode /> : <MdOutlineNightlight />}
                />

                {/* {editMode ? currBtnPageMargin = currBtnPageMargin + btnPadding : null} */}

                {/* Mute Btn */}
                {editMode ? <IconButton
                    _focus={{ outline: "none" }}
                    onClick={() => setSoundOn(!soundOn)}
                    position='fixed'
                    // top='10px'
                    top={pageMargin + "px"}
                    right='60px'
                    aria-label='audio-toggle'
                    variant='ghost'
                    isRound={true}
                    size='lg'
                    fontSize='30px'
                    icon={soundOn ? <BsVolumeUp /> : <BsVolumeMute />}
                /> : null}

                {/* Save Btn */}
                {!editMode ? <IconButton
                    _focus={{ outline: "none" }}
                    onClick={onOpenSave}
                    position='fixed'
                    // top='10px'
                    top={pageMargin + "px"}
                    right='60px'
                    aria-label='audio-toggle'
                    variant='ghost'
                    isRound={true}
                    size='lg'
                    fontSize='30px'
                    icon={<FiSave />}
                /> : null}

                {/* Save Modal */}
                <Modal isOpen={isOpenSave} onClose={onCloseSave} >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            Save URL
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Remember to save your URL.
                            <br></br>
                            <br></br>
                            <Stack spacing={4} direction='row' align='center'>
                                <IconButton
                                    _focus={{ outline: "none" }}
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        setIsCopied(true);
                                        toast({
                                            title: 'URL copied to clipboard.',
                                            status: 'success',
                                            duration: 2500,
                                            position: 'top',
                                            isClosable: true,
                                          })
                                    }}
                                    variant='ghost'
                                    isRound={true}
                                    size='lg'
                                    fontSize='30px'
                                    aria-label='audio-toggle'
                                    icon={ isCopied ? <BsClipboardCheck /> : <BsClipboard /> }
                                />
                                <IconButton
                                    _focus={{ outline: "none" }}
                                    onClick={() => {
                                        const url = window.location.href;
                                        window.open(`mailto:?subject=My%20Mini%20Blog&body=${url}`);
                                        setIsEmailed(true);
                                    }}
                                    variant='ghost'
                                    isRound={true}
                                    size='lg'
                                    fontSize='30px'
                                    aria-label='audio-toggle'
                                    icon={ isEmailed ? <MdOutlineMarkEmailRead /> : <MdOutlineMailOutline /> }
                                />
                                <IconButton
                                    _focus={{ outline: "none" }}
                                    onClick={() => {
                                        const url = window.location.href;
                                        window.open(`mailto:add@getpocket.com?subject=My%20Mini%20Blog&body=${url}`);
                                    }}
                                    variant='ghost'
                                    isRound={true}
                                    size='lg'
                                    fontSize='30px'
                                    aria-label='audio-toggle'
                                    icon={ <FiPocket /> }
                                />
                                <IconButton
                                    _focus={{ outline: "none" }}
                                    onClick={() => {
                                        window.open(
                                            'https://archive.org/create/',
                                            '_blank'
                                        )
                                    }}
                                    variant='ghost'
                                    isRound={true}
                                    size='lg'
                                    fontSize='30px'
                                    aria-label='audio-toggle'
                                    icon={ <SiInternetarchive /> }
                                />
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='whatsapp' onClick={onCloseSave}>
                                Done
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* Info Btn */}
                {editMode ? <IconButton
                    _focus={{ outline: "none" }}
                    onClick={onOpenInfo}
                    position='fixed'
                    // top='10px'
                    top={pageMargin + "px"}
                    right='110px'
                    aria-label='audio-toggle'
                    variant='ghost'
                    isRound={true}
                    size='lg'
                    fontSize='30px'
                    icon={<BsInfo />}
                /> : null}

                {/* Info Modal */}
                <Modal isOpen={isOpenInfo} onClose={onCloseInfo} >
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
                            <br></br>
                            <br></br>

                            <Stack spacing={4} direction='row' align='center'>
                                <Button _focus={{ outline: "none" }} colorScheme='teal' size='xs'>
                                    open-source
                                </Button>
                                <Button _focus={{ outline: "none" }} colorScheme='teal' size='xs'>
                                    serverless
                                </Button>
                                <Button _focus={{ outline: "none" }} colorScheme='teal' size='xs'>
                                    markdown-supported
                                </Button>
                            </Stack>
                            <br></br>


                            <IconButton
                                _focus={{ outline: "none" }}
                                onClick={() =>
                                    window.open(
                                        'https://github.com/guptaviha/mini-blog',
                                        '_blank'
                                    )
                                }
                                variant='ghost'
                                isRound={true}
                                size='lg'
                                fontSize='30px'
                                aria-label='audio-toggle'
                                icon={<BsGithub />}
                            />
                            <IconButton
                                _focus={{ outline: "none" }}
                                onClick={() =>
                                    window.open(
                                        'https://twitter.com/intent/tweet?text=Check%20this%20out!%20Minimalistic%20and%20quick%20blogging%20is%20here:%20miniblog.ink',
                                        '_blank'
                                    )
                                }
                                variant='ghost'
                                isRound={true}
                                size='lg'
                                fontSize='30px'
                                aria-label='audio-toggle'
                                icon={<BsTwitter />}
                            />
                            <IconButton
                                _focus={{ outline: "none" }}
                                onClick={() =>
                                    window.open(
                                        'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fminiblog.ink%2F&amp;src=sdkpreparse',
                                        '_blank'
                                    )
                                }
                                variant='ghost'
                                isRound={true}
                                size='lg'
                                fontSize='30px'
                                aria-label='audio-toggle'
                                icon={<BsFacebook />}
                            />
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='whatsapp' onClick={onCloseInfo}>
                                Got it!
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* Font Btn */}
                {editMode ? <IconButton
                    _focus={{ outline: "none" }}
                    onClick={onOpenFont}
                    position='fixed'
                    // top='10px'
                    top={pageMargin + "px"}
                    right='160px'
                    aria-label='audio-toggle'
                    variant='ghost'
                    isRound={true}
                    size='lg'
                    fontSize='30px'
                    icon={<RiFontSize />}
                /> : null}

                {/* Font Modal */}
                <Modal isOpen={isOpenFont} onClose={onCloseFont} >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            Font Settings
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>

                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='whatsapp' onClick={onCloseInfo}>
                                Apply
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* Stats Btn */}
                {editMode ? <Popover>
                    <PopoverTrigger>
                        <IconButton
                            _focus={{ outline: "none" }}
                            onClick={() => setStatsBoxOpen(!statsBoxOpen)}
                            position='fixed'
                            // bottom='10px'
                            bottom={pageMargin + "px"}
                            // left='10px'
                            left={pageMargin + "px"}
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
                </Popover> : null}

            </Fade>
        </>
    )
};
