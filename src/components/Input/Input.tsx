import {
  ComponentProps,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js';

type InputProps = {
  icon?: string;
  suffix?: string;
} & ComponentProps<'input'>;

const Input = ({
  type = 'text',
  icon,
  suffix,
  class: classes,
  ...rest
}: InputProps) => {
  let iconEl: HTMLSpanElement | undefined;
  let suffixEl: HTMLSpanElement | undefined;
  const [iconWidth, setIconWidth] = createSignal(0);
  const leftPadding = createMemo(() =>
    icon ? `calc(${iconWidth()}px + 0.5rem)` : '0.25rem',
  );
  const [suffixWidth, setSuffixWidth] = createSignal(0);
  const rightPadding = createMemo(() =>
    suffix ? `calc(${suffixWidth()}px + 0.5rem)` : '0.25rem',
  );
  const handleResize = () => {
    if (suffixEl) {
      setSuffixWidth(suffixEl.offsetWidth);
    }
    if (iconEl) {
      setIconWidth(iconEl.offsetWidth);
    }
  };

  onMount(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
  });

  onCleanup(() => {
    window.removeEventListener('resize', handleResize);
  });

  return (
    <label class="relative block w-32 font-mono">
      {icon && (
        <span
          class="absolute left-1"
          ref={iconEl}
          style={{ bottom: 'calc(0.25rem + 2px)' }}
        >
          {icon}
        </span>
      )}
      <input
        type={type}
        {...rest}
        class={[
          'w-full border-0 border-b-2 rounded-none border-yellow-400 p-1 pt-0 bg-transparent outline-none appearance-none text-right',
          classes,
        ].join(' ')}
        style={{
          'padding-left': leftPadding(),
          'padding-right': rightPadding(),
        }}
      />
      {suffix && (
        <span
          class="absolute right-1"
          ref={suffixEl}
          style={{ bottom: 'calc(0.25rem + 2px)' }}
        >
          {suffix}
        </span>
      )}
    </label>
  );
};
export default Input;
