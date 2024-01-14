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

  return { screenWidth };
};
