import { useState, useEffect } from 'react';

//NextJS использует рендеринг на стороне сервера и сравнивает компонент,
//отображаемый на сервере, с компонентом, отображаемым на клиенте.
//Но поскольку для изменения компонента вы используете данные из браузера,
//два рендеринга будут различаться, и Next выдаст вам предупреждение.
// Это хук от Zustand,чтобы устранить конфликт с серверным редеренгом
// он делает так чтобы Zustand немного подождал, прежде чем менять ваши компоненты.
const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

export default useStore;
