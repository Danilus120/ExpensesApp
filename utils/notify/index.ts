import toast from "react-hot-toast";

const notifySuccess = (string: string) =>
  toast.success(string, {
    position: "bottom-right",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });

export { notifySuccess };
