import React from "react";
import { FaGoogle } from "react-icons/fa";

function getGoogleOAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: "http://localhost:8080/oauth/google",
    client_id:
      "851433837672-n4kffg6bsggq153hg0k42aubtesjcflo.apps.googleusercontent.com",
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
}

export { getGoogleOAuthURL };

export const OAuthGoogle = () => {
  return (
    <a
      className="max-[900px]:justify-center w-full flex font-extrabold bg-[--color-bg-primary] gap-6 items-center text-xl text-white border border-white px-3 h-12 rounded-md hover:text-custom-grayTwo hover:bg-[--color-bg-secondary] duration-300 ease-linear"
      href={getGoogleOAuthURL()}
    >
      <FaGoogle />
      <span className="text-base max-[900px]:hidden">GOOGLE</span>
    </a>
  );
};

export default OAuthGoogle;
