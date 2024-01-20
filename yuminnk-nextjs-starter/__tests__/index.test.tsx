import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import Page from '../src/app/page';

describe('Page', () => {
  it('renders a heading', async () => {
    const {findByRole} = render(<Page />);
    const heading = await findByRole('heading', {level: 1});
    expect(heading).toBeInTheDocument();
  });
});
