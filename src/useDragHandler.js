import { useCallback, useEffect, useRef, useState } from "react";

const getEventY = (event) => event.targetTouches[0].clientY;

export const useDragHandler = () => {
  // containerRef is what the bottom-drawer wrapper / container to transform its y position
  const containerRef = useRef(null);
  // dragHandleRef - user interactive button which can be dragged - used to find the position of the touch and make the container to follows the dragging
  const dragHandleRef = useRef(null);
  // translateY - stores the dragging position of y axis - useful to get the last coordinate where dragging is dropped
  const translateY = useRef(null);
  // touchStartYCoord ref stores the touchstart (initial coordinate the user touched)
  const touchStartYCoord = useRef(0);
  // isDragging - stores boolean based on dragging - useful to add transition animation (eg: ease effect)
  const [isDragging, setIsDragging] = useState(false);
  // drawerInView - stores boolean based on touchdrop
  const [drawerInView, setDrawerInView] = useState(true);

  // Dragging animation
  const animateDrawer = useCallback(
    (y) => {
      if (containerRef.current && drawerInView) {
        window.requestAnimationFrame(() => {
          containerRef.current.style.transform = `translateY(${y})`;
        });
      }
    },
    [drawerInView]
  );

  const start = useCallback((event) => {
    const eventY = getEventY(event);
    setIsDragging(true);
    touchStartYCoord.current = eventY;
    console.log("start:", eventY, touchStartYCoord.current);
  }, []);

  const move = useCallback(
    (event) => {
      const eventY = getEventY(event);
      console.log("move:", eventY);
      const y = eventY - touchStartYCoord.current;
      translateY.current = y;
      animateDrawer(`${y}px`);
    },
    [animateDrawer]
  );

  const drop = useCallback(
    (event) => {
      setIsDragging(false);
      if (translateY.current > containerRef.current.clientHeight / 2) {
        animateDrawer("100%");
        // Timeout 200ms matches the animation delay mentioned in css
        // Without setting timeout here throws error in animate drawer saying null.style
        // this is because setDrawerInView runs faster than animateDrawer which takes 200ms
        // Hence mobile Drawer is removed from the dome based on setDrawerInView
        setTimeout(() => {
          setDrawerInView(false);
        }, 200);
      } else {
        animateDrawer("0%");
      }
    },
    [animateDrawer]
  );
  useEffect(() => {
    const dragHandle = dragHandleRef.current;
    const container = containerRef.current;
    if (dragHandle && container) {
      dragHandleRef.current.addEventListener("touchstart", start);
      document.addEventListener("touchmove", move);
      containerRef.current.addEventListener("touchend", drop);
    }
    return () => {
      if (dragHandle && container) {
        dragHandle.removeEventListener("touchstart", start);
        document.removeEventListener("touchmove", move);
        container.removeEventListener("touchend", drop);
      }
    };
  }, [start, move, drop]);
  return [containerRef, dragHandleRef, isDragging, drawerInView];
};
