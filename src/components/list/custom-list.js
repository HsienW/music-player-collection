import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'antd';
import {CustomListItem} from './custom-list-item';
import {CircularCardItem} from "../circular-card/circular-card-item";

export const CustomList = (props) => {
    const {listData, listStyle, itemClickAction} = {...props};

    return (
        <List
            style={listStyle}
            split={true}
            dataSource={listData}
            renderItem={item => (
                <CustomListItem
                    itemId={item.id}
                    itemData={item}
                    itemTitle={item.name}
                    itemDescription={item.artists[0].name}
                    itemDuration={'00:30'}
                    itemClickAction={itemClickAction}
                />
            )}
        />
    );
};

CustomList.propTypes = {
    listData: PropTypes.array.isRequired,
    itemClickAction: PropTypes.func.isRequired
};

