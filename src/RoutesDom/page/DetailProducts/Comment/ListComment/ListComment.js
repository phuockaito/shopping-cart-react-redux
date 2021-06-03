import React, { useEffect, useState } from 'react';
import { Comment, Button, Tooltip, List, Popover } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { MoreOutlined } from '@ant-design/icons';
import BtnLoading from 'Compoment/BtnLoading/BtnLoading';
import StarRatings from "react-star-ratings";
import './style.css';
import * as actionTypes from 'Actions/index';
const token = localStorage.getItem('token');
export default function ListComment(props) {
    const dispatch = useDispatch();
    const { data, lengthData, idProduct, onChangePage } = props;
    const [idUser, setIduser] = useState([]);
    const dataUser = useSelector(state => state.User.user);
    const [loading, setloading] = useState(false);
    const [page, setPage] = useState(2);
    const deleteCommentProductsAPI = idProduct => dispatch(actionTypes.deleteCommentProductsAPI(idProduct));
    useEffect(() => {
        if (dataUser.length > 0) {
            setIduser(dataUser[0]._id);
        }
    }, [dataUser.length]);
    const deleteComment = id => {
        const data = {
            _id: id,
            token: token,
            _id_product: idProduct
        };
        deleteCommentProductsAPI(data);
    }
    const loadingData = page => {
        setPage(page + 1);
        onChangePage(page);
        setloading(true);
    };
    useEffect(() => {
        setloading(false);
    }, [data.length])
    const showListComment = data => {
        if (data.length > 0) {
            return (
                <>
                    <div className="group-review">
                        <h3> KHÁCH HÀNG NHẬN XÉT</h3>
                        <p>({data.length} / {lengthData} bình luận)</p>
                    </div>

                    <List
                        className="comment-list"
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <li>
                                <Comment
                                    avatar={item.avatar}
                                    content={item.content}
                                    author={item.name}
                                    datetime={
                                        <Tooltip>
                                            <div className="group-time-tart">
                                                <div className="group-time">
                                                    <span>
                                                        {moment(item.timeComment).fromNow()}
                                                    </span>
                                                    <span>
                                                        {moment(item.timeComment).subtract(1, 'days').format('h:mm:ss, DD/MM/YYYY')}
                                                    </span>

                                                </div>
                                                <div className="group-start">
                                                    {
                                                        item.start > 0 ? (<StarRatings
                                                            numberOfStars={5}
                                                            starDimension="18px"
                                                            starEmptyColor="rgb(203, 211, 227)"
                                                            starEmptyColor="none"
                                                            starRatedColor="#fed330"
                                                            rating={item.start}
                                                        />) : ('')
                                                    }
                                                </div>
                                            </div>
                                        </Tooltip>
                                    }
                                    children={
                                        (token && item.id_user === idUser) && (
                                            <div className="group-delete">
                                                <Popover
                                                    placement="leftBottom"
                                                    content={
                                                        <Button onClick={() => { deleteComment(item._id) }}>
                                                            Xóa
                                                </Button>
                                                    }
                                                >
                                                    <MoreOutlined />
                                                </Popover>
                                            </div>
                                        )
                                    }
                                />

                            </li>
                        )}
                    />
                </>
            )
        }
    };

    return (
        <>
            <div className="group-list-comment">
                <div className="iteml-comment">
                    {showListComment(data)}
                    {loading && <BtnLoading />}
                    {
                        (!loading && data.length < lengthData) && (
                            <button
                                className="load-data-comment"
                                onClick={() => loadingData(page)}
                            >
                                Tải Thêm
                            </button>
                        )
                    }
                </div>
            </div>
        </>
    )
};