import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, InputNumber } from 'antd';
import { useDispatch } from 'react-redux';
import dataCity from 'data.json';
import * as Actions from 'Actions/index';
const { Option } = Select;
const token = localStorage.getItem('token');
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24,
        },
        lg: {
            span: 24,
        },
        xl: {
            span: 24,
        },
    },
    wrapperCol: {
        xs: {
            span: 0,
        },
        sm: {
            span: 24,
        },
    },
};

export default function EditAddress({ id_card }) {
    const dispatch = useDispatch();
    const updataCartAddressesAPI = data => dispatch(Actions.updataCartAddressesAPI(data));
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [loading, setloading] = useState(false);
    const onChangeCity = (City) => {
        setCity(City);
    };
    const onChangeDistrict = District => {
        setDistrict(District);
    }

    const onFinish = (values) => {
        const { city, district, commune, incubation, numberPhome, } = values;
        const data = {
            token: token,
            inforCart: {
                address: `${incubation} - ${commune} - ${district} - ${city}`,
                phone: numberPhome,
            },
            id_card: id_card
        };
        if (data) {
            setloading(true)
            setTimeout(() => {
                updataCartAddressesAPI(data);
                setloading(false);
            }, 1300);
        }
    }
    useEffect(() => {
        form.resetFields(['district']);
        form.resetFields(['commune']);
    }, [city]);
    useEffect(() => {
        form.resetFields(['commune']);
    }, [district]);
    return (
        <>
            <div className="group-check-out">
                <Form
                    {...formItemLayout}
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="city"
                        label="T???nh/Th??nh ph???"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng ch???n t???nh ho???c th??nh ph??? b???n ??? !',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="T???nh/Th??nh ph???"
                            optionFilterProp="children"
                            onChange={onChangeCity}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                dataCity.map((city, index) => (
                                    <Option value={city.name} key={index}>{city.name}</Option>
                                ))
                            }
                        </Select >
                    </Form.Item>

                    <Form.Item
                        name="district"
                        label="Qu???n/Huy???n"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng ch???n qu???n ho???c huy???n n??i b???n !',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Qu???n/Huy???n"
                            optionFilterProp="children"
                            onChange={onChangeDistrict}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                dataCity.map((itemCity, index) => itemCity.name === city && (
                                    itemCity.huyen.map((huyen) => (
                                        <Option value={huyen.name} key={index}>{huyen.name}</Option>
                                    ))
                                ))
                            }
                        </Select >
                    </Form.Item>
                    <Form.Item
                        name="commune"
                        label="X??/Th??? Tr???n"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng ch???n x?? b???n ??? !',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="X??/Th??? Tr???n"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                dataCity.map(itemCity => itemCity.name === city && (
                                    itemCity.huyen.map(huyen => huyen.name === district && (
                                        huyen.xa.sort().map((xa, index) => (
                                            <Option value={xa.name} key={index}>{xa.name}</Option>
                                        ))
                                    ))
                                ))
                            }
                        </Select >
                    </Form.Item>
                    <Form.Item
                        name="incubation"
                        label="???p/S??? Nh??/T??n ???????ng"
                        rules={[
                            {
                                required: true,
                                message: '?????a ch??? c??? th??? !',
                            }
                        ]}
                    >
                        <TextArea
                            placeholder="?????a ch??? c??? th???: ???p, s??? nh??, t??n ???????ng..."
                            rows={4}
                        />
                    </Form.Item>
                    <Form.Item
                        name="numberPhome"
                        label="S??? ??i???n Tho???i"
                        className="group-phone"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng nh???p ????ng s??? ??i???n tho???i !',
                            }
                        ]}
                    >
                        <InputNumber type="number" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="btn-register"
                        >
                            Ho??n t???t
                            </Button>
                    </Form.Item>
                </Form>

            </div>
        </>
    )
}