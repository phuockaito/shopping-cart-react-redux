import React from 'react';
import { SyncOutlined } from '@ant-design/icons';
export default function BtnLoading() {
    return (
        <SyncOutlined spin
            style={{
                fontSize: '2em',
                color: '#08c',
                margin: '15px auto 25px auto',
                top: '5px',
                display: 'block',
                textAlign: 'center',
            }}
        />
    )
};