export default function AuthButtons() {
  return (
    <div className="m-3 flex justify-end gap-2 z-10">
      <button className="px-4 py-1 rounded-full text-white bg-[#002238] hover:bg-[#003152] transition-colors text-sm md:text-base">
        SIGN IN
      </button>
      <button className="px-4 py-1 rounded-full text-white bg-[#0071bc] hover:bg-[#0085df] transition-colors text-sm md:text-base">
        REGISTER
      </button>
    </div>
  )
}
