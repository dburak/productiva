import { useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useAppDispatch } from '../../../hooks';
import { updateReduxCompany } from '../../../reducers/companyReducer';
import { Company, CreateCompany } from '../../../types';

const UpdateCompany = ({
  visible,
  company,
  onCancel,
}: {
  visible: boolean;
  company: Company;
  onCancel: () => void;
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();

  useEffect(() => {
    form.setFieldsValue(company);
  }, [company, form]);

  const onFinish = (values: CreateCompany) => {
    dispatch(updateReduxCompany({ ...company, ...values }))
      .then(() => {
        onCancel();
        form.resetFields();
        messageApi.success('Company updated successfully');
      })
      .catch(() => {
        messageApi.error("Couldn't update company. Please check your inputs.");
      });
  };

  return (
    <Modal
      title='Update Company'
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
          label='Company Name'
          name='name'
          rules={[
            { required: true, message: 'Please input the Company Name!' },
          ]}
          className='col-span-1'
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Company Legal Number'
          name='legalNumber'
          rules={[
            {
              required: true,
              message: 'Please select the Company Legal Number!',
            },
          ]}
          className='col-span-1'
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Incorporation Country'
          name='country'
          rules={[
            {
              required: true,
              message: 'Please input the Incorporation Country!',
            },
          ]}
          className='col-span-1'
        >
          <Input />
        </Form.Item>
        <Form.Item label='Website' name='website' className='col-span-1'>
          <Input />
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

export default UpdateCompany;
