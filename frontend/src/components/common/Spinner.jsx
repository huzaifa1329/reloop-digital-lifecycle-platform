import { LoaderCircle } from "lucide-react";

function Spinner({ size = 20 }) {
  return (
    <LoaderCircle
      size={size}
      className="animate-spin text-reloop-orange"
      aria-label="Loading"
    />
  );
}

export default Spinner;