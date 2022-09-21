import React, { PropsWithChildren } from 'react';

interface IErrorBoundaryOwnProps {}

interface IErrorBoundaryState {
  hasError: boolean;
}

/** Error boundary for displaying proper UI feedback when error happens */
class ErrorBoundary extends React.Component<
  IErrorBoundaryOwnProps,
  IErrorBoundaryState
> {
  state: IErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError = (error: any) => {
    return { hasError: true };
  };

  componentDidCatch = (error: any, info: any) => {
    // log caught error
    console.error('Boundary error caught', error, info);
  };

  render = () => {
    return this.state.hasError ? (
      <div>
        &#9888; An error has occured&nbsp;
        <button onClick={() => this.setState({ hasError: false })}>
          Return
        </button>
      </div>
    ) : (
      this.props.children
    );
  };
}

export default ErrorBoundary;
