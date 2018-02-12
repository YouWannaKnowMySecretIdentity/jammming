
const clientId = "e54ef18fb2fc4af0b68231469b44876f";
const redirectURI = "http://localhost:3000/";

var accessToken = "";
var expirationTime = "";

const Spotify = {
    getAccessToken() {
        if (accessToken.length > 0) {
            return accessToken;
        } else {
            let at = window.location.href.match(/access_token=([^&]*)/);
            let expire = window.location.href.match(/expires_in=([^&]*)/);

            if (at && expire) {
                accessToken = at[1];
                expirationTime = expire[1];
                window.setTimeout(() => accessToken = "", expirationTime * 1000);
                window.history.pushState("Access Token", null, "/");
            } else {
                window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            }
        }
    },
    async search(term) {
        try {
            let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
                method: "GET",
                headers: {Authorization: `Bearer ${accessToken}`}
            });

            if (response.ok) {
                let data = await response.json();
                let results = data.tracks.items.map(track => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    };
                });

                return results;
            }

            throw new Error("Request failed!");

        } catch (error) {
            console.log(error);
            return [];
        }
        
    },
    async savePlaylist(name, tracks) {
        if (!name || !tracks) {
            return;
        }

        let token = accessToken;
        let headers = {Authorization: `Bearer ${token}`};
        let user = "";
        let playlistId = "";

        try {
            //get user id
            let response = await fetch("https://api.spotify.com/v1/me", {
                method: "GET",
                headers: headers
            });

            if (response.ok) {
                let data = await response.json();
                user = data.id;
            }

        } catch (error) {
            console.log(error);
        }

        if (user) {
            
            //get playlist id
            try {
                let response = await fetch(`https://api.spotify.com/v1/users/${user}/playlists`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({name: name})
                });

                if (response.ok) {
                    let data = await response.json();
                    playlistId = data.id;
                }
            } catch (error) {
                console.log(error);
            }

            if (playlistId) {

                //save playlist
                let uris = tracks.map(track => {
                    return track.uri;
                });

                try {
                    let response = await fetch(`https://api.spotify.com/v1/users/${user}/playlists/${playlistId}/tracks`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(uris)
                    });
    
                    if (response.ok) {
                        let data = await response.json();
                        console.log(data);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

    }
};

export default Spotify;