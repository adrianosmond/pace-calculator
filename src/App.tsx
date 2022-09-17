import { Component, createMemo, createSignal, JSX } from 'solid-js';
import Input from './components/Input';

type InputHandler = JSX.EventHandlerUnion<HTMLInputElement, InputEvent>;

const App: Component = () => {
  const [distance, setDistance] = createSignal(5.0);
  const updateDistance: InputHandler = (e) =>
    setDistance(parseFloat(e.currentTarget.value));

  const [time, setTime] = createSignal('25:00');
  const updateTime: InputHandler = (e) => {
    const newTime = e.currentTarget.value
      .replace(/:/g, '')
      .replace(/(\d)(\d\d)$/, '$1:$2')
      .replace(/(\d)(\d\d):/, '$1:$2:');

    e.currentTarget.value = newTime;
    setTime(newTime);
  };

  const pace = createMemo(() => {
    const [secsStr, minsStr, hoursStr] = time().split(':').reverse();
    const timeInSecs =
      (parseInt(secsStr, 10) || 0) +
      60 * (parseInt(minsStr, 10) || 0) +
      3600 * (parseInt(hoursStr, 10) || 0);

    const pacePerKm = timeInSecs / 60 / distance();

    const minsPerKm = Math.floor(pacePerKm);
    const secsPerKm = Math.round((pacePerKm - minsPerKm) * 60);
    return `${minsPerKm}:${secsPerKm.toString().padStart(2, '0')} min/km`;
  });

  return (
    <div class="flex flex-col items-center">
      <h1 class="text-3xl md:text-4xl font-bold mx-auto mb-8 leading-none">
        Pace <br class="md:hidden" /> calculator
      </h1>
      <div class="flex flex-col gap-8">
        <div class="flex flex-col items-center md:flex-row gap-4 text-yellow-300">
          <Input
            type="number"
            value={distance()}
            onInput={updateDistance}
            inputmode="decimal"
            suffix="km"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="1.5rem"
                width="1rem"
                fill="currentColor"
              >
                <path d="M19,15.18V7c0-2.21-1.79-4-4-4s-4,1.79-4,4v10c0,1.1-0.9,2-2,2s-2-0.9-2-2V8.82C8.16,8.4,9,7.3,9,6c0-1.66-1.34-3-3-3 S3,4.34,3,6c0,1.3,0.84,2.4,2,2.82V17c0,2.21,1.79,4,4,4s4-1.79,4-4V7c0-1.1,0.9-2,2-2s2,0.9,2,2v8.18c-1.16,0.41-2,1.51-2,2.82 c0,1.66,1.34,3,3,3s3-1.34,3-3C21,16.7,20.16,15.6,19,15.18z" />
              </svg>
            }
          />
          <Input
            value={time()}
            onInput={updateTime}
            maxLength={8}
            inputmode="numeric"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="1.5rem"
                width="1rem"
                fill="currentColor"
              >
                <rect height="2" width="6" x="9" y="1" />
                <path d="M19.03,7.39l1.42-1.42c-0.43-0.51-0.9-0.99-1.41-1.41l-1.42,1.42C16.07,4.74,14.12,4,12,4c-4.97,0-9,4.03-9,9 c0,4.97,4.02,9,9,9s9-4.03,9-9C21,10.88,20.26,8.93,19.03,7.39z M13,14h-2V8h2V14z" />
              </svg>
            }
          />
        </div>
        <div class="font-bold text-lg">{pace}</div>
      </div>
    </div>
  );
};
export default App;
