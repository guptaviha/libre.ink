import { Link, Tooltip, Heading, PopoverHeader, PopoverArrow, PopoverBody, PopoverFooter, PopoverCloseButton, ButtonGroup, FormControl, FormLabel, Switch, useToast, Stack, Button, Box, Fade, IconButton, Popover, PopoverContent, PopoverTrigger, Table, TableContainer, Tbody, Td, Tr, useColorMode, Slider, SliderMark, SliderFilledTrack, SliderThumb, SliderTrack, Text, Center, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { BsVolumeUp, BsVolumeMute, BsClipboard, BsClipboardCheck } from 'react-icons/bs';
import { MdOutlineLightMode, MdOutlineNightlight, MdOutlineMailOutline, MdOutlineMarkEmailRead } from 'react-icons/md';
import { RiFontSize } from 'react-icons/ri';
import { FiBarChart2 } from 'react-icons/fi';
import { IoShareOutline } from 'react-icons/io5';
import { RiLinkUnlinkM } from 'react-icons/ri';
import { BsQuestion, BsGithub } from 'react-icons/bs';
import { StatsType } from './EditPage';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react'
import { PublishButton } from './PublishButton';
import { GiBoba } from 'react-icons/gi';
import GitHubButton from 'react-github-btn'
import Typewriter from 'typewriter-effect';

import {
    APP_TITLE, BOBA_HEADER_TEXT, BOBA_BODY_TEXT, BOBA_BTN_TEXT, GITHUB_STAR_BTN_TEXT, INFO_MODAL_HEADER_TEXT, INFO_MODAL_BODY_TEXT, TAG1_TEXT, TAG2_TEXT, TAG3_TEXT,
    FONT_HEADER_TEXT, FONT_SIZE_LABEL_TEXT, MD_TOOLBAR_LABEL_TEXT, SHARE_HEADER_TEXT, SHARE_FOOTER_TEXT, CLIPBOARD_TOOLTIP,
    GITHUB_LINK, BUY_ME_A_BOBA_LINK, APP_TITLE_TOOLTIP, EMAIL_TOOLTIP, TINY_URL_LINK, TINY_URL_TOOLTIP,
    CLIPBOARD_TOAST_TEXT, MUTE_BTN_ON_TOOLTIP, MUTE_BTN_OFF_TOOLTIP, DARK_MODE_BTN_ON_TOOLTIP, DARK_MODE_BTN_OFF_TOOLTIP, TINY_URL_TOAST_TEXT,
    INFO_MODAL_FAQ_HEAD1, INFO_MODAL_FAQ_BODY1, INFO_MODAL_FAQ_HEAD2, INFO_MODAL_FAQ_BODY2, INFO_MODAL_FAQ_HEAD3, INFO_MODAL_FAQ_BODY3, INFO_MODAL_DISCL_TEXT
} from '../constants';
import { Logo } from './Logo';
import { createPostObject, encode } from '../common';

const camelToTitleCase = (text: string) => {
    const result = text.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
};

const fontOptions = [{
    fontName: 'Helvetica',
}, {
    fontName: 'Monospace',
}, {
    fontName: 'Times New Roman',
}, {
    fontName: 'Cursive'
}];

type FloatingControlsProps = {
    postContent?: string;
    stats?: StatsType;
    show: boolean;
    soundOn?: boolean;
    setSoundOn?: (soundOn: boolean) => void;
    fontSize?: number;
    setFontSize?: (fontSize: number) => void;
    displayMode: 'edit' | 'view' | 'landing';
    hideMdToolbar?: boolean;
    setHideMdToolbar?: (hideMdToolbar: boolean) => void;
};

export const FloatingControls = (props: FloatingControlsProps) => {
    const { stats, show, soundOn, postContent = '', setSoundOn, displayMode, hideMdToolbar, setHideMdToolbar, fontSize, setFontSize } = props;
    const [isCopied, setIsCopied] = useState(false);
    const [isEmailed, setIsEmailed] = useState(false);
    const [typewriterTimedout, setTypewriterTimedout] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const toast = useToast()
    const { isOpen: isOpenInfo, onOpen: onOpenInfo, onClose: onCloseInfo } = useDisclosure();
    const { isOpen: isOpenFont, onOpen: onOpenFont, onClose: onCloseFont } = useDisclosure();
    const { isOpen: isOpenSave, onOpen: onOpenSave, onClose: onCloseSave } = useDisclosure();

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => setTypewriterTimedout(true), 2200);
    }, []);

    return (
        <>
            {/* Publish button */}
            {displayMode === 'edit' ? <PublishButton id="publish-btn" onClick={() => {
                localStorage.setItem('storedPost', postContent);
                const postObject = createPostObject(postContent, String(fontSize));
                const encodedPostObject = encode(JSON.stringify(postObject));
                if (encodedPostObject.length >= 15000) {
                    toast({
                        title: `Oh no, your post is too long! The max URL length is 15000 but yours is ${encodedPostObject.length}. Please shorten your post and try again.`,
                        status: 'error',
                        duration: 15000,
                        position: 'top',
                        isClosable: true,
                    });
                } else {
                    // navigate(`?post=${encodedPostObject}`);
                    window.location.search = `?post=${encodedPostObject}`;
                }
            }} /> : null}

            {/* Boba button */}
            {displayMode === 'view' ?
                <Popover>
                    <PopoverTrigger>
                        <IconButton
                            name="luminous-boba"
                            className='luminous-boba'
                            _focus={{ outline: "none" }}
                            position='fixed'
                            bottom='10px'
                            left='10px'
                            aria-label='luminous-boba'
                            variant='ghost'
                            fontSize='30px'
                            isRound={true}
                            icon={<GiBoba />}
                        />
                    </PopoverTrigger>
                    <PopoverContent left='10px' _focus={{ outline: "none" }}>
                        <PopoverHeader pt={4} fontWeight="bold" border="0">
                            {BOBA_HEADER_TEXT}
                        </PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                            {BOBA_BODY_TEXT}

                        </PopoverBody>
                        <PopoverFooter
                            border="0"
                            d="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            pb={4}
                        >
                            <ButtonGroup size="sm">
                                <Link href={BUY_ME_A_BOBA_LINK} isExternal>
                                    <Button
                                        size="sm"
                                        fontSize="12.5px"
                                        colorScheme="green"
                                    >
                                        {BOBA_BTN_TEXT}
                                    </Button>
                                </Link>
                                <GitHubButton href={GITHUB_LINK} data-show-count="true" data-size="large">
                                    {GITHUB_STAR_BTN_TEXT}
                                </GitHubButton>
                            </ButtonGroup>
                        </PopoverFooter>
                    </PopoverContent>
                </Popover>
                : null}

            {(displayMode === 'edit' || displayMode === 'landing') ? <Logo fixedLocationX={10} fixedLocationY={18} /> : null}

            <Fade style={{ transitionDuration: '0.4s' }} in={show}>
                {(displayMode === 'edit' || displayMode === 'landing') ? <RouterLink to='/'>
                    <Box position='fixed' top='18px' left='10px' display='flex' alignItems='center'>
                        <Heading pl={10} pt={1} size={{ base: 'lg', sm: 'md', md: 'md', lg: 'md' }} fontFamily='monospace' title={APP_TITLE_TOOLTIP}>
                            {!typewriterTimedout ? <Typewriter
                                options={{
                                    strings: [APP_TITLE],
                                    autoStart: true,
                                    loop: false,
                                    pauseFor: 90000000,
                                    cursor: ''
                                }}
                            /> : <div>{APP_TITLE}</div>}
                        </Heading>
                    </Box>
                </RouterLink> : null}

                {/* Toolbar Buttons */}
                <Box display='flex' gap={{ base: '1px', md: '4px', sm: '1px' }} position='fixed' top='14px' right='10px'>

                    {/* Mute Btn */}
                    {displayMode === 'edit' ?
                        <>
                            <Tooltip label={soundOn === true ? MUTE_BTN_ON_TOOLTIP : MUTE_BTN_OFF_TOOLTIP} hasArrow openDelay={1000}>
                                <IconButton
                                    _focus={{ outline: "none" }}
                                    onClick={() => setSoundOn(!soundOn)}
                                    aria-label='audio-toggle'
                                    variant='ghost'
                                    isRound={true}
                                    fontSize='30px'
                                    icon={soundOn ? <BsVolumeUp /> : <BsVolumeMute />}
                                />
                            </Tooltip>
                        </>
                        : null}


                    {/* Share Btn */}
                    {displayMode === 'view' ?
                        <>
                            <IconButton
                                _focus={{ outline: "none" }}
                                onClick={onOpenSave}
                                aria-label='audio-toggle'
                                variant='ghost'
                                isRound={true}
                                fontSize='30px'
                                icon={<IoShareOutline />}
                            />
                        </>
                        : null}

                    {/* Font Btn */}
                    {displayMode === 'edit' ? <IconButton
                        _focus={{ outline: "none" }}
                        onClick={onOpenFont}
                        aria-label='audio-toggle'
                        variant='ghost'
                        isRound={true}
                        fontSize='30px'
                        icon={<RiFontSize />}
                    /> : null}

                    {/* Info Btn */}
                    {displayMode === 'edit' || displayMode === 'view' || displayMode === 'landing' ? <IconButton
                        _focus={{ outline: "none" }}
                        onClick={onOpenInfo}
                        aria-label='info-toggle'
                        variant='ghost'
                        isRound={true}
                        fontSize='36px'
                        icon={<BsQuestion />}
                    /> : null}

                    {/* Dark Mode Btn */}
                    <Tooltip label={colorMode === 'dark' ? DARK_MODE_BTN_OFF_TOOLTIP : DARK_MODE_BTN_ON_TOOLTIP} hasArrow openDelay={1000}>
                        <IconButton
                            _focus={{ outline: "none" }}
                            onClick={() => toggleColorMode()}
                            aria-label='audio-toggle'
                            variant='ghost'
                            isRound={true}
                            fontSize='30px'
                            icon={colorMode === 'dark' ? <MdOutlineLightMode /> : <MdOutlineNightlight />}
                        />
                    </Tooltip>

                </Box>

                {/* Share Modal */}
                <Modal isOpen={isOpenSave} onClose={onCloseSave}>
                    <ModalOverlay
                        bg='blackAlpha.300'
                        backdropFilter='blur(10px)'
                    />
                    <ModalContent>
                        <ModalHeader>
                            {SHARE_HEADER_TEXT}
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={6} direction='row' align='center'>
                                <Tooltip label={CLIPBOARD_TOOLTIP} hasArrow>
                                    <IconButton
                                        _focus={{ outline: "none" }}
                                        onClick={() => {
                                            navigator.clipboard.writeText(window.location.href);
                                            setIsCopied(true);
                                            toast({
                                                title: CLIPBOARD_TOAST_TEXT,
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
                                </Tooltip>
                                <Tooltip label={TINY_URL_TOOLTIP} hasArrow>
                                    <IconButton
                                        _focus={{ outline: "none" }}
                                        onClick={() => {
                                            navigator.clipboard.writeText(window.location.href);

                                            toast({
                                                title: TINY_URL_TOAST_TEXT,
                                                status: 'success',
                                                duration: 2500,
                                                position: 'top',
                                                isClosable: true,
                                            })

                                            setTimeout(() => {
                                                window.open(
                                                    TINY_URL_LINK,
                                                    '_blank'
                                                )
                                            },
                                                2800)

                                        }}
                                        variant='ghost'
                                        isRound={true}
                                        size='lg'
                                        fontSize='30px'
                                        aria-label='url-shorten'
                                        icon={<RiLinkUnlinkM />}
                                    />
                                </Tooltip>
                                <Tooltip label={EMAIL_TOOLTIP} hasArrow>
                                    <IconButton
                                        _focus={{ outline: "none" }}
                                        onClick={() => {
                                            const url = window.location.href;
                                            const title = document.title;
                                            window.open(`mailto:?subject=${title}&body=${url}`);
                                            setIsEmailed(true);
                                        }}
                                        variant='ghost'
                                        isRound={true}
                                        size='lg'
                                        fontSize='30px'
                                        aria-label='audio-toggle'
                                        icon={isEmailed ? <MdOutlineMarkEmailRead /> : <MdOutlineMailOutline />}
                                    />
                                </Tooltip>

                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            {SHARE_FOOTER_TEXT}
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* Info Modal */}
                <Modal isOpen={isOpenInfo} onClose={onCloseInfo} size='xl' >
                    <ModalOverlay
                        bg='blackAlpha.300'
                        backdropFilter='blur(10px)'
                    />
                    <ModalContent>
                        <ModalHeader>
                            {INFO_MODAL_HEADER_TEXT}
                        </ModalHeader>
                        <ModalCloseButton _focus={{ outline: "none" }} />
                        <ModalBody>
                            {INFO_MODAL_BODY_TEXT}
                            <br />
                            <Accordion allowToggle>
                                <AccordionItem>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            <h3 style={{ fontWeight: 'bold' }}>
                                                {INFO_MODAL_FAQ_HEAD1}
                                            </h3>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    <AccordionPanel pb={4}>
                                        {INFO_MODAL_FAQ_BODY1}
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            <h3 style={{ fontWeight: 'bold' }}>
                                                {INFO_MODAL_FAQ_HEAD2}
                                            </h3>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    <AccordionPanel pb={4}>
                                        {INFO_MODAL_FAQ_BODY2}
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            <h3 style={{ fontWeight: 'bold' }}>
                                                {INFO_MODAL_FAQ_HEAD3}
                                            </h3>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    <AccordionPanel pb={4}>
                                        <Text>
                                            {INFO_MODAL_FAQ_BODY3}
                                        </Text>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                            <br></br>
                            <Center>
                                <Stack spacing={4} direction='row' align='center'>
                                    <Button _focus={{ outline: "none" }} colorScheme='teal' size='xs'>
                                        {TAG1_TEXT}
                                    </Button>
                                    <Button _focus={{ outline: "none" }} colorScheme='teal' size='xs'>
                                        {TAG2_TEXT}
                                    </Button>
                                    <Button _focus={{ outline: "none" }} colorScheme='teal' size='xs'>
                                        {TAG3_TEXT}
                                    </Button>
                                </Stack>
                            </Center>

                            <br />

                            <Text fontSize='md'>
                                {INFO_MODAL_DISCL_TEXT}
                            </Text>

                            <br />

                            <Center>
                                <Text>Check out the source code on
                                    <Link href={GITHUB_LINK} isExternal>
                                        <IconButton
                                            _focus={{ outline: "none" }}
                                            variant='ghost'
                                            isRound={true}
                                            size='lg'
                                            fontSize='30px'
                                            aria-label='audio-toggle'
                                            icon={<BsGithub />}
                                        />
                                    </Link>
                                </Text>
                            </Center>

                            {/* <br /> */}

                            <Center>
                                <Text>
                                    Made with 🎧, 🦄 and 🌈 by <Link isExternal href='https://twitter.com/veehaaaaa'>@veehaaaaa</Link> and <Link isExternal href='https://twitter.com/karanrajpal_'>@karanrajpal_</Link>
                                </Text>
                            </Center>

                            <br /><br />


                        </ModalBody>
                    </ModalContent>
                </Modal>

                {/* Edit Btn */}
                {/* {displayMode === 'view' ? <IconButton
                    _focus={{ outline: "none" }}
                    onClick={() => {
                        localStorage.setItem('storedPost', postContent);
                        window.location.href = '/';
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
                /> : null} */}

                {/* Font Modal */}
                <Modal isOpen={isOpenFont} onClose={onCloseFont} >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            {FONT_HEADER_TEXT}
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <Box padding='14px 0'>
                                    <FormLabel as='h3' fontWeight='bold' htmlFor='font-size'>{FONT_SIZE_LABEL_TEXT}</FormLabel>
                                    <Slider id='font-size' aria-label='slider-ex-6' defaultValue={fontSize} step={2} min={14} max={22} onChange={(val) => setFontSize(val)} marginBottom='35px'>
                                        <SliderMark
                                            value={fontSize}
                                            textAlign='center'
                                            bg='blue.500'
                                            color='white'
                                            mt='4'
                                            ml='-4'
                                            w='8'
                                        >
                                            {fontSize}
                                        </SliderMark>
                                        <SliderTrack>
                                            <SliderFilledTrack />
                                        </SliderTrack>
                                        <SliderThumb />
                                    </Slider>
                                </Box>
                                {/* {displayMode === 'edit' ? <Box>
                                    <FormLabel as='h3' fontWeight='bold'>{FONT_OPTIONS_LABEL_TEXT}</FormLabel>
                                    <Box display='flex' justifyContent='space-between' flexWrap='wrap'>
                                        {fontOptions.map((font) => (
                                            <Button
                                                key={font.fontName}
                                                borderRadius='2px'
                                                width='48%'
                                                padding='15px'
                                                textAlign='center'
                                                marginBottom='10px'
                                                background={colorMode === 'dark' ? 'darkslategray' : 'lavenderblush'}
                                                className={`font-${font.fontName}`}
                                                fontFamily={font.fontName}
                                                fontWeight='normal'
                                                // onClick={setFontFamily}
                                            >
                                                {font.fontName}
                                            </Button>
                                        ))}
                                    </Box>
                                </Box> : null} */}
                                {displayMode === 'edit' ? <Box display='flex' alignItems='center' margin='20px 0'>
                                    <FormLabel htmlFor='markdown-toolbar' mb='0'>
                                        {MD_TOOLBAR_LABEL_TEXT}
                                    </FormLabel>
                                    <Switch id='markdown-toolbar'
                                        defaultChecked={hideMdToolbar ? false : true}
                                        onChange={() => {
                                            setHideMdToolbar(!hideMdToolbar)
                                            console.log(hideMdToolbar)
                                        }} />
                                </Box> : null}
                            </FormControl>
                        </ModalBody>
                    </ModalContent>
                </Modal>

                {/* Stats Btn */}
                {displayMode === 'edit' ? <Popover>
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
