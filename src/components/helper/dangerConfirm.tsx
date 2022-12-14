import { ReactElement, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './confirm.css';

type confirmDangerType = {
  icon: ReactElement
  text: ReactElement
  onCancel?: (onClose: () => void) => void
  onConfirm?: (onClose: () => void, onComplate: ()=> void) => void
  cancelText?: string
  confirmText?: string
}
interface dangerTplType extends confirmDangerType {
  onClose: () => void
}
const ConfirmTemplate = ({ icon, text, onCancel, cancelText, onConfirm, confirmText, onClose }: dangerTplType) => {
  const [progress, setProgress] = useState(false);
  const onButtonConfirmClick = () => {
    setProgress(true);
    onConfirm && onConfirm(onClose, ()=> setProgress(false));
  }
  return (
    <div data-cy="modal-delete" className="flex py-5 rounded-lg gap-2 flex-col shadow-lg min-h-[68px] items-center px-4 bg-white min-w-[250px]  md:min-w-[400px]">
      <div>{icon}</div>
      <div>{text}</div>
      <div className="flex mt-4 flex-row gap-4">
        {onCancel && <button data-cy="modal-delete-cancel-button" onClick={() => onCancel(onClose)} className="py-2 px-8 shadow bg-[#F4F4F4] rounded-full">{cancelText || "Batal"}</button>}
        {onConfirm && <button data-cy="modal-delete-confirm-button" onClick={onButtonConfirmClick} className={`py-2 px-8 shadow text-white bg-[#ED4C5C] rounded-full${progress? " bg-opacity-10" : ""}`}>{confirmText || "Hapus"}</button>}
      </div>
    </div>
  )
}

export default function dangerConfirm(props: confirmDangerType) {
  confirmAlert({
    customUI: ({ onClose }) => (<ConfirmTemplate onClose={onClose} {...props} />)
  });
}