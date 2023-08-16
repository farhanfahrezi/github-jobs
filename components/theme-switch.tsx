"use client";

import { useTheme } from "next-themes";
import { FC } from "react";

import { MoonFilledIcon, SunFilledIcon } from "@/components/icons";
import { SwitchProps, Switch } from "@nextui-org/react";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = () => {
  const { theme, setTheme } = useTheme();

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const isLight = theme === "light" ? true : false;
  return (
    <Switch
      size="lg"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunFilledIcon size={14} className={className} />
        ) : (
          <MoonFilledIcon size={14} className={className} />
        )
      }
      onChange={(e) => onChange()}
    />
  );
};
