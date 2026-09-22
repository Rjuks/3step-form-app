"use client";

import { CheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: (
          <span className="flex size-4 items-center justify-center rounded-full bg-green-600 text-white">
            <CheckIcon className="size-3" strokeWidth={3} />
          </span>
        ),
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          "--width": "336px",
          "--toast-icon-margin-start": "0px",
          "--toast-icon-margin-end": "4px",
          "--toast-svg-margin-start": "0px",
        } as CSSProperties
      }
      toastOptions={{
        style: {
          minHeight: 52,
          padding: "15px 16px",
          fontFamily: "var(--font-geist-sans)",
          fontSize: 14,
          boxShadow: "0 4px 12px rgb(0 0 0 / 10%)",
        },
        classNames: {
          title: "leading-5!",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
