import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

export interface ListSubheaderProps extends HTMLAttributes<HTMLLIElement> {
  /**
   * Boolean if the subheader should be inset to match the `ListItem` text
   * keyline.
   */
  inset?: boolean;
}

const block = bem("rmd-list-subheader");

/**
 * This is a simple component that will render a `<li>` with the subheader
 * typography styles. It also supports an `inset` variant that adds some spacing
 * to the left of the text to align with other `ListItem` that have left addons.
 */
function ListSubheader(
  { className, inset = false, ...props }: ListSubheaderProps,
  ref?: Ref<HTMLLIElement>
): ReactElement {
  return (
    <li {...props} ref={ref} className={cn(block({ inset }), className)} />
  );
}

const ForwardedListSubheader = forwardRef<HTMLLIElement, ListSubheaderProps>(
  ListSubheader
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedListSubheader.propTypes = {
      className: PropTypes.string,
      inset: PropTypes.bool,
      children: PropTypes.node,
    };
  } catch (e) {}
}

export default ForwardedListSubheader;
