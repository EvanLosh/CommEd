import React, { useState, useEffect } from "react";
import PlaylistCardList from "./PlaylistCardList";



function Playlists({ commonProps }) {

    const [playlists, setPlaylists] = useState([])
    useEffect(() => {
        fetch(commonProps.serverURL + '/playlists')
            .then(r => r.json())
            .then(r => setPlaylists(r))
    }, [])



    return <div id="playlists">
        <PlaylistCardList commonProps={commonProps} playlists={playlists} />
    </div>;
}

export default Playlists;
