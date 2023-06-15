import React from 'react';
import Avatar from 'antd/es/avatar/avatar';
import defaultAvatar from '../../assets/images/avatar0.jpg';
import playBtn from '../../assets/images/play.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className='header'>
        <div className="play-btn" onClick={() => navigate('/play')}><img src={playBtn} style={{height: '100%'}} /></div>
            <Avatar src={defaultAvatar} size={'large'} className='setting-avatar'/>
        </div>
    )
}

export default Header;
