import { FC } from "react";
import { motion } from "framer-motion";

type SVGTitles = "yummm" | "the-logo" | "bf-logo"
  | "search-icon" | "arrow-down" | "hamburger"
  | "plus" | "minus" | "checkmark" | "profile" | "smsMonochrome"
  | "pop-out" | "replay";


export const PlusSign = () => (
  <SVG title="plus" />
)

type SVGProps = {
  title: SVGTitles;
  height?: number;
  width?: number;
  svgClassName?: string;
} & React.HTMLAttributes<HTMLElement>;

export const SVG: FC<SVGProps> = ({
  title,
  height,
  width,
  svgClassName,
  ...props
}) => {
  return (
    <div style={{ height, width }} {...props}>
      <svg
        aria-hidden="true"
        height="100%"
        width="100%"
        className={svgClassName}
      >
        <use
          xmlnsXlink="https://www.w3.org/1999/xlink"
          xlinkHref={`#${title}`}
        ></use>
      </svg>
    </div>
  );
};



export function SvgElements() {
  return (
    <svg
      className="xs-hide absolute -left-96"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <symbol id="yummm" viewBox="0 0 200 250">
        <title>Yumm Logo</title>
        <g scale={1.4}>
          <motion.rect
            rx="18"
            x="0"
            y="10"
            width="160"
            height="200"
            fill="none"
            strokeWidth="12"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1.01 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            d="M55 37c-20 -2.5,-20 30.5, 0 25 m 0 2 l 0 25 m 0 2 l 45 0"
          />
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 0.25 }}
          >
            <line
              x1="58"
              x2="105"
              y1="37"
              y2="37"
              strokeLinecap="round"
              strokeWidth="12"
            />
            <path
              id="left-curve"
              strokeLinecap="round"
              fill="none"
              strokeWidth="12"
              d="M55 37c-20 -2.5,-20 30.5, 0 25 m 0 2 l 0 25 m 0 2 l 45 0"
            />
            <path
              id="right-curve"
              d="M102 37c20 -2.5,20 30.5, 0 25 m 0 2 l 0 25"
              strokeLinecap="round"
              fill="none"
              strokeWidth="11"
            />
          </motion.g>
          <motion.line
            id="recipe-line"
            strokeLinecap="round"
            x1="25"
            y1="123"
            x2="132"
            y2="123"
            strokeWidth="14"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.75 }}
          />
          <motion.line
            id="recipe-line"
            strokeLinecap="round"
            x1="25"
            y1="151"
            x2="132"
            y2="151"
            strokeWidth="14"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.75, delay: 0.23 }}
          />
          <motion.line
            id="recipe-line"
            strokeLinecap="round"
            x1="25"
            y1="179"
            x2="132"
            y2="179"
            strokeWidth="14"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.75, delay: 0.46 }}
          />
        </g>
      </symbol>
      <symbol id="smsMonochrome" viewBox="0 0 32 32">
        <title>Sms</title>
        <path d="M5 20.4875V11.0991C5 9.37018 6.42017 8 8.14243 8H23.8576C25.6107 8 27 9.40058 27 11.0991V20.4875C27 22.2165 25.5798 23.5866 23.8576 23.5866L13.0993 23.5878L9.53291 27.1339C9.3216 27.3424 9.01939 27.4623 8.71718 27.4623C8.41496 27.4623 8.14345 27.3435 7.90144 27.1339C7.65943 26.9256 7.53902 26.5972 7.53902 26.2701V23.498C6.08815 23.2302 5 21.9779 5 20.4875ZM7.20641 20.4875C7.20641 20.994 7.62902 21.4411 8.17325 21.4411H9.74452V23.8848L12.2224 21.4411H23.9178C24.4314 21.4411 24.8847 21.0243 24.8847 20.4875L24.8859 11.0991C24.8859 10.5926 24.4632 10.1456 23.919 10.1456H8.20387C7.69034 10.1456 7.23702 10.5624 7.23702 11.0991V20.4875H7.20641Z"></path>
      </symbol>
      <symbol id="profile" viewBox="0 -960 960 960">
        <title>Profile</title>
        <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
      </symbol>
      <symbol id="bf-logo" viewBox="0 0 316 53">
        <title>BuzzFeed Logo</title>
        <path d="M31.8 27.33c2.45.19 4.58 1.23 6.4 3.11 1.81 1.89 2.72 4.48 2.72 7.78 0 4.05-1.34 7.28-4.03 9.69-2.69 2.4-6.55 3.61-11.6 3.61H.69V4.14h24.54c4.34 0 7.81 1.18 10.43 3.54 2.62 2.36 3.92 5.49 3.92 9.4 0 2.97-.82 5.33-2.47 7.07-1.65 1.74-3.42 2.71-5.3 2.9v.28zm-19.44-3.61h10.18c1.74 0 3.13-.48 4.17-1.45s1.56-2.25 1.56-3.85c0-1.46-.51-2.64-1.52-3.54-1.01-.9-2.27-1.34-3.78-1.34H12.36v10.18zm10.89 18.39c1.84 0 3.26-.47 4.28-1.41 1.01-.94 1.52-2.24 1.52-3.89 0-1.56-.52-2.79-1.56-3.71-1.04-.92-2.38-1.38-4.03-1.38h-11.1v10.39h10.89zM81.43 51.51H70.12v-3.39c-2.83 2.97-6.46 4.45-10.89 4.45-4.15 0-7.48-1.36-10.01-4.07-2.52-2.71-3.78-6.28-3.78-10.71V16.02h11.24v19.37c0 2.07.57 3.76 1.7 5.06 1.13 1.3 2.59 1.94 4.38 1.94 2.31 0 4.11-.81 5.41-2.44 1.3-1.63 1.94-4.11 1.94-7.46V16.02h11.31v35.49zM116.27 51.51H86.32v-2.13L100.4 25H86.67v-8.98h29.43v2.13l-14.08 24.38h14.25v8.98zM151.11 51.51h-29.95v-2.13L135.24 25H121.5v-8.98h29.43v2.13l-14.08 24.38h14.25v8.98zM167.93 24.36h20.46v10.18h-20.46v16.97h-11.67V4.14h34.01v10.25h-22.34v9.97zM271.28 36.66h-26.02c.67 4.4 3.96 6.86 8.94 6.86 3.92 0 7.79-1.54 10.69-3.77l4.34 7.52c-3.97 3.41-9.12 5.3-15.03 5.3-11.9 0-20.04-7.25-20.04-18.81 0-5.47 1.82-9.97 5.44-13.51 3.63-3.54 8.08-5.3 13.36-5.3 5.14 0 9.45 1.72 12.94 5.16 3.49 3.44 5.28 7.99 5.37 13.65v2.9zm-22.91-11.03c-1.41.99-2.38 2.36-2.9 4.1h14.64c-.52-1.84-1.41-3.23-2.69-4.17-1.27-.94-2.76-1.41-4.45-1.41-1.65 0-3.18.49-4.6 1.48zM229.91 36.66h-26.02c.67 4.4 3.96 6.86 8.94 6.86 3.92 0 7.79-1.54 10.69-3.77l4.34 7.52c-3.97 3.41-9.12 5.3-15.03 5.3-11.9 0-20.04-7.25-20.04-18.81 0-5.47 1.82-9.97 5.44-13.51 3.63-3.54 8.08-5.3 13.36-5.3 5.14 0 9.45 1.72 12.94 5.16 3.49 3.44 5.28 7.99 5.37 13.65v2.9zM207 25.63c-1.41.99-2.38 2.36-2.9 4.1h14.64c-.52-1.84-1.41-3.23-2.69-4.17-1.27-.94-2.76-1.41-4.45-1.41-1.66 0-3.19.49-4.6 1.48zM315.05 51.51h-11.31v-2.83c-2.88 2.59-6.55 3.89-11.03 3.89-4.81 0-8.9-1.76-12.27-5.27-3.37-3.51-5.06-8.03-5.06-13.54 0-5.47 1.69-9.97 5.06-13.51 3.37-3.54 7.46-5.3 12.27-5.3 4.48 0 8.16 1.3 11.03 3.89V.6h11.31v50.91zm-13.89-11.13c1.72-1.72 2.58-3.92 2.58-6.61 0-2.64-.86-4.83-2.58-6.58-1.72-1.74-3.76-2.62-6.12-2.62-2.5 0-4.55.86-6.15 2.58-1.6 1.72-2.4 3.92-2.4 6.61 0 2.73.8 4.95 2.4 6.65 1.6 1.7 3.65 2.55 6.15 2.55 2.36 0 4.4-.86 6.12-2.58z"></path>
      </symbol>
      <symbol id="search-icon" viewBox="0 0 38 38">
        <title>Search</title>
        <path d="M24.5 1C17.6 1 12 6.6 12 13.5c0 2.7.9 5.2 2.4 7.3L.6 34.6c-.8.8-.8 2 0 2.8.8.8 2 .8 2.8 0l13.8-13.8c2.1 1.5 4.6 2.4 7.3 2.4C31.4 26 37 20.4 37 13.5S31.4 1 24.5 1zm0 21c-4.7 0-8.5-3.8-8.5-8.5S19.8 5 24.5 5 33 8.8 33 13.5 29.2 22 24.5 22z"></path>
      </symbol>
      <symbol
        id="arrow-down"
        viewBox="0 0 9 7"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Arrow Down</title>
        <path d="M5.26797 6.07909C4.86819 6.55848 4.13178 6.55848 3.732 6.0791L0.238886 1.89046C-0.304232 1.2392 0.158866 0.249999 1.00687 0.249999L7.9931 0.25C8.84111 0.25 9.3042 1.2392 8.76109 1.89046L5.26797 6.07909Z"></path>
      </symbol>
      <symbol id="hamburger" viewBox="0 0 16 12">
        <title>Hamburger Menu</title>
        <g fillRule="nonzero">
          <path d="M0 0h16v2H0zM0 5h16v2H0zM0 10h16v2H0z"></path>
        </g>
      </symbol>
      <symbol id="pop-out" viewBox="0 0 38 38">
        <title>Pop Out</title>
        <path d="M38 0v9.7c0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6V5.6L19.6 20.7l-2.3-2.3L32.4 3.3h-4.1c-.9 0-1.6-.7-1.6-1.6 0-.9.7-1.6 1.6-1.6H38zm-5 15.2c-1.1 0-2 .9-2 2v12.6c0 1.2-1 2.3-2.3 2.3H8.3C7 32 6 31 6 29.7V9.3C6 8 7 7 8.3 7H21c1.1 0 2-.9 2-2s-.9-2-2-2H8.3C4.8 3 2 5.8 2 9.3v20.5C2 33.2 4.8 36 8.3 36h20.5c3.5 0 6.3-2.8 6.3-6.3V17.2c-.1-1.1-1-2-2.1-2z"></path>
      </symbol>
      <symbol id="speech" viewBox="0 0 38 38">
        <title>Speech</title>
        <path d="M13 36c-.3 0-.6-.1-.8-.2-.8-.3-1.2-1-1.2-1.8v-5.8c-5-.3-9-4.9-9-10.4v-6.3C2 5.7 5.8 2 11.6 2h14.7c5.9 0 9.6 3.7 9.6 9.4v6.3c0 5.8-3.8 10.3-9.6 10.3h-3l-9 7.4c-.3.3-.8.6-1.3.6zM11.6 6C8 6 6 7.9 6 11.4v6.3c0 3.5 2 6.3 5.6 6.3H13c1.1 0 2 1 2 2.1v3.7l6.2-5.3c.4-.3.9-.5 1.4-.5h3.7c3.6 0 5.6-2.8 5.6-6.3v-6.3C32 7.9 30 6 26.4 6H11.6z"></path>
      </symbol>
      <symbol id="audio-on" viewBox="0 0 38 38">
        <title>Audio on</title>
        <path d="M38 19c0 7.5-6.1 14-13.6 14H21v-4h3c5.4 0 10-4.6 10-10S29.4 9 24 9h-3V5h3.4C31.9 5 38 11.5 38 19zm-8 0c0-3.3-2.7-6-6-6h-3v12h3c3.3 0 6-2.7 6-6zM14.5 4.5L6 13H0v12h6l8.5 8.6c.9.9 2.5.3 2.5-1.1V5.6c0-1.4-1.6-2-2.5-1.1z"></path>
      </symbol>
      <symbol id="replay" viewBox="0 0 38 38">
        <title>Replay</title>
        <path d="M34 19c0 8.3-6.7 15-15 15S4 27.3 4 19 10.7 4 19 4c3.4 0 6.5 1.1 9 3V3c0-1.1.9-2 2-2s2 .9 2 2v11H21c-1.1 0-2-.9-2-2s.9-2 2-2h4.3c-1.8-1.3-4-2-6.3-2-6.1 0-11 4.9-11 11s4.9 11 11 11 11-4.9 11-11h4z"></path>
      </symbol>
      <symbol id="plus" viewBox="0 0 38 38">
        <title>Plus</title>
        <path d="M33 17H21V5h-4v12H5v4h12v12h4V21h12z"></path>
      </symbol>
      <symbol id="minus" viewBox="0 0 38 38">
        <title>Minus</title>
        <path d="M5 17h28v4H5z"></path>
      </symbol>
      <symbol viewBox="0 0 38 38" id="more">
        <title>More</title>
        <path d="M13.6 7.3c-.5-.5-.5-1.4 0-1.9L19 0l5.4 5.4c.5.5.5 1.4 0 1.9-.3.3-.6.4-1 .4s-.7-.1-1-.4l-2.1-2.1V24h-2.7V5.2l-2.1 2.1c-.5.5-1.3.5-1.9 0zM26.3 10H26c-1.1 0-2 .9-2 2s.9 2 2 2h.3c1.5 0 2.7 1.2 2.7 2.7v14.6c0 1.5-1.2 2.7-2.7 2.7H11.7C10.2 34 9 32.8 9 31.3V16.7c0-1.5 1.2-2.7 2.7-2.7h.3c1.1 0 2-.9 2-2s-.9-2-2-2h-.3C8 10 5 13 5 16.7v14.6C5 35 8 38 11.7 38h14.6c3.7 0 6.7-3 6.7-6.7V16.7c0-3.7-3-6.7-6.7-6.7z"></path>
      </symbol>
      <symbol id="grocerybag" viewBox="0 0 19 26">
        <title>Your grocery bag</title>
        <path
          fill="none"
          d="M17.4286 7.78571H2L2.58738 23.0576C2.61836 23.863 3.28028 24.5 4.08627 24.5H15.3423C16.1483 24.5 16.8102 23.863 16.8412 23.0576L17.4286 7.78571Z"
          stroke="black"
          strokeWidth="2.5"
        ></path>
        <path
          fill="none"
          d="M5.85694 7.78571C5.85694 7.78571 5.21381 2 9.71408 2C14.2144 2 13.5712 7.78571 13.5712 7.78571"
          stroke="black"
          strokeWidth="2.5"
        ></path>
      </symbol>
      <symbol id="checkmark" viewBox="0 0 17 12">
        <title>Success</title>
        <path
          d="M14.914 0L5.38251 9.10736L1.5699 5.44286L0 7.00567L3.81261 10.6702C4.7097 11.5324 6.16746 11.5324 7.06454 10.6702L16.54 1.5628L14.914 0Z"
          fill="#0E7A60"
        ></path>
      </symbol>
      <symbol id="comment" viewBox="0 0 22 22">
        <title>Comment</title>
        <path
          stroke="white"
          strokeWidth="1.375"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.7812 8.49063H7.21875M12.0312 11.5844H7.21875M7.71874 18.9219V15.3125H6.40625C4.9565 15.3125 3.78125 14.1372 3.78125 12.6875L3.78125 7.4375C3.78125 5.98775 4.9565 4.8125 6.40625 4.8125H15.5937C17.0435 4.8125 18.2188 5.98775 18.2188 7.4375C18.2188 9.18749 18.2188 10.9375 18.2188 12.6875C18.2188 14.1372 17.0435 15.3125 15.5938 15.3125H13.625L7.71874 18.9219Z"
        ></path>
      </symbol>
      <symbol id="tipsHighlights" viewBox="0 0 52 50">
        <title>Tips Highlights</title>
        <path
          d="M25.0446 0.572924C24.8478 0.351503 24.5353 0.208446 24.2528 0.299565C23.9931 0.377017 23.8145 0.629417 23.7507 0.893664C23.7023 1.1615 23.7054 1.43612 23.7598 1.70281C23.9326 2.86092 24.2384 3.99526 24.671 5.08334C24.9754 5.84965 25.9148 7.82694 26.0378 5.91526C26.0849 5.18209 26.0482 4.44595 25.9285 3.7211C25.7736 2.76799 25.7071 1.32101 25.0446 0.572924Z"
          fill="#79DCF1"
        ></path>
        <path
          d="M40.2696 3.36573C40.4235 2.75432 40.5593 2.12013 40.4591 1.49778C40.3588 0.875434 39.9725 0.261289 39.3738 0.0653817C38.6977 -0.15695 37.9414 0.214818 37.4986 0.771558C37.0558 1.3283 36.8608 2.03447 36.6712 2.7206C36.0261 5.08424 35.6161 7.498 35.2625 9.91904C35.2179 10.2252 35.0402 11.0025 35.3482 11.2148C35.4384 11.2679 35.5409 11.2965 35.6456 11.2978C35.7503 11.2991 35.8535 11.273 35.945 11.222C36.1267 11.1186 36.2872 10.9816 36.4179 10.8184C37.3365 9.79478 38.1263 8.66255 38.7697 7.44697C39.1005 6.82098 39.3438 6.1631 39.6454 5.52526C39.9616 4.85462 40.0873 4.08557 40.2696 3.36573Z"
          fill="#E40754"
        ></path>
        <path
          d="M2.34608 27.6318C2.04721 27.6318 1.74014 27.6318 1.46496 27.5042C1.31384 27.4325 1.18397 27.3227 1.08811 27.1857C0.992258 27.0486 0.933717 26.8889 0.91824 26.7224C0.910367 26.5251 0.951921 26.329 1.03913 26.1519C1.12633 25.9748 1.25643 25.8223 1.41758 25.7082C2.34882 25.054 3.78668 25.3829 4.789 25.3966C5.93892 25.4139 7.09159 25.3966 8.23514 25.5078C9.03608 25.587 9.81879 25.7219 10.576 26.0335C10.6266 26.0468 10.673 26.0729 10.7107 26.1093C10.7484 26.1457 10.776 26.1911 10.791 26.2413C10.7968 26.2826 10.794 26.3246 10.7827 26.3648C10.7714 26.4049 10.7519 26.4423 10.7254 26.4745C10.6279 26.6003 10.4913 26.6294 10.361 26.6677C9.08784 27.0544 7.7787 27.3105 6.45375 27.4322C5.08331 27.5501 3.71409 27.6166 2.34608 27.6318Z"
          fill="#79DCF1"
        ></path>
        <path
          d="M12.0089 37.2713C12.1911 37.0152 12.3597 36.6417 12.1346 36.4248C11.9469 36.2426 11.6371 36.3382 11.4057 36.453C9.88658 37.1968 8.57618 38.3065 7.59231 39.6823C7.3718 39.9903 7.17316 40.4322 7.42191 40.7183C7.67067 41.0045 8.1208 40.8769 8.4543 40.7111C10.0799 39.8983 10.9965 38.7155 12.0089 37.2713Z"
          fill="#79DCF1"
        ></path>
        <path
          d="M44.0436 20.9755C43.7328 21.0055 43.3228 20.9709 43.2444 20.6684C43.1788 20.416 43.4148 20.1927 43.6308 20.0451C45.0251 19.0906 46.6349 18.4975 48.3152 18.3193C48.6925 18.2792 49.1745 18.3248 49.3011 18.6838C49.4278 19.0428 49.0943 19.3718 48.7863 19.5795C47.2774 20.5919 45.7985 20.8069 44.0436 20.9755Z"
          fill="#E40754"
        ></path>
        <path
          d="M12.2055 2.87005C11.8784 2.67414 11.5303 2.48644 11.1504 2.45637C10.7704 2.4263 10.3494 2.59669 10.1945 2.94203C9.98129 3.42223 10.3403 3.95073 10.6829 4.34892C12.6875 6.67429 14.9892 8.64247 17.3182 10.6307C17.4904 10.7783 17.6964 10.935 17.9205 10.8949C18.88 10.7236 16.0981 6.6588 15.8056 6.26152C14.8252 4.92753 13.6324 3.72293 12.2055 2.87005Z"
          fill="#E40754"
        ></path>
        <path
          d="M19.4991 48.9646C19.3725 49.0902 19.2259 49.194 19.0654 49.2717C18.8111 49.3938 18.3072 49.5587 18.0302 49.4266C17.7532 49.2945 17.5746 48.8252 17.5063 48.5382C17.3642 47.8952 17.41 47.225 17.6384 46.6074C17.8434 46.0142 18.1669 45.4747 18.4886 44.9381C19.1328 43.8628 19.797 42.7676 20.4413 41.6796C20.8158 41.0482 21.2012 40.4222 21.5848 39.7953C21.7768 39.483 21.9681 39.1696 22.1589 38.8549C22.2636 38.6809 22.8094 37.6303 23.2778 38.2389C23.3382 38.3302 23.361 38.4411 23.3416 38.5488C23.3042 39.0463 23.1685 39.4754 23.06 39.9511C22.8833 40.7213 22.6816 41.4825 22.455 42.2345C22.0614 43.539 21.5895 44.8185 21.0417 46.0661C20.7641 46.6973 20.4674 47.3193 20.1515 47.9322C19.9565 48.314 19.7843 48.6822 19.4991 48.9646Z"
          fill="#E40754"
        ></path>
        <path
          d="M50.254 33.4297C50.8062 33.8124 51.3584 34.227 51.7001 34.7965C52.0418 35.366 52.1329 36.1177 51.7539 36.6836C51.3265 37.3214 50.4217 37.5437 49.6581 37.4016C48.8945 37.2594 48.2403 36.8294 47.6079 36.4093C46.3787 35.5892 45.1996 34.709 44.0543 33.7905C43.4677 33.3316 42.9486 32.7924 42.5125 32.1886C42.2556 31.8296 41.574 31.0533 41.7936 30.5731C41.8436 30.4799 41.9135 30.399 41.9984 30.336C42.0833 30.2729 42.1811 30.2295 42.2847 30.2086C42.4929 30.1672 42.7071 30.1672 42.9153 30.2086C43.4866 30.2997 44.0151 30.4993 44.5554 30.6642C45.0958 30.8291 45.6334 31.0004 46.1591 31.2018C46.8735 31.4752 47.535 31.8397 48.2321 32.1385C48.9656 32.4502 49.6025 32.9787 50.254 33.4297Z"
          fill="#79DCF1"
        ></path>
        <path
          d="M38.6747 45.6187C38.7121 45.9495 38.7349 46.293 38.6191 46.6001C38.5034 46.9072 38.2137 47.1669 37.8774 47.1468C37.4127 47.1231 37.1202 46.6365 36.9271 46.2128C35.7972 43.7417 35.0628 41.1821 34.322 38.5889C34.2673 38.3966 34.2172 38.1752 34.3311 38.0166C34.8213 37.3396 37.0646 41.1001 37.2742 41.4792C37.984 42.7731 38.5125 44.1736 38.6747 45.6187Z"
          fill="#E40754"
        ></path>
        <path
          d="M25.5917 46.4507C25.4231 46.6921 25.1288 46.8689 24.8381 46.8151C24.5702 46.7678 24.3643 46.5418 24.2705 46.283C24.1916 46.0223 24.1628 45.7489 24.1857 45.4775C24.2233 44.3075 24.3952 43.1457 24.6978 42.015C24.911 41.2186 25.6163 39.1456 25.9644 41.0309C26.0955 41.752 26.1441 42.4857 26.1092 43.2177C26.071 44.1845 26.1676 45.626 25.5917 46.4507Z"
          fill="#79DCF1"
        ></path>
        <path
          d="M50.4069 25.0312C50.6758 24.9091 50.9017 24.6512 50.9036 24.356C50.9036 24.0827 50.7158 23.8403 50.4817 23.7018C50.2398 23.5769 49.9763 23.4995 49.7053 23.474C48.5478 23.2996 47.374 23.2593 46.2073 23.3537C45.3872 23.4193 43.2194 23.7391 45.0109 24.4216C45.698 24.6809 46.4124 24.8613 47.1403 24.9592C48.0962 25.0941 49.4921 25.4495 50.4069 25.0312Z"
          fill="#E40754"
        ></path>
        <path
          d="M15.2374 13.6722C15.2492 13.6427 15.2583 13.6122 15.2647 13.5811C15.2768 13.4784 15.2645 13.3742 15.2287 13.2771C15.1929 13.1801 15.1347 13.0928 15.0588 13.0226C14.9053 12.8838 14.7305 12.7706 14.5412 12.6872C13.5635 12.1934 12.5685 11.776 11.5579 11.3551C10.5651 10.9243 9.54762 10.5525 8.51091 10.2416C8.32867 10.1906 8.14643 10.1426 7.96419 10.0976C7.24891 9.92268 6.33407 9.8516 5.93588 10.4703C5.66252 10.8958 5.79008 11.4863 6.10809 11.8799C6.4261 12.2736 6.89445 12.5114 7.3546 12.7228C8.32352 13.1696 9.34121 13.502 10.3871 13.7132C11.4668 13.931 12.5739 13.9994 13.6719 14.0695L13.9152 14.0841L14.1239 14.0959C14.3517 14.1219 14.5825 14.1059 14.8045 14.0486C14.8995 14.0206 14.9872 13.9725 15.0619 13.9075C15.1366 13.8426 15.1964 13.7623 15.2374 13.6722Z"
          fill="#79DCF1"
        ></path>
        <path
          d="M0.0201733 32.7417C0.0398853 32.8163 0.0705952 32.8876 0.111293 32.9531C0.542288 33.6329 2.09861 32.9932 2.67813 32.8292C3.63853 32.5558 4.57615 32.2141 5.51285 31.8688C6.91336 31.3521 8.26011 30.7517 9.41641 29.7858C9.52318 29.7099 9.6088 29.6079 9.66517 29.4897C9.6918 29.4299 9.69682 29.3628 9.67936 29.2998C9.66191 29.2368 9.62306 29.1818 9.5695 29.1443C9.49429 29.1131 9.41155 29.1049 9.33167 29.1206C7.05369 29.3357 4.86682 29.9407 2.73827 30.7681C2.13141 31.0041 -0.242251 31.7485 0.0201733 32.7417Z"
          fill="#E40754"
        ></path>
        <path
          d="M39.6681 14.4823L39.6535 14.4723C39.4075 14.301 39.3136 13.9675 39.3637 13.6713C39.4776 13.008 40.1255 12.2134 40.5228 11.6767C41.499 10.3896 42.5599 9.16897 43.6983 8.02284C44.1402 7.57363 44.6004 7.13625 45.056 6.86472C45.5116 6.59318 45.9672 6.50844 46.1658 6.7736C46.3645 7.03875 46.2824 7.60461 46.0929 8.16317C45.569 9.704 44.3334 11.3168 43.0796 12.4576C42.5529 12.9397 40.4581 14.9889 39.6681 14.4823Z"
          fill="#79DCF1"
        ></path>
        <path
          d="M38.6177 24.4899C38.2041 24.7505 37.781 24.9951 37.3485 25.2235C37.0186 25.3975 36.5548 25.5879 36.4737 26.0098C36.3826 26.4973 36.5785 27.1597 36.6259 27.65C36.6957 28.371 36.7367 29.093 36.7489 29.8159C36.768 30.9294 36.7161 32.0665 36.3434 33.1108C35.9707 34.155 35.2336 35.1035 34.2385 35.4626C32.9957 35.9109 31.6152 35.3641 30.5828 34.5204C29.5505 33.6766 28.7513 32.5549 27.7937 31.6164C26.836 30.6779 25.6159 29.8988 24.3084 29.989C22.6509 30.1038 21.3816 31.5298 20.0831 32.6415C19.2685 33.3386 18.2207 33.9682 17.2311 33.6338C14.4064 32.6816 16.3618 28.5967 17.1573 26.8609C17.4461 26.2303 18.2407 25.2599 17.8124 24.5364C17.5591 24.1072 16.822 23.8457 16.411 23.5979L14.5567 22.4798C13.3995 21.7828 12.0765 20.7367 12.3699 19.4647C12.5275 18.7913 13.1389 18.2847 13.8141 18.0414C14.4893 17.7981 15.2265 17.7772 15.9481 17.7681C17.0315 17.7489 18.1159 17.6906 19.1975 17.7562C21.6276 17.9029 21.931 17.2815 22.3866 16.5881C22.9091 15.7911 23.4558 15.0099 24.0268 14.2445C25.1421 12.7501 26.6957 11.1856 28.4506 11.5291C29.514 11.7369 30.1673 12.1715 30.7359 13.1337C31.3838 14.2272 31.7865 15.306 32.2385 16.4459C32.8007 17.8656 32.9674 18.4852 34.0836 18.7768C34.7351 18.9471 36.2587 19.1039 36.8865 19.2014C37.6856 19.3253 38.5002 19.4629 39.2146 19.831C39.929 20.1991 40.5367 20.8443 40.6324 21.6133C40.7864 22.8252 39.682 23.8202 38.6177 24.4899Z"
          fill="#F9E932"
        ></path>
        <path
          d="M23.2559 17.2815C22.9825 17.7571 22.5378 18.487 22.023 18.7212C21.356 19.0246 20.464 18.846 19.7542 18.8405C18.4129 18.8296 17.047 18.6465 15.7084 18.795C15.0278 18.8697 15.0141 19.944 15.7084 19.8748C17.1818 19.7271 18.7154 19.8811 20.1961 19.9249C21.0162 19.9495 21.9665 20.0297 22.6982 19.5731C23.3051 19.195 23.8308 18.4314 24.1762 17.8191C24.5124 17.2214 23.5939 16.6838 23.2559 17.2815Z"
          fill="#F4F4F4"
        ></path>
        <path
          d="M25.8787 15.0409C26.2586 14.5564 26.7437 14.1647 27.2974 13.8955C27.928 13.5793 27.3749 12.6435 26.7453 12.9506C26.0289 13.3055 25.416 13.839 24.9657 14.4996C24.8026 14.7347 24.9229 15.0864 25.1552 15.2231C25.4286 15.3826 25.7019 15.2605 25.8787 15.0336V15.0409Z"
          fill="#F4F4F4"
        ></path>
      </symbol>
    </svg>
  );
}

