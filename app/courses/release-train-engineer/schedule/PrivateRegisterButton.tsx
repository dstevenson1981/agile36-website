"use client";

import { useState } from "react";
import PrivateCohortContactModal from "@/app/components/PrivateCohortContactModal";

export default function PrivateRegisterButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex rounded-lg bg-[#1f2c4a] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#16243f]"
      >
        Contact Us to Register
      </button>
      <PrivateCohortContactModal
        open={open}
        onClose={() => setOpen(false)}
        courseSlug="release-train-engineer"
        courseLabel="SAFe Release Train Engineer (RTE)"
      />
    </>
  );
}
