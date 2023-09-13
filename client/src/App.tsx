import { ToastContainer } from 'react-toastify';
import { Header } from './components/Header';
import { Orders } from './components/Orders';

import 'react-toastify/ReactToastify.css';

export function App() {
  return (
    <>
      <Header />
      <Orders />
      <ToastContainer position="bottom-center" />
    </>
  );
}
