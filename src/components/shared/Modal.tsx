export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-surface-container-lowest rounded-2xl shadow-xl w-full max-w-md p-6 relative border border-outline-variant/20">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-on-surface-variant hover:bg-surface-container rounded-full w-8 h-8 flex items-center justify-center transition-colors"
        >
          X
        </button>
        <h2 className="text-xl font-bold font-headline mb-6 text-on-surface">{title}</h2>
        {children}
      </div>
    </div>
  );
}
