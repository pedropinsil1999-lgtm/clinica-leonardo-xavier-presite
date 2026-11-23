"use client";
import { createContext, useContext } from "react";
export type Tipo = "consulta" | "avaliacao" | "retorno" | "naosei";
export type OpenOpts = { origem: string; tipo?: Tipo; tratamento?: string };
export const AgendarCtx = createContext<{ open: (o: OpenOpts) => void }>({ open: () => {} });
export const useAgendar = () => useContext(AgendarCtx);
