import { Button, notification, Spin, Tooltip, Typography } from 'antd';
import Search from 'antd/lib/input/Search';
import React from 'react';
import { useUrlForm } from './hooks/use-url-form';
import { CopyOutlined } from '@ant-design/icons';
import { Urls } from '@prisma/client';


const { Text, Title } = Typography;

const openNotification = () => {
    notification.open({
      message: '',
      description:
        'Text copied',
    });
  };

export function UrlForm(): JSX.Element {
    const createShortenedUrl = async( urlToBeShortened: string): Promise<Urls> => {
        const value = await fetch('/api/create-short-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: urlToBeShortened }),
        });
    
        const json = await value.json();
        return json as Urls
    }
    const {
        shortenedUrl, 
        setUrlToBeShortened, 
        isLoadingShortenedUrl, 
        onSubmitUrl, 
        urlFormErrorMessage
    } = useUrlForm({ getShortenedUrl: createShortenedUrl});

    return (
    <form style={{minWidth: '800px'}}>
        <Search
        style={{ width: 'calc(100% - 20%)' }}
            placeholder="Enter your url here"
            allowClear
            enterButton="Shorten it!"
            size="large"
            onChange={(event) => setUrlToBeShortened(event.target.value)}
            onSearch={onSubmitUrl}
        />
        <br/>
   { isLoadingShortenedUrl?  <Spin />: 
   <>
   { shortenedUrl && (
    <Title level={3} >
        <br/>Shortened URL: <Text type="success">
            {shortenedUrl} 
            </Text>
            <Tooltip title="copy url">
                <Button icon={<CopyOutlined onClick={() => {
                    navigator.clipboard.writeText(shortenedUrl);
                    openNotification();
                    }}/>} />
            </Tooltip>
        <br/>
    </Title>
   )}
    { urlFormErrorMessage && (
        <Title level={3} >
            <br/>
            Error: <Text type="warning">
            {urlFormErrorMessage}
            </Text>
            <br />
        </Title>
        )}
    </>
    }
    
    </form>
    )
}
