import { useState } from "react";

import StyledLink from "@/Atoms/StyledLink";

import { MdOutlineKeyboardArrowUp } from "react-icons/md";

import styles from "./styles.module.scss";

interface OptionI {
  name: string;
  link: string;
}

interface AccordionI {
  title: string;
  options: OptionI[];
}

// type Cx = (...args: Array<string | boolean | null | undefined>) => string;
// export const cx: Cx = (...args) => {
//   return args
//     .flat()
//     .filter(
//       (x: string | boolean | null | undefined) =>
//         x !== null && x !== undefined && typeof x !== 'boolean',
//     )
//     .join(' ');
// };
// https://github.com/jamesknelson/react-cx
// cx([styles["accordion-title], isActive && styles["content-active"]])

export default function Accordion({ title, options }: AccordionI) {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive((prev) => !prev);
  };

  let titleClasses = `${styles["accordion-title"]}`;
  let contentClasses = `${styles["accordion-content"]}`;

  if (isActive) {
    titleClasses += ` ${styles["active"]}`;
    contentClasses += ` ${styles["content-active"]}`;
  }

  return (
    <div className={styles["accordion-item"]}>
      <div className={titleClasses} onClick={toggleActive}>
        <div className={styles.title}>{title}</div>
        <div className={styles.icon}>
          <MdOutlineKeyboardArrowUp />
        </div>
      </div>
      <ul className={contentClasses}>
        {options.map((option) => (
          <li key={option.name}>
            <StyledLink variant="ghost" href={option.link}>
              {option.name}
            </StyledLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
