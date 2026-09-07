"use client";

import { useEffect } from "react";

function watchingCheckout(): boolean {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname + window.location.search;
  const onCheckout = /checkout|confirm-payment|create-payment/i.test(path);
  if (!onCheckout) return false;
  const framed = window.self !== window.top;
  const watch = new URLSearchParams(window.location.search).has("a36watch");
  return framed || watch;
}

function cover(node: Element) {
  const host = node.parentElement;
  if (!host || host.querySelector("[data-a36-card-mask]")) return;
  const style = window.getComputedStyle(host);
  if (style.position === "static") host.style.position = "relative";
  const mask = document.createElement("div");
  mask.setAttribute("data-a36-card-mask", "1");
  mask.setAttribute("aria-hidden", "true");
  mask.style.cssText = [
    "position:absolute",
    "inset:0",
    "z-index:30",
    "display:flex",
    "align-items:center",
    "justify-content:center",
    "border-radius:12px",
    "background:#eef2f6",
    "color:#64748b",
    "letter-spacing:0.28em",
    "font-size:15px",
  ].join(";");
  mask.textContent = "•••• •••• •••• ••••";
  host.appendChild(mask);
}

function maskNow() {
  document
    .querySelectorAll(
      'iframe[name^="__privateStripeFrame"], iframe[src*="js.stripe.com"], iframe[src*="stripe.com/v3"]',
    )
    .forEach(cover);

  document.querySelectorAll("input").forEach((input) => {
    const hint = `${input.autocomplete} ${input.name} ${input.id} ${input.placeholder}`.toLowerCase();
    if (!/cc-|card.?number|cardnumber|pan/.test(hint)) return;
    input.value = "";
    input.setAttribute("readonly", "readonly");
    cover(input);
  });
}

/** Clarity-style: show checkout, hide card digits. Only when this page is being watched. */
export default function MaskCardFields() {
  useEffect(() => {
    if (!watchingCheckout()) return;
    maskNow();
    const observer = new MutationObserver(maskNow);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
