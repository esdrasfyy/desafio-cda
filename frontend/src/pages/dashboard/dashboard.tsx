import { useUser } from "../../contexts/context-user/context-user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiUser } from "react-icons/fi";
import { Logout } from "../../components/ui/inputs/logout/logout";
import { EditProfile } from "../../components/modals/edit-profile/edit-profile";
import "@splidejs/splide/dist/css/themes/splide-default.min.css"; 
import { Carousel } from "../../components/carousel/carousel";


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

  return (
    <main className="flex w-full justify-center min-h-full items-center">
      <section className=" mx-2 relative flex gap-4 flex-col justify-between overflow-hidden rounded-md shadow-snipped border-[1px] border-[--color-one] border-solid max-w-96 w-full">
        <span className="banner-profile shadow-snipped border-[1px] border-[--color-one] border-solid"></span>
        <div className="absolute w-full flex items-center justify-between text-xl px-2 mt-2">
          <EditProfile />
          <Logout />
        </div>
        <figure className="w-full flex items-center justify-center">
          <div className="relative mt-8 rounded-full">
            <img
              alt="profile logo"
              src={selectedImage}
              className="max-h-[80px] max-w-[80px] min-h-[80px] min-w-[80px] border-[1px] border-[--color-one] shadow-snipped border-solid rounded-full object-cover"
              width={80}
              height={80}
            />
          </div>
        </figure>
        <p className="text-center w-full text-sm mt-2 font-semibold">
          @{user.username}
        </p>
        <div className="px-4 flex flex-col gap-4">
          <p className="font-semibold w-full flex gap-2 items-center text-[10px] uppercase">
            <span className="text-xl">
              <FiUser />
            </span>

            {user.fullname || (
              <span className="normal-case">
                Indefinido. Cadastre seu nome{" "}
                <a className="text-[--color-one] underline" href="#">
                  {" "}
                  agora!
                </a>
              </span>
            )}
          </p>
          <p className=" font-semibold w-full flex gap-2 items-center text-[10px] uppercase">
            <span className="text-xl">
              <FiMail />
            </span>

            {user.email || (
              <span className="normal-case">
                Indefinido. Cadastre um email{" "}
                <a
                  className="text-[--color-one] font-semibold underline"
                  href="#"
                >
                  {" "}
                  agora!
                </a>
              </span>
            )}
          </p>
        </div>
        <div className="w-full flex justify-center items-center gap-6 border-t-[1px] border-[--color-one] pt-6 mt-2">
          <div className="flex flex-col items-center">
            <span className="text-xs">º32</span>
            <span className="text-[10px] uppercase">ranking</span>
          </div>
          <div className="flex flex-col items-center border-x-[1px] px-6">
            <span className="text-xs">{user.points}</span>
            <span className="text-[10px] uppercase">pontos</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs">{user.emblems?.length} </span>
            <span className="text-[10px] uppercase">emblemas</span>
          </div>
        </div>
        <div className="mt-2">
          <div className="border-y-[1px] border-[--color-one] p-4">
            <div className="w-full flex justify-between mb-4">
              <h3 className="font-extrabold text-sm text-[--color-one]">
                CATEGORIA OURO
              </h3>
              <p className="font-extrabold text-sm text-[--color-one]">
                30 PTS
              </p>
            </div>
            <Carousel category="ouro" />
          </div>
          <div className="border-b-[1px] border-[--color-one] p-4">
            <div className="w-full flex justify-between mb-4">
              <h3 className="font-extrabold text-sm text-[#C0C0C0]">
                CATEGORIA PRATA
              </h3>
              <p className="font-extrabold text-sm text-[#C0C0C0]">20 PTS</p>
            </div>
            <Carousel category="prata" />
          </div>
          <div className="p-4">
            <div className="w-full flex justify-between mb-4">
              <h3 className="font-extrabold text-sm text-[#6e4d25]">
                CATEGORIA BRONZE
              </h3>
              <p className="font-extrabold text-sm text-[#6e4d25]">10 PTS</p>
            </div>
            <Carousel category="bronze" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
