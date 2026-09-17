import { Component, type ReactNode } from "react";
import { Link } from "react-router-dom";
export class RouteBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <div
          role="alert"
          style={{ maxWidth: 800, margin: "48px auto", padding: 24 }}
        >
          <h1>Não foi possível abrir o formulário</h1>
          <p>
            Verifique a conexão. Você pode voltar ao catálogo ou recarregar esta
            página para tentar novamente.
          </p>
          <Link to="/">Voltar aos formulários</Link>
          <p>
            <button onClick={() => window.location.reload()}>
              Recarregar página
            </button>
          </p>
        </div>
      );
    return this.props.children;
  }
}
