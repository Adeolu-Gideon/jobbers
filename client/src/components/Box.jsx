/* eslint-disable react/prop-types */
const Box = ({ children }) => {
  return (
    <>
      <main className="pl-2 md:pl-56 lg:pl-24">
        {children}
      </main>
    </>
  );
}
export default Box