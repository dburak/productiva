import { useEffect } from 'react';
import { Flex, Typography } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { getReduxAuth } from '../../../reducers/authReducer';
import { AuthState } from '../../../types';

function CustomHeader() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: AuthState) => state.login);

  useEffect(() => {
    dispatch(getReduxAuth());
  }, [dispatch]);

  return (
    <Flex align='center'>
      <Typography.Title level={3} type='secondary'>
        Welcome, {user && user.name}
      </Typography.Title>
    </Flex>
  );
}

export default CustomHeader;
