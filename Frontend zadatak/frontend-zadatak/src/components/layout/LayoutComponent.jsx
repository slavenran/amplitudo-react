import React, { useState } from 'react';
import Layout from 'antd/lib/layout';
import style from './Layout.module.scss';
import HeaderComponent from '../header/HeaderComponent';
import SiderComponent from '../sider/SiderComponent';
import ContentComponent from '../content/ContentComponent';

const { Header, Sider, Content } = Layout;

const LayoutComponent = () => {
    const [fileData, setFileData] = useState(false);
    const [currentFolder, setCurrentFolder] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const changeFolder = (folderNode) => {
        // on folder click, set all current folder data
        setCurrentFolder(folderNode);

        // show files table when folder is not an organizer 
        folderNode?.folderType === "organizer" ?
            setShowTable(false)
            :
            setShowTable(true)
    }

    const resetFilters = () => {
        // reset filters and file details on folder switch
        setSearchValue('');
        setFileData(false);
    }

    return <Layout className={style.layoutStyle}>
        <Sider
            className={style.siderStyle}
            breakpoint="lg"
            collapsedWidth="0"
        >
            <SiderComponent selectFolder={(title) => changeFolder(title)} resetFilters={() => resetFilters()} />
        </Sider>
        <Layout>
            <Header className={style.headerStyle}>
                <HeaderComponent
                    currentFolder={currentFolder?.title}
                    showSearch={showTable}
                    searchValue={searchValue}
                    setSearch={(e) => setSearchValue(e)} />
            </Header>
            <Content className={style.contentStyle}>
                <ContentComponent
                    showFiles={showTable}
                    folderData={currentFolder}
                    searchValue={searchValue}
                    fileData={fileData}
                    setFileData={(data) => setFileData(data)} />
            </Content>
        </Layout>
    </Layout>
}

export default LayoutComponent;