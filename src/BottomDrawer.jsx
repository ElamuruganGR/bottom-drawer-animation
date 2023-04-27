import React, { useEffect } from "react";
import "./bottom-drawer.css";
import { useDragHandler } from "./useDragHandler";

export const BottomDrawer = ({ children, className, setOpen }) => {
  const [containerRef, dragHandleRef, isDragging, drawerInView] = useDragHandler();
  useEffect(() => {
    setOpen(drawerInView);
  }, [drawerInView, setOpen])
  return (
    <div className={`container ${className} ${!isDragging ? 'transition' : ''}`} ref={containerRef}>
      <button className="dragHandler" ref={dragHandleRef}></button>
      <div className="drawerContent">{children}</div>
      <button className="closer">Close</button>
    </div>
  );
};
