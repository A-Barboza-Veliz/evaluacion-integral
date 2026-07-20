type Post = {
    slug: string
    titulo:  string
    contenido: string 
}

const posts : Post[] = [

{
    slug: "que-es-nextjs"
    titulo:"Que es next js"
    contenido:"Next.js permite optimizar aplicaciones React"
},
{
  slug:"ssr-vs-ssg"
  titulo:"SSR vs SSG"
  contenido:"SSR genera contenido por solicitud y SSG durante el build"

}

]

export function generateStaticParams(){
return post.map(post) => 

}