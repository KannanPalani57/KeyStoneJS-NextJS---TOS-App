import { useRouter } from 'next/router';
import { gql } from "@apollo/client";
import client from "../../apolloClient";
import markdownToHtml from "../../lib/markdownToHtml";
import Image from "next/image"
import { keys } from "../../lib/keys"

export default function Article({title, content, coverImageName, authorName}){
    const myLoader=({src})=>{
        return `${keys.url}/images/${coverImageName}`;
      }
      
    return (
        <div>
            <Image loader={myLoader} src={`${keys.url}/images/${coverImageName}`} alt="me" width="800" height="200"></Image>
            <h3>Written by, {authorName && authorName}</h3>
            <h2>{title}</h2>
            <div dangerouslySetInnerHTML={{ __html: content }}>
            </div>
        </div>
    )
}


export async function getStaticProps({ params }){
    const { data } = await client.query({
        query: gql`
            query getOnePost($id: ID!){
                Post(where: {id: $id}){
                    author{
                        name
                    }
                    title
                    body
                    coverImage{
                        filename
                    }
                }
            }
        `,
        variables: { id: params.articleId }        
    })
    const title = data.Post.title
    const content = await markdownToHtml(data.Post.body)
    return {
        props: {
            authorName: data.Post.author.name,
            title,
            content,
            coverImageName: data.Post.coverImage.filename 
        }, 
    }
}

export async function getStaticPaths(){
    const { data } = await client.query({
        query: gql`
            query{
                allPosts{
                    id
                }
            }
        `,        
    })
    let paths;
    if(data){
        paths = data.allPosts.map(article => {
            return {
                params: { articleId: article.id }
            }
        })
    }

    return {
        paths,
        fallback: false
    }
}   