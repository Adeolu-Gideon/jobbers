/* eslint-disable react/prop-types */
const Content = ({ children }) => {
  return (
    <>
      <main className="container overflow-auto mx-auto px-4 py-10 sm:px-6 lg:px-44">
        {children}
      </main>
    </>
  );
}
export default Content