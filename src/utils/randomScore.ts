export const generateRandomScore = (seed?: string, min = 80, max = 99): number => {
    if (seed) {
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            hash = (hash * 31 + seed.charCodeAt(i)) & 0xffffffff;
        }
        return min + Math.abs(hash) % (max - min + 1);
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
