import React, {useState, useEffect} from 'react';
import {getArtistInfo, getArtistTopSong, getArtistAlbums} from '../../api';
import {CardItem, CircularCardItem, CustomList} from '../../components';
import {createParamRoute, filteredEmptyImage, filteredEmptySong} from '../../../../common/util';
import {Skeleton, Divider} from 'antd';
import queryString from 'query-string';
import './artist.scss';

export const Artist = (props) => {
    const {observer, observerKey} = {...props};
    const artistData = queryString.parse(location.search);

    let [getArtistInfoApiState, changeGetArtistInfoApiState] = useState(false);
    let [getArtistTopSongApiState, changeGetArtistTopSongApiState] = useState(false);
    let [getArtistAlbumsApiState, changeGetArtistAlbumsApiState] = useState(false);
    let [artistInfo, changeArtistInfo] = useState(null);
    let [artistTopSongList, changeArtistTopSongList] = useState([]);
    let [artistAlbumsList, changeArtistAlbumsList] = useState([]);

    useEffect(() => {
        // getTestApi(artistData.id);
        getArtistInfo(artistData.id)
            .then((respond) => {
                changeArtistInfo(respond);
                changeGetArtistInfoApiState(true);
            })
            .catch((error) => {
                console.log(error);
                changeGetArtistInfoApiState(false);
            });

        getArtistTopSong(artistData.id)
            .then((respond) => {
                changeArtistTopSongList(filteredEmptySong(respond['tracks']));
                changeGetArtistTopSongApiState(true);
            })
            .catch((error) => {
                console.log(error);
                changeGetArtistTopSongApiState(false);
            });

        getArtistAlbums(artistData.id)
            .then((respond) => {
                changeArtistAlbumsList(filteredEmptyImage(respond['items']));
                changeGetArtistAlbumsApiState(true);
            })
            .catch((error) => {
                console.log(error);
                changeGetArtistAlbumsApiState(false);
            });
    }, [changeArtistInfo, changeArtistTopSongList, changeArtistAlbumsList]);

    const circularCardItemClick = () => {
        console.log('click');
    };

    const artistTopSongItemClick = (songItemInfo) => {
        let clickSongsData = {
            songInfo: songItemInfo,
            albumInfo: songItemInfo.itemData.album,
            albumSongList: artistTopSongList
        };
        observer.doPublish(observerKey.common.playSong, clickSongsData);
    };

    const artistAlbumItemClick = (categoriesItemInfo) => {
        let newRouteURL = createParamRoute(
            '/collection/album',
            {
                id: categoriesItemInfo.itemId,
                name: categoriesItemInfo.itemTitle,
                image: categoriesItemInfo.imageURL,
                artist: categoriesItemInfo.itemSubtitle
            });
        observer.doPublish(observerKey.route.routeNavigation, newRouteURL);
    };

    return (
        <div className={'artist-container'}>
            {
                getArtistInfoApiState
                    ? <div className={'artist-info-container'}>
                        <CircularCardItem
                            itemId={artistInfo.id}
                            itemTitle={artistInfo.name}
                            itemSubtitle={`followers ${artistInfo.followers.total}`}
                            imageURL={artistInfo.images[0].url}
                            itemClickAction={circularCardItemClick}
                            itemStyle={{width: 300, height: 300}}
                        />
                    </div>
                    : <Skeleton active={true}/>
            }
            {
                getArtistTopSongApiState
                    ? <div className={'artist-top-song-container'}>
                        <div className={'artist-container-title'}>Top Songs</div>
                        <Divider style={{margin: '20 0'}}/>
                        <CustomList
                            listData={artistTopSongList}
                            listStyle={{width: '100%'}}
                            itemClickAction={artistTopSongItemClick}
                        />
                    </div>
                    : <Skeleton active={true}/>
            }
            {
                getArtistAlbumsApiState
                    ?
                    <div className={'artist-album-container'}>
                        <div className={'artist-container-title'}>Albums</div>
                        <Divider style={{margin: '20 0'}}/>
                        {
                            artistAlbumsList.map((item) => {
                                return (
                                    <CardItem
                                        key={item.id}
                                        itemId={item.id}
                                        itemTitle={item.name}
                                        itemHoverable={true}
                                        itemSubtitle={item.artists[0].name}
                                        imageURL={item.images[0].url}
                                        itemClickAction={artistAlbumItemClick}
                                        itemStyle={{width: 180}}
                                        itemImageClass={'custom-card-home-img-size'}
                                    >
                                    </CardItem>
                                );
                            })
                        }
                    </div>
                    : <Skeleton active={true}/>
            }
        </div>
    );
};



