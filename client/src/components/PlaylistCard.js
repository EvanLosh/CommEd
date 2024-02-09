import React from "react";
import './PlaylistCard.css'


function PlaylistCard({ playlist, commonProps }) {

    const handleClick = (e) => {
        window.location.href = commonProps.websiteURL + '/view-playlist/' + playlist.id
    }


    const playlistCard = <div className='playlist-card-content'>
        <p onClick={handleClick}>{playlist.title}</p>
        {commonProps.renderDatetimeAndAuthor(playlist)}
    </div>

    return <div className="playlist-card">
        {playlistCard}
    </div>;
}

export default PlaylistCard;
