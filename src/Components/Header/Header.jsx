import React from 'react';
import { Typography } from 'antd';
import './Header.css'

const { Title } = Typography;

function Header() {

  return (
    <div className="heading_title ">
      <Title level={4}>Currecny Info</Title>
    </div>
  );
}

export default Header;
