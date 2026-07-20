type SaludoProps = {
    nombre: string 
    }
    export default function Saludo({nombre}: SaludoProps) {
        return <h2>Hola {nombre}, ¡bienvenido a mi primer proyecto en Next.js!</h2>
    }