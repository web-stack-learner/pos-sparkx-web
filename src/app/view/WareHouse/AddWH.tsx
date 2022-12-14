import { Typography } from 'antd';
import { Form, Formik } from 'formik';
import { addWarehouse } from '../../../redux/actions/warehouse';
import { useAppDispatch, useTypedSelector } from '../../../redux/store';
import { Warehouse } from '../../../redux/types';
import { Button, CommonInput } from '../../components';

const AddWH = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useTypedSelector(state => state.warehouse);
  return (
    <div className='w-full pt-10 flex items-start justify-center flex-col'>
      <Typography className='font-bold text-2xl mb-2'>
        Add New WareHouse
      </Typography>
      <Formik
        initialValues={
          { whCode: '', whName: '', whLocation: '' } satisfies Warehouse
        }
        onSubmit={(value, { resetForm }) => {
          dispatch(addWarehouse(value, resetForm));
        }}
      >
        <Form className='w-full flex flex-col gap-y-6 items-center pt-10 bg-white p-4'>
          <CommonInput
            required
            name='whCode'
            label='WareHouse Code'
            placeholder='WareHouse Code'
          />
          <CommonInput
            required
            name='whName'
            label='WareHouse Name'
            placeholder='WareHouse Name'
          />
          <CommonInput
            required
            name='whLocation'
            label='WareHouse Address'
            placeholder='WareHouse Address'
          />
          <Button type='submit' loading={isLoading} disabled={isLoading}>
            Save
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddWH;
