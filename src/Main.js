import Contract from './components/contract/contract.js';
import { BrowserRouter } from 'react-router-dom';
import jsonData from './static/input.json';

const Main = () => {
    return (
        <BrowserRouter>
            <Contract jsonData={jsonData} />
        </BrowserRouter>
    );
    }

export default Main;