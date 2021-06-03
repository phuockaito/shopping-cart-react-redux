import React from 'react';
import { Result} from 'antd';
import './style.css';
export default function NotFount() {
    return (
        <div className="group-notfount">
            <div className="NotFount">
                <Result
                    status="404"
                    title="404"
                    subTitle="Xin lỗi, trang bạn đã truy cập không tồn tại."
                />
            </div>
        </div>
    )
};