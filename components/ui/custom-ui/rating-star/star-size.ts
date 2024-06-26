// Рассчитываем размер звездочек в зависимости от ширины экрана
export const starSize = {
  small(screenWidth: any) {
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
    if (screenWidth.windowWidth < 520) {
      return '5.5';
    }

    return '10';
  },
  middle(screenWidth: any) {
    if (screenWidth.windowWidth < 1300 && screenWidth.windowWidth >= 1024) {
      return '14';
    }
    if (screenWidth.windowWidth < 1024 && screenWidth.windowWidth >= 940) {
      return '12';
    }
    if (screenWidth.windowWidth < 940 && screenWidth.windowWidth >= 820) {
      return '11';
    }
    if (screenWidth.windowWidth < 820 && screenWidth.windowWidth >= 768) {
      return '10';
    }
    if (screenWidth.windowWidth < 768 && screenWidth.windowWidth >= 640) {
      return '8';
    }

    if (screenWidth.windowWidth < 640 && screenWidth.windowWidth >= 520) {
      return '7.5';
    }
    if (screenWidth.windowWidth < 520) {
      return '7.5';
    }

    return '15';
  },
  big(screenWidth: any) {
    if (screenWidth.windowWidth < 640) {
      return '16';
    }

    return '18';
  },
};
