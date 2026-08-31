import { useRef, useState } from "react";
import { ImagePlus, Upload, X } from "lucide-react";

const MAX_SIZE_MB = 4;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function ImageUpload({ value, onChange, label = "Product photo" }) {
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  function processFile(file) {
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please upload a JPG, PNG or WEBP image.");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Image must be smaller than ${MAX_SIZE_MB}MB.`);
      return;
    }

    setError("");

    // No Cloudinary/object storage yet (Week 45 territory) — store as a
    // data URL so the image persists in this session and previews instantly.
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  }

  function handleInputChange(event) {
    processFile(event.target.files?.[0]);
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);
    processFile(event.dataTransfer.files?.[0]);
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-reloop-espresso">
        {label}
      </label>

      {value ? (
        <div className="relative w-full max-w-xs overflow-hidden rounded-2xl border border-reloop-espresso/10">
          <img
            src={value}
            alt="Product preview"
            className="h-48 w-full object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Remove image"
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-reloop-espresso/80 text-white transition-colors hover:bg-reloop-espresso"
          >
            <X size={15} />
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-reloop-espresso shadow-sm hover:bg-white"
          >
            <Upload size={13} />
            Replace
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`flex w-full max-w-xs flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
            dragging
              ? "border-reloop-orange bg-reloop-orange/5"
              : "border-reloop-espresso/15 hover:border-reloop-espresso/30 hover:bg-reloop-neutral/40"
          }`}
        >
          <ImagePlus size={22} className="text-reloop-espresso/35" />
          <span className="text-xs font-medium text-reloop-espresso/60">
            Click or drag a photo here
          </span>
          <span className="text-[10px] text-reloop-espresso/35">
            JPG, PNG or WEBP, up to {MAX_SIZE_MB}MB
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        onChange={handleInputChange}
        className="hidden"
      />

      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default ImageUpload;
