const Modal = ({ isVisible, children, onClose, className }) => {
  if (!isVisible) return null
  return (
    <div className="fixed inset-0 bg-opacity-25 backdrop-blur-[2px] flex justify-center items-center z-50 bg-slate-400">
      <div className={`relative w-full max-h-full ${className}`}>
        <div className="relative bg-white rounded-lg shadow">
          <button
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            onClick={() => onClose()}
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>

          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal