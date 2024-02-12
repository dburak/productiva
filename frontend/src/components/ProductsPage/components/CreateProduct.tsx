import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  message,
  Select,
  Empty,
} from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { createReduxProduct } from '../../../reducers/productReducer';
import { getReduxCompanies } from '../../../reducers/companyReducer';
import { Product } from '../../../types';
import { useEffect } from 'react';

const CreateProductComponent = ({
  visible,
  onCancel,
}: {
  visible: boolean;
  onCancel: () => void;
}) => {
  const dispatch = useAppDispatch();
  const companies = useAppSelector((state) => state.company.companies);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    dispatch(getReduxCompanies());
  }, [dispatch]);

  const onFinish = (values: Product) => {
    dispatch(createReduxProduct(values))
      .then(() => {
        onCancel();
        form.resetFields();
        messageApi.success('Product created successfully');
      })
      .catch(() => {
        messageApi.error("Couldn't create product. Please check your inputs.");
      });
  };

  const handleSelectChange = (value: string) => {
    form.setFieldsValue({
      company: value.toString(),
    });
  };

  return (
    <Modal
      title='Create Product'
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        onFinish={onFinish}
        className='grid grid-cols-2 gap-4'
        layout='vertical'
      >
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please input the name!' }]}
          className='col-span-1'
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Category'
          name='category'
          rules={[{ required: true, message: 'Please select the category!' }]}
          className='col-span-1'
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Amount'
          name='amount'
          rules={[{ required: true, message: 'Please input the amount!' }]}
          className='col-span-1'
        >
          <InputNumber min={1} className='w-full' />
        </Form.Item>
        <Form.Item
          label='Unit'
          name='unit'
          rules={[{ required: true, message: 'Please input the unit!' }]}
          className='col-span-1'
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Company'
          name='company'
          rules={[{ required: true, message: 'Please select the company!' }]}
          className='col-span-2'
        >
          <Select onChange={handleSelectChange}>
            {companies.length > 0 ? (
              companies.map((option) => {
                return (
                  <Select.Option value={option.id} key={option.id}>
                    {option.name}
                  </Select.Option>
                );
              })
            ) : (
              <Empty />
            )}
          </Select>
        </Form.Item>
        <Form.Item className='col-span-2'>
          <Button type='primary' htmlType='submit' block>
            Create
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </Modal>
  );
};

export default CreateProductComponent;
