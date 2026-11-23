"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
export { gsap, ScrollTrigger, SplitText, useGSAP };
export const EASE = { in: "expo.out", io: "power3.inOut" };
export const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
