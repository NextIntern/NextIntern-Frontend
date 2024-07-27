import {
  BLACK_COLOR,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_SIZE_LG,
  DEFAULT_FONT_WEIGHT,
  DEFUALT_BORDER_RADIUS,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TEXT_COLOR,
  TEXT_HEADING_COLOR,
  WHITE_COLOR,
} from "@/utils/constants"

const theme = {
  token: {
    borderRadius: DEFUALT_BORDER_RADIUS,
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
      primaryColor: WHITE_COLOR,
      primaryHoverColor: BLACK_COLOR,
      fontWeight: DEFAULT_FONT_WEIGHT,
      contentFontSize: DEFAULT_FONT_SIZE,
      contentFontSizeLG: DEFAULT_FONT_SIZE_LG,
    },
  },
}

export default theme
