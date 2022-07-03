import React, { useState, useEffect, useCallback } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import { FloatingControls } from './FloatingControls';
import MDEditor from "@uiw/react-md-editor";
import { setTitle } from '../common';
import { PLACEHOLDER_TEXT, STARTING_TEXT } from '../constants';

export type StatsType = {
    wordCount: number;
    characterCount: number;
    sentenceCount: number;
};

const localStoragePost = (localStorage.getItem('storedPost') ? localStorage.getItem('storedPost') : STARTING_TEXT);
const localStorageFont = Number(localStorage.getItem('fontSize') ? localStorage.getItem('fontSize') : 16);
const localStorageSound = (localStorage.getItem('storedSound') ? (localStorage.getItem('storedSound') === 'true') : true );
const localStorageToolbar = (localStorage.getItem('storedHideToolbar') ? (localStorage.getItem('storedHideToolbar') === 'true') : true );

const keySounds = ["key-audio-1", "key-audio-2", "key-audio-3"];
var keyCount = 0;


async function playAudio(id) {
    var x = document.getElementById(id) as HTMLAudioElement;
    if (id == "key-audio-1") {
        x.volume = 0.4
    }
    await x.play();
}

async function handleKeyAudio(keyCode: number) {
    const key = keyCode;
    // space
    if (key == 32) {
        await playAudio("space-bar-audio");
    }
    // return
    else if (key == 13) {
        await playAudio("return-audio");
    }
    // backspace
    else if (key == 8) {
        await playAudio("backspace-audio");
    }
    // default to all printing keys
    // http://gcctech.org/csc/javascript/javascript_keycodes.htm
    else if ((key >= 48 && key <= 90)
        || (key >= 96 && key <= 111)
        || (key >= 186 && key <= 192)
        || (key >= 219 && key <= 222)) {
        if (keyCount >= 2) {
            keyCount = 0
        } else {
            keyCount = keyCount + 1
        }
        await playAudio(keySounds[keyCount])
    }
}

export const EditPage = () => {
    const [postContent, setPostContent]: [string, any] = useState(localStoragePost);
    const [soundOn, setSoundOn] = useState(localStorageSound);
    const [hideMdToolbar, setHideMdToolbar] = useState(localStorageToolbar);
    const [fontSizeSlider, setFontSizeSlider] = useState(localStorageFont);
    const { colorMode } = useColorMode();
    const [recentlyTypedCount, setRecentlyTypedCount] = useState(0);
    const [stats, setStats]: [StatsType, (stats: StatsType) => void] = useState({
        wordCount: 0,
        characterCount: 0,
        sentenceCount: 0,
    });

    useEffect(() => {
        localStorage.setItem('fontSize', fontSizeSlider);
    }, [fontSizeSlider]);

    useEffect(() => {
        localStorage.setItem('storedSound', soundOn);
    }, [soundOn]);

    useEffect(() => {
        localStorage.setItem('storedHideToolbar', hideMdToolbar);
    }, [hideMdToolbar]);

    useEffect(() => {
        calculateStats();
        setTitle(postContent);
    }, [postContent]);

    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    useEffect(() => {
        function handleResize() {
            setWindowHeight(window.innerHeight);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    const calculateStats = useCallback(() => {
        setStats({
            wordCount: postContent.length > 0 ? postContent.split(' ').length : 0,
            characterCount: postContent.length,
            sentenceCount: postContent.length > 0 ? postContent.split('.').filter((sent) => sent.length > 0).length : 0,
        });
    }, [postContent]);

    return (
        <Box
            w='100%'
            h='100vh'
            margin='0 auto'
            className={`font-size-wrapper-${fontSizeSlider}`}
            data-color-mode={colorMode}
            onTouchMove={() => setRecentlyTypedCount(0)}
            onMouseMove={() => setRecentlyTypedCount(0)}>
            <MDEditor
                preview='edit'
                autoFocus={true}
                hideToolbar={hideMdToolbar}
                height={windowHeight - 100}
                value={postContent}
                visibleDragbar={false}
                onKeyDown={async (event) => {
                    setRecentlyTypedCount(recentlyTypedCount + 1);
                    const key = event.keyCode;
                    if (soundOn) {
                        handleKeyAudio(key);
                    }
                }}
                onChange={(text) => setPostContent(text)}
                style={{
                    margin: "70px 0 0",
                    background: "unset",
                    boxShadow: "unset",
                    fontSize: fontSizeSlider,
                }}
                textareaProps={
                    {
                        placeholder: PLACEHOLDER_TEXT
                    }
                }
            />
            <FloatingControls
                postContent={postContent}
                stats={stats}
                show={recentlyTypedCount < 2}
                soundOn={soundOn}
                setSoundOn={setSoundOn}
                fontSizeSlider={fontSizeSlider}
                setFontSizeSlider={setFontSizeSlider}
                editMode={true}
                hideMdToolbar={hideMdToolbar}
                setHideMdToolbar={setHideMdToolbar}
            />
        </Box>
    );
};
