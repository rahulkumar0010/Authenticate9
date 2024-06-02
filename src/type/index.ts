import React from "react";

export type reactChildrenProps = {
  children: React.ReactNode;
};

export type CardProps = {
  className?: string;
  children: React.ReactNode;
};

export type InputProps = {
  value: string;
  onChange:
    | React.Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  className?: string;
  [key: string]: any;
};
export type ButtonProps = {
  value: string;
  onClick: () => void;
  className?: string;
  [key: string]: any;
};
export type MoviesTypes = {
  Title: string;
  Year: string;
  Poster: string;
  type: string;
  imdbID: string;
};
export type GetMoviesType = {
  Response: string;
  Search: MoviesTypes[];
  totalResults: string;
};

export type SVGIconProps = {
  className?: string;
  size?: number;
  color?: string;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export type ListState = {
  myList: MoviesTypes[];
};
