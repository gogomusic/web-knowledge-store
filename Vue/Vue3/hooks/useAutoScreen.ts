import { onMounted, onUnmounted } from "vue";

export interface Options {
  //缩放模式
  type: "zoom" | "transform",
}

/**
 * 自动化缩放
 * @param width 设计稿的宽度
 */
const useAutoScreen = (
  width: number = 1920,
  height: number = 1080,
  options?: Options
) => {

  const newOptions = Object.assign({ type: "zoom" }, options || {});

  const initStyles = {} as CSSStyleDeclaration;

  const func = () => {
    const styles = {
      width: width + "px",
      height: height + "px"
    };

    if (newOptions.type === "zoom") {
      Object.assign(styles, {
        zoom: String(window.innerWidth / width)
      });
    } else {
      Object.assign(styles, {
        transformOrigin: "left top",
        transform: `scale(${window.innerWidth / width})`
      });
    }
    Object.assign(document.body.style, styles);
  };

  onMounted(() => {
    const style = document.body.style;
    // 存储初始style
    Object.assign(initStyles, {
      transform: style.transform,
      zoom: style["zoom"],
      transformOrigin: style.transformOrigin,
      width: style.width,
      height: style.height,
    });
    func();
    window.addEventListener("resize", func);
  });

  onUnmounted(() => {
    // 还原初始style
    Object.assign(document.body.style, initStyles);
  });

};

export default useAutoScreen;
