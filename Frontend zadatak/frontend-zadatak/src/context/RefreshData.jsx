import { createContext, useContext, useState } from 'react';

const RefreshData = createContext();

const RefreshProvider = ({ children }) => {
    const [refreshData, setRefreshData] = useState(false);

    const refresh = {
        refreshData: refreshData,
        setRefreshData: () => setRefreshData(prevState => !prevState)
    }

    return <RefreshData.Provider value={refresh}>
        {children}
    </RefreshData.Provider>
};

export const useRefresh = () => {
    const refresh = useContext(RefreshData);

    return refresh;
}

export default RefreshProvider;