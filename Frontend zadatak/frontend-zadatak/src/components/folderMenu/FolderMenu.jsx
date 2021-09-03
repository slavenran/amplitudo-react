import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import Button from 'antd/lib/button';
import PropTypes from 'prop-types';

const FolderMenu = ({ pageX, pageY, folderData, setShowMenu, setShowFolderCreationModal, setFolderData }) => {

    const handleClick = () => {
        setFolderData(folderData);
        setShowFolderCreationModal(true);
        setShowMenu(false);
    }

    return <OutsideClickHandler onOutsideClick={() => setShowMenu(false)}>
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

FolderMenu.propTypes = {
    pageX: PropTypes.number.isRequired,
    pageY: PropTypes.number.isRequired,
    folderData: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    setShowMenu: PropTypes.func.isRequired,
    setShowFolderCreationModal: PropTypes.func.isRequired,
    setFolderData: PropTypes.func.isRequired
}