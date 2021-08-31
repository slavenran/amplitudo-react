import { createContext, useContext, useEffect, useState } from 'react';
import getWindowDimensions from '../functions/getWindowDimesions';

const WidthContext = createContext();

const WidthProvider = ({ children }) => {
    const [width, setWidth] = useState(getWindowDimensions);

    useEffect(() => {
        function handleResize() {
            setWidth(getWindowDimensions);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <WidthContext.Provider value={[width, setWidth]}>
        {children}
    </WidthContext.Provider>
};

export const useWidth = () => {
    const width = useContext(WidthContext);

    return width;
}

export default WidthProvider;