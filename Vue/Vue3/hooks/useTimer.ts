import { onMounted, onBeforeUnmount, watch } from "vue";

/**
 * by 执着（zlm）
 */
interface UseTimerOptions {
  //开始定时的时候是否立即执行callback
  immediate?: boolean;
  //是否在组件挂载时就开启定时器
  initLoad?: boolean;
  //是否报错就停止
  errorStop?: boolean;
  //开启调试
  debug?: boolean;
}

type CallbackFunction = () => Promise<any> | void
/**
 * 定时器
 */
const useTimer = (
  callback: CallbackFunction = () => {
  },
  ms: number = 1000,
  options?: UseTimerOptions
) => {
  //初始化参数
  const {
    immediate = true,
    initLoad = true,
    errorStop = false,
    debug = false
  } = options || {} as UseTimerOptions;

  //timerId当前调用链
  let timerId = -1;

  /**
   * 清除定时器
   */
  const endTimer = () => {
    // debug && console.log(`【useTimer ${timerId}】销毁定时器成功`);
    timerId++;
  };

  /**
   * 组件卸载结束事件
   */
  onBeforeUnmount(() => {
    //组件卸载时，清理定时器，防止内存泄露
    endTimer();
  });

  //检查当前定时器状态
  const checkCurrentTimerStatus = (currentTimerId) => {
    if (currentTimerId === timerId) {
      return true;
    }
    debug && console.log(`定时器【${currentTimerId}】已终止运行`)
    return false;
  }


  /**
   * 开启定时器
   * @param currentTimerId 当前调用链ID
   */
  const _startTimer = async (currentTimerId: number) => {
    if (immediate) {
      checkCurrentTimerStatus(currentTimerId) && await runCallback();
    }
    const timerFunc = async (currentTimerId: number) => {
      checkCurrentTimerStatus(currentTimerId) && await new Promise((resolve) => setTimeout(resolve, ms));
      checkCurrentTimerStatus(currentTimerId) && await runCallback();
      checkCurrentTimerStatus(currentTimerId) && await timerFunc(currentTimerId)
    };
    await timerFunc(currentTimerId);
  };

  /**
   * run执行回调
   * @param errorStop 错误是否立即停止
   */
  const runCallback = async () => {
    try {
      debug && console.debug(`执行回调中`);
      return await callback();
    } catch (e) {
      debug && console.debug(`回调执行错误`, e);
      if (errorStop) {
        endTimer();
        //向外抛出，中断执行链
        throw e;
      }
    }
  };

  /**
   * 开启定时器
   */
  const startTimer = () => {
    endTimer()
    _startTimer(timerId);
    debug && console.debug(`定时器【${timerId}】成功`);
  };

  /**
   * 重启定时器
   */
  const restartTimer = () => {
    startTimer();
  };


  initLoad && startTimer()


  return {
    startTimer,
    restartTimer,
    endTimer,
    callback
  };

};

export default useTimer;
