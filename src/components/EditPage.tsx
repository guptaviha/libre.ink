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



function playAudio(id) { 
    var x = document.getElementById(id); 
    x.play(); 
} 
function pauseAudio(id) {
    var x = document.getElementById(id); 
    x.pause();
}
function loadAudio(id) {
    var x = document.getElementById(id); 
    x.load();
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
                onKeyDown={(event) => {
                    console.log(event.which)
                    const key = event.which
                    // space
                    if (key == 32){
                        pauseAudio("space-bar-audio")
                        loadAudio("space-bar-audio")
                        playAudio("space-bar-audio")
                    }
                    // return
                    else if (key == 13){
                        pauseAudio("return-audio")
                        loadAudio("return-audio")
                        playAudio("return-audio")
                    } 
                    // backspace
                    else if (key == 8){
                        pauseAudio("backspace-audio")
                        loadAudio("backspace-audio")
                        playAudio("backspace-audio")
                    }
                    // default to all keys
                    else {
                        pauseAudio("key-audio")
                        loadAudio("key-audio")
                        playAudio("key-audio")
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
