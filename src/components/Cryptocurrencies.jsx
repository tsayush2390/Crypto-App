import React, { useEffect, useState } from 'react'
import millify from 'millify'
import {Link} from 'react-router-dom'
import {Card, Row, Col, Input} from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader'


const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10 :100;
  const {data:cryptosList, isFetching} = useGetCryptosQuery(count)
  const [searchTerm, setSearchTerm] = useState('')
  const [cryptos, setCryptos] = useState([])

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm))
    setCryptos(filteredData)
  }, [cryptosList, searchTerm])
  if(isFetching) return <Loader />
  return (
    <>
    {!simplified && (<div className='search-crypto'>
      <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />
    </div> )}
   {viewMode === 'card' ? (
  <Row gutter={[32, 32]} className='crypto-card-container'>
    {sortedCryptos?.map((currency) => (
      <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
        <Link to={`/crypto/${currency.uuid}`}>
          <Card title={`${currency.rank}. ${currency.name}`} extra={<img className='crypto-image' src={currency.iconUrl} />} hoverable>
            <p>Price: {millify(currency.price)}</p>
            <p>Market Cap: {millify(currency.marketCap)}</p>
            <p>Daily Change: {millify(currency.change)}</p>
          </Card>
        </Link>
      </Col>
    ))}
  </Row>
) : (
  <table style={{ width: '100%', marginTop: '1rem' }}>
    <thead>
      <tr>
        <th>Rank</th>
        <th>Name</th>
        <th>Price</th>
        <th>Market Cap</th>
        <th>Daily Change</th>
      </tr>
    </thead>
    <tbody>
      {sortedCryptos?.map((currency) => (
        <tr key={currency.id}>
          <td>{currency.rank}</td>
          <td>
            <Link to={`/crypto/${currency.uuid}`}>
              <img src={currency.iconUrl} style={{ width: 20, marginRight: 8 }} />
              {currency.name}
            </Link>
          </td>
          <td>{millify(currency.price)}</td>
          <td>{millify(currency.marketCap)}</td>
          <td>{millify(currency.change)}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}
    </>
  )
}

export default Cryptocurrencies
