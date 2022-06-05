import React, { useState, useEffect } from 'react';
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

export const EditPage = () => {
    const [postContent, setPostContent] = useState('');
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
        <Box p='14' w='100%' h='100vh' display='flex' flexDirection='column' alignItems='center'>
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
                size="lg"
                rows="20"
                m="50px"
                minHeight="400px"
                maxHeight="400px"
                placeholder="Write your heart out..."
                onKeyDown={async (event) => {
                    console.log(event.keyCode)
                    const key = event.keyCode
                    // space
                    if (key == 32){
                        await playAudio("space-bar-audio")
                    }
                    // return
                    else if (key == 13){
                        await playAudio("return-audio")
                    } 
                    // backspace
                    else if (key == 8){
                        await playAudio("backspace-audio")
                    }
                    // tab
                    else if (key == 9){
                        event.preventDefault();
                    }
                    // default to all printing keys
                    // http://gcctech.org/csc/javascript/javascript_keycodes.htm
                    else if ((key >= 48 && key <=90) 
                    || (key >= 96 && key <= 111)
                    || (key >= 186 && key <= 192)
                    || (key >= 219 && key <= 222) ){
                        if (keyCount >= 2){
                            keyCount = 0
                        } else {
                            keyCount = keyCount + 1
                        }
                        await playAudio(keySounds[keyCount])
                    }
                }}
                onChange={(event) => {
                    setPostContent(event.target.value);
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
