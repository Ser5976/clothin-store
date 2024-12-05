const NotAdmin = async () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between text-lg text-center text-red-500 p-24">
      'You don't have administrator rights'
    </main>
  );
};
export default NotAdmin;
