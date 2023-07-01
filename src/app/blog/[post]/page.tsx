import styles from './page.module.css'
import {notFound} from "next/navigation";
import Image from "next/image";


// @ts-ignore
const getData = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return notFound()
    }

    return res.json();
    // return items.applications[id-1]
}

// @ts-ignore
export const generateMetadata = async ({params}) => {

    const post = await getData(params.post)
    return {
        title: post.title,
        description: post.desc,
    };
}
// @ts-ignore
const BlogPost = async ({params}) => {
    const data = await getData(params.post);
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.info}>
                    <h1 className={styles.title}>{data.title}</h1>
                    <p className={styles.desc}>
                        {data.body}
                    </p>
                    <div className={styles.author}>
                        <Image
                            src={data.image}
                            alt=""
                            width={40}
                            height={40}
                            className={styles.avatar}
                        />
                        <span className={styles.username}>{data.title}</span>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <Image
                        src={data.image}
                        alt=""
                        fill={true}
                        className={styles.image}
                    />
                </div>
            </div>
            <div className={styles.content}>
                <p className={styles.text}>
                    {data.body}
                </p>
            </div>
        </div>
    );
}
export default BlogPost
