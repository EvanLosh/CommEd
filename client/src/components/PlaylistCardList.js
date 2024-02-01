import React from "react";
import PlaylistCard from "./PlaylistCard";


function PlaylistCardList({ playlists, commonProps }) {

    if (!playlists) {
        playlists = []
    }

    const playlistCards = <div>
        {playlists.map((p) => {
            return <PlaylistCard key={p.id} playlist={p} commonProps={commonProps} />
        })}
    </div>


    return <div id="playlist-card-list">
        {playlistCards}
    </div>;
}

export default PlaylistCardList;
