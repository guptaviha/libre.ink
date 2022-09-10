import React from 'react';
import { ColorModeScript } from '@chakra-ui/react'
import { App } from './components/App';
import { Landing } from './components/Landing';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './theme';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/app' element={<App />} />
        </Routes>
    </BrowserRouter>
);
