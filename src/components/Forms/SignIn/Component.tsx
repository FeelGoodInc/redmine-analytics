'use client';

import { Form, Input, Button } from 'antd';
import { FormErrors }          from 'constants/form';

const SignInForm = (): JSX.Element => {

  // -----------------------------------------------------

  const submit = (formValue: any): void => {
    console.log(formValue);
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
