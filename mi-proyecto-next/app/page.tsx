import Link from "next/link";
import Saludo from "./components/Saludo";

export default function Home() {
  return (
    <main>
      <h1>Bienvenido a mi primer proyecto en Next.js</h1>

      <Saludo nombre="Leonardo" />

      <Link href="/contacto">
        Ir a contacto
      </Link>
    </main>
  );
}