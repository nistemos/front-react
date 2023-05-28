"use client";
import { CloudArrowUpIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Toast, { showToastInfo } from "@/components/Toast";
import "react-toastify/dist/ReactToastify.css";
const features = [
  {
    name: "Push to deploy",
    description:
      "Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "SSL certificates",
    description:
      "Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.",
    icon: LockClosedIcon,
  },
];

export default function HomeDashBoard() {
  const handleButtonClick = () => {
    showToastInfo("¡Notificación exitosa!");
  };
  return (
    <>
      <button onClick={handleButtonClick}>Mostrar notificación</button>
      <Toast />
    </>
  );
}
