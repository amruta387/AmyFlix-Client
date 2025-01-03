import { createRoot } from 'react-dom/client';

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const AmyFlixApplication = () => {
    return (
        <div className="amy-flix">
            <div>Good Morning</div>
        </div>
    );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<AmyFlixApplication />);