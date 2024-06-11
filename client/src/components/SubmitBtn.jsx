import { useNavigation } from "react-router-dom";

const SubmitBtn = () => {
     const navigation = useNavigation();
     const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <button
        type="submit"
        disabled={isSubmitting}
        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-80 duration-300 flex w-full mt-8 justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </>
  );
}
export default SubmitBtn