import { Route } from 'react-router-dom';
import { Page } from '.';

export function profile() {
  return (
    <Route>
      <Route path="/profile" element={<Page />} />
    </Route>
  );
}
