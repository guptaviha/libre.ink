import { ColorModeScript } from '@chakra-ui/react'
import { App } from './components/App';
import { createRoot } from 'react-dom/client';
import theme from './theme';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
</>);
