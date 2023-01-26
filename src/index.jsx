import {createRoot} from 'react-dom/client';

// Import statement to indicate to bundle '.index.scss'
import './index.scss';

// Main component
const MyFlixApplication = () => {
    return (
        <div className="my-flix">
            <div>Good morning</div>
        </div>
    );
};

// Finds the root of app
const container = document.querySelector('#root');
const root = createRoot(container);

// Tells React to render app in the root DOM element
root.render(<MyFlixApplication />);