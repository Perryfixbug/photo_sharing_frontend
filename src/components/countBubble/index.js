import React from "react";
import { Box, Chip } from "@mui/material";
import { green, red } from "@mui/material/colors";

/**
 * Hiển thị 2 count bubble:
 * - photoCount: màu xanh lá, click được (tuỳ chọn)
 * - commentCount: màu đỏ, click được
 */
const CountBubbles = ({ photoCount, commentCount, onPhotoClick, onCommentClick }) => {
  return (
    <Box display="flex" gap={1}>
      {/* Bubble ảnh */}
      <Chip
        label={photoCount}
        size="small"
        onClick={(e) => {
          e.stopPropagation(); // tránh lan click ra ngoài
          onPhotoClick?.();    // nếu được truyền
        }}
        sx={{
          backgroundColor: green[500],
          color: "white",
          fontWeight: "bold",
          cursor: onPhotoClick ? "pointer" : "default"
        }}
      />

      {/* Bubble comment */}
      <Chip
        label={commentCount}
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onCommentClick?.();
        }}
        sx={{
          backgroundColor: red[500],
          color: "white",
          fontWeight: "bold",
          cursor: onCommentClick ? "pointer" : "default"
        }}
      />
    </Box>
  );
};

export default CountBubbles;
