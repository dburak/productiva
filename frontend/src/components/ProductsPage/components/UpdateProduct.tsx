import { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Button, message, Select } from 'antd';
import { useAppDispatch } from '../../../hooks';
import { updateReduxProduct } from '../../../reducers/productReducer';
import { Product } from '../../../types';

const UpdateProduct = ({
  visible,
  product,
  onCancel,
}: {
  visible: boolean;
  product: Product;
  onCancel: () => void;
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();

  useEffect(() => {
    form.setFieldsValue({
      ...product,
      company: product.company.name,
    });
  }, [product, form]);

  const onFinish = (values: Product) => {
    const updatedProduct = {
      ...values,
      id: product.id,
      company: product.company.id,
    };
    dispatch(updateReduxProduct(updatedProduct))
      .then(() => {
        onCancel();
        form.resetFields();
        messageApi.success('Product updated successfully');
      })
      .catch(() => {
        messageApi.error("Couldn't update product. Please check your inputs.");
      });
  };

  return (
    <Modal
      title='Update Product'
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
        <Form.Item label='Company' name='company' className='col-span-2'>
          <Select disabled></Select>
        </Form.Item>
        <Form.Item className='col-span-2'>
          <Button type='primary' htmlType='submit' block>
            Update
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </Modal>
  );
};

export default UpdateProduct;
