import type { AnyObject }                 from 'interfaces';
import type { ReactNode, FC, MouseEvent } from 'react';
import type { ButtonProps }               from 'rsuite';
import { useEffect, useState }            from 'react';
import { ButtonGroup, Button }            from 'rsuite';
import Icon                               from '@rsuite/icons/Icon';
import cns                                from 'classnames';
import * as COLORS                        from 'constants/legendColors';
import {
  MdChevronRight,
  MdExpandMore,
}                                         from 'react-icons/md';
import isEmpty                            from 'lodash/isEmpty';
import isBoolean                          from 'lodash/isBoolean';
import styles                             from './view-block.module.scss';

export type ViewBlockAction = {
  text?: string;
  color?: ButtonProps['color'];
  icon?: FC;
  disabled?: boolean;
  onClick: (e: MouseEvent) => void;
};

export type ViewBlockProps = {
  title: ReactNode;
  isTitleUppercase?: boolean;
  children: ReactNode;
  icon?: FC;
  className?: string;
  expanded?: boolean;
  expandable?: boolean;
  defaultExpanded?: boolean;
  paddingSchema?: boolean[]; //see default value below
  backgroundColor?: 'white' | 'grey' | 'transparent';
  actions?: ViewBlockAction[];
  countBadge?: {
    value: ReactNode;
    color?: keyof typeof COLORS;
  };
  toggleMode?: 'visibility' | 'mount';
  overflowX?: 'auto' | 'unset';
  disabled?: boolean;
};

export const ViewBlock = ({
  title,
  isTitleUppercase = true,
  expanded: controlledExpanded,
  expandable = false,
  defaultExpanded = false,
  children,
  className,
  icon,
  paddingSchema = [ true, true, true, true ], //default css padding format: top, right, bottom, left
  backgroundColor = 'grey',
  actions = [],
  countBadge,
  toggleMode = 'mount',
  overflowX = 'unset',
  disabled = false,
}: ViewBlockProps): JSX.Element => {
  const _controlledExpanded = controlledExpanded ? controlledExpanded : defaultExpanded;
  const initialExpanded = expandable ? _controlledExpanded : true;
  const [ expanded, setExpanded ] = useState<boolean>(initialExpanded);

  useEffect(() => {
    if (isBoolean(controlledExpanded) && expanded !== controlledExpanded) {
      setExpanded(controlledExpanded);
    }
  }, [ controlledExpanded ]);

  // -------------------------------------------------------------------------

  const getAction = (action: ViewBlockAction, index: number): JSX.Element => {
    const {
      onClick = (): void => {},
      icon,
      text,
      color,
      disabled,
    } = action;

    const conditionalProps: AnyObject = {};

    if (color) {
      conditionalProps.appearance = 'primary';
      conditionalProps.color = color;
    }

    const Component = (
      <Button
        key={index}
        className={cns(styles.action, {
          [styles.action_with_text]: !isEmpty(text),
        })}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onClick(e);
        }}
        {...conditionalProps}
      >
        {icon && <Icon as={icon as FC} />}
        {text && <span className={styles.action_text}>{text}</span>}
      </Button>
    );

    return Component;
  };

  // -------------------------------------------------------------------------

  const getContent = (): JSX.Element => (
    <div
      className={cns(styles.content, styles[`${backgroundColor}_bg`], {
        [styles.visible]: !!expanded,
        [styles.padding_top]: paddingSchema[0],
        [styles.padding_right]: paddingSchema[1],
        [styles.padding_bottom]: paddingSchema[2],
        [styles.padding_left]: paddingSchema[3],
      })}
      style={{ overflowX }}
    >
      {children}
    </div>
  );

  // -------------------------------------------------------------------------

  return (
    <div
      className={cns(styles.root, {
        [className]: !!className,
        [styles.expandable]: expandable,
        [styles.expanded]: expanded,
        [styles.with_actions]: !isEmpty(actions),
      })}
    >
      {disabled && <div className={styles.overlay} />}

      <div
        className={styles.header}
        onClick={() => {
          if (expandable) {
            setExpanded(!expanded);
          }
        }}
      >
        {expandable && (
          <div className={styles.arrow}>
            {expanded ? <MdExpandMore /> : <MdChevronRight />}
          </div>
        )}

        {icon && <div className={styles.icon}><Icon as={icon} /></div>}

        <div
          className={cns(
            styles.title, { [styles.titleUppercase]: isTitleUppercase }
          )}
        >
          {title}
        </div>

        {!isEmpty(actions) && (
          <ButtonGroup className={styles.actions}>
            {actions.map((action, index) => getAction(action, index))}
          </ButtonGroup>
        )}

        {countBadge && (
          <div
            className={styles.count_badge}
            style={{ color: COLORS[countBadge.color] }}
          >
            {countBadge.value}
          </div>
        )}
      </div>

      {toggleMode === 'mount' && expanded && getContent()}
      {toggleMode === 'visibility' && getContent()}
    </div>
  );
};

export default ViewBlock;