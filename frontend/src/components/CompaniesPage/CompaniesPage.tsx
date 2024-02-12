import { useState, useEffect } from 'react';
import { Table, Input, Button, message, Tooltip } from 'antd';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  getReduxCompanies,
  deleteReduxCompany,
} from '../../reducers/companyReducer';
import { Company, CompanyProducts } from '../../types';
import CreateCompanyComponent from './components/CreateCompany';
import UpdateCompany from './components/UpdateCompany';

import { BiSolidEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

const { Search } = Input;

const CompaniesPage = () => {
  const dispatch = useAppDispatch();
  const companies = useAppSelector((state) => state.company.companies);
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    dispatch(getReduxCompanies());
  }, [dispatch]);

  useEffect(() => {
    setFilteredCompanies(companies || []);
  }, [companies]);

  const handleSearch = (value: string) => {
    const filtered = companies?.filter((company) =>
      company.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCompanies(filtered || []);
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setIsModalVisible(true);
  };

  const handleDelete = (company: Company) => {
    dispatch(deleteReduxCompany(company.id))
      .then(() => {
        messageApi.success('Company deleted successfully');
      })
      .catch(() => {
        messageApi.error("Couldn't delete company. Please try again.");
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCompany(null);
  };

  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Company, b: Company) => a.name.localeCompare(b.name),
    },
    {
      title: 'Company Legal Number',
      dataIndex: 'legalNumber',
      key: 'legalNumber',
      sorter: (a: Company, b: Company) =>
        a.legalNumber.localeCompare(b.legalNumber),
    },
    {
      title: 'Incorporation Country',
      dataIndex: 'country',
      key: 'country',
      sorter: (a: Company, b: Company) => a.country.localeCompare(b.country),
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'No. Products',
      dataIndex: 'products',
      key: 'products',
      width: '15%',
      render: (products: CompanyProducts) =>
        Array.isArray(products) ? products.length : 0,
      sorter: (a: Company, b: Company) => a.products.length - b.products.length,
    },
    {
      title: 'Edit',
      key: 'edit',
      width: '5%',
      render: (company: Company) => (
        <BiSolidEdit
          className='flex items-center justify-center w-5 h-5 cursor-pointer '
          onClick={() => handleEdit(company)}
        />
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      width: '5%',
      render: (company: Company) => (
        <div>
          <Tooltip
            title={
              company.products.length > 0
                ? 'Cannot delete company with products.'
                : ''
            }
          >
            <MdDelete
              className={`flex items-center justify-center w-5 h-5 cursor-pointer text-red-500 ${
                company.products.length > 0
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              onClick={
                company.products.length > 0
                  ? undefined
                  : () => handleDelete(company)
              }
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div className='flex justify-between items-center mb-4'>
        <div className='flex'>
          <Search
            placeholder='Search companies'
            onSearch={handleSearch}
            className='w-64 mr-4'
          />
        </div>
        <Button type='primary' onClick={() => setIsModalVisible(true)}>
          Create Company
        </Button>
      </div>
      <Table dataSource={filteredCompanies} columns={columns} rowKey='id' />
      <CreateCompanyComponent
        visible={isModalVisible && !editingCompany}
        onCancel={handleCancel}
      />
      {editingCompany && (
        <UpdateCompany
          visible={isModalVisible}
          company={editingCompany}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default CompaniesPage;
