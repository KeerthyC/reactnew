import React from 'react';
import IconButton from '@mui/material/IconButton';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

const FullScreenButton = () => {
    const [isFullScreen, setIsFullScreen] = React.useState(false);

    const handleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullScreen(false);
            }
        }
    };

    return (
        <IconButton onClick={handleFullScreen} color="inherit">
            {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
    );
};

export default FullScreenButton;
