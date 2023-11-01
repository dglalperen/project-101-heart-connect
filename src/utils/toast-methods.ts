import Toast, { ToastShowParams } from "react-native-toast-message";

export const showSuccessToast = (message: string, params?: ToastShowParams) => {
  Toast.show({
    type: "success",
    text1: message,
    ...params,
  });
};

export const showErrorToast = (message: string, params?: ToastShowParams) => {
  Toast.show({
    type: "error",
    text1: message,
    ...params,
  });
};

export const showNormalToast = (message: string, params?: ToastShowParams) => {
  Toast.show({
    type: "info",
    text1: message,
    ...params,
  });
};
