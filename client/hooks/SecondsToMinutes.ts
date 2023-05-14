
export default function sToM(totalSeconds: number): string {
    const seconds = Math.floor(totalSeconds % 60);
    // let minutes = Math.floor((totalSeconds) / 60);
    let minutes = Math.floor((totalSeconds - 1) / 60);
    if (minutes === -1) {
        minutes = 0;
    }
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds
        }`;
}
