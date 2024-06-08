import dayjs from "dayjs";

export const formatNumber = (num: number) => {
  return num.toLocaleString();
};

export const formatDate = (date: string, format?: string) => {
  if (format) {
    return dayjs(date).format(format);
  }
  return dayjs(date).format("YYYY년 MM월 DD일");
};
