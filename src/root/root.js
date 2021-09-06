import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {AllCategories} from '../containers/all-categories/all-categories';
import {CategoriesDetail} from '../containers/categories-detail/categories-detail';
import {Playlist} from '../containers/playlist/playlist';
import {Album} from '../containers/album/album';
import {Artist} from '../containers/artist/artist';
import './root.scss';

export const CollectionRootDom = (props) => {
    const {routerBase, setGlobalState, getGlobalState, observer, observerKey} = props;
    // const defaultValue = getGlobalState('init');
    // const [testValue, changeValue] = useState(defaultValue);
    //
    // const click = (handler) => {
    //     const newValue = Math.floor(Math.random() * 9) + 1;
    //     changeValue(newValue);
    //     console.log(getGlobalState('init'));
    //     return handler({init: newValue});
    // };

    return (
        <BrowserRouter>
            <Switch>
                <Route path={`${routerBase}/all-categories`}>
                    <AllCategories
                        getGlobalState={getGlobalState}
                        setGlobalState={setGlobalState}
                        observer={observer}
                        observerKey={observerKey}
                    />
                </Route>
                <Route path={`${routerBase}/categories-detail`}>
                    <CategoriesDetail
                        getGlobalState={getGlobalState}
                        setGlobalState={setGlobalState}
                        observer={observer}
                        observerKey={observerKey}
                    />
                </Route>
                <Route path={`${routerBase}/playlist`}>
                    <Playlist
                        getGlobalState={getGlobalState}
                        setGlobalState={setGlobalState}
                        observer={observer}
                        observerKey={observerKey}
                    />
                </Route>
                <Route path={`${routerBase}/album`}>
                    <Album
                        getGlobalState={getGlobalState}
                        setGlobalState={setGlobalState}
                        observer={observer}
                        observerKey={observerKey}
                    />
                </Route>
                <Route path={`${routerBase}/artist`}>
                    <Artist
                        getGlobalState={getGlobalState}
                        setGlobalState={setGlobalState}
                        observer={observer}
                        observerKey={observerKey}
                    />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};
