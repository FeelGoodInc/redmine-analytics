import { redirect }            from 'next/navigation';
import { cookies }             from 'next/headers';
import { SignInForm }          from 'components/Forms/SignIn/Component';
import { API_KEY_COOKIE_NAME } from 'constants/global';
import styles                  from './sign-in-page.module.scss';

export default function SignInPage() {
  const apiKey = cookies().get(API_KEY_COOKIE_NAME);
  
  if (apiKey) {
    redirect('/');
  }

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.title}>
          Redmine Analytics 0.0.1-A
        </div>

        <div className={styles.form}>
          <SignInForm />
        </div>
      </div>
    </div>
  )
};