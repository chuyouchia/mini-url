import { Button, Result } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

const PageNotFound: React.FC = (): JSX.Element=> {
    const router = useRouter();

  return <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={() => {
        router.replace({pathname: '/'})}}>Back Home</Button>}
  />
};

export default PageNotFound;
