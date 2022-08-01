import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { ButtonGroup } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ShareIcon from "@mui/icons-material/Share";

export default function PopoverPopupState({ shareUrl }) {
  const buttons = [
    <a
      key="facebook"
      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
      style={{ textDecoration: "none"}}
      target="_blank"
    >
      <Button
        startIcon={<FacebookIcon />}
        sx={{ width: "100%", borderRadius: 0, color: '#4267B2'  }}
        key="facebook"
      >
        Facebook
      </Button>
    </a>,
    <a
      key="tweeter"
      href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
      style={{ textDecoration: "none" }}
      target="_blank"
    >
      <Button
        startIcon={<TwitterIcon />}
        sx={{ width: "100%", borderRadius: 0, color: '#1DA1F2' }}
        key="twitter"
      >
        Twitter
      </Button>
    </a>,
    <a
      key="linkedin"
      href={`https://www.linkedin.com/cws/share?url=${shareUrl}`}
      style={{ textDecoration: "none" }}
      target="_blank"
    >
      <Button
        startIcon={<LinkedInIcon />}
        sx={{ width: "100%", borderRadius: 0, color: '#0e76a8' }}
        key="linkedin"
      >
        LinkedIn
      </Button>
    </a>,
  ];

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button
            {...bindTrigger(popupState)}
            startIcon={<ShareIcon />}
            size="small"
          >
            Podziel się
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <ButtonGroup
              orientation="vertical"
              aria-label="vertical contained button group"
              size="small"
            >
              {buttons}
            </ButtonGroup>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
