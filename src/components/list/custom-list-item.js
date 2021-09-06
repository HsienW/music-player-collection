import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'antd';
import './custom-list-item.scss';

export const CustomListItem = (props) => {
    const {itemId, itemTitle, itemDescription, itemDuration, itemClickAction} = {...props};

    const itemClick = () => {
        itemClickAction(props);
    };

    return (
        <div className={'custom-list-item custom-list-item-active'}>
            <List.Item
                key={itemId}
                onClick={itemClick}
            >
                <List.Item.Meta
                    title={itemTitle}
                    description={itemDescription}
                />
                <div>{itemDuration}</div>
            </List.Item>
        </div>
    );
};

CustomListItem.propTypes = {
    itemId: PropTypes.string.isRequired,
    itemTitle: PropTypes.string.isRequired,
    itemDescription: PropTypes.string.isRequired,
    itemDuration: PropTypes.string.isRequired,
    itemClickAction: PropTypes.func.isRequired,
};

