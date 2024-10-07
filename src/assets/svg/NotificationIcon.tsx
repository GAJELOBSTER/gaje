export default function NotificationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_273_3232)">
        <mask
          id="mask0_273_3232"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="20"
          height="20"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.9165 15V9.16667C2.9165 5.25465 6.08782 2.08334 9.99984 2.08334C13.9119 2.08334 17.0832 5.25465 17.0832 9.16667V15H17.7082C18.0533 15 18.3332 15.2798 18.3332 15.625C18.3332 15.9702 18.0533 16.25 17.7082 16.25H2.2915C1.94633 16.25 1.6665 15.9702 1.6665 15.625C1.6665 15.2798 1.94633 15 2.2915 15H2.9165ZM4.1665 15H15.8332V9.16667C15.8332 5.94501 13.2215 3.33334 9.99984 3.33334C6.77818 3.33334 4.1665 5.94501 4.1665 9.16667V15Z"
            fill="black"
          />
          <path
            d="M8.74984 17.5C8.74984 17.2699 8.93639 17.0833 9.1665 17.0833H10.8332C11.0633 17.0833 11.2498 17.2699 11.2498 17.5V17.9167C11.2498 18.1468 11.0633 18.3333 10.8332 18.3333H9.1665C8.93639 18.3333 8.74984 18.1468 8.74984 17.9167V17.5Z"
            fill="black"
          />
        </mask>
        <g mask="url(#mask0_273_3232)">
          <rect width="20" height="20" fill="#222222" />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_273_3232">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
