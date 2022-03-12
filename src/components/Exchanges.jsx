/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-indent */
import { React, useEffect, useState } from 'react';
// import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
// import HTMLReactParser from 'html-react-parser';

// import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const avatarStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    boxShadow: '0px 0px 10px #000',
};

const rankStyle = {
    color: 'red',
    display: 'inline-block',
    marginBottom: '8px',
};
const descStyle = {
    display: 'inline-block',
    fontSize: '14px',
    marginTop: '8px',
};
// ${userExchange || 'exchanges'}
const API_URL = 'https://api.coingecko.com/api/v3/exchanges/';
async function getExchanges() {
  const response = await fetch(`${API_URL }`);
  const data = await response.json();
  return data;
}

export default function Exchanges() {
      const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    getExchanges().then((exchanges) => {
      setExchanges(exchanges);
    });
  }, []);

  if (!exchanges.length) return <Loader />;

  const renderExchanges = () => exchanges.map((exchange) => (
    <Panel header={exchange.name} key={exchange.id}>
      <Row gutter={[16, 16]}>
        <Col span={4}>
          <Avatar src={exchange.image} style={avatarStyle} />
        </Col>
        <Col span={20}>
          <Text strong style={{ fontSize: '1.3rem' }}>
            {exchange.name}
          </Text>
          <br />
          <Text strong style={rankStyle}>
            <i>Rank :</i> {exchange.trust_score_rank}
          </Text>
          <br />
          <Text>
            <i style={{ fontWeight: '500', marginRight: '8px' }}>Country :  </i> 
            <span style={{ color: '#8A39E1' }}>
                {exchange.country}
            </span>
          </Text>
          <br />
          <Text>
              <i style={{ fontWeight: '500', marginRight: '8px' }}>Trust Score : </i>
              <span style={{ color: '#8A39E1' }}>
                 {exchange.trust_score}
              </span>
          </Text>
          <br />
          <Text>
              <i style={{ fontWeight: '500', marginRight: '8px' }}>Website : </i>
            <a href={exchange.url} target="_blank" rel="noopener noreferrer">
                <span>
                    {exchange.url}    
                </span>
            </a>
          </Text>
          <br />
          <Text style={descStyle}>
            {exchange.description}
          </Text>
          <br />
        </Col>
      </Row>
    </Panel>
      ));

  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        {renderExchanges()}
      </Collapse>
    </div>
  );
}

