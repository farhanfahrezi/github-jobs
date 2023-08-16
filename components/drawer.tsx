import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

interface Props {
  children: React.ReactNode;
  visible: boolean;
  onClose?: () => void;
}

export const DrawerWrapper = ({ children, visible, onClose }: Props) => {
  return (
    <Drawer
      open={visible}
      direction="right"
      lockBackgroundScroll
      zIndex={99999}
      duration={300}
      overlayOpacity={0.5}
      enableOverlay={true}
      onClose={onClose}
      className="flex flex-col bg-background max-w-5xl rounded-l-3xl overflow-hidden"
      style={{ display: "flex", width: "100%" }}
    >
      <section className="flex flex-1 flex-col bg-background antialiased h-screen">
        {children}
      </section>
    </Drawer>
  );
};
