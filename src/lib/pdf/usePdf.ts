import { useLayoutEffect, useRef, useState, type ReactElement } from "react";
import type { DocumentProps } from "@react-pdf/renderer";
import { configureFonts } from "./configureFonts";

type PdfState = {
  status: "editing" | "generating" | "ready" | "error";
  url: string;
  error: string;
};
const empty: PdfState = { status: "editing", url: "", error: "" };
const release = (url: string) => {
  if (url) window.setTimeout(() => URL.revokeObjectURL(url), 1500);
};
export function usePdf<T>(source: T) {
  const [state, setState] = useState<PdfState>(empty);
  const job = useRef(0);
  const busy = useRef(false);
  const currentUrl = useRef("");
  const signature = JSON.stringify(source);
  const invalidate = () => {
    job.current++;
    busy.current = false;
    release(currentUrl.current);
    currentUrl.current = "";
    setState(empty);
  };
  useLayoutEffect(() => {
    const generation = job;
    job.current++;
    busy.current = false;
    release(currentUrl.current);
    currentUrl.current = "";
    setState(empty);
    return () => {
      generation.current++;
      busy.current = false;
      release(currentUrl.current);
      currentUrl.current = "";
    };
  }, [signature]);
  const generate = async (
    create: (snapshot: T) => Promise<ReactElement<DocumentProps>>,
  ) => {
    if (busy.current) return;
    busy.current = true;
    const ticket = ++job.current;
    const snapshot = structuredClone(source);
    release(currentUrl.current);
    currentUrl.current = "";
    setState({ status: "generating", url: "", error: "" });
    try {
      const { pdf, Font } = await import("@react-pdf/renderer");
      configureFonts(Font);
      const document = await create(snapshot);
      const blob = await pdf(document).toBlob();
      if (ticket !== job.current) return;
      currentUrl.current = URL.createObjectURL(blob);
      setState({ status: "ready", url: currentUrl.current, error: "" });
    } catch {
      if (ticket === job.current)
        setState({
          status: "error",
          url: "",
          error:
            "Não foi possível gerar o PDF. Seus dados continuam aqui. Verifique a conexão e tente novamente.",
        });
    } finally {
      if (ticket === job.current) busy.current = false;
    }
  };
  return { ...state, invalidate, generate };
}
