import Logo from '../assets/images/logo.svg';

export function Header() {
  return (
    <div className="bg-red-600 flex flex-row items-center justify-center h-48">
      <div className="w-full max-w-6xl flex items-center justify-between font-gen-sans">
        <div>
          <h1 className="text-white text-3xl">Orders</h1>
          <h2 className="text-white font-normal text-xs opacity-90 mt-2">Manage the client orders</h2>
        </div>

        <img src={Logo} alt="Waiters with a bottle and a meat" />
      </div>
    </div>
  );
}
