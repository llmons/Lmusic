import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <main className='flex container mx-auto flex-col items-center justify-center'>
        <div>name</div>
        <div>artist</div>
        <Image src='' alt='cover' />
        <audio controls></audio>
      </main>
    </div>
  );
}
