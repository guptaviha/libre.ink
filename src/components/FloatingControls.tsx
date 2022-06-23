import { PopoverHeader, PopoverArrow, PopoverBody, PopoverFooter, PopoverCloseButton, ButtonGroup, FormControl, FormLabel, Switch, useToast, Stack, Button, Box, Fade, IconButton, Popover, PopoverContent, PopoverTrigger, Table, TableContainer, Tbody, Td, Tr, useColorMode, Heading, Link } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsVolumeUp, BsVolumeMute, BsFacebook, BsClipboard, BsClipboardCheck } from 'react-icons/bs';
import { MdOutlineLightMode, MdOutlineNightlight, MdOutlineMailOutline, MdOutlineMarkEmailRead } from 'react-icons/md';
import { RiFontSize } from 'react-icons/ri';
import { FiBarChart2, FiPocket, FiEdit2 } from 'react-icons/fi';
import { AiOutlineSave } from 'react-icons/ai';
import { BsInfo, BsGithub, BsTwitter } from 'react-icons/bs';
import { StatsType } from './EditPage';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react'
import { PublishButton } from './PublishButton';
import Typewriter from 'typewriter-effect';
import { APP_TITLE } from '../constants';
import { GiBoba } from 'react-icons/gi';
import GitHubButton from 'react-github-btn'


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
    hideMdToolbar?: boolean;
    setHideMdToolbar?: (hideMdToolbar: boolean) => void;
};

export const FloatingControls = (props: FloatingControlsProps) => {
    const { stats, show, soundOn, postContent, setSoundOn, editMode, hideMdToolbar, setHideMdToolbar } = props;
    const [isCopied, setIsCopied] = useState(false);
    const [isEmailed, setIsEmailed] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const toast = useToast()
    const { isOpen: isOpenInfo, onOpen: onOpenInfo, onClose: onCloseInfo } = useDisclosure();
    const { isOpen: isOpenFont, onOpen: onOpenFont, onClose: onCloseFont } = useDisclosure();
    const { isOpen: isOpenSave, onOpen: onOpenSave, onClose: onCloseSave } = useDisclosure();


    return (
        <>
            {editMode ? <PublishButton id="publish-btn" onClick={() => {
                const encodedPost = btoa(encodeURIComponent(postContent));
                localStorage.setItem('storedPost', postContent);
                window.location.search = `?post=${encodedPost}`;
            }} /> : null}

            {!editMode ?
                <Popover>
                    <PopoverTrigger>
                        <IconButton
                            _focus={{ outline: "none" }}
                            position='fixed'
                            bottom='10px'
                            left='10px'
                            aria-label='stats-count'
                            variant='ghost'
                            fontSize='30px'
                            isRound={true}
                            icon={<GiBoba />}
                        />
                    </PopoverTrigger>
                    <PopoverContent left='10px' _focus={{ outline: "none" }}>
                        <PopoverHeader pt={4} fontWeight="bold" border="0">
                            Help keep the lights on
                        </PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                            If you like what you see, consider supporting us.

                        </PopoverBody>
                        <PopoverFooter
                            border="0"
                            d="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            pb={4}
                        >
                            <ButtonGroup size="sm">
                                <Button
                                    size="sm"
                                    fontSize="12.5px"
                                    colorScheme="green"
                                    onClick={() =>
                                        window.open(
                                            'https://www.buymeacoffee.com/vihagupta99',
                                            '_blank'
                                        )
                                    }
                                >Buy us a Boba</Button>
                                <GitHubButton href="https://github.com/guptaviha/libre.ink" data-show-count="true" data-size="large">
                                    Star us on GitHub
                                </GitHubButton>

                            </ButtonGroup>
                        </PopoverFooter>
                    </PopoverContent>
                </Popover>
                : null}

            <Fade style={{ transitionDuration: '0.4s' }} in={show}>

                <Link href='/' _hover={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
                    <Heading size={{ base: 'lg', sm: 'md', md: 'md', lg: 'md' }} fontFamily='monospace' position='fixed' top='24px' left='24px' title='Your favorite anonymous publishing platform'>
                        <Typewriter
                            options={{
                                strings: [APP_TITLE],
                                autoStart: true,
                                loop: false,
                                pauseFor: 90000000,
                            }}

                        />
                    </Heading>
                </Link>

                {/* Dark Mode Btn */}
                <IconButton
                    _focus={{ outline: "none" }}
                    onClick={() => toggleColorMode()}
                    position='fixed'
                    // top={{ base: '16px', sm: '10px' }}
                    // right={{ base: '16px', sm: '10px' }}
                    top='12px'
                    right={{ base: '10px', sm: '10px' }}
                    aria-label='audio-toggle'
                    variant='ghost'
                    isRound={true}
                    // size={{ base: 'md', sm: 'lg' }}
                    // fontSize={{ base: '20px', sm: '30px' }}
                    // size='lg'
                    fontSize='30px'
                    icon={colorMode === 'dark' ? <MdOutlineLightMode /> : <MdOutlineNightlight />}
                />


                {/* Mute Btn */}
                {editMode ? <IconButton
                    _focus={{ outline: "none" }}
                    onClick={() => setSoundOn(!soundOn)}
                    position='fixed'
                    top='12px'
                    right={{ base: '54px', sm: '60px' }}
                    aria-label='audio-toggle'
                    variant='ghost'
                    isRound={true}
                    // size='lg'
                    fontSize='30px'
                    icon={soundOn ? <BsVolumeUp /> : <BsVolumeMute />}
                /> : null}

                {/* Save Btn */}
                {!editMode ? <IconButton
                    _focus={{ outline: "none" }}
                    onClick={onOpenSave}
                    position='fixed'
                    top='12px'
                    right={{ base: '50px', sm: '60px' }}
                    aria-label='audio-toggle'
                    variant='ghost'
                    isRound={true}
                    // size='lg'
                    fontSize='30px'
                    icon={<AiOutlineSave />}
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
                                    icon={isCopied ? <BsClipboardCheck /> : <BsClipboard />}
                                />
                                <IconButton
                                    _focus={{ outline: "none" }}
                                    onClick={() => {
                                        const url = window.location.href;
                                        window.open(`mailto:?subject=My%20MLibre%20Ink&body=${url}`);
                                        setIsEmailed(true);
                                    }}
                                    variant='ghost'
                                    isRound={true}
                                    size='lg'
                                    fontSize='30px'
                                    aria-label='audio-toggle'
                                    icon={isEmailed ? <MdOutlineMarkEmailRead /> : <MdOutlineMailOutline />}
                                />
                                <IconButton
                                    _focus={{ outline: "none" }}
                                    onClick={() => {
                                        const url = window.location.href;
                                        window.open(`mailto:add@getpocket.com?subject=My%20Libre%20Ink&body=${url}`);
                                    }}
                                    variant='ghost'
                                    isRound={true}
                                    size='lg'
                                    fontSize='30px'
                                    aria-label='audio-toggle'
                                    icon={<FiPocket />}
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
                    top='12px'
                    right={{ base: '90px', sm: '110px' }}
                    aria-label='audio-toggle'
                    variant='ghost'
                    isRound={true}
                    // size='lg'
                    fontSize='30px'
                    icon={<BsInfo />}
                /> : null}

                {/* Info Modal */}
                <Modal isOpen={isOpenInfo} onClose={onCloseInfo} >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            Welcome to libre.ink!
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
                                        'https://github.com/guptaviha/libre.ink',
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
                                        'https://twitter.com/intent/tweet?text=Check%20this%20out!%20Minimalistic%20and%20quick%20blogging%20is%20here:%20libre.ink',
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
                                        'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flibre.ink%2F&amp;src=sdkpreparse',
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

                {/* Edit Btn */}
                {!editMode ? <IconButton
                    _focus={{ outline: "none" }}
                    onClick={() => {
                        window.location.href = '/'
                    }}
                    position='fixed'
                    top='12px'
                    right={{ base: '90px', sm: '110px' }}
                    aria-label='audio-toggle'
                    variant='ghost'
                    isRound={true}
                    // size='lg'
                    fontSize='30px'
                    icon={<FiEdit2 />}
                /> : null}

                {/* Font Btn */}
                {editMode ? <IconButton
                    _focus={{ outline: "none" }}
                    onClick={onOpenFont}
                    position='fixed'
                    top='12px'
                    right={{ base: '130px', sm: '160px' }}
                    aria-label='audio-toggle'
                    variant='ghost'
                    isRound={true}
                    // size='lg'
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
                            <FormControl display='flex' alignItems='center'>
                                <FormLabel htmlFor='markdown-toolbar' mb='0'>
                                    Show Markdown Toolbar
                                </FormLabel>
                                <Switch id='markdown-toolbar'
                                    defaultChecked={hideMdToolbar ? false : true}
                                    onChange={() => {
                                        setHideMdToolbar(!hideMdToolbar)
                                        console.log(hideMdToolbar)

                                    }} />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='whatsapp' onClick={onCloseFont}>
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
                            position='fixed'
                            bottom='10px'
                            left='10px'
                            aria-label='stats-count'
                            variant='ghost'
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
