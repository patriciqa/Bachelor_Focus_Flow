

export default function sToH(totalSeconds: number): string {
    const totalMinutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours === 0 && minutes === 0) {
        return `${seconds} s`;
    }
    if (hours === 0) {
        if (seconds === 0) {
            return `${minutes}min `;

        }
        return `${minutes}min ${seconds}s`;
    }

    return `${hours !== 0 ? `${hours}h` : ""} ${minutes}min`;
}