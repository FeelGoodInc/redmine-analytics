import Link              from 'next/link';
import { HOME_PAGE_URL } from 'constants/global';
import styles            from './errors-common.module.scss';

export function Error404(): JSX.Element {
  return (
    <div className="column size100">
      <div className={styles.error}>
        <h2 className="text light"> 404 - Такой страницы не существует</h2>
        <div>
          Страница была удалена или не существует, попробуйте уточнить адрес или {''}
          <Link href={HOME_PAGE_URL}>вернуться на главную</Link>
        </div>
      </div>
    </div>
  );
}