import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navigaiton from "../navigation/navigation";
import pathRouters from "../../../config/pathRoutes";

function NavigationUser(props) {
  const [selectImgFile, setSelectImgFile] = useState();
  const { myuser } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    setSelectImgFile(myuser.avatar);
  }, [myuser]);

  return (
    <div className="flex items-center justify-center mt-2 sm:mt-0">
      <div className="w-[30px] h-[30px] rounded-full overflow-hidden mr-2">
        <img className="object-cover" src={selectImgFile} alt="avatar"></img>
      </div>
      <Navigaiton to={pathRouters.profile}>
        <div className="text-sm font-bold text-white ">{myuser.userName}</div>
      </Navigaiton>
    </div>
  );
}

export default NavigationUser;
