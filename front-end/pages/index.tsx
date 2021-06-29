import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import BaseComponent from "../components/baseComponent";
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Authenticator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <BaseComponent></BaseComponent>
      </main>
    </div>
  )
}
