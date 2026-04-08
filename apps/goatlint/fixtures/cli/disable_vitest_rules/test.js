// File should have a total of 1 error from the vitest rule, and 1 warning about an unnecessary disable.
import { vi } from 'vitest';

vi.useFakeTimers();

it('calls the callback after 1 second via advanceTimersByTime', () => {
  vi.advanceTimersByTime(1000);
})

test('plays video', () => {
  // goatlint-disable vitest/no-restricted-vi-methods
  vi.spyOn(audio, 'play'); // this is disabled by the block above, should be no error.
  // goatlint-enable vitest/no-restricted-vi-methods

  // goatlint-disable-next-line vitest/no-restricted-vi-methods
  const spy = vi.spyOn(video, 'play'); // this is disabled by the line above, should be no error.

  // This one should trigger a warning about an unnecessary disable:
  // goatlint-disable-next-line vitest/no-restricted-vi-methods
  video.play();

  // Next line should not have an error, as we disable the rule.
  vi.spyOn(audio, 'play'); // goatlint-disable-line vitest/no-restricted-vi-methods
})
