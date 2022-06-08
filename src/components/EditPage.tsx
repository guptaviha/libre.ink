import React, { useState, useEffect } from 'react';
import { Box, Heading, Textarea, useColorMode } from '@chakra-ui/react';
import Typewriter from 'typewriter-effect';
import { FloatingControls } from './FloatingControls';
import MDEditor from "@uiw/react-md-editor";

export type StatsType = {
    wordCount: number;
    characterCount: number;
    sentenceCount: number;
};

const localStoragePost = ( localStorage.getItem('storedPost') ? localStorage.getItem('storedPost') : '' );

const keySounds = ["key-audio-1", "key-audio-2", "key-audio-3"];
var keyCount = 0

async function playAudio(id) {
    var x = document.getElementById(id) as HTMLAudioElement;
    if (id == "key-audio-1") {
        x.volume = 0.4
    }
    await x.play();
}

async function handleKeyAudio(keyCode: number) {
    const key = keyCode
    // space
    if (key == 32) {
        await playAudio("space-bar-audio")
    }
    // return
    else if (key == 13) {
        await playAudio("return-audio")
    }
    // backspace
    else if (key == 8) {
        await playAudio("backspace-audio")
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
    const [postContent, setPostContent] = useState(localStoragePost);
    const [soundOn, setSoundOn] = useState(true);
    const { colorMode } = useColorMode();
    const [recentlyTypedCount, setRecentlyTypedCount] = useState(0);
    const [stats, setStats]: [StatsType, (stats: StatsType) => void] = useState({
        wordCount: 0,
        characterCount: 0,
        sentenceCount: 0,
    });



    useEffect(() => {
        calculateStats();
    }, [postContent]);

    const calculateStats = () => {
        setStats({
            wordCount: postContent.split(' ').length,
            characterCount: postContent.length,
            sentenceCount: postContent.split('.').length,
        });
    };

    return (
        <Box p='7' w='100%' h='100vh' display='flex' flexDirection='column' alignItems='left' onMouseMove={(event) => {
            setRecentlyTypedCount(0);
        }}>
            <Heading as={'h3'} size="md" fontFamily='monospace'>
                <Typewriter
                    options={{
                        strings: ['Mini Blog'],
                        autoStart: true,
                        loop: false,
                        pauseFor: 90000000,
                    }}

                />
            </Heading>
            <br></br>
            <div data-color-mode={colorMode}>
                <MDEditor 
                    preview='edit'
                    autoFocus={true}
                    hideToolbar={true}
                    height={500}
                    value={postContent}
                    visibleDragbar={false}
                    onKeyDown={async (event) => {
                        setRecentlyTypedCount(recentlyTypedCount + 1);
                        const key = event.keyCode;
                        if (soundOn) {
                            handleKeyAudio(key);
                        }
                    }}
                    
                    onChange={(text) => {
                        setPostContent(text);
                        console.log(text)
                    }}
                    style={{
                        "padding": "50px",
                        "background": "unset",
                        "boxShadow": "unset"
                    }}
                    textareaProps={
                        {
                            "placeholder":`# Quick guide to using miniblog

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
                        }
                    }

                />
                <br></br>
            </div>

            <FloatingControls
                postContent={postContent}
                stats={stats}
                show={recentlyTypedCount < 2}
                soundOn={soundOn}
                setSoundOn={setSoundOn}
                editMode={true}
            />
        </Box>
    );
};
