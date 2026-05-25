function Spinner() {
  return (
    <div className="opacity-0 animate-[appear_0s_200ms_forwards] flex flex-col justify-center items-center py-16 gap-3">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-green-500 rounded-full animate-spin" />
      <p className="text-slate-400 text-sm">Loading Pokemon...</p>
    </div>
  );
}

export default Spinner;
