export function shuffle<T>(array: T[]) {
  return array.sort(() => Math.random() - 0.5);
}

export const formatTime = (seconds: number) => {
  const getSeconds = `0${seconds % 60}`.slice(-2);
  const minutes = `${Math.floor(seconds / 60)}`;
  const getMinutes = `0${Number(minutes) % 60}`.slice(-2);
  const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);

  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

export const getGrade = (score: number) => {
  if (score >= 80) {
    return { message: '합격입니다', color: '#4CAF50' };
  } else if (score >= 60) {
    return { message: '잘했어요', color: '#2196F3' };
  } else if (score >= 40) {
    return { message: '잘한 건 아니에요', color: '#FFEB3B' };
  } else if (score >= 20) {
    return { message: '좀 더 노력하세요', color: '#FF9800' };
  } else {
    return { message: '안타깝네요', color: '#F44336' };
  }
};
