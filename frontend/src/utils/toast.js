import { toast } from "react-toastify";

export const notify = (message, type) => toast(message, { autoClose: 5000, type: type });;

