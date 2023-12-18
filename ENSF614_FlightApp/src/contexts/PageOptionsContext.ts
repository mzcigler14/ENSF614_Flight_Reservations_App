import React from "react";
import { Link } from "../types.ts";

interface PageOptionsContextProps {
    pagesContext: Link[];
    setPagesContext: React.Dispatch<React.SetStateAction<Link[]>>;
  }
  
  const defaultPages: Link[] = [];

const PageOptionsContext = React.createContext<PageOptionsContextProps>({
    pagesContext: defaultPages,
    setPagesContext: () => {},
  });

export default PageOptionsContext;

