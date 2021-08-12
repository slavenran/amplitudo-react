import React from 'react'
// import logo from './logo192.png'

const MyImage = ({src}) => {
    return  <div>
                <img src={`/images/${src}`} alt="react-logo-src" />
                {/* <img src="/images/logo192.png" alt="react-logo-public" /> */}
            </div>
}

export default MyImage;