import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
      <section className="bg-zinc-900 w-full p-10">
        <p className="mb-4">Área Administrativa / Inscritos</p>
        {children}
      </section>
    )
  }