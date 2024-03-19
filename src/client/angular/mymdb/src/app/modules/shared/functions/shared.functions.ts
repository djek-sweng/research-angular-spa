export const getDifferenceInDaysToNow = (
  updatedAt: string | undefined
): number => {
  let dateUpdatedAt = new Date();

  if (updatedAt) {
    dateUpdatedAt = new Date(Date.parse(updatedAt));
  }

  const differenceInTime = new Date().getTime() - dateUpdatedAt.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return parseInt(differenceInDays.toFixed());
};
