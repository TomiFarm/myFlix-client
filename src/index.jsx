import {createRoot} from 'react-dom/client';

// Import statement to indicate to bundle '.index.scss'
import './index.scss';

// Import MainView
import {MainView} from './components/main-view/main-view';

// Main component
const MyFlixApplication = () => {
    return <MainView />;
};

// Finds the root of app
const container = document.querySelector('#root');
const root = createRoot(container);

// Tells React to render app in the root DOM element
root.render(<MyFlixApplication />);