import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiArrowUpRight } from "react-icons/fi";
import {
  categories,
  formCatalog,
  normalizeSearch,
} from "../../app/formCatalog";
import { Button } from "../../components/ui/Controls";
import styles from "./HomePage.module.css";
export default function HomePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  useEffect(() => {
    document.title = "FormsCMPM | Formulários do servidor";
  }, []);
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
  const forms = formCatalog.filter(
    (f) =>
      (!category || f.category === category) &&
      terms.every((term) =>
        normalizeSearch(`${f.name} ${f.description} ${f.terms}`).includes(term),
      ),
  );
  const clear = () => {
    setQuery("");
    setCategory("");
    document.getElementById("form-search")?.focus();
  };
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>
            <span className={styles.dot} />
            Serviços administrativos
          </span>
          <h1>
            Seus formulários,
            <br />
            <span>em um só lugar.</span>
          </h1>
          <p>
            Encontre o documento de que precisa, preencha as informações e baixe
            o PDF. Simples, direto e sem papelada.
          </p>
        </div>
        <aside className={styles.guide} id="como-funciona">
          <h2>Do preenchimento ao documento</h2>
          <ol>
            <li>
              <span className={styles.step}>01</span>
              <span>
                <strong>Encontre seu formulário</strong>Busque por nome ou
                explore as categorias.
              </span>
            </li>
            <li>
              <span className={styles.step}>02</span>
              <span>
                <strong>Preencha e confira</strong>Siga as orientações de cada
                formulário.
              </span>
            </li>
            <li>
              <span className={styles.step}>03</span>
              <span>
                <strong>Gere e baixe o PDF</strong>Seu documento fica pronto
                para usar.
              </span>
            </li>
          </ol>
        </aside>
      </section>
      <section aria-labelledby="catalog-title">
        <div className={styles.catalogHead}>
          <h2 id="catalog-title">Qual formulário você precisa?</h2>
          <span className={styles.count} role="status">
            {forms.length} de 17 formulários
          </span>
        </div>
        <div className={styles.search}>
          <label htmlFor="form-search">Buscar formulário</label>
          <FiSearch aria-hidden="true" />
          <input
            id="form-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busque por férias, viagem, documentos…"
          />
          {query && (
            <button
              className={styles.clear}
              onClick={() => {
                setQuery("");
                document.getElementById("form-search")?.focus();
              }}
            >
              Limpar
            </button>
          )}
        </div>
        <div className={styles.filters} aria-label="Categorias">
          <button aria-pressed={!category} onClick={() => setCategory("")}>
            Todos
          </button>
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        {forms.length ? (
          <div className={styles.cards}>
            {forms.map((f) => (
              <Link key={f.id} to={f.path} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.icon}>
                    <f.icon aria-hidden="true" />
                  </span>
                  <span className={styles.category}>{f.category}</span>
                </div>
                <h3>{f.name}</h3>
                <p>{f.description}</p>
                <span className={styles.open}>
                  Abrir formulário
                  <FiArrowUpRight aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <h3>Nenhum formulário encontrado</h3>
            <p>Tente outro termo ou veja todas as categorias.</p>
            <Button onClick={clear} variant="secondary">
              Limpar busca e filtros
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
