import { render } from '@testing-library/react';
import IntroPage from '../../pages/IntroPage';

it('IntroPage render test', () => {
    const introPage = render(<IntroPage></IntroPage>)
    expect(introPage).toBeTruthy();
})