import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
}) {
  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-reloop-espresso/40 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            className={`w-full ${sizes[size]} rounded-3xl bg-reloop-ivory shadow-2xl`}
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-reloop-espresso/10 px-5 py-4 sm:px-6">
              <h2 className="font-display text-lg font-bold text-reloop-espresso">
                {title}
              </h2>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-reloop-espresso/50 transition-colors hover:bg-reloop-neutral hover:text-reloop-espresso"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;