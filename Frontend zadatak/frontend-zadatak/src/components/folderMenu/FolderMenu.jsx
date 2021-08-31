import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import Button from 'antd/lib/button';

const FolderMenu = ({ pageX, pageY, folderData, setMenu, setShow, setFolderData }) => {

    const handleClick = () => {
        setFolderData(folderData);
        setShow(true);
        setMenu(false);
    }

    return <OutsideClickHandler onOutsideClick={() => setMenu(false)}>
        <div className="self-right-menu">
            <Button style={{
                position: 'absolute',
                left: pageX + 20,
                top: pageY - 10,
                zIndex: 20,
                borderRadius: 5
            }} onClick={() => handleClick()}>Add folder</Button>
        </div>
    </OutsideClickHandler>
}

export default FolderMenu;