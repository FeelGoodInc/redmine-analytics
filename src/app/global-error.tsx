'use client';
import { Error500 } from 'components/Errors';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError(props: GlobalErrorProps): JSX.Element {
  return (
    <html>
      <body>
        <Error500 {...props} />
      </body>
    </html>
  );
}