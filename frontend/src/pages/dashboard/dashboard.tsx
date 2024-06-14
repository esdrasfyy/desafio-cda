import { useUser } from "../../contexts/context-user/context-user";
import { MdOutlinePhotoCameraBack } from "react-icons/md";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [selectedImage, setSelectedImage] = useState<string>(
    "https://firebasestorage.googleapis.com/v0/b/assets-portifolio.appspot.com/o/profle-Photoroom.png?alt=media&token=44c41a6d-d29a-4a54-ac95-50cc61c11c71"
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.avatar) {
      setSelectedImage(user?.avatar);
    }
  }, [navigate, user]);

  if (!user) {
    return null;
  }

  const toggleProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="flex w-full h-full justify-center items-center">
      <section className="relative flex flex-col justify-between overflow-hidden rounded-md shadow-snipped border-[1px] border-solid border-white max-w-80 w-full">
        <span className="banner-profile shadow-snipped border-[1px] border-solid"></span>
        <figure className="w-full flex items-center justify-center">
          <div className="relative mt-8 rounded-full">
            <img
              alt="profile logo"
              src={selectedImage}
              className="max-h-[80px] max-w-[80px] min-h-[80px] min-w-[80px] border-[1px] shadow-snipped border-solid border-white  rounded-full object-cover"
              width={80}
              height={80}
            />
          </div>
        </figure>
        <p className="text-center w-full text-sm mt-2 font-semibold">
          @esdrasfyy
        </p>
        <div className="mt-56">
          <div className="border-y-[1px] p-2">
            <div className="w-full flex justify-between">
              <h3 className="font-extrabold text-[9px] text-[--color-one]">
                OURO
              </h3>
              <button className="text-[8px] font-extrabold">VER MAIS</button>
            </div>
            <ul className="flex w-full justify-between mt-2">
              {user.emblems ? (
                user.emblems
                  .filter((em) => em.category === "ouro")
                  .slice(0, 5)
                  .map((em, index) => (
                    <li className="w-fit flex gap-2 flex-col items-center">
                      <img
                        src={em.image}
                        alt={em.category}
                        className="w-5 h-5"
                      />
                      <p className=" text-center text-[9px] uppercase font-extrabold">
                        {index + 1}&ordm; {em.slug}
                      </p>
                    </li>
                  ))
              ) : (
                <li className="w-full text-center text-xs font-semibold my-3">Ainda sem emblemas? Jogue agora mesmo.</li>
              )}
            </ul>
          </div>
          <div className="border-b-[1px] p-2">
            <div className="w-full flex justify-between">
              <h3 className="font-extrabold text-[9px] text-[#C0C0C0]">
                PRATA
              </h3>
              <button className="text-[8px] font-extrabold">VER MAIS</button>
            </div>
            <ul className="flex w-full justify-between mt-2">
              {user.emblems ? (
                user.emblems
                  .filter((em) => em.category === "prata")
                  .slice(0, 5)
                  .map((em, index) => (
                    <li className="w-fit flex gap-2 flex-col items-center">
                      <img
                        src={em.image}
                        alt={em.category}
                        className="w-5 h-5"
                      />
                      <p className=" text-center text-[9px] uppercase font-extrabold">
                        {index + 1}&ordm; {em.slug}
                      </p>
                    </li>
                  ))
              ) : (
                <li className="w-full text-center text-xs font-semibold my-3">Ainda sem emblemas? Jogue agora mesmo.</li>
              )}
            </ul>
          </div>
          <div className="border-b-[1px] p-2">
            <div className="w-full flex justify-between">
              <h3 className="font-extrabold text-[9px] text-[#6e4d25]">
                BRONZE
              </h3>
              <button className="text-[8px] font-extrabold">VER MAIS</button>
            </div>
            <ul className="flex w-full justify-between mt-2">
              {user.emblems ? (
                user.emblems
                  .filter((em) => em.category === "bronze")
                  .slice(0, 5)
                  .map((em, index) => (
                    <li className="w-fit flex gap-2 flex-col items-center">
                      <img
                        src={em.image}
                        alt={em.category}
                        className="w-5 h-5"
                      />
                      <p className=" text-center text-[9px] uppercase font-extrabold">
                        {index + 1}&ordm; {em.slug}
                      </p>
                    </li>
                  ))
              ) : (
                <li className="w-full text-center text-xs font-semibold my-3">Ainda sem emblemas? Jogue agora mesmo.</li>
              )}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
