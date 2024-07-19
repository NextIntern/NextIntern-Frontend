import { PRIMARY_COLOR, SECONDARY_COLOR } from "@/utils/constants"

const theme = {
  token: {
    borderRadius: 12,
    colorPrimary: PRIMARY_COLOR, // green
    colorSecondary: SECONDARY_COLOR, // blue
    colorLink: PRIMARY_COLOR,
    colorLinkHover: PRIMARY_COLOR,
    colorText: "#9a9fa9",
  },
  components: {
    Input: {
      activeBorderColor: PRIMARY_COLOR,
      hoverBorderColor: SECONDARY_COLOR,
    },
    Button: {
      defaultBg: `linear-gradient(to right, ${PRIMARY_COLOR}, ${SECONDARY_COLOR})`,
      defaultHoverBg: `linear-gradient(to left, ${PRIMARY_COLOR}, ${SECONDARY_COLOR})`,
      defaultColor: "white",
      defaultHoverColor: "#000",
      fontWeight: 600,
      contentFontSize: 16,
      contentFontSizeLG: 60,
    },
  },
}

export default theme
