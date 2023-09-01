import { Component, createMemo, createSignal, JSX } from 'solid-js';
import Input from './components/Input';
import DistanceIcon from './icons/Distance';
import TimeIcon from './icons/Time';
import { calculatePace, shiftTimeColons } from './utils';

type InputHandler = JSX.EventHandlerUnion<HTMLInputElement, InputEvent>;

const [distance, setDistance] = createSignal(5.0);
const updateDistance: InputHandler = (e) => {
  if (!Number.isNaN(parseFloat(e.currentTarget.value))) {
    setDistance(parseFloat(e.currentTarget.value));
  }
};

const [time, setTime] = createSignal('25:00');
const updateTime: InputHandler = (e) => {
  const adjustedTime = shiftTimeColons(e.currentTarget.value);
  e.currentTarget.value = adjustedTime;
  setTime(adjustedTime);
};

const App: Component = () => {
  const pace = createMemo(() => {
    const [minsPerKm, secsPerKm] = calculatePace(distance(), time());
    return `${minsPerKm}:${secsPerKm.toString().padStart(2, '0')} / km`;
  });

  return (
    <div class="flex flex-col items-center">
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold mx-auto mb-8 leading-none">
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
            icon={<DistanceIcon />}
          />
          <Input
            value={time()}
            onInput={updateTime}
            maxLength={8}
            inputmode="numeric"
            icon={<TimeIcon />}
          />
        </div>
        <div class="font-bold text-lg">{pace()}</div>
      </div>
    </div>
  );
};
export default App;
