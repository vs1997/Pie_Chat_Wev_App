import { Button, Table } from 'antd';
import Item from 'antd/lib/list/Item';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './InfoTable.css';

function InfoTable() {
  const [currencies, setCurrencies] = useState([]);

  let controller = null;
  var signal = null;

  const nextPageHandle = () => {
    controller = new AbortController();
    signal = controller.signal;
    controller && controller.abort();
  };

  useEffect(() => {
    const URL = 'https://api.coinbase.com/v2/currencies';
    setTimeout(function () {
      let mounted = true;

      const response = fetch(URL, { signal })
        .then((data) => data.json())
        .then((data) => {
          if (mounted) {
            setCurrencies(data.data);
          }
        })
        .catch((err) => {
          console.log(err, 'table');
        });
      return () => (mounted = false);
    }, 6000);
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Min-size',
      dataIndex: 'min_size',
      key: 'min_size',
    },
  ];

  const newArray =
    currencies && currencies.length
      ? currencies.map((info) => {
          return {
            ...info,
            key: info.id,
          };
        })
      : [];

  return (
    <div className='info_table'>
      <Header />
      <div className='btn'>
        <Link to='/pie_chart'>
          <Button type="ghost" onClick={nextPageHandle}>
            Go to Page 2
          </Button>
        </Link>
      </div>
      <div className='table'>
        <Table columns={columns} dataSource={newArray}></Table>
      </div>
    </div>
  );
}

export default InfoTable;
