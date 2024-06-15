import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { TbMoodEdit } from "react-icons/tb";
import { theme } from "../../ui/theme/theme";
import { MdModeEdit } from "react-icons/md";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputsEdit, SchemaEdit } from "./types/edit-profile.type";
import { useUser } from "../../../contexts/context-user/context-user";
import { InputDefault } from "../../ui/inputs/default/input-default";
import { HiOutlineMail } from "react-icons/hi";
import { LuArrowRight } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { InputPassword } from "../../ui/inputs/password/input-password";
import { UploadImage } from "../../../services/firebase/firebase";
import { UpdateUserSendApi } from "../../../services/user/update/send-code/update-user-send.service";

export const EditProfile = () => {
  const { user } = useUser();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const [wantBack, setWantBack] = useState<boolean>(false);

  const [selectedImage, setSelectedImage] = useState<string>(
    user?.avatar || ""
  );
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<InputsEdit>({
    resolver: yupResolver(SchemaEdit),
  });

  const onSubmit: SubmitHandler<InputsEdit> = async ({
    file,
    password,
    email,
    fullname,
    username,
  }) => {
    try {
      if (file?.[0]) {
        let url = await UploadImage(file!);
        setSelectedImage(url);
      }
      const res = await UpdateUserSendApi({
        email,
        username,
        fullname,
        avatar: selectedImage,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

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

  const closeModal = () => {
    const currentValues = getValues();
    const hasChanges =
      currentValues.email !== user?.email ||
      currentValues.username !== user?.username ||
      currentValues.fullname !== user?.fullname ||
      selectedImage !== user.avatar;

    if (hasChanges && !wantBack) {
      setWantBack(true);
      toast({
        title: "Formulário em progresso!",
        description: "Suas mudanças vão sumir se continuar.",
        status: "warning",
        duration: 1500,
        isClosable: true,
      });
      return;
    }
    setWantBack(false);
    setSelectedImage(user?.avatar || "");
    reset();
    onClose();
  };
  return (
    <>
      <button
        className="p-2 rounded-full hover:bg-white/30 hover:text-[--color-one] duration-300 ease-linear"
        onClick={onOpen}
      >
        <TbMoodEdit />
      </button>
      <Modal isOpen={isOpen} onClose={closeModal} isCentered>
        <ModalOverlay
          backdropFilter="saturate(150%) blur(4px)"
          backdropInvert="50%"
          backdropBlur="10px"
        />
        <ModalContent
          bg={theme.colors.bg_secondary}
          borderRadius="6px"
          margin="0 10px"
        >
          <ModalBody borderRadius="6px" padding="0">
            <form
              className="flex flex-col items-center justify-center w-full relative overflow-hidden rounded-md"
              onSubmit={handleSubmit(onSubmit)}
            >
              <span className="absolute w-[110%] h-[135px] rotate-[17deg] rounded-[6px] right-[-40px] top-[-75px] shadow-snipped border-[1px] border-[--color-one] border-solid bg-[--color-bg-primary]"></span>
              <div className="relative m-4 w-fit">
                <img
                  alt="profile logo"
                  src={selectedImage}
                  className="max-h-[80px] max-w-[80px] min-h-[80px] min-w-[80px] border-[1px] border-[--color-one] shadow-snipped border-solid rounded-full object-cover"
                  width={80}
                  height={80}
                />
                <label
                  htmlFor="fileInput"
                  className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-49%] cursor-pointer "
                >
                  <input
                    {...register("file")}
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    onChange={toggleProfile}
                    className="sr-only"
                    disabled={loading}
                  />
                  <div className="w-[78px] h-[77px] rounded-full flex items-center justify-center border-custom-grayOne bg-custom-grayOne/60  duration-300 ease-linear bg-black/50 hover:bg-black/70">
                    <MdModeEdit className="text-2xl text-custom-textColor/60" />
                  </div>
                </label>
              </div>
              <div className="w-full px-4 mt-12">
                <InputDefault
                  Icon={FaRegUser}
                  placeholder="Nome completo"
                  error={errors.fullname?.message}
                  classes="text-lg shadow-snipped"
                  register={register}
                  value={user?.fullname || ""}
                  name="fullname"
                />{" "}
                <InputDefault
                  Icon={FaRegUser}
                  placeholder="Nome de usuário"
                  error={errors.username?.message}
                  classes="text-lg shadow-snipped"
                  register={register}
                  value={user?.username || ""}
                  name="username"
                />{" "}
                <InputDefault
                  Icon={HiOutlineMail}
                  placeholder="Email"
                  error={errors.email?.message}
                  classes="text-lg shadow-snipped"
                  register={register}
                  value={user?.email || ""}
                  name="email"
                />{" "}
                <InputPassword
                  disable={true}
                  value="Inspencionar né genio?"
                  register={register}
                  placeholder="Insira sua senha"
                  error={errors.password?.message}
                  classes="text-lg shadow-snipped"
                  name="password"
                />
              </div>
              <div className="flex gap-5 w-full px-4 pb-6">
                <Button
                  rightIcon={<LuArrowRight />}
                  variant="solid"
                  type="submit"
                  size="lg"
                  bg={theme.colors.color_primary}
                  color={theme.colors.bg_primary}
                  opacity=".3"
                  _hover={{
                    bg: theme.colors.color_secondary,
                  }}
                  className="group shadow-snipped w-full"
                  fontSize={"19px"}
                >
                  Entrar
                </Button>
                <Button
                  rightIcon={<LuArrowRight />}
                  variant="solid"
                  type="submit"
                  size="lg"
                  bg={theme.colors.color_primary}
                  color={theme.colors.bg_primary}
                  _hover={{
                    bg: theme.colors.color_secondary,
                  }}
                  className="group shadow-snipped w-full"
                  fontSize={"19px"}
                >
                  Entrar
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
