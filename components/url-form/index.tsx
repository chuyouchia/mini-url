import { Button, notification, Tooltip, Typography } from 'antd';
import Search from 'antd/lib/input/Search';
import React from 'react';
import { useUrlForm } from './hooks/use-url-form';
import { CopyOutlined } from '@ant-design/icons';


const { Text, Title } = Typography;

const openNotification = () => {
    notification.open({
      message: '',
      description:
        'Text copied',
    });
  };

export function UrlForm(): JSX.Element {
    const {shortenedUrl, setUrlToBeShortened, onSubmitUrl, urlFormErrorMessage} = useUrlForm();

    return (
    <form style={{minWidth: '800px'}}>
        {/* <input type="text" onChange={(event) => setUrlToBeShortened(event.target.value)} /><br /> */}
        {/* <Input.Group>
            <Input style={{ width: 'calc(100% - 20%)' }}
                placeholder="Enter your url here" 
                allowClear
                onChange={(event) => setUrlToBeShortened(event.target.value)} 
            />
            <Button type="primary" onClick={onSubmitUrl}>Shorten it!</Button>
        </Input.Group> */}
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
    </form>
    )
}
