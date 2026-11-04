import React from 'react';

import { render } from '@testing-library/react';

import { Image } from '.';

describe('block-image', () => {
  it('renders with default values', () => {
    expect(render(<Image />).asFragment()).toMatchSnapshot();
  });

  it('fills its container at full width, ignoring the height', () => {
    const { container } = render(<Image props={{ url: 'https://example.com/a.png', height: 180, fullWidth: true }} />);
    const img = container.querySelector('img')!;
    expect(img.getAttribute('width')).toBe('100%');
    expect(img.getAttribute('height')).toBeNull();
    expect(img.style.width).toBe('100%');
    expect(img.style.height).toBe('auto');
    expect(img.style.display).toBe('block');
  });
});
