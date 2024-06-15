import { Button, useToast } from "@chakra-ui/react";
import { useUser } from "../../../../contexts/context-user/context-user";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputsRegister, SchemaRegister } from "./types/register-form-type";
import { yupResolver } from "@hookform/resolvers/yup";
import { DecodeUser } from "../../../../utils/decode/user/decode-user";
import { InputDefault } from "../../../../components/ui/inputs/default/input-default";
import { InputPassword } from "../../../../components/ui/inputs/password/input-password";
import { LuArrowRight } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import { theme } from "../../../../components/ui/theme/theme";
import { FaRegUser } from "react-icons/fa";
import { RegisterApi } from "../../../../services/register/register.service";

export const RegisterForm = () => {
  const toast = useToast();
  const { setUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsRegister>({ resolver: yupResolver(SchemaRegister) });

  const onSubmit: SubmitHandler<InputsRegister> = async ({
    email,
    username,
    password,
  }) => {
    const { status, error, data } = await RegisterApi({
      email,
      username,
      password,
    });

    if (data?.token && status === 201) {
      const decoded = DecodeUser(data.token);
      if (decoded) {
        setUser(decoded);
      } else {
        return toast({
          title: "Erro ao logar usuário.",
          description: data.message || error,
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      }
    } else {
      return toast({
        title: "Erro ao logar usuário.",
        description: "Token não fornecido.",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-full"
    >
      <InputDefault
        Icon={FaRegUser}
        placeholder="Username"
        error={errors.username?.message}
        classes="text-lg shadow-snipped"
        register={register}
        name="username"
      />
      <InputDefault
        Icon={HiOutlineMail}
        placeholder="Email"
        error={errors.email?.message}
        classes="text-lg shadow-snipped"
        register={register}
        name="email"
      />
      <div className="flex flex-col items-end">
        <InputPassword
          register={register}
          placeholder="Insira sua senha"
          error={errors.password?.message}
          classes="text-lg shadow-snipped"
          name="password"
        />
      </div>
      <div className="flex flex-col items-end">
        <InputPassword
          register={register}
          placeholder="Insira sua senha novamente"
          error={errors.repeat_password?.message}
          classes="text-lg shadow-snipped"
          name="repeat_password"
        />
      </div>
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
        className="group shadow-snipped"
        fontSize={"19px"}
      >
        Entrar
      </Button>
    </form>
  );
};
