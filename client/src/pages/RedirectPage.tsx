import {Stack, Typography} from "@mui/material";
import axios, {AxiosError} from "axios";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {BASE_URL} from "../Constants";
import {ReactComponent as NotFound} from "../assets/undraw_page_not_found_re_e9o6.svg";

function RedirectPage() {
  const [showNotFound, setShowNotFound] = useState(false);
  const location = useLocation();
  useEffect(() => {
    axios
      .get(BASE_URL + location.pathname)
      .then((response) => window.location.replace(response.data.originalURL))
      .catch((err: AxiosError) => {
        if (err.response?.status === 404) {
          setShowNotFound(true);
        } else {
          window.location.reload();
        }
      });
  }, [location.pathname]);

  return (
    <Stack height="100vh" justifyContent="center" alignItems="center">
      {showNotFound ? (
        <>
          <NotFound width="50%" height="50%" />{" "}
          <Stack p={5}>
            <Typography fontSize={48} fontFamily="'Fugaz One', cursive;">
              NOT FOUND
            </Typography>
          </Stack>
        </>
      ) : null}
    </Stack>
  );
}

export default RedirectPage;
