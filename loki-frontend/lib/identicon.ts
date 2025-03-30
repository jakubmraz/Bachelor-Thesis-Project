import crypto from 'crypto';

// Expanded, colorblind-friendly palette (excluding black and white for background)
const SAFE_COLORS = [
    "#E69F00", // orange
    "#56B4E9", // sky blue
    "#009E73", // teal/green
    "#F0E442", // yellow
    "#0072B2", // strong blue
    "#D55E00", // reddish orange
    "#CC79A7", // pink
    "#117733"  // forest green
];

// Deterministic SHA-256 hash of a ballot object
export function generateBallotHash(ballot: { timestamp: string; id: string }): string {
    const ballotString = `${ballot.timestamp}:${ballot.id}`; // No randomness
    return crypto.createHash('sha256').update(ballotString).digest('hex');
}

// Deterministic background color from hash
export function hashToColor(hash: string): string {
    const index = parseInt(hash.substring(0, 2), 16) % SAFE_COLORS.length;
    return SAFE_COLORS[index];
}

// Utility: Calculate relative luminance of a color
function getLuminance(hex: string): number {
    const rgb = hex.match(/\w\w/g)!.map(x => parseInt(x, 16) / 255);
    const [r, g, b] = rgb.map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Utility: Calculate contrast ratio between two colors
function getContrast(hex1: string, hex2: string): number {
    const lum1 = getLuminance(hex1);
    const lum2 = getLuminance(hex2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}

// Choose high-contrast foreground color (black or white)
export function hashToColors(hash: string): { bg: string; fg: string } {
    const bg = hashToColor(hash);
    const blackContrast = getContrast(bg, "#000000");
    const whiteContrast = getContrast(bg, "#FFFFFF");

    const fg = blackContrast >= whiteContrast ? "#000000" : "#FFFFFF";
    return { bg, fg };
}

// Generate symmetrical identicon from hash
export function generateIdenticon(
    hash: string,
    size = 5
): { grid: boolean[][]; colors: { bg: string; fg: string } } {
    const colors = hashToColors(hash);
    const grid: boolean[][] = [];

    for (let i = 0; i < size; i++) {
        const row: boolean[] = [];
        for (let j = 0; j < size; j++) {
            const position = i * size + j;
            const hexChar = hash[position % hash.length];
            const value = parseInt(hexChar, 16);
            row.push(value % 2 === 0);
        }
        grid.push(row);
    }

    // Apply vertical mirroring for symmetry
    for (let i = 0; i < size; i++) {
        for (let j = Math.ceil(size / 2); j < size; j++) {
            grid[i][j] = grid[i][size - j - 1];
        }
    }

    return { grid, colors };
}
