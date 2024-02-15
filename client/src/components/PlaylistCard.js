import React from "react";
import './PlaylistCard.css'
import { InlineTex } from "react-tex";


function PlaylistCard({ playlist, commonProps }) {

    // const handleClick = (e) => {
    //     window.location.href = commonProps.websiteURL + '/view-playlist/' + playlist.id
    // }


    const playlistCard = <div className='playlist-card-content'>
        <a className='playlist-title' href={'/view-playlist/' + playlist.id} >
            <InlineTex texContent={playlist.title} /> </a>
        {commonProps.renderDatetimeAndAuthor(playlist)}
    </div>

    return <div className="playlist-card">
        {playlistCard}
    </div>;
}

export default PlaylistCard;
