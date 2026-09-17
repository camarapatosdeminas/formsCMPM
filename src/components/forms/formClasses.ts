import styles from "./FormSurface.module.css";
export const formClasses = (value: string) =>
  value
    .split(/\s+/)
    .map((name) => styles[name] || name)
    .join(" ");
