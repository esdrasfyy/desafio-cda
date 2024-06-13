import { FaGithub } from "react-icons/fa";

export const OAuthGithub = () => {
  const github_id = process.env.GITHUB_CLIENT_ID || "Ov23liPK2bJBHKwRxwRE";
  return (
    <a
      className="max-[900px]:justify-center w-full flex font-extrabold bg-[--color-bg-primary] gap-6 items-center text-xl text-white border border-white px-3 h-12 rounded-md hover:text-custom-grayTwo hover:bg-[--color-bg-secondary] duration-300 ease-linear"
      href={`https://github.com/login/oauth/authorize?client_id=${github_id}&scope=user`}
    >
      <FaGithub />
      <span className="text-base max-[900px]:hidden">GITHUB</span>
    </a>
  );
};
