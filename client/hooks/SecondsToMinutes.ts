
export default function sToM(totalSeconds: number): string {
    const seconds = Math.floor(totalSeconds % 60);
    let minutes = Math.floor((totalSeconds) / 60);
    // let minutes = Math.floor((totalSeconds - 1) / 60);
    if (minutes === -1) {
        minutes = 0;
    }
    if (minutes === 0) {
        return `${seconds}s`;
    }
    if (minutes === 60) {
        return `1h`;
    }
    if (seconds === 0) {
        return `${minutes}min`;
    }
    console.log(minutes)

    return `${`${minutes}`}min ${seconds < 10 ? `0${seconds}` : seconds
        }s `;
}
