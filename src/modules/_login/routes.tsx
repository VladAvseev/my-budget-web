import { Route } from 'react-router-dom';
import { Page } from '.';

export function login() {
  return (
    <Route>
      <Route path="/login" element={<Page />} />
    </Route>
  );
}
