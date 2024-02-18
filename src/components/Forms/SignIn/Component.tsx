'use client';

import { useRouter }           from 'next/navigation';
import { Form, Input, Button } from 'antd';
import { FormErrors }          from 'constants/form';
import { API_KEY_COOKIE_NAME } from 'constants/global';
import { setCookie }           from 'cookies-next';

const SignInForm = (): JSX.Element => {
  const { replace } = useRouter();

  // -----------------------------------------------------

  const submit = (formValue: any): void => {
    setCookie(API_KEY_COOKIE_NAME, formValue.key);
    replace('/');
  };

  // -----------------------------------------------------

  const validationFailed = (errorInfo: any): void => {
    console.log('Failed:', errorInfo);
  };

  // -----------------------------------------------------

  return (
    <Form
      layout="vertical"
      onFinish={submit}
      onFinishFailed={validationFailed}
    >
      <Form.Item
        name="key"
        label="API key"
        rules={[
          { required: true, message: FormErrors.required },
          { len: 40, message: FormErrors.length(40) },
        ]}
      >
        <Input />
      </Form.Item>

      <Button
        htmlType="submit"
        type="primary"
        block
      >
        Войти
      </Button>
    </Form>
  );
};

export { SignInForm };
