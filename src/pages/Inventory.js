import React, { useContext, useEffect, useState } from 'react';
import PageTitle from '../components/common/PageTitle';
import { FetchContext } from '../context/FetchContext';
import DangerButton from './../components/common/buttons/DangerButton';
import InventoryItemForm from './../components/InventoryItemForm';
import { formatCurrency } from './../util';
import * as constants from '../components/common/constants';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const InventoryItemContainer = ({ children }) => (
  <div className="bg-white rounded shadow-md mb-4 p-4">{children}</div>
);

const InventoryItem = ({ item, onDelete }) => {
  return (
    <div className="flex">
      <img className="rounded w-32 h-full" src={item.image} alt="inventory" />
      <div className="flex justify-between w-full">
        <div className="flex flex-col ml-4 justify-between">
          <div>
            <p className="font-bold text-xl text-gray-900">{item.name}</p>
            <p className="text-sm text-gray-600">{item.itemNumber}</p>
          </div>
          <div>
            <p className="text-gray-700 text-xl">
              {formatCurrency(item.unitPrice)}
            </p>
          </div>
        </div>
        <div className="self-end">
          <DangerButton text="Delete" onClick={() => onDelete(item)} />
        </div>
      </div>
    </div>
  );
};

const NewInventoryItem = ({ onSubmit }) => {
  return (
    <section className="bg-white p-4 shadow-md rounded-md">
      <p className="font-bold mb-2">New Inventory Item</p>
      <InventoryItemForm onSubmit={onSubmit} />
    </section>
  );
};

const Inventory = () => {
  const fetchContext = useContext(FetchContext);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const getInventory = async () => {
      try {
        const { data } = await fetchContext.authAxios.get(
          'api/get-inventory-items'
        );
        setInventory(data);
      } catch (err) {
        console.log(err);
        //toast.error('Get Inventory failed, ' + constants.PERMISSIONS_MESSAGE, {
        //  autoClose: false,
        //});
      }
    };

    getInventory();
  }, [fetchContext]);

  const onSubmit = async (values, resetForm) => {
    try {
      const { data } = await fetchContext.authAxios.post(
        'api/create-inventory-item',
        values
      );
      setInventory([...inventory, data.inventoryItem]);
      resetForm();
      toast.success('Create Inventory success!');
    } catch (err) {
      toast.error('Create Inventory failed, ' + constants.PERMISSIONS_MESSAGE, {
        autoClose: false,
      });
    }
  };

  const onDelete = async (item) => {
    try {
      if (window.confirm('Are you sure you want to delete this item?')) {
        const { data } = await fetchContext.authAxios.delete(
          `api/delete-inventory-item/${item._id}`
        );
        setInventory(
          inventory.filter((item) => item._id !== data.deletedItem._id)
        );
        toast.success('Delete Inventory success!');
      }
    } catch (err) {
      toast.error('Delete Inventory failed, ' + constants.PERMISSIONS_MESSAGE, {
        autoClose: false,
      });
    }
  };

  return (
    <>
      <PageTitle title="Inventory" />
      <div className="mb-4">
        <NewInventoryItem onSubmit={onSubmit} />
      </div>
      {inventory && inventory.length
        ? inventory.map((item) => (
            <InventoryItemContainer key={item._id}>
              <InventoryItem item={item} onDelete={onDelete} />
            </InventoryItemContainer>
          ))
        : 'No Inventory Items'}
    </>
  );
};

InventoryItem.propTypes = {
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

InventoryItemContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

NewInventoryItem.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Inventory;
