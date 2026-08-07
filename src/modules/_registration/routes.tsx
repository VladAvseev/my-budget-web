import { Route } from 'react-router-dom';
import { Page } from '.';

export function registration() {
  return (
    <Route>
      <Route path="/registration" element={<Page />} />
    </Route>
  );
}
