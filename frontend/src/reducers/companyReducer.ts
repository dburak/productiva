import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import companyService from '../services/companies';
import { Dispatch } from 'redux';
import { Company, CompaniesState, CreateCompany } from '../types';

const initialState: CompaniesState = {
  companies: [],
};

const CompanySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanies(state, action: PayloadAction<Company[]>) {
      state.companies = action.payload;
    },
    addNewCompany(state, action: PayloadAction<Company>) {
      state.companies = state.companies.concat(action.payload);
    },
    updateCompany(state, action: PayloadAction<Company>) {
      const updatedCompany = action.payload;
      state.companies = state.companies.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      );
    },
    deleteCompany(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.companies = state.companies.filter((company) => company.id !== id);
    },
  },
});

export const getReduxCompanies = () => {
  return async (dispatch: Dispatch) => {
    const companies = await companyService.getCompanies();
    dispatch(setCompanies(companies));
  };
};

export const createReduxCompany = (company: CreateCompany) => {
  return async (dispatch: Dispatch) => {
    const newCompany = await companyService.createCompany(company);
    dispatch(addNewCompany(newCompany));
  };
};

export const updateReduxCompany = (company: Company) => {
  return async (dispatch: Dispatch) => {
    const updatedCompany = await companyService.updateCompany(company);
    dispatch(updateCompany(updatedCompany));
  };
};

export const deleteReduxCompany = (id: string) => {
  return async (dispatch: Dispatch) => {
    await companyService.deleteCompany(id);
    dispatch(deleteCompany(id));
  };
};

export const { setCompanies, addNewCompany, updateCompany, deleteCompany } =
  CompanySlice.actions;
export default CompanySlice.reducer;
