const categoryImages = import.meta.glob('../assets/images/*.jpg', { eager: true });
const categoryCounters = new Map<string, number>();


export const getCategoryImage = (category: string): string => {
    const normalizedCategory = category.trim().toLowerCase();
    
    const currentCount = categoryCounters.get(normalizedCategory) ?? 0;
    
    const nextCount = currentCount + 1;
    categoryCounters.set(normalizedCategory, nextCount);

    const useNumbered = nextCount % 2 === 1;  // 1, 3, 5... → numbered; 2, 4, 6... → base
    
    let numberedImage: string | null = null;
    if (useNumbered) {
        const numberedIndex = Math.floor(nextCount / 2) + 1;  // 1, 2, 3...
        numberedImage = `../assets/images/${normalizedCategory}_${numberedIndex}.jpg`;
    }
    
    const baseImage = `../assets/images/${normalizedCategory}.jpg`;

    if (numberedImage) {
        const numberedModule = categoryImages[numberedImage as keyof typeof categoryImages] as { default?: string } | undefined;
        if (numberedModule?.default) {
            return numberedModule.default;
        }
    }

    const baseModule = categoryImages[baseImage as keyof typeof categoryImages] as { default?: string } | undefined;
    if (baseModule?.default) {
        return baseModule.default;
    }

    return new URL('../assets/images/default.jpg', import.meta.url).href;
};