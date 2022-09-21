import React from "react"
import type { NextPage } from 'next'
import { UrlForm } from '../components/url-form'
import { Layout, Col, Row } from 'antd';
const { Header, Footer, Content } = Layout;
import 'antd/dist/antd.dark.css';

const Home: NextPage = () => {

  return (
  <Layout style={{minHeight: '100%'}}>
    <Header>Mini-Urlz</Header>
    <Row justify="space-between" align="middle" style={{height: '1000px'}}>

      <Col offset={8}>
      <UrlForm/>
      </Col>
    </Row>
      {/* <UrlForm/> */}
    <Footer/>
  </Layout>);
}

export default Home
