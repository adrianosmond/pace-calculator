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
        <div class="flex flex-col items-center md:flex-row gap-4">
          <Input
            type="number"
            value={distance()}
            onInput={updateDistance}
            inputmode="decimal"
            suffix="km"
            icon="🏃‍♀️"
          />
          <Input
            value={time()}
            onInput={updateTime}
            maxLength={8}
            inputmode="numeric"
            icon="⏱"
          />
        </div>
        <div class="font-bold text-lg">{pace}</div>
      </div>
    </div>
  );
};
export default App;
