import { useEffect, useState } from 'react';
// эта вся муть ради адаптива,потому что не смог добраться до стилей css библиотеки react-star-ratings
// при помощи свойства window.innerWidth определяем размеры экрана пользователя
export const useMediaQuery = () => {
  //делаем проверку,если на клиенте, отдаём объек window, если нет то innerWidth: 0
  const getWindowWidth = () => {
    const { innerWidth: windowWidth } =
      typeof window !== 'undefined' ? window : { innerWidth: 0 };

    return { windowWidth };
  };

  const [screenWidth, setScreenWidth] = useState(getWindowWidth());
  useEffect(() => {
    // Функция для обработки изменений размера экрана
    const handleResize = () => {
      setScreenWidth(getWindowWidth());
    };

    // Добавляем слушатель события resize
    window.addEventListener('resize', handleResize);

    // Очистка слушателя события при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Пустой массив зависимостей, чтобы слушатель события добавлялся только один раз при монтировании компонента

  // Рассчитываем размер звездочек в зависимости от ширины экрана
  const starSize = () => {
    if (screenWidth.windowWidth < 1300 && screenWidth.windowWidth >= 1024) {
      return '9.8';
    }
    if (screenWidth.windowWidth < 1024 && screenWidth.windowWidth >= 940) {
      return '9.5';
    }
    if (screenWidth.windowWidth < 940 && screenWidth.windowWidth >= 820) {
      return '9';
    }
    if (screenWidth.windowWidth < 820 && screenWidth.windowWidth >= 768) {
      return '8.5';
    }
    if (screenWidth.windowWidth < 768 && screenWidth.windowWidth >= 640) {
      return '8';
    }

    if (screenWidth.windowWidth < 640 && screenWidth.windowWidth >= 520) {
      return '7.5';
    }
    if (screenWidth.windowWidth < 520 && screenWidth.windowWidth >= 420) {
      return '7.3';
    }
    if (screenWidth.windowWidth < 420 && screenWidth.windowWidth >= 320) {
      return '7';
    }
    return '10';
  };
  return { size: starSize() };
};
