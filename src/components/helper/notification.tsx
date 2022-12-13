import { ReactElement } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './confirm.css';
type confirmNotifType = {
  icon?: ReactElement
  text: string
}
const ConfirmTemplate = ({icon, text}: confirmNotifType) => (
  <div className="flex rounded-lg gap-3 flex-row shadow-lg min-h-[68px] items-center px-4 bg-white min-w-[400px]">
    {icon} <span>{text}</span>
  </div>
)

export default (props: confirmNotifType) => {
  confirmAlert({
    customUI: () => (<ConfirmTemplate {...props} />)
  });
}