'use client';
import type { UrlObject }                    from 'url';
import {
  type ReactElement,
  type MouseEvent,
  Fragment,
  forwardRef,
}                                            from 'react';
import {
  type ButtonProps,
  Dropdown,
  Button,
  IconButton,
  ButtonGroup,
  Whisper,
  Popover,
}                                            from 'rsuite';
import Link                                  from 'next/link';
import isEmpty                               from 'lodash/isEmpty';
import cns                                   from 'classnames';
import { MdChevronRight }                    from 'react-icons/md';
import ArrowDownIcon                         from '@rsuite/icons/ArrowDown';
import styles                                from './view-header.module.scss';

export type ViewHeaderAction = {
  icon?: JSX.Element;
  text?: string;
  route?: string | UrlObject;
  href?: string;
  disabled?: boolean;
  menu?: Pick<ViewHeaderAction, 'icon' | 'text' | 'onClick'>[];
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
} & ButtonProps;

export interface ViewHeaderProps {
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
  icon?: JSX.Element;
  withoutBorder?: boolean;
  breadcrumbs?: {
    text: string;
    route?: string | UrlObject;
  }[];
  mainAction?: Omit<ViewHeaderAction, 'color'>;
  actions?: ViewHeaderAction[];
}

const ViewHeaderActionItem = forwardRef((
  {
    text,
    route,
    href,
    disabled,
    color,
    icon,
    menu,
    onClick,
  }: ViewHeaderAction,
  // eslint-disable-next-line
  ref
): JSX.Element => {
  const getActionMenu = (menu: ViewHeaderAction['menu']): JSX.Element[] => {
    return menu.map((subaction, index) => (
      <Dropdown.Item
        key={index}
        {...(subaction.icon ? { icon: subaction.icon } : {})}
        onSelect={subaction.onClick}
      >
        {subaction.text}
      </Dropdown.Item>
    ));
  };

  ViewHeaderActionItem.displayName = 'ViewHeaderActionItem';

  // --------------------------------------------------------------------------

  return (
    <Fragment key={text}>
      <Button
        className={styles.action}
        as={route || href ? 'a' : 'button'}
        disabled={disabled}
        onClick={onClick}
        {...(color ? { appearance: 'primary', color } : {})}
        {...(href && !route ? { href, target: '_blank' } : {})}
      >
        {icon}
        <span className={styles.action_text}>{text}</span>
      </Button>

      {menu && (
        <Whisper
          placement="bottomEnd"
          trigger="click"
          speaker={({
            onClose, left, top, className,
          }, ref) => (
            <Popover
              ref={ref}
              className={className}
              style={{ left, top }}
              full
            >
              <Dropdown.Menu
                className={styles.action_menu}
                onSelect={() => { onClose() }}
              >
                {getActionMenu(menu)}
              </Dropdown.Menu>
            </Popover>
          )}
        >
          <IconButton
            className={styles.action_menu_btn}
            icon={<ArrowDownIcon />}
            {...(color ? { appearance: 'primary', color } : {})}
          />
        </Whisper>
      )}
    </Fragment>
  );
});

// --------------------------------------------------------------------------

export const ViewHeader = ({
  title,
  subtitle,
  withoutBorder = false,
  icon,
  breadcrumbs = [],
  mainAction,
  actions = [],
}: ViewHeaderProps): JSX.Element => {
  const hasActions = !isEmpty(actions);

  // --------------------------------------------------------------------------

  const getBreadcrumbs = (): ReactElement[] => {
    return breadcrumbs.map((item, index) => {
      if (item.route) {
        return (
          <Fragment key={index}>
            <Link
              href={item.route}
              className={styles.breadcrumb}
            >
              {item.text}
            </Link>
            {index !== breadcrumbs.length - 1 && (
              <span className={styles.breadcrumb_delimeter}>
                <MdChevronRight />
              </span>
            )}
          </Fragment>
        );
      }

      return (
        <span
          key={index}
          className={styles.breadcrumb}
        >
          {item.text}
        </span>
      );
    });
  };

  // --------------------------------------------------------------------------

  const getAction = (action: ViewHeaderAction, index: number): JSX.Element => {
    const Component = (
      <ViewHeaderActionItem
        key={action.text}
        {...action}
      />
    );

    if (action.route && !action.disabled) {
      return (
        <Link
          key={index}
          href={action.route}
          passHref
          legacyBehavior
        >
          {Component}
        </Link>
      );
    }

    return Component;
  };

  // --------------------------------------------------------------------------

  return (
    <div
      className={cns(styles.root, {
        [styles.no_border]: withoutBorder,
      })}
    >
      <div className={styles.breadcrumbs}>
        {getBreadcrumbs()}
      </div>

      <div className={styles.content}>
        {icon && (
          <div className={styles.icon}>
            {icon}
          </div>
        )}

        <div
          className={cns(styles.titles, {
            [styles.left_padding]: !!icon,
          })}
        >
          <div className={styles.title}>{title}</div>

          {subtitle && (
            <div className={styles.subtitle}>{subtitle}</div>
          )}
        </div>
      </div>

      {mainAction && (
        <ButtonGroup className={cns(styles.actions, styles.primary_action)}>
          {getAction({ ...mainAction, color: 'green' }, 0)}
        </ButtonGroup>
      )}

      {hasActions && (
        <div className={styles.actions}>
          <ButtonGroup>
            {actions.map(getAction)}
          </ButtonGroup>
        </div>
      )}
    </div>
  );
};