'use client';
import {
  useRef,
  useState,
}                            from 'react';
import { useRouter }         from 'hooks';
import {
  type FormInstance,
  Form,
  Button,
}                            from 'rsuite';
import { StringType }        from 'schema-typed';
import { setCookie }         from 'helpers/cookies';
import {
  HOME_PAGE_URL,
  TOKEN_COOKIE_NAME
}                            from 'constants/global';
import styles                from './auth-view.module.scss';

const emptyModel = { api_key: '' };

export const AuthView = (): JSX.Element => {
  const [ formValue, setFormValue ] = useState({ ...emptyModel });
  const [ formError, setFormError ] = useState({});
  const router = useRouter();
  const form = useRef<FormInstance>(null);

  // ---------------------------------------------------------------------------

  const letMeIn = (value): void => {
    setCookie(TOKEN_COOKIE_NAME, value.api_key);
    router.replace(HOME_PAGE_URL);
  };

  // ---------------------------------------------------------------------------

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.header}>
          Редмайн анал
        </div>
        
        <div className={styles.form}>
          <Form
            ref={form}
            formValue={formValue}
            formError={formError}
            checkTrigger="blur"
            fluid
            onChange={setFormValue}
            onCheck={setFormError}
            onSubmit={letMeIn}
          >
            <Form.Group controlId="username">
              <Form.ControlLabel className="required">Ключ API</Form.ControlLabel>
              <Form.Control
                name="api_key"
                size="lg"
                placeholder=""
                rule={StringType().isRequired('Обязательное поле')}
              />
            </Form.Group>

            <Button
              appearance="primary"
              color="green"
              type="submit"
              size="lg"
              block
            >
              Войти
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};