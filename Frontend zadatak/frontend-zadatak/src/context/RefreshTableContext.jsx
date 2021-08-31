import { createContext, useContext, useState } from 'react';

const RefreshTableContext = createContext();

const RefreshTableProvider = ({ children }) => {
    const [refreshData, setRefreshData] = useState(false);

    const refresh = {
        refreshData: refreshData,
        setRefreshData: () => setRefreshData(prevState => !prevState)
    }

    return <RefreshTableContext.Provider value={refresh}>
        {children}
    </RefreshTableContext.Provider>
};

export const useRefresh = () => {
    const refresh = useContext(RefreshTableContext);

    return refresh;
}

export default RefreshTableProvider;