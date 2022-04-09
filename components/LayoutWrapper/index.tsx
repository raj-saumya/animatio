import type { NextPage } from "next";
import Header from "./Header";
import Input from "./SearchBar";

interface ILayoutWrapper {
  children: any;
}

const LayoutWrapper: NextPage<ILayoutWrapper> = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-gray-100 py-10 px-6 sm:px-10">
      <Header />
      {children}
      <Input />
    </div>
  );
};

export default LayoutWrapper;
