import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export function Button({ tone = 'dark', children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: 'dark' | 'quiet' | 'lime' }) {
  return <button className={`button button--${tone}`} {...props}>{children}</button>;
}

export function Tag({ children, color = 'ink' }: { children: ReactNode; color?: 'ink' | 'green' | 'lilac' }) {
  return <span className={`tag tag--${color}`}>{children}</span>;
}

export function SearchInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <label className="search-input"><span aria-hidden="true">⌕</span><input {...props} />{props.value ? <kbd>esc</kbd> : null}</label>;
}

export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{children}</div>;
}
