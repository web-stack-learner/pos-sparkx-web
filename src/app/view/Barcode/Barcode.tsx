import { Typography } from 'antd';
import { Form, Formik } from 'formik';
import { useRef, useState } from 'react';
import BarcodeGeneratorComponent from 'react-barcode';
import { FaPrint } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import { printBarcode } from '../../../redux/actions/barcode';
import { useAppDispatch, useTypedSelector } from '../../../redux/store';
import { Button, CommonInput, Loader } from '../../components';
const Barcode = () => {
  const dispatch = useAppDispatch();

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current
  });
  const { products, isLoading } = useTypedSelector(state => state.barcode);

  const [isClicked, setIsClicked] = useState<boolean>(false);

  // useEffect(() => {
  //   fetchProduct();
  // }, [dispatch]);
  const LotForm = () => {
    return (
      <div>
        {/* <Dropdown
          className='bg-white py-3'
          menu={{
            items: lot.map(item => {
              return {
                label: item.lotNumber.toString(),
                key: item.id
              } as ItemType;
            }),
            onClick: () => {
              alert('Click Functionality Under Maintenance');
            }
          }}
        >
          <Space>
            <h1>Available Lot Numbers</h1>
            <FaAngleDown />
          </Space>
        </Dropdown> */}
        <Formik
          initialValues={{ lotNumber: 0 }}
          onSubmit={value => {
            dispatch(printBarcode(value));
            setIsClicked(true);
          }}
        >
          {() => (
            <Form className='bg-white p-10 rounder flex flex-col items-center gap-y-4'>
              <CommonInput label='Lot Nuber' name='lotNumber' />
              <Button type='submit'>Go</Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  };

  if (!isClicked) {
    return <LotForm />;
  }
  if (isLoading) {
    return <Loader />;
  }

  if (!products?.length) {
    return (
      <div className='w-full h-screen flex flex-col items-center justify-center bg-white'>
        <Typography.Title level={3}>
          No Product To Print Barcode ! Please Try A Different Lot Number
        </Typography.Title>
        <Button type='button' onClick={() => setIsClicked(false)}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-y-2'>
      <div className='flex justify-between'>
        <Typography.Title level={3}>Barcodes</Typography.Title>
        <div className='flex gap-x-10'>
          <Button
            onClick={() => {
              setIsClicked(false);
            }}
          >
            Back
          </Button>
          <button
            onClick={handlePrint}
            className='flex gap-x-2 bg-yellow-300 items-center px-4 rounded py-1'
          >
            <FaPrint />
            Print
          </button>
        </div>
      </div>
      <div className='flex flex-col' ref={printRef}>
        {products?.map((product, i) => {
          return (
            <div className='flex'>
              <div className='w-[320px] h-[110px] items-center bg-white flex flex-col justify-center text-sm mr-[10px] mt-[130px]'>
                <p className='text-[14px] font-bold'>{product.itemCode}</p>

                <BarcodeGeneratorComponent
                  key={i}
                  width={0.8}
                  height={25}
                  value={product.itemCode.toString()}
                  displayValue={false}
                  margin={0}
                  format='CODE128'
                  textAlign='center'
                />
                <p
                  style={{ lineHeight: '11px' }}
                  className='text-[11px] font-bold text-center'
                >
                  {product.productGroup}
                </p>
                <p
                  style={{ lineHeight: '11px' }}
                  className='text-[11px] font-bold'
                >
                  Taka: {product.sellPrice}???
                </p>
              </div>
              <div className='w-[320px] h-[110px] items-center bg-white flex flex-col justify-center ml-[40px] text-sm mt-[130px]'>
                <p className='text-[14px] font-bold'>{product.itemCode}</p>

                <BarcodeGeneratorComponent
                  key={i}
                  width={0.8}
                  height={25}
                  margin={0}
                  value={product.itemCode.toString()}
                  displayValue={false}
                  format='CODE128'
                  textAlign='center'
                />
                <p
                  style={{ lineHeight: '11px' }}
                  className='text-[11px] font-bold text-center'
                >
                  {product.productGroup}
                </p>
                <p
                  style={{ lineHeight: '11px' }}
                  className='text-[11px] font-bold'
                >
                  Taka: {product.sellPrice}???
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Barcode;
