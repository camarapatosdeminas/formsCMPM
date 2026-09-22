import { useEffect, type ReactNode } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiGrid, FiChevronRight, FiInfo } from "react-icons/fi";
import { formCatalog, type FormDefinition } from "../../app/formCatalog";
import styles from "./SiteLayout.module.css";

export function SiteLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, [location.pathname]);
  return (
    <>
      <a className={styles.skip} href="#main-content">
        Pular para o conteúdo
      </a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link
            to="/"
            className={styles.brand}
            aria-label="FormsCMPM — página inicial"
          >
            <img src="/images/brasao.png" alt="" width="46" height="58" />
            <span>
              <strong>Câmara Municipal de Patos de Minas</strong>
              <small>FORMULÁRIOS • PORTAL DO SERVIDOR</small>
            </span>
          </Link>
          <nav className={styles.nav} aria-label="Navegação principal">
            <NavLink to="/" end>
              <FiGrid aria-hidden="true" />
              Formulários
            </NavLink>
            {location.pathname === "/" ? (
              <a href="#como-funciona">Como funciona</a>
            ) : (
              <select
                aria-label="Abrir outro formulário"
                value={
                  formCatalog.find(
                    (f) =>
                      f.path.toLowerCase() === location.pathname.toLowerCase(),
                  )?.path || ""
                }
                onChange={(e) => {
                  if (e.target.value) navigate(e.target.value);
                }}
              >
                <option value="">Selecione um formulário</option>
                {formCatalog.map((f) => (
                  <option key={f.id} value={f.path}>
                    {f.name}
                  </option>
                ))}
              </select>
            )}
          </nav>
        </div>
      </header>
      <main className={styles.main} id="main-content" tabIndex={-1}>
        {children}
      </main>
      <footer className={styles.footer}>
        <span>
          <strong>FormsCMPM</strong> · Câmara Municipal de Patos de Minas
        </span>
        <span>Preencha. Gere o PDF. Baixe seu documento.</span>
      </footer>
    </>
  );
}
export function FormPage({
  form,
  children,
}: {
  form: FormDefinition;
  children: ReactNode;
}) {
  useEffect(() => {
    document.title = `${form.name} | FormsCMPM`;
  }, [form.name]);
  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb} aria-label="Localização">
        <Link to="/">Formulários</Link>
        <FiChevronRight aria-hidden="true" />
        <span aria-current="page">{form.name}</span>
      </nav>
      <header className={styles.pageHead}>
        <span className={styles.eyebrow}>{form.category}</span>
        <h1>{form.name}</h1>
        <p>{form.description}</p>
      </header>
      <p className={styles.notice}>
        <FiInfo aria-hidden="true" />
        Os dados ficam nesta página. Ao sair ou recarregar, o preenchimento será
        perdido. Gere e baixe seu PDF antes de sair.
      </p>
      {![
        "ferias",
        "recadastramento",
        "cartaoPonto",
        "dfd",
        "checklistIntroducaoProcessual",
      ].includes(form.id) && (
        <p>
          Os campos são opcionais para gerar o PDF. Preencha as informações que
          se aplicam à sua solicitação.
        </p>
      )}
      {children}
    </div>
  );
}
