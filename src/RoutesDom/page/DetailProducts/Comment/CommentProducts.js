import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormWrite from './FormWrite/FormWrite';
import ListComment from './ListComment/ListComment';
import * as actionTypes from 'Actions/index';
import './style.css';
export default function CommentProducts(props) {
    const { idProduct,data_product } = props;
    const dispatch = useDispatch();
    const getCommentProducts = _id => dispatch(actionTypes.getCommentProductsAPI(_id));
    const dataomments = useSelector(state => state.Comment);
    const lengthData = useSelector(state => state.Comment.lengthData);
    const [page, setPage] = useState(1);
    useEffect(() => {
        const data = {
            idProduct: idProduct,
            page: page,
            limit: 5
        }
        getCommentProducts(data);
    }, [idProduct,page]);
    // funtion
    const onChangePage = page => {
        setPage(page);
    };
    return (
        <div className="group-comment">
            <div className="container-comment">
                <FormWrite
                    _id={idProduct}
                    data={dataomments.data}
                    data_product={data_product}
                />
                <ListComment
                    data={dataomments.data}
                    lengthData={lengthData}
                    idProduct={idProduct}
                    onChangePage={onChangePage}
                />
            </div>
        </div>
    )
};