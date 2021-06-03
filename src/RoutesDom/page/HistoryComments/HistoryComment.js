import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListItemlComment from './ListItemlComment';
import BtnLoading from 'Compoment/BtnLoading/BtnLoading';
import * as Actions from 'Actions/index';
import './style.css';
const token = localStorage.getItem('token');
export default function HistoryComment() {
    document.querySelector('title').innerHTML = 'Nhật ký hoạt động';
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [loading, setloading] = useState(false);
    const getDataComments = data => dispatch(Actions.historyCommentsAPI(data));
    useEffect(() => {
        const data = {
            page: page,
            token: token,
            iteml: 5,
        };
        getDataComments(data);
    }, [page]);
    const data = useSelector(state => state.historyComments.data);
    const length_data = useSelector(state => state.historyComments.lengthData);
    const onChange = page => {
        setloading(true);
        setPage(page + 1);
    }
    useEffect(() => {
        setloading(false);
    }, [data.length])
    return (
        <div className="group-history-comment">
            <div className="main-history-comment">
                <div className="group-title-rewvie">
                    <h3>HOẠT ĐỘNG GẦN ĐÂY</h3>
                    <p>({data.length} / {length_data} Bình luận)</p>
                </div>
                <ListItemlComment
                    data={data}
                    token={token}
                />
                <div className="group-loading-see-more">
                    {(loading) && (<BtnLoading />)}
                    {
                        (!loading && data.length < length_data) && (
                            <button
                                onClick={() => { onChange(page) }}
                            >
                                xem thêm
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
};