import React, { useState } from 'react';
import Layout from 'antd/lib/layout';
import style from './Layout.module.scss';
import HeaderComponent from '../header/HeaderComponent';
import SiderComponent from '../sider/SiderComponent';
import ContentComponent from '../content/ContentComponent';

const { Header, Sider, Content } = Layout;

const LayoutComponent = () => {
    const [currentFolder, setCurrentFolder] = useState(false);
    const [showFiles, setShowFiles] = useState(false);

    const changeFolder = (folderNode) => {
        // on folder click, set all current folder data
        setCurrentFolder(folderNode);

        // show files table when folder is not an organizer 
        folderNode?.folderType === "organizer" ?
            setShowFiles(false)
            :
            setShowFiles(true)
    }

    return <Layout className={style.layoutStyle}>
        <Sider
            className={style.siderStyle}
            breakpoint="lg"
            collapsedWidth="0"
        >
            <SiderComponent selectFolder={(title) => changeFolder(title)} />
        </Sider>
        <Layout>
            <Header className={style.headerStyle}>
                <HeaderComponent currentFolder={currentFolder?.title} showSearch={showFiles} />
            </Header>
            <Content className={style.contentStyle}>
                <ContentComponent showFiles={showFiles} folderData={currentFolder} />
            </Content>
        </Layout>
    </Layout>
}

export default LayoutComponent;