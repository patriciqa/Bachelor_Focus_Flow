// // This is a module worker, so we can use imports (in the browser too!)
// import pi from './component/pi';

// addEventListener('message', (event: MessageEvent<number>) => {
//     postMessage(pi(event.data))
// })


let timerId: string | number | NodeJS.Timeout | undefined;

addEventListener('message', (event: MessageEvent) => {
    if (event.data.type === 'start') {
        timerId = setTimeout(() => {
            postMessage({ type: 'timerExpired' });
        }, event.data.duration);
    } else if (event.data.type === 'stop') {
        clearTimeout(timerId);
    }
});
export { };
