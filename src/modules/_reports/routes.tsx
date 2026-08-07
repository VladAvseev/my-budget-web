import { Route } from 'react-router-dom';
import { Page } from '.';

export function reports() {
  return (
    <Route>
      <Route path="/reports" element={<Page />} />
    </Route>
  );
}
