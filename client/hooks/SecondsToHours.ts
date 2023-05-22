

export default function sToH(totalSeconds: number): string {
    const totalMinutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours < 10 ? `0${hours}` : hours}h ${minutes < 10 ? `0${minutes}` : minutes
        }min`;
}