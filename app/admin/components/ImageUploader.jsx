"use client";

import { UploadButton } from "@/lib/uploadthing";
import { X } from "lucide-react";

export default function ImageUploader({ value, onChange, label = "Image" }) {
  return (
    <div>
      <label className="block text-sm font-bold text-neutral-700 mb-2">{label}</label>

      {value ? (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Uploaded"
            className="h-40 w-40 rounded-2xl object-cover border border-neutral-200"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600"
            aria-label="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            const url = res?.[0]?.url || res?.[0]?.ufsUrl;
            if (url) onChange(url);
          }}
          onUploadError={(error) => {
            alert(`Upload failed: ${error.message}`);
          }}
          appearance={{
            button:
              "ut-ready:bg-[#bd902f] ut-uploading:bg-[#a67724] bg-[#bd902f] hover:bg-[#a67724] text-white text-sm font-bold rounded-full px-6 py-3",
            allowedContent: "text-xs text-neutral-500",
          }}
        />
      )}
    </div>
  );
}
