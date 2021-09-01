import React, { useState } from 'react';
import Layout from 'antd/lib/layout';
import style from './Layout.module.scss';
import HeaderComponent from '../header/HeaderComponent';
import SiderComponent from '../sider/SiderComponent';
import ContentComponent from '../content/ContentComponent';
import CreateFolderForm from '../createForms/createFolderForm/CreateFolderForm';
import FormModal from '../modal/FormModal';
import SiderComponentAsync from '../sider/SiderComponentAsync';

const { Header, Sider, Content } = Layout;

const LayoutComponent = () => {
    const [currentFolder, setCurrentFolder] = useState(false);  // state for setting the view for folder data
    const [showTable, setShowTable] = useState(false);          // state for setting the view of table
    const [fileData, setFileData] = useState(false);            // state for setting the view of file data
    const [searchValue, setSearchValue] = useState('');         // state for filtering the table
    const [activeRow, setActiveRow] = useState(null);           // state for holding active row info for styling

    // states for managing folder menu and adding of new folder
    const [showMenu, setShowMenu] = useState(false);
    const [menuData, setMenuData] = useState();
    const [showModal, setShowModal] = useState(false);
    const [folderData, setFolderData] = useState(null);

    const changeFolder = (folderNode) => {
        // on folder click, show current folder info
        setCurrentFolder(folderNode);

        // show files table when folder is not an organizer 
        folderNode?.folderType === "organizer" ?
            setShowTable(false)
            :
            setShowTable(true)
    }

    const resetFilters = () => {
        // reset filters, file details and active row on folder switch
        setSearchValue('');
        setFileData(false);
        setActiveRow(null);
    }

    return <Layout className={style.layoutStyle}>
        <Sider
            className={style.siderStyle}
            breakpoint="lg"
            collapsedWidth="0"
        >
            <div style={{ width: "100%", height: "100%", overflow: 'hidden' }}>
                <SiderComponent
                    selectFolder={(title) => changeFolder(title)}
                    resetFilters={() => resetFilters()}
                    setMenu={(e) => setShowMenu(e)}
                    setMenuData={(e) => setMenuData(e)}
                    setShow={(e) => setShowModal(e)}
                    setFolderData={(e) => setFolderData(e)} />
                {/* <SiderComponentAsync
                    selectFolder={(title) => changeFolder(title)}
                    resetFilters={() => resetFilters()}
                    setMenu={(e) => setShowMenu(e)}
                    setMenuData={(e) => setMenuData(e)}
                    setShow={(e) => setShowModal(e)}
                    setFolderData={(e) => setFolderData(e)} /> */}
            </div>
        </Sider>
        <Layout className={style.contentLayout}>
            <Header className={style.headerStyle}>
                <HeaderComponent
                    currentFolder={currentFolder?.title}
                    showSearch={showTable}
                    searchValue={searchValue}
                    setSearch={(e) => setSearchValue(e)} />
            </Header>
            <Content className={style.contentStyle}>
                <ContentComponent
                    folderData={currentFolder}
                    showFiles={showTable}
                    searchValue={searchValue}
                    fileData={fileData}
                    setFileData={(data) => setFileData(data)}
                    activeRow={activeRow}
                    setActiveRow={(e) => setActiveRow(e)} />
            </Content>
        </Layout>
        {showMenu && menuData}
        {showModal &&
            <FormModal show={showModal} setShow={(e) => setShowModal(e)}>
                <CreateFolderForm setShowModal={(e) => setShowModal(e)} folderData={folderData} />
            </FormModal>
        }
    </Layout>
}

export default LayoutComponent;