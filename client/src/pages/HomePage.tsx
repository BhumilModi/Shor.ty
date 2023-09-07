import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import {
  Button,
  Divider,
  Slide,
  SlideProps,
  Snackbar,
  SnackbarContent,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import {useState} from "react";
import {ReactComponent as Illustration} from "../assets/undraw_share_link_re_54rx.svg";

type TransitionProps = Omit<SlideProps, "direction">;

function HomePage() {
  const host = window.location;

  const [originalURL, setOriginalURL] = useState<string>();
  const [key, setKey] = useState<string>();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleGenerate = () => {
    setCopied(false);
    setLoading(true);
    axios
      .post(
        "http://localhost:8080/",
        {
          originalURL,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setKey(response.data.newURL);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  function TransitionRight(props: TransitionProps) {
    return <Slide {...props} direction="left" />;
  }

  const handleClose = () => {
    setError(false);
  };

  return (
    <Stack>
      <Stack
        zIndex={-1}
        height="50%"
        width="100%"
        bottom={0}
        right={0}
        bgcolor="#5C5470"
        position="absolute"
        sx={{
          clipPath: "polygon(0 15vw,100% 0,100% 100%,0 100%)",
        }}
      ></Stack>
      <Snackbar
        open={error}
        onClose={handleClose}
        autoHideDuration={3000}
        TransitionComponent={TransitionRight}
        anchorOrigin={{vertical: "top", horizontal: "right"}}
      >
        <SnackbarContent
          style={{background: "#5C5470", color: "#faf0e6"}}
          message="Something went wrong"
        />
      </Snackbar>
      <Stack p={2} px={10}>
        <Typography fontSize="42px" fontFamily={"'Kaushan Script', cursive"}>
          Shor.TY
        </Typography>
      </Stack>
      <Stack direction="row" height="60vh">
        <Stack width="50%" mt={5}>
          <Illustration width="80%" height="80%" />
        </Stack>
        <Stack
          width="40%"
          bgcolor="#fff"
          p={4}
          borderRadius={4}
          spacing={2}
          justifyContent="center"
        >
          <Stack direction="row">
            <InsertLinkIcon sx={{mx: 2}} />
            <Typography fontSize={16} fontWeight={700}>
              Enter your long URL here
            </Typography>
          </Stack>
          <TextField
            size="small"
            placeholder="Enter URL"
            value={originalURL}
            onChange={(e) => setOriginalURL(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                  borderColor: "#352f44",
                },
              },
            }}
          />
          <Stack alignItems="flex-end">
            <Button
              onClick={handleGenerate}
              sx={{
                width: "40%",
                borderRadius: 3,
                bgcolor: "#352f44",
                color: "#faf0e6",
                "&:hover": {
                  bgcolor: "#352f44",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={20} sx={{color: "#faf0e6"}} />
              ) : (
                <Typography fontSize={14} fontWeight={700}>
                  Generate
                </Typography>
              )}
            </Button>
          </Stack>
          <Divider variant="middle" sx={{pt: 1}} />
          <Stack direction="row" pt={2}>
            <InsertLinkIcon sx={{mx: 2}} />
            <Typography fontSize={16} fontWeight={700}>
              Your Shortened Link
            </Typography>
          </Stack>
          <Stack direction="row" gap="2%" alignItems="center">
            <Stack width="48%">
              <TextField size="small" disabled defaultValue={host} />
            </Stack>
            <Typography fontSize={30}>/</Typography>
            <Stack width="40%">
              <TextField size="small" disabled value={key} />
            </Stack>
            <Tooltip
              open={copied}
              title="Copied URL"
              arrow
              placement="bottom-start"
            >
              <ContentCopyIcon
                onClick={() =>
                  navigator.clipboard
                    .writeText(host + (key || ""))
                    .then(() => setCopied(true))
                }
                sx={{color: "#352f44", cursor: "pointer"}}
              />
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default HomePage;
