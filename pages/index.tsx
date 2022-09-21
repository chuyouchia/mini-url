import React, { useEffect, useState } from "react"
import type { NextPage } from 'next'
import { UrlForm } from '../components/url-form'
import { Layout, Col, Row } from 'antd';
const { Header, Footer } = Layout;


const TypeWriter = ({ content = "", speed = 1000 }) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    /*Create a new setInterval and store its id*/
    const animKey = setInterval(() => {
      setIndex((index) => {
        /*This setState function will set the index
        to index+1 if there is more content otherwise
        it will destory this animation*/
      
        if (index >= content.length - 1) {
          clearInterval(animKey);
          return index;
        }
        return index + 1;
      });
    }, speed);
  }, []);

  useEffect(() => {
    setDisplayedContent((displayedContent)=>displayedContent + content[index]) 
  }, [index])
  return <span className="type-writer">{displayedContent}</span>;
}

const Home: NextPage = () => {

  return (
  <Layout style={{minHeight: '100%'}}>
    <Header>Mini-Urlz</Header>
    <Row justify="space-between" align="middle" style={{height: '1000px'}}>

      <Col offset={8}>
        <h1 style={{fontSize:'250%'}}>Mini Url: <TypeWriter content="a url shortener app" speed={100}/></h1>
      <UrlForm/>
      </Col>
    </Row>
    <Footer/>
  </Layout>);
}

export default Home
