import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean; error?: Error };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-[40vh] items-center justify-center px-6 text-center text-mist-300">
            <div>
              <p className="mb-2 text-sm uppercase tracking-widest text-volt-400">
                3D 组件加载失败
              </p>
              <p className="text-xs opacity-60">
                {this.state.error?.message || "请刷新页面重试"}
              </p>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
