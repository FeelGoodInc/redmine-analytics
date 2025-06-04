import { useRouter }  from 'hooks';
import { Button }     from 'rsuite';
import { FaBug }      from 'react-icons/fa';
import styles         from './errors-common.module.scss';

type ErrorContentProps = {
  error: Error & { digest?: string };
  reset: () => void;
}

export function Error500({
  error,
  reset,
}: ErrorContentProps ): JSX.Element {
  const router = useRouter();

  return (
    <div className="column size100">
      <div className={styles.error}>
        <h2 className="text light"> <FaBug /> Произошел технический сбой</h2>
        <div>
          Что-то в системе сработало не так, поэтому вы видите эту страницу.
        </div>
        <div>
          <Button
            appearance="link"
            onClick={() => { reset() }}
          >
            Перезагрузить страницу
          </Button>
          <Button
            appearance="link"
            onClick={() => { router.back() }}
          >
            Вернуться назад
          </Button>
        </div>
        <div className={styles.details}>
          <div className="text light">{error?.message}</div>
          <div className="text light">{error?.digest}</div>
        </div>
      </div>
    </div>
  );
}