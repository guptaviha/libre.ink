import React, { useState, useEffect, useCallback } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import { FloatingControls } from './FloatingControls';
import MDEditor from "@uiw/react-md-editor";
import { APP_TITLE } from '../constants';
import { setTitle } from '../common';

export type StatsType = {
    wordCount: number;
    characterCount: number;
    sentenceCount: number;
};

const localStoragePost = (localStorage.getItem('storedPost') ? localStorage.getItem('storedPost') : '');
const placeholderText = `# Quick guide to using libre.ink

Hello internet! 
Use this tool to write your heart out - we support markdown too!

### Use any number (1-6) of hashtags to specify your title size

**You can use bold like this**

*Or italics like this*

[Here you can add a link](https://www.markdownguide.org/cheat-sheet/)

> You can add a blockquote like this

1. Making a list is easy
2. Use numbers for an ordered list
- or hyphens for an unordered list

What to add lines to segment your post? Use three hyphens like this:

---

\`You can even add code segments inside of backticks\``
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
    const [soundOn, setSoundOn] = useState(true);
    const [hideMdToolbar, setHideMdToolbar] = useState(true);
    const { colorMode } = useColorMode();
    const [recentlyTypedCount, setRecentlyTypedCount] = useState(0);
    const [stats, setStats]: [StatsType, (stats: StatsType) => void] = useState({
        wordCount: 0,
        characterCount: 0,
        sentenceCount: 0,
    });

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
            wordCount: postContent.split(' ').length,
            characterCount: postContent.length,
            sentenceCount: postContent.split('.').length,
        });
    }, [postContent]);

    return (
        <Box w={{ base: '100%', md: '80%', lg: '70%' }}
            h='100vh'
            margin='0 auto'
            // background={'maroon'}
            // position='fixed'
            // top='0px'
            // padding="60px"
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
                    padding: "0 50px",
                    background: "unset",
                    boxShadow: "unset",
                    // overflow: "auto",
                }}
                textareaProps={
                    {
                        "placeholder": placeholderText
                    }
                }
            />

            <FloatingControls
                postContent={postContent}
                stats={stats}
                show={recentlyTypedCount < 2}
                soundOn={soundOn}
                setSoundOn={setSoundOn}
                editMode={true}
                hideMdToolbar={hideMdToolbar}
                setHideMdToolbar={setHideMdToolbar}
            />
        </Box>
    );
};
