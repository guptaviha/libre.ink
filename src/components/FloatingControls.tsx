import { Link, Tooltip, Heading, PopoverHeader, PopoverArrow, PopoverBody, PopoverFooter, PopoverCloseButton, ButtonGroup, FormControl, FormLabel, Switch, useToast, Stack, Button, Box, Fade, IconButton, Popover, PopoverContent, PopoverTrigger, Table, TableContainer, Tbody, Td, Tr, useColorMode, Slider, SliderMark, SliderFilledTrack, SliderThumb, SliderTrack, WrapItem, LinkOverlay, Text, Center, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsVolumeUp, BsVolumeMute, BsFacebook, BsClipboard, BsClipboardCheck } from 'react-icons/bs';
import { MdOutlineLightMode, MdOutlineNightlight, MdOutlineMailOutline, MdOutlineMarkEmailRead } from 'react-icons/md';
import { RiFontSize } from 'react-icons/ri';
import { FiBarChart2 } from 'react-icons/fi';
import { IoShareOutline } from 'react-icons/io5';
import { RiLinkUnlinkM } from 'react-icons/ri';
import { BsQuestion, BsGithub, BsTwitter } from 'react-icons/bs';
import { StatsType } from './EditPage';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react'
import { PublishButton } from './PublishButton';
import { GiBoba } from 'react-icons/gi';
import GitHubButton from 'react-github-btn'
import Typewriter from 'typewriter-effect';
import { setTitle } from '../common';

import {
    APP_TITLE, BOBA_HEADER_TEXT, BOBA_BODY_TEXT, BOBA_BTN_TEXT, GITHUB_STAR_BTN_TEXT, INFO_MODAL_HEADER_TEXT, INFO_MODAL_BODY_TEXT, TAG1_TEXT, TAG2_TEXT, TAG3_TEXT,
    FONT_HEADER_TEXT, FONT_SIZE_LABEL_TEXT, MD_TOOLBAR_LABEL_TEXT, SHARE_HEADER_TEXT, SHARE_FOOTER_TEXT, CLIPBOARD_TOOLTIP, INFO_BTN_TOOLTIP, FONT_BTN_TOOLTIP,
    SHARE_BTN_TOOLTIP, GITHUB_LINK, BUY_ME_A_BOBA_LINK, APP_TITLE_TOOLTIP, TWITTER_SHARE_LINK, FB_SHARE_LINK, EMAIL_TOOLTIP, TINY_URL_LINK, TINY_URL_TOOLTIP,
    CLIPBOARD_TOAST_TEXT, MUTE_BTN_ON_TOOLTIP, MUTE_BTN_OFF_TOOLTIP, DARK_MODE_BTN_ON_TOOLTIP, DARK_MODE_BTN_OFF_TOOLTIP, FONT_OPTIONS_LABEL_TEXT, TINY_URL_TOAST_TEXT
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

function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
}

type FloatingControlsProps = {
    postContent: string;
    stats?: StatsType;
    show: boolean;
    soundOn?: boolean;
    setSoundOn?: (soundOn: boolean) => void;
    fontSize: number;
    setFontSize: (fontSize: number) => void;
    editMode: boolean;
    hideMdToolbar?: boolean;
    setHideMdToolbar?: (hideMdToolbar: boolean) => void;
};

export const FloatingControls = (props: FloatingControlsProps) => {
    const { stats, show, soundOn, postContent, setSoundOn, editMode, hideMdToolbar, setHideMdToolbar, fontSize, setFontSize } = props;
    const [isCopied, setIsCopied] = useState(false);
    const [isEmailed, setIsEmailed] = useState(false);
    const [typewriterTimedout, setTypewriterTimedout] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const toast = useToast()
    const { isOpen: isOpenInfo, onOpen: onOpenInfo, onClose: onCloseInfo } = useDisclosure();
    const { isOpen: isOpenFont, onOpen: onOpenFont, onClose: onCloseFont } = useDisclosure();
    const { isOpen: isOpenSave, onOpen: onOpenSave, onClose: onCloseSave } = useDisclosure();

    useEffect(() => {
        setTimeout(() => setTypewriterTimedout(true), 2200);
    }, []);

    return (
        <>
            {/* Publish button */}
            {editMode ? <PublishButton id="publish-btn" onClick={() => {
                localStorage.setItem('storedPost', postContent);
                const postObject = createPostObject(postContent);
                const encodedPostObject = encode(JSON.stringify(postObject));
                encodedPostObject.length <= 15000 ?
                    window.location.search = `?post=${encodedPostObject}` :
                    toast({
                        title: `Oh no, your post is too long! The max URL length is 15000 but yours is ${encodedPostObject.length}. Please shorten your post and try again.`,
                        status: 'error',
                        duration: 15000,
                        position: 'top',
                        isClosable: true,
                    })
                // alert(encodedPostObject.length)
            }} /> : null}

            {/* Boba button */}
            {!editMode ?
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

            <Logo />

            <Fade style={{ transitionDuration: '0.4s' }} in={show}>
                <Link href='/' _hover={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
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
                </Link>

                {/* Toolbar Buttons */}
                <Box display='flex' gap={{ base: '1px', md: '4px', sm: '1px' }} position='fixed' top='14px' right='10px'>

                    {/* Mute Btn */}
                    {editMode ?
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
                    {!editMode ?
                        <>
                            {/* <Tooltip label={SHARE_BTN_TOOLTIP} hasArrow closeOnClick={true} openDelay={1000}> */}
                            <IconButton
                                _focus={{ outline: "none" }}
                                onClick={onOpenSave}
                                aria-label='audio-toggle'
                                variant='ghost'
                                isRound={true}
                                fontSize='30px'
                                icon={<IoShareOutline />}
                            />
                            {/* </Tooltip> */}
                        </>
                        : null}

                    {/* Font Btn */}
                    {/* <Tooltip label={FONT_BTN_TOOLTIP} hasArrow openDelay={1000}> */}
                    <IconButton
                        _focus={{ outline: "none" }}
                        onClick={onOpenFont}
                        aria-label='audio-toggle'
                        variant='ghost'
                        isRound={true}
                        fontSize='30px'
                        icon={<RiFontSize />}
                    />
                    {/* </Tooltip> */}

                    {/* Info Btn */}
                    {/* <Tooltip label={INFO_BTN_TOOLTIP} hasArrow openDelay={1000}> */}
                    <IconButton
                        _focus={{ outline: "none" }}
                        onClick={onOpenInfo}
                        aria-label='audio-toggle'
                        variant='ghost'
                        isRound={true}
                        fontSize='36px'
                        icon={<BsQuestion />}
                    />
                    {/* </Tooltip> */}

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
                                    {/* <Link href={TINY_URL_LINK} isExternal> */}
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
                                    {/* </Link> */}
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
                            {/* {INFO_MODAL_BODY_TEXT} */}
                            Libre.ink is a truly anonymous instant-publish blog platform that has a unique quirk. We store your blog post right in the URL.
                            <br /><br />
                            <Accordion allowToggle>
                                <AccordionItem>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            <h3 style={{ fontWeight: 'bold' }}>
                                                In the URL?
                                            </h3>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    <AccordionPanel pb={4}>
                                        That's right. We encode your entire blog post and store it in the URL. This provides true anonymity. Remember to bookmark/share your blog URL because we don't store it anywhere. In fact, we have no tracking, no database and no server of any kind.
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            <h3 style={{ fontWeight: 'bold' }}>
                                                Why is my post's URL so long?
                                            </h3>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    <AccordionPanel pb={4}>
                                        Since everything is stored in the URL, the generated URL can get fairly long depending on the size of your post, but you can always use a URL-shortener you trust to make it shareable.
                                        URLs also have size limits so the app won't work above a certain post size (Something like 20,000 characters).
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            <h3 style={{ fontWeight: 'bold' }}>
                                                Formatting with Markdown
                                            </h3>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    <AccordionPanel pb={4}>
                                        We support Markdown. Here's a quick guide.
                                        <br /><br />
                                        <b>Heading</b> sizes range in hashes from 1 to 6 (#, ##, ..., ######)
                                        <br />
                                        <b>Italics</b> uses single asterisks like *this*
                                        <br />
                                        <b>Bold</b> uses double asterisks like **this**
                                        <br />
                                        <b>Strikethrough</b> uses double tildes like ~~this~~
                                        <br />
                                        <b>Horizontal</b> line uses triple hyphen like this: ---
                                        <br />
                                        Add a <b>blockquote</b> using >
                                        <br />
                                        <b>Code highlighting</b> uses single backticks like `this`
                                        <br /><br />
                                        1. Use <b>ordered lists</b> using numbers
                                        <br />
                                        - Or use <b>unordered lists</b> using single hyphens
                                        <br /><br />
                                        Add <b>links</b> like this: [Text](https://www.xyz.com)
                                        <br />
                                        Add <b>images</b> like this ![Text](https://xyz.png)
                                        <br /><br />





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

                            <Text fontSize='md'><i><b>Disclaimer</b>: Due to the technical implications of our strict no-storage policy, we do not bear the responsibility for any misuse of this tool.</i></Text>

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
                {/* {!editMode ? <IconButton
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
                                            mt='-10'
                                            ml='-5'
                                            w='12'
                                        >
                                            {fontSize}
                                        </SliderMark>
                                        <SliderTrack>
                                            <SliderFilledTrack />
                                        </SliderTrack>
                                        <SliderThumb />
                                    </Slider>
                                </Box>
                                {/* {editMode ? <Box>
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
                                {editMode ? <Box display='flex' alignItems='center' margin='20px 0'>
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
