import Head from 'next/head';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import Books from "../componets/Books";

export default function Home({ books, error }) {
  if (error) return <div className="h-screen flex flex-col items-center justify-center text-red-500">Something went wrong!</div>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Book Ratings Application</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div>
          <Books books={books} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const { data } = await axios(`${process.env.NEXT_PUBLIC_STRAPI_API}/api/books`);

    return {
      props: {
        books: data.data,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        books: null,
        error: error.message,
      },
    };
  }
}
