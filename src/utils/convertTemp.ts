export const convertTemp = (temp: number, fromUnit: 'C' | 'F', toUnit: 'C' | 'F', forCelsius: boolean = false): number => {
    if (fromUnit === toUnit) return temp;

    if (fromUnit === 'C' && toUnit === 'F') {
        return (temp * 9 / 5) + 32;
    }

    if (fromUnit === 'F' && toUnit === 'C' && forCelsius) {
        return (temp - 32) * 5 / 9;
    }

    return temp;
};