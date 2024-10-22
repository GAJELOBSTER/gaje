export default function NotificationHoverIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_317_3563)">
        <mask
          id="mask0_317_3563"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="20"
          height="20"
        >
          <path
            d="M2.9165 9.16671V15H2.2915C1.94633 15 1.6665 15.2799 1.6665 15.625C1.6665 15.9702 1.94633 16.25 2.2915 16.25H17.7082C18.0533 16.25 18.3332 15.9702 18.3332 15.625C18.3332 15.2799 18.0533 15 17.7082 15H17.0832V9.16671C17.0832 5.25469 13.9119 2.08337 9.99984 2.08337C6.08782 2.08337 2.9165 5.25469 2.9165 9.16671Z"
            fill="black"
          />
          <path
            d="M9.1665 17.0834C8.93639 17.0834 8.74984 17.2699 8.74984 17.5V17.9167C8.74984 18.1468 8.93639 18.3334 9.1665 18.3334H10.8332C11.0633 18.3334 11.2498 18.1468 11.2498 17.9167V17.5C11.2498 17.2699 11.0633 17.0834 10.8332 17.0834H9.1665Z"
            fill="black"
          />
        </mask>
        <g mask="url(#mask0_317_3563)">
          <rect width="20" height="20" fill="#222222" />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_317_3563">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
