

export function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {r: 0, g: 0, b: 0};
}

export function rgbToHex(r: number, g: number, b: number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function rgbaToString(r: number, g: number, b: number, a: number, change : number = 0, lighter : boolean = true) {

    const colors = [r, g, b];
    const factor = 

    colors.forEach((c, index) => {
        const factor = lighter ? (255-c) * change : -1 * (c - 0) * change
        colors[index] = c + factor;
    })

    return `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, ${a})`;
}