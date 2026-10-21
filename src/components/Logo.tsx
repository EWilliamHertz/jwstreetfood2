export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Icon Badge */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 shadow-lg shadow-yellow-500/20 text-black font-black text-xl tracking-tighter">
        <span>JW</span>
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-300 rounded-full animate-ping opacity-75" />
      </div>
      
      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span className="font-black text-lg md:text-xl tracking-wider text-white uppercase">
          JW <span className="text-yellow-400">STREETFOOD</span>
        </span>
        <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-400 font-semibold">
          Falköping &bull; Lidköping
        </span>
      </div>
    </div>
  );
}
