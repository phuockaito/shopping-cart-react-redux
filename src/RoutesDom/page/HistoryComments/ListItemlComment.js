import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Modal, Empty} from 'antd'
import StarRatings from "react-star-ratings";
import * as Actions from 'Actions/index';
import $ from 'jquery';
export default function ListItemlComment({ data, token }) {
    const dispatch = useDispatch();
    const deleteCommentProductsAPI = idProduct => dispatch(Actions.deleteCommentProductsAPI(idProduct));
    const [visibleMond, setVisible] = useState(false);
    const [start, setStar] = useState(null);
    const [time, setTime] = useState(null);
    const [content, setContent] = useState(null);
    const deleteComment = (id_cmt, id_product) => {
        const data = {
            _id: id_cmt,
            token: token,
            _id_product: id_product
        };
        deleteCommentProductsAPI(data);
    }
    useEffect(() => {
        visibleMond ? $('body').addClass('active') : $('body').removeClass('active');
    }, [visibleMond]);
    const showReviewContent = (content) => {
        setVisible(true);
        setStar(content.start);
        setContent(content.content);
        setTime(content.timeComment);
    };
    const showReviewContentProduct = data => {
        if (data.length > 0) {
            return (
                data.map(comment => (
                    <div className="iteml-history-comment" key={comment._id}>
                        <div className="group-name-img">
                            <div className="margin-history-comment img-history-comment">
                                <img src={comment.array_product[0].poster} alt={comment.array_product[0]._id} />
                            </div>
                            <div className="margin-history-comment name-history-comment">
                                <Link
                                    to={`/${comment.array_product[0].key}/${comment.array_product[0].NSX.replace(/ /g, '-')}/${comment.array_product[0].name.replace(/ /g, '-')}/${comment.array_product[0]._id}`}
                                    onClick={() => {
                                        $("html ,body").animate({ scrollTop: 0 }, 500);
                                    }}
                                >{comment.array_product[0].name}</Link>
                            </div>
                        </div>
                        <div className="group-info-detele">
                            <div className="margin-history-comment content-history-comment">
                                <button
                                    onClick={
                                        () => { showReviewContent(comment); }
                                    }
                                >
                                    Chi tiết
                                     </button>
                            </div>
                            <div className="margin-history-comment delete-comment-history-comment">

                                <button
                                    onClick={() => {
                                        deleteComment(comment._id, comment.id_product)
                                    }
                                    }
                                >
                                    Xóa bình luận
                                    </button>

                            </div>
                        </div>
                    </div>
                ))
            )
        } else return (
            <div className="group-nofuound">
                <Empty />
            </div>

        )
    }
    return (
        <>
            {showReviewContentProduct(data)}

            <Modal
                title="Chi tiết bình luận"
                centered
                visible={visibleMond}
                onOk={() => { setVisible(false) }}
                onCancel={() => { setVisible(false) }}
                footer={null}
                width={1000}
            >
                <div className="group-content-product">

                    <div className="group-star-modal">
                        <h3>Đánh giá: </h3>
                        {start > 0 ? (
                            <StarRatings
                                starDimension="20px"
                                starRatedColor="#fed330"
                                starHoverColor="#fed330"
                                rating={start}
                                starEmptyColor="white"
                            />
                        ) : (
                                <StarRatings
                                    starDimension="20px"
                                    starRatedColor="#fed330"
                                    starHoverColor="#fed330"
                                    starEmptyColor="none"
                                    numberOfStars={5}
                                />
                            )}

                    </div>
                    <div className="group-time-modal">
                        <h3>Thời gian:</h3>
                        <span>
                            {moment(time).fromNow()}
                        </span>
                        <span>
                            {moment(time).subtract(1, 'days').format('h:mm:ss, DD/MM/YYYY')}
                        </span>
                    </div>
                    <div className="group-content-modal">
                        <h3>Nội dung: </h3>
                        <p>{content}</p>
                    </div>
                </div>
            </Modal>
        </>
    )
}