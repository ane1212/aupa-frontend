export const generateRandomScore = (min = 80, max = 99): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};