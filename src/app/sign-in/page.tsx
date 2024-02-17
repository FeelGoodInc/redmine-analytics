import { SignInForm } from 'components/Forms/SignIn/Component';
import styles         from './sign-in-page.module.scss';

export default function SignInPage() {
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