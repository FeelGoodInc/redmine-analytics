import React from 'react';

declare global {
  namespace JSX {
    /* eslint-disable @typescript-eslint/no-empty-object-type*/
    interface Element extends React.JSX.Element {}
    interface ElementClass extends React.JSX.ElementClass {}
    interface ElementAttributesProperty extends React.JSX.ElementAttributesProperty {}
    interface ElementChildrenAttribute extends React.JSX.ElementChildrenAttribute {}

    type LibraryManagedAttributes<C, P> = React.JSX.LibraryManagedAttributes<C, P>;

    interface IntrinsicAttributes extends React.JSX.IntrinsicAttributes {}
    interface IntrinsicClassAttributes<T> extends React.JSX.IntrinsicClassAttributes<T> {}
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
  }
}

export default global;