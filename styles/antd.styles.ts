import { BLACK_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR, TEXT_HEADING_COLOR } from "@/utils/constants"

const theme = {
  token: {
    borderRadius: 12,
    colorPrimary: PRIMARY_COLOR,
    colorSecondary: SECONDARY_COLOR,
    colorLink: PRIMARY_COLOR,
    colorLinkHover: PRIMARY_COLOR,
    colorText: TEXT_COLOR,
    colorTextHeading: TEXT_HEADING_COLOR,
  },
  components: {
    Input: {
      activeBorderColor: PRIMARY_COLOR,
      hoverBorderColor: SECONDARY_COLOR,
    },
    Button: {
      primaryBg: `linear-gradient(to right, ${PRIMARY_COLOR}, ${SECONDARY_COLOR})`,
      primaryHoverBg: `linear-gradient(to left, ${PRIMARY_COLOR}, ${SECONDARY_COLOR})`,
      primaryColor: "white",
      primaryHoverColor: BLACK_COLOR,
      fontWeight: 600,
      contentFontSize: 16,
      contentFontSizeLG: 60,
    },
  },
}

export default theme
