'use client';
import { type ReactNode } from 'react';
import {
  type ViewHeaderProps,
  ViewHeader,
}                         from './Header';
import isEmpty            from 'lodash/isEmpty';
import cns                from 'classnames';
import styles             from './view.module.scss';

export interface ViewProps extends ViewHeaderProps {
  className?: string;
  children?: ReactNode;
  hideTitle?: boolean;
  withoutContentTopIndent?: boolean;
}

export const View = ({
  className = '',
  children,
  hideTitle,
  withoutContentTopIndent = false,
  ...rest
}: ViewProps): JSX.Element => {
  const hasActions = !isEmpty(rest?.actions);

  return (
    <div className={styles.root}>
      {!hideTitle && <ViewHeader {...rest} />}

      <div
        className={cns(styles.content, className, {
          [styles.has_actions]: hasActions,
          [styles.without_top_indent]: withoutContentTopIndent,
        })}
      >
        {children}
      </div>
    </div>
  );
};