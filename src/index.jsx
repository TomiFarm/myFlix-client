import {createRoot} from 'react-dom/client';
import Container from 'react-bootstrap/Container';

// Import statement to indicate to bundle '.index.scss'
import './index.scss';

// Import MainView
import {MainView} from './components/main-view/main-view';

// Main component
const MyFlixApplication = () => {
    return (
    <Container>
        <MainView />
    </Container>);
};

// Finds the root of app
const container = document.querySelector('#root');
const root = createRoot(container);

// Tells React to render app in the root DOM element
root.render(<MyFlixApplication />);