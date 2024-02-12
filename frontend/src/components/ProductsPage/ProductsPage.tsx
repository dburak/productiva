import { useState, useEffect } from 'react';
import { Table, Input, Select, Button, message } from 'antd';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  getReduxProducts,
  deleteReduxProduct,
} from '../../reducers/productReducer';
import { Product, Company } from '../../types';
import CreateProductComponent from './components/CreateProduct';
import UpdateProduct from './components/UpdateProduct';

import { BiSolidEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

const { Search } = Input;
const { Option } = Select;

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);
  const categories = useAppSelector((state) => state.product.filterByCategory);

  const [filteredproducts, setFilteredproducts] = useState(products);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    dispatch(getReduxProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredproducts(products || []);
  }, [products]);

  const handleSearch = (value: string) => {
    const filtered = products?.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredproducts(filtered || []);
  };

  const handleChangeCategory = (value: string | undefined) => {
    if (value) {
      const filtered = products?.filter(
        (product) => product.category.toLowerCase() === value.toLowerCase()
      );
      setFilteredproducts(filtered || []);
    } else {
      setFilteredproducts(products || []);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalVisible(true);
  };

  const handleDelete = (product: Product) => {
    dispatch(deleteReduxProduct(product.id))
      .then(() => {
        messageApi.success('Product deleted successfully');
      })
      .catch(() => {
        messageApi.error("Couldn't delete product. Please try again.");
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      sorter: (a: Product, b: Product) => a.category.localeCompare(b.category),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a: Product, b: Product) => a.amount - b.amount,
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render: (company: Company) => company.name,
    },
    {
      title: 'Edit',
      key: 'edit',
      width: '5%',
      render: (product: Product) => (
        <BiSolidEdit
          className='flex items-center justify-center w-5 h-5 cursor-pointer '
          onClick={() => handleEdit(product)}
        />
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      width: '5%',
      render: (product: Product) => (
        <MdDelete
          className={`flex items-center justify-center w-5 h-5 cursor-pointer text-red-500 
          }`}
          onClick={() => handleDelete(product)}
        />
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div className='flex justify-between items-center mb-4'>
        <div className='flex'>
          <Search
            placeholder='Search products'
            onSearch={handleSearch}
            className='w-64 mr-4'
          />
          <Select
            allowClear
            placeholder='Filter by category'
            className='w-64'
            onChange={handleChangeCategory}
          >
            {categories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </div>
        <Button type='primary' onClick={() => setIsModalVisible(true)}>
          Create Product
        </Button>
      </div>
      <Table dataSource={filteredproducts} columns={columns} rowKey='id' />
      <CreateProductComponent
        visible={isModalVisible && !editingProduct}
        onCancel={handleCancel}
      />
      {editingProduct && (
        <UpdateProduct
          visible={isModalVisible}
          product={editingProduct}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default ProductsPage;
