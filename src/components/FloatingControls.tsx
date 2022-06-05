import { Box, Fade, IconButton, Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsVolumeUp, BsVolumeMute } from 'react-icons/bs';
import { FiBarChart2 } from 'react-icons/fi';
import { StatsType } from './EditPage';

const camelToTitleCase = (text: string) => {
    const result = text.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
};

type FloatingControlsProps = {
    stats: StatsType;
    show: boolean;
};

export const FloatingControls = (props: FloatingControlsProps) => {
    const { stats, show } = props;
    const [soundOn, setSoundOn] = useState(true);
    const [statsBoxOpen, setStatsBoxOpen] = useState(false);

    return (
        <Fade style={{ transitionDuration: '0.4s'}} in={show}>
            <Box background='red'>
                <IconButton
                    onClick={() => setSoundOn(!soundOn)}
                    position='absolute'
                    top='10px'
                    right='10px'
                    aria-label='audio-toggle'
                    variant='ghost'
                    isRound={true}
                    size='lg'
                    fontSize='30px'
                    icon={soundOn ? <BsVolumeUp /> : <BsVolumeMute />}
                />

                <Popover>
                    <PopoverTrigger>
                        <IconButton
                            onClick={() => setStatsBoxOpen(!statsBoxOpen)}
                            position='absolute'
                            bottom='10px'
                            left='10px'
                            aria-label='stats-count'
                            variant='ghost'
                            size='lg'
                            fontSize='30px'
                            isRound={true}
                            icon={<FiBarChart2 />}
                        />
                    </PopoverTrigger>
                    <PopoverContent>
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
                </Popover>
            </Box>
        </Fade>
    )
};