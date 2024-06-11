import { useDashboardContext } from "../pages/DashboardLayout"

const MobileSidebar = () => {
    const data = useDashboardContext();
    console.log(data);
  return (
    <>
      <h1>MobileSidebar</h1>
    </>
  )
}
export default MobileSidebar