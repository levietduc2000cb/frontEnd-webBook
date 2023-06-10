/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useMemo, useRef, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { pathUser } from "../../config/apiBackEnd";
import { TOKEN_USER } from "../../constant";
import imgEmpty from "../../assets/img-book-empty.png";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/Slices/AuthSlice";

const Profile = () => {
  const [user, setUser] = useState({});
  const currentFileAvatar = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${pathUser}/profile`, {
      headers: { authorization: `Bearer ${localStorage.getItem(TOKEN_USER)}` },
    })
      .then((data) => data.json())
      .then((data) => {
        setUser(data.data);
      });
  }, []);

  const showAvatar = useMemo(() => {
    return user.avatarurl ? user.avatarurl : imgEmpty;
  }, [user]);

  const handleChangeUser = (key, value) => {
    setUser((pre) => {
      return { ...pre, [key]: value };
    });
  };

  function previewFile(key, file) {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      handleChangeUser(key, reader.result);
    };
  }

  const handleChangeAvatar = (key, file) => {
    currentFileAvatar.current = file;
    previewFile(key, file);
  };

  const handleUpdateUser = () => {
    let formData = new FormData();
    formData.append("name", user.name);
    if (currentFileAvatar.current) {
      formData.append("avatar", currentFileAvatar.current);
    }

    fetch(`${pathUser}/update/${user._id}`, {
      method: "put",
      body: formData,
      headers: { authorization: `Bearer ${localStorage.getItem(TOKEN_USER)}` },
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Update profile is failure");
      })
      .then((data) => {
        dispatch(updateUser(data.data));
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <Layout hiddenSideBars>
        <div className="profile-page">
          <section className="relative block h-500-px">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")',
              }}
            >
              <span
                id="blackOverlay"
                className="absolute w-full h-full bg-black opacity-50"
              />
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 top-auto w-full overflow-hidden pointer-events-none h-70-px"
              style={{ transform: "translateZ(0px)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x={0}
                y={0}
              >
                <polygon
                  className="fill-current text-blueGray-200"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-blueGray-200">
            <div className="container px-4 mx-auto">
              <div className="relative flex flex-col w-full min-w-0 mb-6 -mt-64 break-words bg-white rounded-lg shadow-xl">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="flex justify-center w-full px-4 lg:w-3/12 lg:order-2">
                      <div className="relative">
                        <label
                          htmlFor="avatar"
                          className="absolute h-[150px] -m-16 -ml-20 overflow-hidden align-middle border-none rounded-full shadow-xl cursor-pointer lg:-ml-16 w-[150px]"
                        >
                          <img
                            alt="img"
                            src={showAvatar}
                            className="object-cover w-full h-full"
                          />
                        </label>
                        <input
                          type="file"
                          id="avatar"
                          hidden
                          onChange={(e) =>
                            handleChangeAvatar("avatarurl", e.target.files[0])
                          }
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 lg:w-4/12 lg:order-3 lg:text-right lg:self-center">
                      <div className="px-3 py-6 mt-32 sm:mt-0">
                        <button
                          className="px-4 py-2 mb-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-pink-500 rounded shadow outline-none active:bg-pink-600 hover:shadow-md focus:outline-none sm:mr-2"
                          type="button"
                          onClick={handleUpdateUser}
                        >
                          Update Profile
                        </button>
                      </div>
                    </div>
                    <div className="w-full px-4 lg:w-4/12 lg:order-1"></div>
                  </div>
                  <div className="mt-12 text-center">
                    <input
                      value={user?.name}
                      type="text"
                      className="w-full mb-2 text-4xl font-semibold leading-normal text-center border-none outline-none text-blueGray-700"
                      onChange={(e) => {
                        handleChangeUser("name", e.target.value);
                      }}
                    ></input>

                    <div className="mt-0 mb-2 text-sm font-bold leading-normal uppercase text-blueGray-400">
                      <i className="mr-2 text-lg fas fa-map-marker-alt text-blueGray-400" />
                      {user?.email && user.email}
                    </div>
                    <div className="mt-10 mb-2 text-blueGray-600">
                      <i className="mr-2 text-lg fas fa-briefcase text-blueGray-400" />
                      Người mua
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      <i className="mr-2 text-lg fas fa-university text-blueGray-400" />
                      Hiệu sách Nobite.vn
                    </div>
                  </div>
                  <div className="py-10 mt-10 text-center border-t border-blueGray-200">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full px-4 lg:w-9/12">
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                          Người đọc sách là những người yêu thích việc đọc sách
                          và khám phá thế giới thông qua trang sách. Họ có thể
                          là những người đọc sách chuyên nghiệp, những người đam
                          mê văn học, những người tìm kiếm kiến thức hoặc những
                          người thích giải trí bằng cách đọc sách. Người đọc
                          sách có thể tìm kiếm sách ở các cửa hàng sách, thư
                          viện hoặc mua sách trực tuyến để đọc sách mới và cập
                          nhật những kiến thức mới nhất. Việc đọc sách giúp cho
                          người đọc có thể mở rộng kiến thức, tăng cường khả
                          năng tư duy, phân tích và giải quyết vấn đề, cũng như
                          giúp giảm stress và cải thiện sức khỏe tinh thần.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
