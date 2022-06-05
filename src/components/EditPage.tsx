import React, { useState } from 'react';
import { Box, Button, Heading, Textarea } from '@chakra-ui/react';
import { FiEdit2 } from 'react-icons/fi';
import Typewriter from 'typewriter-effect';
import { FloatingControls } from './FloatingControls';

export type StatsType = {
    wordCount: number;
    characterCount: number;
    sentenceCount: number;
};

const keySounds = ["key-audio-1", "key-audio-2", "key-audio-3"];
var keyCount = 0


async function playAudio(id) { 
    var x = document.getElementById(id) as HTMLAudioElement;
    if (id == "key-audio-1"){
        x.volume = 0.4
    }
    await x.play(); 
} 
async function pauseAudio(id) {
    var x = document.getElementById(id) as HTMLAudioElement; 
    await x.pause();
}
async function loadAudio(id) {
    var x = document.getElementById(id) as HTMLAudioElement; 
    await x.load();
}

export const EditPage = () => {
    const [postContent, setPostContent] = useState('');
    const [stats, setStats]: [StatsType, (stats: StatsType) => void] = useState({
        wordCount: 0,
        characterCount: 0,
        sentenceCount: 0,
    });

    const calculateStats = () => {
        setStats({
            wordCount: postContent.split(' ').length,
            characterCount: postContent.length + 1,
            sentenceCount: postContent.split('.').length,
        });
    };

    return (
        <Box p='14' w='100%' h='100vh' display='flex' flexDirection='column' alignItems='center'>
            <Heading as={'h2'} fontFamily='monospace'>
                <Typewriter
                    options={{
                        strings: ['Mini Blog'],
                        autoStart: true,
                        loop: false,
                        pauseFor: 900000,
                    }}
                />

            </Heading>
            <Textarea
                id="edit-container"
                value={postContent}
                size="lg"
                rows="20"
                m="50px"
                minHeight="400px"
                maxHeight="400px"
                placeholder="Write your heart out..."
                onKeyDown={async (event) => {
                    console.log(event.which)
                    const key = event.which
                    // space
                    if (key == 32){
                        // await pauseAudio("space-bar-audio")
                        // await loadAudio("space-bar-audio")
                        await playAudio("space-bar-audio")
                    }
                    // return
                    else if (key == 13){
                        // await pauseAudio("return-audio")
                        // await loadAudio("return-audio")
                        await playAudio("return-audio")
                    } 
                    // backspace
                    else if (key == 8){
                        // await pauseAudio("backspace-audio")
                        // await loadAudio("backspace-audio")
                        await playAudio("backspace-audio")
                    }
                    // default to all keys
                    else {
                        // await pauseAudio("key-audio")
                        // await loadAudio("key-audio")
                        // console.log("keyCount before",keyCount)
                        if (keyCount >= 2){
                            keyCount = 0
                        } else {
                            keyCount = keyCount + 1
                        }
                        // console.log("keyCount after",keyCount)
                        console.log(keySounds[keyCount])
                        await playAudio(keySounds[keyCount])
                    }
                }}
                onChange={(event) => {
                    setPostContent(event.target.value);
                    calculateStats();
                }}
                autoFocus
                variant='unstyled'
            />
            <Button variant='ghost' position='absolute' bottom='10px' right='10px' leftIcon={<FiEdit2 />} id="publish-btn" onClick={() => {
                const encodedPost = btoa(postContent);
                window.location.search = `?post=${encodedPost}`
            }}>
                Publish
            </Button>
            <FloatingControls stats={stats} />
        </Box>
    );
};
