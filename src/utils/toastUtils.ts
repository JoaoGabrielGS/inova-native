import Toast, { ToastPosition } from "react-native-toast-message";

class ToastUtils {
  static isToastVisible = false;

  private static setVisibility(duration: number) {
    ToastUtils.isToastVisible = true;
    setTimeout(() => {
      ToastUtils.isToastVisible = false;
    }, duration);
  }

  static showError(message: string, duration: number = 4000): void {
    if (!ToastUtils.isToastVisible) {
      Toast.show({
        type: "error",
        text1: message,
        visibilityTime: duration,
      });
      this.setVisibility(duration);
    }
  }

  static showSuccess(message: string, duration: number = 4000): void {
    if (!ToastUtils.isToastVisible) {
      Toast.show({
        type: "success",
        text1: message,
        visibilityTime: duration,
      });
      this.setVisibility(duration);
    }
  }

  static showAlert(
    message: string,
    position: ToastPosition = "top",
    duration: number = 4000,
  ): void {
    if (!ToastUtils.isToastVisible) {
      Toast.show({
        type: "info",
        text1: message,
        position: position,
        visibilityTime: duration,
      });
      this.setVisibility(duration);
    }
  }
}

export default ToastUtils;
