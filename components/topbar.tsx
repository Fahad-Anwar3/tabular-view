export const Topbar = () => {
  return (
    <div className="w-full bg-[#0e1b2c] p-4 flex items-center justify-end gap-2">
      <button className="px-4 py-1 rounded-full text-white bg-[#002238] hover:bg-[#003152] transition-colors">
        SIGN IN
      </button>
      <button className="px-4 py-1 rounded-full text-white bg-[#0071bc] hover:bg-[#0085df] transition-colors">
        REGISTER
      </button>
    </div>
  );
};
