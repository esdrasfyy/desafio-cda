import { SubmitHandler, useForm } from "react-hook-form";
import { InputsLogin, SchemaLogin } from "./types/login-form-type";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginApi } from "../../../../services/login/login.service";
import { Button, useToast } from "@chakra-ui/react";
import { useUser } from "../../../../contexts/context-user/context-user";
import { InputDefault } from "../../../../components/ui/inputs/default/input-default";
import { InputPassword } from "../../../../components/ui/inputs/password/input-password";
import { LuArrowRight, LuLock } from "react-icons/lu";
import { theme } from "../../../../components/ui/theme/theme";
import { DecodeUser } from "../../../../utils/decode/user/decode-user";

export const LoginForm = () => {
  const toast = useToast();
  const { setUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsLogin>({ resolver: yupResolver(SchemaLogin) });

  const onSubmit: SubmitHandler<InputsLogin> = async ({
    credential,
    password,
  }) => {
    const { status, error, data } = await LoginApi({ credential, password });

    if (data?.token && status == 200) {
      const decoded = DecodeUser(data.token);
      if (decoded) {
        setUser(decoded);
      } else {
        return toast({
          title: "Erro ao logar usuário.",
          description: data.message || error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      return toast({
        title: "Erro ao logar usuário.",
        description: "Token não fornecido.",
        status: "error",
        duration: 9000,
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
        Icon={LuLock}
        placeholder="Email ou username"
        error={errors.credential?.message}
        classes="text-lg shadow-snipped"
        register={register}
        name="credential"
      />
      <div className="flex flex-col items-end">
        <InputPassword
          register={register}
          placeholder="Senha"
          error={errors.password?.message}
          classes="text-lg shadow-snipped"
          name="password"
          forgot={true}
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
