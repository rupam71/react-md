import { useCallback, useEffect, useRef, useState } from "react";
import Cookie from "js-cookie";
import { EventName, sendAnalyticsEvent } from "utils/analytics";

import { ColorAccent, PrimaryColor, SecondaryColor, ThemeMode } from "./colors";
import styles from "./styles.module.scss";
import {
  DEFAULT_ACCENT,
  DEFAULT_PRIMARY,
  DEFAULT_SECONDARY,
  Theme,
} from "./useTheme";
import { ThemeActions } from "./useThemeActions";

export type ThemeConfiguration = Theme & ThemeActions;

const THEME_TRANSITION_DURATION = 150;

export default function useThemeConfiguration(
  defaultTheme: ThemeMode = "light"
): ThemeConfiguration {
  const [primary, setPrimary] = useState<PrimaryColor>(DEFAULT_PRIMARY);
  const [secondary, setSecondary] = useState<SecondaryColor>(DEFAULT_SECONDARY);
  const [accent, setAccent] = useState<ColorAccent>(DEFAULT_ACCENT);
  const [theme, setTheme] = useState<ThemeMode>(defaultTheme);

  const toggleTheme = useCallback(() => {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  }, []);

  const firstRender = useRef(true);
  useEffect(() => {
    const root = document.documentElement as HTMLElement;
    if (firstRender.current) {
      // right now I lose cookies for some reason whenever I redeploy the server,
      // so add a localStorage backup to the mix so the picked theme can still be
      // correct after redeploys...
      const localTheme = localStorage.getItem("theme");
      if (
        (localTheme === "light" || localTheme === "dark") &&
        localTheme !== theme
      ) {
        root.classList.remove(`${theme}-theme`);
        root.classList.add(`${localTheme}-theme`);
        Cookie.set("theme", localTheme, { sameSite: "Strict" });
        setTheme(localTheme);
      }

      firstRender.current = false;
      return;
    }

    sendAnalyticsEvent({
      name: EventName.ThemeChange,
      mode: theme,
    });
    Cookie.set("theme", theme, { sameSite: "Strict" });
    localStorage.setItem("theme", theme);
    root.classList.add(styles.transition);
    // force dom repaint
    root.scrollTop; // eslint-disable-line no-unused-expressions
    const previous = theme === "light" ? "dark" : "light";
    root.classList.remove(`${previous}-theme`);
    root.classList.add(`${theme}-theme`);

    const timeout = window.setTimeout(() => {
      root.classList.remove(styles.transition);
    }, THEME_TRANSITION_DURATION);

    return () => {
      window.clearTimeout(timeout);
      root.classList.remove("toggle-theme-transition");
    };
  }, [theme]);

  const reset = useCallback(() => {
    setPrimary(DEFAULT_PRIMARY);
    setSecondary(DEFAULT_SECONDARY);
    setAccent(DEFAULT_ACCENT);
  }, []);

  return {
    primary,
    setPrimary: useCallback((color: PrimaryColor) => setPrimary(color), []),
    secondary,
    setSecondary: useCallback(
      (color: SecondaryColor) => setSecondary(color),
      []
    ),
    accent,
    setAccent: useCallback((accent: ColorAccent | string) => {
      if (typeof accent === "string") {
        setAccent(parseInt(accent, 10));
      } else {
        setAccent(accent);
      }
    }, []),
    theme,
    toggleTheme,
    reset,
  };
}
