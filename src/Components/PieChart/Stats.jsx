import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import Header from '../Header/Header';
import './Stats.css';

function Stats() {
  const [currencies, setCurrencies] = useState([]);

  let controller = null;
  var signal = null;

  const provisionPageHandle = () => {
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
          console.log(err, 'pichart');
        });
      return () => (mounted = false);
    }, 6000);
  }, []);
  const CurrecnyTypeOne = currencies.filter(
    (id) => id.min_size === '0.01000000'
  );
  const CurrecnyTypesecond = currencies.filter(
    (id) => id.min_size === '1.00000000'
  );
  const CurrecnyTypeThirde = currencies.filter(
    (id) => id.min_size === '0.00100000'
  );

  return (
    <div className='stats'>
      <Header />
      <div className='btn'>
        <Link to='/'>
          <Button type="link" onClick={provisionPageHandle}>
            Go to Page 1
          </Button>
        </Link>
      </div>
      <div className='pie_chart'>
        <PieChart
         className="pie_chart_diagram"
          data={[
            { title: 'One', value: CurrecnyTypeOne.length, color: 'red' },
            { title: 'Two', value: CurrecnyTypesecond.length, color: 'green' },
            {
              title: 'Three',
              value: CurrecnyTypeThirde.length,
              color: 'yellow',
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Stats;
