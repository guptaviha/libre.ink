import React, { useState, useEffect } from 'react';
import { Box, Heading, Textarea } from '@chakra-ui/react';
import Typewriter from 'typewriter-effect';
import { FloatingControls } from './FloatingControls';
import { PublishButton } from './PublishButton';

export type StatsType = {
    wordCount: number;
    characterCount: number;
    sentenceCount: number;
};

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
    const [postContent, setPostContent] = useState('');
    const [soundOn, setSoundOn] = useState(true);
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
        <Box p='14' w='100%' h='100vh' display='flex' flexDirection='column' alignItems='center' onMouseMove={(event) => {
            setRecentlyTypedCount(0);
        }}>
            <Heading as={'h2'} fontFamily='monospace'>
                <Typewriter
                    options={{
                        strings: ['Mini Blog'],
                        autoStart: true,
                        loop: false,
                        pauseFor: 90000000,
                    }}
                />
            </Heading>
            <Textarea
                id="edit-container"
                value={postContent}
                // spellcheck={true}
                size="lg"
                rows="20"
                m="50px"
                minHeight="400px"
                maxHeight="400px"
                placeholder="Write your heart out..."
                onKeyDown={async (event) => {
                    setRecentlyTypedCount(recentlyTypedCount + 1);
                    const key = event.keyCode;
                    if (soundOn) {
                        handleKeyAudio(key);
                    }
                    // TODO: Remove tab logic if handled by component
                    if (key == 9) {
                        event.preventDefault();
                    }
                }}
                onChange={(event) => {
                    setPostContent(event.target.value);
                }}
                autoFocus
                variant='unstyled'
                resize='none'
            />
            <PublishButton id="publish-btn" onClick={() => {
                const encodedPost = btoa(postContent);
                window.location.search = `?post=${encodedPost}`
            }} />
            <FloatingControls
                stats={stats}
                show={recentlyTypedCount < 2}
                soundOn={soundOn}
                setSoundOn={setSoundOn}
            />
        </Box>
    );
};
