import React, {useState, useEffect} from 'react';
import {getPlaylistSongs} from '../../api';
import {CardItem, CustomList} from '../../components';
import {filteredPlaylistSongList} from '../../../../common/util';
import {Skeleton} from 'antd';
import queryString from 'query-string';
import './playlist.scss';

export const Playlist = (props) => {
    const {observer, observerKey} = {...props};
    const listInfo = queryString.parse(location.search);

    let [getApiState, changeGetApiState] = useState(false);
    let [playlistInfo, changePlaylistInfo] = useState(null);
    let [playlistSongList, changePlaylistSongList] = useState([]);

    useEffect(() => {
        getPlaylistSongs(listInfo.id)
            .then((respond) => {
                changePlaylistInfo(listInfo);
                changePlaylistSongList(filteredPlaylistSongList(respond['items']));
                changeGetApiState(true);
            })
            .catch((error) => {
                console.log(error);
                changeGetApiState(false);
            });
    }, [changePlaylistInfo, changePlaylistSongList]);

    const cardItemClick = () => {
        console.log('click');
    };

    const playlistItemClick = (songItemInfo) => {
        let clickSongsData = {
            songInfo: songItemInfo,
            albumInfo: playlistInfo,
            albumSongList: playlistSongList
        };
        observer.doPublish(observerKey.common.playSong, clickSongsData);
    };

    return (
        <div className={'playlist-container'}>
            {
                getApiState
                    ? <>
                        <CardItem
                            key={playlistInfo.id}
                            itemId={playlistInfo.id}
                            itemTitle={playlistInfo.name}
                            itemHoverable={false}
                            itemSubtitle={playlistInfo.artist}
                            imageURL={playlistInfo.image}
                            itemClickAction={cardItemClick}
                            itemStyle={{width: 300, height: 400}}
                            itemImageClass={'custom-card-playlist-img-size'}
                        />
                        <CustomList
                            listData={playlistSongList}
                            listStyle={{width: '100%'}}
                            itemDescription={playlistInfo.artist}
                            itemClickAction={playlistItemClick}
                        />
                    </>
                    : <Skeleton active={true}/>
            }
        </div>
    );
};

